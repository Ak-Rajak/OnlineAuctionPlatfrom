import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaTrophy, FaCoins, FaGavel, FaSearch, FaUserFriends, FaMedal } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
  
  // Helper function to style the rank badge
  const getRankStyle = (index) => {
    if (index === 0) return "bg-yellow-100 text-yellow-800 border-yellow-300"; // Gold
    if (index === 1) return "bg-gray-100 text-gray-800 border-gray-300"; // Silver
    if (index === 2) return "bg-amber-100 text-amber-800 border-amber-300"; // Bronze
    return "bg-gray-50 text-gray-600 border-gray-200"; // Others
  };
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return `Rs. ${Number(amount).toLocaleString()}`;
  };
  
  // Helper function to get medal for top ranks
  const getMedal = (index) => {
    if (index === 0) return <FaMedal className="text-yellow-500 text-xl" />;
    if (index === 1) return <FaMedal className="text-gray-400 text-xl" />;
    if (index === 2) return <FaMedal className="text-amber-600 text-xl" />;
    return null;
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 bg-[#f8f8f8]">
      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Header Section */}
          <motion.div 
            variants={itemVariants}
            className="relative w-full bg-gradient-to-r from-[#d6482b] to-[#c0381d] rounded-t-2xl p-8 md:p-10 overflow-hidden mb-6"
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
                <span className="text-white font-medium text-sm">Community Recognition</span>
              </motion.div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-0 flex items-center">
                  <FaTrophy className="mr-3 hidden md:inline" />
                  Bidders Leaderboard
                </h1>
                
                <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-lg p-2 text-white">
                  <FaUserFriends className="text-2xl" />
                  <div>
                    <p className="text-sm opacity-90">Active Bidders</p>
                    <p className="font-bold text-lg">{leaderboard.length}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-white text-opacity-90 max-w-2xl text-base md:text-lg mt-2">
                Our top bidders ranked by total auction spend and number of auctions won. Join the ranks by participating in our exciting auctions!
              </p>
            </div>
          </motion.div>

          {/* Top 3 Winners Highlight */}
          {leaderboard.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
              {/* Second Place */}
              {leaderboard.length > 1 && (
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center order-2 md:order-1 md:mt-8"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full border-4 border-gray-300 flex items-center justify-center mb-4 overflow-hidden">
                    <img 
                      src={leaderboard[1]?.profileImage?.url || "/imageHolder.jpg"} 
                      alt={leaderboard[1]?.userName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-100 text-gray-800 text-sm font-bold px-4 py-1 rounded-full mb-2">2nd Place</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{leaderboard[1]?.userName}</h3>
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaCoins className="mr-1 text-gray-400" />
                    <span>{formatCurrency(leaderboard[1]?.moneySpent)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaGavel className="mr-1 text-gray-400" />
                    <span>{leaderboard[1]?.auctionsWon} auctions won</span>
                  </div>
                </motion.div>
              )}

              {/* First Place */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform md:scale-110 border-2 border-yellow-300 order-1 md:order-2"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full border-4 border-yellow-300 flex items-center justify-center mb-4 overflow-hidden">
                    <img 
                      src={leaderboard[0]?.profileImage?.url || "/imageHolder.jpg"} 
                      alt={leaderboard[0]?.userName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <FaTrophy className="absolute -top-2 -right-2 text-2xl text-yellow-500" />
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-sm font-bold px-4 py-1 rounded-full mb-2">Champion</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1 text-center">{leaderboard[0]?.userName}</h3>
                <div className="flex items-center text-gray-600 mb-1">
                  <FaCoins className="mr-1 text-yellow-500" />
                  <span>{formatCurrency(leaderboard[0]?.moneySpent)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaGavel className="mr-1 text-yellow-500" />
                  <span>{leaderboard[0]?.auctionsWon} auctions won</span>
                </div>
              </motion.div>

              {/* Third Place */}
              {leaderboard.length > 2 && (
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center order-3 md:mt-8"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-20 h-20 bg-amber-100 rounded-full border-4 border-amber-300 flex items-center justify-center mb-4 overflow-hidden">
                    <img 
                      src={leaderboard[2]?.profileImage?.url || "/imageHolder.jpg"} 
                      alt={leaderboard[2]?.userName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1 rounded-full mb-2">3rd Place</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{leaderboard[2]?.userName}</h3>
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaCoins className="mr-1 text-amber-600" />
                    <span>{formatCurrency(leaderboard[2]?.moneySpent)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaGavel className="mr-1 text-amber-600" />
                    <span>{leaderboard[2]?.auctionsWon} auctions won</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Leaderboard Table */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaUserFriends className="mr-2 text-[#D6482B]" />
                Full Rankings
              </h2>
              
              <div className="relative max-w-xs">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search bidders..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d6482b] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                      <FaCoins className="mr-2 text-[#D6482B]" /> Bid Expenditure
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                      <FaGavel className="mr-2 text-[#D6482B]" /> Auctions Won
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.slice(0, 100).map((bidder, index) => (
                    <motion.tr 
                      key={bidder._id}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center min-w-[40px] h-8 rounded-full border ${getRankStyle(index)} font-semibold`}>
                            {index < 3 ? getMedal(index) : (index + 1)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden border-2 border-gray-200">
                            <img 
                              src={bidder.profileImage?.url || "/imageHolder.jpg"} 
                              alt={bidder.userName}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{bidder.userName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-700">{formatCurrency(bidder.moneySpent)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {bidder.auctionsWon} auctions
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">
                      {Math.min(100, leaderboard.length)}
                    </span> of <span className="font-medium">{leaderboard.length}</span> bidders
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      1
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#fcf7f0] text-sm font-medium text-[#D6482B]">
                      2
                    </span>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Info and Stats Section */}
          <motion.div 
            variants={itemVariants} 
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaGavel className="text-[#D6482B] mr-2" /> Leaderboard Benefits
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Top bidders receive exclusive access to premium auctions.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Monthly rewards for the most active participants.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Special badges displayed on your profile and bids.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#fcf7f0] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaTrophy className="text-[#D6482B] mr-2" /> How To Rank Up
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Actively participate in auctions across different categories.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Win auctions to boost your position on the leaderboard.</p>
                </li>
                <li className="flex items-start">
                  <div className="min-w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center mr-3 mt-1">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#D6482B]"></div>
                  </div>
                  <p>Rankings are updated daily based on your bidding activity.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCoins className="text-[#D6482B] mr-2" /> Leaderboard Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Bidders</span>
                  <span className="font-bold text-lg">{leaderboard.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Auctions Won</span>
                  <span className="font-bold text-lg">
                    {leaderboard.reduce((total, bidder) => total + bidder.auctionsWon, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(leaderboard.reduce((total, bidder) => total + Number(bidder.moneySpent || 0), 0))}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Leaderboard;