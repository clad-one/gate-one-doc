/* Render the Mermaid diagrams of the current page with the locally
 * vendored build. Loaded only on pages that contain a `.mermaid` block. */
(function () {
  'use strict';

  var blocks = document.querySelectorAll('.mermaid');
  if (!blocks.length || !window.mermaid) return;

  var dark = document.documentElement.dataset.bsTheme === 'dark';
  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: dark ? 'dark' : 'default'
  });

  function render() {
    window.mermaid.run({ querySelector: '.mermaid' }).catch(function (err) {
      console.error('Mermaid failed to render', err);
    });
  }

  if (document.readyState === 'complete') {
    render();
  } else {
    window.addEventListener('load', render, { once: true });
  }
})();
