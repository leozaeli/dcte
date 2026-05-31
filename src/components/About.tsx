import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className="container about-grid">
        <ScrollReveal className="about-visual">
          <div className="about-experience-card">
            <div className="section-badge">Credibilidade</div>
            <h3 className="hero-title" style={{ fontSize: "2.2rem", marginBottom: "20px" }}>
              Atuação Técnica com <span className="highlight">Garantia e Responsabilidade</span>
            </h3>
            <p>
              Cada projeto desenvolvido pela <strong>DCTE</strong> acompanha documentação técnica exigida por lei.
              As medições e laudos técnicos são realizados com instrumentos calibrados, assegurando a exatidão dos diagnósticos.
            </p>
            <div className="about-features">
              {["Projetos com TRT", "Normas ABNT", "Instrumentação Própria", "Atendimento Exclusivo"].map((item) => (
                <div className="about-feat-item" key={item}>
                  <i className="fas fa-check-circle" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="about-content">
          <div className="section-badge">Sobre o Profissional</div>
          <h2>
            Compromisso com a <span>Excelência Eletrotécnica</span>
          </h2>
          <p>
            Sou <strong>Deividson Charles</strong>, profissional especializado em eletrotécnica e fundador da{" "}
            <strong>DCTE</strong>. Minha missão é oferecer soluções que unem alta performance energética à máxima
            segurança de pessoas e patrimônios.
          </p>
          <p>
            Atuo desde a elaboração de projetos complexos em baixa e média tensão até o comissionamento e manutenção
            de sistemas complexos. Desenvolvo laudos criteriosos de aterramento e SPDA (Para-raios), garantindo o
            cumprimento legal perante seguradoras e órgãos fiscalizadores.
          </p>
          <div className="credencial-box">
            <div className="credencial-icon">
              <i className="fas fa-id-card" />
            </div>
            <div className="credencial-text">
              <h4>Profissional Registrado no CFT / CRT</h4>
              <p>
                Garantia de habilitação técnica legal para assinar e executar projetos, emitindo o devido{" "}
                <strong>TRT (Termo de Responsabilidade Técnica)</strong> para a sua segurança total.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
