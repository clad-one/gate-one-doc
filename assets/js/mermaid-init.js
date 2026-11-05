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

  function closeZoom(overlay, previousFocus) {
    overlay.remove();
    document.documentElement.classList.remove('mermaid-zoom-open');
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }

  function openZoom(svg) {
    var previousFocus = document.activeElement;
    var overlay = document.createElement('div');
    overlay.className = 'mermaid-zoom-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Diagram');

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'mermaid-zoom-close';
    close.setAttribute('aria-label', 'Close diagram');
    close.textContent = '\u00d7';

    var content = document.createElement('div');
    content.className = 'mermaid-zoom-content';
    var clone = svg.cloneNode(true);
    clone.removeAttribute('width');
    clone.removeAttribute('height');
    clone.removeAttribute('style');
    content.appendChild(clone);

    overlay.appendChild(content);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
    document.documentElement.classList.add('mermaid-zoom-open');
    close.focus();

    function dismiss() {
      closeZoom(overlay, previousFocus);
    }

    close.addEventListener('click', dismiss);
    overlay.addEventListener('click', function (ev) {
      if (ev.target === overlay) dismiss();
    });
    document.addEventListener('keydown', function onKey(ev) {
      if (ev.key === 'Escape') {
        document.removeEventListener('keydown', onKey);
        dismiss();
      }
    });
  }

  function enhanceZoom() {
    document.querySelectorAll('.mermaid').forEach(function (block) {
      if (block.dataset.zoomable === 'true') return;
      var svg = block.querySelector('svg');
      if (!svg) return;
      block.dataset.zoomable = 'true';
      block.classList.add('mermaid-zoomable');
      block.setAttribute('role', 'button');
      block.setAttribute('tabindex', '0');
      block.setAttribute('aria-label', 'Open diagram full size');
      block.addEventListener('click', function () { openZoom(svg); });
      block.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          openZoom(svg);
        }
      });
    });
  }

  function render() {
    window.mermaid.run({ querySelector: '.mermaid' }).then(enhanceZoom).catch(function (err) {
      console.error('Mermaid failed to render', err);
    });
  }

  if (document.readyState === 'complete') {
    render();
  } else {
    window.addEventListener('load', render, { once: true });
  }
})();
