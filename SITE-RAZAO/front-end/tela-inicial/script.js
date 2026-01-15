document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       FAQ – Abrir e fechar itens
    ============================ */
    const items = document.querySelectorAll(".faq-item");

    if (items.length > 0) {
        items.forEach(item => {
            item.addEventListener("click", () => {
                item.classList.toggle("active");
            });
        });
    }

    /* ===========================
       MODAL DO CHAT
    ============================ */
    const openBtn = document.getElementById("openModalChat");
    const closeBtn = document.getElementById("closeModalChat");
    const modal = document.getElementById("chatModal");
    const overlay = document.getElementById("chatOverlay");
    const form = document.getElementById("chatForm");

    if (openBtn && modal && overlay) {
        openBtn.addEventListener("click", () => {
            modal.style.display = "block";
            overlay.style.display = "block";
        });
    }

    if (closeBtn && modal && overlay) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            overlay.style.display = "none";
        });
    }

    if (overlay && modal) {
        overlay.addEventListener("click", () => {
            modal.style.display = "none";
            overlay.style.display = "none";
        });
    }

    /* ===========================
       FORMULÁRIO DO CHAT
    ============================ */
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            alert("Enviado com sucesso!");

            // Ex.: redirecionar
            // window.location.href = "obrigado.html";
        });
    }

    /* ===========================
       CTA – Esconder ao chegar no rodapé
    ============================ */
    const cta = document.querySelector(".cta-area");

    if (cta) {
        const esconderCTA = () => {
            const pageHeight = document.body.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            if (scrollY + windowHeight >= pageHeight - 40) {
                cta.classList.add("hide");
            } else {
                cta.classList.remove("hide");
            }
        };

        document.addEventListener("scroll", esconderCTA);
        esconderCTA(); // executa a primeira vez
    }

});
