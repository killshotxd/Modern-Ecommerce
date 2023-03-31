import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import SignIn from "./Components/SignIn/SignIn";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Account from "./Components/Account/Account";
import { PrivateRoute } from "./Routes/PrivateRoute";
import Admin from "./Components/Admin/Admin";
import Checkout from "./Components/CheckOut/Checkout";
import ProductInfo from "./Components/ProductInfo/ProductInfo";

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
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route
            path="/product"
            element={
              <PrivateRoute>
                <ProductInfo />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
