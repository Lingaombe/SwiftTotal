const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert(`Thanks for subscribing, ${email}!`);
    newsletterForm.reset();
  });
}

const expandableCards = document.querySelectorAll('.product-card--clickable, .blog-card--clickable');
const productModal = document.querySelector('.product-modal');
const blogModal = document.querySelector('.blog-modal');

function openModal(card, modal, hasNote = false) {
  if (!modal) return;

  const modalBackdrop = modal.querySelector('.product-modal__backdrop');
  const modalClose = modal.querySelector('.modal-close');
  const modalTitle = modal.querySelector('[id$="-title"]');
  const modalCopy = modal.querySelector('.modal-copy');
  const modalSpecs = modal.querySelector('.modal-specs');
  const modalNote = modal.querySelector('.modal-note');

  if (!modalTitle || !modalCopy || !modalSpecs) return;

  const title = card.querySelector('h2')?.textContent || 'Details';
  const summary = card.querySelector('p')?.textContent || '';
  const details = card.querySelector('div > p')?.textContent || '';
  const specs = Array.from(card.querySelectorAll('div ul li'))
    .map(item => item.textContent || '')
    .filter(Boolean);

  modalTitle.textContent = title;
  modalCopy.textContent = `${summary} ${details}`.trim();
  modalSpecs.innerHTML = specs.map(item => `<li>${item}</li>`).join('');

  if (hasNote && modalNote) {
    const noteText = card.querySelector('.detail-note')?.textContent || 'Available in stores worldwide.';
    modalNote.textContent = noteText;
    modalNote.style.display = '';
  } else if (modalNote) {
    modalNote.style.display = 'none';
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  modalClose?.addEventListener('click', () => closeModal(modal), { once: true });
  modalBackdrop?.addEventListener('click', () => closeModal(modal), { once: true });
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

expandableCards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('product-card--clickable')) {
      openModal(card, productModal, true);
    } else {
      openModal(card, blogModal, false);
    }
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (card.classList.contains('product-card--clickable')) {
        openModal(card, productModal, true);
      } else {
        openModal(card, blogModal, false);
      }
    }
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (productModal?.classList.contains('is-open')) closeModal(productModal);
    if (blogModal?.classList.contains('is-open')) closeModal(blogModal);
  }
});
