import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const NewBlogPost = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [readTime, setReadTime] = useState({ value: 0, unit: "minutes" });
  const [category, setCategory] = useState("");

  const formData = {
    author: {
      name: author,
      avatar: avatar,
    },
    title: title,
    readTime: {
      value: parseInt(readTime.value),
      unit: readTime.unit,
    },
    category: category,
    content: text,
  };

  const [file, setFile] = useState(null);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/upload`,
        fileData
      );
      console.log("File caricato con successo:", response.data);
      return response.data;
    } catch (error) {
      console.log("Si è verificato un errore:", error);
    }
  };

  const handleChange = (value) => {
    setText(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const finalBody = {
          ...formData,
          cover: uploadedFile.cover,
        };
        console.log("finalBody:", finalBody);
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/posts/create`,
          finalBody,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Post creato con successo:", response.data);
        setFile(null);
        console.log("uploadedFile:", uploadedFile);
      } catch (error) {
        console.log("Si è verificato un errore:", error);
      }
    } else {
      console.error("File non caricato");
    }
  };

  return (
    <Container className="new-blog-container">
      {/* setting the form encType */}
      <Form
        className="mt-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author avatar</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Author avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            type="file"
            name="cover"
            size="lg"
            placeholder="Cover"
            onChange={onChangeSetFile}
          />
        </Form.Group>

        <Form.Group controlId="blog-form-readTime-value" className="mt-3">
          <Form.Label>Read time value</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Read time value"
            value={readTime.value}
            onChange={(e) =>
              setReadTime((prev) => ({ ...prev, value: e.target.value }))
            }
          />
        </Form.Group>
        <Form.Group controlId="blog-form-readTime-unit" className="mt-3">
          <Form.Label>Read time unit</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={readTime.unit}
            onChange={(e) =>
              setReadTime((prev) => ({ ...prev, unit: e.target.value }))
            }
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
            <option>Category 4</option>
            <option>Category 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Add
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
