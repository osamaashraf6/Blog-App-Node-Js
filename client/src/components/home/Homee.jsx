import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { posts } from "../../utils/data";
import "./Homee.scss";

const Homee = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(posts);
  }, []);
  return (
    <>
      <Navbar />
      <section className="home-page" id="home-page">
        <div className="container">
          {data.map((item) => (
            <div className="items" key={item.id}>
              <div className="item">
                <h2>Heading {item.creator}</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum Sed ut
                </p>
                <Link to={`/singlepost/${item.id}`} className="read">Read More</Link>
              </div>
              <div className="item">
              <div className="itempost-responsive">
              <img src={item.img} alt="homePostImg" className="responsive" />

              </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Homee;
