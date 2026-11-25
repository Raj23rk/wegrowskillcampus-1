"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Mail,
  Phone,
  User,
  MapPin,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { UK_CONTACT } from "@/constants/company";
import { SITE_METADATA } from "@/constants/seo";
import { COURSES } from "@/constants/courses";
import { submitContactEnquiry } from "@/services/contact/contactService";

interface LandingEnquiryFormProps {
  selectedCourseId?: string;
  onCourseSelect?: (courseId: string) => void;
}

export const LandingEnquiryForm: React.FC<LandingEnquiryFormProps> = ({
  selectedCourseId = "",
  onCourseSelect,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    learningMode: "",
    course: selectedCourseId || COURSES[0].id,
    qualification: "College Student (Final / Pre-Final Year)",
    preferredTiming: "Weekday Regular (Morning/Afternoon)",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Sync prop changes to form state
  useEffect(() => {
    if (selectedCourseId) {
      setFormData((prev) => ({ ...prev, course: selectedCourseId }));
    }
  }, [selectedCourseId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "course" && onCourseSelect) {
      onCourseSelect(value);
    }
  };

  const selectedCourseName =
    COURSES.find((c) => c.id === formData.course)?.title || formData.course;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.fullName.trim() || phoneDigits.length < 10 || phoneDigits.length > 15) {
      setStatus("error");
      setFeedbackMessage("Please enter your full name and a valid phone number.");
      return;
    }

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await submitContactEnquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interestArea: "SkillCampus",
        message: [
          `Source: ${SITE_METADATA.siteUrl}/landing`,
          `Selected course: ${selectedCourseName}`,
          formData.learningMode && `Preferred learning format: ${formData.learningMode}`,
          `Current profile: ${formData.qualification}`,
          `Preferred timing: ${formData.preferredTiming}`,
        ].filter(Boolean).join("\n"),
      });

      if (!response.success) throw new Error(response.message);

      window.fbq?.("track", "Lead");
      setStatus("success");
      setFeedbackMessage("Thank you for your enquiry. Our UK admissions team will be in touch.");
    } catch {
      setStatus("error");
      setFeedbackMessage("We couldn’t submit your enquiry. Please try again or contact us by email.");
    }
  };

  return (
    <section id="enquiry-form-section" className="py-14 sm:py-20 bg-slate-50 relative">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Why Enquire & Trust Points */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast-Track Your Admission</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-navy leading-tight">
              Book a Free Demo Class &amp; 1-on-1 Career Counselling
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Speak with our UK admissions team to choose a course that fits your experience and career goals.
            </p>

            {/* Checklist of what students get */}
            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Free Demo and Course Advice</h4>
                  <p className="text-xs text-slate-500">Ask for a demonstration and see how the practical exercises are taught.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Career and Placement Support</h4>
                  <p className="text-xs text-slate-500">Ask about CV feedback, mock interviews and guidance on preparing for applications.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-slate-200/80 shadow-sm">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">UK Admissions in Brentford</h4>
                  <p className="text-xs text-slate-500">Ask about learning formats, start dates and how to arrange a visit.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-brand-navy p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Contact UK Admissions</p>
              <div className="mt-3 flex flex-col sm:flex-row items-start gap-3">
                <a href={UK_CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-brand-orange" />
                  {UK_CONTACT.phone}
                </a>
                <a href={`mailto:${UK_CONTACT.email}`} className="break-all py-2.5 text-sm font-bold text-white hover:underline">{UK_CONTACT.email}</a>
              </div>
            </div>
          </div>

          {/* Right Column: The Lead Gen Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border-2 border-brand-orange/20 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/60 relative overflow-hidden">
              {/* Highlight badge on top */}
              <div className="absolute top-0 right-0 bg-brand-orange text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                UK Admissions
              </div>

              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-brand-navy">
                  Quick Admission &amp; Course Enquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Tell us which course interests you. Our team can share the syllabus and upcoming dates.
                </p>
              </div>

              {status === "success" ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center animate-fade-in">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Enquiry Submitted Successfully!</h4>
                  <p className="mt-2 text-sm text-emerald-700 max-w-md mx-auto">
                    {feedbackMessage}
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition w-full sm:w-auto"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && <p role="alert" className="text-sm text-rose-700">{feedbackMessage}</p>}
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm font-medium transition"
                      />
                    </div>
                  </div>

                  {/* Field 2 & 3: Phone Number and WhatsApp Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          maxLength={24}
                          autoComplete="tel"
                          placeholder={UK_CONTACT.phonePlaceholder}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm font-medium transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="landing-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <input
                          type="email"
                          id="landing-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm font-medium transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Preferred Learning Format
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {["Online", "In person", "Hybrid"].map((mode) => {
                        const isSelected = formData.learningMode === mode;
                        return (
                          <button
                            type="button"
                            key={mode}
                            aria-pressed={isSelected}
                            onClick={() => setFormData((prev) => ({ ...prev, learningMode: isSelected ? "" : mode }))}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                              isSelected
                                ? "border-brand-orange bg-orange-50/80 text-brand-navy ring-2 ring-brand-orange/40 font-bold"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-medium"
                            }`}
                          >
                            <MapPin
                              className={`w-4 h-4 mb-1 ${
                                isSelected ? "text-brand-orange" : "text-slate-400"
                              }`}
                            />
                            <span className="text-xs sm:text-sm font-bold">{mode}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 5: Which Course (6 Courses) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Which Course Are You Interested In? <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full pl-10 pr-8 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm font-medium transition"
                      >
                        {COURSES.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field 6: Batch Timing & Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Current Profile
                      </label>
                      <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white text-xs sm:text-sm font-medium"
                      >
                        <option value="College Student (Final / Pre-Final Year)">Final or Penultimate Year Student</option>
                        <option value="Recent Graduate (Looking for IT Job)">Recent Graduate</option>
                        <option value="Non-IT / Career Switcher">Non-IT / Career Switcher</option>
                        <option value="Working Professional (Upskilling)">Working Professional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Preferred Batch
                      </label>
                      <select
                        name="preferredTiming"
                        value={formData.preferredTiming}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white text-xs sm:text-sm font-medium"
                      >
                        <option value="Weekday Regular (Morning/Afternoon)">Weekday Regular (Mon-Fri)</option>
                        <option value="Weekend Special (Sat & Sun)">Weekend Special (Working Pros)</option>
                        <option value="Fast-Track Full Day Bootcamp">Fast-Track Intensive Bootcamp</option>
                      </select>
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all active:scale-[0.99] disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{status === "submitting" ? "Submitting Enquiry..." : "Book Free Demo & Counselling"}</span>
                    </button>

                    <a
                      href={`mailto:${UK_CONTACT.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition"
                      title="Email UK admissions"
                    >
                      <Mail className="w-4 h-4 text-emerald-600" />
                      <span>Email Admissions</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    We use your details to respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingEnquiryForm;

