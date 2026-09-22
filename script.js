(() => {
    'use strict';

    const doc = document;

    const header = doc.querySelector('[data-header]');
    const menuToggle = doc.querySelector('[data-menu-toggle]');
    const menu = doc.querySelector('[data-menu]');
    const revealItems = [...doc.querySelectorAll('.reveal')];
    const parallaxItems = [...doc.querySelectorAll('[data-parallax]')];
    const profileMedia = doc.querySelector('[data-profile-media]');
    const profileImage = doc.querySelector('[data-profile-image]');
    const currentYear = doc.querySelector('[data-current-year]');
    const whatsappFloat = doc.querySelector('[data-whatsapp-float]');
    const finalCta = doc.querySelector('[data-final-cta]');
    const resultNumber = doc.querySelector('[data-result-number]');

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const closeMenu = () => {
        if (!menu || !menuToggle) return;

        menu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    };

    const openMenu = () => {
        if (!menu || !menuToggle) return;

        menu.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Fechar menu');
    };

    if (menu && menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen =
                menuToggle.getAttribute('aria-expanded') === 'true';

            isOpen ? closeMenu() : openMenu();
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        doc.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        doc.addEventListener('click', (event) => {
            const isOpen =
                menuToggle.getAttribute('aria-expanded') === 'true';

            if (!isOpen) return;

            if (
                menu.contains(event.target) ||
                menuToggle.contains(event.target)
            ) {
                return;
            }

            closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        });
    }

    /* =====================================================
       HEADER AO ROLAR
       ===================================================== */

    const updateHeader = () => {
        if (!header) return;

        header.classList.toggle(
            'is-scrolled',
            window.scrollY > 10
        );
    };

    updateHeader();

    window.addEventListener(
        'scroll',
        updateHeader,
        { passive: true }
    );

    /* =====================================================
       ANIMAÇÕES REVEAL
       ===================================================== */

    const showAllRevealItems = () => {
        revealItems.forEach((item) => {
            item.classList.add('is-visible');
        });
    };

    revealItems.forEach((item) => {
        const delay = Number(item.dataset.delay || 0);

        if (Number.isFinite(delay) && delay > 0) {
            item.style.setProperty(
                '--reveal-delay',
                `${delay}ms`
            );
        }
    });

    if (
        reduceMotion ||
        !('IntersectionObserver' in window)
    ) {
        showAllRevealItems();
    } else {
        try {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add(
                            'is-visible'
                        );

                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.08,
                    rootMargin: '0px 0px -6% 0px'
                }
            );

            revealItems.forEach((item) => {
                revealObserver.observe(item);
            });

            /*
             * Garante que elementos que já estejam na tela
             * no primeiro carregamento apareçam imediatamente.
             * Isso ajuda principalmente no mobile.
             */
            requestAnimationFrame(() => {
                revealItems.forEach((item) => {
                    const rect =
                        item.getBoundingClientRect();

                    const isVisible =
                        rect.top < window.innerHeight &&
                        rect.bottom > 0;

                    if (isVisible) {
                        item.classList.add('is-visible');
                        revealObserver.unobserve(item);
                    }
                });
            });
        } catch (error) {
            console.warn(
                'Falha ao iniciar animações:',
                error
            );

            /*
             * Se a animação der qualquer erro,
             * mostramos tudo em vez de deixar
             * o conteúdo invisível.
             */
            showAllRevealItems();
        }
    }

    /* =====================================================
       FOTO DO PERFIL
       ===================================================== */

    if (profileMedia && profileImage) {
        const showFallback = () => {
            profileMedia.classList.add('is-missing');
        };

        const showImage = () => {
            profileMedia.classList.remove('is-missing');
        };

        profileImage.addEventListener(
            'error',
            showFallback
        );

        profileImage.addEventListener(
            'load',
            showImage
        );

        /*
         * A imagem pode ter terminado de carregar
         * antes da criação dos listeners.
         */
        if (profileImage.complete) {
            if (profileImage.naturalWidth > 0) {
                showImage();
            } else {
                showFallback();
            }
        }
    }

    /* =====================================================
       ANO AUTOMÁTICO DO RODAPÉ
       ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }

    /* =====================================================
       ANIMAÇÃO DO RESULTADO -59%
       ===================================================== */

    if (
        resultNumber &&
        !reduceMotion &&
        'IntersectionObserver' in window
    ) {
        let animated = false;

        const resultObserver =
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (
                            !entry.isIntersecting ||
                            animated
                        ) {
                            return;
                        }

                        animated = true;

                        const duration = 900;
                        const target = 59;
                        const startTime =
                            performance.now();

                        const animate = (now) => {
                            const progress = Math.min(
                                (now - startTime) /
                                    duration,
                                1
                            );

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );

                            const value = Math.round(
                                target * eased
                            );

                            resultNumber.textContent =
                                `−${value}%`;

                            if (progress < 1) {
                                requestAnimationFrame(
                                    animate
                                );
                            }
                        };

                        requestAnimationFrame(animate);

                        observer.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.45
                }
            );

        resultObserver.observe(resultNumber);
    }

    /* =====================================================
       PARALLAX
       ===================================================== */

    if (
        parallaxItems.length &&
        !reduceMotion
    ) {
        let ticking = false;

        const updateParallax = () => {
            /*
             * No mobile deixamos sem parallax.
             * Melhora desempenho e evita glitches
             * durante o scroll no Safari/Chrome.
             */
            if (window.innerWidth <= 900) {
                parallaxItems.forEach((item) => {
                    item.style.transform = '';
                });

                ticking = false;
                return;
            }

            const scrollY = window.scrollY;

            parallaxItems.forEach((item) => {
                const factor = Number(
                    item.dataset.parallax || 0
                );

                if (!Number.isFinite(factor)) {
                    return;
                }

                const offset =
                    scrollY * factor;

                item.style.transform =
                    `translate3d(0, ${offset}px, 0)`;
            });

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (ticking) return;

            ticking = true;

            requestAnimationFrame(
                updateParallax
            );
        };

        updateParallax();

        window.addEventListener(
            'scroll',
            requestParallaxUpdate,
            { passive: true }
        );

        window.addEventListener(
            'resize',
            requestParallaxUpdate
        );
    }

    /* =====================================================
       WHATSAPP FLUTUANTE
       ===================================================== */

    if (
        whatsappFloat &&
        finalCta &&
        'IntersectionObserver' in window
    ) {
        const ctaObserver =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        whatsappFloat.classList.toggle(
                            'is-hidden',
                            entry.isIntersecting
                        );
                    });
                },
                {
                    threshold: 0.12
                }
            );

        ctaObserver.observe(finalCta);
    }

    /* =====================================================
       TRACKING DOS BOTÕES
       ===================================================== */

    doc.querySelectorAll('[data-track]')
        .forEach((element) => {
            element.addEventListener(
                'click',
                () => {
                    const eventName =
                        element.dataset.track;

                    if (!eventName) return;

                    /*
                     * Google Tag Manager
                     */
                    if (
                        Array.isArray(
                            window.dataLayer
                        )
                    ) {
                        window.dataLayer.push({
                            event: 'site_click',
                            click_name: eventName
                        });
                    }

                    /*
                     * Meta Pixel
                     */
                    if (
                        typeof window.fbq ===
                        'function'
                    ) {
                        window.fbq(
                            'trackCustom',
                            'SiteClick',
                            {
                                click_name:
                                    eventName
                            }
                        );
                    }
                }
            );
        });

    /* =====================================================
       FALLBACK EXTRA PARA O MOBILE
       ===================================================== */

    window.addEventListener(
        'load',
        () => {
            /*
             * Proteção extra:
             * se algum navegador mobile não processar
             * corretamente o IntersectionObserver,
             * o conteúdo próximo da tela nunca ficará
             * preso em opacity: 0.
             */
            window.setTimeout(() => {
                revealItems.forEach(
                    (item) => {
                        const rect =
                            item.getBoundingClientRect();

                        if (
                            rect.top <
                            window.innerHeight *
                                1.15
                        ) {
                            item.classList.add(
                                'is-visible'
                            );
                        }
                    }
                );
            }, 1200);
        }
    );
})();
