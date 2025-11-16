import React from 'react';
import { Link } from 'react-router-dom';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            MedReminder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Never miss a dose again with smart SMS reminders. Simple, reliable medication tracking for better health.
          </p>
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureCard 
            icon="⏰" 
            title="Smart Reminders"
            description="Daily SMS reminders at your preferred times. Never forget a dose again."
          />
          <FeatureCard 
            icon="💊" 
            title="Easy Tracking"
            description="Keep track of all your medications and dosages in one simple interface."
          />
          <FeatureCard 
            icon="📱" 
            title="Anywhere Access"
            description="Works on any device with instant SMS notifications straight to your phone."
          />
        </div>
      </div>
    </div>
  );
}