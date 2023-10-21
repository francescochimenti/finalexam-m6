import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import "./login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    avatar: "",
  });
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${process.env.REACT_APP_SERVER_BASE_URL}/login`
      : `${process.env.REACT_APP_SERVER_BASE_URL}/authors/create`;

    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate("/home");
      }
      setResponse(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={` ${isLogin ? "main" : "main"}`}>
      <Container className={` ${isLogin ? "w-75" : "w-100"}`}>
        <Card className="p-4 border-0 shadow">
          <h2 className="mb-4 text-center fw-bold">epibooks</h2>
          {response?.error && <Alert variant="danger">{response.error}</Alert>}
          <Form onSubmit={onSubmit}>
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
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="avatar"
                    defaultValue="https://picsum.photos/200/300"
                    onChange={handleInputChange}
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
                type="password"
                name="password"
                required
                onChange={handleInputChange}
                placeholder="Password"
              />
            </Form.Group>
            <Button className="button-primary" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form>
          <div className="mt-3">
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <Button
              className="button-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
