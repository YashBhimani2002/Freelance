import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getNotification, updateNotificationStatus } from "@/app/api/api";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { Url } from "next/dist/shared/lib/router/router";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Loader from "@/components/common/Loader";
import { useSocket } from "../../app/socketContext";

const DropdownNotification = () => {
  const [dashboard, setDashboard] = useState<DashboardType>();
  const [accountType, setAccountType] = useState<number | null>(null); // Corrected type declaration

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [notificationArray, setNotificationArray] = useState<any>([]);
  const [msg, setmessage] = useState<Notification[]>([]);
  const [isLoaderOff, setisLoaderOff] = useState(true);
  const [isNotification, setIsNotification] = useState<boolean>(true);
  const [isActive, setIsActive] = useState(true);
  const { activate } = useSocket();
  useEffect(() => {
    setIsActive(activate);
  }, [activate]);
  interface Notification {
    rout: Url;
    id: string;
    message: string;
    _id: string;
    status: number;
  }

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  interface DashboardType {
    login_as: DashboardType;
    dashboard?: {
      status?: number;
    };
  }
  useEffect(() => {
    const retrievedCookie = Cookies.get("authToken");

    if (retrievedCookie) {
      const decodedToken = jwt.decode(retrievedCookie);
      if (decodedToken) {
        setDashboard(decodedToken as DashboardType);
      }
    }
  }, []);
  const get_notification = useSelector((state: RootState) => state.socket);

  const loadNotification = async () => {
    try {
      setNotification([]);
      let usrLoginStatus: any;
      const retrievedCookie = Cookies.get("authToken");
      if (retrievedCookie) {
        const decodedToken = jwt.decode(retrievedCookie);
        if (decodedToken) {
          // setDashboard(decodedToken as DashboardType);
        // console.log(decodedToken, "usrLoginStatus...");

          usrLoginStatus = decodedToken;
        }
      }
      const response = await getNotification(usrLoginStatus?.login_as);
      if (response && response?.data && response?.data?.success === true) {
        setIsActive(response?.data?.status);
        setNotification(response?.data?.notifications);
        setisLoaderOff(false);
      }
    } catch (error) {
      console.error("Error fetching notification:", error);
    }
  };

  const handleNotificationClick = async (message: string) => {
    try {
      const response = await updateNotificationStatus({ message });
      if (response && response?.data && response?.data?.success === true) {
        setisLoaderOff(true);
        loadNotification();
      } else {
        console.error("Error updating notification status:", response);
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };
  const { socket } = useSocket();
  useEffect(() => {
    let usrLoginStatus: any;
    const retrievedCookie = Cookies.get("authToken");
    if (retrievedCookie) {
      const decodedToken = jwt.decode(retrievedCookie);
      if (decodedToken) {
        // setDashboard(decodedToken as DashboardType);
        usrLoginStatus = decodedToken;
      }
    }
    socket.on(
      "refresh_notification",
      (data: { login_as: number | string; id: number | string }) => {
        // console.log(usrLoginStatus, "usrLoginStatus...");
        if (usrLoginStatus && data?.login_as == 1 || (data?.login_as == 2 )) {
          if (usrLoginStatus?._id == data.id) {
            loadNotification();
          }
        } else if (data.login_as == 3) {
          loadNotification();
        }
      }
    );
  }, []);
  useEffect(() => {
    if (serverUrl && dashboard) {
      // const socket = io(serverUrl, {
      //   withCredentials: true,
      //   transports: ["websocket"],
      // });

      socket.on("Decline Notification", (data: any) => {
        console.log("notification trigger : Decline Notification");

        setIsNotification(true);
        loadNotification();
      });

      // return () => {
      //   socket.disconnect();
      // };
    }
  }, [serverUrl, dashboard]);

  useEffect(() => {
    loadNotification();
  }, [
    accountType,
    dashboard,
    get_notification,
    notificationArray,
    isNotification,
  ]);

  return (
    <div className={`${isActive ? "relative" : "hidden"}`}>
      <Link
        ref={trigger}
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
        className="flex items-center gap-4 cursor-pointer"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          viewBox="0 0 25 27"
          fill="none"
        >
          <path
            d="M12.5 24.75C11.3494 24.75 10.4167 23.7426 10.4167 22.5H14.5833C14.5833 23.7426 13.6506 24.75 12.5 24.75ZM20.8333 21.375H4.16666V19.125L6.24999 18V11.8125C6.24999 7.91775 7.7302 5.39213 10.4167 4.7025V2.25H14.5833V4.7025C17.2698 5.391 18.75 7.9155 18.75 11.8125V18L20.8333 19.125V21.375ZM12.5 6.46875C11.2288 6.3801 10.0029 6.99444 9.24478 8.1C8.59639 9.20763 8.27826 10.5034 8.33332 11.8125V19.125H16.6667V11.8125C16.7217 10.5034 16.4035 9.20766 15.7552 8.1C14.9971 6.99444 13.7712 6.3801 12.5 6.46875Z"
            fill="white"
          />
        </svg>
        {notification &&
        notification.filter((noti) => noti.status !== 1).length > 0 ? (
          <div className="absolute -top-2 right-0 bg-red text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            <span className="p-1 text-red-500 rounded-full text-xs">
              {notification.filter((noti) => noti.status !== 1).length}
            </span>
          </div>
        ) : (
          <></>
        )}
      </Link>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`max-w-60 absolute right-[-35px] top-7  mt-4  w-62.5 flex-col rounded-sm bg-[#f1f1f1] shadow-[0_8px_16px_0px_rgba(0,0,0,0.2)] ${
          dropdownOpen === true ? "block flex" : "hidden"
        }`}
        style={{ maxHeight: "250px", overflowY: "auto" }}
      >
        {isLoaderOff ? (
          <div className="p-2">
            <p>Loading..</p>
          </div>
        ) : (
          <ul className="flex flex-col">
            {notification && notification.length > 0 ? (
              notification.map((noti) => (
                <li
                  key={noti.id}
                  className={`p-2 hover:bg-gray-100 ${noti.status !== 0} `}
                  style={{
                    color:
                      noti.status !== 0
                        ? noti.status === 1
                          ? "#ccc"
                          : "inherit"
                        : "inherit",
                  }}
                >
                  <span
                    onClick={() => {
                      noti.status === 0 && handleNotificationClick(noti._id);
                    }}
                    className="cursor-pointer"
                  >
                    {noti.status === 0 && noti.rout !== undefined ? (
                      <Link href={noti.rout} className="text-sm font-medium">
                        {noti.message}
                      </Link>
                    ) : (
                      <Link href={noti.rout} className="text-sm font-medium">
                        {noti.message}
                      </Link>
                    )}
                  </span>
                </li>
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
        )}
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownNotification;
