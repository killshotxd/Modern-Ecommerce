import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
const SignIn = lazy(() => import("./Components/SignIn/SignIn"));
const Home = lazy(() => import("./Components/Home/Home"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Account = lazy(() => import("./Components/Account/Account"));
const Admin = lazy(() => import("./Components/Admin/Admin"));
const Checkout = lazy(() => import("./Components/CheckOut/Checkout"));
const ProductInfo = lazy(() => import("./Components/ProductInfo/ProductInfo"));
import { PrivateRoute } from "./Routes/PrivateRoute";
import Categories from "./Components/Categories/Categories";
import Category from "./Components/Categories/Category";
import Welcome from "./Components/Seller/Welcome";

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            className=" flex m-auto items-center justify-center loader"
            style={{ height: "80vh", width: "100vw" }}
          ></div>
        }
      >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/signIn" element={<SignIn />} />
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

            <Route path="/product" element={<ProductInfo />} />
            <Route path="/welcomeSeller" element={<Welcome />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  );
};

export default App;
