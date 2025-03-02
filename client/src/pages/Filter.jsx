import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import usePost from "../hooks/postsHook";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import globalService from "../services/globalService";
import LazyLoadingItems from "../components/LazyLoadingItems";

const Filter = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { useGetAllPostQuery } = usePost();
  const { isPending, data: posts } = useGetAllPostQuery({
    limit: 6,
    sort: "title",
    category,
  });

  return (
    <>
      <Navbar />
      <section className="posts py-16">
        <div className="container">
          <div className="items flex gap-12 flex-wrap">
            {isPending ? (
              <LazyLoadingItems />
            ) : posts?.data?.length > 0 ? (
              posts?.data.map((item) => (
                <div
                  className="post border-2 border-emerald-400 w-[30%]"
                  key={item._id}
                >
                  <div className="post-responsive h-[200px] border-2 border-gray-100">
                    <img
                      src={globalService.postImg + item.postImg}
                      alt="postImg"
                      className="responsive"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="pb-6">{item.title}</h2>
                    <Link
                      to={`/singlepost/${item._id}?category=${item.category}`}
                      className="read border border-emerald-300 px-4 py-2 rounded"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Filter;
