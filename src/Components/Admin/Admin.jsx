import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { db } from "../../Firebase";
import {
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
} from "firebase/firestore";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
const Admin = () => {
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const getProducts = async (pageNumber, pageSize) => {
    let q;
    const c = collection(db, "products");
    const startAtValue = (pageNumber - 1) * pageSize;

    q = await query(c, orderBy("id"), limit(pageSize), startAt(startAtValue));
    // console.log(q);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), did: doc.id });
      });
      setProducts(products);
      // console.log(products);

      const totalProducts = querySnapshot.docs.length;
      const totalPages = Math.ceil(totalProducts / pageSize);
      console.log(totalPages);
      setTotalPages(totalPages);
    });

    // setProducts(products);
    // const totalProducts = q.size;
    // const totalPages = Math.ceil(totalProducts / pageSize);
    // console.log(totalPages);
    return { unsubscribe, totalPages };
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { unsubscribe } = await getProducts(currentPage, pageSize);
      return () => {
        unsubscribe();
      };
    };
    fetchData();
  }, [currentPage, pageSize]);

  return (
    <>
      <Header />
      <div className="containerWrap">
        <section className="container px-4 mx-auto py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Products
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                This is a list of all products. You can add new products
              </p>
            </div>
            <div>
              {/* <button
                htmlFor="my-modal-4"
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 "
              >
                Add
              </button> */}
              <label
                htmlFor="my-modal-4"
                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500"
              >
                Add
              </label>
            </div>
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
                          <span>Products</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Price
                        </th>

                        {/* <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Role
                        </th> */}
                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {products?.map((person) => (
                        <tr key={person.name}>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={person.imageSrc}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {person.brand}
                                </div>
                                {/* <div className="text-sm text-gray-500 dark:text-gray-300">
                                  {person.name}
                                </div> */}
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {person.name}
                            </div>
                            {/* <div className="text-sm text-gray-500 dark:text-gray-300">
                              {person.department}
                            </div> */}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span> */}
                            ₹{person.price}
                          </td>
                          {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {person.role}
                          </td> */}
                          {/* <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-gray-500 dark:text-gray-300 hover:text-indigo-600"
                            >
                              Edit
                            </a>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <BsArrowLeftCircleFill className="w-4 h-4" />
              <span>previous</span>
            </button>

            <div className="items-center hidden md:flex gap-x-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 py-1 text-sm rounded-md ${
                      currentPage === page
                        ? "text-blue-500 dark:bg-gray-800 bg-blue-100/60"
                        : "text-gray-500 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>Next</span>
              <BsArrowRightCircleFill className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* The button to open modal */}

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <div>
              <div>
                <div className="form-control gap-3 w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Brad Name:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3  w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Brad Color:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3 l w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Link:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3  w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Image Art :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3  w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Image Src :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3  w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Price:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3 w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Quantity:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-active btn-primary">submit</button>
            </div>
          </label>
        </label>
        {/* THIS WILL BE IN MODAL */}
      </div>
    </>
  );
};

export default Admin;
