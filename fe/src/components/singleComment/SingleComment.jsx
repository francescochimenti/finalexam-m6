import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState([]);

  // get

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${id}/comments`
        );
        setComment(response.data);
        console.log("Comments:", response.data);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    };
    getComment();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comment.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>{comment.rate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleComment;
