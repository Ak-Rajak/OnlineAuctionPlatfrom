import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaUpload, FaMoneyBillWave, FaCommentDots, FaReceipt, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [proofPreview, setProofPreview] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProof(file);
      
      // Create preview for image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProofPreview(reader.result);
      };
    }
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);
  
  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };
  
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
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 bg-[#f8f8f8]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="relative w-full bg-gradient-to-r from-[#d6482b] to-[#c0381d] rounded-t-2xl p-8 md:p-10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e05c3e] opacity-20 rounded-full transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DECCBE] opacity-20 rounded-full transform -translate-x-20 translate-y-20"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-white bg-opacity-20"
            >
              <RiAuctionFill className="text-white mr-2" />
              <span className="text-white font-medium text-sm">Auctioneer Portal</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center">
              <FaReceipt className="mr-3 hidden md:inline" />
              Submit Commission Payment
            </h1>
            <p className="text-white text-opacity-90 max-w-2xl text-base md:text-lg">
              Upload your commission payment proof to continue listing auctions on our platform. All commission payments are verified within 24 hours.
            </p>
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Form Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-none lg:rounded-bl-2xl shadow-md p-6 md:p-10 flex-1"
          >
            <form 
              className="flex flex-col gap-7"
              onSubmit={handlePaymentProof}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaReceipt className="mr-3 text-[#d6482b]" />
                Payment Details
              </h2>
              
              {/* Amount Field */}
              <div className="space-y-2">
                <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                  <FaMoneyBillWave className="text-[#d6482b]" /> 
                  Commission Amount (Rs.)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    Rs.
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount paid"
                    className="w-full text-[16px] py-4 pl-10 pr-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Enter the exact amount you've paid as commission
                </p>
              </div>
              
              {/* Upload Proof */}
              <div className="space-y-2">
                <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                  <FaUpload className="text-[#d6482b]" /> 
                  Payment Proof (Screenshot)
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg bg-[#f8f8f8] flex flex-col items-center p-8">
                  {proofPreview ? (
                    <div className="space-y-4 w-full">
                      <img 
                        src={proofPreview} 
                        alt="Payment proof" 
                        className="max-h-80 rounded-lg shadow-sm mx-auto object-contain"
                      />
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setProof("");
                            setProofPreview("");
                          }}
                          className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-10 flex flex-col items-center w-full max-w-lg">
                      <FaUpload className="text-gray-400 text-4xl mb-4" />
                      <p className="text-gray-600 mb-3 text-lg">
                        Drag and drop a screenshot here, or click to browse
                      </p>
                      <label className="cursor-pointer bg-[#fcf7f0] text-[#d6482b] hover:bg-[#f8e7d8] px-6 py-3 rounded-lg font-medium transition-colors">
                        Select Screenshot
                        <input
                          type="file"
                          accept="image/*"
                          onChange={proofHandler}
                          className="hidden"
                          required={!proof}
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-4">
                        Accepted formats: JPG, PNG, PDF (Max size: 10MB) 
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Comment Field */}
              <div className="space-y-2">
                <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                  <FaCommentDots className="text-[#d6482b]" /> 
                  Additional Comments
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add any details about your payment that might be helpful for verification"
                  rows={5}
                  className="w-full text-[16px] py-4 px-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all resize-none"
                />
                <p className="text-sm text-gray-500">
                  Include transaction ID, payment method, or any other relevant information
                </p>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-lg py-4 px-6 rounded-lg text-white w-full flex items-center justify-center shadow-md hover:shadow-lg"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading Proof...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaReceipt className="mr-2 text-xl" /> Submit Payment Proof
                    </span>
                  )}
                </motion.button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Your payment information will be securely processed and verified by our team
                </p>
              </div>
            </form>
          </motion.div>
          
          {/* Information Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white lg:rounded-br-2xl shadow-md p-6 md:p-10 w-full lg:w-1/3"
          >
            {/* Commission Guidelines */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaInfoCircle className="text-[#D6482B] mr-3" />
                Commission Guidelines
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Payments should be made to our official account details provided in your auctioneer dashboard.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Always include your auctioneer ID in the payment reference.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Verification typically takes 24 hours on business days.</p>
                </li>
              </ul>
            </div>
            
            {/* Commission Benefits */}
            <div className="p-6 bg-[#fcf7f0] rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCheckCircle className="text-[#D6482B] mr-3" />
                Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Priority listing for your auctions</p>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Enhanced visibility to potential bidders</p>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Access to premium auction tools</p>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Detailed analytics on auction performance</p>
                </li>
              </ul>
            </div>
            
            {/* Account Details */}
            <div className="mt-10 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Account</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Account Name:</span>
                  <span className="font-medium">Auction Platform Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Number:</span>
                  <span className="font-medium">1234-5678-9012</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank:</span>
                  <span className="font-medium">National Bank</span>
                </div>
                <div className="flex justify-between">
                  <span>Reference:</span>
                  <span className="font-medium">[Your Auctioneer ID]</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Success Criteria Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6 mt-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Verification Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5 bg-[#f8f8f8]">
              <div className="w-10 h-10 rounded-full bg-[#fcf7f0] flex items-center justify-center mb-4">
                <span className="font-semibold text-[#D6482B]">1</span>
              </div>
              <h4 className="font-semibold mb-2">Submit Proof</h4>
              <p className="text-gray-600 text-sm">Upload a clear screenshot of your payment transaction.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-[#f8f8f8]">
              <div className="w-10 h-10 rounded-full bg-[#fcf7f0] flex items-center justify-center mb-4">
                <span className="font-semibold text-[#D6482B]">2</span>
              </div>
              <h4 className="font-semibold mb-2">Verification</h4>
              <p className="text-gray-600 text-sm">Our team verifies your payment within 24 hours on business days.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-[#f8f8f8]">
              <div className="w-10 h-10 rounded-full bg-[#fcf7f0] flex items-center justify-center mb-4">
                <span className="font-semibold text-[#D6482B]">3</span>
              </div>
              <h4 className="font-semibold mb-2">Account Activation</h4>
              <p className="text-gray-600 text-sm">Your account is activated with premium auctioneer features.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SubmitCommission;