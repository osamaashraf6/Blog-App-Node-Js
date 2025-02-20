import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Write from "./pages/Write";
import NoPage from "./pages/NoPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./pages/ForgetPassword";
import ResetCodeVerify from "./pages/ResetCodeVerify";
import ResetPassword from "./pages/ResetPassword";
import Filter from "./pages/Filter";
import Comment from "./pages/Comment";
import Like from "./pages/Like";
import Archive from "./pages/Archive";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetcodeverify" element={<ResetCodeVerify />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          {/*  */}
          <Route path="/comment" element={<Comment />} />
          <Route path="/like" element={<Like />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
          {/*  */}
          <Route path="/home" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/singlepost/:id" element={<SinglePost />} />
          <Route path="/write" element={<Write />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  );
};

export default App;
