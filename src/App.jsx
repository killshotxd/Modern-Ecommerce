import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import SignIn from "./Components/SignIn/SignIn";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Account from "./Components/Account/Account";
import { PrivateRoute } from "./Routes/PrivateRoute";
const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
