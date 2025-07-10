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
        // loader: () => fetch("./serviceCenters.json"),
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
      //   loader: () => fetch("./serviceCenters.json"),
      // },
      // {
      //   path: "/beARider",
      //   element: (
      //     <PrivateRoute>
      //       <BeARider></BeARider>
      //     </PrivateRoute>
      //   ),
      //   loader: () => fetch("./serviceCenters.json"),
      // },
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
        path: "edit-application/:id",
        element: (
          <UserRoute>
            <EditApplication></EditApplication>
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

      // {
      //   path: "completed-deliveries",
      //   element: (
      //     <RiderRoute>
      //       <CompletedDeliveries></CompletedDeliveries>
      //     </RiderRoute>
      //   ),
      // },
      // {
      //   path: "my-earnings",
      //   element: (
      //     <RiderRoute>
      //       <MyEarnings></MyEarnings>
      //     </RiderRoute>
      //   ),
      // },
      // // moderator only
      // {
      //   path: "assign-rider",
      //   element: (
      //     <AdminRoute>
      //       <AssignRider></AssignRider>
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "pending-riders",
      //   element: (
      //     <AdminRoute>
      //       <PendingRiders></PendingRiders>
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "active-riders",
      //   element: (
      //     <AdminRoute>
      //       <ActiveRiders></ActiveRiders>
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "makeAdmin",
      //   element: (
      //     <AdminRoute>
      //       <MakeAdmin></MakeAdmin>
      //     </AdminRoute>
      //   ),
      // },
    ],
  },
]);
