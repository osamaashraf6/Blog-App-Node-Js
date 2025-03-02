import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faPinterest,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import useLikeLogic from "../hooks/shared/likeLogic";
import LazyLoadingItems from "../components/LazyLoadingItems";
import LazyLoadingBtn from "../components/LazyLoadingBtn";
const Like = () => {
  const {
    changePage,
    likeId,
    handleDeleteLike,
    deleteLikLoading,
    likes,
    isPending,
  } = useLikeLogic();
  return (
    <>
      <Navbar />
      <section className=" py-[60px]" id="">
        <div className="container-wrapper">
          <div className="text-left pl-[132px] pb-[20px]">
            <h2>
              My Likes <FontAwesomeIcon icon={faPencil} />
            </h2>
          </div>
          <div className="items grid place-items-center">
            <table className="w-[80%] bg-white table-fixed">
              <thead className="">
                <tr className="border-y border-gray-200">
                  <th className="py-5">Like Id</th>
                  <th className="py-5">Liker Name</th>
                  <th className="py-5">Post title</th>
                  <th className="py-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isPending ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <LazyLoadingItems />
                    </td>
                  </tr>
                ) : likes?.data.length > 0 ? (
                  likes?.data?.map((item) => (
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
                      <td className="flex flex-col gap-2 justify-center items-center py-5">
                        <button
                          onClick={() => handleDeleteLike(item?._id)}
                          className="border border-red-500 p-2 px-3 text-xs rounded text-red-500"
                          disabled={item?._id === likeId && deleteLikLoading}
                        >
                          {item?._id === likeId && deleteLikLoading
                            ? <LazyLoadingBtn />
                            : " Dislike"}
                        </button>
                      </td>
                    </tr>
                    // !
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      No likes available
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
                {likes?.pagination.prev && (
                  <li
                    onClick={() => changePage(likes?.pagination.prev)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <button className="page-link">
                      {likes?.pagination.prev}
                    </button>
                  </li>
                )}
                <li className="page-item">
                  <button
                    disabled
                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    {likes?.pagination.currentPage}
                  </button>
                </li>
                {likes?.pagination.next && (
                  <li
                    onClick={() => changePage(likes?.pagination.next)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <button className="page-link">
                      {likes?.pagination.next}
                    </button>
                  </li>
                )}
                {/* <!-- Start next --> */}
                <li onClick={() => changePage(likes?.pagination.totalPages)}>
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

      {/* end modal */}
      <Footer />
    </>
  );
};

export default Like;
