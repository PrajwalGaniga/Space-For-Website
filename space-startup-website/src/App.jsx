// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// --- Global Components (Always loaded) ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Lazy-loaded Components for Better Performance ---
const Hero = lazy(() => import('./components/Hero'));
const USPSection = lazy(() => import('./components/USPSection'));
const ServicesQuickView = lazy(() => import('./components/ServicesQuickView'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTABanner = lazy(() => import('./components/CTABanner'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const WorkshopsTraining = lazy(() => import('./components/WorkshopsTraining'));
const IEEESupport = lazy(() => import('./components/IEEESupport'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const GetQuote = lazy(() => import('./components/GetQuote'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading...</p>
  </div>
);

// Homepage Content Component
const HomePageContent = () => (
  <>
    <Hero />
    <USPSection />
    <ServicesQuickView />
    <FeaturedProjects />
    <Testimonials />
    <CTABanner />
  </>
);

// 404 Not Found Component
const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist in this universe.</p>
      <a href="/" className="back-home-btn">Return Home</a>
    </div>
  </div>
);

function App() {
  return (
    <div className="container">
      <Navbar />
      
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<HomePageContent />} />
            
            {/* About & Company Info */}
            <Route path="/about" element={<AboutUs />} />
            
            {/* Services & Offerings */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/workshops" element={<WorkshopsTraining />} />
            <Route path="/ieee-support" element={<IEEESupport />} />
            
            {/* Work Showcase */}
            <Route path="/portfolio" element={<Portfolio />} />
            
            {/* Contact & Conversion */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/quote" element={<GetQuote />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
