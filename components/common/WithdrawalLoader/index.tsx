import "./style.css";
const WithdrawalLoader = () => {
  return (
    <div className="grid content-center w-screen h:screen z-[999999] fixed top-0 bottom-0 left-0 bg-black bg-opacity-80">
      <div className="container">
        <div className="i-loader-inf-horizontal-container">
          <div className="i-loader-inf-horizontal"></div>
          <div className="pt-8px">
            <span className="text-white">Processing Withdrawal, Please Wait...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalLoader;