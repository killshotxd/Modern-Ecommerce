import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../Firebase";
import {
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { UserAuth } from "../../Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  const getProducts = async () => {
    const q = collection(db, `category/${name}/item`);
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      did: doc.id,
      ...doc.data(),
    }));

    setProducts(products);

    return products;
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Header />
      <section className="text-gray-600 dark:text-gray-900 body-font">
        <div className="flex pl-8 pr-8 md:text-left text-center md:justify-between justify-center items-center">
          <div>
            <h2 className="text-3xl font-medium">{name}</h2>
            <div className="mt-2">Choose from variety of items</div>
          </div>
          <div
            onClick={() => {
              navigate("/categories");
            }}
            className="md:flex hidden items-center uppercase cursor-pointer text-gray-500"
          >
            All Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="ml-1 w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products?.map((product) => (
              <div key={product.name} className="lg:w-1/4 sm:w-1/2 p-4 w-full">
                <a
                  className="block relative h-48 rounded overflow-hidden"
                  onClick={() => {
                    navigate("/product", { state: product });
                  }}
                >
                  <img
                    alt={product.name}
                    className="object-contain object-center w-full h-full block"
                    src={product.imageSrc}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 dark:text-gray-300 text-xs tracking-widest title-font mb-1">
                    {product.brand}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium dark:text-white">
                    {product.name}
                  </h2>
                  <p className="mt-1 dark:text-gray-300">
                    {" "}
                    {" ₹" + product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                navigate("/categories");
              }}
              type="button"
              className="px-6 py-2 border rounded-md dark:border-violet-400"
            >
              Back
              <span className="sr-only sm:not-sr-only"> to categories</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
