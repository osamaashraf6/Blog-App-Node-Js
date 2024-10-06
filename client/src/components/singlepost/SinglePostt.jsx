import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Details from "./details/Details";
import SimilarPosts from "./similarposts/SimilarPosts";
import './SinglePostt.scss';

const SinglePostt = () => {
  return (
    <>
      <Navbar />
      <section className="normal-aside" id="normal-aside">
        <div className="container">
          <div className="asides">
            <aside className="aside-left">
              <Details />
            </aside>
            <aside className="aside-right">
              <SimilarPosts />
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SinglePostt;

