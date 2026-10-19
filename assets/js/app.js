/* Clay — components workspace: dashboard shell, grouped pages, live states, Foundations panel */
(function () {
  'use strict';
  var html = document.documentElement, body = document.body;
  var I = function (n) { return Clay.icon(n); };
  var S = window.ClaySite, OSI = S.OSI, OS_ORDER = S.OS_ORDER;
  var catalog = window.ClayCatalog || [], GROUPS = window.ClayGroups || [];
  var byId = {}; catalog.forEach(function (c) { byId[c.id] = c; });
  var left = document.getElementById('dashLeft'), main = document.getElementById('dashMain'), right = document.getElementById('dashRight');
  var page = main.querySelector('[data-a-page]');
  var renderedOS = null, current = null, forced = 'live';
  var WIDE = { flush: 1, grid2: 1, grid3: 1, bg: 1 };
  var WIDE_IDS = ['data-table', 'desktop-table', 'event-calendar', 'kanban', 'editor', 'forms', 'transfer', 'splitter', 'grid', 'typography', 'm3-rail', 'win-expander', 'adw-rows', 'alert', 'win-infobar', 'm3-chips', 'tab-view', 'navbar', 'mega-menu', 'ios-split-view', 'cookie', 'charts', 'notification-center', 'list-group', 'menu', 'context-menu'];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function groupsFor(os) {
    return GROUPS.map(function (g) {
      return { id: g.id, section: g.section, name: g.name, icon: g.icon, desc: g.desc, items: g.ids.map(function (id) { return byId[id]; }).filter(function (c) { return c && c.os.indexOf(os) >= 0; }) };
    }).filter(function (g) { return g.items.length; });
  }
  function route() { var m = location.hash.match(/^#\/([\w-]+)(?:\/([\w-]+))?/); return m ? { g: m[1], c: m[2] } : {}; }

  /* ---------------- Left navigation ---------------- */
  function renderNav(os) {
    var groups = groupsFor(os), total = groups.reduce(function (n, g) { return n + g.items.length; }, 0), p = Clay.OS[os], html = '', sec = null;
    groups.forEach(function (g) {
      if (g.section !== sec) { if (sec !== null) html += '</div>'; sec = g.section; html += '<div class="a-sec-nav"><h4>' + sec + '</h4>'; }
      html += '<a href="#/' + g.id + '" data-g="' + g.id + '">' + I(g.icon) + '<span>' + esc(g.name) + '</span><small>' + g.items.length + '</small></a>';
    });
    left.querySelector('[data-a-nav]').innerHTML = html + '</div>';
    left.querySelector('[data-a-os]').innerHTML = OSI[os] + '<div><b>' + p.label + ' · ' + p.family + '</b>' + total + ' components in ' + groups.length + ' groups</div>';
    return groups;
  }

  /* ---------------- Page ---------------- */
  function renderPage(os, gid, cid) {
    var groups = groupsFor(os), idx = Math.max(0, groups.findIndex(function (g) { return g.id === gid; })), g = groups[idx];
    if (!g) { page.innerHTML = '<p class="pg-empty">No components for this platform.</p>'; return; }
    current = g.id;
    left.querySelectorAll('[data-g]').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-g') === g.id); });
    var p = Clay.OS[os], prev = groups[idx - 1], next = groups[idx + 1];
    page.innerHTML =
      '<div class="pg-crumb">Components <span>/</span> ' + esc(g.section) + ' <span>/</span> <b>' + p.label + '</b></div>' +
      '<div class="pg-head"><div><h1>' + esc(g.name) + ' <em>· ' + g.items.length + '</em></h1><p>' + esc(g.desc) + '</p></div>' +
      '<div class="pg-tools"><span class="pg-tools-label">Preview state</span><div class="pg-state" role="group" aria-label="Preview state">' +
        ['live', 'hover', 'focus', 'pressed', 'disabled'].map(function (s) { return '<button type="button" data-state="' + s + '" aria-pressed="' + (s === forced) + '"><i></i>' + s.charAt(0).toUpperCase() + s.slice(1) + '</button>'; }).join('') + '</div></div></div>' +
      '<div class="pg-toc">' + g.items.map(function (c) { return '<button type="button" data-jump="' + c.id + '">' + esc(c.name) + '</button>'; }).join('') + '</div>' +
      '<div class="pg-forced" data-forced hidden></div>' +
      '<div class="ex-grid"' + (forced !== 'live' ? ' data-clay-force="' + forced + '"' : '') + '>' + g.items.map(function (c) { return box(c, os); }).join('') + '</div>' +
      '<nav class="pg-pager" aria-label="Pages">' + (prev ? '<a href="#/' + prev.id + '"><small>← Previous</small><b>' + esc(prev.name) + '</b></a>' : '') + (next ? '<a class="next" href="#/' + next.id + '"><small>Next →</small><b>' + esc(next.name) + '</b></a>' : '') + '</nav>';
    page.querySelectorAll('.ex').forEach(wireBox);
    Clay.upgrade(page);
    showForced();
    if (cid) { var el = document.getElementById('ex-' + cid); if (el) { requestAnimationFrame(function () { scrollToBox(el); }); } }
    else main.scrollTop = 0;
    updateThumbs();
  }
  function box(c, os) {
    var native = (c.native && c.native[os]) || '';
    var wide = c.wide || WIDE[c.layout] || WIDE_IDS.indexOf(c.id) >= 0;
    var inner = c.frame === 'phone' ? '<div class="c-phone">' + c.html + '</div>' : c.html;
    return '<section class="ex' + (wide ? ' wide' : '') + '" id="ex-' + c.id + '" data-id="' + c.id + '">' +
      '<div class="ex-stage clay l-' + (c.layout || 'row') + '">' + inner + '</div>' +
      '<div class="ex-meta"><span class="ex-title">' + esc(c.name) + (native && native !== c.name ? '<small>' + esc(native) + '</small>' : '') + '</span>' +
      '<p class="ex-desc">' + esc(c.desc) + '</p>' +
      '<div class="ex-bar"><span class="ex-event" aria-live="polite">Interact to see what happens</span>' +
      '<button class="ex-act" type="button" data-act="code" aria-pressed="false" aria-label="Show code" title="Show code">' + I('code') + '</button>' +
      '<button class="ex-act" type="button" data-act="copy" aria-label="Copy HTML" title="Copy HTML">' + I('copy') + '</button>' +
      '<button class="ex-act" type="button" data-act="link" aria-label="Copy link" title="Copy link to this example">' + I('share') + '</button></div></div></section>';
  }
  function wireBox(el) {
    var c = byId[el.getAttribute('data-id')], src = S.dedent(c.html), code = null;
    el.querySelector('[data-act="code"]').onclick = function () {
      if (!code) { code = S.codeBlock(src, 'html'); el.appendChild(code); code.hidden = true; }
      code.hidden = !code.hidden; this.setAttribute('aria-pressed', !code.hidden); updateThumbs();
    };
    el.querySelector('[data-act="copy"]').onclick = function () { S.copy(src); };
    el.querySelector('[data-act="link"]').onclick = function () { var u = location.href.split('#')[0] + '#/' + current + '/' + c.id; S.copy(u); history.replaceState(null, '', '#/' + current + '/' + c.id); };
    var stage = el.querySelector('.ex-stage'), ev = el.querySelector('.ex-event'), t;
    var say = function (msg) { ev.textContent = msg; ev.classList.add('live'); clearTimeout(t); t = setTimeout(function () { ev.classList.remove('live'); }, 2200); };
    stage.addEventListener('click', function (e) { var m = describe(e.target, 'click'); if (m) say(m); });
    stage.addEventListener('change', function (e) { var m = describe(e.target, 'change'); if (m) say(m); });
    stage.addEventListener('input', function (e) { var m = describe(e.target, 'input'); if (m) say(m); });
    stage.addEventListener('contextmenu', function (e) { if (e.target.closest('[data-clay-contextmenu]')) say('Right-click → context menu opened at pointer'); });
    stage.addEventListener('dragend', function () { say('Dropped → list order updated'); });
  }
  function nameOf(el) {
    var n = el.getAttribute('aria-label') || el.getAttribute('title') || '';
    if (!n && el.id) { var l = document.querySelector('label[for="' + el.id + '"]'); if (l) n = l.textContent; }
    if (!n) { var w = el.closest('label'); if (w) n = w.textContent; }
    if (!n) n = el.textContent || el.value || el.placeholder || '';
    n = n.replace(/\s+/g, ' ').trim();
    return n.length > 34 ? n.slice(0, 32) + '…' : n;
  }
  function describe(t, type) {
    if (type === 'input') {
      if (t.matches('.clay-range')) return 'Slider “' + nameOf(t) + '” → ' + t.value;
      if (t.matches('input[type="text"], input:not([type]), input[type="search"], input[type="email"], input[type="password"], textarea, [contenteditable]')) return 'Typing in “' + (nameOf(t) || 'field') + '” · ' + (t.value || t.textContent || '').length + ' chars';
      return null;
    }
    if (type === 'change') {
      if (t.matches('[role="switch"]')) return 'Switch “' + nameOf(t) + '” turned ' + (t.checked ? 'on' : 'off');
      if (t.type === 'checkbox') return 'Checkbox “' + nameOf(t) + '” ' + (t.checked ? 'checked' : 'unchecked');
      if (t.type === 'radio') return 'Selected “' + nameOf(t) + '”';
      if (t.tagName === 'SELECT') return 'Selected “' + t.options[t.selectedIndex].text + '”';
      if (t.type === 'file') return 'Chose ' + t.files.length + ' file(s)';
      if (t.type === 'date' || t.type === 'time' || t.type === 'month' || t.type === 'color') return 'Picked ' + t.value;
      return null;
    }
    var el = t.closest('button, a, [role="tab"], [role="option"], [role="menuitem"], .clay-option, .clay-list-item--action, .clay-tabbar-item, .clay-navrail-item, .clay-sidebar-item, .clay-cascader li, .clay-tabview-tab, .clay-tree summary, .clay-tree-leaf, .clay-swipe-content, .clay-card--interactive, [data-day], .clay-dots i, .clay-thumb, summary, .clay-event');
    if (!el) return null;
    var n = nameOf(el);
    if (el.hasAttribute('data-clay-open')) return 'Clicked “' + n + '” → opens ' + el.getAttribute('data-clay-open');
    if (el.hasAttribute('data-clay-close')) return 'Closed the dialog' + (el.getAttribute('data-clay-close') ? ' → returned “' + el.getAttribute('data-clay-close') + '”' : '');
    if (el.hasAttribute('data-clay-menu')) return 'Toggled menu “' + n + '” · ' + (el.getAttribute('aria-expanded') === 'true' ? 'open' : 'closed');
    if (el.hasAttribute('data-clay-toast')) return 'Clicked “' + n + '” → toast shown';
    if (el.hasAttribute('data-clay-copy')) return 'Copied “' + el.getAttribute('data-clay-copy') + '” to clipboard';
    if (el.hasAttribute('data-clay-reveal')) return 'Password ' + (el.getAttribute('aria-pressed') === 'true' ? 'revealed' : 'hidden');
    if (el.hasAttribute('data-clay-dismiss')) return 'Dismissed';
    if (el.hasAttribute('data-clay-step')) return 'Stepped ' + (+el.getAttribute('data-clay-step') > 0 ? 'up' : 'down');
    if (el.getAttribute('role') === 'tab' || el.classList.contains('clay-tab')) return 'Selected tab “' + n + '”';
    if (el.matches('[role="menuitem"], .clay-menu-item')) return 'Chose “' + n + '” from the menu';
    if (el.matches('[role="option"], .clay-option, .clay-cascader li')) return 'Selected option “' + n + '”';
    if (el.hasAttribute('data-day')) return 'Picked day ' + el.getAttribute('data-day');
    if (el.hasAttribute('aria-pressed') && el.tagName === 'BUTTON') return '“' + n + '” ' + (el.getAttribute('aria-pressed') === 'true' ? 'pressed' : 'released');
    if (el.matches('.clay-theme-toggle')) return 'Theme → ' + (el.getAttribute('aria-checked') === 'true' ? 'dark' : 'light');
    if (el.matches('.clay-tabbar-item, .clay-navrail-item, .clay-sidebar-item, .clay-tabview-tab')) return 'Navigated to “' + n + '”';
    if (el.matches('.clay-swipe-content')) return 'Row ' + (el.closest('.clay-swipe').classList.contains('is-open') ? 'swiped open → actions revealed' : 'closed');
    if (el.matches('summary, .clay-tree summary')) return (el.parentNode.open ? 'Collapsed' : 'Expanded') + ' “' + n + '”';
    if (el.tagName === 'A') return 'Clicked link “' + n + '”';
    return 'Clicked “' + (n || 'button') + '”' + (el.disabled ? ' (disabled)' : '');
  }
  function scrollToBox(el) {
    main.scrollTo({ top: el.offsetTop - 16, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }
  function showForced() {
    var bar = page.querySelector('[data-forced]'); if (!bar) return;
    bar.hidden = forced === 'live';
    bar.innerHTML = '<i data-icon="info"></i><span>Showing the <b>' + forced + '</b> state on every component on this page. Choose <b>Live</b> to interact again.</span>';
    bar.querySelectorAll('[data-icon]').forEach(function (n) { n.outerHTML = I(n.getAttribute('data-icon')); });
  }
  page.addEventListener('click', function (e) {
    var s = e.target.closest('[data-state]');
    if (s) {
      forced = s.getAttribute('data-state');
      page.querySelectorAll('[data-state]').forEach(function (b) { b.setAttribute('aria-pressed', b === s); });
      var grid = page.querySelector('.ex-grid');
      if (forced === 'live') grid.removeAttribute('data-clay-force'); else grid.setAttribute('data-clay-force', forced);
      showForced();
    }
    var j = e.target.closest('[data-jump]'); if (j) scrollToBox(document.getElementById('ex-' + j.getAttribute('data-jump')));
  });

  function updateThumbs() { if (window.ClayDash) window.ClayDash.updateThumbs(); }

  /* ---------------- Foundations panel ---------------- */
  var DOTS = ['#6d5efc', '#4f46e5', '#2563eb', '#0284c7', '#0891b2', '#059669', '#65a30d', '#ca8a04', '#ea580c', '#dc2626', '#e11d48', '#db2777', '#c026d3', '#7c3aed', '#18181b'];
  var FORMATS = [['css', 'CSS variables'], ['scss', 'SCSS'], ['tailwind', 'Tailwind preset'], ['json', 'JSON tokens'], ['figma', 'Figma / DTCG'], ['swiftui', 'SwiftUI'], ['compose', 'Jetpack Compose'], ['flutter', 'Flutter'], ['xaml', 'WinUI / XAML'], ['gtk', 'GTK / libadwaita']];
  var LANG = { css: 'css', scss: 'scss', json: 'js', figma: 'js', tailwind: 'js', swiftui: 'js', compose: 'js', flutter: 'js', xaml: 'xml', gtk: 'gtk' };
  var EXT = { css: 'clay-theme.css', scss: '_clay-theme.scss', json: 'clay-tokens.json', figma: 'clay.tokens.json', tailwind: 'tailwind.config.js', swiftui: 'ClayTheme.swift', compose: 'ClayTheme.kt', flutter: 'clay_theme.dart', xaml: 'ClayTheme.xaml', gtk: 'gtk.css' };
  right.innerHTML =
    '<div class="f-head"><h3>Foundations<small>Tune tokens, see every component react</small></h3><button class="f-reset" type="button" data-f-reset>' + I('refresh') + 'Reset</button><button class="icon-btn f-close" type="button" data-f-close aria-label="Close">' + I('x') + '</button></div>' +
    '<div class="f-body">' +
      '<div class="f-group"><div class="f-label">Platform</div><div class="f-os">' + OS_ORDER.map(function (o) { return '<button type="button" data-f-os="' + o + '">' + OSI[o] + Clay.OS[o].label + '<small>' + Clay.OS[o].family + '</small></button>'; }).join('') + '</div></div>' +
      '<div class="f-group"><div class="f-label">Appearance</div><div class="f-seg"><button type="button" data-f-mode="light">' + I('sun') + 'Light</button><button type="button" data-f-mode="dark">' + I('moon') + 'Dark</button><button type="button" data-f-mode="auto">' + I('monitor') + 'Auto</button></div></div>' +
      '<div class="f-group"><div class="f-label">Brand themes</div><div class="f-themes">' + Object.keys(Clay.THEMES).map(function (k) { var t = Clay.THEMES[k]; return '<button type="button" class="f-theme" data-f-theme="' + k + '" style="--c:' + t.primary + ';--c2:' + t.secondary + '" title="' + k + '" aria-label="' + k + ' theme"></button>'; }).join('') + '</div></div>' +
      '<div class="f-divider"></div>' +
      '<div class="f-group"><div class="f-label">Primary colour <span class="f-contrast" data-f-contrast>AA</span></div><div class="f-color"><input type="color" data-f="primary" aria-label="Primary colour"><input class="f-input" data-f="primaryHex" spellcheck="false" aria-label="Primary hex"></div><div class="f-dots">' + DOTS.map(function (c) { return '<button type="button" style="--c:' + c + '" data-f-dot="' + c + '" aria-label="' + c + '"></button>'; }).join('') + '</div></div>' +
      '<div class="f-group"><div class="f-label">Secondary colour</div><div class="f-color"><input type="color" data-f="secondary" aria-label="Secondary colour"><input class="f-input" data-f="secondaryHex" spellcheck="false" aria-label="Secondary hex"></div></div>' +
      '<div class="f-group"><div class="f-label">Corner radius <output data-o="radius"></output></div><input type="range" class="f-range" min="0" max="32" step="1" data-f="radius" aria-label="Corner radius"></div>' +
      '<div class="f-divider"></div>' +
      '<div class="f-group"><div class="f-label">Typeface</div><select class="f-input" data-f="font" aria-label="Typeface"><option value="">Platform default</option>' + Clay.FONTS.map(function (f) { return '<option>' + f + '</option>'; }).join('') + '</select></div>' +
      '<div class="f-group"><div class="f-label">Type scale <output data-o="fontScale"></output></div><input type="range" class="f-range" min="0.8" max="1.3" step="0.01" data-f="fontScale" aria-label="Type scale"></div>' +
      '<div class="f-divider"></div>' +
      '<div class="f-group"><div class="f-label">Density <output data-o="density"></output></div><input type="range" class="f-range" min="0.75" max="1.3" step="0.01" data-f="density" aria-label="Density"></div>' +
      '<div class="f-group"><div class="f-label">Spacing unit <output data-o="space"></output></div><input type="range" class="f-range" min="2" max="8" step="0.5" data-f="space" aria-label="Spacing unit"></div>' +
      '<div class="f-group"><div class="f-label">Shadow depth <output data-o="shadow"></output></div><input type="range" class="f-range" min="0" max="2.5" step="0.05" data-f="shadow" aria-label="Shadow depth"></div>' +
      '<div class="f-row">Motion &amp; transitions<input type="checkbox" class="f-toggle" data-f="motion" aria-label="Motion"></div>' +
      '<div class="f-divider"></div>' +
      '<div class="f-group" id="foundations"><div class="f-label">Export tokens</div><select class="f-input" data-f-fmt aria-label="Export format">' + FORMATS.map(function (f) { return '<option value="' + f[0] + '">' + f[1] + '</option>'; }).join('') + '</select>' +
      '<div class="f-preview" data-f-preview></div><div class="f-export"><button class="f-btn" type="button" data-f-copy style="flex:1;justify-content:center">' + I('copy') + 'Copy</button><button class="f-btn primary" type="button" data-f-download style="flex:1;justify-content:center">' + I('download') + 'Download</button></div></div>' +
    '</div>';
  var $r = function (s) { return right.querySelector(s); };
  function cssVar(k) { return getComputedStyle(html).getPropertyValue(k).trim(); }
  function fill(r) { r.style.setProperty('--v', ((r.value - r.min) / (r.max - r.min)) * 100 + '%'); }
  function fmtVal(k, v) { return k === 'radius' || k === 'space' ? v + 'px' : k === 'fontScale' ? Math.round(v * 100) + '%' : (+v).toFixed(2) + '×'; }

  function syncPanel() {
    var t = Clay.getTheme(), p = Clay.toHex(cssVar('--clay-primary')).slice(0, 7), s2 = Clay.toHex(cssVar('--clay-secondary')).slice(0, 7);
    var r = t.radius === null ? (parseFloat(cssVar('--clay-radius')) || 0) : t.radius;
    right.querySelectorAll('[data-f-os]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-f-os') === t.os); });
    right.querySelectorAll('[data-f-mode]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-f-mode') === t.mode); });
    right.querySelectorAll('[data-f-theme]').forEach(function (b) { b.setAttribute('aria-pressed', Clay.THEMES[b.getAttribute('data-f-theme')].primary === t.primary); });
    right.querySelectorAll('[data-f-dot]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-f-dot') === p); });
    $r('[data-f="primary"]').value = p; $r('[data-f="secondary"]').value = s2;
    if (document.activeElement !== $r('[data-f="primaryHex"]')) $r('[data-f="primaryHex"]').value = p;
    if (document.activeElement !== $r('[data-f="secondaryHex"]')) $r('[data-f="secondaryHex"]').value = s2;
    var fg = Clay.contrast(p), ratio = Clay.contrastRatio(p, fg === '#ffffff' ? '#ffffff' : '#0b0b12'), chip = $r('[data-f-contrast]');
    chip.textContent = ratio.toFixed(1) + ':1 ' + (ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'Low'); chip.classList.toggle('bad', ratio < 3);
    var vals = { radius: r, fontScale: t.fontScale, density: t.density, space: t.space, shadow: t.shadow };
    Object.keys(vals).forEach(function (k) { var inp = $r('[data-f="' + k + '"]'); if (document.activeElement !== inp) inp.value = vals[k]; fill(inp); $r('[data-o="' + k + '"]').textContent = fmtVal(k, vals[k]); });
    $r('[data-f="font"]').value = t.font || '';
    $r('[data-f="motion"]').checked = !!t.motion;
    renderExport();
  }
  function renderExport() {
    var f = $r('[data-f-fmt]').value, host = $r('[data-f-preview]'), code;
    try { code = Clay.export(f); } catch (e) { code = String(e); }
    host.innerHTML = ''; host.appendChild(S.codeBlock(code, LANG[f], EXT[f]));
  }
  right.addEventListener('click', function (e) {
    var b;
    if ((b = e.target.closest('[data-f-os]'))) Clay.setOS(b.getAttribute('data-f-os'), true);
    if ((b = e.target.closest('[data-f-mode]'))) Clay.setMode(b.getAttribute('data-f-mode'));
    if ((b = e.target.closest('[data-f-theme]'))) Clay.setTheme({ theme: b.getAttribute('data-f-theme') });
    if ((b = e.target.closest('[data-f-dot]'))) Clay.setTheme({ primary: b.getAttribute('data-f-dot') });
    if (e.target.closest('[data-f-reset]')) { Clay.setTheme({ primary: null, secondary: null, radius: null, font: null, fontScale: 1, density: 1, space: 4, shadow: 1, motion: true }); S.toast('Reset to ' + Clay.OS[Clay.getTheme().os].label + ' defaults'); }
    if (e.target.closest('[data-f-close]')) body.classList.remove('show-right');
    if (e.target.closest('[data-f-copy]')) S.copy(Clay.export($r('[data-f-fmt]').value));
    if (e.target.closest('[data-f-download]')) {
      var f = $r('[data-f-fmt]').value, blob = new Blob([Clay.export(f)], { type: 'text/plain' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = EXT[f]; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      S.toast('Downloaded ' + EXT[f]);
    }
  });
  right.addEventListener('input', function (e) {
    var k = e.target.getAttribute('data-f'); if (!k) return;
    var v = e.target.value;
    if (k === 'primary' || k === 'secondary') { var o = {}; o[k] = v; Clay.setTheme(o); }
    else if (k === 'primaryHex' || k === 'secondaryHex') { if (/^#?[0-9a-f]{6}$/i.test(v)) { var o2 = {}; o2[k.replace('Hex', '')] = '#' + v.replace('#', ''); Clay.setTheme(o2); } }
    else if (k === 'font') Clay.setTheme({ font: v || null });
    else if (k === 'motion') Clay.setTheme({ motion: e.target.checked });
    else { fill(e.target); var o3 = {}; o3[k] = +v; Clay.setTheme(o3); }
  });
  right.addEventListener('change', function (e) { if (e.target.matches('[data-f-fmt]')) renderExport(); });

  /* ---------------- Theme & routing ---------------- */
  function onTheme() {
    var t = Clay.getTheme();
    if (t.os !== renderedOS) {
      renderedOS = t.os; renderNav(t.os);
      var r = route(); renderPage(t.os, r.g || current, r.c);
      try { var u = new URL(location.href); u.searchParams.set('os', t.os); history.replaceState(null, '', u.pathname + u.search + location.hash); } catch (err) {}
    }
    syncPanel();
  }
  addEventListener('hashchange', function () { var r = route(); if (r.g && (r.g !== current || r.c)) renderPage(renderedOS, r.g, r.c); });
  document.addEventListener('clay:themechange', onTheme);
  onTheme();
  if (location.hash === '#foundations' && matchMedia('(max-width: 1280px)').matches) body.classList.add('show-right');
})();
