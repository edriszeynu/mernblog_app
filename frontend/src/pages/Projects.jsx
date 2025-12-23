import React from "react";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-4 py-12 md:py-20">
      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-teal-600">
        Projects
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-center text-gray-700 mb-8 leading-relaxed text-lg md:text-xl">
        Building fun and engaging projects while learning HTML, CSS, and
        JavaScript. These projects are designed to improve skills and explore
        creativity in web development.
      </p>

      {/* Call To Action Component */}
      <div className="w-full max-w-md">
        <CallToAction />
      </div>
    </div>
  );
};

export default Projects;
