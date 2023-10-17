import React from "react";
import "./blogHeader.css";
import useSession from "../../hooks/useSession";

const BlogPost = () => {
  const session = useSession();
  return (
    <div className="blog-image mt-4 d-flex flex-column align-items-center justify-content-evenly">
      <h1 className="text-center text-light fw-bold">
        Welcome back, <br />
        <span className="text-warning">
          {session.firstName} {session.lastName}
        </span>
      </h1>
      <div className="form">
        <input type="text" id="search-input" placeholder="Search for post" />
        <button id="search-button">Search</button>
      </div>
    </div>
  );
};

export default BlogPost;
