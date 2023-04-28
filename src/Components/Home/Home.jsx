import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { db } from "../../Firebase";
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { UserAuth } from "../../Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Home = () => {
  const [products, setProducts] = useState();
  const [favorites, setFavorites] = useState();
  const [cartItemLength, setCartItemLength] = useState();
  const { currentUser } = UserAuth();
  const navigate = useNavigate();
  const getProducts = async () => {
    const q = collection(db, "products");
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      did: doc.id,
      ...doc.data(),
    }));

    setProducts(products);
    console.log(products);

    return products;
  };

  useEffect(() => {
    getProducts();
  }, []);

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
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        toast("Item already exists in cart!");
        return;
      }

      const cartData = {
        brand: product.brand,
        color: product.color,
        category: product.category,
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

  const addToFavorite = async (product) => {
    console.log(product);
    if (!currentUser) {
      toast("Please Login First !");
      return;
    }
    try {
      const { uid } = currentUser;
      const userRef = doc(db, "users", uid);
      const favRef = collection(userRef, "favorites");

      // Check if the product already exists in the favorites collection
      const querySnapshot = await getDocs(favRef);
      const existingFavorite = querySnapshot.docs.find(
        (doc) => doc.data().id === product.id
      );

      if (existingFavorite) {
        // If the product already exists, remove it from the favorites collection
        await deleteDoc(doc(favRef, existingFavorite.id));
        console.log("removed");
      } else {
        // Otherwise, add the product to the favorites collection
        await addDoc(favRef, { ...product });
        console.log("added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorite = async () => {
    const { uid } = currentUser;
    const favRef = collection(db, "users", uid, "favorites");
    let querySnapshot = await getDocs(favRef);
    let favorites = querySnapshot.docs.map((doc) => ({
      did: doc.id,
      ...doc.data(),
    }));

    setFavorites(favorites);
    console.log(favorites);

    return favorites;
  };

  // // Check if the product is already a favorite on mount
  // useEffect(() => {
  //   getFavorite();
  //   const checkFavorite = async () => {
  //     if (!currentUser) {
  //       return;
  //     }
  //     const { uid } = currentUser;
  //     const favRef = collection(db, "users", uid, "favorites");
  //     const querySnapshot = await getDocs(favRef);
  //     const existingFavorite = querySnapshot.docs.find(
  //       (doc) => doc.data().id === product.id
  //     );
  //     setIsFavorite(!!existingFavorite);
  //   };
  // }, [currentUser, product]);

  return (
    <>
      <ToastContainer />
      <Header products={cartItemLength} />
      <p className="text-center w-full bg-purple-400 text-white p-2 font-bold">
        6% GST IS APPLICABLE ON ALL PRODUCTS
      </p>
      <div className="flex pl-4 pr-4 pt-3 text-center justify-center items-center">
        <div
          onClick={() => {
            navigate("/categories");
          }}
          className="  max-w-full font-bold text-center flex cursor-pointer items-center uppercase text-gray-500 hover:text-black hover:shadow"
        >
          All Categories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="ml-1 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </div>
      </div>
      <div style={{ minHeight: "70vh" }} className="pl-3 pr-3">
        {/* ALL */}
        <div className="grid  px-2 grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:mt-10">
          {products?.map((product) => (
            <div
              key={product.name}
              className="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-500 rounded-xl group"
            >
              {/* <div className="absolute z-10 top-3 right-3">
                <button
                  onClick={() => {
                    addToFavorite(product);
                  }}
                  type="button"
                  className="inline-flex items-center justify-center text-gray-400 hover:text-rose-500"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div> */}
              <div
                onClick={() => {
                  navigate("/product", { state: product });
                }}
                className="relative "
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    className="object-contain w-full h-52 p-4"
                    src={product.imageSrc}
                    alt={product.imageAlt}
                  />
                </div>

                <div className="px-6 py-4 flex-1 flex flex-col">
                  <p className="text-xs font-medium tracking-widest text-gray-500 dark:text-gray-300 uppercase">
                    {product.brand}
                  </p>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    <p>{product.name.slice(0, 30)}</p>
                  </h3>
                  <div className="flex items-center mt-2.5">
                    <div className="flex items-center space-x-px">
                      {[1, 2, 3, 4, 5].map((e) => (
                        <svg
                          key={e}
                          className="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-500 ml-1.5 dark:text-gray-300">
                      ({product.ratings?.toLocaleString("en-IN")})
                    </p>
                  </div>
                  <p className="mt-5 text-sm font-bold text-gray-900 dark:text-white">
                    {" ₹" + product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <div className="">
                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                  type="button"
                  className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-purple-500"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
