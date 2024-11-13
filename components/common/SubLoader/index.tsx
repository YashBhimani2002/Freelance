import "./style.css";
const SubLoader = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center bg-white flex-col">
      <div className="progressLoader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
      <p style={{textAlign:'center' , paddingTop:'40px'}}>Loading... Please Wait</p>
    </div>
  );
};

export default SubLoader;
// import "./style.css";
// const SubLoader = () => {
//   return (
//     <div className="grid content-center w-screen h:screen z-[999999] fixed top-0 bottom-0 left-0 bg-black bg-opacity-80">
//       <div className="loading"></div>
//     </div>
//   );
// };

// export default SubLoader;
