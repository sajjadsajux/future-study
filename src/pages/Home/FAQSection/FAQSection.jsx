import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: 'Click the "Sign Up" button at the top right and fill out the registration form with your details.',
    },
    {
      question: "What kind of scholarships can I find here?",
      answer: "We offer a wide variety of scholarships including full, partial, self-funded, and fully funded options from universities around the world.",
    },
    {
      question: "Is there a fee to apply for scholarships?",
      answer: "Browsing and viewing scholarships is free. However, some universities may require a small application fee. We’ll notify you when payment is needed before you apply.",
    },
    {
      question: "Can I track the status of my application?",
      answer: "Yes! Simply go to your dashboard and check the 'My Applications' section to see the current status of your submissions.",
    },
    {
      question: "Can I edit my application after submission?",
      answer: "Yes, if your application is still in pending status. Go to 'My Applications' and click the edit icon. Once it moves to processing, further edits are locked.",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto ">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <p className="text-center text-gray-500 max-w-3xl mx-auto mb-10">Here you’ll find answers to the most common questions about our platform, scholarships, and application process.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-primary dark:bg-white/5 border border-base-300 rounded-lg">
              <input type="radio" name="faq-accordion" checked={openIndex === index} onChange={() => setOpenIndex(index)} />
              <div className="collapse-title text-lg font-semibold flex justify-between items-center text-white">
                {faq.question}
                <span className="ml-2 text-gray-500">{openIndex === index ? <FaChevronUp /> : <FaChevronDown />}</span>
              </div>
              <div className="collapse-content text-sm text-gray-300">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
