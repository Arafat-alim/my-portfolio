import React from "react";
import { Helmet } from "react-helmet";
import { About, Footer, Header, Skills, Testimonials, Work } from "./container";
import { NavBar } from "./components";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dev. Arafat Alim | Full-Stack Developer</title>
        <meta
          name="description"
          content="Arafat Alim is a full-stack web developer specializing in web, software, and analytics solutions. Explore his portfolio and projects."
        />
        <meta
          name="keywords"
          content="Arafat Alim, full-stack developer, MERN stack, web development, backend, frontend, DevOps, software developer"
        />
        <meta
          property="og:title"
          content="Dev. Arafat Alim - Full Stack Developer"
        />
        <meta
          property="og:description"
          content="Arafat Alim, a proficient full-stack developer, specializes in web, software, and analytics solutions. Discover his projects and skills."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/cocoder/image/upload/v1658092214/Personal/Personal/Github_Profile_fori5o.png"
        />{" "}
        {/* Update the image URL */}
        <meta property="og:url" content="https://dev-arafat.netlify.app/" />
      </Helmet>
      <NavBar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
