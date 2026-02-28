// js/animations.js
document.addEventListener("DOMContentLoaded", function () {
  // Effet machine à écrire
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor-type");

  const textArray = [
    "Développeur Web",
    "Développeur Mobile",
    "Laravel Expert",
    "React Developer",
    "Flutter Specialist",
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 1000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1,
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  setTimeout(type, newTextDelay + 250);

  // Scroll reveal avec Intersection Observer
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Compteur animé
  const statNumbers = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNumber = parseInt(target.getAttribute("data-target"));
          let currentNumber = 0;
          const increment = targetNumber / 50;

          const updateCounter = () => {
            if (currentNumber < targetNumber) {
              currentNumber += increment;
              target.textContent = Math.ceil(currentNumber);
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = targetNumber + "+";
            }
          };

          updateCounter();
          counterObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((num) => counterObserver.observe(num));

  // Lightbox pour les projets
  const projectLinks = document.querySelectorAll(".project-link .fa-search");

  projectLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const projectCard = link.closest(".project-card");
      const projectImage = projectCard.querySelector(".project-image img").src;
      const projectTitle = projectCard.querySelector("h3").textContent;

      const lightbox = document.createElement("div");
      lightbox.className = "lightbox active";
      lightbox.innerHTML = `
                <span class="lightbox-close">&times;</span>
                <div class="lightbox-content">
                    <img src="${projectImage}" alt="${projectTitle}">
                    <h3>${projectTitle}</h3>
                </div>
            `;

      document.body.appendChild(lightbox);

      lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", () => {
          lightbox.remove();
        });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    });
  });

  // Animation des barres de progression
  const progressBars = document.querySelectorAll(".progress");

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target;
          const percentage = progress.getAttribute("data-progress");
          progress.style.width = percentage + "%";
        }
      });
    },
    { threshold: 0.5 },
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));

  // Animation des cartes au survol
  const cards = document.querySelectorAll(
    ".service-card, .project-card, .skill-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
});
