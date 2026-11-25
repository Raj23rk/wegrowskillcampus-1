"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Globe, Send, CheckCircle2 } from "lucide-react";
import { COURSES } from "@/constants/courses";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import PageHero from "@/components/common/PageHero";
import { UK_CONTACT } from "@/constants/company";
import { SITE_METADATA } from "@/constants/seo";
import { submitContactEnquiry, ContactEnquiryPayload } from "@/services/contact/contactService";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactEnquiryPayload>({
    fullName: "",
    email: "",
    phone: "",
    interestArea: "SkillCampus",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [courseOfInterest, setCourseOfInterest] = useState("");
  const [preferredMode, setPreferredMode] = useState("");
  const isSubmittingRef = useRef(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || status === "submitting") return;
    isSubmittingRef.current = true;
    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const enquiryMessage = [
        formData.message,
        courseOfInterest && `Course of interest: ${courseOfInterest}`,
        preferredMode && `Preferred learning mode: ${preferredMode}`,
        `Source: ${SITE_METADATA.siteUrl}/contact`,
      ].filter(Boolean).join("\n\n");
      const response = await submitContactEnquiry({ ...formData, message: enquiryMessage });
      if (!response.success) throw new Error(response.message);
    } catch {
      setStatus("error");
      setFeedbackMessage("We couldn’t submit your enquiry. Please try again or contact us by email.");
      return;
    } finally {
      isSubmittingRef.current = false;
    }

    window.fbq?.("track", "Lead");
    setStatus("success");
    setFeedbackMessage("Thank you for your enquiry. Our admissions team will be in touch.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      interestArea: "SkillCampus",
      message: "",
    });
    setCourseOfInterest("");
    setPreferredMode("");
  };

  return (
    <div className="pb-16 sm:pb-20 bg-brand-bg">
      <PageHero
        eyebrow="Contact WeGrow"
        title="Let’s Talk About Your Learning Goals"
        description="Have questions about courses, eligibility, duration, fees, or enrolment? Our team can help you understand the available options and what to confirm."
        image="/about-section.png"
        imageAlt="WeGrow Skill Campus building"
        imagePosition="object-center"
      />
      <Container>
        <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Contact Details Column */}
          <div className="space-y-6 lg:col-span-5">
            <div className="relative space-y-5 overflow-hidden rounded-[26px] border border-brand-border bg-white p-6 shadow-card sm:p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange to-amber-300" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold text-brand-navy">Contact Our UK Team</h2>
                <p className="mt-1 text-sm text-brand-textSecondary">Ask about courses, fees and upcoming start dates.</p>
                <div className="mt-4 space-y-3">
                  <a href={UK_CONTACT.phoneHref} className="flex items-center gap-3 rounded-xl bg-orange-50 p-3 font-bold text-brand-navy transition hover:text-brand-orange">
                    <Phone className="h-5 w-5 shrink-0 text-brand-orange" aria-hidden="true" />
                    {UK_CONTACT.phone}
                  </a>
                  <a href={`mailto:${UK_CONTACT.email}`} className="flex items-center gap-3 break-all font-bold text-brand-blue hover:text-brand-orange">
                    <Mail className="h-5 w-5 shrink-0 text-brand-orange" aria-hidden="true" />
                    {UK_CONTACT.email}
                  </a>
                  <p className="flex items-center gap-3 text-sm text-brand-textSecondary">
                    <Clock className="h-5 w-5 shrink-0 text-brand-orange" aria-hidden="true" />
                    {UK_CONTACT.hours}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h2 className="mb-4 text-xl font-bold text-brand-navy">Brentford Address</h2>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-brand-bg/70 p-4 text-sm text-brand-textSecondary">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                  <span>{UK_CONTACT.address}</span>
                </div>
              </div>

              <Link href="/" className="flex items-center gap-3 border-t border-slate-100 pt-5 font-bold text-brand-blue hover:text-brand-orange">
                <Globe className="h-5 w-5 text-brand-orange" aria-hidden="true" />
                {new URL(SITE_METADATA.siteUrl).hostname}
              </Link>
            </div>
          </div>

          {/* Enquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[26px] border border-brand-border bg-white p-6 shadow-card sm:p-9">
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-[26px] bg-gradient-to-r from-brand-orange to-amber-300" aria-hidden="true" />
              <h2 className="mb-2 text-2xl font-extrabold text-brand-navy">Send an Enquiry</h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below and a course adviser will connect with you.
              </p>

              {status === "success" && (
                <div className="mb-6 p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col gap-3 text-emerald-900 text-sm">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="block font-bold text-base text-emerald-900">Enquiry Submitted Successfully!</strong>
                      <span className="text-emerald-800 text-xs sm:text-sm">{feedbackMessage}</span>
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                  <strong className="block font-semibold mb-1">Submission Note:</strong>
                  <span>{feedbackMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={UK_CONTACT.phonePlaceholder}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="courseOfInterest" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Course of Interest</label>
                    <select id="courseOfInterest" value={courseOfInterest} onChange={(event) => setCourseOfInterest(event.target.value)} className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-white">
                      <option value="">Select a course (optional)</option>
                      {COURSES.map((course) => <option key={course.id}>{course.title}</option>)}
                      <option>Other / Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferredMode" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Preferred Learning Mode</label>
                    <select id="preferredMode" value={preferredMode} onChange={(event) => setPreferredMode(event.target.value)} className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-white">
                      <option value="">Select a mode (optional; availability to be confirmed)</option>
                      <option>Online</option>
                      <option>Offline</option>
                      <option>Hybrid</option>
                      <option>Open to available options</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message / Query Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly state your requirements or queries..."
                    className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  />
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  By submitting this form, you acknowledge that your information will be handled according to our <Link href="/privacy-policy" className="text-brand-blue underline">Privacy Policy</Link>.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span>{status === "submitting" ? "Submitting..." : "Submit Enquiry"}</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
