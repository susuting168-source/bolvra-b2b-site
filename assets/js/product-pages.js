const menu = document.querySelector('.pp-menu');
const nav = document.querySelector('.pp-nav');
menu?.addEventListener('click', () => {
  nav?.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', nav?.classList.contains('is-open') ? 'true' : 'false');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('is-open')));
