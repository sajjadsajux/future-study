import React, { useState } from "react";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import ContactIllustration from "../../assets/ContactIllustration.svg"; // your Storyset illustration
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  useTitle("Contact || FutureStudy");
  useScrollToTop();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title & Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            Have questions or need assistance? We'd love to hear from you. Fill out the form below, or email us directly at{" "}
            <a href="mailto:support@futurestudy.com" className="text-blue-600 underline">
              support@futurestudy.com
            </a>
            .
          </p>
        </div>

        {/* Form + Illustration */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex-1  p-8 rounded-xl shadow-lg space-y-6 dark:border-white dark:border">
            <input name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
            <input name="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} className="input input-bordered w-full" required />
            <textarea name="message" rows="5" placeholder="Write your message here..." value={formData.message} onChange={handleChange} className="textarea textarea-bordered w-full" required />
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
            {status && <p className="text-green-600 font-medium mt-2">{status}</p>}
          </form>

          {/* Illustration */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img src={ContactIllustration} alt="Contact Illustration" className="w-full max-w-md" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>
              123 Education Lane
              <br />
              Dhaka, Bangladesh
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>+8801820646469</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>
              <a href="mailto:support@futurestudy.com" className="text-blue-600 underline">
                support@futurestudy.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition">
                <FaXTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
