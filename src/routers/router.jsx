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
      // {
      //   path: "myParcels",
      //   Component: MyParcels,
      // },
      // {
      //   path: "payment/:parcelId",
      //   Component: Payment,
      // },
      // {
      //   path: "paymentHistory",
      //   Component: PaymentHistory,
      // },
      // {
      //   path: "track",
      //   Component: TrackParcel,
      // },

      // // rider only

      // {
      //   path: "pending-deliveries",
      //   element: (
      //     <RiderRoute>
      //       <PendingDeliveries></PendingDeliveries>
      //     </RiderRoute>
      //   ),
      // },
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
      // // admin only
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
