// components/Footer/Footer.js
import React from 'react';
import './Footer.css'; // Make sure to create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Betosky. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
