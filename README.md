# 🩺 Clinical Code Explorer

A fast, responsive diagnostic code explorer and verification tool built with React. It interfaces directly with the National Institutes of Health / National Library of Medicine (NLM) Clinical Tables API to deliver real-time ICD-10-CM code lookups, chapter classifications, and billability status indicators for medical coders, billers, and health informatics teams.

🔗 **Live Demo:** [https://clinical-code-explorer.vercel.app](https://clinical-code-explorer.vercel.app) *

---

## 📸 Overview

Clinical documentation specialists and medical coders routinely cross-reference patient diagnoses against tabular ICD-10-CM rules. This application provides a lightweight, frictionless search interface to quickly find terminal codes, check chapter grouping, and grab clean codes for clinical claim engines.

### ✨ Key Features

- **Live Debounced Search:** Powered by a custom `useDebounce` hook (350ms delay) that queries the NLM API automatically as the user types, eliminating unnecessary button clicks.
- **Race Condition & Network Safeguards:** Integrated `AbortController` cleanup logic inside `useEffect` to cleanly cancel stale inflight network requests during rapid typing.
- **Skeleton Loading State:** Custom animated shimmer placeholder cards match the exact dimensions of diagnostic items, eliminating layout shift (CLS) while waiting for API responses.
- **Single-Click Copy to Clipboard:** Integrated `navigator.clipboard` functionality with isolated 2-second visual feedback (`✓ Copied`) on individual code pills.
- **Clinical Hierarchy & Specificity Badging:**
  - Dynamic derivation of official ICD-10-CM chapters from alphanumeric code prefixes.
  - Clear visual badging to distinguish terminal billable codes from non-billable chapter headers.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** React 18 / 19
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Grid, Flexbox, Keyframe Animations)
- **Data Source:** [NLM Clinical Tables API (ICD-10-CM v3)](https://clinicaltables.nlm.nih.gov/apidoc/icd10cm/v3/doc.html)
- **Deployment:** Vercel

### 📂 Directory Structure

```text
clinical-code-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── IcdResultItem.jsx      # Result card with copy action & billability badges
│   │   ├── IcdResultsList.jsx     # Container handling empty, error, & skeleton states
│   │   ├── IcdResultSkeleton.jsx  # Shimmer placeholder UI
│   │   └── IcdSearchForm.jsx      # Controlled search bar with clear button
│   ├── hooks/
│   │   └── useDebounce.js         # Custom debounce hook for rate-limiting queries
│   ├── App.jsx                    # Core data transformation, fetch orchestration, & state
│   ├── App.css                    # Responsive styles & shimmer animations
│   └── main.jsx                   # Entry point
├── package.json
└── README.md

🚀 Getting Started
Prerequisites
Node.js (version 18 or higher recommended)

npm or yarn

Installation
Clone the repository:

Bash
git clone [https://github.com/](https://github.com/)<your-username>/clinical-code-explorer.git
cd clinical-code-explorer
Install project dependencies:

Bash
npm install
Launch the development server:

Bash
npm run dev
Open your browser and navigate to http://localhost:5173.

Production Build
To test the production build locally:

Bash
npm run build
npm run preview
📜 API Reference & Data Transformation
This application queries the public, unauthenticated NLM Clinical Tables endpoint:

Plaintext
GET [https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=](https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=){QUERY}&maxList=25
The raw array response (data[3]) is transformed on the client into structured diagnostic objects:

JavaScript
{
  code: "S82.101A",
  description: "Fracture of unspecified upper end of right tibia, initial encounter for closed fracture",
  category: "Injury & Poisoning",
  billable: true
}
📄 License
This project is open source and available under the MIT License.


---
