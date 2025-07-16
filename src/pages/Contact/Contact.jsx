import React, { useState } from "react";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

const Contact = () => {
  useTitle("Contact || FutureStudy");
  useScrollToTop();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate with your backend or email service
    setStatus("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
        Have questions or need assistance? We'd love to hear from you. Please fill out the form below, or email us directly at{" "}
        <a href="mailto:support@yourdomain.com" className="text-blue-600 underline">
          support@yourdomain.com
        </a>
        .
      </p>

      <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="input input-bordered w-full" placeholder="Your full name" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="input input-bordered w-full" placeholder="your.email@example.com" />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Write your message here..." />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>

          {status && <p className="mt-4 text-green-600 font-medium">{status}</p>}
        </form>

        {/* Contact Info */}
        <div className="flex-1  space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Address</h2>
            <p>
              123 Education Lane
              <br />
              Scholarship City, ED 45678
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Phone</h2>
            <p>+1 (555) 123-4567</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Email</h2>
            <p>
              <a href="mailto:support@yourdomain.com" className="text-blue-600 underline">
                support@yourdomain.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
            <div className="flex gap-4 text-3xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-blue-600">
                {/* Facebook Icon */}
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                  <path d="M22 12a10 10 0 10-11.54 9.87v-6.98h-3v-2.89h3v-2.21c0-2.97 1.79-4.61 4.52-4.61 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.89v2.54h3.32l-.53 2.89h-2.79v6.98A10 10 0 0022 12z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-blue-400">
                {/* Twitter Icon */}
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.39 3H17.7L12.53 9.43 7.7 3H2L10.32 14.12 2.63 21H5.32L10.87 14.97 16.02 21H21.7L13.07 9.27 20.39 3Z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-blue-700">
                {/* LinkedIn Icon */}
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                  <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-9.75 14v-7h-2.5v7h2.5zm-1.25-8a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88zm9 8v-4a2 2 0 00-1.98-2h-.02a2 2 0 00-2 2v4h2.5v-4a.5.5 0 01.5-.5h.02a.5.5 0 01.5.5v4h2.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
