import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-dark shadow">
      <p className="text-center fw-bold py-4 mb-0">
        &copy; {new Date().getFullYear()} NatureNotes. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
