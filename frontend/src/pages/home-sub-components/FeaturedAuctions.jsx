import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaGavel, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "@/custom-components/Spinner";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

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

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.1 }
    }
  };

  return (
    <section className="my-12 py-6 px-4 bg-white rounded-xl shadow-sm">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.div variants={headerVariants} className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#fcf7f0] flex items-center justify-center">
              <FaGavel className="text-[#D6482B] text-lg" />
            </div>
            <h3 className="text-[#111] text-xl font-bold min-[480px]:text-2xl md:text-3xl">
              Featured Auctions
            </h3>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link 
              to="/auctions" 
              className="flex items-center text-[#D6482B] font-medium hover:text-[#b8381e] transition-colors"
            >
              View All
              <FaArrowRight className="ml-2 text-sm" />
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Spinner />
          </div>
        ) : allAuctions.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="bg-gray-50 rounded-lg p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#fcf7f0] flex items-center justify-center">
              <FaGavel className="text-[#D6482B] text-2xl opacity-70" />
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No Auctions Available</h4>
            <p className="text-gray-500">Check back soon for exciting new auctions!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allAuctions.slice(0, 8).map((element, index) => (
              <motion.div 
                key={element._id} 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card
                  title={element.title}
                  imgSrc={element.image?.url}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  startingBid={element.startingBid}
                  id={element._id}
                />
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <Link 
            to="/auctions" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#fcf7f0] text-[#D6482B] rounded-lg font-medium hover:bg-[#f8e7d8] transition-colors"
          >
            Explore All Auctions
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedAuctions;