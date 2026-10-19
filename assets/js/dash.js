/* Clay — shared dashboard shell (Components, Docs): header search, platform & mode switches,
   drawers, overlay scrollbars, in-column anchor navigation and scroll spy. */
(function () {
  'use strict';
  var html = document.documentElement, body = document.body;
  var I = function (n) { return Clay.icon(n); };
  var S = window.ClaySite, OSI = S.OSI, OS_ORDER = S.OS_ORDER;
  var main = document.querySelector('.dash-main');
  var onComponents = !!document.querySelector('[data-a-page]');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* ---------------- Header search (components across the active platform) ---------------- */
  var search = document.querySelector('[data-a-search]'), results = document.querySelector('[data-a-results]'), active = -1;
  function searchItems(q) {
    var os = Clay.getTheme().os, cat = window.ClayCatalog || [], groups = window.ClayGroups || [], byId = {}, out = [];
    cat.forEach(function (c) { byId[c.id] = c; });
    groups.forEach(function (g) { g.ids.forEach(function (id) {
      var c = byId[id]; if (!c || c.os.indexOf(os) < 0) return;
      var nm = c.name.toLowerCase(), hay = (c.name + ' ' + ((c.native && c.native[os]) || '') + ' ' + c.desc + ' ' + g.name).toLowerCase();
      if (hay.indexOf(q) >= 0) out.push({ g: g, c: c, score: nm.indexOf(q) === 0 ? 0 : nm.indexOf(q) >= 0 ? 1 : 2 });
    }); });
    // Docs sections are searchable too
    document.querySelectorAll('.docs-side a[href^="#"]').forEach(function (a) {
      if (a.textContent.toLowerCase().indexOf(q) >= 0) out.push({ doc: a.getAttribute('href'), label: a.textContent.trim(), score: 0.5 });
    });
    return out.sort(function (a, b) { return a.score - b.score; }).slice(0, 12);
  }
  function renderResults() {
    var q = search.value.trim().toLowerCase();
    if (!q) { results.hidden = true; return; }
    var r = searchItems(q); active = r.length ? 0 : -1;
    results.innerHTML = r.length ? r.map(function (x, i) {
      return x.doc
        ? '<li role="option" data-doc="' + x.doc + '" class="' + (i === 0 ? 'is-active' : '') + '">' + esc(x.label) + '<small>Docs</small></li>'
        : '<li role="option" data-go="' + x.g.id + '/' + x.c.id + '" class="' + (i === 0 ? 'is-active' : '') + '">' + esc(x.c.name) + '<small>' + esc(x.g.name) + '</small></li>';
    }).join('') : '<li class="empty">Nothing matches “' + esc(q) + '”</li>';
    results.hidden = false;
  }
  function choose(li) {
    if (li.hasAttribute('data-doc')) { jumpTo(li.getAttribute('data-doc')); }
    else if (onComponents) location.hash = '#/' + li.getAttribute('data-go');
    else location.href = 'components.html#/' + li.getAttribute('data-go');
    search.value = ''; results.hidden = true; search.blur(); body.classList.remove('show-left');
  }
  if (search) {
    search.addEventListener('input', renderResults);
    search.addEventListener('focus', renderResults);
    search.addEventListener('keydown', function (e) {
      var items = results.querySelectorAll('[data-go], [data-doc]');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!items.length) return; active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; items.forEach(function (li, i) { li.classList.toggle('is-active', i === active); }); }
      if (e.key === 'Enter' && items[active]) choose(items[active]);
      if (e.key === 'Escape') { search.value = ''; results.hidden = true; search.blur(); }
    });
    results.addEventListener('mousedown', function (e) { var li = e.target.closest('[data-go], [data-doc]'); if (li) { e.preventDefault(); choose(li); } });
    search.addEventListener('blur', function () { setTimeout(function () { results.hidden = true; }, 120); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && search && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) { e.preventDefault(); search.focus(); }
    if (e.key === 'Escape') body.classList.remove('show-left', 'show-right');
  });

  /* ---------------- Platform switch & light/dark ---------------- */
  var osw = document.querySelector('[data-a-oswitch]'), modeBtn = document.querySelector('[data-a-mode]');
  if (osw) {
    osw.innerHTML = OS_ORDER.map(function (o) { return '<button type="button" data-os-pick="' + o + '" aria-label="' + Clay.OS[o].label + '" title="' + Clay.OS[o].label + ' · ' + Clay.OS[o].family + '">' + OSI[o] + '</button>'; }).join('');
    osw.addEventListener('click', function (e) { var b = e.target.closest('[data-os-pick]'); if (b) Clay.setOS(b.getAttribute('data-os-pick'), true); });
  }
  if (modeBtn) modeBtn.addEventListener('click', function () { Clay.setMode(html.getAttribute('data-clay-mode') === 'dark' ? 'light' : 'dark'); });
  function syncChrome() {
    var t = Clay.getTheme(), dark = html.getAttribute('data-clay-mode') === 'dark';
    body.setAttribute('data-chrome', dark ? 'dark' : 'light');
    if (modeBtn) modeBtn.innerHTML = I(dark ? 'sun' : 'moon');
    if (osw) osw.querySelectorAll('[data-os-pick]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-os-pick') === t.os); });
  }
  document.addEventListener('clay:themechange', syncChrome);
  syncChrome();

  /* ---------------- Drawers (small screens) ---------------- */
  document.querySelectorAll('[data-a-open]').forEach(function (b) { b.addEventListener('click', function () { body.classList.add(b.getAttribute('data-a-open') === 'left' ? 'show-left' : 'show-right'); setTimeout(updateThumbs, 480); }); });
  var leftCol = document.querySelector('.dash-left');
  if (leftCol) leftCol.addEventListener('click', function (e) { if (e.target.closest('a')) body.classList.remove('show-left'); });
  var scrim = document.querySelector('.a-scrim'); if (scrim) scrim.addEventListener('click', function () { body.classList.remove('show-left', 'show-right'); });

  /* ---------------- Overlay scrollbars (no layout width, visible on hover/scroll) ---------------- */
  var thumbs = [];
  function ovScroll(el) {
    var th = document.createElement('div'); th.className = 'ov-thumb'; th.setAttribute('aria-hidden', 'true'); document.body.appendChild(th);
    var hideT, over = false, drag = null;
    function update() {
      var r = el.getBoundingClientRect(), ch = el.clientHeight, sh = el.scrollHeight;
      if (sh <= ch + 2 || r.width === 0 || getComputedStyle(el).visibility === 'hidden') { th.style.display = 'none'; return; }
      th.style.display = '';
      var h = Math.max(36, ch * ch / sh), top = r.top + 3 + (el.scrollTop / (sh - ch)) * (ch - h - 6);
      th.style.height = h + 'px'; th.style.top = top + 'px'; th.style.left = (r.right - 9) + 'px';
    }
    function show() { update(); th.classList.add('show'); clearTimeout(hideT); if (!over && !drag) hideT = setTimeout(function () { th.classList.remove('show'); }, 900); }
    el.addEventListener('scroll', show, { passive: true });
    el.addEventListener('mouseenter', function () { over = true; show(); });
    el.addEventListener('mouseleave', function () { over = false; show(); });
    th.addEventListener('mouseenter', function () { over = true; clearTimeout(hideT); });
    th.addEventListener('mouseleave', function () { over = false; show(); });
    th.addEventListener('pointerdown', function (e) {
      e.preventDefault(); th.setPointerCapture(e.pointerId); th.classList.add('drag');
      drag = { y: e.clientY, st: el.scrollTop };
      var mv = function (ev) { var ch = el.clientHeight, sh = el.scrollHeight, h = th.offsetHeight; el.scrollTop = drag.st + (ev.clientY - drag.y) * (sh - ch) / (ch - h - 6); };
      var up = function () { th.classList.remove('drag'); drag = null; th.removeEventListener('pointermove', mv); th.removeEventListener('pointerup', up); show(); };
      th.addEventListener('pointermove', mv); th.addEventListener('pointerup', up);
    });
    thumbs.push(update);
    if (window.ResizeObserver) new ResizeObserver(update).observe(el);
    update();
  }
  function updateThumbs() { requestAnimationFrame(function () { thumbs.forEach(function (f) { f(); }); }); }
  document.querySelectorAll('.ov').forEach(ovScroll);
  addEventListener('resize', updateThumbs);
  if (main && window.MutationObserver) new MutationObserver(updateThumbs).observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'open'] });

  /* ---------------- In-column anchors & scroll spy (Docs) ---------------- */
  function jumpTo(hash) {
    var el = hash && hash.length > 1 && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el || !main) return false;
    var top = el.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 18;
    main.scrollTo({ top: top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', hash);
    return true;
  }
  if (!onComponents && main) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute('href').indexOf('#/') === 0) return;
      if (jumpTo(a.getAttribute('href'))) { e.preventDefault(); body.classList.remove('show-left'); }
    });
    var links = Array.prototype.slice.call(document.querySelectorAll('.docs-side a[href^="#"]'));
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var spy = function () {
      var cur = 0, base = main.getBoundingClientRect().top + 120;
      secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= base) cur = i; });
      if (main.scrollTop + main.clientHeight >= main.scrollHeight - 4) cur = secs.length - 1;
      links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
    };
    main.addEventListener('scroll', spy, { passive: true }); spy();
    if (location.hash.length > 1) setTimeout(function () { jumpTo(location.hash); }, 60);
  }

  window.ClayDash = { updateThumbs: updateThumbs, jumpTo: jumpTo };
})();
