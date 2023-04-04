import React from "react";
import { GoMarkGithub } from "react-icons/go";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="container  mx-auto px-10  py-10">
      <div className="flex items-center space-x-6">
        <div>
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
        </div>
        <div>
          <h1 className="text-xl font-bold text-black dark:text-gray-100">
            Mohd Hassan
          </h1>
        </div>
      </div>
      <div className="flex items-center  gap-4  mt-6">
        <a
          className=" hover:color-blue-600"
          href="https://github.com/killshotxd"
        >
          <GoMarkGithub size={30} />
        </a>

        <a href="https://www.linkedin.com/in/mohd-hassan-11707a223/">
          <BsLinkedin size={30} />
        </a>

        <a href="https://www.instagram.com/ihassanansari">
          <BsInstagram size={30} />
        </a>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
        I am a Web Developer
      </p>
    </footer>
    // <div className="footer mt-2  p-10 bg-neutral text-neutral-content">
    //   <footer className=" w-full flex justify-between">
    //     <div>
    //       <svg
    //         width="50"
    //         height="50"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fillRule="evenodd"
    //         clipRule="evenodd"
    //         className="fill-current"
    //       >
    //         <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    //       </svg>
    //       <p>
    //         Mohd Hassan
    //         <br />
    //         Web Developer
    //       </p>
    //     </div>
    //     <div>
    //       <span className="footer-title">Social</span>
    //       <div className="grid grid-flow-col gap-4 py-2">
    //         <a href="https://github.com/killshotxd">
    //           <GoMarkGithub size={30} />
    //         </a>

    //         <a href="https://www.linkedin.com/in/mohd-hassan-11707a223/">
    //           <BsLinkedin size={30} />
    //         </a>

    //         <a href="https://www.instagram.com/ihassanansari">
    //           <BsInstagram size={30} />
    //         </a>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default Footer;
