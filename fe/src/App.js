import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NewProduct from "./pages/newProduct/NewProduct";

export default function App() {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

// const handleGetPost = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/posts`);

//       console.log(response.data.posts);

//     } catch (error) {
//         console.error("Failed to fetch posts:", error.message);
//     }
// };
