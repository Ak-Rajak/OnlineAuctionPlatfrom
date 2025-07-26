# PrimeBid - Online Auction Platform

<img alt="PrimeBid Logo" src="https://res.cloudinary.com/dtfhtn424/image/upload/v1/MERN_AUCTION_PLATFORM_USERS/logo_primebid.png">

## Overview

PrimeBid is a **comprehensive online auction platform** built with the MERN stack (MongoDB, Express, React, Node.js). The application provides a transparent and secure environment for buying and selling items through an auction system.

## 🌟 Live Demo

- **Frontend:** [https://online-auction-platfrom.vercel.app](https://online-auction-platfrom.vercel.app)
- **Backend:** [https://onlineauctionplatfrom.onrender.com](https://onlineauctionplatfrom.onrender.com)

## ✨ Features

- **User Authentication & Roles**
  - Registration and login system
  - Role-based access (Bidder, Auctioneer, Super Admin)
  - Profile management with image upload

<img alt="Authentication Screenshot" src="https://res.cloudinary.com/dtfhtn424/image/upload/v1/MERN_AUCTION_PLATFORM_USERS/auth_screenshot.png">

- **Auction Management**
  - Create, view, update, and delete auction listings
  - Set starting bids, item descriptions, and auction timeframes
  - Upload item images with preview
  - Real-time status tracking (upcoming, active, ended)

<img alt="Create Auction Screenshot" src="https://res.cloudinary.com/dtfhtn424/image/upload/v1/MERN_AUCTION_PLATFORM_USERS/create_auction.png">

- **Bidding System**
  - Place bids on active auctions
  - View bidding history and current highest bid
  - Automatic bid validation
  - Winning bid notifications

<img alt="Auction Item Screenshot" src="https://res.cloudinary.com/dtfhtn424/image/upload/v1/MERN_AUCTION_PLATFORM_USERS/auction_item.png">

- **Commission System**
  - 5% commission on successful auctions
  - Commission payment tracking
  - Payment proof submission and verification

<img alt="Commission Screenshot" src="https://res.cloudinary.com/dtfhtn424/image/upload/v1/MERN_AUCTION_PLATFORM_USERS/commission_payment.png">

- **Admin Dashboard**
  - Analytics and reporting
  - Monthly revenue monitoring
  - User management
  - Payment verification
  - Content moderation

<img alt="Admin Dashboard Screenshot" src="https://res.cloudinary.com/dtfhtn424/image/upload/v1/MERN_AUCTION_PLATFORM_USERS/admin_dashboard.png">

- **Other Features**
  - Responsive design, modern UI
  - Leaderboard for top bidders
  - Automated auction ending
  - Email notifications
  - Payment methods integration

## 🛠️ Technologies Used

**Frontend**
- React.js with Hooks
- Redux Toolkit
- React Router
- Axios
- Framer Motion
- Tailwind CSS
- React Toastify
- React Icons

**Backend**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary image storage
- Nodemailer for emails
- Express-fileupload
- CORS

**DevOps**
- Vercel (frontend)
- Render (backend)
- MongoDB Atlas (DB)
- Environment variables

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Cloudinary account
- SMTP email account

### Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/yourusername/online-auction-platform.git
    cd online-auction-platform
    ```

2. **Backend setup:**
    ```
    cd backend
    npm install
    ```
    - Configure `.env`:
      ```
      MONGO_URI=your_mongodb_connection_string
      PORT=5000
      FRONTEND_URL=http://localhost:5173
      JWT_SECRET_KEY=your_jwt_secret
      JWT_EXPIRE=7d
      COOKIE_EXPIRE=7
      CLOUDINARY_CLOUD_NAME=your_cloudinary_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret
      SMTP_HOST=smtp.example.com
      SMTP_PORT=587
      SMTP_SERVICE=gmail
      SMTP_MAIL=your_email@gmail.com
      SMTP_PASSWORD=your_email_password
      ```
    - Start backend server:
      ```
      npm run dev
      ```

3. **Frontend setup:**
    ```
    cd ../frontend
    npm install
    ```
    - Configure `.env`:
      ```
      VITE_APP_NAME=PrimeBid
      VITE_API_URL=http://localhost:5000/api/v1
      VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
      VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
      VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
      ```
    - Start frontend server:
      ```
      npm run dev
      ```
    - Open: http://localhost:5173

## 🌐 Deployment

**Frontend (Vercel)**
- Connect repo to Vercel
- Configure environment variables:
  - `VITE_API_URL=https://onlineauctionplatfrom.onrender.com/api/v1`
  - Other variables from local `.env`

**Backend (Render)**
- Connect repo to Render
- Configure environment variables:
  - `FRONTEND_URL=https://online-auction-platfrom.vercel.app`
  - `NODE_ENV=production`
  - Other variables from local `.env`

## 👥 Team

- Atul Kumar — Lead Developer
- Manisha Mohapatra — Frontend Developer
- Pihu Routrary — Backend Developer

## 📜 License

MIT License — see the LICENSE file.

## 🙏 Acknowledgments

- MongoDB Atlas — database hosting
- Cloudinary — image hosting
- Vercel & Render — deployment
- All open-source libraries

© 2024 PrimeBid. All rights reserved.
