/* Large-view sidebar toggle: keep the hamburger available and let it
   collapse the left documentation navigation, independently of the
   Bootstrap collapse used below the md breakpoint. */
(function () {
  "use strict";

  var sidebar = document.querySelector(".td-sidebar");
  var toggle = document.querySelector(".td-sidebar__toggle");
  if (!sidebar || !toggle) return;

  var mq = window.matchMedia("(min-width: 768px)");
  var storageKey = "cladone-sidebar-collapsed";

  function setCollapsed(collapsed, persist) {
    sidebar.classList.toggle("td-sidebar--collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    if (persist) {
      try { localStorage.setItem(storageKey, collapsed ? "1" : "0"); } catch (e) {}
    }
  }

  function syncBreakpoint() {
    if (!mq.matches) {
      sidebar.classList.remove("td-sidebar--collapsed");
      toggle.setAttribute("aria-expanded", "false");
      return;
    }
    var collapsed = false;
    try { collapsed = localStorage.getItem(storageKey) === "1"; } catch (e) {}
    setCollapsed(collapsed, false);
  }

  toggle.addEventListener("click", function (ev) {
    if (!mq.matches) return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    setCollapsed(
      !sidebar.classList.contains("td-sidebar--collapsed"),
      true
    );
  });

  if (mq.addEventListener) mq.addEventListener("change", syncBreakpoint);
  else mq.addListener(syncBreakpoint);

  syncBreakpoint();
})();
