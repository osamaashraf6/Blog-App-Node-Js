import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.scss";
import globalService from "../../../services/globalService";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import useSavedLogic from "../../../hooks/shared/savedLogic";
import useLikeLogic from "../../../hooks/shared/likeLogic";
import useCommentLogic from "../../../hooks/shared/commentLogic";
import usePostLogic from "../../../hooks/shared/postLogic";
import { useSelector } from "react-redux";
import LazyLoadingBtn from "../../LazyLoadingBtn";
import LazyLoadingItems from "../../LazyLoadingItems";

const Details = () => {
  const [open, setOpen] = useState(false);
  const [commentBtnId, setCommentBtnId] = useState(null);
  const [detailedDesc, setDetailedDesc] = useState("");
  const [updatedPost, setUpdatedPost] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { post, isPending, handleDeleteOnePost, deletePostLoading } =
    usePostLogic();
  const { handleSavedBtn, createSavLoading } = useSavedLogic();
  const { handleLikedBtn, createLikeLoading } = useLikeLogic();
  const {
    changePage,
    handleDeleteComment,
    deleteComLoading,
    commentId,
    register,
    handleSubmit,
    errors,
    handleCreateOneComment,
    createComLoading,
    comments,
    commentLoading,
    //
    handleUpdateOneComment,
    errorsUpdateComment,
    handleSubmitUpdateComment,
    registerUpdateComment,
    updateComLoading,
  } = useCommentLogic();
  useEffect(() => {
    // ! imporatnt as not appear if you don't write condition as it is asyncho
    if (post?.data?.detailedDesc) {
      setDetailedDesc(post.data.detailedDesc);
    }
    if (post?.data) {
      setUpdatedPost(post?.data);
    }
  }, [post]);
  const handleNavigation = () => {
    navigate("/write", { state: { updatedPost, updated: true } });
  };

  return (
    <>
      {isPending ? (
        // <p>Loading....</p>
        <LazyLoadingItems />
      ) : post?.data ? (
        <div className="pt-8 flex flex-col gap-8 pr-8">
          <div className="single-responsive pb-6">
            <img
              src={globalService.postImg + post?.data.postImg}
              alt="singleImg"
              className="responsive"
            />
          </div>
          <div className="post-control flex justify-between">
            <div className="flex items-center gap-5">
              <div className="userimg-responsive">
                <img
                  src={globalService.userImg + post?.data.userId.profileImg}
                  alt="userImg"
                  className="responsive"
                />
              </div>
              <div>
                <h4>{post?.data.userId.name}</h4>
                <span>{format(post?.data?.createdAt)}</span>
              </div>
            </div>
            {/*  */}
            {post?.data?.userId?._id === currentUser?.data?._id && (
              <div className="flex gap-4">
                {/* <button
                  onClick={handleNavigation}
                  className="text-green-600 font-medium"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDeleteOnePost(post?.data?._id)}
                  className="text-red-500 font-medium"
                  disabled={deletePostLoading}
                >
                  {deletePostLoading ? "Loading" : "Delete"}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-end w-full flex-col gap-3">
            <button
              onClick={() => handleSavedBtn(post?.data?._id)}
              className="text-emerald-400"
              disabled={createSavLoading}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </button>
            <button
              onClick={() => handleLikedBtn(post?.data?._id)}
              className="w-fit"
              disabled={createLikeLoading}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
          </div>
          <h2 className="heading-post">{post?.data?.title}</h2>
          <span>{post?.data?.category}</span>

          <div>
            <h2 className="text-xl font-medium">brief Desc: </h2>
            <p>{post?.data?.briefDesc}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium">detailed Desc: </h2>
            {/* // ! too insert html raw fetched from db */}
            <div dangerouslySetInnerHTML={{ __html: detailedDesc }} />
          </div>
        </div>
      ) : (
        <p>No Post Available</p>
      )}
      <hr className="flex mt-10" />
      <section className="py-12">
        <div>
          <form
            className=""
            onSubmit={handleSubmit((data) =>
              handleCreateOneComment(post?.data?._id, data)
            )}
          >
            <div className="formcontrol flex gap-4 items-center">
              <textarea
                className="border w-full outline-0 p-4"
                rows="4"
                name="comment"
                placeholder="Submit comment now..."
                {...register("comment", {
                  required: "Comment is required",
                  minLength: {
                    value: 6,
                    message: "Comment must be at least 6 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Comment cannot exceed 200 characters",
                  },
                })}
              ></textarea>

              <button
                type="submit"
                className=" bg-blue-600 text-white font-medium  py-2 rounded w-[200px] text-xs"
                disabled={createComLoading}
              >
                {createComLoading ? <LazyLoadingBtn /> : " Add comment"}
              </button>
            </div>
          </form>
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message}</p>
          )}
          {/*  */}
          <div className="fetch-comments p-4">
            {commentLoading ? (
              <LazyLoadingItems />
            ) : comments?.data?.length > 0 ? (
              comments?.data?.map((item) => (
                <div
                  key={item?._id}
                  className="flex flex-col gap-10 py-10 border-b"
                >
                  {/*  */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-5">
                      <div className="userimg-responsive">
                        <img
                          src={globalService.userImg + item?.userId?.profileImg}
                          alt="userImg"
                          className="responsive"
                        />
                      </div>
                      <div>
                        <h4>{item?.userId?.name}</h4>
                        <span>{format(item?.createdAt)}</span>
                      </div>
                    </div>
                    {item?.userId?._id === currentUser?.data?._id && (
                      <div className="flex flex-col gap-4">
                        <button
                          onClick={() => {
                            setOpen(true);
                            setCommentBtnId(item?._id);
                          }}
                          className="rounded text-xs border border-emerald-600 text-emerald-500 px-4 py-2"
                          disabled={item?._id === commentId && updateComLoading}
                        >
                          {item?._id === commentId && updateComLoading ? (
                            <LazyLoadingBtn />
                          ) : (
                            "update"
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteComment(item?._id)}
                          className="rounded text-xs border border-red-600 text-red-500 px-4 py-2"
                          disabled={item?._id === commentId && deleteComLoading}
                        >
                          {item?._id === commentId && deleteComLoading ? (
                            <LazyLoadingBtn />
                          ) : (
                            " Delete"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="comment-content pl-10 font-medium">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-emerald-500 pr-1"
                    />
                    : {item?.comment}
                  </div>
                  {/*  */}
                </div>
              ))
            ) : (
              <p>No Comments Available..</p>
            )}
            {/* <!-- Start Pagination --> */}
            <nav
              aria-label="Page navigation example"
              className="flex justify-center items-center py-20"
            >
              <ul className="inline-flex -space-x-px text-sm">
                <li onClick={() => changePage(1)}>
                  <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                  </button>
                </li>
                {/* <!-- End previous --> */}
                {comments?.pagination.prev && (
                  <li
                    onClick={() => changePage(comments?.pagination.prev)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <button className="page-link">
                      {comments?.pagination.prev}
                    </button>
                  </li>
                )}
                <li className="page-item">
                  <button
                    disabled
                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    {comments?.pagination.currentPage}
                  </button>
                </li>
                {comments?.pagination.next && (
                  <li
                    onClick={() => changePage(comments?.pagination.next)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <button className="page-link">
                      {comments?.pagination.next}
                    </button>
                  </li>
                )}
                {/* <!-- Start next --> */}
                <li onClick={() => changePage(comments?.pagination.totalPages)}>
                  <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                  </button>
                </li>
              </ul>
            </nav>

            {/* <!-- End Pagination --> */}
          </div>
        </div>
      </section>
      {/* <!-- Modal comment update --> */}
      <div
        className={`
        ${open ? "flex" : "hidden"}
         parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed
      `}
      >
        <div className="parmodal_modal  bg-white w-[350px] h-[230px] pr-4 pl-10 pt-2 pb-8">
          <div className="flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-white bg-red-500 text-xs"
            >
              close
            </button>
          </div>
          <h2 className="text-2xl text-gray-300 font-bold pb-6">
            Upade Post Comment
          </h2>
          <form
            onSubmit={handleSubmitUpdateComment((data) =>
              handleUpdateOneComment(commentBtnId, data)
            )}
            className="flex flex-col gap-4 pr-6"
          >
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                Comment
              </label>
              <input
                type="text"
                className="text-sm w-full border-0 border-b"
                {...registerUpdateComment("comment")}
              />
            </div>

            <button
              className="p-1 bg-emerald-500 text-white text-sm"
              disabled={updateComLoading}
            >
              {updateComLoading ? <LazyLoadingBtn /> : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;
