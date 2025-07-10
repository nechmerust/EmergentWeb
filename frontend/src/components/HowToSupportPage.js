import React, { useState } from 'react';

function ExpandableSection({ id, title, children, buttonText = "Číst více" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div className={`expandable-text ${isExpanded ? 'expandable-text-expanded' : 'expandable-text-collapsed'}`}>
        {children}
      </div>
      <button 
        onClick={toggleExpanded}
        className="read-more-btn"
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Číst méně' : buttonText}
      </button>
    </div>
  );
}

function HowToSupportPage() {
  return (
    <section className="page-content-section">
      <div className="container">
        <h1>Jak nás podpořit</h1>
        <div className="content-wrapper">
          <p>Vaše podpora je pro nás neocenitelná a pomáhá nám pokračovat v naší misi péče o zvířata a vytváření harmonického prostoru pro život v souladu s přírodou. Existuje mnoho způsobů, jak nás můžete podpořit:</p>

          <h2>Finanční podpora</h2>
          <p>Finanční dary nám pomáhají pokrýt náklady na krmivo, veterinární péči, údržbu a rozvoj našeho statku.</p>
          
          <h3>Transparentní účet:</h3>
          <p><strong>Číslo účtu:</strong> 123456789/0000 (transparentní účet pro dary)</p>
          <p><strong>Variabilní symbol:</strong> 2024</p>
          <p>Všechny přijaté dary používáme výhradně na péči o zvířata a provoz statku.</p>

          <h2>Virtuální adopce zvířete</h2>
          <ExpandableSection id="virtualniAdopce" title="Program virtuální adopce">
            <p>Prostřednictvím programu virtuální adopce si můžete "adoptovat" jedno z našich zvířat a pravidelně přispívat na jeho péči. Jako adoptivní rodič budete dostávat:</p>
            <ul>
              <li>Pravidelné zprávy o vašem adoptovaném zvířeti</li>
              <li>Fotografie a videa</li>
              <li>Možnost navštívit vaše zvíře osobně</li>
              <li>Certifikát adopce</li>
            </ul>
            <p><strong>Měsíční příspěvek:</strong> Od 500 Kč měsíčně</p>
            <p>Kontaktujte nás na e-mailu pro více informací o dostupných zvířatech k adopci.</p>
          </ExpandableSection>

          <h2>Nákup našich produktů</h2>
          <p>Podpořte nás nákupem našich ručně vyráběných produktů. Každý nákup přímo přispívá k fungování našeho statku.</p>
          <div className="text-center" style={{ margin: '1.5rem 0' }}>
            <a href="/produkty" className="btn btn-primary">Prohlédnout produkty</a>
          </div>

          <h2>Click & Feed - Nakrm nás</h2>
          <ExpandableSection id="clickandfeed" title="Jednoduché krmení jedním kliknutím">
            <p>Prostřednictvím aplikace <a href="https://www.nakrmnas.cz/" target="_blank" rel="noopener noreferrer" className="inline-link">@nakrmnas.cz</a> můžete naše zvířata nakrmit jedním kliknutím zdarma! Stačí kliknout na odkaz níže a vybrat si naši organizaci.</p>
            <p>Každý den můžete zdarma nakrmit naše zvířata díky partnerským firmám, které financují krmivo za každé kliknutí.</p>
            <div className="click-feed-button-container">
              <a href="https://www.nakrmnas.cz/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Nakrmit zdarma
              </a>
            </div>
          </ExpandableSection>

          <h2>Dobrovolnictví</h2>
          <p>Přijďte nám pomoct přímo na statek! Vždy uvítáme pomocné ruce při:</p>
          <ul>
            <li>Péči o zvířata (krmení, čištění, venčení)</li>
            <li>Údržbě statku a opravách</li>
            <li>Práci na zahradě</li>
            <li>Organizaci akcí a workshopů</li>
            <li>Administrativních činnostech</li>
          </ul>

          <img src="/img/adopce.jpg" alt="Dobrovolníci pomáhají s péčí o zvířata" loading="lazy" className="content-image-small" />
          <p className="text-sm">Dobrovolníci jsou nedílnou součástí našeho týmu.</p>

          <h2>Darování krmiva a potřeb</h2>
          <p>Vždy potřebujeme:</p>
          <ul>
            <li><strong>Krmivo:</strong> Seno, ovocné pelety, obilniny, zelenina</li>
            <li><strong>Podestýlka:</strong> Sláma, piliny</li>
            <li><strong>Veterinární potřeby:</strong> Léky, obvazy, dezinfekce</li>
            <li><strong>Nářadí:</strong> Hrábě, lopaty, konve</li>
            <li><strong>Stavební materiál:</strong> Pro opravy a vylepšení ubikací</li>
          </ul>

          <h2>Šíření povědomí</h2>
          <p>Pomůžete nám i tím, že budete sdílet naše příspěvky na sociálních sítích, budete o nás vyprávět přátelům a rodině, nebo nás doporučíte dalším lidem, kteří by mohli mít zájem o naši činnost.</p>

          <h2>Darujme.cz</h2>
          <div className="darujme-button-container">
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Darovat přes Darujme.cz (připravujeme)
            </a>
          </div>

          <h2>Kontakt</h2>
          <p>Pro jakékoli dotazy ohledně podpory nás kontaktujte:</p>
          <ul>
            <li><strong>E-mail:</strong> <a href="mailto:nechmerust@gmail.com" className="inline-link">nechmerust@gmail.com</a></li>
            <li><strong>Adresa:</strong> Vlkaneč, Česká Republika</li>
            <li><strong>IČ:</strong> 19602529</li>
          </ul>

          <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#f0fdf4', borderRadius: '1rem', border: '2px solid var(--color-primary)' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Děkujeme za vaši podporu!</h3>
            <p>Každý příspěvek, ať už finanční nebo dobrovolnický, nám pomáhá pokračovat v naší misi. Díky vám můžeme poskytovat láskyplný domov zvířatům v nouzi a rozvíjet náš projekt udržitelného života v harmonii s přírodou.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToSupportPage;