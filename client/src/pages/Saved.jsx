import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import "../components/home/Homee.scss";
import globalService from "../services/globalService";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBoxArchive,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import useSavedLogic from "../hooks/shared/savedLogic";
import useLikeLogic from "../hooks/shared/likeLogic";
import useArchiveLogic from "../hooks/shared/archiveLogic";
import LazyLoadingBtn from "../components/LazyLoadingBtn";
import LazyLoadingItems from "../components/LazyLoadingItems";
import useCheckToken from "../hooks/shared/checkToken";

const Saved = () => {
  const { handleLikedBtn, createLikeLoading, likeId } = useLikeLogic();
  const { handleCreateOneArchiveBtn, createArchiveLoading, archiveId } =
    useArchiveLogic();
  const { handleUnsavedBtn, deleteSavLoading, isPending, saveds, savedId } =
    useSavedLogic();
  useCheckToken();

  return (
    <>
      <Navbar />
      <section className="home-page" id="home-page">
        <div className="container">
          {isPending ? (
            <LazyLoadingItems />
          ) : saveds?.data?.length > 0 ? (
            saveds?.data.map((item) => (
              <div className="items" key={item?.postId?._id}>
                <div className="item">
                  <h2>{item?.postId?.title}</h2>
                  <p>{item?.postId?.briefDesc}</p>
                  <div className="main-post">
                    <Link
                      to={`/singlepost/${item?.postId?._id}?category=${item?.postId?.category}`}
                      className="read"
                    >
                      Read More
                    </Link>
                    <div className="post-owner">
                      <div className="post-owner-responsive">
                        <img
                          src={
                            globalService.userImg +
                            item?.postId?.userId?.profileImg
                          }
                        />
                      </div>
                      <div className="">
                        <h3>{item?.postId?.userId.name}</h3>
                        <span className="text-indigo-400">
                          {format(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-10">
                    <button
                      className="border border-red-600 text-red-500 px-4 py-2"
                      disabled={savedId === item?._id && deleteSavLoading}
                      onClick={() => handleUnsavedBtn(item?._id)}
                    >
                      {savedId === item?._id && deleteSavLoading ? (
                        <LazyLoadingBtn />
                      ) : (
                        <>
                          Unsaved <FontAwesomeIcon icon={faBookmark} />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleLikedBtn(item?.postId?._id)}
                      className="border border-emerald-600 text-emerald-500 px-4 py-2"
                      disabled={
                        item?.postId?._id === likeId && createLikeLoading
                      }
                    >
                      {item?.postId?._id === likeId && createLikeLoading ? (
                        <LazyLoadingBtn />
                      ) : (
                        <>
                          Like <FontAwesomeIcon icon={faThumbsUp} />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        handleCreateOneArchiveBtn(item?._id, item?.postId?._id)
                      }
                      className="border border-emerald-600 text-emerald-500 px-4 py-2"
                      disabled={
                        item?.postId?._id === archiveId && createArchiveLoading
                      }
                    >
                      {item?.postId?._id === archiveId &&
                      createArchiveLoading ? (
                        <LazyLoadingBtn />
                      ) : (
                        <>
                          Archive <FontAwesomeIcon icon={faBoxArchive} />
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

export default Saved;
