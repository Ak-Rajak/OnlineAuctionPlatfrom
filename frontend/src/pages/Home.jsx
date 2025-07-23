import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from "@/custom-components/Spinner";
import { RiAuctionFill } from "react-icons/ri";
import { FaArrowRight, FaGavel, FaShoppingBag, FaTrophy, FaMoneyBillWave } from "react-icons/fa";

const Home = () => {
  const howItWorks = [
    { 
      title: "Post Items", 
      description: "Auctioneer posts items for bidding.", 
      icon: <FaShoppingBag className="text-[#d6482b]" /> 
    },
    { 
      title: "Place Bids", 
      description: "Bidders place bids on listed items.", 
      icon: <FaGavel className="text-[#d6482b]" /> 
    },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
      icon: <FaTrophy className="text-[#d6482b]" />
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
      icon: <FaMoneyBillWave className="text-[#d6482b]" />
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-[#f8f8f8] to-white"
    >
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        {/* Hero Section with Enhanced Design */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 py-10 px-4 md:px-8 rounded-2xl bg-gradient-to-br from-[#f6f4f0] to-white shadow-sm border border-[#eee8dd]"
        >
          <div className="absolute top-0 right-0 w-72 h-72 opacity-10 rounded-full bg-[#d6482b] blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 rounded-full bg-[#DECCBE] blur-3xl -z-10"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-[#fcf7f0] border border-[#DECCBE]"
          >
            <RiAuctionFill className="text-[#d6482b] mr-2" />
            <span className="text-[#d6482b] font-medium text-sm">Premium Auction Platform</span>
          </motion.div>
          
          <p className="text-[#DECCBE] font-bold text-xl mb-8 relative after:content-[''] after:absolute after:h-1 after:w-20 after:bg-[#d6482b] after:-bottom-2 after:left-0">
            Transparency Leads to Your Victory
          </p>
          
          <motion.h1
            className="text-[#111] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl relative z-10 tracking-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Transparent Auctions
          </motion.h1>
          
          <motion.h1
            className="text-[#d6482b] text-2xl font-bold mb-6 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl relative z-10 tracking-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Be The Winner
          </motion.h1>
          
          <motion.p
            className="text-gray-600 max-w-2xl mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Join our premium auction platform where transparency and fairness lead to exciting bidding experiences and incredible opportunities.
          </motion.p>
          
          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  to="/sign-up"
                  className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] rounded-lg px-8 flex items-center py-3 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Sign Up <FaArrowRight className="ml-2 text-sm" />
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#DECCBE] bg-transparent border-2 border-[#DECCBE] hover:bg-[#DECCBE15] hover:text-white font-bold text-xl rounded-lg px-8 flex items-center py-2.5 transition-all duration-300 hover:-translate-y-1"
                >
                  Login
                </Link>
              </motion.div>
            )}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  to="/auctions"
                  className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] rounded-lg px-8 flex items-center py-3 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Browse Auctions <FaArrowRight className="ml-2 text-sm" />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* How it Works Section with Improved Design */}
        <motion.div 
          className="flex flex-col gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-[#111] text-xl font-semibold mb-0 min-[480px]:text-xl md:text-2xl lg:text-3xl">How it works</h3>
            <div className="h-0.5 bg-gradient-to-r from-[#d6482b] to-transparent flex-grow"></div>
          </div>
          
          <div className="flex flex-col gap-5 md:flex-row md:flex-wrap w-full">
            {howItWorks.map((element, index) => {
              return (
                <motion.div
                  key={element.title}
                  className="bg-white flex flex-col gap-3 p-6 rounded-xl h-auto justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#DECCBE]"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.07)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + (index * 0.1) }}
                >
                  <div className="text-4xl p-3 bg-[#fcf7f0] rounded-lg inline-block w-fit">{element.icon}</div>
                  <h5 className="font-bold text-lg text-[#d6482b]">{element.title}</h5>
                  <p className="text-gray-600">{element.description}</p>
                  <div className="w-10 h-1 bg-[#DECCBE] rounded-full mt-1"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Featured Auctions with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <FeaturedAuctions />
        </motion.div>
        
        {/* Upcoming Auctions with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 bg-[#fcf7f0] p-6 rounded-xl shadow-sm border border-[#DECCBE]"
        >
          <UpcomingAuctions />
        </motion.div>
        
        {/* Leaderboard with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-8 mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <Leaderboard />
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;