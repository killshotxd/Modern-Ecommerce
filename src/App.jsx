import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import SignIn from "./Components/SignIn/SignIn";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Account from "./Components/Account/Account";
const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
