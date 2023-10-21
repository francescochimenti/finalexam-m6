import React from "react";
import ProductPage from "../../components/productPage/ProductPage";
import NavBar from "../../components/navbar/Navbar";
import SingleComment from "../../components/singleComment/SingleComment";

const SingleProduct = () => {
  return (
    <>
      <NavBar />
      <ProductPage />
      <SingleComment />
    </>
  );
};

export default SingleProduct;
