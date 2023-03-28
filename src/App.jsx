import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import SignIn from "./Components/SignIn/SignIn";
const App = () => {
  return (
    <>
      {/* // <AuthProvider> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
      {/* </AuthProvider> */}
    </>
  );
};

export default App;
