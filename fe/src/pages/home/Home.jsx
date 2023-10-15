import React from "react";
import Navbar from "../../components/navbar/Navbar";
import BlogHeader from "../../components/blogHeader/BlogHeader";
import BlogPost from "../../components/blogPost/BlogPost";
import useSession from "../../hooks/useSession";

const Home = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="p-4">
      <Navbar />
      <BlogHeader />
      <BlogPost />
    </div>
  );
};

export default Home;
