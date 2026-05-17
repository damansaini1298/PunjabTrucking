# 🚛 Punjab Trucking — Next-Gen Logistics Platform

A ultra-premium, modern, and high-performance logistics command center web application designed for **Punjab Trucking**. Built with **React**, **Vite**, and styled with custom studio-grade styling for a luxury, dark-mode terminal aesthetic. It incorporates advanced micro-interactions, smooth scrolling, and responsive layouts.

---

## ✨ Features

- **📺 Interactive Command Center**: A dark-mode ledger grid layout for multiple operational departments (Dispatch, General Inquiries, Billing).
- **🌊 Ultra-Smooth Parallax Scrolling**: Powered by **Lenis Smooth Scroll** and **Framer Motion** for a luxurious, fluid user experience.
- **📄 Interactive Recruitment Portal**: High-fidelity driver application form with live telephone number formatting, input validations, and anti-spam protection.
- **🔒 Secure & Private Local Submissions**: All forms simulate secure data transmission locally using simulated network loading states. No trackers, external endpoints, or third-party API exposure.
- **🎨 Elite Dark-Glassmorphism UI**: Harmonious grey-to-black gradient palettes, monospace command overlays, glowing indicators, and minimalist typography.
- **🍪 Cookie Consent Ledger**: Modular, premium privacy banner aligned with modern web standards.
- **📱 Responsive Layout**: Pixel-perfect responsive designs tailored for both high-resolution desktop terminals and mobile viewports.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Tailored HSL theme variables & premium transitions)

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have **Node.js** installed on your system:
- Recommended Node.js version: **v20.12.2+** or **v22.x**

### ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/punjab-trucking.git
   cd punjab-trucking
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *The server will run on [http://localhost:5173/](http://localhost:5173/)*

4. **Build the production application bundle:**
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture

```text
punjab-trucking/
├── public/                 # Static high-fidelity assets & drone photography
├── src/
│   ├── assets/             # Brand logos & visuals
│   ├── components/         # Reusable premium UI components
│   │   ├── About.jsx       # Vision & operational overview
│   │   ├── ContactModal.jsx# Simulated secure contact form
│   │   ├── Footer.jsx      # Bottom branding & dynamic links
│   │   └── Navbar.jsx      # Floating modern glass header
│   ├── context/            # Shared modal context providers
│   ├── pages/              # Structural pages (HomePage, DriversPage, ContactPage)
│   ├── App.jsx             # Main router & Lenis initialization
│   ├── index.css           # Global typography & dark style system
│   └── main.jsx            # Application entrypoint
├── package.json            # Project dependencies & scripts
└── vite.config.js          # Vite optimization & plugin config
```

---

## 🛡️ License

This project is proprietary and built exclusively for **Punjab Trucking**. All rights reserved.
