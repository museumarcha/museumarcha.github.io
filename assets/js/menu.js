const menuButton = document.getElementById('menuButton');
const closeButton = document.getElementById('closeButton');
const editorialIndex = document.getElementById('editorialIndex');
const pageWrapper = document.getElementById('pageWrapper');
const publicationsToggle = document.getElementById('publicationsToggle');
const publicationNavigation = document.getElementById('publicationNavigation');
const publicationBack = document.getElementById('publicationBack');

function showMainMenu() {
  if (!editorialIndex || !publicationsToggle || !publicationNavigation) return;
  editorialIndex.classList.remove('publications-open');
  publicationNavigation.hidden = true;
  publicationsToggle.setAttribute('aria-expanded', 'false');
}

function showPublications() {
  if (!editorialIndex || !publicationsToggle || !publicationNavigation) return;
  editorialIndex.classList.add('publications-open');
  publicationNavigation.hidden = false;
  publicationsToggle.setAttribute('aria-expanded', 'true');
  publicationBack?.focus();
}

function openMenu() {
  if (!menuButton || !closeButton || !editorialIndex || !pageWrapper) return;
  showMainMenu();
  editorialIndex.classList.add('open');
  editorialIndex.setAttribute('aria-hidden', 'false');
  pageWrapper.classList.add('menu-open');
  menuButton.setAttribute('aria-expanded', 'true');
  closeButton.focus();
}

function closeMenu(restoreFocus = true) {
  if (!menuButton || !closeButton || !editorialIndex || !pageWrapper) return;
  showMainMenu();
  editorialIndex.classList.remove('open');
  editorialIndex.setAttribute('aria-hidden', 'true');
  pageWrapper.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (restoreFocus) menuButton.focus();
}

if (menuButton && closeButton && editorialIndex && pageWrapper) {
  editorialIndex.setAttribute('aria-hidden', 'true');
  menuButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', () => closeMenu());
  publicationsToggle?.addEventListener('click', showPublications);
  publicationBack?.addEventListener('click', showMainMenu);
  editorialIndex.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      if (editorialIndex.classList.contains('publications-open')) {
        showMainMenu();
      } else {
        closeMenu();
      }
    }
  });
}
