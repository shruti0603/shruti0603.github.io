(() => {
  'use strict';

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const desktopQuery = window.matchMedia('(min-width: 900px)');

  const setMenu = (open) => {
    if (!menuToggle || !navMenu) return;
    navMenu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenu(false);
      }
    });

    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) setMenu(false);
    });
  }

  /* ---------- Highlight the current section in the nav ---------- */
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const setCurrent = (id) => {
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    // A section counts as "current" while it crosses the middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    // Clear the highlight when the hero is on screen
    const hero = document.getElementById('home');
    if (hero) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) links.forEach((link) => link.removeAttribute('aria-current'));
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      ).observe(hero);
    }
  }

  /* ---------- Copy email ---------- */
  const copyButton = document.getElementById('copyEmail');
  const copyStatus = document.getElementById('copyStatus');

  if (copyButton) {
    const email = copyButton.dataset.email;
    const label = copyButton.textContent;
    let resetTimer;

    const copyText = async (text) => {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      // Fallback for older browsers and non-secure contexts
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(field);
      if (!ok) throw new Error('Copy failed');
    };

    const show = (text) => {
      copyButton.textContent = text;
      if (copyStatus) copyStatus.textContent = text === label ? '' : text;
    };

    const announce = (text) => {
      show(text);
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => show(label), 2200);
    };

    // Only show the button when there is a way to copy
    if ((navigator.clipboard && window.isSecureContext) || document.queryCommandSupported?.('copy')) {
      copyButton.hidden = false;
    }

    copyButton.addEventListener('click', async () => {
      try {
        await copyText(email);
        announce('Copied');
      } catch (error) {
        announce('Copy failed. Use the link instead');
      }
    });
  }
})();
