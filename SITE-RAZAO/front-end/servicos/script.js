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

    const pageHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (scrollY + windowHeight >= pageHeight - 40) {
        cta.classList.add("hide");
    } else {
        cta.classList.remove("hide");
    }
});

// REMOVIDO → bloco duplicado que quebrava o JS
// document.getElementById("open-chat")
// document.getElementById("close-chat")
// document.getElementById("chat-modal")


/* mobile-behavior.js
   Single, organized mobile behaviour script.
   - Idempotent: safe to include on every page.
   - Runs only on mobile (max-width: 768px).
   - Handles global mobile fixes (CTA hide, FAQ toggle, modal, nav scrollable, tables).
   - Detects "services" page (presence of .planos-cards or .tabela-comparativa) and applies extra tweaks.
   Usage:
     <script src="/js/mobile-behavior.js"></script>
   Include before </body>.
*/
(function () {
  if (window.__mobileBehaviorInitialized) return;
  window.__mobileBehaviorInitialized = true;

  const MOBILE_Q = '(max-width: 768px)';
  const mq = window.matchMedia(MOBILE_Q);
  let resizeTimer = null;

  /* Helpers */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const setAttr = (el, k, v) => el && el.setAttribute(k, v);
  const removeAttr = (el, k) => el && el.removeAttribute(k);

  function debounce(fn, wait = 120) {
    return function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fn, wait);
    };
  }

  /* Global mobile behaviors */
  function setHeaderHeightVar() {
    // detect header that may overlay hero and set CSS var for mobile padding compensation
    const header = document.querySelector('.header, header.site-header, #site-header, .site-header');
    let h = 0;
    if (header) {
      try {
        const cs = window.getComputedStyle(header);
        if (cs && (cs.position === 'fixed' || cs.position === 'absolute' || (cs.zIndex && parseInt(cs.zIndex, 10) > 0))) {
          h = header.offsetHeight || 64;
        }
      } catch (e) { h = header.offsetHeight || 0; }
    }
    document.documentElement.style.setProperty('--header-height', (h || 0) + 'px');
  }

  function hideCTA() {
    $$('.cta-area').forEach(el => {
      if (!el.dataset._mobHidden) {
        el.dataset._mobHidden = '1';
      }
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      el.style.pointerEvents = 'none';
    });
    document.documentElement.style.setProperty('--cta-height', '0px');
    document.body.style.paddingBottom = '0px';
  }

  function restoreCTA() {
    $$('.cta-area').forEach(el => {
      if (el.dataset._mobHidden) {
        el.style.display = '';
        el.style.visibility = '';
        el.style.pointerEvents = '';
        delete el.dataset._mobHidden;
      }
    });
    document.documentElement.style.removeProperty('--cta-height');
    document.body.style.paddingBottom = '';
  }

  function setupFaqToggle() {
    $$('.faq-item').forEach(item => {
      if (item.dataset._faqBound) return;
      item.addEventListener('click', () => item.classList.toggle('active'));
      item.dataset._faqBound = '1';
    });
  }

  function teardownFaqToggle() {
    // we leave handlers as they are harmless, but remove marker if needed
    $$('.faq-item').forEach(item => delete item.dataset._faqBound);
  }

  function setupModal() {
    const overlay = $('#chatOverlay') || $('.chat-overlay');
    const modal = $('#chatModal') || $('.chat-modal');

    const openButtons = $$('[data-open-chat], #openModalChat, #open-chat, .open-chat');
    openButtons.forEach(btn => {
      if (btn.dataset._openBound) return;
      btn.addEventListener('click', (e) => {
        try { e.preventDefault(); } catch (err) {}
        if (overlay) overlay.style.display = 'block';
        if (modal) {
          modal.style.display = 'flex';
          modal.classList.add('open');
        }
        // do not lock scroll on mobile to avoid jump issues
      });
      btn.dataset._openBound = '1';
    });

    const closeButtons = $$('[data-close-chat], #closeModalChat, #close-chat, .chat-close');
    closeButtons.forEach(b => {
      if (b.dataset._closeBound) return;
      b.addEventListener('click', () => {
        if (overlay) overlay.style.display = 'none';
        if (modal) {
          modal.style.display = '';
          modal.classList.remove('open');
        }
      });
      b.dataset._closeBound = '1';
    });

    if (overlay && !overlay.dataset._overlayBound) {
      overlay.addEventListener('click', () => {
        if (overlay) overlay.style.display = 'none';
        if (modal) {
          modal.style.display = '';
          modal.classList.remove('open');
        }
      });
      overlay.dataset._overlayBound = '1';
    }

    // ensure floating button is clickable
    const floatBtn = $('.chat-floating-btn');
    if (floatBtn) {
      floatBtn.style.zIndex = '12050';
      floatBtn.style.pointerEvents = 'auto';
    }
    // ensure modal z-index is above content
    if (overlay) overlay.style.zIndex = '12040';
    if (modal) modal.style.zIndex = '12045';
  }

  function makeTablesScrollable() {
    $$('table.tabela-comparativa, .tabela-comparativa').forEach(t => {
      t.style.display = 'block';
      t.style.overflowX = 'auto';
      t.style.webkitOverflowScrolling = 'touch';
      t.style.whiteSpace = 'nowrap';
      t.dataset._tableMobile = '1';
    });
  }

  function restoreTables() {
    $$('[data-_tableMobile]').forEach(t => {
      t.style.display = '';
      t.style.overflowX = '';
      t.style.webkitOverflowScrolling = '';
      t.style.whiteSpace = '';
      delete t.dataset._tableMobile;
    });
  }

  function ensureNavScrollable() {
    const nav = $('.nav-menu');
    if (!nav) return;
    nav.style.overflowX = 'auto';
    nav.style.webkitOverflowScrolling = 'touch';
    nav.style.whiteSpace = 'nowrap';
    nav.style.gap = nav.style.gap || '10px';
    // ensure links don't shrink
    $$('.nav-menu .nav-link').forEach(a => {
      a.style.flex = '0 0 auto';
      a.style.display = 'inline-block';
    });
  }

  function restoreNav() {
    const nav = $('.nav-menu');
    if (!nav) return;
    nav.style.overflowX = '';
    nav.style.webkitOverflowScrolling = '';
    nav.style.whiteSpace = '';
    $$('.nav-menu .nav-link').forEach(a => {
      a.style.flex = '';
      a.style.display = '';
    });
  }

  /* Services-specific tweaks */
  function initServicesTweaks() {
    // stack plan cards, fix hero overflow and keep CTA hidden
    const planos = document.querySelector('.planos-cards');
    if (planos) {
      planos.style.display = 'flex';
      planos.style.flexDirection = 'column';
      planos.style.gap = '20px';
      planos.style.alignItems = 'center';
      planos.dataset._planosMobile = '1';
    }
    $$('.plano-card').forEach(card => {
      card.style.width = '100%';
      card.style.maxWidth = '420px';
      card.style.margin = '0 auto';
      card.dataset._planoCard = '1';
    });

    $$('.servicos-hero, .hero').forEach(h => {
      h.style.boxSizing = 'border-box';
      h.style.maxWidth = '100%';
      h.style.overflowX = 'visible';
      h.dataset._heroMobile = '1';
    });

    // hide CTA just on this page (reinforce)
    hideCTA();
  }

  function teardownServicesTweaks() {
    const planos = document.querySelector('.planos-cards');
    if (planos && planos.dataset._planosMobile) {
      planos.style.display = '';
      planos.style.flexDirection = '';
      planos.style.gap = '';
      planos.style.alignItems = '';
      delete planos.dataset._planosMobile;
    }
    $$('[data-_planoCard]').forEach(el => {
      el.style.width = '';
      el.style.maxWidth = '';
      el.style.margin = '';
      delete el.dataset._planoCard;
    });
    $$('[data-_heroMobile]').forEach(h => {
      h.style.boxSizing = '';
      h.style.maxWidth = '';
      h.style.overflowX = '';
      delete h.dataset._heroMobile;
    });
    restoreCTA();
  }

  /* Init / teardown controlled by media query */
  function initMobile() {
    setHeaderHeightVar();
    hideCTA();
    setupFaqToggle();
    setupModal();
    makeTablesScrollable();
    ensureNavScrollable();

    // detect services page by presence of planos-cards or tabela-comparativa
    if ($('.planos-cards') || $('.tabela-comparativa')) {
      initServicesTweaks();
    }
  }

  function teardownMobile() {
    // revert what we changed
    document.documentElement.style.setProperty('--header-height', '0px');
    teardownFaq();
    teardownFaqToggle();
    restoreTables();
    restoreNav();
    teardownServicesTweaks();
    restoreCTA();
  }

  function teardownFaq() {
    // nothing heavy to teardown; handlers remain harmless
  }

  // unified handler for mq changes
  function handleMqChange() {
    if (mq.matches) {
      initMobile();
    } else {
      teardownMobile();
    }
  }

  // initial run and listeners
  window.addEventListener('load', handleMqChange);
  window.addEventListener('resize', debounce(handleMqChange, 120));
  window.addEventListener('orientationchange', debounce(handleMqChange, 160));
  if (mq.addEventListener) mq.addEventListener('change', handleMqChange);
  else if (mq.addListener) mq.addListener(handleMqChange);

  // expose a small API (optional) for manual control in console/tests
  window.__mobileBehavior = {
    initMobile,
    teardownMobile,
    isMobile: () => mq.matches
  };


})();