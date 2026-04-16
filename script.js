const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}
