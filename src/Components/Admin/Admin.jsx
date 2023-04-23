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
import { UserAuth } from "../../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Admin = () => {
  const [products, setProducts] = useState();
  const [productsLen, setProductsLen] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const { currentUser } = UserAuth();
  const { uid, displayName } = currentUser;

  const getProducts = async (pageNumber, pageSize) => {
    let q;
    const c = collection(db, "products");
    const startAtValue = (pageNumber - 1) * pageSize;

    q = await query(c, orderBy("id"), limit(pageSize), startAt(startAtValue));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), did: doc.id });
      });
      setProducts(products);

      const totalProducts = querySnapshot.docs.length;
      setProductsLen(totalProducts);

      const totalPages = Math.ceil(totalProducts / pageSize);
      setTotalPages(totalPages);

      setValues((prevValues) => ({
        ...prevValues,
        id: products?.length + 1,
      }));
    });

    return { unsubscribe, totalPages };
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

  const [values, setValues] = useState({
    name: "",
    brand: "",
    color: "",
    description: "",
    href: "#",
    imageAlt: "",
    imageSrc: "",
    price: Number,
    quantity: Number,
    ratings: Number,
    category: "",
    addedAt: serverTimestamp(),
    addedById: uid,
    addedByName: displayName,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (event, property) => {
    const value =
      property === "price" || property === "quantity" || property === "ratings"
        ? parseFloat(event.target.value)
        : event.target.value;
    setValues((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setValues((prev) => ({
      ...prev,
      category: category,
    }));
  };

  const handleSubmit = async () => {
    console.log(values);

    if (!currentUser) {
      toast("Please Login First !");
      return;
    }
    if (
      values.brand == "" ||
      values.name == "" ||
      values.price == "" ||
      values.imageSrc == "" ||
      values.description == ""
    ) {
      toast("Enter correct details !");
      return;
    }
    try {
      const productCatRef = collection(db, `category/${values.category}/item`);
      const productAllRef = collection(db, "products");

      await addDoc(productCatRef, values);
      await addDoc(productAllRef, values);
      toast("Item added to cart!");
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
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
                className="rounded-md bg-purple-500 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 "
              >
                Add
              </button> */}
              <label
                htmlFor="my-modal-4"
                className="rounded-md bg-purple-500 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500"
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
                            {" ₹" + person.price.toLocaleString("en-IN")}
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
                    <span className="label-text">Name:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-md w-full max-w-xs"
                    value={values.name}
                    onChange={(event) => handleInputChange(event, "name")}
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3  w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Brand Name:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-md w-full max-w-xs"
                    value={values.brand}
                    onChange={(event) => handleInputChange(event, "brand")}
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3 l w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Color :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={values.color}
                    onChange={(event) => handleInputChange(event, "color")}
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3 l w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Description :</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Type here"
                    value={values.description}
                    onChange={(event) =>
                      handleInputChange(event, "description")
                    }
                    className="textarea textarea-accent"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3 l w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Categories :</span>
                  </label>
                  <select
                    className="select select-accent w-full max-w-xs"
                    value={values.category} // Set selected value to category property in values state
                    onChange={handleCategoryChange} // Add onChange event handler to update category property in values state
                  >
                    <option disabled value="">
                      Pick One Category
                    </option>

                    <option value="Home">Home</option>
                    <option value="Fashion">Clothing/Fashion</option>
                    <option value="Mobiles">Mobiles/Tablets</option>

                    <option value="Beauty, Toys & More">Beauty</option>

                    <option value="Electronics">Electronics</option>
                    <option value="Appliances">Appliances</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="form-control gap-3 l w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Image Alt:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={values.imageAlt}
                    onChange={(event) => handleInputChange(event, "imageAlt")}
                    className="input input-bordered input-md w-full max-w-xs"
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
                    value={values.imageSrc}
                    onChange={(event) => handleInputChange(event, "imageSrc")}
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3  w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Price :</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    value={values.price}
                    onChange={(event) => handleInputChange(event, "price")}
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3  w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Quantity :</span>
                  </label>
                  <input
                    type="number"
                    value={values.quantity}
                    onChange={(event) => handleInputChange(event, "quantity")}
                    placeholder="Type here"
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
              <div>
                <div className="form-control gap-3 w-full max-w-xs">
                  <label className="label font-semibold mb-0 pb-0">
                    <span className="label-text">Ratings :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={values.ratings}
                    onChange={(event) => handleInputChange(event, "ratings")}
                    className="input input-bordered input-md w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button
                htmlFor="my-modal-4"
                onClick={() => {
                  handleSubmit();
                }}
                className="btn btn-active btn-primary"
              >
                submit
              </button>
            </div>
          </label>
        </label>
        {/* THIS WILL BE IN MODAL */}
      </div>
    </>
  );
};

export default Admin;
