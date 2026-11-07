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

  function cloneDiagram(svg) {
    var clone = svg.cloneNode(true);
    var idMap = {};

    clone.querySelectorAll('[id]').forEach(function (el) {
      var next = el.id + '-zoom';
      idMap[el.id] = next;
      el.id = next;
    });

    clone.querySelectorAll('style').forEach(function (styleEl) {
      styleEl.textContent = styleEl.textContent.replace(
        /#([A-Za-z0-9_:.-]+)/g,
        function (match, id) {
          return idMap[id] ? '#' + idMap[id] : match;
        }
      );
    });

    clone.querySelectorAll('*').forEach(function (el) {
      Array.prototype.forEach.call(el.attributes, function (attr) {
        if (attr.name === 'id' || attr.value.indexOf('#') === -1) return;
        var next = attr.value.replace(
          /#([A-Za-z0-9_:.-]+)/g,
          function (match, id) {
            return idMap[id] ? '#' + idMap[id] : match;
          }
        );
        if (next !== attr.value) el.setAttribute(attr.name, next);
      });
    });

    clone.removeAttribute('style');
    var viewBox = (svg.getAttribute('viewBox') || '').trim().split(/\s+/);
    var width = parseFloat(viewBox[2]);
    var height = parseFloat(viewBox[3]);
    if (width && height) {
      clone.setAttribute('width', String(width));
      clone.setAttribute('height', String(height));
    }
    clone.style.display = 'block';
    clone.style.width = 'auto';
    clone.style.height = 'auto';
    clone.style.maxWidth = '94vw';
    clone.style.maxHeight = '90vh';
    return clone;
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
    content.appendChild(cloneDiagram(svg));

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
