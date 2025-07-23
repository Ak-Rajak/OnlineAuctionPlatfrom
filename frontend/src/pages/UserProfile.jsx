import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "@/custom-components/Spinner";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTag, FaCalendarAlt, 
         FaMoneyBillWave, FaTrophy, FaBriefcase, FaPaypal, FaRegCreditCard } from "react-icons/fa";
import { BsBank, BsCashCoin } from "react-icons/bs";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-[#f8f8f8]">
      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto w-full"
        >
          {/* Header with profile image and name */}
          <motion.div 
            variants={itemVariants}
            className="relative bg-gradient-to-r from-[#d6482b] to-[#c0381d] rounded-t-2xl py-16 px-6 text-center text-white overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e05c3e] opacity-20 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DECCBE] opacity-20 rounded-full transform -translate-x-20 translate-y-20"></div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-full bg-white bg-opacity-20 transform scale-110 animate-pulse"></div>
                <img
                  src={user.profileImage?.url || "/imageHolder.jpg"}
                  alt={user.userName || "User"}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg mx-auto mb-4"
                />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.userName}</h1>
              <p className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {user.role}
              </p>
            </motion.div>
          </motion.div>
          
          {/* User Stats */}
          <motion.div 
            variants={itemVariants}
            className="bg-white py-4 px-6 shadow-md rounded-b-2xl mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="font-semibold text-lg">{user.createdAt?.substring(0, 10)}</p>
              </div>
              
              {user.role === "Bidder" && (
                <>
                  <div className="p-3">
                    <p className="text-gray-500 text-sm">Auctions Won</p>
                    <p className="font-semibold text-lg">{user.auctionsWon || 0}</p>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-gray-500 text-sm">Money Spent</p>
                    <p className="font-semibold text-lg">${user.moneySpent || 0}</p>
                  </div>
                </>
              )}
              
              {user.role === "Auctioneer" && (
                <div className="p-3">
                  <p className="text-gray-500 text-sm">Unpaid Commissions</p>
                  <p className="font-semibold text-lg">${user.unpaidCommission || 0}</p>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Information Cards */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white rounded-2xl p-6 shadow-md mb-6"
          >
            <div className="flex items-center mb-5">
              <div className="bg-[#fcf7f0] p-2 rounded-lg mr-3">
                <FaUser className="text-[#d6482b] text-xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#f8f8f8] p-4 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaEnvelope className="mr-2 text-[#d6482b]" />
                  <p className="text-sm font-medium">Email Address</p>
                </div>
                <p className="font-semibold text-gray-800">{user.email}</p>
              </div>
              
              <div className="bg-[#f8f8f8] p-4 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaPhone className="mr-2 text-[#d6482b]" />
                  <p className="text-sm font-medium">Phone Number</p>
                </div>
                <p className="font-semibold text-gray-800">{user.phone}</p>
              </div>
              
              <div className="bg-[#f8f8f8] p-4 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaMapMarkerAlt className="mr-2 text-[#d6482b]" />
                  <p className="text-sm font-medium">Address</p>
                </div>
                <p className="font-semibold text-gray-800">{user.address}</p>
              </div>
              
              <div className="bg-[#f8f8f8] p-4 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaUserTag className="mr-2 text-[#d6482b]" />
                  <p className="text-sm font-medium">Role</p>
                </div>
                <p className="font-semibold text-gray-800">{user.role}</p>
              </div>
              
              <div className="bg-[#f8f8f8] p-4 rounded-lg">
                <div className="flex items-center text-gray-500 mb-1">
                  <FaCalendarAlt className="mr-2 text-[#d6482b]" />
                  <p className="text-sm font-medium">Joined On</p>
                </div>
                <p className="font-semibold text-gray-800">{user.createdAt?.substring(0, 10)}</p>
              </div>
            </div>
          </motion.div>
          
          {/* User Role Specific Information */}
          {user.role === "Bidder" && (
            <motion.div 
              variants={itemVariants} 
              className="bg-white rounded-2xl p-6 shadow-md mb-6"
            >
              <div className="flex items-center mb-5">
                <div className="bg-[#fcf7f0] p-2 rounded-lg mr-3">
                  <FaTrophy className="text-[#d6482b] text-xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Bidder Statistics</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f8f8f8] p-4 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <FaTrophy className="mr-2 text-[#d6482b]" />
                    <p className="text-sm font-medium">Auctions Won</p>
                  </div>
                  <p className="font-semibold text-2xl text-gray-800">{user.auctionsWon || 0}</p>
                </div>
                
                <div className="bg-[#f8f8f8] p-4 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <FaMoneyBillWave className="mr-2 text-[#d6482b]" />
                    <p className="text-sm font-medium">Money Spent</p>
                  </div>
                  <p className="font-semibold text-2xl text-gray-800">${user.moneySpent || 0}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Payment Details for Auctioneers */}
          {user.role === "Auctioneer" && (
            <>
              <motion.div 
                variants={itemVariants} 
                className="bg-white rounded-2xl p-6 shadow-md mb-6"
              >
                <div className="flex items-center mb-5">
                  <div className="bg-[#fcf7f0] p-2 rounded-lg mr-3">
                    <FaRegCreditCard className="text-[#d6482b] text-xl" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
                </div>
                
                <div className="mb-5">
                  <h3 className="text-md font-semibold mb-3 flex items-center">
                    <BsBank className="mr-2 text-[#d6482b]" /> Bank Transfer
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#f8f8f8] p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                      <p className="font-medium">
                        {user.paymentMethods.bankTransfer.bankName || "Not provided"}
                      </p>
                    </div>
                    
                    <div className="bg-[#f8f8f8] p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Account Number</p>
                      <p className="font-medium">
                        {user.paymentMethods.bankTransfer.bankAccountNumber || "Not provided"}
                      </p>
                    </div>
                    
                    <div className="bg-[#f8f8f8] p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Account Holder</p>
                      <p className="font-medium">
                        {user.paymentMethods.bankTransfer.bankAccountName || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-md font-semibold mb-3 flex items-center">
                      <BsCashCoin className="mr-2 text-[#d6482b]" /> Easypaisa
                    </h3>
                    <div className="bg-[#f8f8f8] p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Account Number</p>
                      <p className="font-medium">
                        {user.paymentMethods.easypaisa.easypaisaAccountNumber || "Not provided"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-semibold mb-3 flex items-center">
                      <FaPaypal className="mr-2 text-[#d6482b]" /> PayPal
                    </h3>
                    <div className="bg-[#f8f8f8] p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="font-medium">
                        {user.paymentMethods.paypal.paypalEmail || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="bg-white rounded-2xl p-6 shadow-md mb-6"
              >
                <div className="flex items-center mb-5">
                  <div className="bg-[#fcf7f0] p-2 rounded-lg mr-3">
                    <FaBriefcase className="text-[#d6482b] text-xl" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Auctioneer Details</h2>
                </div>
                
                <div className="bg-[#f8f8f8] p-4 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <FaMoneyBillWave className="mr-2 text-[#d6482b]" />
                    <p className="text-sm font-medium">Unpaid Commissions</p>
                  </div>
                  <p className="font-semibold text-2xl text-gray-800">${user.unpaidCommission || 0}</p>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default UserProfile;