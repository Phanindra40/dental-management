import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./assets/logo.png";

const features = [
  { title: "Smart Scheduling", description: "Easily manage appointments with automated calendar syncing." },
  { title: "Patient Records", description: "Secure, quick access to patient history and files." },
  { title: "Team Collaboration", description: "Coordinate staff across multiple clinics in real-time." },
  { title: "Billing & Invoicing", description: "Generate invoices and manage payments effortlessly." },
  { title: "Reminder Alerts", description: "Automatic SMS/email reminders for upcoming appointments." },
  { title: "Analytics Dashboard", description: "Visualize performance, appointments, and clinic stats." },
];

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

      {/* Header */}
      <header className="flex items-center px-4 sm:px-6 h-20 sm:h-24 bg-white shadow-md">
        <img src={Logo} alt="SmileSync Logo" className="h-full max-h-16 sm:max-h-24 w-auto" />
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 text-center bg-gradient-to-br from-blue-100 to-blue-50">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-6">
          Simplify Your Dental Practice
        </h2>
        <p className="text-base sm:text-lg text-blue-700 max-w-xl mx-auto mb-8">
          SmileSync empowers dentists and clinics with efficient tools for managing patients, appointments, billing, and staff collaboration—all in one place.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 shadow-lg transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-10">
          Key Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 hover:scale-105 duration-300"
            >
              <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs sm:text-sm text-gray-500 bg-gray-100 border-t border-gray-200">
        © {new Date().getFullYear()} <span className="font-medium text-blue-700">SmileSync</span> | Part of ENT NT. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
