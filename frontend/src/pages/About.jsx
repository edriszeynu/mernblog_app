import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="bg-teal-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About This Blog
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Welcome! This blog is dedicated to sharing knowledge, tutorials, and
            insights about programming, web development, and technology.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to provide high-quality content that helps developers
            of all levels improve their skills, stay updated with the latest
            trends, and solve real-world problems efficiently. We believe in
            learning by doing and sharing knowledge freely with the community.
          </p>
        </section>

        {/* Author Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src="https://via.placeholder.com/150"
            alt="Author"
            className="rounded-full w-40 h-40 object-cover shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Endris Zeynu</h3>
            <p className="text-gray-700 mb-2">
              Hi! I'm Endris, a software engineer and tech enthusiast. I love
              writing about programming, web development, and best practices in
              software design.
            </p>
            <p className="text-gray-600 italic">
              “Sharing knowledge is the fastest way to grow.”
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 py-6 mt-12 text-center">
        &copy; {new Date().getFullYear()} My Blog. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
