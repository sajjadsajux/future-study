import { useState } from "react";
import NewsletterImg from "../../../assets/NewsletterImg.svg"; // your Storyset illustration
import { toast, Zoom } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    toast.success(`Subcribe Successfully`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
    setEmail("");
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10"> Join Our Scholarship Community</h2>
      <p className="text-center text-gray-500 max-w-7xl mx-auto mb-10"> Subscribe to get the latest scholarships, study tips, and platform updates delivered directly to your inbox. </p>

      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        {/* Left: Text + Form */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Scholarships</h2>
          <p className=" mb-6 max-w-md"> Be the first to know about new scholarships, application deadlines, and valuable study tips—delivered straight to your inbox. Don’t miss your chance to stay ahead!</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full sm:flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" />
            <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>

          <p className="text-sm  mt-3">No spam, only useful scholarship updates.</p>
        </div>

        {/* Right: Illustration */}
        <div className="flex justify-center md:justify-end">
          <img src={NewsletterImg} alt="Newsletter Illustration" className="w-full max-w-sm" />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
