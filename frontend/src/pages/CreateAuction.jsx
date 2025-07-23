import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createAuction } from "@/store/slices/auctionSlice";
import { FaUpload, FaTag, FaCalendarAlt, FaClipboardList, FaGavel, FaBoxOpen, FaListAlt, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { MdDescription, MdCategory } from "react-icons/md";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

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

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo, user]);

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
              <span className="text-white font-medium text-sm">Auctioneer Tools</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center">
              <FaGavel className="mr-3 hidden md:inline" />
              Create New Auction
            </h1>
            <p className="text-white text-opacity-90 max-w-2xl text-base md:text-lg">
              Fill in the details below to create a new auction. All fields are required to ensure potential bidders have complete information.
            </p>
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Form Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-none lg:rounded-bl-2xl shadow-md p-6 md:p-10 flex-1"
          >
            <form className="flex flex-col gap-8" onSubmit={handleCreateAuction}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaClipboardList className="mr-3 text-[#d6482b]" />
                Auction Details
              </h2>
              
              {/* Basic Details */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <FaTag className="text-[#D6482B] text-xl mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Basics</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                      <FaTag className="text-[#d6482b]" /> Auction Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a descriptive title"
                      className="w-full text-[16px] py-4 px-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                      <MdCategory className="text-[#d6482b]" /> Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-[16px] py-4 px-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all appearance-none"
                      required
                    >
                      <option value="">Select Category</option>
                      {auctionCategories.map((element) => (
                        <option key={element} value={element}>
                          {element}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                      <FaBoxOpen className="text-[#d6482b]" /> Item Condition
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full text-[16px] py-4 px-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all appearance-none"
                      required
                    >
                      <option value="">Select Condition</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Like New">Like New</option>
                      <option value="Refurbished">Refurbished</option>
                      <option value="For Parts">For Parts</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                      <FaGavel className="text-[#d6482b]" /> Starting Bid (Rs.)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        Rs.
                      </span>
                      <input
                        type="number"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
                        placeholder="0.00"
                        className="w-full text-[16px] py-4 pl-10 pr-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                    <MdDescription className="text-[#d6482b]" /> Item Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide detailed information about the item, its features, history, condition details, etc."
                    className="w-full text-[16px] py-4 px-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                    rows={5}
                    required
                  />
                </div>
              </div>
              
              {/* Auction Timing */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <FaCalendarAlt className="text-[#D6482B] text-xl mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Auction Schedule</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-[#d6482b]" /> Start Date & Time
                    </label>
                    <DatePicker
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat={"MMMM d, yyyy h:mm aa"}
                      placeholderText="Select start date and time"
                      className="w-full text-[16px] py-4 px-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[16px] font-medium text-gray-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-[#d6482b]" /> End Date & Time
                    </label>
                    <DatePicker
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat={"MMMM d, yyyy h:mm aa"}
                      placeholderText="Select end date and time"
                      className="w-full text-[16px] py-4 px-4 bg-[#f8f8f8] rounded-lg border border-gray-200 focus:outline-none focus:border-[#d6482b] focus:ring-1 focus:ring-[#d6482b] transition-all"
                      required
                      minDate={startTime} // Ensure end date is after start date
                    />
                  </div>
                </div>
              </div>
              
              {/* Item Image */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <FaUpload className="text-[#D6482B] text-xl mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Item Image</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg bg-[#f8f8f8] flex flex-col items-center p-8">
                    {imagePreview ? (
                      <div className="space-y-4 w-full">
                        <img 
                          src={imagePreview} 
                          alt={title || "Item preview"} 
                          className="max-h-80 rounded-lg shadow-sm mx-auto object-contain"
                        />
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setImage("");
                              setImagePreview("");
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
                          Drag and drop an image here, or click to browse
                        </p>
                        <label className="cursor-pointer bg-[#fcf7f0] text-[#d6482b] hover:bg-[#f8e7d8] px-6 py-3 rounded-lg font-medium transition-colors">
                          Select Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={imageHandler}
                            required={!image}
                          />
                        </label>
                        <p className="text-sm text-gray-500 mt-4">
                          Accepted formats: JPG, PNG (Max size: 10MB) 
                        </p>
                      </div>
                    )}
                  </div>
                </div>
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
                      Creating Auction...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <RiAuctionFill className="mr-2 text-xl" /> Launch Auction
                    </span>
                  )}
                </motion.button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  By creating an auction, you agree to our Terms of Service and Seller Guidelines
                </p>
              </div>
            </form>
          </motion.div>
          
          {/* Information Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white lg:rounded-br-2xl shadow-md p-6 md:p-10 w-full lg:w-1/3"
          >
            {/* Auction Tips */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaInfoCircle className="text-[#D6482B] mr-3" />
                Auction Tips
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Use descriptive, keyword-rich titles to attract more bidders.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Be completely honest about the item condition to avoid disputes.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Set a reasonable starting price to encourage early bidding.</p>
                </li>
              </ul>
            </div>
            
            {/* Auction Benefits */}
            <div className="p-6 bg-[#fcf7f0] rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCheckCircle className="text-[#D6482B] mr-3" />
                Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Reach thousands of potential buyers</p>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Secure payment processing system</p>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Automatic bidding notifications</p>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D6482B] mr-3"></div>
                  <p>Dedicated dispute resolution center</p>
                </li>
              </ul>
            </div>
            
            {/* Image Guidelines */}
            <div className="mt-10 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Image Guidelines</h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-start">
                  <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <span>Use well-lit, clear photos on neutral backgrounds</span>
                </p>
                <p className="flex items-start">
                  <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <span>Show any defects or damage clearly</span>
                </p>
                <p className="flex items-start">
                  <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <span>Optimal resolution: 1200 x 800 pixels</span>
                </p>
                <p className="flex items-start">
                  <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <span>Maximum file size: 10MB</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Best Practices Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md p-6 mt-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Auction Success Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5 bg-[#f8f8f8]">
              <div className="w-10 h-10 rounded-full bg-[#fcf7f0] flex items-center justify-center mb-4">
                <span className="font-semibold text-[#D6482B]">1</span>
              </div>
              <h4 className="font-semibold mb-2">Quality Photos</h4>
              <p className="text-gray-600 text-sm">High-quality images can increase bidding interest by up to 40%.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-[#f8f8f8]">
              <div className="w-10 h-10 rounded-full bg-[#fcf7f0] flex items-center justify-center mb-4">
                <span className="font-semibold text-[#D6482B]">2</span>
              </div>
              <h4 className="font-semibold mb-2">Detailed Description</h4>
              <p className="text-gray-600 text-sm">Comprehensive item descriptions build trust and reduce post-sale issues.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-[#f8f8f8]">
              <div className="w-10 h-10 rounded-full bg-[#fcf7f0] flex items-center justify-center mb-4">
                <span className="font-semibold text-[#D6482B]">3</span>
              </div>
              <h4 className="font-semibold mb-2">Competitive Pricing</h4>
              <p className="text-gray-600 text-sm">Start with a reasonable bid to attract early interest and bidding momentum.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CreateAuction;