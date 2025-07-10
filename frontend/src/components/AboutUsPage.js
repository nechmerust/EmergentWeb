import React from 'react';

function AboutUsPage() {
  return (
    <section className="page-content-section">
      <div className="container">
        <h1>O nás</h1>
        <div className="content-wrapper">
          <p>
            <strong>Nech Mě Růst z.s.</strong> je nezisková organizace založená s vizí vytvoření rodového statku jako živého organismu, kde všechny části - lidé, zvířata, rostliny i stavby - koexistují v harmonii a vzájemně se podporují ve svém růstu.
          </p>

          <h2>Naše vize</h2>
          <p>
            Naší vizí je vytvořit místo, kde se příroda, zvířata a lidé setkávají v harmonii. Místo, kde každý může růst, učit se a nacházet klid. Snažíme se ukázat, že jiný způsob života je možný - život v souladu s přírodou, založený na vzájemné úctě a odpovědnosti.
          </p>

          <h2>Co děláme</h2>
          <ul>
            <li><strong>Záchrana zvířat:</strong> Poskytujeme domov zvířatům v nouzi a staráme se o ně s láskou a péčí.</li>
            <li><strong>Vzdělávání:</strong> Organizujeme workshopy a setkání o udržitelném způsobu života a péči o zvířata.</li>
            <li><strong>Tvorba produktů:</strong> Vyrábíme přírodní produkty z darů naší země - bylinné směsi, kosmetiku a rukodělné výrobky.</li>
            <li><strong>Komunita:</strong> Vytváříme prostor pro setkávání lidí se stejnými hodnotami a zájmy.</li>
          </ul>

          <img src="/img/about-us.jpg" alt="Náš statek - místo harmonie mezi lidmi, zvířaty a přírodou" loading="lazy" />
          <p className="text-sm">Náš statek ve Vlkanči - místo, kde žijeme naši vizi každý den.</p>

          <h2>Naše hodnoty</h2>
          <ul>
            <li><strong>Harmonie s přírodou:</strong> Žijeme v souladu s přírodními cykly a respektujeme všechny živé bytosti.</li>
            <li><strong>Odpovědnost:</strong> Převzali jsme odpovědnost za zvířata v nouzi a prostředí, ve kterém žijeme.</li>
            <li><strong>Udržitelnost:</strong> Všechno, co děláme, má být udržitelné pro budoucí generace.</li>
            <li><strong>Láska a péče:</strong> Základem všeho našeho snažení je láska - k lidem, zvířatům i přírodě.</li>
            <li><strong>Komunita:</strong> Věříme v sílu společenství a vzájemné podpory.</li>
          </ul>

          <h2>Kde nás najdete</h2>
          <p>
            Náš statek se nachází ve Vlkanči v České republice. Je to místo, které jsme si zvolili pro realizaci naší vize - klidné prostředí obklopené přírodou, kde můžeme žít v harmonii s okolím.
          </p>

          <h2>Jak se zapojit</h2>
          <p>
            Pokud vás naše mise oslovuje, existuje mnoho způsobů, jak se můžete zapojit. Můžete nás podpořit finančně, koupit naše produkty, přijet nás navštívit nebo se stát dobrovolníkem. Každá pomoc je vítaná a oceňovaná.
          </p>

          <p>
            Více informací o možnostech podpory najdete v sekci <a href="/jak-nas-podporit" className="inline-link">"Jak nás podpořit"</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUsPage;