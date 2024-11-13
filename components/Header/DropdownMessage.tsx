import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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
      <Link ref={trigger} href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M12.9998 23.8337C7.01948 23.8271 2.17307 18.9807 2.1665 13.0003V12.7837C2.2856 6.83025 7.18731 2.08896 13.1414 2.16797C19.0955 2.24697 23.8697 7.11664 23.8308 13.0711C23.7919 19.0256 18.9545 23.8325 12.9998 23.8337ZM12.9825 21.667H12.9998C17.7846 21.6622 21.6602 17.7808 21.6578 12.996C21.6554 8.21124 17.7759 4.33368 12.9912 4.33368C8.20639 4.33368 4.3269 8.21124 4.3245 12.996C4.32211 17.7808 8.19773 21.6622 12.9825 21.667ZM14.0832 19.5003H11.9165V17.3337H14.0832V19.5003ZM14.0832 16.2503H11.9165C11.8823 14.8395 12.6165 13.5212 13.834 12.8075C14.549 12.2593 15.1665 11.787 15.1665 10.8337C15.1665 9.63706 14.1965 8.66701 12.9998 8.66701C11.8032 8.66701 10.8332 9.63706 10.8332 10.8337H8.6665V10.7362C8.68392 9.18803 9.52594 7.76677 10.8754 7.00778C12.2248 6.24879 13.8767 6.26737 15.2087 7.05653C16.5408 7.84569 17.3506 9.28553 17.3332 10.8337C17.2556 12.0026 16.6286 13.0656 15.6432 13.6991C14.7523 14.2583 14.175 15.2026 14.0832 16.2503Z"
            fill="white"
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
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

export default DropdownMessage;
