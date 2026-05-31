'use client';

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const WHATSAPP = "5511999999999";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = data.get("name") as string;
    const email = data.get("email") as string;
    const telefone = data.get("phone") as string;
    const servico = data.get("service-type") as string;
    const mensagem = data.get("message") as string;

    const texto =
      `*SOLICITAÇÃO DE ORÇAMENTO TÉCNICO - DCTE*%0A%0A` +
      `⚡ *Nome:* ${nome}%0A` +
      `📧 *E-mail:* ${email}%0A` +
      `📱 *WhatsApp:* ${telefone}%0A` +
      `🛠️ *Serviço de Interesse:* ${servico}%0A%0A` +
      `📝 *Descrição da Demanda:*%0A${mensagem}`;

    setLoading(true);
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${texto}`, "_blank");
      setLoading(false);
      form.reset();
    }, 1200);
  }

  return (
    <section className="section" id="contato">
      <div className="container contact-grid">
        <ScrollReveal className="contact-info-box">
          <div className="section-badge">Atendimento</div>
          <h2 className="hero-title" style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
            Solicite seu <span className="highlight">Orçamento Técnico</span>
          </h2>
          <p className="text-gray" style={{ marginBottom: "40px", fontSize: "1.05rem" }}>
            Tem uma obra em andamento, precisa de um laudo legal de SPDA ou quer projetar o circuito da sua
            empresa? Entre em contato agora mesmo!
          </p>

          <div className="contact-card-item">
            <div className="contact-card-icon">
              <i className="fab fa-whatsapp" />
            </div>
            <div className="contact-card-text">
              <h4>WhatsApp Comercial</h4>
              <p>Atendimento prioritário e imediato para chamados urgentes.</p>
              <a
                href={`https://wa.me/${WHATSAPP}?text=Olá%20Deividson,%20gostaria%20de%20solicitar%20um%20orçamento%20técnico%20com%20a%20DCTE.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                (00) 90000-0000
              </a>
            </div>
          </div>

          <div className="contact-card-item">
            <div className="contact-card-icon">
              <i className="fas fa-envelope" />
            </div>
            <div className="contact-card-text">
              <h4>E-mail Profissional</h4>
              <p>Para envio de plantas de engenharia, especificações e termos de concorrência.</p>
              <a href="mailto:contato@dcte.com.br">contato@dcte.com.br</a>
            </div>
          </div>

          <div className="contact-socials">
            <h4 className="social-title">Siga-me nas Redes</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="contact-form-box">
          <h3 className="form-title">Envie sua Mensagem</h3>
          <p className="form-subtitle text-gray">Preencha os campos abaixo para alinhar o seu projeto.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nome Completo</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="Seu nome ou razão social" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">E-mail para Contato</label>
              <input type="email" id="email" name="email" className="form-input" placeholder="exemplo@empresa.com.br" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Celular / WhatsApp</label>
              <input type="tel" id="phone" name="phone" className="form-input" placeholder="(00) 90000-0000" required />
            </div>
            <div className="form-group">
              <label htmlFor="service-type" className="form-label">Serviço de Interesse</label>
              <select id="service-type" name="service-type" className="form-input" style={{ backgroundColor: "#14161a", color: "white" }} required>
                <option value="" disabled>Selecione uma especialidade...</option>
                <option value="Projetos Elétricos">Projetos Elétricos</option>
                <option value="Manutenção & Instalações">Manutenção &amp; Instalações</option>
                <option value="Laudos & SPDA">Laudos &amp; SPDA (Para-raios)</option>
                <option value="Painéis & Comandos">Painéis &amp; Comandos</option>
                <option value="Automação Residencial">Automação Residencial</option>
                <option value="Consultoria Técnica">Outra Demanda Técnica</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Descrição Resumida</label>
              <textarea id="message" name="message" className="form-input" placeholder="Descreva brevemente sua necessidade ou o escopo do projeto..." required />
            </div>
            <button type="submit" className="btn btn-primary btn-form btn-glow-effect" disabled={loading}>
              {loading ? (
                <><i className="fas fa-spinner fa-spin" /> Redirecionando...</>
              ) : (
                <>Enviar Orçamento por WhatsApp <i className="fab fa-whatsapp" /></>
              )}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
