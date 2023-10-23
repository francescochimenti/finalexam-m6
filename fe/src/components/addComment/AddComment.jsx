import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { setCommentToggle } from "../../reducers/getCommentToggle";
import { useDispatch } from "react-redux";
import BeatLoader from "react-spinners/ScaleLoader";

const AddComment = () => {
  const session = useSession();
  const dispatch = useDispatch();
  console.log("session", session.id);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const [commentData, setCommentData] = useState({
    comment: "",
    rate: null,
    authorId: session.id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${id}`,
        commentData
      );
      console.log("Comment added:", response.data);
      setCommentData({
        comment: "",
        rate: "",
        authorId: session.id,
      });

      dispatch(setCommentToggle());
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data || error.message
      );
    }
    setLoading(false);
  };

  return (
    <form className="container mt-4">
      <div className="mb-3 w-100">
        <textarea
          value={commentData.comment}
          onChange={(e) =>
            setCommentData({ ...commentData, comment: e.target.value })
          }
          placeholder="Write your comment here"
          required
          className="form-control shadow "
          rows="4"
        />
      </div>
      <div className="mb-3 w-25">
        <input
          type="number"
          min="1"
          max="5"
          value={commentData.rate}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > 5 || value < 1) {
              alert("Please enter a value between 1 and 5.");
              return;
            }
            setCommentData({
              ...commentData,
              rate: value,
            });
          }}
          placeholder="Rate (e.g., 1 to 5)"
          required
          className="form-control shadow"
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary shadow">
        {loading ? <BeatLoader color="white" size={30} /> : "Add Comment"}
      </button>
    </form>
  );
};

export default AddComment;
