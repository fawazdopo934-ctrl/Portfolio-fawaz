// js/filter.js
document.addEventListener("DOMContentLoaded", function () {
  // Filtre des compétences
  const skillFilterBtns = document.querySelectorAll("#skills .filter-btn");
  const skillCards = document.querySelectorAll("#skills .skill-card");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Retirer la classe active de tous les boutons
      skillFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Filtre des projets
  const projectFilterBtns = document.querySelectorAll("#projects .filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Animation du filtre
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => (btn.style.transform = "scale(1)"));
      this.style.transform = "scale(1.1)";

      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  });
});
