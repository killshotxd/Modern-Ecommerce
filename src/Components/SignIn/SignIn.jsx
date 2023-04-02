import React, { useEffect } from "react";
import { UserAuth } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
export const SignIn = () => {
  const navigate = useNavigate();
  const { currentUser, signInGoogle } = UserAuth();

  const handleLogin = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } else return;
  }, [currentUser]);

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">Modern E-Commerce</h1>
          <p className="mb-5">
            We Don't Make Ecommerce. We Make Ecommerce Better.
          </p>
          <button onClick={handleLogin} className="btn glass">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

SignIn.displayName = "SignIn";

export default SignIn;
