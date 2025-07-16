import React from "react";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

const PrivacyPolicy = () => {
  useTitle("Privacy Policy");
  useScrollToTop();
  return (
    <div className="max-w-7xl mx-auto py-10 min-h-screen px-4 lg:px-0">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg max-w-3xl mx-auto">Your trust matters to us. This privacy policy outlines how we handle your information when you use FutureStudy.</p>
      </div>

      <p className="text-lg leading-relaxed mb-4">We are committed to protecting your personal data. We collect only the information necessary to provide our services — including account creation, scholarship applications, and secure payment processing.</p>

      <p className="text-lg leading-relaxed mb-4">Information we may collect includes your name, email address, academic preferences, and profile image. This data helps personalize your experience and improve our services.</p>

      <p className="text-lg leading-relaxed mb-4">Your data is never sold or shared with third parties for marketing. We may share limited information with trusted providers only for processing payments or fulfilling legal and regulatory requirements.</p>

      <p className="text-lg leading-relaxed mb-4">We implement strong security measures to protect your information, including encryption, access control, and regular system reviews.</p>

      <p className="text-lg leading-relaxed mb-4">By using our platform, you consent to our data practices as outlined in this policy. You have the right to access, update, or delete your data at any time by contacting our support team.</p>

      <p className="text-lg leading-relaxed">We may update this policy occasionally to reflect changes in legal requirements or platform functionality. Continued use of FutureStudy confirms your acceptance of any updates.</p>
    </div>
  );
};

export default PrivacyPolicy;
