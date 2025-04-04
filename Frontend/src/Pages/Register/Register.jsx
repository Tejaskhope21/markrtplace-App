// import React, { useContext, useEffect } from "react";
// import Login from "../../components/Login/Login";
// import ProductAdmin from "../../components/ProductAdmin/ProductAdmin";
// import "./Register.css";
// import { StoreContext } from "../../components/context/StoreProvider";
// import { useNavigate } from "react-router-dom";

// function Register({ setShowLogin }) {
//   const { setSelectedOption, selectedOption } = useContext(StoreContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedOption === "user") {
//       navigate("/login");
//     } else if (selectedOption === "admin") {
//       navigate("/register");
//     }
//   }, [selectedOption, navigate]);

//   const handleBackClick = () => {
//     setSelectedOption(null);
//     navigate("/");
//   };

//   return (
//     <div className="register-container">
//       {!selectedOption && (
//         <div className="register-container">
//           <button className="back-button" onClick={handleBackClick}>
//             ⬅ Back
//           </button>
//           <h1 className="register-title">Select an Option</h1>
//           <div className="option-container">
//             <div
//               className="option-box"
//               onClick={() => setSelectedOption("user")}
//             >
//               User Login
//             </div>
//             <div
//               className="option-box"
//               onClick={() => setSelectedOption("admin")}
//             >
//               Register as Shop Admin
//             </div>
//           </div>
//         </div>
//       )}

//       {selectedOption === "user" && <Login setShowLogin={setShowLogin} />}
//       {selectedOption === "admin" && (
//         <ProductAdmin setShowLogin={setShowLogin} />
//       )}
//     </div>
//   );
// }

// export default Register;
import React, { useContext, useEffect } from "react";
import Login from "../../components/Login/Login";
import "./Register.css";
import { StoreContext } from "../../components/context/StoreProvider";
import { useNavigate } from "react-router-dom";

function Register({ setShowLogin }) {
  const { setSelectedOption, selectedOption } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedOption === "user") {
      navigate("/login");
    } else if (selectedOption === "admin") {
      navigate("/productadmin"); // Navigate to /productadmin instead of /register
    }
  }, [selectedOption, navigate]);

  const handleBackClick = () => {
    setSelectedOption(null);
    navigate("/");
  };

  return (
    <div className="register-container">
      {!selectedOption && (
        <div className="register-container">
          <button className="back-button" onClick={handleBackClick}>
            ⬅ Back
          </button>
          {/* <h1 className="register-title">Select an Option</h1> */}
          <div className="option-container">
            <div
              className="option-box"
              onClick={() => setSelectedOption("user")}
            >
              User Login
            </div>
            <div
              className="option-box"
              onClick={() => setSelectedOption("admin")}
            >
              Register as Shop Admin
            </div>
          </div>
        </div>
      )}

      {selectedOption === "user" && <Login setShowLogin={setShowLogin} />}
      {/* {selectedOption === "admin" && (
        <ProductAdmin setShowLogin={setShowLogin} />)} */}
    </div>
  );
}

export default Register;