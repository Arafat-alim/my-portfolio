import React, { useState } from "react";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";

import { client } from "../../client.js";

import "./Footer.scss";

const Footer = () => {
  const [msg, setMsg] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //! Deleting all the contact details
  // client
  //   .delete({ query: '*[_type == "contact"]' })
  //   .then(console.log)
  //   .catch(console.error);

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };
    if (contact.name === "" || contact.email === "" || contact.message === "") {
      setLoading(false);
      setMsg("Please Fill the required Fields");
    } else {
      //! Upload the data to form
      setMsg("Please Wait!");
      client.create(contact).then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
        setMsg("");
      });
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;
  const [isFormSubmmited, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const query = "*[_type == 'contact']";
  //   client
  //     .fetch(query)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log("Footer Error", err));
  // }, []);
  return (
    <>
      <h2 className="head-text">Take a coffee & chat with Me! ☕ </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:arafat.aman.alim@gmail.com" className="p-text">
            @arafat-alim
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 (828) 298-5207" className="p-text">
            @Mobile
          </a>
        </div>
      </div>

      {!isFormSubmmited ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              required
              name="name"
              className="p-text"
              placeholder="Your Name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="app__flex">
            <input
              required
              name="email"
              className="p-text"
              placeholder="Your Email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea
              required
              name="message"
              className="p-text"
              placeholder="Your Message"
              value={message}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in Touch ♥</h3>
        </div>
      )}
      <div>
        <h5 className="p-text" style={{ color: "red" }}>
          {msg}
        </h5>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
