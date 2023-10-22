import React from "react";
import ProductPage from "../../components/productPage/ProductPage";
import NavBar from "../../components/navbar/Navbar";
import SingleComment from "../../components/singleComment/SingleComment";
import AddComment from "../../components/addComment/AddComment";
import Footer from "../../components/footer/Footer";

const SingleProduct = () => {
  return (
    <>
      <div className="p-4">
        <NavBar />
        <ProductPage />
        <SingleComment />
        <AddComment />
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
