"use client";

import { UK_CONTACT, UK_CONTACT_MAP } from "@/constants/company";
import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  Compass,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

const enquiryTopics = [
  "Course and eligibility advice",
  "Upcoming start dates and fees",
  "Learning formats and career support",
];

export const LandingCampuses: React.FC = () => {
  return (
    <section id="campuses-section" className="py-16 sm:py-24 bg-white relative">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>UK Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Find Us in Brentford
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Speak to our team about training options and availability. Contact us before planning a visit.
          </p>
        </div>

        {/* UK admissions card */}
        <div className="mx-auto max-w-xl">
          <div
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-orange/40"
          >
            <div>
              {/* Badge */}
              <div className="mb-4">
                <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
                  UK Admissions
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-brand-navy">
                {UK_CONTACT.location}
              </h3>

              <div className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[50px]">
                {UK_CONTACT.address}
              </div>

              {/* Contact numbers */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                  <a
                    href={UK_CONTACT.phoneHref}
                    className="hover:text-brand-orange transition-colors font-bold"
                  >
                    {UK_CONTACT.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{UK_CONTACT.hours}</span>
                </div>
              </div>

              {/* Campus Features */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Ask Us About
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {enquiryTopics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={UK_CONTACT_MAP.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                <Compass className="w-3.5 h-3.5 text-brand-orange" />
                <span>Get Directions (Google Maps)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCampuses;

