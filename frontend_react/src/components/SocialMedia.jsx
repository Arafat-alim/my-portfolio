import React from "react";
import { BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaCode, FaGithub, FaStackOverflow } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div style={{ cursor: "pointer" }}>
        <a
          href="https://github.com/Arafat-alim"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </div>
      <div style={{ cursor: "pointer" }}>
        <a
          href="https://stackoverflow.com/users/20520620/arafat-alim"
          target="_blank"
          rel="noreferrer"
        >
          <FaStackOverflow />
        </a>
      </div>
      <div style={{ cursor: "pointer" }}>
        <a
          href="https://leetcode.com/u/Arafat-alim/"
          target="_blank"
          rel="noreferrer"
        >
          <FaCode />
        </a>
      </div>
      <div style={{ cursor: "pointer" }}>
        <a
          href="https://twitter.com/CoderAlim"
          target="_blank"
          rel="noreferrer"
        >
          <BsTwitter />
        </a>
      </div>
      <div style={{ cursor: "pointer" }}>
        <a
          href="https://www.linkedin.com/in/arafat-alim/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
