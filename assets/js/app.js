/* Clay — components workspace: per-platform catalog + live Foundations panel */
(function () {
  'use strict';
  var html = document.documentElement, body = document.body;
  var I = function (n) { return Clay.icon(n); };
  var S = window.ClaySite, OSI = S.OSI, OS_ORDER = S.OS_ORDER;
  var CATS = ['Actions', 'Inputs', 'Selection', 'Navigation', 'Feedback', 'Overlays', 'Data display', 'Layout', 'Sections', 'Platform'];
  var catalog = window.ClayCatalog || [];
  var left = document.getElementById('appLeft'), main = document.getElementById('appMain'), right = document.getElementById('appRight');
  var renderedOS = null;

  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-'); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function forOS(os) {
    var list = catalog.filter(function (c) { return c.os.indexOf(os) >= 0; });
    return CATS.map(function (cat) {
      var items = list.filter(function (c) { return c.cat === cat; });
      items.sort(function (a, b) { return (a.os.length === 1 ? 0 : 1) - (b.os.length === 1 ? 0 : 1); });
      return { cat: cat, items: items };
    }).filter(function (g) { return g.items.length; });
  }

  /* ---------------- Rendering ---------------- */
  function render(os) {
    renderedOS = os;
    var groups = forOS(os), total = groups.reduce(function (n, g) { return n + g.items.length; }, 0), p = Clay.OS[os];
    // left nav
    left.querySelector('[data-a-nav]').innerHTML = groups.map(function (g) {
      return '<div class="a-cat" data-cat="' + slug(g.cat) + '"><h4>' + g.cat + '<span>' + g.items.length + '</span></h4>' +
        g.items.map(function (c) { return '<a href="#c-' + c.id + '" data-id="' + c.id + '">' + esc(c.name) + '</a>'; }).join('') + '</div>';
    }).join('') + '<p class="a-empty" hidden data-a-empty>No components match.</p>';
    left.querySelector('[data-a-os]').innerHTML = OSI[os] + '<div><b>' + p.label + '</b>' + total + ' components · ' + p.family + '</div>';
    // header
    main.querySelector('[data-a-title]').innerHTML = p.label + ' <em class="serif">components</em>';
    main.querySelector('[data-a-kicker]').textContent = 'Components · ' + p.family;
    main.querySelector('[data-a-sub]').textContent = os === 'web'
      ? 'Everything you need for websites, web apps and dashboards, from navbars and data tables to pricing tables, hero sections and full page patterns.'
      : 'The native ' + p.family + ' component set, rendered with Clay. Only components that belong on ' + p.label + ' are shown, each with its native name.';
    main.querySelector('[data-a-chips]').innerHTML = groups.map(function (g) { return '<span>' + g.cat + ' · ' + g.items.length + '</span>'; }).join('');
    // sections + cards
    var host = main.querySelector('[data-a-list]');
    host.innerHTML = groups.map(function (g) {
      return '<section class="a-sec" id="cat-' + slug(g.cat) + '" data-cat="' + slug(g.cat) + '"><h2>' + g.cat + ' <small>' + g.items.length + '</small></h2>' + g.items.map(card).join('') + '</section>';
    }).join('') + '<p class="a-noresults" hidden data-a-noresults>No components match your search.</p>';
    host.querySelectorAll('.c-card').forEach(function (el) {
      var c = catalog.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
      var src = S.dedent(c.html);
      var code = S.codeBlock(src, 'html'); code.hidden = true; el.appendChild(code);
      el.querySelector('.c-copy').onclick = function () { S.copy(src); };
      el.querySelectorAll('.c-seg button').forEach(function (b) {
        b.onclick = function () { el.querySelectorAll('.c-seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); code.hidden = b.getAttribute('data-v') !== 'code'; };
      });
    });
    Clay.upgrade(host);
    applySearch();
    spy();
  }
  function card(c) {
    var native = (c.native && c.native[renderedOS]) || '';
    var inner = c.frame === 'phone' ? '<div class="c-phone">' + c.html + '</div>' : c.html;
    return '<article class="c-card" id="c-' + c.id + '" data-id="' + c.id + '" data-search="' + esc((c.name + ' ' + native + ' ' + c.desc + ' ' + c.cat).toLowerCase()) + '">' +
      '<header class="c-head"><div class="c-title"><h3>' + esc(c.name) + '</h3>' + (native && native !== c.name ? '<span class="c-native">' + esc(native) + '</span>' : '') + '</div>' +
      '<div class="c-seg" role="group" aria-label="View"><button type="button" data-v="preview" aria-pressed="true">Preview</button><button type="button" data-v="code" aria-pressed="false">Code</button></div>' +
      '<button class="c-copy" type="button" aria-label="Copy HTML" title="Copy HTML">' + I('copy') + '</button></header>' +
      '<p class="c-desc">' + esc(c.desc) + '</p>' +
      '<div class="c-stage clay l-' + (c.layout || 'row') + '">' + inner + '</div></article>';
  }

  /* ---------------- Search ---------------- */
  var search = left.querySelector('[data-a-search]');
  function applySearch() {
    var q = (search.value || '').trim().toLowerCase(), any = false;
    main.querySelectorAll('.a-sec').forEach(function (sec) {
      var vis = 0;
      sec.querySelectorAll('.c-card').forEach(function (c) { var on = !q || c.getAttribute('data-search').indexOf(q) >= 0; c.hidden = !on; if (on) vis++; });
      sec.hidden = !vis; if (vis) any = true;
    });
    left.querySelectorAll('.a-cat').forEach(function (cat) {
      var vis = 0;
      cat.querySelectorAll('a').forEach(function (a) { var card = document.getElementById('c-' + a.getAttribute('data-id')); var on = card && !card.hidden; a.hidden = !on; if (on) vis++; });
      cat.hidden = !vis;
    });
    main.querySelector('[data-a-noresults]').hidden = any;
    left.querySelector('[data-a-empty]').hidden = any;
  }
  search.addEventListener('input', applySearch);
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); body.classList.add('show-left'); search.focus(); }
    if (e.key === 'Escape') body.classList.remove('show-left', 'show-right');
  });

  /* ---------------- Scroll spy & deep links ---------------- */
  function spy() {
    var cards = main.querySelectorAll('.c-card:not([hidden])'), y = 140, cur = null;
    for (var i = 0; i < cards.length; i++) { if (cards[i].getBoundingClientRect().top <= y) cur = cards[i]; else break; }
    left.querySelectorAll('.a-cat a').forEach(function (a) { a.classList.toggle('active', !!cur && a.getAttribute('data-id') === cur.getAttribute('data-id')); });
  }
  addEventListener('scroll', spy, { passive: true });
  left.addEventListener('click', function (e) {
    var a = e.target.closest('.a-cat a'); if (!a) return;
    body.classList.remove('show-left');
    var c = document.getElementById('c-' + a.getAttribute('data-id'));
    if (c) { c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash'); }
  });

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

  /* ---------------- Drawers (small screens) ---------------- */
  document.querySelectorAll('[data-a-open]').forEach(function (b) { b.addEventListener('click', function () { body.classList.add(b.getAttribute('data-a-open') === 'left' ? 'show-left' : 'show-right'); }); });
  document.querySelector('.a-scrim').addEventListener('click', function () { body.classList.remove('show-left', 'show-right'); });

  /* ---------------- Theme changes ---------------- */
  function onTheme() {
    var t = Clay.getTheme();
    body.setAttribute('data-chrome', html.getAttribute('data-clay-mode') === 'dark' ? 'dark' : 'light');
    if (t.os !== renderedOS) {
      var scrollId = location.hash && location.hash.indexOf('#c-') === 0 ? null : null;
      render(t.os);
      try { var u = new URL(location.href); u.searchParams.set('os', t.os); history.replaceState(null, '', u.pathname + u.search + location.hash); } catch (err) {}
    }
    syncPanel();
  }
  document.addEventListener('clay:themechange', onTheme);
  onTheme();
  if (location.hash.indexOf('#c-') === 0) { var target = document.querySelector(location.hash); if (target) setTimeout(function () { target.scrollIntoView(); target.classList.add('flash'); }, 60); }
  if (location.hash === '#foundations' && matchMedia('(max-width: 1280px)').matches) body.classList.add('show-right');
})();
