import React from "react";
import Navbar from "../../components/navbar/Navbar";
import NewPost from "../../components/newPost/NewPost";

const NewProduct = () => {
  return (
    <div className="p-4">
      <Navbar />
      <NewPost />
    </div>
  );
};

export default NewProduct;
