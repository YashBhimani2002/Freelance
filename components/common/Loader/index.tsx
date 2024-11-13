import "./style.css";

const Loader = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center bg-white flex-col">
      <div className="progressLoader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
      <p style={{textAlign:'center' , paddingTop:'40px'}}>Loading... Please Wait</p>
    </div>
  );
};

// const Loader = () => {
//   return (
//     <div className="flex h-screen items-center justify-center bg-white scrollbar-custom">
//       <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
//     </div>
//   );
// };

export default Loader;
