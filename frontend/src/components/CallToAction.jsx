import React from 'react';

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row border-2 border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center overflow-hidden shadow-lg">
      {/* Text section */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Want to learn about JavaScript?
        </h2>
        <p className="text-gray-500 mb-4 sm:mb-6">
          Check out these resources with 100 JavaScript projects
        </p>
        <a
          href="https://www.100jsprojects.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 bg-green-500 text-white font-semibold rounded-tl-xl rounded-br-xl hover:bg-green-600 transition"
        >
          100 JavaScript Projects
        </a>
      </div>

      {/* Image section */}
      <div className="flex-1 p-6 sm:p-10 flex justify-center items-center">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZu_D-S7jnaNGb22fL6rMjkY4X1QfkhBpZ0uXQcgB6JIMc4HLfCc6STOEGGKuesTD-uu1vcc2DA73kBO6YeKMt03ZnsAwEmLv-C1DgGNLssNQ-KQDHVC52TaSbzENcFjh_TeaA96c-9V0C/s1600/image.png"
          alt="JavaScript Projects"
          className="w-full max-w-xs sm:max-w-md rounded-lg object-contain"
        />
      </div>
    </div>
  );
};

export default CallToAction;
