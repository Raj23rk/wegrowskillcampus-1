import type { Metadata } from "next";
import LandingClientView from "@/components/landing/LandingClientView";

export const metadata: Metadata = {
  title: "UK Admissions | IT Courses & Career Support",
  description:
    "Explore six UK courses in web development, digital marketing, data analytics, software testing, workplace English and computer basics. Enquire with our Brentford team.",
  alternates: { canonical: "/landing" },
  openGraph: {
    title: "UK Admissions | WeGrow Skill Campus",
    description: "Learn practical technology skills and ask our UK team about course dates, fees and career support.",
    url: "/landing",
    images: [
      {
        url: "/images/infrastructure/campus-reception.jpg",
        width: 1200,
        height: 630,
        alt: "WeGrow Skill Campus reception in India",
      },
    ],
  },
};

export default function LandingPage() {
  return <LandingClientView />;
}
