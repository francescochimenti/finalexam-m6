import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SinglePost from "../singlePost/SinglePost";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../reducers/postReducers";
import BeatLoader from "react-spinners/ScaleLoader";

const BlogPost = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const posts = useSelector((state) => state.posts.posts);
  const totalPages = useSelector((state) => state.posts.totalPages);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const setPagination = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [currentPage, dispatch]);

  if (status === "loading")
    return (
      <div className="d-flex justify-content-center mt-5">
        <BeatLoader color="red" size={50} />
      </div>
    );

  return (
    <>
      <Container className="p-5">
        <Row className="mt-4">
          {status === "loading" && <div></div>}
          {status === "failed" && <div>Error: {error}</div>}
          {status === "success" &&
            posts &&
            posts.map((post) => (
              <Col lg={4} md={6} sm={12} key={post._id}>
                <SinglePost post={post} />
              </Col>
            ))}
          <div>
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setPagination}
            />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BlogPost;
