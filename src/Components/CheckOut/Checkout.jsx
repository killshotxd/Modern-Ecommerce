import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import { UserAuth } from "../../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const { state } = useLocation();
  const { products } = state || {};
  const [editProduct, setEditProduct] = useState();
  useEffect(() => {
    setEditProduct(products);
  }, []);

  const { currentUser } = UserAuth();
  console.log(products);

  const getCartItem = async () => {
    const { uid } = currentUser;
    const cartItemRef = await collection(db, "cart", `${uid}/items`);
    const querySnapshot = await getDocs(cartItemRef);
    const products = querySnapshot.docs.map((doc) => ({
      did: doc.id,
      ...doc.data(),
    }));

    localStorage.setItem("prLen", products.length);

    setEditProduct(products);

    return products;
  };

  const removeItem = async (did) => {
    console.log("clicked");
    console.log(did);
    const { uid } = currentUser;
    const cartItemRef = doc(db, "cart", `${uid}/items`, did);
    try {
      await deleteDoc(cartItemRef);
      getCartItem();
      toast("Item successfully removed from cart");
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto my-4 md:my-6">
        {editProduct?.map((product) => (
          <div className="overflow-hidden  shadow rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product List */}
              <div className="px-5 py-6 bg-gray-100 dark:bg-gray-500 dark:text-gray-900 md:px-8">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 -my-7">
                    <li
                      key={product.id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex items-stretch flex-1">
                        <div className="flex-shrink-0">
                          <img
                            className="w-20 h-20 border border-gray-200 bg-white rounded-lg object-contain"
                            src={product.imageSrc}
                            alt={product.imageSrc}
                          />
                        </div>

                        <div className="flex flex-col justify-between ml-5">
                          <div className="flex-1">
                            <p className="text-sm font-bold ">{product.name}</p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-900">
                              {product.color}
                            </p>
                          </div>

                          <p className="mt-4 text-sm font-medium ">
                            x {product.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between ml-auto">
                        <p className="text-sm font-bold text-right text-gray-900 dark:text-black">
                          ₹ {product.price}
                        </p>

                        <button
                          onClick={() => {
                            removeItem(product.did);
                          }}
                          type="button"
                          className="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                        >
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>

                <hr className="mt-6 border-gray-200" />

                <form action="#" className="mt-6">
                  <div className="sm:flex sm:space-x-2.5 md:flex-col lg:flex-row md:space-x-0 lg:space-x-2.5">
                    <div className="flex-grow">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        placeholder="Enter coupon code"
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                      <button className="rounded-md bg-gray-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-gray-500">
                        Apply coupon
                      </button>
                    </div>
                  </div>
                </form>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center justify-between text-gray-600 dark:text-gray-900">
                    <p className="text-sm font-medium">Sub total</p>
                    <p className="text-sm font-medium">{}</p>
                  </li>

                  <li className="flex items-center justify-between text-gray-900 dark:text-black">
                    <p className="text-sm font-medium ">Total</p>
                    <p className="text-sm font-bold ">₹1,14,399</p>
                  </li>
                </ul>
              </div>

              {/*  */}
              {/* Contact Info */}
              <div className="px-5 py-6 md:px-8 dark:bg-gray-900 dark:text-gray-300 text-gray-900">
                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="py-6">
                      <h2 className="font-bold  text-base">
                        Contact Information
                      </h2>

                      <form action="#" className="mt-6">
                        <div className="space-y-5">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="name"
                            >
                              First & Last Name
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                              type="text"
                              id="name"
                              placeholder="First & Last Name"
                            />
                          </div>

                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                              type="email"
                              id="email"
                              placeholder="Email"
                            />
                          </div>
                          <div>
                            <button className="rounded-md w-full bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                              Get started
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="py-6">
                      <h2 className="font-bold text-gray-500 dark:text-gray-200 text-base">
                        Shipping Information
                      </h2>
                    </div>

                    <div className="py-6">
                      <h2 className="font-bold text-gray-500 dark:text-gray-200 text-base">
                        Billing Information
                      </h2>
                    </div>

                    <div className="py-6">
                      <h2 className="font-bold text-gray-500 dark:text-gray-200 text-base">
                        Payment Method
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Checkout;
