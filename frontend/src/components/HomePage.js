import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Tvoříme prostor pro růst duše, srdce i přírody</h1>
          <h2>Nech Mě Růst z.s. je nezisková organizace s vizí tvorby rodového statku, kde žijeme v harmonii s přírodou, zvířaty i sebou navzájem.</h2>
          
          <div className="hero-buttons">
            <Link to="/o-nas" className="btn btn-primary">O nás</Link>
            <Link to="/jak-nas-podporit" className="btn btn-primary">Jak nás podpořit?</Link>
          </div>

          <div className="hero-image">
            <img src="/img/hero-image.jpg" alt="Harmonický život v souladu s přírodou - rodový statek Nech Mě Růst" loading="lazy" width="1152" height="auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;