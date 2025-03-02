import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userslice/apiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faUser,
  faBookmark,
  faBoxArchive,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    logout(dispatch);
  };
  const toggleUserSettings = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="pb-24">
      <nav
        className="nav fixed w-full z-50 bg-white mb-24 shadow-sm py-2"
        id="nav"
      >
        <div className="container">
          <div className="parnav">
            <div className="brand">
              <Link to="/home">Medium</Link>
            </div>
            <ul>
              <li>
                <Link to="/filter?category=art">ART</Link>
              </li>
              <li>
                <Link to="/filter?category=science">SCIENCE</Link>
              </li>
              <li>
                <Link to="/filter?category=technology">TECHNOLOGY</Link>
              </li>
              <li>
                <Link to="/filter?category=cinema">CINEMA</Link>
              </li>
              <li>
                <Link to="/filter?category=design">DESIGN</Link>
              </li>
              <li>
                <Link to="/filter?category=food">FOOD</Link>
              </li>
            </ul>
            {/*  */}

            <div className="flex gap-5 items-center pr-10">
              <div className="relative">
                <div>
                  <button
                    onClick={toggleUserSettings}
                    className="pardropdown relative"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="absolute top-[3px] left-[12px] flex justify-center items-center w-[16px] h-[16px] text-lg rounded-full bg-yellow-500">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </button>
                </div>

                <div className={open ? "flex" : "hidden"}>
                  <ul
                    className="
                 pardropdown_dropdown absolute top-[34px] left-[-5px] bg-white pt-3 shadow-md rounded w-[200px] border flex-col z-50
                  "
                  >
                    <li>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/profile"
                        className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                      >
                        <FontAwesomeIcon icon={faUser} /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/comment"
                        className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                      >
                        <FontAwesomeIcon icon={faComment} /> Comments
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/like"
                        className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                      >
                        <FontAwesomeIcon icon={faThumbsUp} /> Likes
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/archive"
                        className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                      >
                        <FontAwesomeIcon icon={faBoxArchive} /> Archives
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/saved"
                        className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                      >
                        <FontAwesomeIcon icon={faBookmark} /> Saveds
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="user">
              {currentUser ? (
                <>
                  <Link to="/profile">{currentUser?.data?.name}</Link>
                  <span className="logout" onClick={handleLogOut}>
                    Logout
                  </span>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}

              <Link className="write" to="/write">
                Write
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
