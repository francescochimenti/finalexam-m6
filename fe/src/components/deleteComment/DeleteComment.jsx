import React from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setCommentToggle } from "../../reducers/getCommentToggle";
import { useDispatch } from "react-redux";

const DeleteComment = ({ commentId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const deleteCurrentComment = async (commentId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${id}/comment/${commentId}`
      );
      dispatch(setCommentToggle());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          deleteCurrentComment(commentId);
        }}
      >
        <AiFillDelete color="red" size={30} />
      </button>
    </>
  );
};

export default DeleteComment;
