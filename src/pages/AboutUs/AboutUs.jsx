import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">We are on a mission to make education accessible for everyone by simplifying the scholarship search and application process.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold mb-3">🎯 Our Mission</h2>
          <p>Our goal is to bridge the gap between students and educational opportunities. By offering a transparent, user-friendly platform, we ensure that students from all backgrounds can find and apply for scholarships without unnecessary hurdles.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">💡 Why We Started</h2>
          <p>Many students miss out on financial aid simply because they are unaware or overwhelmed. We created this platform to simplify the process and empower students to pursue their dreams without financial stress.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">🤝 What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Verified scholarship listings</li>
            <li>Easy and guided application steps</li>
            <li>Real-time application tracking</li>
            <li>Secure and streamlined document submission</li>
            <li>Supportive community and feedback system</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">🌍 Who We Help</h2>
          <p>Whether you're a high school graduate, university student, or looking for postgraduate funding—our platform is built for you. We support learners from diverse regions and educational levels.</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-medium mb-2">Have Questions?</h3>
        <p className="text-gray-600">
          Visit our{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact
          </a>{" "}
          page. We’d love to hear from you.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
