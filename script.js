const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav ul');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const sections = Array.from(document.querySelectorAll('section[id]'));

function setActiveNav() {
  const scrollY = window.pageYOffset;
  const offset = window.innerHeight * 0.2;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.pageYOffset - offset;
    const bottom = top + section.offsetHeight;

    const id = section.getAttribute('id');
    const link = document.querySelector(`.site-nav a[href="#${id}"]`);

    if (!link) return;

    if (scrollY >= top && scrollY < bottom) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

setActiveNav();
window.addEventListener('scroll', setActiveNav);
window.addEventListener('resize', setActiveNav);

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  })
);
