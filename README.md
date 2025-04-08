# MMU Innovation Week 2025 Website

[![Live Demo](![WhatsApp Image 2025-04-08 at 10 37 58_3ffae72f](https://github.com/user-attachments/assets/13ba2dbb-bded-4fb3-964e-b4eaaa5bea00)
)](https://innovation-week-production.up.railway.app/)

A modern, responsive website for Multimedia University of Kenya's Innovation Week 2025, built with React, Material UI, and enhanced with animations using Framer Motion.

![MMU Innovation Week 2025](https://innovation-week-production.up.railway.app/images/hero.jpg)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Event Details](#event-details)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

This website serves as the official platform for Multimedia University of Kenya's Innovation Week 2025, an annual event bringing together students, faculty, industry leaders, and innovators to showcase and celebrate technological innovation. The event is scheduled for April 14-17, 2025, with the theme "Empowering Change Through Technology and Innovation."

## ✨ Features

- **Modern & Responsive Design**: Fully responsive UI that works on all devices
- **Animated Components**: Smooth animations using Framer Motion
- **Interactive Elements**: Dynamic countdown timer, smooth scrolling navigation
- **Detailed Program Agenda**: Complete schedule breakdown by day and time slot
- **Speaker Profiles**: Information about featured speakers (to be announced)
- **Registration Portal**: Seamless registration process for attendees
- **Project Submission**: Information for submitting projects and papers
- **Team Showcase**: Profiles of the organizing team members
- **Partner Organizations**: Showcasing supporting institutions and companies

## 🛠️ Tech Stack

- **React**: Frontend library for building user interfaces
- **Material UI**: Component library for React
- **Framer Motion**: Animation library for React
- **React Scroll**: Smooth scrolling between sections
- **AOS**: Animation on scroll library
- **Particles.js**: Background particle animations
- **CountUp**: Animated countup numbers
- **Railway**: Deployment platform

## 📁 Project Structure

```
mmu-innovation-week/
├── public/                  # Public assets, images, and icons
│   ├── assets/              # Static assets
│   ├── images/              # Image files for the website
│   └── index.html           # Main HTML file
│
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── commons/         # Common UI components
│   │   │   ├── AnimatedCard.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── SectionTitle.jsx
│   │   ├── Agenda.jsx       # Event schedule component
│   │   ├── CallForProjects.jsx # Project submission section
│   │   ├── Countdown.jsx    # Countdown timer component
│   │   ├── Footer.jsx       # Website footer
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Hero.jsx         # Hero/banner section
│   │   ├── Partners.jsx     # Partners showcase
│   │   ├── Registration.jsx # Registration section
│   │   ├── Speakers.jsx     # Speakers showcase
│   │   └── Team.jsx         # Team members section
│   │
│   ├── utils/               # Utility functions and constants
│   │   └── constants.js     # Application constants and data
│   │
│   ├── themes/              # Theme configuration
│   │   └── theme.js         # MUI theme customization
│   │
│   ├── App.css              # Main CSS file
│   ├── App.js               # Main application component
│   ├── index.css            # Global CSS
│   ├── index.js             # Application entry point
│   └── styles.css           # Additional CSS styles
│
├── .gitignore               # Git ignore file
├── package.json             # NPM package configuration
├── README.md                # Project documentation
└── yarn.lock                # Yarn lock file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/mmu-innovation-week.git
cd mmu-innovation-week
```

2. Install dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install
```

### Running the Project

Start the development server:
```bash
# Using npm
npm start

# Using yarn
yarn start
```

The website will be available at `http://localhost:3000`.

## 🌐 Deployment

This project is deployed on Railway. To deploy your own version:

1. Create an account on [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Set up a new project and select the repository
4. Configure build settings:
   - Build command: `npm run build` or `yarn build`
   - Start command: `npm start` or `yarn start`
5. Deploy the application

## 📅 Event Details

### 🗓️ Dates
April 14-17, 2025

### 📍 Location
Multimedia University of Kenya, Magadi Road

### 🎯 Theme
"Empowering Change Through Technology and Innovation"

### 📋 Program Highlights

- **Day 1 (April 14, 2025)**
  - Opening webinar on innovation and technology

- **Day 2 (April 15, 2025)**
  - Opening ceremony
  - Live debates
  - Track sessions
  - Industrial site visits

- **Day 3 (April 16, 2025)**
  - Panel discussions
  - Track sessions
  - Industrial site visits

- **Day 4 (April 17, 2025)**
  - Paper presentations
  - Project showcase
  - Panel discussions
  - Awards ceremony

### 📝 Registration
Free for all Multimedia University students and faculty.
External participants can register through the registration portal.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contact Information

For any inquiries about the event or website, please contact:
- Email: innovationweek@mmu.ac.ke
- Phone: +254 123 456 789

Made with ❤️ for Multimedia University of Kenya Innovation Week 2025
