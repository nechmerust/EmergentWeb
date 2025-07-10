import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Import components
import HomePage from './components/HomePage';
import AboutUsPage from './components/AboutUsPage';
import HowToSupportPage from './components/HowToSupportPage';
import ProductsPage from './components/ProductsPage';
import AnimalsPage from './components/AnimalsPage';
import EventsPage from './components/EventsPage';

// Header Component
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Tab' && !isKeyboardNavigation) {
        document.body.classList.add('keyboard-navigation');
        setIsKeyboardNavigation(true);
      }
    };

    const handleMousedown = () => {
      if (isKeyboardNavigation) {
        document.body.classList.remove('keyboard-navigation');
        setIsKeyboardNavigation(false);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [isKeyboardNavigation]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isHomePage ? 'home-header' : ''}`}>
      <div className="container">
        <nav className="nav" role="navigation" aria-label="Hlavní navigace">
          <Link to="/" className="logo" aria-label="Domovská stránka Nech Mě Růst">
            <img src="/img/logo.png" alt="Nech Mě Růst logo" />
            <span className="logo-text sr-only">Nech Mě Růst</span>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Úvod</Link>
            <Link to="/o-nas" className={`nav-link ${isActive('/o-nas') ? 'active' : ''}`}>O Nás</Link>
            <Link to="/jak-nas-podporit" className={`nav-link ${isActive('/jak-nas-podporit') ? 'active' : ''}`}>Jak nás podpořit</Link>
            <Link to="/produkty" className={`nav-link ${isActive('/produkty') ? 'active' : ''}`}>Produkty</Link>
            <Link to="/zvirecí-obyvatele" className={`nav-link ${isActive('/zvirecí-obyvatele') ? 'active' : ''}`}>Zvířecí obyvatelé</Link>
            <Link to="/udalosti" className={`nav-link ${isActive('/udalosti') ? 'active' : ''}`}>Události</Link>
          </div>

          <button 
            type="button" 
            className="mobile-menu-btn" 
            aria-label="Otevřít hlavní menu" 
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd"></path>
            </svg>
          </button>

          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} role="dialog" aria-modal="true">
            <button 
              type="button" 
              className="mobile-menu-close-btn" 
              aria-label="Zavřít hlavní menu"
              onClick={closeMobileMenu}
            >
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMobileMenu}>Úvod</Link>
            <Link to="/o-nas" className={`nav-link ${isActive('/o-nas') ? 'active' : ''}`} onClick={closeMobileMenu}>O Nás</Link>
            <Link to="/jak-nas-podporit" className={`nav-link ${isActive('/jak-nas-podporit') ? 'active' : ''}`} onClick={closeMobileMenu}>Jak nás podpořit</Link>
            <Link to="/produkty" className={`nav-link ${isActive('/produkty') ? 'active' : ''}`} onClick={closeMobileMenu}>Produkty</Link>
            <Link to="/zvirecí-obyvatele" className={`nav-link ${isActive('/zvirecí-obyvatele') ? 'active' : ''}`} onClick={closeMobileMenu}>Zvířecí obyvatelé</Link>
            <Link to="/udalosti" className={`nav-link ${isActive('/udalosti') ? 'active' : ''}`} onClick={closeMobileMenu}>Události</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p><a href="mailto:nechmerust@gmail.com">nechmerust@gmail.com</a></p>
            <p>IČ: 19602529</p>
            <p>Vlkaneč, Česká Republika</p>
          </div>
          
          <div className="footer-links">
            <a href="https://linktr.ee/nechmerust?utm_source=linktree_profile_share" target="_blank" rel="noopener noreferrer">LinkTree</a>
          </div>
          
          <div className="footer-image">
            <img src="/img/footer-image.png" alt="Certifikát či logo partnera" loading="lazy" width="64" height="48" />
          </div>
          
          <div className="social-links">
            <a href="https://www.facebook.com/share/1AkbXrhiRC/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook Nech Mě Růst">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/nech_me_rust?igsh=azM4ZTZwOHJ5MnNl" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram Nech Mě Růst">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
              </svg>
            </a>
          </div>
          
          <p className="copyright">© {currentYear} Nech Mě Růst z.s. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  useEffect(() => {
    // Set up body classes for keyboard navigation
    document.body.className = '';
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/o-nas" element={<AboutUsPage />} />
            <Route path="/jak-nas-podporit" element={<HowToSupportPage />} />
            <Route path="/produkty" element={<ProductsPage />} />
            <Route path="/zvirecí-obyvatele" element={<AnimalsPage />} />
            <Route path="/udalosti" element={<EventsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;