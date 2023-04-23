import React, { useEffect, useState } from "react";
import { UserAuth } from "../../Auth/AuthContext";
import { RiShoppingCartLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
const Header = ({ products }) => {
  const { currentUser, logout } = UserAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [productLength, setProductLength] = useState();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      localStorage.removeItem("prLen");
    } catch (error) {
      console.error();
    }
  };

  const getUserInfo = async () => {
    const { uid } = currentUser;
    // Get user document reference using uid
    const userDocRef = doc(db, "users", uid);

    // Get user document snapshot
    const userDocSnapshot = await getDoc(userDocRef);

    // Check if the user document exists
    if (userDocSnapshot.exists()) {
      // Get user data
      const userData = userDocSnapshot.data();

      // Get user sub-collections
      const userCollections = await getDocs(
        collection(db, "users", uid, "myCollection")
      );

      // Map user sub-collection documents to an array
      const userCollectionData = userCollections.docs.map((doc) => ({
        did: doc.id,
        ...doc.data(),
      }));

      // Combine user data and user sub-collection data
      const userInfo = {
        ...userData,
        myCollection: userCollectionData,
      };

      setUserInfo(userInfo);

      return userInfo;
    } else {
      console.log("User document does not exist.");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getCartItem = async () => {
    let cartItemRef = await collection(db, "cart", `${currentUser.uid}/items`);
    let querySnapshot = await getDocs(cartItemRef);
    let products = querySnapshot.docs.map((doc) => ({
      did: doc.id,
      ...doc.data(),
    }));

    localStorage.setItem("prLen", products.length);
    setProductLength(products?.length);
    return products;
  };

  useEffect(() => {
    getCartItem();
  }, [products]);

  console.log(userInfo);
  return (
    <>
      <div>
        <nav className="relative px-8 py-4 flex justify-between items-center ">
          <a
            className="text-3xl font-bold leading-none flex items-center space-x-4"
            onClick={() => {
              navigate("/");
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4F46E5"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  clipRule="evenodd"
                />
                <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
              </svg>
            </span>
            <span className="text-gray-600 dark:text-gray-300 text-xl">
              Modern E-commerce
            </span>
          </a>

          <div className="flex items-center" style={{ gap: "2rem" }}>
            <span
              style={{ position: "relative", top: "1rem" }}
              onClick={() => {
                navigate("/cart");
              }}
              className="cursor-pointer"
            >
              <RiShoppingCartLine size={20} />{" "}
              <div
                style={{
                  top: "-2.3rem",
                  position: "relative",
                  right: "-0.6rem",
                }}
                className="badge badge-sm "
              >
                {productLength ? `${productLength}` : 0}
              </div>
            </span>
            {currentUser && userInfo ? (
              <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="avatar online cursor-pointer">
                    <div className="w-10 rounded-full">
                      <img src={currentUser.photoURL} />
                    </div>
                    {userInfo?.seller == true ? (
                      <>
                        {" "}
                        <span className="badge-xs badge badge-accent text-white absolute top-7">
                          Seller
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <p>{currentUser.displayName}</p>
                    </li>
                    <li
                      onClick={() => {
                        navigate("/account");
                      }}
                    >
                      <a>Accounts</a>
                    </li>
                    {userInfo.seller !== true ? (
                      <>
                        {" "}
                        <li
                          onClick={() => {
                            navigate("/welcomeSeller");
                          }}
                        >
                          <a>Become Seller</a>
                        </li>
                      </>
                    ) : (
                      ""
                    )}

                    <li>
                      <p onClick={handleLogout}>Log Out</p>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/signIn");
                  }}
                  className="btn"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
