import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import AboutMedical from "./pages/AboutMedical";
import ServiceDetail from "./pages/ServiceDetail";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import CompanyProfile from "./pages/CompanyProfile";
import MedicalCategory from "./pages/MedicalCategory";
import { medicalCategories } from "./mock/mock";
import { Toaster } from "./components/ui/toaster";
import LoadingScreen from "./components/LoadingScreen";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="App">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-medical" element={<AboutMedical />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            {medicalCategories.map((c) => (
              <Route key={c.slug} path={`/${c.slug}`} element={<MedicalCategory slug={c.slug} />} />
            ))}
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
