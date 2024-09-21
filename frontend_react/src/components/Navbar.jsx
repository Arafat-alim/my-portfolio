import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { images } from "../constants";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { getVisitors, postVisitor } from "../db";
import useJSONP from "use-jsonp";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [visitorData, setVisitorData] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [fetchVisitedUsers, setFetchVisitedUsers] = useState([]);

  const sendJsonP = useJSONP({
    url: `https://ipinfo.io/json?token=${process.env.REACT_APP_API_INFO_TOKEN}`,
    id: "ipinfoScript",
    callback: (data) => {
      if (data && !data.error) {
        setVisitorData(data);
      }
    },
    callbackParam: "callback",
  });

  const fetchIp = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      setIpAddress(data.ip);
      return data.ip; // Return IP address for further use
    } catch (err) {
      console.error("Error fetching IP:", err);
    } finally {
      // Ensure getVisitors is called regardless of success or error
      const result = await getVisitors(); // Call getVisitors after sendVisitors
      setFetchVisitedUsers(result);
    }
  };

  const sendVisitors = async () => {
    if (!visitorData && !ipAddress) {
      return; // Ensure both data are available
    }

    const visitorInfo = {
      ip_address: ipAddress,
      country: visitorData?.country || "Not-Found",
      country_code: visitorData?.country || "Not-Found",
      state: visitorData?.region || "Not-Found",
      city: visitorData?.city || "Not-Found",
      isp: visitorData?.org || "Not-Found",
      user_agent: navigator?.userAgent || "Not-Found",
    };

    try {
      // await postVisitor(visitorInfo);
    } catch (error) {
      console.error("Error Occurred: ", error);
    } finally {
      // Ensure getVisitors is called regardless of success or error
      const result = await getVisitors(); // Call getVisitors after sendVisitors
      setFetchVisitedUsers(result);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchIp(); // Fetch IP first
      sendJsonP(); // Then fetch visitor data
    };

    fetchData();
  }, []); // Only run once on mount

  useEffect(() => {
    if (visitorData || ipAddress) {
      sendVisitors(); // Call sendVisitors when visitorData is available
    }
  }, [visitorData, ipAddress]); // Trigger when visitorData or ipAddress changes

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {["home", "about", "work", "testimonials", "skills", "contact"].map(
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
            {fetchVisitedUsers.length}
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
                "testimonials",
                "skills",
                "contact",
                `visitors count: ${fetchVisitedUsers.length}`,
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
