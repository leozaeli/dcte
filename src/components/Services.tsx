import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: "fas fa-bolt",
    title: "Instalações e Manutenções",
    description: "Execução e reforma de instalações elétricas complexas, correção de fator de potência, substituição de cabeamento obsoleto e balanceamento de cargas elétricas.",
    linkLabel: "Solicitar Serviço",
  },
  {
    icon: "fas fa-drafting-compass",
    title: "Projetos Elétricos",
    description: "Dimensionamento detalhado de diagramas unifilares, quadros de cargas, projetos luminotécnicos inteligentes com foco em economia de consumo e automação.",
    linkLabel: "Ver Detalhes",
  },
  {
    icon: "fas fa-shield-alt",
    title: "SPDA & Aterramento",
    description: "Inspeção detalhada, medições de resistividade de solo (método dos 4 eletrodos), projeto e laudo técnico para Sistema de Proteção contra Descargas Atmosféricas.",
    linkLabel: "Pedir Laudo",
  },
  {
    icon: "fas fa-cogs",
    title: "Painéis & Comandos",
    description: "Montagem técnica impecável de quadros de distribuição, QTA (Quadro de Transferência Automática) para geradores e automação de comandos de bombas e motores.",
    linkLabel: "Orçar Painel",
  },
  {
    icon: "fas fa-search",
    title: "Laudos e Consultoria",
    description: "Parecer técnico especializado, termografia infravermelha para identificar aquecimentos anômalos em conexões e auditoria para otimização de faturas de energia.",
    linkLabel: "Consultar Técnico",
  },
  {
    icon: "fas fa-home",
    title: "Automação Residencial",
    description: "Integração moderna de iluminação inteligente, controle térmico, automação de acessos e monitoramento integrado para o máximo de conforto e tecnologia.",
    linkLabel: "Modernizar Casa",
  },
];

export default function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-badge">Especialidades</div>
          <h2 className="section-title">
            O que fazemos com <span>Máxima Precisão</span>
          </h2>
          <p className="section-description text-gray">
            Aplicações técnicas industriais, comerciais e residenciais elaboradas com o mais alto rigor técnico.
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((s) => (
            <ScrollReveal key={s.title} className="service-card">
              <div className="service-icon-box">
                <i className={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <a href="#contato" className="service-link">
                {s.linkLabel} <i className="fas fa-chevron-right" />
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
