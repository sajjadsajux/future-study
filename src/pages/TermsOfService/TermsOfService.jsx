import React from "react";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

const TermsOfService = () => {
  useTitle("Terms Of Service");
  useScrollToTop();
  return (
    <div className="max-w-7xl mx-auto py-10 min-h-screen px-4 lg:px-0">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg max-w-3xl mx-auto "> At FutureStudy, our goal is to empower students by making scholarships easier to find, understand, and apply for — ensuring education is within reach for all.</p>
      </div>
      <p className="text-lg leading-relaxed mb-4">By accessing or using our platform ("FutureStudy"), you agree to be bound by the following terms and conditions. Please read them carefully. If you do not agree with any part of these terms, you may not use our services.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of the Platform</h2>
      <p className="text-lg leading-relaxed mb-4">
        You agree to use FutureStudy for lawful purposes only. You must not misuse our services or attempt to interfere with the normal operation of the platform. This includes uploading harmful content, accessing other users’ accounts without permission, or using the site for fraudulent activities.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. User Accounts</h2>
      <p className="text-lg leading-relaxed mb-4">You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate and updated information when registering and using the platform.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Privacy and Data</h2>
      <p className="text-lg leading-relaxed mb-4">
        We respect your privacy. All personal data is handled according to our{" "}
        <a href="/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </a>
        . You agree not to misuse, collect, or share other users' information without consent.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
      <p className="text-lg leading-relaxed mb-4">All content on FutureStudy—including logos, designs, and text—is owned by us or our partners. You may not copy, modify, or distribute our content without written permission.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Termination</h2>
      <p className="text-lg leading-relaxed mb-4">We reserve the right to suspend or terminate your access to the platform if you violate these terms or act in a way that harms the platform or its users.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="text-lg leading-relaxed mb-4">We may update these terms from time to time. You will be notified of significant changes. Continued use of FutureStudy means you agree to the updated terms.</p>

      <p className="text-lg leading-relaxed mt-8">
        If you have questions regarding these Terms of Service, please{" "}
        <a href="/contact" className="text-blue-600 underline">
          Contact us
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfService;
