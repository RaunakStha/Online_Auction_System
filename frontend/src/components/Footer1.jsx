import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";

function Footer() {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];
  return (
    <>
      <footer className="bg-white">
        <div className="container mx-auto  py-[]">
          {/* footer div all */}
          <div className="flex justify-between flex-col md:flex-row  items-center md:items-start text-left">
            {/* logo side */}
            <div className="flex flex-col w-1/2 md:pl-10 py-4">
              {/* <img
                src={"images/logo.png"}
                alt="footer_logo"
                className="w-[8rem]"
              /> */}
              <p className="font-medium text-[#646464]">
              Success is not final, failure is not fatal: it is the courage to continue that counts.
              </p>
              <span className="text-indigo-500 font-bold text-2xl"> Quality, not quantity.</span>
              {/* socials */}
              <div className="flex gap-7 text-[18px] text-[#646464] justify-center md:justify-start mt-10">
                {iconsTab.map(({ icon }, index) => {
                  return (
                    <div
                      key={index}
                      className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-indigo-600 hover:text-white"
                      style={{ transition: "all 0.3s" }}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
              <p className="text-[16px] font-medium text-[#646464]">
                Privacy Policy | © {new Date().getFullYear()} Online Auction System <br />{" "}
                {" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href=""
                >
                  Raunak Shrestha
                </a>
              </p>
            </div>

            {/* middle div */}
            <div className="flex flex-col gap-8 relative">
              <p className="text-[22px] font-bold footer-main">Quick links</p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-indigo-600"></span>

              <p className="text-[16px] hover:text-indigo-600 cursor-pointer text-[#646464] font-medium hover:font-bold">
                Home
              </p>
              <p className="text-[16px] hover:text-indigo-600 cursor-pointer text-[#646464] font-medium hover:font-bold">
                About us
              </p>
              <p className="text-[16px] hover:text-indigo-600 cursor-pointer text-[#646464] font-medium hover:font-bold">
                
              </p>
              <p className="text-[16px] hover:text-indigo-600 cursor-pointer text-[#646464] font-medium hover:font-bold">
                
              </p>
              <p className="text-[16px] hover:text-indigo-600 cursor-pointer text-[#646464] font-medium hover:font-bold">
                
              </p>
            </div>

            {/* right div */}
            <div className="flex flex-col gap-8 relative">
              <p className="text-[22px] font-bold footer-main">Contact info</p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-indigo-600"></span>
              <p className="flex items-center ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="w-4 h-4 mr-1 text-gray-800 dark:text-gray-400 bi bi-geo-alt "
                    viewBox="0 0 16 16"
                >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <span className="text-gray-800 dark:text-gray-400">Kathmandu, Nepal</span>
                </p>
                <p className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 h-4 mr-2 text-gray-800 dark:text-gray-400 bi bi-envelope"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                    <span className="text-gray-800 dark:text-gray-400">auctioninfo@gmail.com</span>
                </p>
                <p className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 h-4 mr-2 text-gray-800 dark:text-gray-400 bi bi-telephone"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <span className="text-gray-800 dark:text-gray-400">+977-9836000000</span>
                </p>
            </div>

            {/* middle div */}
            <span></span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;