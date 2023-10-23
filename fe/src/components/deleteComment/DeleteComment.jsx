import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setCommentToggle } from "../../reducers/getCommentToggle";
import { useDispatch } from "react-redux";
import BeatLoader from "react-spinners/ScaleLoader";

const DeleteComment = ({ commentId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const deleteCurrentComment = async (commentId) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${id}/comment/${commentId}`
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
          deleteCurrentComment(commentId);
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

export default DeleteComment;
