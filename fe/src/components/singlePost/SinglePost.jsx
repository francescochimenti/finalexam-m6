import React from "react";
import { Card } from "react-bootstrap";
import DOMPurify from "dompurify";
import "./singlePost.css";

const SinglePost = ({ post }) => {
  if (!post) {
    return <p>Loading...</p>;
  }

  const sanitizedHTML = DOMPurify.sanitize(post.content);

  return (
    <Card className="single-post-card mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={post.cover}
        alt={`Cover image of ${post.title}`}
        loading="lazy"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="mb-2">{post.title}</Card.Title>
        <Card.Text className="mb-1">Category: {post.category}</Card.Text>
        <Card.Text className="mb-1">
          Read Time: {post.readTime.value} {post.readTime.unit}
        </Card.Text>
      </Card.Body>
      <div className="d-flex align-items-center mb-3 w-100">
        <img
          src={post.author.avatar}
          alt={`${post.author.firstName}'s avatar`}
          className="rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
        <span className="ms-2">
          {post.author.firstName} {post.author.lastName}
        </span>
      </div>
      <Card.Footer className="text-muted">
        <small>{new Date(post.createdAt).toLocaleDateString()}</small>
      </Card.Footer>

      <div
        className="p-3"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </Card>
  );
};

export default SinglePost;
