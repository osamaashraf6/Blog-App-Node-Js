import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "../../../utils/data";
import "./SimilarPosts.scss";

const Posts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(posts);
  }, []);
  return (
    <>
      <h3 className="other-posts">Other posts you may like</h3>
      <div className="posts">
        {data.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-responsive">
              <img src={post.img} alt="postImg" className="responsive" />
            </div>
            <h2>{post.creator}</h2>
            <Link to={`/singlepost/${post.id}`} className="read">Read More</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
