import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-about">
          <Logo height={52} />
          <p className="text-gray">
            Garantia técnica de segurança, economia energética e excelência de engenharia eletrotécnica em qualquer
            projeto.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Navegação</h4>
          <ul className="footer-links">
            {[
              { href: "#home", label: "Início" },
              { href: "#sobre", label: "Sobre" },
              { href: "#servicos", label: "Serviços" },
              { href: "#seguranca", label: "Segurança & Normas" },
              { href: "#portfolio", label: "Galeria de Projetos" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="footer-link">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Horário de Atendimento</h4>
          <div className="footer-hours-list">
            <div className="footer-hours-item">
              <span>Segunda a Sexta</span>
              <span>08:00 às 18:00</span>
            </div>
            <div className="footer-hours-item">
              <span>Sábado</span>
              <span>08:00 às 12:00</span>
            </div>
            <div className="footer-hours-item">
              <span>Plantão Técnico</span>
              <span style={{ color: "var(--primary-gold)", fontWeight: 600 }}>24 horas (WhatsApp)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 DCTE - Deividson Charles. Todos os direitos reservados. CRT/CFT Ativo.</p>
        <div className="footer-legal-links">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  );
}
