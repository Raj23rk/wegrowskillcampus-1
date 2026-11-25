export const UK_CONTACT = {
  email: "enquiry@wegrowcampus.co.uk",
  phone: "+44 7414 106521",
  phoneHref: "tel:+447414106521",
  phonePlaceholder: "+44 7XXX XXXXXX",
  location: "Brentford",
  address: "981 Great West Road, Suite 140, Brentford TW8 9DN, United Kingdom",
  hours: "Monday to Saturday, 9 am to 7 pm (UK time). Closed on Sundays.",
};

const mapQuery = encodeURIComponent(UK_CONTACT.address);
export const UK_CONTACT_MAP = {
  href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  embed: `https://maps.google.com/maps?q=${mapQuery}&output=embed`,
};

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://in.linkedin.com/company/wegrow-skill-campus", ariaLabel: "Visit WeGrow Skill Campus on LinkedIn" },
  { name: "Instagram", href: "https://www.instagram.com/wegrowskillcampus/", ariaLabel: "Visit WeGrow Skill Campus on Instagram" },
  { name: "YouTube", href: "https://www.youtube.com/@wegrowskillcampus", ariaLabel: "Visit WeGrow Skill Campus on YouTube" },
  { name: "Facebook", href: "https://www.facebook.com/wegrowskillcampus", ariaLabel: "Visit WeGrow Skill Campus on Facebook" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Admissions 2026", href: "/landing" },
  { label: "About", href: "/about" },
  { label: "Skill Campus", href: "/skill-campus" },
  { label: "Industry", href: "/industry" },
  { label: "Placements", href: "/placements" },
  { label: "Global Exposure", href: "/global-exposure" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_PROGRAM_LINKS = [
  { label: "Technical Training", href: "/programs#technical" },
  { label: "Business & Leadership", href: "/programs#business" },
  { label: "Industry Projects", href: "/programs#projects" },
  { label: "Career Guidance", href: "/skill-campus#guidance" },
  { label: "Placement Support", href: "/placements#support" },
  { label: "Global Opportunities", href: "/global-exposure#opportunities" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Sitemap", href: "/sitemap.xml" },
];
