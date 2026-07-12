const INQUIRY_EMAIL = "sales@bolvra.com";

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
navToggle?.addEventListener("click", () => nav?.classList.toggle("open"));
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => nav?.classList.remove("open")));

// Product category filtering: hover on the left menu to switch product groups
const categoryButtons = document.querySelectorAll(".cat-link[data-category]");
const products = document.querySelectorAll(".product-card");

function filterProducts(category) {
  categoryButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });

  products.forEach(card => {
    const categories = card.dataset.category || "";
    const shouldShow = category === "all" || categories.includes(category);
    card.hidden = !shouldShow;
  });
}

categoryButtons.forEach(btn => {
  const activate = () => {
    const category = btn.dataset.category;
    if (category) filterProducts(category);
  };
  btn.addEventListener("mouseenter", activate);
  btn.addEventListener("focus", activate);
  btn.addEventListener("click", activate);
});

// Featured card carousel + category link
(function initFeatureSlider(){
  const slider = document.querySelector("[data-feature-slider]");
  const track = document.querySelector("[data-feature-track]");
  if (!slider || !track) return;

  const originals = Array.from(track.children);
  const originalCount = originals.length;
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add("is-clone");
    track.appendChild(clone);
  });

  let offset = 0;
  let speed = window.innerWidth <= 720 ? 0.35 : 0.55;
  let singleSetWidth = 0;
  let rafId = null;
  let paused = false;

  function measure(){
    speed = window.innerWidth <= 720 ? 0.35 : 0.55;
    const cards = Array.from(track.children).slice(0, originalCount);
    singleSetWidth = cards.reduce((sum, card, index) => {
      const styles = getComputedStyle(card);
      const gap = index === cards.length - 1 ? 0 : parseFloat(getComputedStyle(track).gap || 18);
      return sum + card.getBoundingClientRect().width + gap;
    }, 0);
  }

  function loop(){
    if (!paused) {
      offset += speed;
      if (offset >= singleSetWidth) offset -= singleSetWidth;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    }
    rafId = requestAnimationFrame(loop);
  }

  function start(){
    cancelAnimationFrame(rafId);
    measure();
    loop();
  }

  slider.addEventListener("mouseenter", () => { paused = true; slider.classList.add("is-paused"); });
  slider.addEventListener("mouseleave", () => { paused = false; slider.classList.remove("is-paused"); });
  track.addEventListener("click", e => {
    const card = e.target.closest(".feature-card");
    if (!card) return;
    const category = card.dataset.featureCategory;
    if (category) {
      filterProducts(category);
      document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  window.addEventListener("resize", measure);
  start();
})();

// OEM & ODM interaction
const oemData = {
  panel: {
    title: "Custom Lock Panel",
    desc: "Customize logo, surface finish, color and front-panel appearance to match your brand identity.",
    visual: `<img class="oem-media oem-product-img" src="assets/images/optimized/face_alt.webp" alt="Custom lock panel">`
  },
  package: {
    title: "Custom Package",
    desc: "Customize your logo and company information on the packaging to enhance your brand image and market competitiveness.",
    visual: `<img class="oem-media" src="assets/images/generated/oem-package.webp" alt="Custom package">`
  },
  cards: {
    title: "Custom Smart Cards",
    desc: "Support customized IC cards, RFID cards and hotel cards with color printing and brand information.",
    visual: `<img class="oem-media" src="assets/images/generated/oem-cards.webp" alt="Custom smart cards">`
  },
  structure: {
    title: "Structure & Functions",
    desc: "Adjust mortise, unlock methods, handle structure and module combinations for different project needs.",
    visual: `<img class="oem-media" src="assets/images/generated/oem-structure.webp" alt="Custom structure and functions">`
  },
  software: {
    title: "App & Software",
    desc: "Support Tuya, TTLock and software integration discussions for smart home and project applications.",
    visual: `<img class="oem-media" src="assets/images/generated/oem-app.webp" alt="Tuya and TTLock smart lock app interface">`
  }
};
function setOem(key) {
  const item = oemData[key];
  if (!item) return;
  document.querySelectorAll(".oem-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.oem === key));
  const visual = document.querySelector("[data-oem-visual]");
  const title = document.querySelector("[data-oem-title]");
  const desc = document.querySelector("[data-oem-desc]");
  if (visual) visual.innerHTML = item.visual;
  if (title) title.textContent = item.title;
  if (desc) desc.textContent = item.desc;
}
document.querySelectorAll(".oem-tab").forEach(tab => {
  tab.addEventListener("mouseenter", () => setOem(tab.dataset.oem));
  tab.addEventListener("click", () => setOem(tab.dataset.oem));
});



// WhatsApp inquiry form
const WHATSAPP_NUMBER = "8615277383017";
const whatsappForm = document.querySelector('[data-whatsapp-form]');
const productField = whatsappForm?.querySelector('[name="productType"]');

function openWhatsAppInquiry(payload) {
  const lines = [
    'Hello BOLVRA team,',
    '',
    'I would like to request a quote.',
    '',
    `Customer Name: ${payload.customerName}`,
    `Company Name: ${payload.companyName}`,
    `Email Address: ${payload.email}`,
    `WhatsApp / Phone: ${payload.phone}`,
    `Product Type: ${payload.productType}`,
    `Estimated Quantity: ${payload.quantity}`,
    `Additional Requirements / Reference: ${payload.requirements}`
  ];
  const text = encodeURIComponent(lines.join('\n'));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

whatsappForm?.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(whatsappForm);
  const payload = Object.fromEntries(formData.entries());
  openWhatsAppInquiry(payload);
});

function focusInquiryForm(interest) {
  if (productField) {
    const options = Array.from(productField.options).map(opt => opt.value);
    const match = options.find(opt => opt && interest.toLowerCase().includes(opt.toLowerCase()));
    productField.value = match || 'Other';
  }
  const requirements = whatsappForm?.querySelector('[name="requirements"]');
  if (requirements && !requirements.value) {
    requirements.value = `Interested product: ${interest}`;
  }
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}




// Exhibition image carousel
(function initExhibitionSlider(){
  const slider = document.querySelector('[data-exhibition-slider]');
  const track = document.querySelector('[data-exhibition-track]');
  if (!slider || !track) return;

  const originals = Array.from(track.children);
  const originalCount = originals.length;
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('is-clone');
    track.appendChild(clone);
  });

  let offset = 0;
  let speed = window.innerWidth <= 720 ? 0.32 : 0.45;
  let singleSetWidth = 0;
  let rafId = null;
  let paused = false;

  function measure(){
    speed = window.innerWidth <= 720 ? 0.32 : 0.45;
    const cards = Array.from(track.children).slice(0, originalCount);
    const gap = parseFloat(getComputedStyle(track).gap || 16);
    singleSetWidth = cards.reduce((sum, card, index) => {
      return sum + card.getBoundingClientRect().width + (index === cards.length - 1 ? 0 : gap);
    }, 0);
  }

  function loop(){
    if (!paused) {
      offset += speed;
      if (offset >= singleSetWidth) offset -= singleSetWidth;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    }
    rafId = requestAnimationFrame(loop);
  }

  function start(){
    cancelAnimationFrame(rafId);
    measure();
    loop();
  }

  slider.addEventListener('mouseenter', () => { paused = true; slider.classList.add('is-paused'); });
  slider.addEventListener('mouseleave', () => { paused = false; slider.classList.remove('is-paused'); });
  window.addEventListener('resize', measure);
  start();
})();


// Product detail popup
const productDetails = {
  'BVR-6100': {
    description: 'A modern face-recognition smart lock designed for premium residential, villa and project applications. This model supports smarter monitoring and communication features for customers who want a more advanced smart-entry solution.',
    features: ['3D face recognition access', 'Motion monitoring with app alerts', 'Video intercom & 2-way audio'],
    gallery: [
      { src: 'CARD_IMAGE', alt: 'BVR-6100 main product image' },
      { src: 'assets/images/product-popup/bvr-6100-extra-1.webp', alt: 'BVR-6100 motion monitoring feature' },
      { src: 'assets/images/product-popup/bvr-6100-extra-2.webp', alt: 'BVR-6100 video and 2-way audio feature' }
    ]
  },
  'BVR-6000': {
    description: 'A smart handle lock built for convenient daily access and connected property management. A practical choice for homes, apartments, rental properties and distributor product lines.',
    features: ['WiFi smart access concept', 'Modern handle format', 'Suitable for residential and rental markets']
  },
  'BVR-5200': {
    description: 'A fingerprint door lock with TTLock and Tuya app options for connected access management. It supports fingerprint, passcode, IC card and mechanical key unlocking for homes, apartments and project supply.',
    features: ['TTLock / Tuya app unlock options', 'Fingerprint, passcode, card and key access', 'Free-handle safety design for daily use'],
    gallery: [
      { src: 'CARD_IMAGE', alt: 'BVR-5200 main product image' },
      { src: 'assets/images/product-popup/bvr-5200-extra-1.webp', alt: 'BVR-5200 free handle safety design' },
      { src: 'assets/images/product-popup/bvr-5200-extra-2.webp', alt: 'BVR-5200 five ways to unlock' }
    ]
  },
  'BVR-3100': {
    description: 'A slim door-lock solution focused on simple daily use and modern styling. It is positioned for distributors and installers serving residential and standard project applications.',
    features: ['Slim handle design', 'Simple access solution', 'Suitable for residential doors']
  },
  'BVR-9300': {
    description: 'A slim-profile smart lock solution for sliding and narrow-frame door applications. Designed for buyers serving aluminum-door, apartment and project markets.',
    features: ['Slim profile structure', 'Designed for narrow-frame applications', 'Suitable for project supply']
  },
  'BVR-8200': {
    description: 'A smart lock solution for glass-door and commercial access applications. A useful product option for offices, shops, meeting rooms and system-installation projects.',
    features: ['Commercial access application', 'Modern compact structure', 'Suitable for installer and project buyers'],
    gallery: [
      { src: 'CARD_IMAGE', alt: 'BVR-8200 main product image' },
      { src: 'assets/images/product-popup/bvr-8200-extra-1.webp', alt: 'BVR-8200 reliable dual power supply design' },
      { src: 'assets/images/product-popup/bvr-8200-extra-2.webp', alt: 'BVR-8200 waterproof outdoor design' }
    ]
  },
  'BVR-7100': {
    description: 'A connected smart lock solution with TTLock and Tuya app options for flexible access management. It supports fingerprint, passcode, IC card and mechanical key unlocking, and can be matched with multiple mortise lock body models for residential, rental and project installations.',
    features: ['TTLock / Tuya app unlock options', 'Fingerprint, passcode, card and key access', 'Supports multiple mortise lock body models'],
    gallery: [
      { src: 'CARD_IMAGE', alt: 'BVR-7100 main product image' },
      { src: 'assets/images/product-popup/bvr-7100-extra-1.webp', alt: 'BVR-7100 smart access and app unlock feature' },
      { src: 'assets/images/product-popup/bvr-7100-extra-2.webp', alt: 'BVR-7100 multiple mortise lock body compatibility' }
    ]
  },
  'BVR-3000': {
    description: 'A compact smart-security solution designed for flexible access applications. Its portable format makes it suitable for buyers looking to extend a broader smart-lock product range.',
    features: ['Compact smart-security format', 'Flexible access application', 'Complements a complete lock product range']
  }
};

const productModal = document.querySelector('[data-product-modal]');
const modalImage = productModal?.querySelector('[data-product-modal-image]');
const modalThumbs = productModal?.querySelector('[data-product-modal-thumbs]');
const modalTitle = productModal?.querySelector('[data-product-modal-title]');
const modalSubtitle = productModal?.querySelector('[data-product-modal-subtitle]');
const modalDescription = productModal?.querySelector('[data-product-modal-description]');
const modalFeatures = productModal?.querySelector('[data-product-modal-features]');
const modalQuote = productModal?.querySelector('[data-product-modal-quote]');
let lastProductTrigger = null;

function renderModalGallery(items, activeIndex = 0) {
  if (!modalImage || !modalThumbs || !items?.length) return;
  const safeIndex = Math.max(0, Math.min(activeIndex, items.length - 1));
  modalImage.src = items[safeIndex].src;
  modalImage.alt = items[safeIndex].alt || 'BOLVRA product image';
  modalThumbs.innerHTML = items.map((item, index) => `
    <button class="product-modal-thumb ${index === safeIndex ? 'is-active' : ''}" type="button" data-gallery-index="${index}" aria-label="View product image ${index + 1}">
      <img src="${item.src}" alt="${item.alt || 'Product thumbnail'}">
    </button>
  `).join('');
  modalThumbs.querySelectorAll('[data-gallery-index]').forEach(btn => {
    btn.addEventListener('click', () => renderModalGallery(items, Number(btn.dataset.galleryIndex || 0)));
  });
}

function openProductModal(card) {
  if (!productModal || !card) return;
  const title = card.querySelector('h3')?.textContent.trim() || 'BOLVRA Product';
  const subtitle = card.querySelector('p')?.textContent.trim() || 'Modern Door Lock';
  const image = card.querySelector('img');
  const detail = productDetails[title] || {
    description: 'A modern BOLVRA door-lock solution developed for distributors, installers and project buyers in growing global markets.',
    features: ['Modern design', 'Reliable quality positioning', 'Built for distributor and project supply']
  };
  lastProductTrigger = card;
  const gallery = (detail.gallery || []).map(item => ({
    src: item.src === 'CARD_IMAGE' ? (image?.src || '') : item.src,
    alt: item.alt || image?.alt || title
  })).filter(item => item.src);
  if (gallery.length) {
    renderModalGallery(gallery, 0);
  } else if (modalImage && image) {
    modalImage.src = image.src;
    modalImage.alt = image.alt || title;
    if (modalThumbs) modalThumbs.innerHTML = '';
  }
  if (modalTitle) modalTitle.textContent = title;
  if (modalSubtitle) modalSubtitle.textContent = subtitle;
  if (modalDescription) modalDescription.textContent = detail.description;
  if (modalFeatures) modalFeatures.innerHTML = detail.features.map(item => `<li>${item}</li>`).join('');
  if (modalQuote) {
    const text = encodeURIComponent(`Hello BOLVRA team,

I would like to get a quote for ${title} - ${subtitle}.

Please send me price, MOQ, lead time and available customization options.`);
    modalQuote.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }
  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden','false');
  document.body.classList.add('product-modal-open');
  productModal.querySelector('.product-modal-close')?.focus();
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('product-modal-open');
  lastProductTrigger?.focus();
}

document.querySelectorAll('.product-card-clickable').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    openProductModal(card);
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProductModal(card);
    }
  });
});

productModal?.querySelectorAll('[data-product-modal-close]').forEach(el => {
  el.addEventListener('click', closeProductModal);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && productModal?.classList.contains('is-open')) closeProductModal();
});
