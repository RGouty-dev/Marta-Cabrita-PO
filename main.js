/* Marta Cabrita · Personal Organizer — interações leves, sem dependências */
(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu');

  /* ---------- Menu móvel ---------- */
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Fechar menu' : 'Abrir menu';
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });

  /* ---------- Sombra do cabeçalho ao fazer scroll ---------- */
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  Object.assign(sentinel.style, { position: 'absolute', top: '0', width: '1px', height: '1px' });
  document.body.prepend(sentinel);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);

    /* ---------- Revelar secções ---------- */
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    /* ---------- Link ativo na navegação ---------- */
    const links = new Map(
      [...nav.querySelectorAll('a[href^="#"]:not(.btn)')].map((a) => [a.hash.slice(1), a])
    );
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = links.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Formulário (sem servidor: abre o email já preenchido) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const validators = {
      nome: (v) => v.trim().length >= 2,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      mensagem: (v) => v.trim().length >= 5,
    };

    const validateField = (name) => {
      const input = form.elements[name];
      const error = document.getElementById(`${name}-erro`);
      const ok = validators[name](input.value);
      input.setAttribute('aria-invalid', String(!ok));
      if (ok) input.removeAttribute('aria-describedby');
      else input.setAttribute('aria-describedby', error.id);
      error.hidden = ok;
      return ok;
    };

    Object.keys(validators).forEach((name) => {
      form.elements[name].addEventListener('blur', () => {
        if (form.elements[name].value) validateField(name);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = Object.keys(validators).map(validateField);
      if (results.includes(false)) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }
      const data = new FormData(form);
      const subject = `Pedido de contacto: ${data.get('servico')}`;
      const body = [
        `Nome: ${data.get('nome')}`,
        `Email: ${data.get('email')}`,
        `Serviço: ${data.get('servico')}`,
        '',
        data.get('mensagem'),
      ].join('\n');
      window.location.href =
        `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* ---------- Ano no rodapé ---------- */
  const year = document.getElementById('ano');
  if (year) year.textContent = new Date().getFullYear();
})();
