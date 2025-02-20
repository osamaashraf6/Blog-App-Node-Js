import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import useComment from "../hooks/commentsHook";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faPinterest,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Comment = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const {
    getAllCommentOfUserQuery,
    updateOneCommentMutation,
    deleteOneCommentMutation,
  } = useComment();
  //
  const { isPending, data: comments } = getAllCommentOfUserQuery({
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
  const handleDeleteComment = (id) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      deleteOneCommentMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Comment deleted successfully");
        },
        onError: () => {},
      });
    }
  };
  return (
    <>
      <Navbar />
      <section className=" py-[60px]" id="">
        <div className="container-wrapper">
          <div className="text-left pl-[132px] pb-[20px]">
            <h2>
              My Comments <FontAwesomeIcon icon={faPencil} />
            </h2>
          </div>
          <div className="items grid place-items-center">
            <table className="w-[80%] bg-white table-fixed">
              <thead className="">
                <tr className="border-y border-gray-200">
                  <th className="py-5">Comment Id</th>
                  <th className="py-5">Commenter Name</th>
                  <th className="py-5">Post title</th>
                  <th className="py-5"> Comment</th>
                  <th className="py-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isPending ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      Comments Loading...
                    </td>
                  </tr>
                ) : comments?.data.length > 0 ? (
                  comments?.data?.map((item) => (
                    // !
                    <tr key={item?._id} className="border-b border-gray-200">
                      <td className="capitalize text-center"># {item?._id}</td>
                      <td className="text-center">{item?.userId?.name}</td>
                      <td className="text-center">
                        <Link
                          className="underline"
                          to={`/singlepost/${item?.postId?._id}`}
                        >
                          {item?.postId?.title}
                        </Link>
                      </td>
                      <td className="text-center">{item?.comment}</td>
                      <td className="flex flex-col gap-2 justify-center items-center py-5">
                        <button
                          onClick={() => setOpen(true)}
                          className="border border-emerald-500 p-2 text-xs rounded text-emerald-500"
                        >
                          Update Comment
                        </button>
                        <button
                          onClick={() => handleDeleteComment(item?._id)}
                          className="border border-red-500 p-2 px-3 text-xs rounded text-red-500"
                          disabled={deleteComLoading}
                        >
                          {deleteComLoading ? "Please wait" : " Delete Comment"}
                        </button>
                      </td>
                    </tr>
                    // !
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      No comments available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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

          <div className="flex gap-4 pt-10 justify-center items-center">
            <span className="font-medium text-lg text-yellow-500 shadow-md p-1">
              Share on:
            </span>
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faX} />
              <FontAwesomeIcon icon={faLinkedin} />
              <FontAwesomeIcon icon={faPinterest} />
            </div>
          </div>
        </div>
      </section>
      {/* // <!-- Modal review update --> */}
      <div
        className={` ${open ? "grid" : "hidden"}
         parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed  place-items-center
        `}
      >
        <div className="parmodal_modal bg-white w-[370px] h-[330px] pr-4 pl-10 pt-2 pb-8 ">
          <div className="flex justify-end pb-4">
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-white bg-red-500 text-xs"
            >
              close
            </button>
          </div>
          <h2 className="text-2xl text-gray-300 font-bold pb-6">
            Upade Your Post Comment
          </h2>
          <form className="flex flex-col gap-4 pr-6">
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                Comment
              </label>
              <input
                type="text"
                className="p-2 border text-sm w-full rounded outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="p-1 bg-emerald-500 text-white text-sm"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      {/* end modal */}
      <Footer />
    </>
  );
};

export default Comment;
