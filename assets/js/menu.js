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
  publicationBack?.addEventListener('click', () => {
    showMainMenu();
    publicationsToggle?.focus();
  });

  editorialIndex.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      const destination = new URL(link.href, window.location.href);
      const isSamePageAnchor = destination.origin === window.location.origin
        && destination.pathname === window.location.pathname
        && destination.search === window.location.search
        && destination.hash;

      if (!isSamePageAnchor) {
        closeMenu(false);
        return;
      }

      event.preventDefault();
      const targetHash = destination.hash;
      const navigateToAnchor = () => {
        const target = document.getElementById(decodeURIComponent(targetHash.slice(1)));
        if (window.location.hash !== targetHash) {
          window.location.hash = targetHash;
        } else {
          target?.scrollIntoView({ block: 'start' });
        }
      };

      closeMenu(false);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        requestAnimationFrame(navigateToAnchor);
        return;
      }

      let finished = false;
      const finishNavigation = (event) => {
        if (event && (event.target !== pageWrapper || event.propertyName !== 'transform')) return;
        if (finished) return;
        finished = true;
        pageWrapper.removeEventListener('transitionend', finishNavigation);
        window.clearTimeout(fallbackTimer);
        navigateToAnchor();
      };

      pageWrapper.addEventListener('transitionend', finishNavigation);
      const fallbackTimer = window.setTimeout(() => finishNavigation(), 500);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (editorialIndex.classList.contains('publications-open')) {
      showMainMenu();
      publicationsToggle?.focus();
      return;
    }
    closeMenu();
  });
}