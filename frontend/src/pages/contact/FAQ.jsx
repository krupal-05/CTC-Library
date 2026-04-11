import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const faqs = [
  {
    question: "How can I borrow books from the library?",
    answer:
      "You can browse books on our platform and click on the 'Borrow' button. Make sure you are logged in to complete the process.",
  },
  {
    question: "What is the return period for borrowed books?",
    answer:
      "The standard return period is 14 days. Late returns may result in a small fine.",
  },
  {
    question: "Can I renew a borrowed book?",
    answer:
      "Yes, you can renew a book once before the due date if no one else has requested it.",
  },
  {
    question: "Do I need an account to access the library?",
    answer:
      "Yes, you must create an account to borrow, reserve, or manage books.",
  },
  {
    question: "Is there any late fee?",
    answer:
      "Yes, a minimal late fee is charged per day after the due date.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[60vh]">
      <h1 className="text-4xl lg:text-4xl font-black text-primary uppercase tracking-widest mb-10 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>

                {/* Animated Icon */}
                <span
                  className={`text-xl transform transition-transform duration-300  ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                 <IoMdArrowDropdown />
                </span>
              </button>

              {/* Answer with animation */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;