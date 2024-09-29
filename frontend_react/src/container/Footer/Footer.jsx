import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import ReCAPTCHA from "react-google-recaptcha";

import { client } from "../../client.js";

import "./Footer.scss";
import { sendDataToDiscord } from "../../hook/sendDataToDiscord.js";
import useAnalyticsEventTracker from "../../hook/useAnalyticsEventTracker.jsx";

const Footer = () => {
  const [msg, setMsg] = useState("");
  const [enabledSubmitBtn, setEnabledSubmitBtn] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const gaEventTracker = useAnalyticsEventTracker("Contact us");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    captchaToken: "",
  });

  const { name, email, message, captchaToken } = formData;
  const [isFormSubmmited, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  //! Deleting all the contact details
  // client
  //   .delete({ query: '*[_type == "contact"]' })
  //   .then(console.log)
  //   .catch(console.error);

  const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_FORM;

  const handleSubmit = async () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };
    if (contact.name === "" || contact.email === "" || contact.message === "") {
      setLoading(false);
      setEnabledSubmitBtn(false);
      setMsg("Please Fill the required Fields");
    } else {
      //! Upload the data to form
      setEnabledSubmitBtn(true);
      setMsg("Please Wait!");
      client.create(contact).then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
        setMsg("");
        setFormData({
          name: "",
          email: "",
          message: "",
          captchaToken: "",
        });
      });
      // ! send form data to discord channel
      await sendDataToDiscord({
        data: {
          name: contact.name,
          email: contact.email,
          message: contact.message,
        },
        color: "16753920",
        webhookUrl: webhookUrl,
        title: "💬 Someone has messaged!!!",
      });
    }
  };

  // useEffect(() => {
  //   const query = "*[_type == 'contact']";
  //   client
  //     .fetch(query)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log("Footer Error", err));
  // }, []);

  const handleCaptchaChange = (value) => {
    setFormData({
      ...formData,
      captchaToken: value,
    });
  };

  useEffect(() => {
    if (name === "" || email === "" || message === "" || captchaToken === "") {
      setEnabledSubmitBtn(false);
    } else {
      setEnabledSubmitBtn(true);
    }
  }, [formData]);
  return (
    <>
      <h2 className="head-text">
        🚀 Open to Collaborations and Job Offers! 💼
      </h2>
      <p className="special-p-text">
        I’m available for open-source work or your next hire. Let’s explore how
        we can work together!
      </p>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a
            href="mailto:arafat.aman.alim@gmail.com"
            className="p-text"
            onClick={() => gaEventTracker("mail")}
          >
            @arafat-alim
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a
            href="tel: +91 (828) 298-5207"
            className="p-text"
            onClick={() => gaEventTracker("mobile")}
          >
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

          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            style={{
              width: "100%",
            }}
          />

          <button
            type="button"
            className={`p-text`}
            onClick={handleSubmit}
            disabled={!enabledSubmitBtn}
            style={{
              backgroundColor: !enabledSubmitBtn ? "gray" : "",
              cursor: !enabledSubmitBtn ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="specialHead-text">
            Thank you for reaching out! 🙌 Your interest means a lot to me. ❤️
          </h3>
          <p className="special-p-text">
            I'm excited to explore new collaborations or opportunities together.
            I'll get back to you shortly! 🚀
          </p>
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
