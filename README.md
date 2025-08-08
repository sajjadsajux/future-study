# 🎓 FutureStudy – Scholarship Application Platform

## 📌 Project Purpose

**FutureStudy** is a full-stack MERN-based Scholarship Management System designed to help students discover, apply for, and track university scholarships with ease. It offers a complete application process with form + payment, role-based dashboards (User, Moderator, Admin), scholarship management, review system, analytics, and secure authentication.

---

## 🌐 Live Site Link

👉 [Visit Live Site](https://future--study.web.app)

---



![FutureStudy Screenshot](https://res.cloudinary.com/dfyyhn4i4/image/upload/v1754632275/FireShot_Capture_028_-_Home_--_FutureStudy_-_future--study.web.app_h06aqs.png)

---

## 🚀 Key Features

- 👥 Three distinct role-based dashboards: **User**, **Moderator**, **Admin**
- 📝 Full scholarship application workflow with dynamic form + **Stripe** integration
- 📄 Application tracking with real-time status updates and moderator/admin feedback
- 💬 Scholarship review system with rating, edit/delete, and moderator/admin control
- 📊 Admin analytics dashboard with interactive charts
- 🔍 Scholarship search, sort, and filter by category, deadline, and fees
- 🖼️ Image upload support via **imgbb** and **Cloudinary**

---

## 🧱 Technologies Used

### 🔷 MERN Stack (Main Technologies)

- **MongoDB** – NoSQL database
- **Express.js** – Backend REST API
- **React.js** – Frontend UI
- **Node.js** – Server environment

---

## 📦 NPM Packages Used

### 🎨 Styling & UI

- `tailwindcss` – Utility-first CSS framework
- `daisyui` – Tailwind CSS UI components
- `react-icons`, `lucide-react` – Icon libraries
- `swiper` – Carousel/Slider
- `react-modal` – Reusable modal
- `aos` – Scroll Animation
- `react-toastify`, `sweetalert2` – Notifications & alerts
- `react-spinners`, `lottie-react` – Animations & loaders

### 🔁 State & Forms

- `@tanstack/react-query` – Data fetching & caching
- `react-hook-form` – Form handling & validation

### 🧭 Routing

- `react-router` – Client-side routing

### ⚙️ Utilities

- `axios` – HTTP client
- `react-countup`, `react-fast-marquee` – UI effects

### 🔐 Auth & Deployment

- `firebase` – Auth, hosting, Firestore

### 💳 Payment

- `@stripe/react-stripe-js`, `@stripe/stripe-js` – Stripe integration

### 📊 Visualization

- `recharts` – Charts and graphs

---

## 🧪 Role-Based Features

### 👤 Regular User

- Register/login via email/password or social
- View & apply to scholarships
- Fill form + pay via Stripe
- Track application status and feedback
- Submit & edit/delete reviews
- View personal profile and dashboard

### 🧑‍🏫 Moderator

- Add/edit/delete scholarships
- View all applications, update statuses
- Provide feedback to users
- Manage all reviews
- Access moderator dashboard

### 🛡️ Admin

- Manage all users (edit roles, delete)
- Filter users by roles
- Full access to scholarships, reviews, applications
- View analytics via chart dashboard
- Role-based access control & sorting options

---

## 📋 Form + Stripe Payment Flow

- Users fill a detailed form (photo, results, degree, address, etc.)
- Fields auto-populate some scholarship info (read-only)
- Upon successful Stripe payment, user data is submitted and stored
- Sweet alert confirms success, errors shown via toast

---

## 🧰 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/futurestudy.git
cd futurestudy
```

## 🧰 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/futurestudy.git
cd futurestudy
```

### 2. Install Dependencies

```bash

npm install

```

### 3. Environment Variables

Create a .env file and add the following:

- VITE_apiKey=
- VITE_authDomain=
- VITE_projectId=
- VITE_storageBucket=
- VITE_messagingSenderId=
- VITE_appId=
- VITE_PUBLISHABLE_KEY=
- VITE_IMGBB_KEY=
- VITE_FREE_IMG_HOST=
- VITE_CLOUDINARY_CLOUD_NAME=
- VITE_CLOUDINARY_API_KEY=
- VITE_CLOUDINARY_UPLOAD_PRESET=
- VITE_API_URL=https://your-backend-api.com

### 4. Run the App

npm run dev


## 🌐 Live Site Link

👉 [Visit Live Site](https://future--study.web.app)

# 📬 Contact

Made with ❤️ by Sajjad Saju
📫👉 [Sajjad Saju Portfolio](https://sajjadsaju.web.app/)
