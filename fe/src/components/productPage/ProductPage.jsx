import React, { useEffect, useState } from "react"; // Import useState
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./productPage.css";
import AddComment from "../addComment/AddComment";

function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
        console.log(data);
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="blog-details-root">
      <Container>
        {data ? (
          <>
            <img
              className="blog-details-cover"
              src={data.post.cover}
              alt={`Cover of ${data.post.title}`}
              fluid
            />

            <div className="blog-details-author">
              <p>
                Published on:{" "}
                {new Date(data.post.createdAt).toLocaleDateString()}
              </p>
              <h4>
                <strong>Author: </strong>
                {`${data.post.author.firstName} ${data.post.author.lastName}`}
              </h4>
            </div>
            <h1 className="blog-details-title">{data.post.title}</h1>

            <div className="blog-details-container">
              <span className="fw-bold">
                Read Time: {data.post.readTime.value} {data.post.readTime.unit}
              </span>
              <div className="blog-details-info">
                <span>
                  Category: <strong>{data.post.category}</strong>
                </span>
              </div>
            </div>
            <div
              className="p-3"
              dangerouslySetInnerHTML={{ __html: data.post.content }}
            />
          </>
        ) : (
          <div className="loading">
            <h4 className="text-center">Loading...</h4>
          </div>
        )}
      </Container>
      <AddComment />
    </div>
  );
}

export default ProductPage;
