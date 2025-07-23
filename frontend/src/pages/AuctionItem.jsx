import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import Spinner from "@/custom-components/Spinner";
import { FaGreaterThan, FaInfoCircle, FaTrophy, FaCalendarAlt, FaClock, FaTag, FaCheckCircle, FaGavel } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import { MdDescription } from "react-icons/md";

function AuctionItem() {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [bidError, setBidError] = useState("");

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

  const handleBid = () => {
    // Validate bid amount
    if (amount <= 0) {
      setBidError("Bid amount must be greater than 0");
      return;
    }

    if (amount < auctionDetail.startingBid) {
      setBidError(`Bid amount must be at least Rs.${auctionDetail.startingBid}`);
      return;
    }

    // If highest bid exists, check if new bid is higher
    if (auctionBidders && auctionBidders.length > 0 && amount <= auctionBidders[0].amount) {
      setBidError(`Bid amount must be higher than current highest bid (Rs.${auctionBidders[0].amount})`);
      return;
    }

    setBidError("");
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo]);

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    if (!auctionDetail.endTime) return { days: 0, hours: 0, minutes: 0 };

    const now = new Date();
    const endTime = new Date(auctionDetail.endTime);
    const timeRemaining = endTime - now;

    if (timeRemaining <= 0) return { days: 0, hours: 0, minutes: 0 };

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const timeRemaining = calculateTimeRemaining();

  // Determine auction status
  const getAuctionStatus = () => {
    if (!auctionDetail.startTime || !auctionDetail.endTime) return "unknown";

    const now = Date.now();
    const startTime = new Date(auctionDetail.startTime);
    const endTime = new Date(auctionDetail.endTime);

    if (now < startTime) return "upcoming";
    if (now > endTime) return "ended";
    return "active";
  };

  const auctionStatus = getAuctionStatus();

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
          {/* Breadcrumb Navigation */}
          <motion.div
            variants={itemVariants}
            className="text-[16px] flex flex-wrap gap-2 items-center mb-6 bg-white p-4 rounded-lg shadow-sm"
          >
            <Link
              to="/"
              className="font-medium transition-all duration-300 hover:text-[#D6482B]"
            >
              Home
            </Link>
            <FaGreaterThan className="text-stone-400 text-xs" />
            <Link
              to={"/auctions"}
              className="font-medium transition-all duration-300 hover:text-[#D6482B]"
            >
              Auctions
            </Link>
            <FaGreaterThan className="text-stone-400 text-xs" />
            <p className="text-[#D6482B] font-medium truncate max-w-[200px]">{auctionDetail.title}</p>
          </motion.div>

          <div className="flex gap-6 flex-col lg:flex-row">
            {/* Left Column - Item Details */}
            <motion.div
              variants={itemVariants}
              className="lg:w-7/12"
            >
              {/* Main Item Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-6">
                {/* Item Header with Status Badge */}
                <div className="relative">
                  <div className="bg-[#f8f8f8] p-6">
                    <div className="flex justify-between items-start">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                        {auctionDetail.title}
                      </h1>
                      <div className={`text-sm font-medium px-3 py-1 rounded-full ${auctionStatus === 'active' ? 'bg-green-100 text-green-700' :
                          auctionStatus === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'}`}>
                        {auctionStatus === 'active' ? 'Active' :
                          auctionStatus === 'upcoming' ? 'Upcoming' :
                            'Ended'}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaCalendarAlt className="mr-1 text-[#D6482B]" />
                        <span>Start: {new Date(auctionDetail.startTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaCalendarAlt className="mr-1 text-[#D6482B]" />
                        <span>End: {new Date(auctionDetail.endTime).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item Image */}
                <div className="flex justify-center items-center p-6 bg-white border-b border-gray-100">
                  <img
                    src={auctionDetail.image?.url || "/imageHolder.jpg"}
                    alt={auctionDetail.title}
                    className="max-h-[400px] object-contain rounded-lg" />
                </div>

                {/* Item Details Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fcf7f0] p-4 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <FaTag className="mr-2 text-[#D6482B]" />
                      <span>Starting Bid</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      Rs. {auctionDetail.startingBid?.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-[#fcf7f0] p-4 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <FaCheckCircle className="mr-2 text-[#D6482B]" />
                      <span>Condition</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-800">
                      {auctionDetail.condition}
                    </p>
                  </div>

                  {auctionStatus === 'active' && (
                    <div className="bg-[#fcf7f0] p-4 rounded-lg flex flex-col justify-between md:col-span-2">
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <FaClock className="mr-2 text-[#D6482B]" />
                        <span>Time Remaining</span>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-white py-2 px-3 rounded-lg text-center min-w-[60px]">
                          <p className="text-xl font-bold">{timeRemaining.days}</p>
                          <p className="text-xs text-gray-500">Days</p>
                        </div>
                        <div className="bg-white py-2 px-3 rounded-lg text-center min-w-[60px]">
                          <p className="text-xl font-bold">{timeRemaining.hours}</p>
                          <p className="text-xs text-gray-500">Hours</p>
                        </div>
                        <div className="bg-white py-2 px-3 rounded-lg text-center min-w-[60px]">
                          <p className="text-xl font-bold">{timeRemaining.minutes}</p>
                          <p className="text-xs text-gray-500">Mins</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <div className="flex items-center mb-4">
                  <MdDescription className="text-[#D6482B] text-xl mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Item Description</h2>
                </div>
                <div className="space-y-3">
                  {auctionDetail.description &&
                    auctionDetail.description.split(". ").map((element, index) => {
                      if (!element.trim()) return null;
                      return (
                        <div key={index} className="flex items-start">
                          <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                            <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                          </div>
                          <p className="text-gray-700">{element.trim()}.</p>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Shipping Info */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <BsTruck className="text-[#D6482B] text-xl mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
                </div>
                <div className="bg-[#fcf7f0] p-4 rounded-lg">
                  <p className="text-gray-700">
                    Shipping costs will be calculated based on your location. The winner will be notified with shipping options after the auction ends.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Bidding Section */}
            <motion.div
              variants={itemVariants}
              className="lg:w-5/12"
            >
              {/* Bidding Section */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-[#d6482b] to-[#c0381d] p-4 text-white">
                  <div className="flex items-center">
                    <RiAuctionFill className="text-2xl mr-2" />
                    <h2 className="text-xl font-bold">Bidding Zone</h2>
                  </div>
                </div>

                {/* Bid Input Section */}
                {auctionStatus === 'active' ? (
                  <div className="p-6 bg-[#fcf7f0] border-b border-gray-200">
                    <p className="text-gray-700 mb-4">
                      Current highest bid:
                      <span className="font-bold text-[#D6482B] ml-2">
                        {auctionBidders && auctionBidders.length > 0
                          ? `Rs. ${auctionBidders[0].amount?.toLocaleString()}`
                          : `No bids yet (Min: Rs. ${auctionDetail.startingBid?.toLocaleString()})`}
                      </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-grow">
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D6482B] focus:ring-1 focus:ring-[#D6482B]"
                          placeholder={`Min bid: Rs. ${auctionDetail.startingBid}`}
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value);
                            setBidError("");
                          }} />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          Rs.
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#D6482B] text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-[#b8381e] transition-colors shadow-md"
                        onClick={handleBid}
                      >
                        <FaGavel className="mr-2 text-xl" />
                        Place Bid
                      </motion.button>
                    </div>

                    {bidError && (
                      <p className="text-red-500 mt-2 text-sm">{bidError}</p>
                    )}

                    <p className="text-gray-500 text-sm mt-3 flex items-start">
                      <FaInfoCircle className="text-[#D6482B] mr-2 mt-0.5" />
                      By placing a bid, you agree to the auction terms and conditions.
                    </p>
                  </div>
                ) : auctionStatus === 'upcoming' ? (
                  <div className="p-6 text-center">
                    <img
                      src="/notStarted.png"
                      alt="Auction not started"
                      className="w-64 h-64 mx-auto opacity-70" />
                    <h3 className="text-xl font-semibold text-gray-700 mt-4">
                      Auction has not started yet
                    </h3>
                    <p className="text-gray-500 mt-2">
                      This auction will begin on {new Date(auctionDetail.startTime).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <img
                      src="/auctionEnded.png"
                      alt="Auction ended"
                      className="w-64 h-64 mx-auto opacity-70" />
                    <h3 className="text-xl font-semibold text-gray-700 mt-4">
                      Auction has ended
                    </h3>
                    <p className="text-gray-500 mt-2">
                      This auction ended on {new Date(auctionDetail.endTime).toLocaleString()}
                    </p>

                    {auctionBidders && auctionBidders.length > 0 && (
                      <div className="mt-4 bg-[#fcf7f0] p-4 rounded-lg inline-block">
                        <p className="text-gray-700">
                          Winning bid: <span className="font-bold text-[#D6482B]">
                            Rs. {auctionBidders[0].amount?.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Bidders List */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-700 flex items-center">
                      <FaTrophy className="text-[#D6482B] mr-2" />
                      Bidder Ranking
                    </h3>
                    <span className="bg-gray-100 text-gray-700 text-sm font-medium py-1 px-3 rounded-full">
                      {auctionBidders ? auctionBidders.length : 0} bids
                    </span>
                  </div>

                  {auctionBidders && auctionBidders.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {auctionBidders.map((bidder, index) => (
                        <div
                          key={index}
                          className="py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 
                              ${index === 0 ? 'bg-green-100 text-green-700' :
                                index === 1 ? 'bg-blue-100 text-blue-700' :
                                  index === 2 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'}`}
                            >
                              {index + 1}
                            </div>
                            <div className="flex items-center">
                              <img
                                src={bidder.profileImage || "/imageHolder.jpg"}
                                alt={bidder.userName}
                                className="w-8 h-8 rounded-full object-cover mr-3 hidden sm:block" />
                              <div>
                                <p className="font-medium text-gray-800">{bidder.userName}</p>
                                <p className="text-sm text-gray-500">Rs. {bidder.amount?.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>

                          <div className={`px-3 py-1 rounded-full text-sm font-medium 
                            ${index === 0 ? 'bg-green-100 text-green-700' :
                              index === 1 ? 'bg-blue-100 text-blue-700' :
                                index === 2 ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'}`}
                          >
                            {index === 0 ? 'Leading' :
                              index === 1 ? '2nd' :
                                index === 2 ? '3rd' :
                                  `${index + 1}th`}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No bids have been placed yet</p>
                      {auctionStatus === 'active' && (
                        <p className="text-sm text-[#D6482B] mt-2">Be the first to bid!</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Auction Rules Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <FaInfoCircle className="text-[#D6482B] text-xl mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Auction Rules</h2>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                    </div>
                    <p>All bids are final and cannot be retracted.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                    </div>
                    <p>The highest bidder at the end of the auction wins the item.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[20px] h-[20px] rounded-full bg-[#fcf7f0] flex items-center justify-center mr-3 mt-1">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#D6482B]"></div>
                    </div>
                    <p>Payment must be made within 48 hours of auction end.</p>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default AuctionItem;