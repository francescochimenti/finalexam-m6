import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SinglePost from "../../components/singlePost/SinglePost";
import useSession from "../../hooks/useSession";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";

const MyPost = () => {
  const session = useSession();
  const [posts, setPosts] = useState([]);
  const commentToggle = useSelector((state) => state.commentToggle);

  //get posts by author, so it's easy for him delete that in case he wants to

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/byAuthor/${session.id}`
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [session.id, commentToggle]);

  return (
    <div className="p-4">
      <Navbar />
      <Container className="p-5">
        <h1 className="mb-5 fw-bold text-warning text-center display-1">
          My Posts
        </h1>
        <Row className="mt-4">
          {posts &&
            posts.map((post) => (
              <Col lg={4} md={6} sm={12} key={post._id}>
                <SinglePost post={post} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyPost;
