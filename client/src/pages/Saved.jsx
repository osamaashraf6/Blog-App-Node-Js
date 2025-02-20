import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import "../components/home/Homee.scss";
import globalService from "../services/globalService";
import { format } from "timeago.js";
import useSaved from "../hooks/savedsHook";
import useArchive from "../hooks/archivesHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBoxArchive,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useLike from "../hooks/likesHook";

const Saved = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { getAllSavedQuery, deleteOneSavedMutation } = useSaved();
  const { createOneArchiveMutation } = useArchive();
  const { createOneLikeMutation } = useLike();
  const { isPending, data: saveds } = getAllSavedQuery;
  console.log(saveds)
  const { isPending: loading } = deleteOneSavedMutation;
  const { isPending: likeLoading } = createOneLikeMutation;
  const { isPending: archiveLoading } = createOneArchiveMutation;
  const handleUnsavedBtn = (id) => {
    if (!currentUser) {
      toast.error("Sign in First");
    } else {
      deleteOneSavedMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Unsaved Successfully");
        },
        onError: (res) => {
          console.log(res);
          toast.error(
            res?.response?.data?.message +
              ", " +
              "saession terminated, sign in again"
          );
        },
      });
    }
  };
  const handleLikedBtn = (postId) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneLikeMutation.mutate(postId, {
        onSuccess: () => {
          toast.success("Post Has Been Liked successfully !");
        },
        onError: (res) => {
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  const handleCreateOneArchiveBtn = (id, postId) => {
    handleUnsavedBtn(id);
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneArchiveMutation.mutate(postId, {
        onSuccess: () => {
          toast.success("Post Has Been Archived successfully !");
        },
        onError: (res) => {
          console.log(res);
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  return (
    <>
      <Navbar />
      <section className="home-page" id="home-page">
        <div className="container">
          {isPending ? (
            <p>Loading Saveds...</p>
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
                        <h3>{item.userId.name}</h3>
                        <span className="text-indigo-400">
                          {format(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-10">
                    <button
                      className="border border-red-600 text-red-500 px-4 py-2"
                      disabled={loading}
                      onClick={() => handleUnsavedBtn(item?._id)}
                    >
                      {loading ? (
                        "please wait..."
                      ) : (
                        <>
                          Unsaved <FontAwesomeIcon icon={faBookmark} />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleLikedBtn(item?.postId?._id)}
                      className="border border-emerald-600 text-emerald-500 px-4 py-2"
                      disabled={likeLoading}
                    >
                      {likeLoading ? (
                        "Pease wait..."
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
                      disabled={archiveLoading}
                    >
                      {archiveLoading ? (
                        "Pease wait..."
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
