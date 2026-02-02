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

// Mobile guard: zera e esconde a CTA, centraliza modal behavior
(function() {
  function enforceMobileLayout() {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

    // Hide CTA area completely on mobile (safety)
    var cta = document.querySelectorAll('.cta-area, .cta-area *');
    cta.forEach(function(el) {
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

  // Also make sure modal opens centered: adjust when open button is clicked
  var openBtn = document.getElementById('openModalChat');
  if (openBtn) {
    openBtn.addEventListener('click', function(){
      setTimeout(function(){
        var modal = document.getElementById('chatModal');
        if (modal) {
          modal.classList.add('open');
          modal.style.display = 'flex';
          // lock scroll
          document.documentElement.style.overflow = 'hidden';
        }
      }, 20);
    });
  }

  // Close handlers: ensure scroll unlocked
  var closeBtn = document.getElementById('closeModalChat');
  var overlay = document.getElementById('chatOverlay');
  function closeModalHandler() {
    var modal = document.getElementById('chatModal');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = '';
    }
    document.documentElement.style.overflow = '';
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModalHandler);
  if (overlay) overlay.addEventListener('click', closeModalHandler);

})();