import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import DeleteComment from "../deleteComment/DeleteComment";
import useSession from "../../hooks/useSession";

const SingleComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState([]);

  const session = useSession();

  const commentToggle = useSelector((state) => state.commentToggle);
  console.log("commentToggle", commentToggle);

  const getComment = async (id) => {
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

  useEffect(() => {
    getComment(id);
  }, [id, commentToggle]);

  return (
    <Container>
      <h1 className="mb-5 text-center">Comments</h1>
      <Row>
        {comment.map((comment) => (
          <Col key={comment._id} md={6} className="mb-4">
            <div className="d-flex align-items-center border rounded-4 p-3 shadow justify-content-between">
              <div>
                <p className="mb-1">{comment.comment}</p>
                <div>
                  Rating:{" "}
                  {[...Array(comment.rate)].map((_, i) => (
                    <FaStar key={i} className="text-warning" />
                  ))}
                  <small className="text-muted d-block mt-2">
                    Created by: {comment.authorId.firstName}{" "}
                    {comment.authorId.lastName}
                  </small>
                </div>
              </div>
              {comment.authorId._id === session.id ? (
                <DeleteComment commentId={comment._id} />
              ) : null}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SingleComment;
