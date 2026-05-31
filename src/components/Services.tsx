import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: "fas fa-bolt",
    title: "Instalações Elétricas",
    description:
      "Instalação de tomadas (simples, dupla, 20A e 220V), interruptores, pontos elétricos novos, circuitos dedicados, passagem de cabos, eletrodutos, canaletas, perfilados, eletrocalhas, ampliação e reforma de instalações.",
    linkLabel: "Solicitar Serviço",
  },
  {
    icon: "fas fa-th-large",
    title: "Quadros Elétricos",
    description:
      "Instalação, substituição, montagem e organização de quadros de distribuição, instalação de disjuntores (mono, bi e tripolar), barramentos, balanceamento de cargas e identificação completa de circuitos.",
    linkLabel: "Orçar Quadro",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Proteção Elétrica",
    description:
      "Instalação de DR e DPS, instalação e medição de aterramento, correção e adequação de aterramento, equipotencialização e proteção completa contra surtos elétricos.",
    linkLabel: "Ver Detalhes",
  },
  {
    icon: "fas fa-lightbulb",
    title: "Iluminação & LED",
    description:
      "Instalação de luminárias (sobrepor, embutida, painel LED, spot, pendente, lustre, refletor), sensores de presença, automação de iluminação e troca de lâmpadas.",
    linkLabel: "Solicitar Serviço",
  },
  {
    icon: "fas fa-tools",
    title: "Manutenção Elétrica",
    description:
      "Visita técnica, diagnóstico de falhas, correção de curto-circuito, fuga de corrente e aquecimento em conexões, reparo em tomadas, interruptores e quadros. Manutenção preventiva e corretiva.",
    linkLabel: "Agendar Visita",
  },
  {
    icon: "fas fa-plug",
    title: "Padrão de Entrada",
    description:
      "Instalação e adequação de padrão Coelba, troca de caixa de medição, instalação de ramal de entrada, aumento de carga e regularização completa junto à concessionária.",
    linkLabel: "Solicitar Adequação",
  },
  {
    icon: "fas fa-video",
    title: "Segurança & CFTV",
    description:
      "Instalação de cerca elétrica, central de cerca, concertina, alarme residencial e comercial, sensores de presença e magnéticos. CFTV completo: câmeras IP e analógicas, DVR/NVR, acesso remoto e cabeamento.",
    linkLabel: "Proteger Imóvel",
  },
  {
    icon: "fas fa-network-wired",
    title: "Rede, Dados & Acesso",
    description:
      "Cabeamento estruturado, certificação de pontos de rede, organização de rack, switch e roteador. Fechaduras eletrônicas, controle de acesso, videoporteiro e porteiro eletrônico.",
    linkLabel: "Ver Detalhes",
  },
  {
    icon: "fas fa-car",
    title: "Veículos Elétricos",
    description:
      "Instalação de carregador Wallbox e portátil, circuito dedicado para carregador, adequação de quadro elétrico, DPS e DR específicos, avaliação de capacidade elétrica e infraestrutura para eletroposto.",
    linkLabel: "Instalar Carregador",
  },
  {
    icon: "fas fa-solar-panel",
    title: "Energia Solar & AC",
    description:
      "Infraestrutura elétrica para sistemas fotovoltaicos, instalação de string box, DPS CC/CA, adequação de quadro e manutenção elétrica do sistema. Instalação de ponto e circuito dedicado para ar-condicionado.",
    linkLabel: "Solicitar Projeto",
  },
  {
    icon: "fas fa-search",
    title: "Inspeções & Laudos",
    description:
      "Inspeção elétrica residencial, comercial e industrial. Termografia elétrica, medição de tensão, corrente e consumo, relatório e laudo técnico assinado com TRT conforme NBR 5410.",
    linkLabel: "Pedir Laudo",
  },
  {
    icon: "fas fa-hard-hat",
    title: "Consultoria & Projetos",
    description:
      "Visita técnica, consultoria elétrica, acompanhamento de obra, levantamento de cargas, projeto elétrico básico e projeto de carregamento para VEs. Atendimento emergencial 24 horas.",
    linkLabel: "Falar com Técnico",
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
            Do residencial ao industrial — soluções elétricas completas com responsabilidade técnica e conformidade total com as normas vigentes.
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
