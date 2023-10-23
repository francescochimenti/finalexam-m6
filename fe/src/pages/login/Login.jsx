import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "./login.css";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../reducers/mailReducer";
import axios from "axios";
import BeatLoader from "react-spinners/ScaleLoader";

const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [file, setFile] = useState(null);

  // create a function to set the file
  // need to be always to 0
  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  // create a function to upload the file
  const uploadFile = async (avatar) => {
    // create a new FormData object
    const fileData = new FormData();
    // add the file to FormData object
    fileData.append("avatar", avatar);
    // send the file to the server
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/authors/upload`,
        fileData
      );
      console.log("File caricato con successo:", response.data);
      return response.data;
    } catch (error) {
      console.log("Si è verificato un errore:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? `${process.env.REACT_APP_SERVER_BASE_URL}/login`
      : `${process.env.REACT_APP_SERVER_BASE_URL}/authors/create`;

    let finalBody = { ...formData };

    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        finalBody.avatar = uploadedFile.avatar;
      } catch (error) {
        console.log("Errore durante il caricamento del file:", error);
      }
    }

    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(finalBody),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate("/home");
      }
      setResponse(data);

      if (!isLogin) {
        dispatch(sendEmail(formData.email));
        setIsLogin(true);
        setFile(null);
      }
    } catch (error) {
      console.log("Errore durante l'invio dei dati:", error);
    }
    setLoading(false);
  };

  return (
    <Container className="main">
      <div className="p-4 border-0 shadow w-100">
        <h2 className="mb-4 text-center fw-bold text-danger">NatureNotes</h2>
        {response?.error && <Alert variant="danger">{response.error}</Alert>}
        <Form onSubmit={onSubmit} encType="multipart/form-data">
          {!isLogin && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  required={!isLogin}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  required={!isLogin}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profile picture</Form.Label>
                <Form.Control
                  type="file"
                  name="avatar"
                  onChange={onChangeSetFile}
                />
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              minLength="8"
              type="password"
              name="password"
              required
              onChange={handleInputChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button className="button-primary" type="submit">
            {!loading ? (
              isLogin ? (
                "Login"
              ) : (
                "Register"
              )
            ) : (
              <BeatLoader color="white" size={10} />
            )}
          </Button>
        </Form>
        <div className="mt-3 d-flex flex-column">
          <span className="fw-bold text-uppercase text-center mb-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <Button
            className="btn-dark shadow mx-1 text-uppercase fw-bold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
