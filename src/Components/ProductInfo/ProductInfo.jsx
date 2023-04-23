import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
const ProductInfo = () => {
  const { state } = useLocation();
  const [cartItemLength, setCartItemLength] = useState();
  const [editProduct, setEditProduct] = useState([state] || {});
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setEditProduct(state || {});
  //   }, [state]);

  console.log(editProduct);

  const { currentUser } = UserAuth();

  const getCartItem = async () => {
    let cartItemRef = await collection(db, "cart", `${currentUser.uid}/items`);
    let querySnapshot = await getDocs(cartItemRef);
    let products = querySnapshot.docs.map((doc) => ({
      did: doc.id,
      ...doc.data(),
    }));

    localStorage.setItem("prLen", products.length);
    setCartItemLength(products?.length);
    return products;
  };

  const addToCart = async (product) => {
    if (!currentUser) {
      toast("Please Login First !");
      return;
    }
    try {
      const { uid, displayName } = currentUser;

      const cartRef = collection(db, "cart", `${uid}/items`);
      const querySnapshot = await getDocs(cartRef);
      const cartItems = querySnapshot.docs.map((doc) => doc.data());
      // Check if item already exists in cart
      const existingItem = cartItems.find(
        (item) => item.id === product.id && item.name === product.name
      );
      if (existingItem) {
        toast("Item already exists in cart!");
        return;
      }

      const cartData = {
        brand: product.brand,
        color: product.color,
        href: product.href,
        id: product.id,
        imageAlt: product.imageAlt,
        imageSrc: product.imageSrc,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        ratings: product.ratings,
        addedAt: serverTimestamp(),
        addedById: uid,
        addedByName: displayName,
      };

      await addDoc(collection(db, "cart", `${uid}/items`), cartData);
      toast("Item added to cart!");
      getCartItem();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header products={cartItemLength} />
      <ToastContainer />
      <section className="text-gray-600 dark:bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          {editProduct?.map((product) => (
            <div key={product.id} className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="APPLE iPhone 11 (White, 128 GB)"
                className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded"
                src={product.imageSrc}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
                  {product.brand}
                </h2>
                <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                  {product.name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-purple-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-purple-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-purple-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-purple-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-purple-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300 ml-3">
                      {product.reviews}
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed dark:text-gray-300">
                  {product.description}
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  {/* <div className="flex">
                    <span className="mr-3 dark:text-gray-300">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div> */}
                  {/* <div className="flex items-center ml-auto dark:text-white">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div> */}
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">
                    {" ₹" + product.price?.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product);
                    }}
                    className="ml-auto rounded-md bg-purple-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Add To Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>

                <div className="flex justify-end space-x-4 py-4">
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    type="button"
                    className="px-6 py-2 font-bold border text-white  bg-purple-500 rounded-md dark:border-violet-400"
                  >
                    Back
                    {/* <span className="sr-only sm:not-sr-only"> </span> */}
                  </button>
                  {/* <button
                    onClick={() => {
                      navigate("/checkout", { state: { products } });
                    }}
                    type="button"
                    className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
                  >
                    <span className="sr-only sm:not-sr-only">Continue to</span>{" "}
                    Checkout
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductInfo;
