"use client";

import { UK_CONTACT } from "@/constants/company";
import React from "react";
import { Phone, Mail } from "lucide-react";

interface LandingStickyCTAProps {
  onEnquireClick: () => void;
}

export const LandingStickyCTA: React.FC<LandingStickyCTAProps> = ({ onEnquireClick }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2.5 px-4 sm:hidden">
      <div className="flex items-center gap-2">
        {/* Direct Call Button */}
        <a
          href={UK_CONTACT.phoneHref}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-800 shadow-sm"
        >
          <Phone className="w-3.5 h-3.5 text-brand-navy" />
          <span>Call Us</span>
        </a>

        {/* Email Button */}
        <a
          href={`mailto:${UK_CONTACT.email}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Us</span>
        </a>

        {/* Enquire Button */}
        <button
          type="button"
          onClick={onEnquireClick}
          className="flex-[1.4] inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-orange py-2.5 text-xs font-black text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
        >
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
};

export default LandingStickyCTA;

