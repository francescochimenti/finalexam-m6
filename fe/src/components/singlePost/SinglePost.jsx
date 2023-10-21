import React from "react";
import { Card } from "react-bootstrap";
import "./singlePost.css";

const SinglePost = ({ post }) => {
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <Card
      onClick={() => {
        window.location.href = `/product/${post._id}`;
      }}
      className="single-post-card mb-4 shadow-sm"
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }}
    >
      <Card.Img
        variant="top"
        src={post.cover}
        alt={`Cover image of ${post.title}`}
        loading="lazy"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="mb-2 fw-bold">{post.title}</Card.Title>
        <Card.Text className="mb-1">Category: {post.category}</Card.Text>
        <Card.Text className="mb-1">
          Read Time: {post.readTime.value} {post.readTime.unit}
        </Card.Text>
      </Card.Body>
      <div className="d-flex align-items-center mb-3 px-4 w-100">
        <img
          src={post.author.avatar}
          alt={`${post.author.firstName}'s avatar`}
          className="rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
        <span className="ms-2 fw-bold">
          {post.author.firstName} {post.author.lastName}
        </span>
      </div>
      <Card.Footer
        className="text-muted"
        style={{
          backgroundColor: "#f8f9fa",
          borderTop: "none",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          height: "50px",
          padding: "10px 30px",
        }}
      >
        <small>
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default SinglePost;
