"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const LandingFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who can enrol?",
      a: "We welcome students, graduates and working professionals, including people considering a career change. Ask our UK team about entry requirements and whether your chosen course suits beginners.",
    },
    {
      q: "What career support is available?",
      a: "Our team can help you prepare a CV, practise interviews and show your project work. Ask what support is available with the course you are considering.",
    },
    {
      q: "Can I study online or in person?",
      a: "Learning formats depend on the course and start date. Contact UK admissions to check whether online, in-person or hybrid study is available.",
    },
    {
      q: "Do I need my own laptop?",
      a: "Ask about equipment and software requirements before enrolling. These vary by course and learning format.",
    },
    {
      q: "Where can I find course fees and payment information?",
      a: "Published fees are shown in pounds on the course cards. Ask our UK team about fees marked for enquiry, payment options and any additional costs.",
    },
    {
      q: "Will I receive a certificate or build a portfolio?",
      a: "Ask which projects are included, whether a certificate is available and what you need to complete to earn it.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-orange" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Everything you need to know about admissions, course duration, and career placements.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-brand-navy transition-colors"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-orange" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingFAQ;

