import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Details.scss";
import usePost from "../../../hooks/postsHook";
import useSaved from "../../../hooks/savedsHook";
import useComment from "../../../hooks/commentsHook";
import globalService from "../../../services/globalService";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import {
  faBookmark,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import useLike from "../../../hooks/likesHook";

const Details = () => {
  const [page, setPage] = useState(1);
  const [detailedDesc, setDetailedDesc] = useState("");
  const [updatedPost, setUpdatedPost] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOnePostQuery, deleteOnePostMutation } = usePost();
  const { createOneSavedMutation, deleteOneSavedMutation } = useSaved();
  const {
    createOneCommentMutation,
    getAllCommentOfPostQuery,
    updateOneCommentMutation,
    deleteOneCommentMutation,
  } = useComment();
  const { createOneLikeMutation } = useLike();
  const { isPending, data: post } = getOnePostQuery(id);
  const { error, isPending: isLoading, data } = deleteOnePostMutation;
  //
  const { isPending: createComLoading } = createOneCommentMutation;
  const { isPending: commentLoading, data: comments } =
    getAllCommentOfPostQuery({
      postId: post?.data?._id,
      limit: 5,
      page,
      sort: "-createdAt",
    });
  const { isPending: updateComLoading } = updateOneCommentMutation;
  const { isPending: deleteComLoading } = deleteOneCommentMutation;
  //
  const { currentUser } = useSelector((state) => state.user);
  const changePage = (page) => {
    setPage(page);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // ! imporatnt as not appear if you don't write condition as it is asyncho
    if (post?.data?.detailedDesc) {
      setDetailedDesc(post.data.detailedDesc);
    }
    if (post?.data) {
      setUpdatedPost(post?.data);
    }
  }, [post]);
  const handleDeleteOnePost = (id) => {
    if (!currentUser) {
      toast.error("You have to sign in first !");
    } else {
      deleteOnePostMutation.mutate(
        id,

        {
          onSuccess: (res) => {
            toast.success(res);
            navigate("/home");
          },
          onError: (res) => {
            toast.error(
              `${res?.response?.data?.error?.message}, Sign in again`
            );
          },
        }
      );
    }
  };
  const handleNavigation = () => {
    navigate("/write", { state: { updatedPost, updated: true } });
  };
  // const handleSavedBtn = (saved) => {
  //   if (!currentUser) {
  //     toast.error("Please sign in first !");
  //   } else {
  //     if (saved) {
  //       console.log(saved)
  //       // ! send here the id of that like
  //       const likeId = post?.data?.saveds?.map((item) => {
  //         if (item?.userId === currentUser?._id) {
  //           return item?._id;
  //         }
  //       });
  //       deleteOneSavedMutation.mutate(likeId, {
  //         onSuccess: () => {
  //           toast.success("Post Has Been Unsaved successfully !");
  //         },
  //       });
  //     } else {
  //       // ! send here the id of that post
  //       createOneSavedMutation.mutate(post?.data?._id, {
  //         onSuccess: () => {
  //           toast.success("Post Has Been Saved successfully !");
  //         },
  //       });
  //     }
  //   }
  // };
  const handleSavedBtn = (id) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneSavedMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Saved successfully !");
        },
        onError: (res) => {
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  const handleLikedBtn = (id) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneLikeMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Liked successfully !");
        },
        onError: (res) => {
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  const handleCreateOneComment = (postId, data) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneCommentMutation.mutate(
        { postId, formData: data },
        {
          onSuccess: () => {
            toast.success("Comment Has Been Added Successfully");
          },
          onError: () => {
            toast.error("Something went wrong !");
          },
        }
      );
      reset();
    }
  };
  const handleDeleteOneComment = (id) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      deleteOneCommentMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Comment Has Been Deleted Successfully");
        },
        onError: () => {},
      });
    }
  };
  return (
    <>
      {isPending ? (
        <p>Loading....</p>
      ) : post?.data ? (
        <div className="pt-8 flex flex-col gap-8">
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
                <button
                  onClick={handleNavigation}
                  className="text-green-600 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteOnePost(post?.data?._id)}
                  className="text-red-500 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading" : "Delete"}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-end w-full flex-col gap-3">
            {/* // ! send the model.userId */}
            {/* <button
              className="w-fit"
              onClick={() =>
                handleSavedBtn(
                  post?.data?.saveds?.some(
                    (item) => item?.userId === currentUser?._id
                  )
                )
              }
            >
              {post?.data?.saveds?.some(
                (item) => item?.userId == currentUser?._id
              ) ? (
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-emerald-500 "
                />
              ) : (
                <FontAwesomeIcon icon={faBookmark} />
              )}
            </button> */}
            <button
              onClick={() => handleSavedBtn(post?.data?._id)}
              className="text-emerald-400"
            >
              <FontAwesomeIcon icon={faBookmark} />
            </button>
            <button
              onClick={() => handleLikedBtn(post?.data?._id)}
              className="w-fit"
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
                className=" bg-blue-600 text-white font-medium px-4 py-2 rounded w-[200px]"
                disabled={createComLoading}
              >
                {createComLoading ? "Please wait.." : " Add comment"}
              </button>
            </div>
          </form>
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message}</p>
          )}
          {/*  */}
          <div className="fetch-comments p-4">
            {commentLoading ? (
              <p>Comments Loading...</p>
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
                        <button className="border border-emerald-600 text-emerald-500 px-4 py-2">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOneComment(item?._id)}
                          className="border border-red-600 text-red-500 px-4 py-2"
                          disabled={deleteComLoading}
                        >
                          {deleteComLoading ? "please wait..." : " Delete"}
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
    </>
  );
};

export default Details;
