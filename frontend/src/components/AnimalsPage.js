import React from 'react';
import { Link } from 'react-router-dom';

function AnimalsPage() {
  return (
    <section className="page-content-section">
      <div className="container">
        <h1>Naši zvířecí obyvatelé</h1>
        <div className="content-wrapper">
          <p>Na naší Louce žije 70 zvířat, která jsme přijali do péče, a která u nás nacházejí bezpečný domov a láskyplné prostředí. Každé zvíře má svůj příběh a my se snažíme zajistit jim co nejlepší život.</p>
          
          <h3>Seznam našich zvířecích přátel:</h3>
          <ul>
            <li><strong>Kůň Zorka:</strong> Našla u nás útočiště po těžkých životních zkušenostech. Je to vitální postarší dáme tak se snažíme dopřát jí co nejvíce péče.</li>
            <li><strong>Osel Karel:</strong> Hravý a kousavý kamarád. Výborně plní funkci ranního budíku.</li>
            <li><strong>Kravky Květa a Avala:</strong> KrAvalky jsou velmi mazlivé a výborné učitelky vnitřního klidu.</li>
            <li><strong>Prasátko Flíček:</strong> Miluje drbání na pupíku a svůj pelíšek v seníku.</li>
            <li><strong>Prasinka Princezna:</strong> Uchrochtaná a uslintaná královna. Miluje jídlo a podrbání za ouškama.</li>
            <li><strong>Ovčí tlupa:</strong> Společníci, kteří pomáhají s údržbou pastvin a přinášejí radost svou hravou povahou. Taktéž velcí učitelé klidu.</li>
            <li><strong>Slepice a Kachny:</strong> Přispívají k biodiverzitě statku. Žijí volně a spokojeně.</li>
            <li><strong>Holubí letka:</strong> Rozverná a upovídaná rodinka. Našli u nás absolutní svobodu a péči.</li>
            <li><strong>Kočky a Psi:</strong> Naši čtyřnozí strážci a mazlíčci, kteří doplňují rodinnou atmosféru. Mnozí z nich byli zachráněni z nepříznivých podmínek.</li>
            <li><strong>A další...</strong> Vždy se snažíme pomoci zvířatům v nouzi, takže se naše rodina neustále rozrůstá.</li>
          </ul>

          <video 
            controls 
            width="100%" 
            style={{
              maxWidth: '100%', 
              height: 'auto', 
              borderRadius: '0.75rem', 
              margin: '2rem auto', 
              display: 'block', 
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
          >
            <source src="/videos/animals.mp4" type="video/mp4" />
            Váš prohlížeč nepodporuje přehrávání HTML videí. Můžete si jej <a href="/videos/animals.mp4">stáhnout zde</a>.
          </video>
          <p className="text-sm">Krátké video našich zvířecích obyvatel.</p>

          <img src="/img/mazlendo.jpg" alt="Čistá Láska." loading="lazy" />
          <p className="text-sm">Čistá láska mezi námi a našimi zvířecími přáteli.</p>
                  
          <p>Pokud byste chtěli podpořit péči o naše zvířata, navštivte sekci "<Link to="/jak-nas-podporit" className="inline-link">Jak nás podpořit</Link>", kde naleznete možnosti darování krmiva, finanční podpory nebo dobrovolnické pomoci.</p>
        </div>
      </div>
    </section>
  );
}

export default AnimalsPage;