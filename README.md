# 🎓 FutureStudy – Scholarship Application Platform

## 🌐 Live Demo

👉 [Visit Live Site](https://future-study.web.app)

## 📌 Project Purpose

**FutureStudy** is a full-stack MERN platform that enables students to discover, apply for, and track scholarships. It supports role-based dashboards for users, moderators, and admins, and includes a complete application + payment flow, review system, and moderation tools.

## 🚀 Key Features

- 👤 Role-based dashboards: User, Moderator, Admin
- 📝 Scholarship application form with **Stripe** payment
- 💬 Add & manage reviews for scholarships
- 📊 Admin charts: application stats & user roles
- 🗂️ Moderators can manage scholarships and reviews
- 🧾 Application status & feedback system
- 🔍 Search, filter, and pagination

## 🧱 Technologies Used

### 🔷 MERN Stack (Main Technologies)

- **MongoDB** – NoSQL database for storing users, scholarships, applications
- **Express.js** – Backend RESTful API framework
- **React.js** – Frontend library for building UI
- **Node.js** – Server environment

## 📦 NPM Packages Used

### 🎨 Styling & UI

- [`tailwindcss`](https://www.npmjs.com/package/tailwindcss) – Utility-first CSS framework
- [`daisyui`](https://www.npmjs.com/package/daisyui) – Tailwind CSS UI components
- [`react-icons`](https://www.npmjs.com/package/react-icons) – Popular icons
- [`lucide-react`](https://www.npmjs.com/package/lucide-react) – Elegant icon set
- [`react-modal`](https://www.npmjs.com/package/react-modal) – Modal component
- [`react-toastify`](https://www.npmjs.com/package/react-toastify) – Toast notifications
- [`sweetalert2`](https://www.npmjs.com/package/sweetalert2) – Alert popups
- [`swiper`](https://www.npmjs.com/package/swiper) – Slider/carousel UI
- [`react-spinners`](https://www.npmjs.com/package/react-spinners) – Loader spinners
- [`lottie-react`](https://www.npmjs.com/package/lottie-react) – Animation support

### 🔁 State & Forms

- [`@tanstack/react-query`](https://www.npmjs.com/package/@tanstack/react-query) – Async state management
- [`react-hook-form`](https://www.npmjs.com/package/react-hook-form) – Powerful form handling

### 🧭 Routing

- [`react-router`](https://www.npmjs.com/package/react-router) – Frontend routing/navigation

### ⚙️ Utilities

- [`axios`](https://www.npmjs.com/package/axios) – Promise-based HTTP requests
- [`react-countup`](https://www.npmjs.com/package/react-countup) – Animated counters
- [`react-fast-marquee`](https://www.npmjs.com/package/react-fast-marquee) – Horizontal marquee scrolling

### 🔐 Authentication & Hosting

- [`firebase`](https://www.npmjs.com/package/firebase) – Auth, Firestore, and deployment

### 💳 Payment Integration

- [`@stripe/react-stripe-js`](https://www.npmjs.com/package/@stripe/react-stripe-js) – Stripe integration for React
- [`@stripe/stripe-js`](https://www.npmjs.com/package/@stripe/stripe-js) – Stripe JavaScript library

### 📊 Charts & Visualization

- [`recharts`](https://www.npmjs.com/package/recharts) – Chart components (Pie, Bar, etc.)

## 🧪 Role-Based Features

### 👤 Regular User

- Apply for scholarships
- Pay with Stripe
- Track application status
- Submit reviews
- View and edit own reviews

### 🧑‍🏫 Moderator

- Add/edit/delete scholarships
- View all applications
- Provide feedback
- Change application statuses
- Manage all reviews

### 🛡️ Admin

- Manage users
- Change user roles (user, moderator, admin)
- Filter users by role
- Access analytics dashboard

## 🛠️ Setup Instructions

1. **Clone this repo:**

   ```bash
   git clone https://github.com/your-username/futurestudy.git
   cd futurestudy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**

- Create a .env file in the root and add:
  - VITE_API_URL=https://your-backend-api.com
  - VITE_IMGBB_KEY=your_imgbb_api_key
  - VITE_FIREBASE_API_KEY=your_firebase_api_key

2. **Run the app:**

   ```bash
   npm run dev
   ```

# 📬 Contact

Created with ❤️ by Sajjad Saju
👉 [Portfolio](https://sajjadsaju.web.app/)
