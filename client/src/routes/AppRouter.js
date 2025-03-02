import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error"; //
import LazyLoadingRoute from "../components/LazyLoadingRoute";

// layouts
import AuthGuard from "../guards/AuthGuard";

// pages
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
const ResetCodeVerify = lazy(() => import("../pages/ResetCodeVerify"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Comment = lazy(() => import("../pages/Comment"));
const Like = lazy(() => import("../pages/Like"));
const Archive = lazy(() => import("../pages/Archive")); //
const Saved = lazy(() => import("../pages/Saved")); //
const Profile = lazy(() => import("../pages/Profile"));
const Filter = lazy(() => import("../pages/Filter"));
const SinglePost = lazy(() => import("../pages/SinglePost")); //
const Write = lazy(() => import("../pages/Write"));

// routing config
const router = createBrowserRouter([
  {
    index: true,
    errorElement: <Error />,
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "forgetpassword",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: "resetcodeverify",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <ResetCodeVerify />
      </Suspense>
    ),
  },
  {
    path: "resetpassword",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "comment",
    element: (
      <AuthGuard>
        <Suspense fallback={<LazyLoadingRoute />}>
          <Comment />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: "like",
    element: (
      <AuthGuard>
        <Suspense fallback={<LazyLoadingRoute />}>
          <Like />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: "archive",
    element: (
      <AuthGuard>
        <Suspense fallback={<LazyLoadingRoute />}>
          <Archive />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: "saved",
    element: (
      <AuthGuard>
        <Suspense fallback={<LazyLoadingRoute />}>
          <Saved />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: "profile",
    element: (
      <AuthGuard>
        <Suspense fallback={<LazyLoadingRoute />}>
          <Profile />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: "home",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <Home />
      </Suspense>
    ),
  },

  {
    path: "filter",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <Filter />
      </Suspense>
    ),
  },
  {
    path: "singlepost/:id",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <SinglePost />
      </Suspense>
    ),
  },

  {
    path: "write",
    element: (
      <Suspense fallback={<LazyLoadingRoute />}>
        <Write />
      </Suspense>
    ),
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
