import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { UserAuth } from "../../Auth/AuthContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

const Account = () => {
  const { currentUser, logout } = UserAuth();
  const [invoices, setInvoices] = useState();
  const [userInfo, setUserInfo] = useState(null);

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

  const getInvoices = async () => {
    const { uid } = currentUser;
    const invoiceRef = collection(db, "users", uid, "invoices");
    let querySnapshot = await getDocs(invoiceRef);
    let invoices = querySnapshot.docs.map((doc) => ({
      did: doc.id,
      ...doc.data(),
    }));

    setInvoices(invoices);
    console.log(invoices);
    return invoices;
  };

  useEffect(() => {
    getInvoices();
  }, []);
  return (
    <>
      <Header />
      <div className="containerWrap">
        <div className="flex gap-4">
          <h3 className="text-2xl font-bold">
            Welcome{" "}
            <span className="  text-violet-600">
              {currentUser.displayName.toUpperCase()}
            </span>
            {currentUser && userInfo?.seller == true ? (
              <>
                {" "}
                <span className="badge">Seller</span>
              </>
            ) : (
              ""
            )}
          </h3>
        </div>
        <section className="container  mx-auto py-4">
          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title  text-xl font-medium">
              View Invoice
            </div>
            <div className="collapse-content">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    Your Invoices
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    This is a list of all invoices for the items you have
                    purchased.
                  </p>
                </div>
                {/* <div>
              <button className="rounded-md bg-purple-500 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add
              </button>
            </div> */}
              </div>
              <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <span>Invoice Name</span>
                            </th>
                            {/* <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Category
                        </th> */}

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Status
                            </th>

                            {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Role
                        </th> */}
                            <th scope="col" className="relative py-3.5 px-4">
                              <span className="sr-only">View</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {invoices?.map((person) => (
                            <tr key={person.did}>
                              <td className="py-4 px-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {/* <div className="flex-shrink-0 h-10 w-10">
                                {person.filename}
                              </div> */}
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {person.filename}
                                    </div>
                                    {/* <div className="text-sm text-gray-500 dark:text-gray-300">
                                  {person.email}
                                </div> */}
                                  </div>
                                </div>
                              </td>
                              {/* <td className="px-12 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {person.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-300">
                              {person.department}
                            </div>
                          </td> */}
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Purchased
                                </span>
                              </td>
                              {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {person.role}
                          </td> */}
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  href={person.invoice}
                                  target="_"
                                  className="text-gray-500 dark:text-gray-300 hover:text-indigo-600"
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="containerWrap mt-3">
                <p className="text-2xl text-red-600 font-bold text-right">
                  Do Refresh browser after clicking view
                </p>
              </div>
            </div>
          </div>
        </section>

        {currentUser && userInfo?.seller == true ? (
          <>
            {/* <section className="container px-4 mx-auto py-4">
              <p>Add Products</p>
            </section>{" "} */}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Account;
