"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import LoginPage from "@/components/Login/login";
import ForgotPass from "@/components/Forgot/forgot";
import Signup from "@/components/Signup/signup";
import Client from "@/components/Client/Client";
import Signup2 from "@/components/professional-signUp/professionalSignup";
import Signup3 from "@/components/companySignup/companysignup";
import LinkedInPage from "@/app/linkedin/callback/page";

import { Provider } from "react-redux";
import store from "../lib/store";
import Home1 from "./landing-page/Home1";

import Helpsupport from "./help-support/Helpmain1";
import Contactpage from "./contact-us/Contactmain";
import Aboutpage from "./about-us/Aboutmain";
import Paymentpage from "./payment-policy/Paymentmain";
import Policymain from "./policy/Policymain";
import Faqspage from "./faqs/FaqsMain";
import FaqsMain from "./faqs/FaqsMain";
import ResetPassword from "@/components/reset-password/[slug]/page";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setNotificationMessage } from "@/lib/features/todos/socketio";
import { setSocket } from "../Redux/actions";
import InactivityTimer from "./InactivityTimer/InactivityTimer";
import { logout } from "./api/api";
import OuterFindWork from "./outerfindwork/page";
import { SocketProvider } from "./socketContext";
import InternetLoss from "../components/InternetLoss/page";
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "", {
  transports: ["websocket"],
});
const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isForgotPage, setIsForgotPage] = useState(false);
  const [isLinkedInCallback, setIsLinkedInCallback] = useState(false);
  const [isSignupPage, setIsSignupPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isouterfindwork, setIsouterfindwork] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isPolicy, setIsPolicy] = useState(false);
  const [isFaqs, setIsFaqs] = useState(false);
  const [isClientPage, setIsClientPage] = useState(false);
  const [issignup2, setIssignup2] = useState(false);
  const [issignup3, setIssignup3] = useState(false);
  const [isResetPassPage, setIsResetPassPage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageRecived, setMessageRecived] = useState([]);
  const [decodetoken, setdecodetoken] = useState<any>([]);
  const [isPhone, setIsPhone] = useState<any>();

  useEffect(() => {
    if (authToken) {
      // Connect socket if authToken exists
      socket.connect();
    } else {
      // Disconnect socket if no authToken
      socket.disconnect();
    }

    // Clean up socket on component unmount
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [authToken]); 
  
  useEffect(() => {
    const handleResize = () => setIsPhone(window.innerWidth <= 1094);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const retrievedCookie = Cookies.get("authToken");

  useEffect(() => {
    const authTokenFromCookie = getAuthTokenFromCookie();
    setAuthToken(authTokenFromCookie);
    setTimeout(() => setLoading(false), 1000);
    const currentPath = window.location.pathname;
    setIsForgotPage(currentPath === "/forgot-password");
    setIsSignupPage(currentPath === "/signup");
    setIsLoginPage(currentPath === "/login");
    setIsHelp(currentPath === "/help-support");
    setIsClientPage(currentPath.startsWith("/signup/"));
    setIssignup2(currentPath.startsWith("/create-company-profile/"));
    setIssignup3(currentPath.startsWith("/company-profile/"));
    setIsLinkedInCallback(currentPath === "/linkedin/callback");
    setIsContact(currentPath.startsWith("/contact-us"));
    setIsouterfindwork(currentPath.startsWith("/freelance-find-work"));
    setIsAbout(currentPath.startsWith("/about-us"));
    setIsPayment(currentPath.startsWith("/payment-policy"));
    setIsPolicy(currentPath.startsWith("/policy"));
    setIsFaqs(currentPath.startsWith("/faqs"));
    setIsResetPassPage(currentPath.startsWith("/reset-password"));
  }, []);

  const getAuthTokenFromCookie = () => {
    const cookieArray = document.cookie.split("; ");
    for (const cookie of cookieArray) {
      const [key, value] = cookie.split("=");
      if (key === "authToken") {
        return value;
      }
    }
    return null;
  };

  const componentMap = {
    ForgotPass: <ForgotPass />,
    Signup: <Signup />,
    Client: <Client />,
    Signup2: <Signup2 />,
    Signup3: <Signup3 />,
    LoginPage: <LoginPage />,
    LinkedInPage: <LinkedInPage />,
    Helpsupport: <Helpsupport />,
    Contactpage: <Contactpage />,
    outerfindwork: <OuterFindWork />,
    Aboutpage: <Aboutpage />,
    Paymentpage: <Paymentpage />,
    Policymain: <Policymain />,
    FaqsMain: <FaqsMain />,
    Home1: <Home1 />,
    ResetPassword: <ResetPassword />,
    Children: children,
  };

  // Determine which component to render based on conditions
  let componentToRender;
  if (loading) {
    componentToRender = <Loader />;
  } else if (authToken) {
    componentToRender = (
      <>
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          socket={socket}
        />
        <div className="flex min-h-screen overflow-hidden scrollbar-custom">
          {isHelp ||
          isAbout ||
          isContact ||
          isFaqs ||
          (!isPhone && isPayment) ? (
            <></>
          ) : (
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              socket={socket}
            />
          )}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden no-scrollbar scrollbar-custom">
            <main>
              {isHelp ||
              isAbout ||
              isContact ||
              isouterfindwork ||
              isFaqs ||
              isPayment ? (
                <>{children}</>
              ) : (
                <div className="max-w-screen-2xl p-2 lg:px-12 lg:py-6 scrollbar-custom">
                  {children}
                </div>
              )}
            </main>
          </div>
        </div>
        <div className="block  z-9999 w-full ">
          {isHelp ||
          isAbout ||
          isContact ||
          isouterfindwork ||
          isFaqs ||
          isPayment ? (
            <></>
          ) : (
            <Footer />
          )}
        </div>
      </>
    );
  } else {
    componentToRender =
      componentMap[
        isouterfindwork
          ? "outerfindwork"
          : isForgotPage
          ? "ForgotPass"
          : isSignupPage
          ? "Signup"
          : isClientPage
          ? "Client"
          : issignup2
          ? "Signup2"
          : issignup3
          ? "Signup3"
          : isLoginPage
          ? "LoginPage"
          : isLinkedInCallback
          ? "LinkedInPage"
          : isHelp
          ? "Helpsupport"
          : isContact
          ? "Contactpage"
          : isAbout
          ? "Aboutpage"
          : isPayment
          ? "Paymentpage"
          : isPolicy
          ? "Policymain"
          : isFaqs
          ? "FaqsMain"
          : isResetPassPage
          ? "ResetPassword"
          : "Home1"
      ];
  }

  useEffect(() => {
    // Load Tawk.to script
    const tawkToScript = document.createElement("script");
    tawkToScript.async = true;
    tawkToScript.src =
      "https://embed.tawk.to/607f187662662a09efc072f9/1f3o7f498";
    tawkToScript.charset = "UTF-8";
    tawkToScript.setAttribute("crossorigin", "*");
    document.body.appendChild(tawkToScript);

    return () => {
      // Clean up Tawk.to script on unmount
      document.body.removeChild(tawkToScript);
    };
  }, []);

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

  const handleTimeout = async () => {
    // Action to perform on timeout
    await handleLogoutClick();
    window.location.href = "/login";
  };
  // Render the component
  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* Pass onTimeout to InactivityTimer */}
        <InactivityTimer onTimeout={handleTimeout} />
        <AppWrapper componentToRender={componentToRender} />
      </SocketProvider>
    </Provider>
  );
}

const AppWrapper = (props: any) => {
  const { componentToRender } = props;
  const dispatch = useDispatch(); // Works!
  const [NotificationMessage, setNotificationMessagess] = useState([]);
  useEffect(() => {
    socket.on("res_notification", (data) => {
      setNotificationMessagess(data);
      dispatch(setNotificationMessage(data)); // Dispatch the action
    });
    // let stringSocketData =  JSON.stringify(socket);
    // console.log(stringSocketData);
    // dispatch(setSocket(stringSocketData));
  }, [dispatch, socket]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="scrollbar-custom">
      <InternetLoss />
        <div className="dark:bg-boxdark-2 dark:text-bodydark bg-white scrollbar-custom">
          {componentToRender}
        </div>
      </body>
    </html>
  );
};
