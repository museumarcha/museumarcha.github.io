// Open the research introduction by default on the personal GitHub Pages domain.
// A requested hash takes precedence so direct links land on their selected section.
if (window.location.hostname === 'thiagojcatarino.github.io' && window.location.pathname === '/' && !window.location.hash) {
  window.addEventListener('load', () => {
    document.getElementById('pesquisa')?.scrollIntoView({ block: 'start' });
  }, { once: true });
}
