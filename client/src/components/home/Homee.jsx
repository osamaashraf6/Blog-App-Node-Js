import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import "./Homee.scss";
import usePost from "../../hooks/postsHook";
import globalService from "../../services/globalService";
import { format } from "timeago.js";
import LazyLoadingItems from "../LazyLoadingItems";

const Homee = () => {
  const [page, setPage] = useState(1);
  const { useGetAllPostQuery } = usePost();
  const { isPending, data } = useGetAllPostQuery({
    limit: 2,
    page,
    sort: "title",
  });
  const changePage = (page) => {
    setPage(page);
  };
  return (
    <>
      <Navbar />
      <section className="home-page" id="home-page">
        <div className="container">
          {isPending ? (
            <LazyLoadingItems />
          ) : data?.data?.length > 0 ? (
            data?.data.map((item) => (
              <div className="items " key={item?._id}>
                <div className="item">
                  <h2>{item.title}</h2>
                  <p>{item.briefDesc}</p>
                  <div className="main-post">
                    <Link
                      to={`/singlepost/${item?._id}?category=${item?.category}`}
                      className="border border-emerald-300 rounded text-xs px-4 flex justify-center items-center"
                    >
                      Read More
                    </Link>
                    <div className="post-owner">
                      <div className="post-owner-responsive">
                        <img
                          className="border-emerald-200 border-2"
                          src={globalService.userImg + item.userId?.profileImg}
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
                </div>
                <div className="item">
                  <div className="itempost-responsive h-[350px]">
                    <img
                      src={globalService.postImg + item.postImg}
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
              {data?.pagination.prev && (
                <li
                  onClick={() => changePage(data?.pagination.prev)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <button className="page-link">{data?.pagination.prev}</button>
                </li>
              )}
              <li className="page-item">
                <button
                  disabled
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  {data?.pagination.currentPage}
                </button>
              </li>
              {data?.pagination.next && (
                <li
                  onClick={() => changePage(data?.pagination.next)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <button className="page-link">{data?.pagination.next}</button>
                </li>
              )}
              {/* <!-- Start next --> */}
              <li onClick={() => changePage(data?.pagination.totalPages)}>
                <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                </button>
              </li>
            </ul>
          </nav>

          {/* <!-- End Pagination --> */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Homee;
