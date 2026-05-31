import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="bg-glow" style={{ top: "-10%", left: "-10%" }} />
      <div className="bg-grid" />
      <div className="container hero-grid">
        <ScrollReveal className="hero-content">
          <div className="hero-tag">
            <span className="dot" />
            <span>Disponível para Projetos &amp; Laudos</span>
          </div>
          <h1 className="hero-title">
            <span>Eficiência, Segurança &amp;</span>
            <br />
            <span className="highlight">Precisão Elétrica</span>
          </h1>
          <p className="hero-description text-gray">
            Instalações comerciais, industriais e residenciais projetadas por{" "}
            <strong>Deividson Charles (DCTE)</strong>. Soluções eletrotécnicas de alto padrão, laudos técnicos
            detalhados e total conformidade com as normas <strong>NBR 5410</strong> e <strong>NR-10</strong>.
          </p>
          <div className="hero-actions">
            <a href="#contato" className="btn btn-primary btn-glow-effect">
              <i className="fab fa-whatsapp" /> Falar no WhatsApp
            </a>
            <a href="#servicos" className="btn btn-secondary">
              Ver Serviços <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Segurança &amp; Conformidade</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">CFT/CRT</span>
              <span className="stat-label">Profissional Habilitado</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">+100</span>
              <span className="stat-label">Projetos Executados</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="hero-visual">
          <svg className="hero-circuit-bg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(245,158,11,0.05)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(245,158,11,0.05)" strokeWidth="0.5" strokeDasharray="5 5" />
            <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="rgba(245,158,11,0.03)" strokeWidth="0.5" />
            <circle cx="50" cy="10" r="1.5" fill="#F59E0B" />
            <circle cx="90" cy="50" r="1.5" fill="#F59E0B" />
            <circle cx="50" cy="90" r="1.5" fill="#F59E0B" />
            <circle cx="10" cy="50" r="1.5" fill="#F59E0B" />
          </svg>

          <div className="hero-avatar-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80"
              alt="Painel Elétrico de Alta Qualidade montado por DCTE"
            />
            <div className="hero-badge-overlay">
              <div className="badge-icon">
                <i className="fas fa-user-shield" />
              </div>
              <div className="badge-text">
                <h4>Deividson Charles</h4>
                <p>TÉCNICO CREDENCIADO</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
