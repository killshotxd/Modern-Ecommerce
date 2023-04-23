import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { UserAuth } from "../../Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
const Welcome = () => {
  const { currentUser } = UserAuth();
  console.log(currentUser);

  const [sellerInfo, setSellerInfo] = useState({
    name: currentUser.displayName,
    uid: currentUser.uid,
    photo: currentUser.photoURL,
    email: currentUser.email,
    reason: "",
  });

  const handleInputChange = (event, property) => {
    setSellerInfo((prev) => ({
      ...prev,
      [property]: event.target.value,
    }));
  };

  const addNewSeller = async () => {
    const { uid } = currentUser;
    if (!uid) {
      toast("Please Login First !");
      return;
    }
    const userRef = doc(db, "users", uid);
    if (sellerInfo.reason == "") {
      toast("Please Specify a reason !");
      return;
    }
    await setDoc(
      userRef,
      { seller: true, reason: sellerInfo.reason },
      { merge: true }
    );
    setSellerInfo({
      reason: "",
    });
    toast("You have become a seller now !");
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Build your digital brand and sell with us
            </h1>
            <p className="py-6">
              Are you ready to take your business to the next level? Join our
              community of sellers and start reaching customers all over the
              world. With our easy-to-use platform, you can build your digital
              brand and grow your business in no time. Sell anything from
              handmade crafts to high-tech gadgets – the possibilities are
              endless. Plus, our dedicated support team is always here to help
              you along the way. Sign up now and start selling today!
            </p>
            <div className="mt-4 flex flex-col gap-3 items-center space-x-4">
              <input
                type="text"
                className="bg-white rounded h-full py-2.5 w-full border border-gray-400/50 px-2"
                placeholder="Why You want to become a seller?"
                value={sellerInfo.reason}
                onChange={(event) => handleInputChange(event, "reason")}
              />

              <button
                onClick={() => {
                  addNewSeller();
                }}
                className=" rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white  bg-purple-500"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-white pt-4 min-h-screen hero pb-6">
        <div className="flex items-center hero-content flex-col lg:flex-row-reverse ">
          <div className=" px-8 w-1/2 sm:w-full">
            <div className="text-7xl text-gray-900 font-semibold">
              <h1>Build your digital</h1>
              <h1>brand and sell</h1>
              <h1 className="text-violet-600">with us</h1>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                Are you ready to take your business to the next level? Join our
                community of sellers and start reaching customers all over the
                world. With our easy-to-use platform, you can build your digital
                brand and grow your business in no time. Sell anything from
                handmade crafts to high-tech gadgets – the possibilities are
                endless. Plus, our dedicated support team is always here to help
                you along the way. Sign up now and start selling today!
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <input
                type="text"
                className="bg-white rounded h-full py-2.5 w-3/5 border border-gray-400/50 px-2"
                placeholder="Why You want to become a seller?"
                value={sellerInfo.reason}
                onChange={(event) => handleInputChange(event, "reason")}
              />
              <button
                onClick={() => {
                  addNewSeller();
                }}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="w-1/2 h-full mt-24 overflow-hidden ">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              alt="image"
              className="h-full w-full  object-contain"
            />
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

export default Welcome;
