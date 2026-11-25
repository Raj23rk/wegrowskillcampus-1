# WeGrow Skill Campus UK

UK website for [WeGrow Skill Campus](https://wegrowcampus.co.uk), featuring courses, practical training and career support.

## 🚀 Key Features

- **Hero Canvas**: Engaging dynamic layout with practical stats, brand typography, and responsive CTA pathways.
- **About WeGrow**: Highlighting the practical learning philosophy with interactive feature highlights.
- **Our Ecosystem**: Dedicated overview covering Skill Campus and Corporate Services.
- **How We Make A Difference**: Interactive card showcase of career guidance, mentorship, live project exposure, and corporate readiness.
- **Applied Industry Immersion**: Dedicated dark theme immersion showcase highlighting live capstones and partner connections.
- **Placement Journey**: 5-step milestone roadmap guiding students from foundational training to corporate placement.
- **Centered CTA Banner**: Strategic call to action for students and enterprise hiring partners.
- **Comprehensive Dark Footer**: 5-column brand hub with official logo badge, program pathways, contacts, social media handles, and newsletter subscription.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Design System**: Montserrat & Poppins, Brand Navy (`#0B3B8F`), Brand Orange (`#F7820E`), Body (`#3B4A66` / `#4A5A78`), Soft Light (`#F8FAFD`)

## 💻 Getting Started

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/MrLeopard-Media/weGrow-uk.git

# Navigate to project directory
cd weGrow-uk

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3002](http://localhost:3002) in your browser.

### Production Build
```bash
npm run build
npm start
```

Use `NEXT_PUBLIC_API_BASE_URL` for the enquiry API. Events uses the India site's public catalogue. Keep the ImageKit endpoint aligned with the India site so both deployments display the same photos. If the India catalogue is unavailable, the UK site falls back to configured ImageKit access, then cached events or the bundled archive.

Course fees come from [data/course-fees.json](data/course-fees.json). Each amount is displayed in pounds as entered. A `null` amount shows “Enquire for the fee”.

The e-shop at `/eshop` uses [data/products.json](data/products.json). Each product has an `id`, `name`, formatted `price`, and an `image` path. The ID forms the product URL. Product pages also support a `summary`, a full `description`, and a list of `relatedProductIds` that reference other catalogue entries. Put images in `public/products/` and reference them as `/products/filename` in the JSON. Rebuild after editing the catalogue. The basket at `/eshop/cart` stores product IDs and quantities in browser storage and uses the current catalogue prices for subtotals.

## 📄 License
All rights reserved © 2026 WeGrow Skill Campus.
