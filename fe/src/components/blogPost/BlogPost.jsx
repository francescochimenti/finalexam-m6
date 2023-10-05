import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SinglePost from "../singlePost/SinglePost";
import axios from "axios";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/bootstrap.css";

const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`
        );
        setPosts(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [currentPage]);
  return (
    <>
      <Container className="p-5">
        <Row className="mt-4">
          {posts && posts.posts?.map((post) => {
              return (
                <Col lg={3} md={4} sm={12} key={post._id}>
                  <SinglePost post={post} />
                </Col>
              );
            })}
          <div>
            <ResponsivePagination
              current={currentPage}
              total={posts && posts.totalPages}
              onPageChange={handlePagination}
            />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BlogPost;
