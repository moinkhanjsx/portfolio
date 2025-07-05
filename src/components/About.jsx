import React from "react";
import Loader from "./Loader";

const About = () => (
  <section id="about" className="py-20 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
    <div className="flex-1 flex flex-col justify-center min-w-0">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        I am a passionate developer eager to build beautiful and functional web experiences. Welcome to my portfolio!
      </p>
    </div>
    <div className="flex-1 flex justify-center items-center min-w-0">
      <div className="w-full flex justify-center items-center">
        <Loader />
      </div>
    </div>
  </section>
);

export default About;
