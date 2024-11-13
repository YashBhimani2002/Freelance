"use client";
import { useState, useEffect, useRef } from "react";
import {
  getUsers,
  getConversation,
  addMessage,
  getUserContractApplications,
  getUserAllConversation,
  readMessage,
} from "../api/api";
import { useRouter } from "next/router";
import { io } from "socket.io-client";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addMessageCount, markAsRead } from "@/lib/features/todos/messageSlice";
import Loader from "@/components/common/Loader";
import Error from "../error";
import ErrorBoundary from "../ErrorBoundry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSocket } from "../socketContext";

const Message = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.dashboard.status);
  const messageState = useSelector((state) => state.message);
  // const [socket, setSocket] = useState(null);
  const {socket} = useSocket()

  const [users, setUsers] = useState([{ _id: "", first_name: "", email: "" }]);
  const [allChat, setAllChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [targetUser, setTargetUser] = useState({
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loggedUser, setLoggedUser] = useState("");
  const fileInputRef = useRef(null);
  const [attachmentName, setAttachmentName] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [slugValueOfUser, setSlugValueOfUser] = useState(null);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const slugValue = urlParams.get("id");
  console.log(slugValue);
  
  const unreadMessageCounts = {};

  const getUserUnreadMessageCount = (id) => {
    if (allChat !== null) {
      let count = 0;
      allChat?.forEach((c) => {
        if (
          c.sender_id === id &&
          c.receiver_id === loggedUser &&
          c.reading_status === "0"
        ) {
          if (targetUser._id === id) {
            count = 0;
            c.reading_status = "1";
            dispatch(markAsRead(id));
          } else {
            count++;
          }
        }
      });
      return count;
    }
  };

  users?.forEach((user) => {
    unreadMessageCounts[user._id] = getUserUnreadMessageCount(user._id);
  });

  useEffect(() => {
    const readChat = async () => {
      const messageIds = chat
        .filter((message) => message.receiver_id === loggedUser)
        .map((message) => message._id);
      const response = await readMessage({ messageIds });
    };

    if (chat?.length > 0) {
      readChat();
    }
  }, [chat]);

  useEffect(() => {
    if (targetUser){
    setChat(
      allChat?.filter((message) => {
        return (
          (targetUser._id === message.sender_id &&
            message.receiver_id === loggedUser) ||
          (targetUser._id === message.receiver_id &&
            message.sender_id === loggedUser)
        );
      })
    );
  }
  }, [allChat, targetUser]);

  useEffect(() => {
    loadChatData();
  }, []);

  const loadChatData = async () => {
    const response = await getUserAllConversation();
    if (response?.status == 200) {
      setAllChat(response?.data?.messages);
      setLoggedUser(response?.data?.loggedUser);
    }
  };

  const loadChatDataForGetMessage = async () => {
    try {
      let count = 0;
      const response = await getUserAllConversation();
      const messages = response?.data?.messages || [];

      setAllChat(messages);

      messages.forEach((message) => {
        if (
          message.reading_status === "0" &&
          message.receiver_id === loggedUser
        ) {
          count++;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (slugValue !== null) {
      setSlugValueOfUser(slugValue);
    }
  }, [slugValue]);

  const [messages, setMessages] = useState([]);

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chat]);
  useEffect(() => {
    // const socket = io(serverUrl, {
    //   withCredentials: true,
    //   transports: ["websocket"],
    // });

    // setSocket(socket);

    socket.on("connect_error", (err) => { });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    // const socket = io(serverUrl, {
    //   withCredentials: true,
    //   transports: ["websocket"],
    // });
    socket.on("chat message", (msg) => {
      if (msg.receiver_id === loggedUser || msg.sender_id === loggedUser) {
        setMessages((prevMessages) => [...prevMessages, msg]);
        loadChatDataForGetMessage();
      }
    });
  }, [loggedUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await getUserContractApplications({ userStatus });
        if (response?.status == 200) {
          setUsers(response?.data);
          setFilteredUsers(response?.data);

          if (slugValueOfUser) {
            console.log(response.data,"....");
            
            setTargetUser(
              response?.data.find((user) => user._id === slugValueOfUser)
            );
            setChat(
              allChat.filter((message) => {
                return (
                  (slugValueOfUser === message.sender_id &&
                    message.receiver_id === loggedUser) ||
                  (slugValueOfUser === message.receiver_id &&
                    message.sender_id === loggedUser)
                );
              })
            );
          } else {
            setChat(
              allChat.filter((message) => {
                return (
                  (response?.data[0]._id === message.sender_id &&
                    message.receiver_id === loggedUser) ||
                  (response?.data[0]._id === message.receiver_id &&
                    message.sender_id === loggedUser)
                );
              })
            );

            setTargetUser(response?.data[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    };
    if (userStatus) {
      fetchUsers();
    }
  }, [userStatus, slugValueOfUser]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    setAttachment(null);
    setAttachmentName(null);
  };

  const handleEdit = (index) => { };

  const handleDelete = (index) => { };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setAttachmentName(selectedFile.name);
    setAttachment(selectedFile);
  };

  const goForConversation = async (data) => {
    setTargetUser(data);
    dispatch(markAsRead(data._id));
    setChat(
      allChat.filter((message) => {
        if (
          data._id === message.sender_id ||
          data._id === message.receiver_id
        ) {
          message.reading_status = "1";
        }
        return (
          (data._id === message.sender_id &&
            message.receiver_id === loggedUser) ||
          (data._id === message.receiver_id && message.sender_id === loggedUser)
        );
      })
    );
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = async () => {
    if (inputValue !== "" || attachment != null) {
      try {
        const formData = new FormData();
        formData.append("file", attachment);
        formData.append("inputValue", inputValue);
        const file = formData.get("file");
        // -------------------------------------------------------- send message in socket io ---------------------------------------------------------------
        socket.emit("chat message", {
          inputValue: inputValue,
          targetUser: targetUser._id,
          from: loggedUser,
          file: file,
          attachmentName: attachmentName,
        });
        markAsRead(targetUser._id);
        setInputValue("");
        setAttachmentName(null);
        setAttachment(null);
        const response = await getConversation(targetUser._id);
        if (response?.status == 200) {
          setChat(response?.data.messages);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleSearch = () => {
    const searchResults = users.filter(({ first_name }) => {
      const fullName = `${first_name?.toLowerCase()}`;
      return fullName.includes(searchText?.toLowerCase().trim());
    });
    setFilteredUsers(searchResults);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendClick();
    }
  };
  
  return (
    <ErrorBoundary fallback={<Error />}>
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="m-10 bg-teal-40 md:flex">
              <div className={`${targetUser ? targetUser._id != '' ? 'hidden md:block lg:block' : 'block':'block'}w-570  justify-center items-center bg-skyblue`}>
              <input
                type="text"
                className=" rounded-md m-3 p-1  border-gray border-2"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <a
                className="text-white rounded-md ml-3 pb-[9px] mr-6 p-2 bg-blue"
                onClick={handleSearch}
              >
                Search
              </a>

              {filteredUsers?.length > 0 ? <div className="h-100 overflow-x-auto ">
                {filteredUsers.map((user) => {
                  return (
                    <div
                      onClick={() => goForConversation(user)}
                      key={user._id}
                      className="text-gray rounded-md ml-3 mr-3 mt-3 p-2 bg-darkblue flex justify-between"
                    >
                      <a>
                        <div className="pl-3 text-2x">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="pl-3">{user.email}</div>
                      </a>
                      {getUserUnreadMessageCount(user._id) !== 0 ? (
                        <div className="message-count-syn">
                          {getUserUnreadMessageCount(user._id)}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>:
              <div>
                <p  className="mx-3">Oops! It seems there are no messages available.</p>
              </div>}
            </div>
              <div className={`${targetUser ? targetUser._id != '' ? 'block' : 'hidden md:block lg:block' : "hidden md:block lg:block"} flex md:w-1/2 justify-center items-center bg-white`}>
              <div className="flex flex-col flex-auto h-full ">
                <div className="pl-3 text-2xl">
                  <div className="flex gap-3">
                    <div className="md:hidden block cursor-pointer" onClick={() => setTargetUser({
                      _id: "",
                      first_name: "",
                      last_name: "",
                      email: "",
                    })}>
                      <FontAwesomeIcon icon={faArrowLeft} size="2" />
                    </div>{targetUser?.first_name + " " + targetUser?.last_name}{" "}
                  </div>
                </div>
                <div className="pl-3">{targetUser?.email}</div>
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                  <div
                    className="flex flex-col h-100 overflow-x-auto mb-4"
                    ref={messageContainerRef}
                  >
                    <div className="flex flex-col h-full">
                      {chat?.map((message, index) => (
                        <div
                          key={index}
                          className={`col-start-1 col-end-8 p-3 rounded-lg ${message.user_id === loggedUser
                            ? "justify-end"
                            : "justify-start"
                            }`}
                        >
                          <div className="message-container">
                            <div
                              className={`relative ${message?.user_id === loggedUser
                                ? "mr-3 text-sm bg-skyblue message bot-message"
                                : "ml-3 text-sm bg-chatgray message user-message"
                                } `}
                            >
                              {message?.file !== null && message.file ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <a
                                    href={`${serverUrl}/${message.file}`}
                                    download={message?.file?.split("/").pop()}
                                    className="text-blue-500 hover:underline cursor-pointer"
                                    target="_blank"
                                  >
                                    <svg
                                      style={{
                                        marginRight: "4px",
                                        marginTop: "3px",
                                      }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-box-arrow-down"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"
                                      />
                                    </svg>
                                  </a>
                                  <p>{message.message}</p>
                                </div>
                              ) : (
                                <div>{message.message}</div>
                              )}

                              {/* Add dropdown for each message */}
                              {selectedMessage === index && (
                                <div className="dropdown">
                                  <button onClick={() => handleEdit(index)}>
                                    Edit
                                  </button>
                                  <button onClick={() => handleDelete(index)}>
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div>
                      <div>
                        {/* <div
                          className={`${attachmentName == null ? "hidden" : ""
                            }`}
                        >
                          <marquee>{attachmentName}</marquee>
                        </div> */}

                        {/* <button onChange={removeFile} className={`${attachmentName == null ? 'hidden' : ''} flex items-center justify-center text-gray-400 hover:text-gray-600`} >Cencel</button> */}

                        <button
                          onClick={removeFile}
                            className={`${attachmentName == null ? "hidden" : "px-4 py-1 flex-shrink-0 bg-skyblue hover:bg-blue  hover:text-white rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600"
                            } `}
                        >
                          <span>Cancel</span>
                        </button>

                        <button
                            className={`${attachmentName == null ? "flex items-center justify-center text-gray-400 hover:text-gray-600" : "hidden"}`}
                          onClick={handleButtonClick}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            ></path>
                          </svg>
                        </button>
                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          className={"hidden"}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="flex-grow ml-4">
                      <div className="relative w-full">
                        <input
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          type="text"
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        disabled={
                          inputValue === "" && !attachment ? true : false
                        }
                        onClick={handleSendClick}
                        className={`${inputValue == "" && !attachment ? "opacity-50" : ""
                          }  flex items-center justify-center bg-skyblue hover:bg-blue hover:text-white rounded-md h-10 px-4 py-1 flex-shrink-0`}
                      >
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </ErrorBoundary>
  );
};

export default Message;
