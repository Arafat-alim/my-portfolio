import React from "react";
import { BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
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
      <div style={{ cursor: "pointer" }}>
        <a
          href="https://github.com/Arafat-alim"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
