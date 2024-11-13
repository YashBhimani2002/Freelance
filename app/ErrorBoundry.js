import React, { Component } from "react";
import ErrorImage from "../components/assets/ApiError.jpg"
import Image from "next/image";
import { Inter } from 'next/font/google';

const inter600 = Inter({ subsets: ["latin"], weight: "600" });
const inter400 = Inter({ subsets: ["latin"], weight: "400" });

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    console.log("test no error message");
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    console.log("test error message", error);

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log("test error", { error, errorInfo });
    this.setState({ hasError: true });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-1 justify-center items-center flex-col mt-[21vh]">
            <Image src={ErrorImage} className='w-[17rem] h-[8rem] md:w-[23rem] md:h-[12rem] lg:w-[29rem] lg:h-[13rem]' />
            <p className={`text-center ${inter600.className} py-2`}>Oops, there is an error! </p>
            <button
            type="button"
            className={`${inter400.className} border border-transparent bg-[#190058] text-white rounded-full py-2 px-8 hover:border-[#190058] hover:bg-white hover:text-[#190058]`}
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
            </button>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
