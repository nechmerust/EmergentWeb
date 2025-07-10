import React from 'react';

function ProductsPage() {
  return (
    <section className="page-content-section">
      <div className="container">
        <h1>Produkty</h1>
        <div className="content-wrapper">
          <p>V našem e-shopu naleznete originální produkty, které s láskou tvoříme z darů přírody a s ohledem na udržitelnost. Každou koupí podpoříte fungování našeho statku a péči o zvířata v nouzi.</p>
          
          <h3>Naše nabídka zahrnuje:</h3>
          <ul>
            <li><strong>Bylinné směsi a čaje:</strong> Vlastnoručně sbírané a sušené bylinky z naší zahrady a okolních lesů, zpracované do léčivých čajů a směsí pro zdraví a pohodu.</li>
            <li><strong>Přírodní kosmetika:</strong> Ručně vyráběné masti, tinktury a balzámy z přírodních ingrediencí, bez chemie a umělých přísad.</li>
            <li><strong>Rukodělné výrobky:</strong> Unikátní výrobky, vytvořené s láskou v naší dílně.</li>
          </ul>
                  
          <img src="/img/products.jpg" alt="Výběr našich ručně vyráběných produktů" loading="lazy" />
          <p className="text-sm">Ukázka našich produktů - bylinné směsi.</p>

          <p>Prohlédněte si naši aktuální nabídku a podpořte nás koupí něčeho krásného a užitečného!</p>
          <div className="text-center" style={{ marginTop: '2rem' }}> 
            <a href="#" className="btn btn-primary">Prohlédnout e-shop (připravujeme)</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;