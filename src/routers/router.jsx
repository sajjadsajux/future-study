import { createBrowserRouter } from "react-router";
import MainLayOut from "../layouts/MainLayOut";
import AuthLayOut from "../layouts/AuthLayOut";

import Home from "../pages/Home/Home/Home";
import PrivateRoute from "../routes/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import AllScholarship from "../pages/AllScholarship/AllScholarship";
import ScholarshipDetail from "../pages/AllScholarship/ScholarshipDetail";
import Checkout from "../pages/Checkout/Checkout";
import MyProfile from "../pages/Dashboard/MyProfile";
import MyApplications from "../pages/Dashboard/UserDashboard/MyApplications";
import UserRoute from "../routes/UserRoute";
import EditApplication from "../pages/Dashboard/UserDashboard/EditApplication";
import ScholarshipDetails from "../pages/Dashboard/UserDashboard/ScholarshipDetails";
import ModeratorRoute from "../routes/ModeratorRoute";
import ManageScholarships from "../pages/Dashboard/ModeratorDashboard/ManageScholarships";
import AddScholarship from "../pages/Dashboard/ModeratorDashboard/AddScholarship";
import AllAppliedScholarships from "../pages/Dashboard/UserDashboard/AllAppliedScholarships";
import AdminRoute from "../routes/AdminRoute";
import MyReviews from "../pages/Dashboard/UserDashboard/MyReviews";
import AllReviews from "../pages/Dashboard/ModeratorDashboard/AllReviews";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import AboutUs from "../pages/AboutUs/AboutUs";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-scholarship",
        Component: AllScholarship,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms-of-service",
        Component: TermsOfService,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetail></ScholarshipDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayOut,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      // // user only
      {
        path: "my-applications",
        element: (
          <UserRoute>
            <MyApplications></MyApplications>
          </UserRoute>
        ),
      },
      {
        path: "scholarships-details/:id",
        element: (
          <UserRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </UserRoute>
        ),
      },
      {
        path: "edit-application/:id",
        element: (
          <UserRoute>
            <EditApplication></EditApplication>
          </UserRoute>
        ),
      },

      {
        path: "my-reviews",
        element: (
          <UserRoute>
            <MyReviews></MyReviews>
          </UserRoute>
        ),
      },

      // // moderator only

      {
        path: "moderator/manage-scholarships",
        element: (
          <ModeratorRoute>
            <ManageScholarships></ManageScholarships>
          </ModeratorRoute>
        ),
      },
      {
        path: "moderator/scholarships-details/:id",
        element: (
          <ModeratorRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </ModeratorRoute>
        ),
      },
      {
        path: "moderator/all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews></AllReviews>
          </ModeratorRoute>
        ),
      },
      {
        path: "moderator/add-scholarships",
        element: (
          <ModeratorRoute>
            <AddScholarship></AddScholarship>
          </ModeratorRoute>
        ),
      },
      {
        path: "moderator/all-applied-scholarships",
        element: (
          <ModeratorRoute>
            <AllAppliedScholarships></AllAppliedScholarships>
          </ModeratorRoute>
        ),
      },

      // // Admin only

      {
        path: "admin/add-scholarships",
        element: (
          <AdminRoute>
            <AddScholarship></AddScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships></ManageScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-applied-scholarships",
        element: (
          <AdminRoute>
            <AllAppliedScholarships></AllAppliedScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-reviews",
        element: (
          <AdminRoute>
            <AllReviews></AllReviews>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
