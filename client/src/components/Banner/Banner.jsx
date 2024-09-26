import React from 'react';
import './Banner.css';

const banners = [
    'https://www.w3schools.com/w3images/lights.jpg', // Light
    'https://www.w3schools.com/w3images/nature.jpg', // Nature
    'https://www.w3schools.com/w3images/mountains.jpg' // Mountains
  ];
  

function Banner() {
  return (
    <div className="banner-container">
      {banners.map((banner, index) => (
        <div className="banner" key={index}>
          <img src={banner} alt={`Banner ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default Banner;
