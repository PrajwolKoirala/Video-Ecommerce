import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>"Choose Us, Believe in Beauty."</h2>

        <div>
          <div className="hero-hand-icon">
            <p>Our cosmetic collection includes Gloss, body lotions,</p>

            <img src={hand_icon} alt="" />
          </div>
          <p>lipsticks, eyeshadows, moisturizers, concealers, </p>
          <p>scrubs, body washes, creams , serums</p>

          <p>and other products.</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} style={{ width: "700px" }} alt="" />
      </div>
    </div>
  );
};

export default Hero;
