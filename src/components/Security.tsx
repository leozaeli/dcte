import ScrollReveal from "./ScrollReveal";

const equipment = [
  { icon: "fas fa-temperature-high", name: "Câmera Termográfica FLIR" },
  { icon: "fas fa-wifi", name: "Terrômetro Digital de Alta Precisão" },
  { icon: "fas fa-tachometer-alt", name: "Megômetro para Isolação" },
  { icon: "fas fa-wave-square", name: "Analisador de Qualidade de Energia" },
];

export default function Security() {
  return (
    <section className="section norms" id="seguranca">
      <div className="container norms-container">
        <ScrollReveal className="norms-content">
          <div className="section-badge">Qualidade Assegurada</div>
          <h2>
            Execução Alinhada às <span>Normas Técnicas</span>
          </h2>
          <p className="text-gray">
            Trabalhar com eletricidade exige responsabilidade absoluta. Todas as intervenções, medições e
            dimensionamentos feitos pela <strong>DCTE</strong> respeitam rigorosamente os padrões nacionais vigentes
            para sua segurança.
          </p>
          <div className="norms-list">
            <div className="norm-item">
              <div className="norm-badge">NBR 5410</div>
              <div className="norm-details">
                <h4>Instalações Elétricas de Baixa Tensão</h4>
                <p>
                  Segurança das pessoas, funcionamento adequado da instalação e conservação dos bens contra
                  sobrecargas e curtos-circuitos.
                </p>
              </div>
            </div>
            <div className="norm-item">
              <div className="norm-badge">NR-10</div>
              <div className="norm-details">
                <h4>Segurança em Serviços com Eletricidade</h4>
                <p>
                  Profissional com treinamento completo para o controle de riscos e medidas de proteção coletiva e
                  individual na execução.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="equipments-panel">
          <h3 className="panel-title">
            <i className="fas fa-toolbox" /> Instrumentação Técnica Calibrada
          </h3>
          <p className="text-gray" style={{ marginBottom: "24px", fontSize: "0.95rem" }}>
            Utilizamos equipamentos de medição profissionais para gerar relatórios com exatidão matemática
            reconhecida.
          </p>
          <div className="equip-list">
            {equipment.map((eq) => (
              <div className="equip-item" key={eq.name}>
                <span className="equip-name">
                  <i className={eq.icon} /> {eq.name}
                </span>
                <span className="equip-status">Calibrado</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
