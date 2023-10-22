import React from "react";
import Navbar from "../../components/navbar/Navbar";
import BlogHeader from "../../components/blogHeader/BlogHeader";
import BlogPost from "../../components/blogPost/BlogPost";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <div className="p-4">
        <Navbar />
        <BlogHeader />
        <BlogPost />
      </div>
      <Footer />
    </>
  );
};

export default Home;
