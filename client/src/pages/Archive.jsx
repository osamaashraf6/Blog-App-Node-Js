import React from "react";
import { Link } from "react-router-dom";
import useArchive from "../hooks/archivesHook";
import { useSelector } from "react-redux";
import useSaved from "../hooks/savedsHook";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import globalService from "../services/globalService";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Archive = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { createOneSavedMutation } = useSaved();
  const { getAllArchiveQuery, deleteOneArchiveMutation } = useArchive();
  const { isPending, data: archives } = getAllArchiveQuery;
  const { isPending: archiveLoading } = deleteOneArchiveMutation;
  const handleSavedBtn = (id) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneSavedMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Saved successfully !");
        },
        onError: (res) => {
          console.log(res);
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  const handleUnArchivedBtn = (id, postId) => {
    if (!currentUser) {
      toast.error("Sign in First");
    } else {
      handleSavedBtn(postId);
      deleteOneArchiveMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Unarchived Successfully");
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
  return (
    <>
      <Navbar />
      <section className="home-page" id="home-page">
        <div className="container">
          {isPending ? (
            <p>Loading Saveds...</p>
          ) : archives?.data?.length > 0 ? (
            archives?.data.map((item) => (
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
                      disabled={archiveLoading}
                      onClick={() =>
                        handleUnArchivedBtn(item?._id, item?.postId?._id)
                      }
                    >
                      {archiveLoading ? (
                        "please wait..."
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
