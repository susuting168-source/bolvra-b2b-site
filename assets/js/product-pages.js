const menu = document.querySelector('.pp-menu');
const nav = document.querySelector('.pp-nav');
menu?.setAttribute('aria-expanded', 'false');
menu?.setAttribute('aria-controls', 'product-navigation');
nav?.setAttribute('id', 'product-navigation');
menu?.addEventListener('click', () => {
  nav?.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', nav?.classList.contains('is-open') ? 'true' : 'false');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open menu');
}));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !nav?.classList.contains('is-open')) return;
  nav.classList.remove('is-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open menu');
});
