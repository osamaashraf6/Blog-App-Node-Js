import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import globalService from "../services/globalService";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import useArchiveLogic from "../hooks/shared/archiveLogic";
import LazyLoadingItems from "../components/LazyLoadingItems";
import LazyLoadingBtn from "../components/LazyLoadingBtn";
import "../components/home/Homee.scss";

const Archive = () => {
  const {
    archives,
    isPending,
    handleUnArchivedBtn,
    deleteArchiveLoading,
    archiveId,
  } = useArchiveLogic();
  return (
    <>
      <Navbar />
      <section className="home-page" id="home-page">
        <div className="container">
          {isPending ? (
            <LazyLoadingItems />
          ) : archives?.data?.length > 0 ? (
            archives?.data.map((item) => (
              <div className="items" key={item?._id}>
                <div className="item">
                  <h2>{item?.postId?.title}</h2>
                  <p>{item?.postId?.briefDesc}</p>
                  <div className="main-post">
                    <Link
                      to={`/singlepost/${item?.postId?._id}?category=${item?.postId?.category}`}
                      className="read border border-emerald-300 px-4  text-xs rounded flex justify-center items-center"
                    >
                      Read More
                    </Link>
                    <div className="post-owner">
                      <div className="post-owner-responsive">
                        <img
                          className="border-emerald-200 border-2"
                          src={
                            globalService.userImg +
                            item?.postId?.userId?.profileImg
                          }
                        />
                      </div>
                      <div className="">
                        <h3>{item?.postId?.userId?.name}</h3>
                        <span className="text-indigo-400">
                          {format(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-10">
                    <button
                      className="border border-red-600 text-red-500 px-4 py-2"
                      disabled={item?._id === archiveId && deleteArchiveLoading}
                      onClick={() =>
                        handleUnArchivedBtn(item?._id, item?.postId?._id)
                      }
                    >
                      {item?._id === archiveId && deleteArchiveLoading ? (
                        <LazyLoadingBtn />
                      ) : (
                        <>
                          Unarchive <FontAwesomeIcon icon={faBookmark} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="item">
                  <div className="itempost-responsive">
                    <img
                      src={globalService.postImg + item?.postId?.postImg}
                      alt="homePostImg"
                      className="responsive"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Archive;
