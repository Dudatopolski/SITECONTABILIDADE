// script (2).js — correção mínima: abertura/fechamento do modal + mobile guard seguro
const items = document.querySelectorAll(".faq-item");

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

// ====== ABRIR (agora abre como flex e adiciona classe 'open') ======
const openBtn = document.getElementById("openModalChat");
const chatModal = document.getElementById("chatModal");
const chatOverlay = document.getElementById("chatOverlay");
const closeBtn = document.getElementById("closeModalChat");

if (openBtn) {
  openBtn.addEventListener('click', () => {
    if (chatOverlay) {
      chatOverlay.style.display = 'block';
    }
    if (chatModal) {
      // usar flex garante alinhamento compatível com CSS que espera flex
      chatModal.style.display = 'flex';
      chatModal.classList.add('open');
      // bloquear scroll do body (evita background scroll em mobile)
      try { document.documentElement.style.overflow = 'hidden'; } catch(e){}
    }
  });
}

// ====== FECHAR ======
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    if (chatOverlay) chatOverlay.style.display = 'none';
    if (chatModal) {
      chatModal.classList.remove('open');
      chatModal.style.display = '';
    }
    try { document.documentElement.style.overflow = ''; } catch(e){}
  });
}

// ====== FECHAR clicando fora (overlay) ======
if (chatOverlay) {
  chatOverlay.addEventListener('click', () => {
    if (chatOverlay) chatOverlay.style.display = 'none';
    if (chatModal) {
      chatModal.classList.remove('open');
      chatModal.style.display = '';
    }
    try { document.documentElement.style.overflow = ''; } catch(e){}
  });
}

// ====== esconder CTA ao rolar (mantive sua lógica) ======
document.addEventListener("scroll", () => {
    const cta = document.querySelector(".cta-area");

    // Altura total 
    const pageHeight = document.body.scrollHeight;

    // Altura vis
    const windowHeight = window.innerHeight;

    // Quanto o usu
    const scrollY = window.scrollY;

    // Se chegou no final
    if (cta) {
      if (scrollY + windowHeight >= pageHeight - 40) {
          cta.classList.add("hide");
      } else {
          cta.classList.remove("hide");
      }
    }
});

// ====== DOMContentLoaded (mantive seu bloco) ======
document.addEventListener("DOMContentLoaded", () => {

    const cta = document.querySelector(".cta-area");
    const btnOpenChat = document.getElementById("open-chat");
    const btnCloseChat = document.getElementById("close-chat");
    const chatModalAlt = document.getElementById("chat-modal");

    // ---- 1. ESCONDE CTA AO CHEGAR NO RODA
    document.addEventListener("scroll", () => {
        const pageHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        if (cta) {
          if (scrollY + windowHeight >= pageHeight - 40) {
              cta.classList.add("hide");
          } else {
              cta.classList.remove("hide");
          }
        }
    });

});

// ====== Mobile guard: NÃO esconder o chat (ajuste mínimo) ======
(function() {
  function enforceMobileLayout() {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

    // Antes: var cta = document.querySelectorAll('.cta-area, .cta-area *');
    // Agora: esconder somente os itens visuais dentro da CTA (preserva botões/modal se estiverem fora)
    var ctaItems = document.querySelectorAll('.cta-area .cta-item');
    ctaItems.forEach(function(el) {
      if (isMobile) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      } else {
        el.style.display = '';
        el.style.visibility = '';
        el.style.pointerEvents = '';
      }
    });

    // Ensure CSS var is zero and no body padding
    if (isMobile) {
      document.documentElement.style.setProperty('--cta-height', '0px');
      document.body.style.paddingBottom = '0';
      // floating button position
      var floatBtn = document.querySelector('.chat-floating-btn');
      if (floatBtn) floatBtn.style.bottom = '18px';
      // também garantir que overlay/modal não sejam escondidos por este script
      var overlay = document.querySelector('.chat-overlay');
      var modal = document.querySelector('.chat-modal');
      if (overlay) { overlay.style.display = overlay.style.display || ''; overlay.style.zIndex = overlay.style.zIndex || '12040'; }
      if (modal) { modal.style.display = modal.style.display || ''; modal.style.zIndex = modal.style.zIndex || '12045'; }
    } else {
      document.documentElement.style.removeProperty('--cta-height');
      document.body.style.paddingBottom = '';
      var floatBtn = document.querySelector('.chat-floating-btn');
      if (floatBtn) floatBtn.style.bottom = '';
    }
  }

  // Run on load and changes
  window.addEventListener('load', enforceMobileLayout);
  window.addEventListener('resize', function(){ setTimeout(enforceMobileLayout, 80); });
  window.addEventListener('orientationchange', function(){ setTimeout(enforceMobileLayout, 120); });

})();