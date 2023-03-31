import React from "react";

export const Checkout = () => {
  return (
    <div className="max-w-4xl mx-auto my-4 md:my-6">
      <div className="overflow-hidden  shadow rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product List */}
          <div className="px-5 py-6 bg-gray-100 dark:bg-gray-500 dark:text-gray-900 md:px-8">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 -my-7">
                {products.map((product) => (
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
                        {product.price}
                      </p>

                      <button
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
                <p className="text-sm font-medium">₹1,14,399</p>
              </li>

              <li className="flex items-center justify-between text-gray-900 dark:text-black">
                <p className="text-sm font-medium ">Total</p>
                <p className="text-sm font-bold ">₹1,14,399</p>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

Checkout.displayName = "Checkout";

const products = [
  {
    id: 1,
    name: "APPLE iPhone 13 (Midnight, 128 GB)",
    imageSrc:
      "https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/checkout/iphone-13-mlpf3hn-a-apple-original-imag6vzz5qvejz8z.jpeg",
    href: "#",
    price: "₹61,999",
    color: "Midnight",
    imageAlt: "APPLE iPhone 13 (Midnight, 128 GB)",
    quantity: 1,
  },
  {
    id: 2,
    name: "APPLE Airpods Pro with MagSafe Charging Case Bluetooth Headset",
    imageSrc:
      "https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/checkout/mwp22hn-a-apple-original-imag3qe9eqkfhmg8.jpeg",
    href: "#",
    price: "₹22,500",
    color: "White, True Wireless",
    imageAlt: "APPLE Airpods Pro with MagSafe Charging Case Bluetooth Headset",
    quantity: 1,
  },
  {
    id: 3,
    name: "APPLE iPad (9th Gen) 64 GB ROM 10.2 inch with Wi-Fi Only",
    imageSrc:
      "https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/checkout/mk2k3hn-a-apple-original-imag6yy7xjjugz4w.jpeg",
    href: "#",
    price: "₹29,900",
    color: "Space Grey",
    imageAlt: "APPLE iPad (9th Gen) 64 GB ROM 10.2 inch with Wi-Fi Only",
    quantity: 1,
  },
  // More products...
];

export default Checkout;