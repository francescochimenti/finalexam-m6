import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { setCommentToggle } from "../../reducers/getCommentToggle";
import { useDispatch } from "react-redux";
import BeatLoader from "react-spinners/ScaleLoader";

const DeletePost = ({ postID }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteCurrentPost = async (postID) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/delete/${postID}`
      );
      dispatch(setCommentToggle());
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          deleteCurrentPost(postID);
        }}
      >
        {loading ? (
          <BeatLoader color="red" size={30} />
        ) : (
          <AiFillDelete color="red" size={30} />
        )}
      </button>
    </>
  );
};

export default DeletePost;
