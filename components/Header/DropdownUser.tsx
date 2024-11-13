import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardStatus } from "../../lib/features/todos/professionalClientSidebar";
import { RootState } from "../../lib/store";
import { useRouter } from "next/navigation";
import { logout, switchAccount, viewProfile } from "../../app/api/api";
import Cookies from "js-cookie";
import Loader from "@/components/common/Loader";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


interface DropdownUser {
  retrievedCookie: string | undefined;
}


const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Changed initial loading state to false

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const [SwitchAccount, setSwitchAccount] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false); // Added state to control the visibility of the page loader
  const [loaderStatus, setLoaderStatus] = useState(false); // Added state to control the visibility of the loader
  const retrievedCookie: string | undefined = Cookies.get("authToken");
  const decodedToken: JwtPayload | null = retrievedCookie ? jwt.decode(retrievedCookie) as JwtPayload : null;

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

  const dispatch = useDispatch();
  const dashboardStatus = useSelector(
    (state: RootState) => state.dashboard.status
  );

  const switchDashboard = async () => {
    setLoading(true);
    setShowPageLoader(true);
    const newStatus = dashboardStatus === 1 ? 2 : 1;
    try {
      setLoaderStatus(true); // Show loader when account switching starts
      const res = await switchAccount({
        login_as: newStatus,
      });
      if (res?.status == 200) {
        const existingToken = Cookies.get("authToken");
        const options = {
          expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        };
        if (!existingToken) {
          Cookies.set("authToken", res?.data?.token , options);
        }
        // Cookies.set("authToken", res?.data?.token);
        window.location.href = res?.data?.route;
        dispatch(setDashboardStatus(newStatus));
        setSwitchAccount(false); // Disable the popup after successful account switch
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowPageLoader(false);
      // Move the line below outside of the finally block
    }
    setLoaderStatus(false); // Hide loader when account switching ends (whether success or failure)
  };


  const handleLogoutClick = async () => {
    try {
      const response = await logout();
      if (response?.status === 200) {
        localStorage.removeItem("user-data");
        document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [userData, setUserData] = useState({ avatar: "" });
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const getviewprofile = async () => {
    try {
      const response = await viewProfile();
      if (response?.data?.user) {
        setUserData(response.data.user);
        dispatch(setDashboardStatus(response.data.user.login_as));
      } else {
        console.error("Invalid response or missing user data.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getviewprofile();
  }, []);

  return (
    <>
      <div className="relative">
        <Link
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="h-12 w-12 rounded-full ">
            <img
              className="rounded-full h-[50px] w-[50px]"
              src={
                userData?.avatar
                  ? `${url}/public/uploads/profile_attachments/${userData?.avatar}`
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="User"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
              }}
            />
          </span>
        </Link>

        {/* <!-- Dropdown Start --> */}
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`max-w-40 absolute right-[-6px] top-7  mt-4  w-62.5 flex-col rounded-sm bg-[#f1f1f1] shadow-[0_8px_16px_0px_rgba(0,0,0,0.2)] ${
            dropdownOpen === true ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col">
            <li className="p-[10px] border border-[#eee]">
              <Link
                href="/profile"
                className="flex items-center text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FontAwesomeIcon
                  icon={faSignOut as IconProp}
                  color="black"
                  className="mr-[5px]"
                />
                View Profile
              </Link>
            </li>
            <li className="p-[10px] border border-[#eee]">
              <Link
                href="#"
                className="flex items-center text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FontAwesomeIcon
                  icon={faUser as IconProp}
                  color="black"
                  className="mr-[5px]"
                />
                <div onClick={() => setSwitchAccount(true)}>
                  {dashboardStatus === 1
                    ? "Professional Account"
                    : "Client Account"}{" "}
                </div>
              </Link>
            </li>
            <li className="p-[10px] border border-[#eee]">
              <Link
                href=""
                className="flex items-center text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={handleLogoutClick}
              >
                <FontAwesomeIcon
                  icon={faSignOut as IconProp}
                  color="black"
                  className="mr-[5px]"
                />
                Logout
              </Link>
            </li>
          </ul>
        </div>
        {/* <!-- Dropdown End --> */}
      </div>
      {SwitchAccount ? (
        <div className="fixed top-0 z-999999 w-255 max-w-[40%] left-[48%] top-[29%] md:left-[26%] md:top-[33%]">
          <div className="flex justify-end relative z-2">
            <button
              onClick={() => {
                setSwitchAccount(!SwitchAccount);
              }}
              className="pb-[5px] border bg-white p-0 w-10 h-10 rounded-full mt-0 cursor-pointer flex justify-center items-center text-2xl font-[900] leading-none text-[#1068ad]"
            >
              ×
            </button>
          </div>
          <div className="bg-white fixed w-[74%] left-[12%] md:w-[35%] top-[50%] md:left-[30%] z-1 rounded-[25px] border border-[#c7c7c7]">
            {loaderStatus ? (
             <Loader/>
            ) : (
              <>
                <div className="p-4 flex-1 relative border-b border-[#e9ecef]">
                  <p className="text-black font-semibold tracking-normal">
                    {dashboardStatus === 1 &&
                    decodedToken?.professional_profile_complete === 1
                      ? "Do you want to switch to a Professional account?"
                      : dashboardStatus === 1
                      ? "Do you want to create a Professional account?"
                      : dashboardStatus === 2 &&
                        decodedToken?.client_profile_complete === 1
                      ? "Do you want to switch to a client account?"
                      : dashboardStatus === 2
                      ? "Do you want to Create a Client account?"
                      : null}
                  </p>
                </div>
                <div className="flex justify-end items-center p-4 border-t border-[#e9ecef] gap-2">
                  <button
                    onClick={() => {
                      setSwitchAccount(!SwitchAccount);
                    }}
                    className="text-white bg-[#dc3545] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      switchDashboard();
                    }}
                    className="text-white bg-[#28a745] inline-block font-[400] text-center whitespace-nowrap align-middle select-none border border-transparent px-3 py-2 text-4 leading-normal rounded transition duration-150 ease-in-out"
                  >
                    Yes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DropdownUser;
