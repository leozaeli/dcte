'use client';

import { useEffect, useRef } from "react";
import Logo from "./Logo";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const navMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function toggleMenu() {
    menuToggleRef.current?.classList.toggle("active");
    navMenuRef.current?.classList.toggle("active");
  }

  function closeMenu() {
    menuToggleRef.current?.classList.remove("active");
    navMenuRef.current?.classList.remove("active");
  }

  return (
    <header className="header" ref={headerRef} id="header">
      <div className="container nav-container">
        <a href="#home" className="logo-wrapper" aria-label="DCTE Home">
          <Logo height={48} />
        </a>

        <nav>
          <ul className="nav-menu" ref={navMenuRef} id="nav-menu">
            {[
              { href: "#home", label: "Início" },
              { href: "#sobre", label: "Sobre" },
              { href: "#servicos", label: "Serviços" },
              { href: "#seguranca", label: "Segurança" },
              { href: "#portfolio", label: "Projetos" },
              { href: "#contato", label: "Contato" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="nav-link" onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato" className="btn btn-secondary nav-btn btn-glow-effect" onClick={closeMenu}>
                Orçamento
              </a>
            </li>
          </ul>
        </nav>

        <button className="menu-toggle" ref={menuToggleRef} onClick={toggleMenu} aria-label="Abrir Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
