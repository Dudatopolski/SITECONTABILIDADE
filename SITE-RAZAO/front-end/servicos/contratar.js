// Máscara telefone
document.getElementById("telefone").addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "");
    if (v.length <= 2) {
        this.value = `(${v}`;
    } else if (v.length <= 6) {
        this.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else if (v.length <= 10) {
        this.value = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    } else {
        this.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const btn = document.querySelector(".btn-submit");
    const btnText = document.querySelector(".btn-text");
    const loader = document.querySelector(".loader");

    form.addEventListener("submit", () => {
        btn.disabled = true;
        btnText.style.display = "none";
        loader.style.display = "inline-block";
    });
});


