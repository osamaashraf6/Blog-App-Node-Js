import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import usePost from "../hooks/postsHook";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import globalService from "../services/globalService";

const Filter = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { getAllPostQuery } = usePost();
  const { isPending, data: posts } = getAllPostQuery({
    limit: 6,
    sort: "title",
    category,
  });

  return (
    <>
      <Navbar />
      {/* <h3 className="other-posts">Other posts you may like</h3> */}
      <div className="posts">
        {isPending ? (
          <p>Loading Posts...</p>
        ) : posts?.data?.length > 0 ? (
          posts?.data.map((item) => (
            <div className="post" key={item._id}>
              <div className="post-responsive">
                <img
                  src={globalService.postImg + item.postImg}
                  alt="postImg"
                  className="responsive"
                />
              </div>
              <h2>{item.title}</h2>
              <Link
                to={`/singlepost/${item._id}?category=${item.category}`}
                className="read"
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Filter;
