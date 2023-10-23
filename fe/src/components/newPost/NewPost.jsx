import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import useSession from "../../hooks/useSession";
import BeatLoader from "react-spinners/ScaleLoader";

const NewBlogPost = () => {
  const session = useSession();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [readTime, setReadTime] = useState({ value: 0, unit: "minutes" });
  const [category, setCategory] = useState("Travel");
  const [loading, setLoading] = useState(false);

  const handleChange = (value) => {
    setText(value);
  };

  const formData = {
    author: session.id,
    title: title,
    readTime: {
      value: parseInt(readTime.value),
      unit: readTime.unit,
    },
    category: category,
    content: text,
  };

  // create a state for the file
  const [file, setFile] = useState(null);

  // create a function to set the file
  // need to be always to 0
  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  // create a function to upload the file
  const uploadFile = async (cover) => {
    // create a new FormData object
    const fileData = new FormData();
    // add the file to FormData object
    fileData.append("cover", cover);
    // send the file to the server
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // check if the file is not null
    if (file) {
      try {
        // upload the file
        const uploadedFile = await uploadFile(file);
        // add the cover to the formData
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
        setText("");
        setTitle("");
        setReadTime({ value: 0, unit: "minutes" });
        setCategory("");
        console.log("uploadedFile:", uploadedFile);
      } catch (error) {
        console.log("Si è verificato un errore:", error);
      }
    } else {
      console.error("File non caricato");
    }
    setLoading(false);
  };

  return (
    <Container className="new-blog-container">
      <Form
        className="mt-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow"
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
            className="shadow"
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
            className="shadow"
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
            className="shadow"
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
            className="shadow"
          >
            <option>Travel</option>
            <option>Food & Recipes</option>
            <option>Health & Fitness</option>
            <option>Personal Finance</option>
            <option>Technology & Gadgets</option>
            <option>Arts & Crafts</option>
            <option>Book Reviews</option>
            <option>Career & Education</option>
            <option>Parenting & Family</option>
            <option>Home & Garden</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={text}
            onChange={handleChange}
            className="new-blog-content shadow"
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
            {!loading ? "Add Post" : <BeatLoader color="white" size={10} />}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
