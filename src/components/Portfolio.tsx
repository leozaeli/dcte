'use client';

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  { category: "paineis", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", imgFull: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80", alt: "Painel elétrico industrial montado com fiação organizada", tag: "Painéis & Quadros", title: "Montagem de QGD Comercial", description: "Quadro Geral de Distribuição estruturado com barramento blindado e identificação completa de circuitos." },
  { category: "instalacoes", img: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=600&q=80", imgFull: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=1200&q=80", alt: "Medição técnica em barramento elétrico", tag: "Instalações", title: "Infraestrutura de Subestação", description: "Redimensionamento e passagem de cabos alimentadores gerais em bandeja perfurada metálica." },
  { category: "laudos", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80", imgFull: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", alt: "Instalação de SPDA na cobertura de edifício comercial", tag: "Laudos & SPDA", title: "Laudo Técnico de SPDA", description: "Inspeção completa e emissão de laudo técnico de malha de aterramento e para-raios de galpão fabril." },
  { category: "paineis", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80", imgFull: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80", alt: "Integração de comandos e contatores em quadro de comandos", tag: "Painéis & Quadros", title: "Quadro de Comando de Motores", description: "Comissionamento de chaves soft-starter e inversores de frequência para controle automatizado." },
  { category: "instalacoes", img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80", imgFull: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80", alt: "Projeto Luminotécnico moderno instalado em escritório", tag: "Instalações", title: "Luminotécnico e Automação", description: "Execução de iluminação LED cenográfica linear inteligente e dimerizada em escritório corporativo." },
  { category: "laudos", img: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80", imgFull: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=1200&q=80", alt: "Termografia infravermelha exibindo pontos quentes em painel", tag: "Laudos & SPDA", title: "Análise Termográfica", description: "Relatório de auditoria infravermelha com identificação e correção preventiva de conexões sobrecarregadas." },
];

const filters = [
  { value: "all", label: "Todos" },
  { value: "paineis", label: "Painéis & Quadros" },
  { value: "instalacoes", label: "Instalações" },
  { value: "laudos", label: "Laudos & SPDA" },
];

export default function Portfolio() {
  const [active, setActive] = useState("all");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImg(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxImg ? "hidden" : "auto";
  }, [lightboxImg]);

  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-badge">Portfólio</div>
          <h2 className="section-title">
            Galeria de <span>Projetos Recentes</span>
          </h2>
          <p className="section-description text-gray">
            Confira o acabamento impecável, organização e engenharia aplicados nos projetos executados pela DCTE.
          </p>
        </ScrollReveal>

        <div className="portfolio-filter reveal active">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${active === f.value ? "active" : ""}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {visible.map((p) => (
            <div className="portfolio-item reveal active" key={p.title}>
              <div className="portfolio-img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.alt} />
                <div className="portfolio-overlay">
                  <button
                    className="portfolio-overlay-icon"
                    aria-label="Visualizar Projeto"
                    onClick={() => setLightboxImg(p.imgFull)}
                  >
                    <i className="fas fa-search-plus" />
                  </button>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p className="text-gray">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxImg && (
        <div
          className="lightbox active"
          ref={lightboxRef}
          onClick={(e) => { if (e.target === lightboxRef.current) setLightboxImg(null); }}
        >
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Fechar">
              <i className="fas fa-times" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxImg} alt="Visualização detalhada do projeto" />
          </div>
        </div>
      )}
    </section>
  );
}
