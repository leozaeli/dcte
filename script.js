/* 
================================================================
  COMPORTAMENTOS E INTERAÇÕES - DCTE
  Profissional: Deividson Charles - Técnico em Eletrotécnica
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Controle do Cabeçalho ao Rolar (Mudar Background)
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Menu Hambúrguer (Mobile)
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Fechar menu mobile ao clicar em algum link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // 3. Efeito de Rolagem Ativa no Menu (Navegação Ativa)
  const sections = document.querySelectorAll('section');
  
  const options = {
    threshold: 0.3,
    rootMargin: "0px 0px -20% 0px"
  };

  const observerActiveLink = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observerActiveLink.observe(section);
  });

  // 4. Animação de Entrada ao Rolar (Scroll Reveal via IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Deixa de observar depois de revelar
      }
    });
  }, revealOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 5. Filtro do Portfólio / Projetos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover classe active de todos
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Adicionar classe active no clicado
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. Modal Lightbox do Portfólio (Visualização de Imagem Ampliada)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const viewImgButtons = document.querySelectorAll('.portfolio-overlay-icon');

  viewImgButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const imgUrl = button.getAttribute('data-img');
      lightboxImg.src = imgUrl;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // impede scroll de fundo com modal aberto
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Fechar modal ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 7. Formulário de Contato Inteligente -> Enviar direto para o WhatsApp do Técnico
  const contactForm = document.getElementById('contact-form');
  // Número comercial de exemplo da DCTE (usuário poderá trocar depois no código)
  // Substituímos por um número fictício que ele pode configurar facilmente
  const NUMERO_WHATSAPP = '5511999999999'; // Configurar DDI + DDD + Número

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coleta dos dados do formulário
    const nome = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('phone').value.trim();
    const servico = document.getElementById('service-type').value;
    const mensagem = document.getElementById('message').value.trim();

    // Construção da mensagem formatada para o WhatsApp
    const mensagemWhatsApp = `*SOLICITAÇÃO DE ORÇAMENTO TÉCNICO - DCTE*%0A%0A` +
      `⚡ *Nome:* ${nome}%0A` +
      `📧 *E-mail:* ${email}%0A` +
      `📱 *WhatsApp:* ${telefone}%0A` +
      `🛠️ *Serviço de Interesse:* ${servico}%0A%0A` +
      `📝 *Descrição da Demanda:*%0A${mensagem}`;

    // Criar a URL do WhatsApp Web/Mobile
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${mensagemWhatsApp}`;

    // Mostrar micro-animação / feedback de envio ao usuário
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';

    // Abrir o WhatsApp após uma pequena transição de feedback
    setTimeout(() => {
      window.open(urlWhatsApp, '_blank');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      // Limpar formulário
      contactForm.reset();
    }, 1200);
  });
});
