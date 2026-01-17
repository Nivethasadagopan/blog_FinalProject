import React from "react";

function About() {
  return (
    <div className="py-14 container mx-auto px-6">

      <h1 className="text-5xl font-bold text-center mb-10">
        About <span className="text-orange-400">Me</span>
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">

        <h2 className="text-3xl font-semibold mb-4">Who Am I?</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          I’m a passionate web developer who loves building clean, modern, and user‑friendly
          applications. I enjoy turning ideas into functional digital experiences using
          technologies like React, Node.js, MongoDB, and Tailwind CSS.
        </p>

        <h2 className="text-3xl font-semibold mb-4">My Journey</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          My development journey started with curiosity and quickly grew into a strong
          commitment to mastering full‑stack development. I’ve completed multiple projects,
          explored different tools, and continuously improved my skills through hands‑on
          practice and real‑world challenges.
        </p>

        <h2 className="text-3xl font-semibold mb-4">What I Do</h2>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed mb-6">
          <li>Build responsive and interactive web applications</li>
          <li>Design clean UI/UX layouts</li>
          <li>Develop full‑stack MERN applications</li>
          <li>Create and manage REST APIs</li>
          <li>Write technical blogs to share knowledge</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4">My Goals</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          I aim to grow as a developer, work on impactful projects, and continue learning
          new technologies. I believe in writing clean code, building meaningful products,
          and constantly improving myself.
        </p>

        <p className="text-center text-lg font-semibold text-orange-500 mt-8">
          Thanks for visiting my portfolio!
        </p>
      </div>
    </div>
  );
}

export default About;
