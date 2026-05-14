# 🛒 Keells Super - Cinematic 3D E-commerce Experience

[![Owner](https://img.shields.io/badge/Owner-WICKxDEV-green?style=for-the-badge&logo=github)](https://github.com/WICKxDEV)

A world-class, cinematic 3D immersive supermarket platform designed for **Keells Sri Lanka**. This application blends hyper-realistic grocery visuals with a high-end digital luxury feel, providing a futuristic shopping experience.

---

## ✨ Key Features

### 🧊 3D Virtual Hub
Step into a futuristic virtual storefront. Interact with 3D product representations, explore categories in a spatial environment, and experience grocery shopping in a new dimension using **Three.js** and **React Three Fiber**.

### 🤖 AI Shopping Assistant
An intelligent, context-aware AI assistant powered by **Google Gemini**. Get recipe suggestions, product information, and personalized shopping advice in real-time.

### 🌓 Bi-Lingual Support
Full support for **English** and **Sinhala**, ensuring inclusivity for all Sri Lankan users. Switch languages seamlessly across the entire interface.

### ⚡ Cinematic UI/UX
- **Smooth Animations:** Powered by **Framer Motion** and **GSAP** for a fluid, high-end feel.
- **Micro-interactions:** Delightful hover states, staggered list entrances, and elegant transitions.
- **Premium Design:** A "Swiss Design" inspired interface with bold typography and intentional spacing.

---

## 🛠️ Technical Stack

- **Frontend:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS (Modern v4 utility-first styling)
- **Animation:** Motion (Framer Motion), GSAP
- **3D Engine:** Three.js, React Three Fiber, R3F Drei
- **Backend/DB:** Firebase (Firestore, Auth)
- **AI Integration:** Google Generative AI (Gemini Flash)
- **State Management:** Zustand
- **Internationalization:** i18next

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WICKxDEV/keells-super.git
   cd keells-super
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file and add your credentials:
   ```env
   GEMINI_API_KEY=your_gemini_key
   # Firebase config is managed via firebase-applet-config.json
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture

- `src/components`: Reusable UI components (Hero, Navbar, Cart, etc.)
- `src/components/hub`: 3D Virtual Experience logic
- `src/components/ai`: Gemini AI Assistant integration
- `src/pages`: Application views (Home, Shop, Loyalty)
- `src/lib`: Core utilities, Firebase config, and state stores
- `server.ts`: Express backend handling API requests and serving the app

---

## 📜 Documentation

Detailed documentation for specific modules:
- [Security Specifications](./security_spec.md)
- [Firestore Rules](./firestore.rules)
- [Cloud Configuration](./firebase-applet-config.json)

---

## 👤 Owner & Credits

This project was envisioned and developed by **Isuru Wickramasinghe**.

- **GitHub:** [WICKxDEV](https://github.com/WICKxDEV)
- **Platform:** Developed using **Google AI Studio Build**

---

© 2026 Developed by [WICKxDEV](https://github.com/WICKxDEV). All Rights Reserved.
