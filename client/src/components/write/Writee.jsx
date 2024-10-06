import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Writee.scss";

const Writee = () => {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <>
      <Navbar />
      <section className="write" id="write">
        <div className="container">
          <div className="edit-tools">
            <div className="edit">
              <div>
                <input
                  type="text"
                  placeholder="Title..."
                  name="postcontent"
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="reactquil">
                <ReactQuill theme="snow" value={value} onChange={setValue} />
              </div>
            </div>
            <div className="edit">
              <div className="publish-box">
                <h2>Publish</h2>
                <p>
                  <span>Status:</span> Draft
                </p>
                <p>
                  <span>Visibility:</span> Public
                </p>
                <div>
                  <input type="file" name="uplaodimg" />
                </div>
                <div className="btns">
                  <button>Save as a draft</button>
                  <button>Publish</button>
                </div>
              </div>
              <div className="category-box">
                <h2>Category</h2>
                <form>
                  <div>
                    <input type="radio" name="filter" id="art" />
                    <label htmlFor="art">Art</label>
                  </div>
                  <div>
                    <input type="radio" name="filter" id="science" />
                    <label htmlFor="science">Science</label>
                  </div>
                  <div>
                    <input type="radio" name="filter" id="technology" />
                    <label htmlFor="technology">Technology</label>
                  </div>
                  <div>
                    <input type="radio" name="filter" id="cinema" />
                    <label htmlFor="cinema">Cinema</label>
                  </div>
                  <div>
                    <input type="radio" name="filter" id="design" />
                    <label htmlFor="design">Design</label>
                  </div>
                  <div>
                    <input type="radio" name="filter" id="food" />
                    <label htmlFor="food">Food</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Writee;
