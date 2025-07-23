import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { register } from "@/store/slices/userSlice";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTag, FaLock, FaImage, FaArrowRight, FaRegCreditCard, FaPaypal } from "react-icons/fa";
import { RiAuctionFill, RiBankFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    role === "Auctioneer" &&
      (formData.append("bankAccountName", bankAccountName),
      formData.append("bankAccountNumber", bankAccountNumber),
      formData.append("bankName", bankName),
      formData.append("easypaisaAccountNumber", easypaisaAccountNumber),
      formData.append("paypalEmail", paypalEmail));
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-[#f8f8f8]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-[800px] overflow-hidden rounded-2xl bg-white shadow-lg mb-10"
      >
        {/* Top design element */}
        <div className="relative h-24 bg-gradient-to-r from-[#d6482b] to-[#c0381d] flex items-center justify-center">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#e05c3e] opacity-20 rounded-full transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#DECCBE] opacity-20 rounded-full transform -translate-x-20 translate-y-10"></div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="z-10 bg-white p-4 rounded-full shadow-md"
          >
            <RiAuctionFill className="text-[#d6482b] text-3xl" />
          </motion.div>
        </div>
        
        <div className="p-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-3xl font-bold text-[#333] mb-2"
          >
            Create Your Account
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-gray-500 mb-6"
          >
            Join PrimeBid and start bidding on exclusive items
          </motion.p>
          
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onSubmit={handleRegister}
            className="flex flex-col gap-6 w-full"
          >
            {/* Personal Details Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#fcf7f0] rounded-lg p-5 border border-[#DECCBE]"
            >
              <h2 className="font-semibold text-lg text-[#d6482b] mb-4 flex items-center">
                <FaUser className="mr-2" /> Personal Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-600 flex items-center gap-2">
                    <FaUser className="text-[#d6482b]" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-600 flex items-center gap-2">
                    <FaEnvelope className="text-[#d6482b]" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-600 flex items-center gap-2">
                    <FaPhone className="text-[#d6482b]" /> Phone Number
                  </label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-600 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#d6482b]" /> Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-600 flex items-center gap-2">
                    <FaUserTag className="text-[#d6482b]" /> Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all appearance-none"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="Auctioneer">Auctioneer</option>
                    <option value="Bidder">Bidder</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-medium text-gray-600 flex items-center gap-2">
                    <FaLock className="text-[#d6482b]" /> Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#d6482b]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-[14px] font-medium text-gray-600 flex items-center gap-2">
                  <FaImage className="text-[#d6482b]" /> Profile Image
                </label>
                <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200">
                  <img
                    src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#DECCBE]"
                  />
                  <div className="flex-1">
                    <label htmlFor="profile-upload" className="cursor-pointer text-[#d6482b] font-medium hover:text-[#b8381e] transition-colors">
                      Choose image
                    </label>
                    <input 
                      id="profile-upload"
                      type="file" 
                      onChange={imageHandler} 
                      className="hidden" 
                      accept="image/*"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: Square image, 200x200px or larger</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Payment Methods Section - Only for Auctioneers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`bg-[#f8f8f8] rounded-lg p-5 border border-gray-200 ${role !== 'Auctioneer' ? 'opacity-60' : ''}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-[#d6482b] flex items-center">
                  <FaRegCreditCard className="mr-2" /> Payment Methods
                </h2>
                <span className="text-xs bg-[#DECCBE] text-[#d6482b] py-1 px-2 rounded-full">
                  Auctioneers Only
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="text-[14px] font-medium text-gray-600 flex items-center gap-2 mb-2">
                  <RiBankFill className="text-[#d6482b]" /> Bank Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    disabled={role !== "Auctioneer"}
                  >
                    <option value="">Select Your Bank</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="UBL">UBL</option>
                    <option value="HBL">HBL</option>
                    <option value="Allied Bank">Allied Bank</option>
                  </select>
                  
                  <input
                    type="text"
                    value={bankAccountNumber}
                    placeholder="IBAN / Account Number"
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    disabled={role !== "Auctioneer"}
                  />
                  
                  <input
                    type="text"
                    value={bankAccountName}
                    placeholder="Account Holder Name"
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="w-full text-[16px] py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    disabled={role !== "Auctioneer"}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-[14px] font-medium text-gray-600 flex items-center gap-2 mb-2">
                  <BsCashCoin className="text-[#d6482b]" /> Additional Payment Methods
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <BsCashCoin />
                    </span>
                    <input
                      type="number"
                      value={easypaisaAccountNumber}
                      placeholder="Easypaisa Account Number"
                      onChange={(e) => setEasypaisaAccountNumber(e.target.value)}
                      className="w-full text-[16px] py-3 pl-10 pr-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                      disabled={role !== "Auctioneer"}
                    />
                  </div>
                  
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaPaypal />
                    </span>
                    <input
                      type="email"
                      value={paypalEmail}
                      placeholder="PayPal Email Address"
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="w-full text-[16px] py-3 pl-10 pr-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                      disabled={role !== "Auctioneer"}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-md py-3 px-4 rounded-lg text-white w-full mt-4 flex items-center justify-center shadow-md hover:shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center">
                  Create Account <FaArrowRight className="ml-2" />
                </span>
              )}
            </motion.button>
          </motion.form>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#d6482b] font-medium hover:text-[#b8381e] transition-colors">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SignUp;