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

// FECHAR (botão X)
document.getElementById("closeModalChat").onclick = () => {
    document.getElementById("chatModal").style.display = "none";
    document.getElementById("chatOverlay").style.display = "none";
};

// FECHAR clicando fora
document.getElementById("chatOverlay").onclick = () => {
    document.getElementById("chatModal").style.display = "none";
    document.getElementById("chatOverlay").style.display = "none";
};

// FORM - evitar envio nulo e redirecionar
document.getElementById("chatForm").addEventListener("submit", (e) => {
    const campos = document.querySelectorAll("#chatForm [required]");
    let valido = true;

    campos.forEach(campo => {
        if (!campo.value.trim()) {
            valido = false;
            campo.style.border = "2px solid red";
        } else {
            campo.style.border = "1px solid #ccc";
        }
    });

    if (!valido) {
        e.preventDefault();
        alert("Preencha todos os campos obrigatórios!");
    }
});

document.addEventListener("scroll", () => {

    const cta = document.querySelector(".cta-area");

    // Altura total da página
    const pageHeight = document.body.scrollHeight;

    // Altura visível da janela
    const windowHeight = window.innerHeight;

    // Quanto o usuário já rolou
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

    // ---- 1. ESCONDE CTA AO CHEGAR NO RODAPÉ ----
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

    // ---- 2. ESCONDE CTA AO ABRIR O CHAT ----
    btnOpenChat.addEventListener("click", () => {
        chatModal.style.display = "flex";
        cta.classList.add("hide");
    });

    // ---- 3. MOSTRA CTA AO FECHAR O CHAT ----
    btnCloseChat.addEventListener("click", () => {
        chatModal.style.display = "none";
        cta.classList.remove("hide");
    });

});


