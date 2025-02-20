import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { images } from "../constants";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { postVisitor } from "../db";
import { sendDataToDiscord } from "../hook/sendDataToDiscord";
import useGeoIpInfo from "../hook/useGeoIpInfo";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const { ipAddress: ip, geoUserInfo, error, fetchUser } = useGeoIpInfo();

  const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_VISITORS;

  const sendVisitors = async () => {
    if (!geoUserInfo && !ip) {
      return; // Ensure both data are available
    }

    if (geoUserInfo?.status === "success" && ip) {
      try {
        const visitorInfo = {
          ip_address: ip,
          country: geoUserInfo?.country || "Not-Found",
          country_code: geoUserInfo?.countryCode || "Not-Found",
          state: geoUserInfo?.regionName || "Not-Found",
          city: geoUserInfo?.city || "Not-Found",
          isp: geoUserInfo?.org || "Not-Found",
          user_agent: navigator?.userAgent || "Not-Found",
        };

        await postVisitor(visitorInfo);
        process.env.REACT_APP_ENABLED_DISCORD_WEBHOOK === "true" &&
          geoUserInfo &&
          (await sendDataToDiscord({
            data: {
              ...geoUserInfo,
              visitors: fetchUser?.length || 0,
              user_agent: navigator.userAgent,
              server: process.env.NODE_ENV || "not-found",
            },
            color: "12533951",
            title: `🏴‍☠️ Ahoy! A Pirate Has Docked at Arafat House`,
            webhookUrl: webhookUrl,
          }));
      } catch (err) {
        if (err) {
          console.error("Error Occurred: ", err);
        } else if (error) {
          console.error("Error Occurred: ", err);
        }
      }
    } else if (!geoUserInfo && ip) {
      try {
        const ipData = {
          ip_address: ip,
          country: "Not-Found",
          country_code: "Not-Found",
          state: "Not-Found",
          city: "Not-Found",
          isp: "Not-Found",
          user_agent: navigator?.userAgent || "Not-Found",
        };

        await postVisitor(ipData);

        if (process.env.REACT_APP_ENABLED_DISCORD_WEBHOOK === "true" && ip) {
          await sendDataToDiscord({
            data: {
              ip_address: ip,
              visitors: fetchUser?.length || 0,
              user_agent: navigator.userAgent,
              server: process.env.NODE_ENV || "not-found",
            },
            color: "139",
            title: `🏴‍☠️ Ahoy! A Pirate Has Docked at Arafat House`,
            webhookUrl: webhookUrl,
          });
        }
      } catch (error) {
        console.error("Error occurred: ", error);
      }
    }
  };

  useEffect(() => {
    sendVisitors();
  }, [ip, geoUserInfo]);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {["home", "about", "work", "skills", "testimonials", "contact"].map(
          (item) => (
            <li className="app__flex p-text" key={`link-${item}`}>
              <div />
              <a href={`#${item}`}>{item}</a>
            </li>
          )
        )}
      </ul>
      <div className="app__navbar-counter">
        <div className="app__navbar-counter--section">
          <img
            src="https://res.cloudinary.com/cocoder/image/upload/v1726952265/eye-svgrepo-com_jo0cju.svg"
            alt="preview-icon"
            style={{ width: "25px", height: "25px", marginRight: "5px" }}
          />
          <p style={{ fontWeight: 500, fontSize: "1rem" }}>
            {" "}
            {fetchUser?.length}
          </p>
        </div>
      </div>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {[
                "home",
                "about",
                "work",
                "skills",
                "testimonials",
                "contact",
                `visitors count: ${fetchUser?.length}`,
              ].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
