import React, { useEffect, useState } from "react";
import "./blogHeader.css";
import useSession from "../../hooks/useSession";
import { useDispatch } from "react-redux";
import { searchPostsByTitle } from "../../reducers/postReducers";
import { fetchPosts } from "../../reducers/postReducers";

const BlogPost = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search !== "") {
      dispatch(searchPostsByTitle(search));
    }
    if (search === "") {
      dispatch(fetchPosts());
    }
  }, [search, dispatch]);

  const session = useSession();
  return (
    <div className="d-flex justify-content-around align-items-center flex-wrap">
      <div className="blog-image mt-4 d-flex flex-column">
        <span className="display-1 fw-bold text-center">Welcome back,</span>
        <h1 className=" text-warning display-1 text-center fw-bold">
          {session.firstName}
        </h1>
      </div>
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
