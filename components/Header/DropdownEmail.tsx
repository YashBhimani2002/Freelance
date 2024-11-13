import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { getUserAllConversation } from "../../app/api/api";
import {
  addLoggedUser,
  addMessageCount,
  addMessages,
} from "../../lib/features/todos/messageSlice";
import { RootState } from "@/lib/store";
import { useSocket } from "@/app/socketContext";

interface DashboardType {
  _id: string;
  login_as: DashboardType;
  dashboard?: {
    status?: number;
  };
}

interface Message {
  _id: string;
  user_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  message_type: string;
  file: string | null;
  reading_status: string;
  user_type: string | null;
  job_id: string | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

interface messageState {
  loggedUser: string;
  messagesCount: number;
  allMessageOfLoggedUser: Message[] | null;
}

const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const DropdownEmail= () => {
  const messageState = useSelector(
    (state: RootState) => state.message
  ) as messageState;
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [loggedUserId, setLoggedUserId] = useState<string>("");

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
 const {socket} = useSocket();
  useEffect(() => {
    if (messageState && messageState.allMessageOfLoggedUser && loggedUserId) {
      const unreadCount = messageState.allMessageOfLoggedUser.reduce(
        (count, message) =>
          count +
          (message?.reading_status === "0" &&
          message.receiver_id === loggedUserId
            ? 1
            : 0),
        0
      );
      dispatch(addMessageCount(unreadCount));
    }
  }, [messageState, loggedUserId, dispatch]);

  useEffect(() => {
    loadChatData();
    if (serverUrl) {
      // const socket = io(serverUrl, {
      //   withCredentials: true,
      //   transports: ["websocket"],
      // });

      socket.on("connect_error", (err:any) => {
        console.error("Socket connection error:", err);
      });

      // return () => {
      //   socket.disconnect();
      // };
    }
  }, [serverUrl]);

  useEffect(() => {
    if (serverUrl) {
      // const socket = io(serverUrl, {
      //   withCredentials: true,
      //   transports: ["websocket"],
      // });
      // get message from  server when a new message is sent by someone else in real time
      socket.on("chat message", (msg:any) => {
        if (
          msg.receiver_id === loggedUserId ||
          msg.sender_id === loggedUserId
        ) {
          dispatch(addMessages(msg));
        }
      });
    }
  }, [loggedUserId, serverUrl]);

  const loadChatData = async () => {
    const response = await getUserAllConversation();
    if (response?.status == 200) {
      setLoggedUserId(response?.data?.loggedUser);
      dispatch(addMessages(response?.data?.messages));
      dispatch(addLoggedUser(response?.data?.loggedUser));
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link ref={trigger} href="/message">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          viewBox="0 0 26 27"
          fill="none"
        >
          <path
            d="M21.6667 22.5H4.33332C3.13671 22.5 2.16666 21.4926 2.16666 20.25V6.65213C2.21715 5.44787 3.17257 4.49886 4.33332 4.5H21.6667C22.8633 4.5 23.8333 5.50736 23.8333 6.75V20.25C23.8333 21.4926 22.8633 22.5 21.6667 22.5ZM4.33332 8.8515V20.25H21.6667V8.8515L13 14.85L4.33332 8.8515ZM5.19999 6.75L13 12.15L20.8 6.75H5.19999Z"
            fill="white"
          />
        </svg>
      </Link>
      {messageState.messagesCount > 0 ? (
        <Link
          href="/message"
          className="absolute -top-2 right-0 bg-red text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md"
        >
          <span className="p-1 text-red-500 rounded-full text-xs">
            {messageState.messagesCount}
          </span>
        </Link>
      ) : (
        <Link href="/message"></Link>
      )}

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5  h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "flex" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image
                  width={112}
                  height={112}
                  src={"/images/user/user-02.png"}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image
                  width={112}
                  height={112}
                  src={"/images/user/user-01.png"}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Robert Jhon
                </h6>
                <p className="text-sm">Can you share your offer?</p>
                <p className="text-xs">10min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image
                  width={112}
                  height={112}
                  src={"/images/user/user-03.png"}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Henry Dholi
                </h6>
                <p className="text-sm">I cam across your profile and...</p>
                <p className="text-xs">1day ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image
                  width={112}
                  height={112}
                  src={"/images/user/user-04.png"}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image
                  width={112}
                  height={112}
                  src={"/images/user/user-02.png"}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownEmail;
