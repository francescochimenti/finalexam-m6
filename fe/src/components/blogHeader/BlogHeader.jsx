import React, { useEffect, useState } from "react";
import "./blogHeader.css";
import useSession from "../../hooks/useSession";
import { useDispatch } from "react-redux";
import { searchPostsByTitle } from "../../reducers/postReducers";

const BlogPost = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(searchPostsByTitle(search));
  }, [search, dispatch]);

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
        <input
          type="text"
          id="search-input"
          placeholder="Search for post"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BlogPost;
