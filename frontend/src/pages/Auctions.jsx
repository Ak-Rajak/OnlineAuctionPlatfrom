import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  
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

  // Filter and sort auctions
  useEffect(() => {
    let filtered = [...allAuctions];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(auction => 
        auction.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    } else if (sortOption === "oldest") {
      filtered.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    } else if (sortOption === "highestBid") {
      filtered.sort((a, b) => b.startingBid - a.startingBid);
    } else if (sortOption === "lowestBid") {
      filtered.sort((a, b) => a.startingBid - b.startingBid);
    }
    
    setFilteredAuctions(filtered);
  }, [allAuctions, searchTerm, sortOption]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 bg-[#f8f8f8]">
      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full"
        >
          {/* Hero section */}
          <motion.div 
            variants={itemVariants}
            className="relative w-full bg-gradient-to-r from-[#d6482b] to-[#c0381d] rounded-2xl p-8 mb-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e05c3e] opacity-20 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DECCBE] opacity-20 rounded-full transform -translate-x-20 translate-y-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-white bg-opacity-20"
                >
                  <RiAuctionFill className="text-white mr-2" />
                  <span className="text-white font-medium text-sm">Active Listings</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  Discover <span className="text-[#DECCBE]">Auctions</span>
                </h1>
                <p className="text-white text-opacity-80 max-w-xl">
                  Browse through our exclusive collection of items up for auction. Find unique treasures and place your bids!
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search auctions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 py-3 px-4 pl-10 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#DECCBE]"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Filters and sorting */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row items-center justify-between"
          >
            <div className="flex items-center mb-3 md:mb-0">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-[#fcf7f0] rounded-lg text-[#d6482b] font-medium hover:bg-[#DECCBE] transition-colors"
              >
                <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              <div className="mx-3 h-6 w-px bg-gray-300 hidden md:block"></div>
              <p className="text-gray-500 hidden md:block">
                <span className="font-medium text-gray-700">{filteredAuctions.length}</span> auctions found
              </p>
            </div>
            
            <div className="flex items-center">
              <label className="text-gray-600 mr-2">Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[#f8f8f8] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d6482b]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highestBid">Highest Bid</option>
                <option value="lowestBid">Lowest Bid</option>
              </select>
              {sortOption.includes("highest") || sortOption === "newest" ? 
                <FaSortAmountDown className="ml-2 text-gray-500" /> : 
                <FaSortAmountUp className="ml-2 text-gray-500" />
              }
            </div>
          </motion.div>
          
          {/* Expanded filters panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 mb-6 shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#d6482b]"
                    />
                    <span className="text-gray-400">to</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#d6482b]"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Status</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#d6482b] focus:ring-[#d6482b]" />
                      <span className="ml-2 text-gray-600">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#d6482b] focus:ring-[#d6482b]" />
                      <span className="ml-2 text-gray-600">Upcoming</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-[#d6482b] focus:ring-[#d6482b]" />
                      <span className="ml-2 text-gray-600">Ended</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button className="bg-[#d6482b] text-white px-4 py-2 rounded-lg hover:bg-[#b8381e] transition-colors w-full">
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Auctions grid */}
          {filteredAuctions.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredAuctions.map((element) => (
                <motion.div key={element._id} variants={itemVariants}>
                  <Card
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    startingBid={element.startingBid}
                    id={element._id}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl p-8 text-center"
            >
              <img 
                src="/no-results.svg" 
                alt="No results" 
                className="w-64 h-64 mx-auto opacity-70"
              />
              <h3 className="text-xl font-semibold text-gray-700 mt-4">No auctions found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 bg-[#f8f8f8] text-[#d6482b] rounded-lg hover:bg-[#fcf7f0] transition-colors"
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default Auctions;