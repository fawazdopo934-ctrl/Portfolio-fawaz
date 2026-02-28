// js/main.js
document.addEventListener("DOMContentLoaded", function () {
  // Loader
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500);

  // Curseur personnalisé
  const cursor1 = document.querySelector(".cursor-1");
  const cursor2 = document.querySelector(".cursor-2");

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor1.style.left = e.clientX + "px";
      cursor1.style.top = e.clientY + "px";
      cursor2.style.left = e.clientX + "px";
      cursor2.style.top = e.clientY + "px";
    });

    document
      .querySelectorAll("a, button, .btn, .project-card, .service-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor2.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
          cursor2.classList.remove("hover");
        });
      });
  }

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Menu mobile
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Fermer le menu au clic sur un lien
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  });

  // Back to top
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth scroll pour tous les liens
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Validation formulaire
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.querySelector(".form-success");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    // Réinitialiser les erreurs
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
      group.querySelector(".error-message").textContent = "";
    });

    // Validation nom
    if (!name.value.trim()) {
      showError(name, "Le nom est requis");
      isValid = false;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, "L'email est requis");
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, "Email invalide");
      isValid = false;
    }

    // Validation sujet
    if (!subject.value.trim()) {
      showError(subject, "Le sujet est requis");
      isValid = false;
    }

    // Validation message
    if (!message.value.trim()) {
      showError(message, "Le message est requis");
      isValid = false;
    }

    if (isValid) {
      // Simulation envoi EmailJS
      formSuccess.classList.remove("hidden");
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.add("hidden");
      }, 3000);
    }
  });

  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.classList.add("error");
    formGroup.querySelector(".error-message").textContent = message;
  }

  // Particules en background (optionnel)
  function createParticles() {
    const particles = document.createElement("div");
    particles.className = "particles";

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.width = particle.style.height =
        Math.random() * 5 + 2 + "px";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = Math.random() * 10 + 20 + "s";
      particles.appendChild(particle);
    }

    document.body.appendChild(particles);
  }

  createParticles();
});

// BOUTIQUE
// À AJOUTER DANS js/main.js

// Gestion de la boutique
document.addEventListener("DOMContentLoaded", function () {
  // Variables du panier
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentProduct = null;

  // Mettre à jour l'affichage du panier
  updateCartDisplay();

  // Filtres boutique
  const shopFilterBtns = document.querySelectorAll("[data-shop-filter]");
  const productCards = document.querySelectorAll(".product-card");

  shopFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      shopFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-shop-filter");

      productCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");

        if (filter === "all" || categories.includes(filter)) {
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

  // Recherche
  const searchInput = document.getElementById("shop-search");

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    productCards.forEach((card) => {
      const productName = card.getAttribute("data-name").toLowerCase();

      if (productName.includes(searchTerm) || searchTerm === "") {
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

  // Aperçu rapide
  const quickViewBtns = document.querySelectorAll(".quick-view-btn");
  const productModal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.querySelector(".modal-close");

  const productDetails = {
    1: {
      name: "E-commerce Laravel",
      price: "35 000 FCFA",
      image:
        "https://via.placeholder.com/500x300/0f172a/3b82f6?text=E-commerce",
      description: "Site e-commerce complet avec :",
      features: [
        "Gestion des produits",
        "Panier d'achat",
        "Paiement en ligne",
        "Administration complète",
        "Commandes et factures",
        "Dashboard statistiques",
      ],
    },
    2: {
      name: "Application Météo Flutter",
      price: "25 000 FCFA",
      image:
        "https://via.placeholder.com/500x300/111827/7c3aed?text=Weather+App",
      description: "Application météo avec :",
      features: [
        "API météo en temps réel",
        "Géolocalisation",
        "Prévisions 7 jours",
        "Animations météo",
        "Favoris multiples",
        "Mode hors ligne",
      ],
    },
    3: {
      name: "Dashboard React",
      price: "30 000 FCFA",
      image: "https://via.placeholder.com/500x300/0f172a/06b6d4?text=Dashboard",
      description: "Dashboard administrateur avec :",
      features: [
        "Graphiques interactifs",
        "Tableaux dynamiques",
        "Gestion des utilisateurs",
        "Export de données",
        "Thèmes personnalisables",
        "Notifications en temps réel",
      ],
    },
    4: {
      name: "Application Chat",
      price: "40 000 FCFA",
      image: "https://via.placeholder.com/500x300/111827/38bdf8?text=Chat+App",
      description: "Application de messagerie avec :",
      features: [
        "Messages en temps réel",
        "Conversations privées",
        "Groupes de discussion",
        "Envoi de fichiers",
        "Emojis et réactions",
        "Notifications push",
      ],
    },
    5: {
      name: "Système de Blog",
      price: "20 000 FCFA",
      image: "https://via.placeholder.com/500x300/0f172a/3b82f6?text=Blog",
      description: "Blog complet avec :",
      features: [
        "CMS intuitif",
        "Commentaires",
        "Catégories et tags",
        "SEO optimisé",
        "Newsletter",
        "Statistiques visites",
      ],
    },
    6: {
      name: "Portfolio React",
      price: "25 000 FCFA",
      image:
        "https://via.placeholder.com/500x300/111827/7c3aed?text=Portfolio+React",
      description: "Template portfolio avec :",
      features: [
        "Design moderne",
        "Animations fluides",
        "Mode sombre",
        "Responsive",
        "Optimisation SEO",
        "Formulaire contact",
      ],
    },
    7: {
      name: "Application Fitness",
      price: "35 000 FCFA",
      image:
        "https://via.placeholder.com/500x300/0f172a/06b6d4?text=Fitness+App",
      description: "App de fitness avec :",
      features: [
        "Suivi d'entraînement",
        "Bibliothèque d'exercices",
        "Statistiques progression",
        "Programmes personnalisés",
        "Rappels quotidiens",
        "Mode hors ligne",
      ],
    },
    8: {
      name: "Système de Réservation",
      price: "40 000 FCFA",
      image:
        "https://via.placeholder.com/500x300/111827/38bdf8?text=Booking+System",
      description: "Plateforme de réservation avec :",
      features: [
        "Calendrier interactif",
        "Gestion des disponibilités",
        "Paiements sécurisés",
        "Notifications automatiques",
        "Dashboard admin",
        "Export de rapports",
      ],
    },
  };

  quickViewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-product");
      const product = productDetails[productId];

      modalBody.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="product-price">${product.price}</p>
                <p>${product.description}</p>
                <div class="product-details">
                    <ul>
                        ${product.features
                          .map(
                            (feature) => `
                            <li><i class="fas fa-check-circle"></i> ${feature}</li>
                        `,
                          )
                          .join("")}
                    </ul>
                </div>
                <button class="btn btn-primary add-to-cart-modal" data-product="${productId}">
                    <i class="fas fa-shopping-cart"></i> Ajouter au panier
                </button>
            `;

      productModal.classList.add("active");
      currentProduct = productId;

      // Ajouter au panier depuis le modal
      document
        .querySelector(".add-to-cart-modal")
        .addEventListener("click", () => {
          addToCart(productId);
          productModal.classList.remove("active");
        });
    });
  });

  modalClose.addEventListener("click", () => {
    productModal.classList.remove("active");
  });

  productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
      productModal.classList.remove("active");
    }
  });

  // Panier
  const cartToggle = document.getElementById("cart-toggle");
  const cartPanel = document.getElementById("cart-panel");
  const cartClose = document.getElementById("cart-close");

  cartToggle.addEventListener("click", () => {
    cartPanel.classList.toggle("active");
  });

  cartClose.addEventListener("click", () => {
    cartPanel.classList.remove("active");
  });

  // Ajouter au panier
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = btn.getAttribute("data-product");
      addToCart(productId);

      // Animation du bouton
      btn.style.transform = "scale(1.5)";
      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 200);
    });
  });

  function addToCart(productId) {
    const product = productDetails[productId];
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: parseInt(product.price.replace(/[^0-9]/g, "")),
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();

    // Afficher le panier
    cartPanel.classList.add("active");

    // Animation du compteur
    const cartCount = document.getElementById("cart-count");
    cartCount.style.transform = "scale(1.5)";
    setTimeout(() => {
      cartCount.style.transform = "scale(1)";
    }, 200);
  }

  function updateCartDisplay() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
      cartTotal.textContent = "0 FCFA";
    } else {
      let total = 0;
      let itemsHtml = "";

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        itemsHtml += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">${item.price.toLocaleString()} FCFA</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
      });

      cartItems.innerHTML = itemsHtml;
      cartTotal.textContent = total.toLocaleString() + " FCFA";

      // Gestionnaires d'événements pour les quantités
      document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
        btn.addEventListener("click", () =>
          updateQuantity(btn.getAttribute("data-id"), -1),
        );
      });

      document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
        btn.addEventListener("click", () =>
          updateQuantity(btn.getAttribute("data-id"), 1),
        );
      });

      document.querySelectorAll(".cart-item-remove").forEach((btn) => {
        btn.addEventListener("click", () =>
          removeFromCart(btn.getAttribute("data-id")),
        );
      });
    }
  }

  function updateQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
      }
    }
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }

  // Checkout
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutClose = document.querySelector(".checkout-close");

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    // Remplir le résumé de commande
    const orderSummary = document.getElementById("order-summary");
    let total = 0;
    let summaryHtml = "<h4>Récapitulatif</h4>";

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      summaryHtml += `
                <div class="order-summary-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>${itemTotal.toLocaleString()} FCFA</span>
                </div>
            `;
    });

    summaryHtml += `
            <div class="order-summary-total">
                <span>Total</span>
                <span>${total.toLocaleString()} FCFA</span>
            </div>
        `;

    orderSummary.innerHTML = summaryHtml;

    checkoutModal.classList.add("active");
  });

  checkoutClose.addEventListener("click", () => {
    checkoutModal.classList.remove("active");
  });

  checkoutModal.addEventListener("click", (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.remove("active");
    }
  });

  // Gestionnaire du formulaire de commande
  const checkoutForm = document.getElementById("checkout-form");

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupérer les données
    const name = document.getElementById("checkout-name").value;
    const email = document.getElementById("checkout-email").value;
    const phone = document.getElementById("checkout-phone").value;
    const payment = document.getElementById("checkout-payment").value;
    const promo = document.getElementById("checkout-promo").value;

    // Calculer le total
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Simuler l'envoi
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Commande confirmée !</h3>
            <p>Merci ${name} !</p>
            <p>Un email de confirmation a été envoyé à ${email}</p>
            <p>Total payé : ${total.toLocaleString()} FCFA via ${getPaymentMethod(payment)}</p>
        `;

    document.body.appendChild(successMessage);

    // Vider le panier
    cart = [];
    localStorage.removeItem("cart");
    updateCartDisplay();

    // Fermer le modal
    checkoutModal.classList.remove("active");

    // Supprimer le message après 5 secondes
    setTimeout(() => {
      successMessage.remove();
    }, 5000);

    // Réinitialiser le formulaire
    checkoutForm.reset();
  });

  function getPaymentMethod(method) {
    const methods = {
      orange: "Orange Money",
      moov: "Moov Money",
      tmoney: "T-Money",
      paypal: "PayPal",
    };
    return methods[method] || method;
  }

  // Fermer le panier en cliquant dehors
  document.addEventListener("click", (e) => {
    if (
      !cartPanel.contains(e.target) &&
      !cartToggle.contains(e.target) &&
      cartPanel.classList.contains("active")
    ) {
      cartPanel.classList.remove("active");
    }
  });
});
