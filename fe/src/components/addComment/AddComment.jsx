import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";

const AddComment = () => {
  const session = useSession();
  console.log("session", session.id);

  const { id } = useParams();
  const [commentData, setCommentData] = useState({
    comment: "",
    rate: 0,
    authorId: session.id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${id}`,
        commentData
      );
      console.log("Comment added:", response.data);
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentData.comment}
        onChange={(e) =>
          setCommentData({ ...commentData, comment: e.target.value })
        }
        placeholder="Write your comment here"
        required
      />
      <input
        type="number"
        value={commentData.rate}
        onChange={(e) =>
          setCommentData({ ...commentData, rate: parseInt(e.target.value, 10) })
        }
        placeholder="Rate (e.g., 1 to 5)"
        required
      />
      {/* Assuming authorId and postId are set externally, so no input fields for them */}
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddComment;
