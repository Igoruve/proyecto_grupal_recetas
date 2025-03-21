document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.getElementById("section__nav__text");

    hamburger.addEventListener("click", function() {
        this.classList.toggle("active");
        menu.classList.toggle("show");
    });
});
