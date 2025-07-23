import React, { useState, useEffect } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    setActiveLink(location.pathname);
    
    // Hide sidebar on mobile when route changes
    if (window.innerWidth < 1024) {
      setShow(false);
    }
  }, [location]);

  // Handle window resize to update sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  // Animation variants
  const drawerVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 }
  };

  const linkHoverVariants = {
    hover: { 
      x: 5, 
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Mobile Menu Button with updated design */}
      <motion.div
        onClick={() => setShow(!show)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-5 top-5 bg-[#D6482B] text-white text-2xl p-2 rounded-lg hover:bg-[#b8381e] shadow-md z-50 lg:hidden"
      >
        <HiOutlineMenuAlt3 />
      </motion.div>
      
      {/* Overlay for mobile sidebar to improve UX */}
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-30 lg:hidden"
          onClick={() => setShow(false)}
        />
      )}
      
      {/* Sidebar with enhanced styling and responsiveness */}
      <motion.div
        variants={drawerVariants}
        initial={window.innerWidth >= 1024 ? "visible" : "hidden"}
        animate={show ? "visible" : "hidden"}
        transition={{ type: "tween", duration: 0.3 }}
        className={`w-[85%] max-w-[300px] bg-gradient-to-b from-[#f8f6f2] to-[#f6f4f0] h-screen fixed top-0 left-0 transition-all duration-300 p-6 flex flex-col overflow-y-auto justify-between lg:left-0 border-r border-[#eee8dd] shadow-md z-40`}
      >
        <div className="relative">
          {/* Logo with enhanced styling */}
          <Link to={"/"} className="inline-block mb-8">
            <motion.h4 
              className="text-2xl font-bold relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Prime<span className="text-[#D6482b]">Bid</span>
              <div className="h-1 w-12 bg-[#D6482b] mt-1 rounded-full"></div>
            </motion.h4>
          </Link>
          
          {/* Primary Navigation with animation */}
          <motion.ul 
            className="flex flex-col gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.li whileHover="hover" variants={linkHoverVariants}>
              <Link
                to={"/auctions"}
                className={`flex text-lg font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                  activeLink === "/auctions" 
                    ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm border-l-4 border-[#D6482b] pl-3" 
                    : "hover:text-[#D6482b] hover:bg-[#fcf7f0] hover:pl-3"
                }`}
              >
                <RiAuctionFill className="text-xl" /> Auctions
              </Link>
            </motion.li>
            
            <motion.li whileHover="hover" variants={linkHoverVariants}>
              <Link
                to={"/leaderboard"}
                className={`flex text-lg font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                  activeLink === "/leaderboard" 
                    ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm border-l-4 border-[#D6482b] pl-3" 
                    : "hover:text-[#D6482b] hover:bg-[#fcf7f0] hover:pl-3"
                }`}
              >
                <MdLeaderboard className="text-xl" /> Leaderboard
              </Link>
            </motion.li>
            
            {/* Auctioneer Section with conditional rendering */}
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <motion.div 
                className="mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-xs uppercase font-semibold text-gray-500 mb-2 ml-2">Auctioneer Tools</div>
                <motion.li whileHover="hover" variants={linkHoverVariants}>
                  <Link
                    to={"/submit-commission"}
                    className={`flex text-lg font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                      activeLink === "/submit-commission" 
                        ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm border-l-4 border-[#D6482b] pl-3" 
                        : "hover:text-[#D6482b] hover:bg-[#fcf7f0] hover:pl-3"
                    }`}
                  >
                    <FaFileInvoiceDollar className="text-xl" /> Submit Commission
                  </Link>
                </motion.li>
                
                <motion.li whileHover="hover" variants={linkHoverVariants}>
                  <Link
                    to={"/create-auction"}
                    className={`flex text-lg font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                      activeLink === "/create-auction" 
                        ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm border-l-4 border-[#D6482b] pl-3" 
                        : "hover:text-[#D6482b] hover:bg-[#fcf7f0] hover:pl-3"
                    }`}
                  >
                    <IoIosCreate className="text-xl" /> Create Auction
                  </Link>
                </motion.li>
                
                <motion.li whileHover="hover" variants={linkHoverVariants}>
                  <Link
                    to={"/view-my-auctions"}
                    className={`flex text-lg font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                      activeLink === "/view-my-auctions" 
                        ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm border-l-4 border-[#D6482b] pl-3" 
                        : "hover:text-[#D6482b] hover:bg-[#fcf7f0] hover:pl-3"
                    }`}
                  >
                    <FaEye className="text-xl" /> View My Auctions
                  </Link>
                </motion.li>
              </motion.div>
            )}
            
            {/* Admin Section */}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-xs uppercase font-semibold text-gray-500 mb-2 ml-2">Admin</div>
                <motion.li whileHover="hover" variants={linkHoverVariants}>
                  <Link
                    to={"/dashboard"}
                    className={`flex text-lg font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                      activeLink === "/dashboard" 
                        ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm border-l-4 border-[#D6482b] pl-3" 
                        : "hover:text-[#D6482b] hover:bg-[#fcf7f0] hover:pl-3"
                    }`}
                  >
                    <MdDashboard className="text-xl" /> Dashboard
                  </Link>
                </motion.li>
              </motion.div>
            )}
          </motion.ul>
          
          {/* Auth Buttons with enhanced styling */}
          {!isAuthenticated ? (
            <motion.div 
              className="my-6 flex flex-col gap-3 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to={"/sign-up"}
                className="bg-[#D6482B] font-medium text-base py-2.5 px-4 rounded-lg text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#b8381e] hover:-translate-y-0.5"
              >
                Sign Up <FaArrowRight className="ml-2 text-xs" />
              </Link>
              <Link
                to={"/login"}
                className="text-[#D6482B] bg-white border border-[#DECCBE] hover:border-[#D6482B] font-medium text-base py-2.5 px-4 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              >
                Login
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="my-6 flex flex-col gap-3 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                onClick={handleLogout}
                className="bg-white text-[#D6482B] border border-[#D6482B] font-medium text-base py-2.5 px-4 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[#D6482B] hover:text-white hover:-translate-y-0.5"
              >
                Logout
              </button>
            </motion.div>
          )}
          
          <div className="h-px w-full bg-gradient-to-r from-[#DECCBE] to-transparent my-5"></div>
          
          {/* Secondary Navigation */}
          <motion.ul 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {isAuthenticated && (
              <motion.li whileHover="hover" variants={linkHoverVariants}>
                <Link
                  to={"/me"}
                  className={`flex text-base font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "/me" 
                      ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm" 
                      : "hover:text-[#D6482b] hover:bg-[#fcf7f0]"
                  }`}
                >
                  <FaUserCircle className="text-lg" /> Profile
                </Link>
              </motion.li>
            )}
            <motion.li whileHover="hover" variants={linkHoverVariants}>
              <Link
                to={"/how-it-works-info"}
                className={`flex text-base font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                  activeLink === "/how-it-works-info" 
                    ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm" 
                    : "hover:text-[#D6482b] hover:bg-[#fcf7f0]"
                }`}
              >
                <SiGooglesearchconsole className="text-lg" /> How it works
              </Link>
            </motion.li>
            <motion.li whileHover="hover" variants={linkHoverVariants}>
              <Link
                to={"/about"}
                className={`flex text-base font-medium gap-3 items-center p-2 rounded-lg transition-all duration-200 ${
                  activeLink === "/about" 
                    ? "text-[#D6482b] bg-[#fcf7f0] shadow-sm" 
                    : "hover:text-[#D6482b] hover:bg-[#fcf7f0]"
                }`}
              >
                <BsFillInfoSquareFill className="text-lg" /> About Us
              </Link>
            </motion.li>
          </motion.ul>
          
          {/* Close button for mobile - improved visibility and positioning */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 lg:hidden"
          >
            <IoMdCloseCircleOutline
              onClick={() => setShow(false)}
              className="text-[28px] text-[#D6482B] cursor-pointer"
            />
          </motion.div>
        </div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-auto pt-4"
        >
          <div className="flex gap-3 items-center mb-4">
            <Link
              to="/"
              className="bg-white text-[#D6482B] p-2 text-lg rounded-full hover:bg-[#D6482B] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="bg-white text-[#D6482B] p-2 text-lg rounded-full hover:bg-[#D6482B] hover:text-white transition-all duration-300 shadow-sm"
            >
              <RiInstagramFill />
            </Link>
            <Link
              to="/"
              className="bg-white text-[#D6482B] p-2 text-lg rounded-full hover:bg-[#D6482B] hover:text-white transition-all duration-300 shadow-sm"
            >
              <FaTwitter />
            </Link>
          </div>
          <Link
            to={"/contact"}
            className="text-gray-600 font-medium hover:text-[#d6482b] transition-colors duration-200 inline-block mb-2"
          >
            Contact Us
          </Link>
          <p className="text-gray-500 text-sm">&copy; PrimeBid, LLC.</p>
          <p className="text-gray-500 text-sm">
            Designed By{" "}
            <Link
              to={"/"}
              className="font-medium hover:text-[#d6482b] transition-colors duration-200"
            >
              AtulRajak
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SideDrawer;