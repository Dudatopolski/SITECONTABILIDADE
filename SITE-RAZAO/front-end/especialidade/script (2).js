const items = document.querySelectorAll(".faq-item");

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

// ABRIR
document.getElementById("openModalChat").onclick = () => {
    document.getElementById("chatModal").style.display = "block";
    document.getElementById("chatOverlay").style.display = "block";
};

// FECHAR 
document.getElementById("closeModalChat").onclick = () => {
    document.getElementById("chatModal").style.display = "none";
    document.getElementById("chatOverlay").style.display = "none";
};

// FECHAR clicando fora
document.getElementById("chatOverlay").onclick = () => {
    document.getElementById("chatModal").style.display = "none";
    document.getElementById("chatOverlay").style.display = "none";
};

document.addEventListener("scroll", () => {

    const cta = document.querySelector(".cta-area");

    // Altura total 
    const pageHeight = document.body.scrollHeight;

    // Altura vis
    const windowHeight = window.innerHeight;

    // Quanto o usu
    const scrollY = window.scrollY;

    // Se chegou no final
    if (scrollY + windowHeight >= pageHeight - 40) {
        cta.classList.add("hide");
    } else {
        cta.classList.remove("hide");
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const cta = document.querySelector(".cta-area");
    const btnOpenChat = document.getElementById("open-chat");
    const btnCloseChat = document.getElementById("close-chat");
    const chatModal = document.getElementById("chat-modal");

    // ---- 1. ESCONDE CTA AO CHEGAR NO RODA
    document.addEventListener("scroll", () => {
        const pageHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        if (scrollY + windowHeight >= pageHeight - 40) {
            cta.classList.add("hide");
        } else {
            cta.classList.remove("hide");
        }
    });

});

/*
  script-especialidade.js
  Versão para a página "Especialidade" — baseada no seu script (1).js
  Mantém seu markup/dados, corrige comportamento mobile para não esconder o botão de chat.
*/

// Substitua a IIFE antiga por esta versão:
(function() {
  function enforceMobileLayout() {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

    // Esconder apenas os itens da CTA (não esconder o botão, overlay ou modal)
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

    // Ajustes de CSS/variáveis
    if (isMobile) {
      document.documentElement.style.setProperty('--cta-height', '0px');
      document.body.style.paddingBottom = '0';
      var floatBtn = document.querySelector('.chat-floating-btn');
      if (floatBtn) {
        floatBtn.style.bottom = '18px';
        floatBtn.style.display = 'flex';
        floatBtn.style.pointerEvents = 'auto';
        floatBtn.style.zIndex = '12050';
      }
    } else {
      document.documentElement.style.removeProperty('--cta-height');
      document.body.style.paddingBottom = '';
      var floatBtn = document.querySelector('.chat-floating-btn');
      if (floatBtn) {
        floatBtn.style.bottom = '';
        floatBtn.style.display = '';
        floatBtn.style.pointerEvents = '';
        floatBtn.style.zIndex = '';
      }
    }
  }

  // Run on load and on viewport changes
  window.addEventListener('load', enforceMobileLayout);
  window.addEventListener('resize', function(){ setTimeout(enforceMobileLayout, 80); });
  window.addEventListener('orientationchange', function(){ setTimeout(enforceMobileLayout, 120); });

  // Ensure modal open/close handlers exist (guard safe)
  var openBtn = document.getElementById('openModalChat');
  var overlay = document.getElementById('chatOverlay');
  var modal = document.getElementById('chatModal');
  var closeBtn = document.getElementById('closeModalChat');

  if (openBtn && overlay && modal) {
    openBtn.addEventListener('click', function(e){
      e.preventDefault && e.preventDefault();
      overlay.style.display = 'block';
      modal.style.display = 'flex';
      modal.classList.add('open');
      document.documentElement.style.overflow = 'hidden'; // opcional
    });
  }

  function closeModalHandler() {
    if (overlay) overlay.style.display = 'none';
    if (modal) {
      modal.style.display = '';
      modal.classList.remove('open');
    }
    document.documentElement.style.overflow = '';
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModalHandler);
  if (overlay) overlay.addEventListener('click', closeModalHandler);

})();