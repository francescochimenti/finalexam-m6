import React from "react";
import Navbar from "../../components/navbar/Navbar";
import NewPost from "../../components/newPost/NewPost";
import Footer from "../../components/footer/Footer";

const NewProduct = () => {
  return (
    <>
      <div className="p-4">
        <Navbar />
        <NewPost />
      </div>
      <Footer />
    </>
  );
};

export default NewProduct;
