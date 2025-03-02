import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./SimilarPosts.scss";
import usePost from "../../../hooks/postsHook";
import globalService from "../../../services/globalService";
import LazyLoadingItems from "../../LazyLoadingItems";

const Posts = () => {
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
      <h3 className="other-posts text-emerald-400 font-medium">Other posts you may like: </h3>
      <div className="posts">
        {isPending ? (
          <LazyLoadingItems />
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
    </>
  );
};

export default Posts;
