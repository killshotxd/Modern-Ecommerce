import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import { UserAuth } from "../../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Checkout = () => {
  const { state } = useLocation();
  const { products } = state || {};
  const [editProduct, setEditProduct] = useState();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (products.length == 0) {
      toast("No Products!");
      setTimeout(() => {
        navigate("/");
      }, 1300);
    } else {
      setEditProduct(products);
    }
  }, []);

  const { currentUser } = UserAuth();
  const handleInputChange = (event, property) => {
    setValues((prev) => ({
      ...prev,
      [property]: event.target.value,
    }));
  };

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

  const removeCart = async () => {
    const { uid } = currentUser;
    const cartItemRef = await doc(db, "cart", `${uid}`);

    try {
      const cartItemDoc = await getDoc(cartItemRef);
      const productsRef = collection(cartItemDoc.ref, "items");
      const productQuerySnapshot = await getDocs(productsRef);

      const batch = writeBatch(db);
      productQuerySnapshot.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();

      getCartItem();
      navigate("/");
    } catch (error) {
      console.error("Error removing cart products: ", error);
    }
  };

  const removeItem = async (did) => {
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

  const totalAmount = editProduct?.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);

  const saveInvoiceToDb = async (invoice) => {
    const { uid } = currentUser;
    const userRef = doc(db, "users", uid);
    const invoicesRef = collection(userRef, "invoices");

    try {
      // Generate a unique filename for the invoice
      const filename = `invoice_${Date.now()}.pdf`;

      // Save the invoice as a base64 string in Firestore
      await addDoc(invoicesRef, {
        filename,
        invoice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const invoiceGen = async (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    const name = values.name;
    const email = values.email;

    // Add header
    doc.setFontSize(18);
    doc.text("Modern E-Commerce", 15, 10);
    doc.text(`Invoice No.: #${Math.floor(Math.random() * 1000)}`, 15, 20);
    doc.text(`Name: ${name}`, 15, 30);
    doc.text(`Email: ${email}`, 15, 40);

    // Add product list
    let startY = 50;
    const products = editProduct || [];
    const headers = [
      "Product",
      "Color",
      "Quantity",
      "Category",
      "Price",
      "Tax(6%)",
      "Total",
    ];
    const data = products.map((product) => {
      console.log(product);
      const price = product.price * product.quantity;
      const tax = price * 0.06;
      const total = price + tax;
      return [
        product.name,
        product.color,
        product.category,
        product.quantity,
        price.toLocaleString("en-IN") + "Rs",
        tax.toLocaleString("en-IN") + "Rs",
        total.toLocaleString("en-IN") + "Rs",
      ];
    });
    console.log(data);
    doc.autoTable({
      startY: startY,
      head: [headers],
      body: data,
    });

    // Add subtotal and total
    const totalWithoutTax = products.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    const tax = totalWithoutTax * 0.06;
    const total = totalWithoutTax + tax;
    doc.text(
      `Subtotal: ${totalWithoutTax.toLocaleString("en-IN")}Rs`,
      130,
      startY + data.length * 10 + 20
    );
    doc.text(
      `Tax: ${tax.toLocaleString("en-IN")}Rs`,
      130,
      startY + data.length * 10 + 30
    );
    doc.text(
      `Total: ${total.toLocaleString("en-IN")}Rs`,
      130,
      startY + data.length * 10 + 40
    );

    if (name == "" || email == "") {
      toast("Please enter valid details !");
      return;
    }

    // Save PDF to user's database
    const base64String = doc.output("datauristring");
    await saveInvoiceToDb(base64String);

    // Save PDF to local file system
    doc.save(`${Math.floor(Math.random() * 100)}invoice.pdf`);

    toast("Order Successful !");
    navigate("/");
    removeCart();
    getCartItem();
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="max-w-4xl mx-auto my-4 md:my-6">
        <div className="overflow-hidden  shadow rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product List */}
            <div className="px-5 py-6 bg-gray-100 dark:bg-gray-500 dark:text-gray-900 md:px-8">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 -my-7">
                  {editProduct?.map((product) => (
                    <li
                      key={product.name}
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
                          {" ₹" +
                            (product.price * product.quantity).toLocaleString(
                              "en-IN"
                            )}
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
                  ))}
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
                  <p className="text-sm font-bold ">
                    {" ₹" + totalAmount?.toLocaleString("en-IN")}
                  </p>
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
                            value={values.name}
                            onChange={(event) =>
                              handleInputChange(event, "name")
                            }
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
                            value={values.email}
                            onChange={(event) =>
                              handleInputChange(event, "email")
                            }
                          />
                        </div>
                        <div>
                          <button
                            onClick={invoiceGen}
                            className="rounded-md w-full bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                          >
                            Pay
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
      </div>
    </>
  );
};

export default Checkout;
