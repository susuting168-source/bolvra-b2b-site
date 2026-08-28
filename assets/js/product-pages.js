const menu = document.querySelector('.pp-menu');
const nav = document.querySelector('.pp-nav');
menu?.setAttribute('aria-expanded', 'false');
menu?.setAttribute('aria-controls', 'product-navigation');
nav?.setAttribute('id', 'product-navigation');
nav?.setAttribute('aria-label', 'Product navigation');
menu?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open') || false;
  menu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
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
