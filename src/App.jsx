import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import AuthModal from './components/AuthModal';
import MortgageCalculator from './components/MortgageCalculator';
import UserDashboard from './components/UserDashboard';
import PropertyDetails from './pages/PropertyDetails';
import SearchResults from './pages/SearchResults';
import Dashboard from './pages/Dashboard'; 
import Profile from './pages/Profile';
import { useAuthContext } from './context/AuthContext';
import SearchBar from './components/SearchBar';
import { SearchIcon, AiIcon, CalculatorIcon } from './components/Icons';
import ChatbotIcon from './components/ChatbotIcon';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import logo from './assets/images/logo.jpg';
import heroVideo from './assets/images/heroVideo.mp4';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="HomeGenie Logo" className="h-10 mr-2" />
            <div className="text-2xl font-bold text-blue-600">HomeGenie</div>
          </div>
          <SearchBar />
          <Navigation user={user} logout={logout} setShowAuthModal={setShowAuthModal} />
        </nav>
      </header>

      <main className="pt-20">
        <div className="relative">
          <video autoPlay muted loop className="w-full h-96 object-cover">
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to HomeGenie</h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl max-w-2xl">
              Whether you're looking to rent, buy, or invest in properties and land, HomeGenie is here to make your dreams come true. Explore our intelligent search system, personalized AI recommendations, and interactive mortgage calculator to find the perfect place for you.
            </p>
          </div>
        </div>
        <HeroSection />
        <section className="py-20 px-4 container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HomeGenie?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<SearchIcon />}
              title="Smart Search"
              description="Find your perfect home with our intelligent property search system."
            />
            <FeatureCard
              icon={<AiIcon />}
              title="AI Recommendations"
              description="Get personalized property recommendations powered by advanced AI."
            />
            <FeatureCard
              icon={<CalculatorIcon />}
              title="Mortgage Calculator"
              description="Plan your finances with our interactive mortgage calculator."
            />
          </div>
        </section>

        <Routes>
          <Route path="/" element={<MortgageCalculator />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/propertyDetails/:id" element={<PropertyDetails />} />
          <Route path="/searchResults" element={<SearchResults />} />
        </Routes>
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <ChatbotIcon />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
