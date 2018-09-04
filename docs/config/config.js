window.$docsify = {
  name: 'DKN USA',
  logotype: '/assets/img/logo.svg',
  basePath: '/docs',
  repo: 'https://github.com/fvena/didor-docs',
  homepage: 'home.md',
  loadNavbar: '_navbar.md',
  loadSidebar: '_sidebar.md',
  mergeNavbar: true,
  auto2top: true,
  languageDefault: 'es',
  onlyCover: true,
  coverpage: {
    '/': 'es/_coverpage.md',
    '/es/': '_coverpage.md',
    '/en/': '_coverpage.md',
  },
  demo: {
    css: 'docs/config/didor.css',
  },
  pagination: {
    previousText: 'Anterior',
    nextText: 'Siguiente',
  },
};
