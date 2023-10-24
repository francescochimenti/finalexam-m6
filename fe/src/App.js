import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import MyPost from "./pages/myPost/MyPost";

// everything in the ProtectedRoutes component is protected and need authentication to access
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<NewProduct />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/myPost" element={<MyPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
