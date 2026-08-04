(() => {
    "use strict";

    const doc = document;
    const root = doc.documentElement;
    const body = doc.body;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /**
     * Atualiza o ano do rodapé.
     */
    const yearElement = doc.querySelector("[data-current-year]");
    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }

    /**
     * Cabeçalho com estado de rolagem.
     */
    const header = doc.querySelector("[data-header]");

    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /**
     * Menu mobile acessível.
     */
    const menuToggle = doc.querySelector("[data-menu-toggle]");
    const menu = doc.querySelector("[data-menu]");

    const setMenuState = (isOpen) => {
        if (!menuToggle || !menu) return;

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        menu.classList.toggle("is-open", isOpen);
        body.classList.toggle("menu-open", isOpen);
    };

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            setMenuState(!isOpen);
        });

        menu.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", () => setMenuState(false));
        });

        doc.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuState(false);
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                setMenuState(false);
            }
        });
    }

    /**
     * Animações de entrada com IntersectionObserver.
     */
    const revealElements = doc.querySelectorAll(".reveal");

    revealElements.forEach((element) => {
        const delay = Number(element.dataset.delay || 0);
        element.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -40px"
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    /**
     * Movimento sutil dos elementos do hero.
     * O efeito é desativado em telas menores e para quem prefere menos movimento.
     */
    const parallaxElements = [...doc.querySelectorAll("[data-parallax]")];
    let parallaxFrame = null;

    const applyParallax = (event) => {
        if (
            prefersReducedMotion.matches ||
            window.innerWidth <= 900 ||
            parallaxElements.length === 0
        ) {
            return;
        }

        const x = event.clientX - window.innerWidth / 2;
        const y = event.clientY - window.innerHeight / 2;

        if (parallaxFrame) {
            cancelAnimationFrame(parallaxFrame);
        }

        parallaxFrame = requestAnimationFrame(() => {
            parallaxElements.forEach((element) => {
                const factor = Number(element.dataset.parallax || 0);
                const translateX = x * factor;
                const translateY = y * factor;

                element.style.transform =
                    `translate3d(${translateX}px, ${translateY}px, 0)`;
            });
        });
    };

    const resetParallax = () => {
        parallaxElements.forEach((element) => {
            element.style.transform = "";
        });
    };

    window.addEventListener("pointermove", applyParallax, { passive: true });
    window.addEventListener("blur", resetParallax);

    prefersReducedMotion.addEventListener?.("change", (event) => {
        if (event.matches) resetParallax();
    });

    /**
     * FAQ: mantém somente uma pergunta aberta por vez.
     */
    const faqItems = [...doc.querySelectorAll(".faq-item")];

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });

    /**
     * Fallback da foto profissional.
     * O monograma aparece caso o arquivo foto-profissional.jpg não exista.
     */
    const profileImage = doc.querySelector("[data-profile-image]");
    const profileMedia = doc.querySelector("[data-profile-media]");

    const showProfileFallback = () => {
        if (profileMedia) {
            profileMedia.classList.add("is-missing");
        }
    };

    if (profileImage) {
        profileImage.addEventListener("error", showProfileFallback);

        if (profileImage.complete && profileImage.naturalWidth === 0) {
            showProfileFallback();
        }
    } else {
        showProfileFallback();
    }

    /**
     * Oculta o botão flutuante quando o hero ou o CTA final estão visíveis.
     */
    const whatsappFloat = doc.querySelector("[data-whatsapp-float]");
    const hero = doc.querySelector("[data-hero]");
    const finalCta = doc.querySelector("[data-final-cta]");

    if (
        whatsappFloat &&
        "IntersectionObserver" in window &&
        hero &&
        finalCta
    ) {
        const visibilityState = {
            hero: true,
            final: false
        };

        const updateFloatingButton = () => {
            const shouldHide = visibilityState.hero || visibilityState.final;
            whatsappFloat.classList.toggle("is-hidden", shouldHide);
        };

        const floatingObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === hero) {
                        visibilityState.hero = entry.isIntersecting;
                    }

                    if (entry.target === finalCta) {
                        visibilityState.final = entry.isIntersecting;
                    }
                });

                updateFloatingButton();
            },
            { threshold: 0.12 }
        );

        floatingObserver.observe(hero);
        floatingObserver.observe(finalCta);
        updateFloatingButton();
    }

    /**
     * Eventos de clique para GTM, GA4 e Meta Pixel.
     * O atributo data-track identifica a posição do CTA.
     */
    const trackedElements = doc.querySelectorAll("[data-track]");

    trackedElements.forEach((element) => {
        element.addEventListener("click", () => {
            const location = element.dataset.track || "unknown";

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "whatsapp_click",
                cta_location: location
            });

            if (typeof window.gtag === "function") {
                window.gtag("event", "whatsapp_click", {
                    cta_location: location
                });
            }

            if (typeof window.fbq === "function") {
                window.fbq("trackCustom", "WhatsAppClick", {
                    cta_location: location
                });
            }
        });
    });

    /**
     * Evita que links internos vazios ou inválidos provoquem erros.
     */
    doc.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = doc.querySelector(targetId);

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion.matches ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    root.classList.add("site-ready");
})();
