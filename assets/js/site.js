/* Clay — documentation site runtime: galaxy, smooth scroll, nav, demos, customizer, platform previews */
(function () {
  'use strict';
  var html = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = matchMedia('(hover: none)').matches;
  var I = function (n) { return Clay.icon(n); };
  var STORE = 'clay-site-theme';

  /* ------------------------------------------------------------ */
  /* Platform glyphs (generic, non-trademark)                      */
  /* ------------------------------------------------------------ */
  var OSI = {
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3.2 3 15.8 0 19M12 2.5c-3 3.2-3 15.8 0 19"/></svg>',
    ios: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="6" y="2" width="12" height="20" rx="3.2"/><path d="M10.5 4.6h3"/></svg>',
    android: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 16a7 7 0 0 1 14 0v1H5z"/><path d="m7.5 9.5-2-3M16.5 9.5l2-3"/><circle cx="9.5" cy="13.2" r=".6" fill="currentColor"/><circle cx="14.5" cy="13.2" r=".6" fill="currentColor"/></svg>',
    macos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M1.5 19.5h21"/><circle cx="6" cy="6.8" r=".5" fill="currentColor"/><circle cx="7.8" cy="6.8" r=".5" fill="currentColor"/></svg>',
    windows: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="1"/><rect x="13" y="13" width="7.5" height="7.5" rx="1"/></svg>',
    linux: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="m7 10 3 2.5L7 15M12.5 15H17"/></svg>'
  };
  var OS_ORDER = ['web', 'ios', 'android', 'macos', 'windows', 'linux'];

  /* ------------------------------------------------------------ */
  /* Theme state (persisted)                                       */
  /* ------------------------------------------------------------ */
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) {}
  try {
    var q = new URLSearchParams(location.search);
    ['os', 'mode', 'primary', 'font'].forEach(function (k) { if (q.get(k)) saved[k] = k === 'primary' ? '#' + q.get(k).replace('#', '') : q.get(k); });
    if (q.get('radius')) saved.radius = +q.get('radius');
  } catch (e) {}
  Clay.init(Object.assign({ target: html, os: 'web', mode: 'light' }, saved));
  Clay.onChange(function (t) {
    try { localStorage.setItem(STORE, JSON.stringify(t)); } catch (e) {}
    syncFollowers(); syncUI();
  });
  function syncFollowers() {
    var mode = html.getAttribute('data-clay-mode');
    document.querySelectorAll('[data-follow-mode]').forEach(function (el) { el.setAttribute('data-clay-mode', mode); });
  }

  /* ------------------------------------------------------------ */
  /* Galaxy canvas                                                 */
  /* ------------------------------------------------------------ */
  (function galaxy() {
    var c = document.getElementById('space'); if (!c) return;
    var ctx = c.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2), W, H, stars = [], shooters = [], mx = 0, my = 0, tmx = 0, tmy = 0, t0 = performance.now(), running = true;
    var tints = ['255,255,255', '255,255,255', '255,255,255', '200,190,255', '255,214,190', '190,240,255'];
    function size() {
      W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(1100, Math.round(W * H / 1700)); stars = [];
      for (var i = 0; i < n; i++) {
        var z = Math.pow(Math.random(), 2.2) * 0.9 + 0.1;
        stars.push({ x: Math.random() * W, y: Math.random() * H, z: z, r: z * 1.5 + 0.15, p: Math.random() * 6.28, s: 0.6 + Math.random() * 2.2, c: tints[(Math.random() * tints.length) | 0] });
      }
    }
    size(); addEventListener('resize', size);
    if (!touch) addEventListener('pointermove', function (e) { tmx = (e.clientX / W - 0.5); tmy = (e.clientY / H - 0.5); }, { passive: true });
    document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) requestAnimationFrame(frame); });
    function shoot() {
      if (!reduce && running) shooters.push({ x: Math.random() * W * 0.8 + W * 0.1, y: Math.random() * H * 0.4, vx: -(6 + Math.random() * 6), vy: 3 + Math.random() * 3, life: 1 });
      setTimeout(shoot, 3500 + Math.random() * 6000);
    }
    setTimeout(shoot, 2500);
    function frame(now) {
      if (!running) return;
      var t = (now - t0) / 1000, sy = scrollY;
      mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var y = ((s.y - sy * s.z * 0.12 - my * s.z * 26) % H + H) % H;
        var x = ((s.x - mx * s.z * 34) % W + W) % W;
        var a = reduce ? 0.8 * s.z + 0.2 : (0.55 + 0.45 * Math.sin(t * s.s + s.p)) * (0.35 + s.z * 0.65);
        ctx.globalAlpha = a; ctx.fillStyle = 'rgb(' + s.c + ')';
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill();
        if (s.r > 1.25) { ctx.globalAlpha = a * 0.18; ctx.beginPath(); ctx.arc(x, y, s.r * 3.2, 0, 6.283); ctx.fill(); }
      }
      for (var j = shooters.length - 1; j >= 0; j--) {
        var m = shooters[j]; m.x += m.vx; m.y += m.vy; m.life -= 0.012;
        if (m.life <= 0) { shooters.splice(j, 1); continue; }
        var g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        g.addColorStop(0, 'rgba(255,255,255,' + m.life + ')'); g.addColorStop(1, 'rgba(179,166,255,0)');
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ------------------------------------------------------------ */
  /* Butter-smooth scroll (wheel easing, native on touch)          */
  /* ------------------------------------------------------------ */
  var smooth = (function () {
    var target = scrollY, cur = scrollY, raf = 0, active = false;
    var max = function () { return document.documentElement.scrollHeight - innerHeight; };
    function loop() {
      cur += (target - cur) * 0.085;
      if (Math.abs(target - cur) < 0.4) { cur = target; active = false; }
      scrollTo(0, cur);
      raf = active ? requestAnimationFrame(loop) : 0;
    }
    function go(y) { target = Math.max(0, Math.min(max(), y)); if (!active) { cur = scrollY; active = true; raf = requestAnimationFrame(loop); } }
    function canScroll(el, dy) {
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.hasAttribute && el.hasAttribute('data-lenis-prevent')) return true;
        var st = getComputedStyle(el);
        if (/(auto|scroll)/.test(st.overflowY) && el.scrollHeight > el.clientHeight + 1) {
          if ((dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (dy < 0 && el.scrollTop > 0)) return true;
        }
        el = el.parentElement;
      }
      return false;
    }
    if (!reduce && !touch) {
      html.classList.add('smooth');
      addEventListener('wheel', function (e) {
        if (e.ctrlKey || e.defaultPrevented || document.body.classList.contains('no-scroll')) return;
        var dy = e.deltaY * (e.deltaMode === 1 ? 36 : e.deltaMode === 2 ? innerHeight : 1);
        if (Math.abs(e.deltaX) > Math.abs(dy) || canScroll(e.target, dy)) return;
        e.preventDefault();
        if (!active) target = scrollY;
        go(target + dy);
      }, { passive: false });
      addEventListener('scroll', function () { if (!active) { target = cur = scrollY; } }, { passive: true });
      addEventListener('keydown', function () { if (active) { active = false; cancelAnimationFrame(raf); } });
    }
    return { to: function (y) { if (reduce || touch) scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); else go(y); } };
  })();
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]'); if (!a) return;
    var url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash.length < 2) return;
    var el = document.getElementById(decodeURIComponent(url.hash.slice(1))); if (!el) return;
    e.preventDefault();
    var off = (document.querySelector('.toolbar') ? 160 : 100);
    smooth.to(el.getBoundingClientRect().top + scrollY - off);
    history.replaceState(null, '', url.hash);
    closeMenu();
  });

  /* ------------------------------------------------------------ */
  /* Nav, mobile menu, reveal, scroll spy                          */
  /* ------------------------------------------------------------ */
  var nav = document.getElementById('nav');
  addEventListener('scroll', function () { if (nav) nav.classList.toggle('scrolled', scrollY > 20); }, { passive: true });
  var menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('menuPanel');
  function closeMenu() { if (menu && !menu.hidden) { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.innerHTML = I('menu'); } }
  if (menuBtn) {
    menuBtn.innerHTML = I('menu');
    menuBtn.addEventListener('click', function () { var open = menu.hidden; menu.hidden = !open; menuBtn.setAttribute('aria-expanded', open); menuBtn.innerHTML = I(open ? 'x' : 'menu'); });
    document.addEventListener('click', function (e) { if (!e.target.closest('#menuPanel, #menuBtn')) closeMenu(); });
  }
  var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  document.querySelectorAll('.feat').forEach(function (el) {
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });
  var side = document.querySelector('.docs-side');
  if (side) {
    var links = Array.prototype.slice.call(side.querySelectorAll('a[href^="#"]'));
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    var spy = function () {
      var y = scrollY + 200, cur = secs[0];
      secs.forEach(function (s) { if (s.offsetTop <= y) cur = s; });
      links.forEach(function (a) { var on = cur && a.getAttribute('href') === '#' + cur.id; a.classList.toggle('active', on); });
    };
    addEventListener('scroll', spy, { passive: true }); spy();
  }
  document.querySelectorAll('[data-icon]').forEach(function (el) { el.outerHTML = I(el.getAttribute('data-icon')); });
  document.querySelectorAll('[data-os-icon]').forEach(function (el) { el.outerHTML = OSI[el.getAttribute('data-os-icon')]; });

  /* ------------------------------------------------------------ */
  /* Code: highlight, copy, demo wrappers                          */
  /* ------------------------------------------------------------ */
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function hl(code, lang) {
    var s = esc(code);
    if (lang === 'html' || lang === 'xml' || lang === 'xaml') {
      return s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tk-com">$1</span>')
        .replace(/(&lt;\/?)([a-zA-Z][\w:-]*)([\s\S]*?)(\/?&gt;)/g, function (_, a, tag, attrs, b) {
          attrs = attrs.replace(/([\w:-]+)(=)("[^"]*")/g, '<span class="tk-attr">$1</span>$2<span class="tk-str">$3</span>').replace(/\s([\w-]+)(?=\s|$)/g, ' <span class="tk-attr">$1</span>');
          return '<span class="tk-tag">' + a + tag + '</span>' + attrs + '<span class="tk-tag">' + b + '</span>';
        });
    }
    if (lang === 'css' || lang === 'scss' || lang === 'gtk') {
      return s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tk-com">$1</span>').replace(/(--[\w-]+|\$[\w-]+|@define-color [\w_]+)/g, '<span class="tk-attr">$1</span>').replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="tk-str">$1</span>').replace(/(\d+px)/g, '<span class="tk-num">$1</span>');
    }
    if (lang === 'bash') return s.replace(/^(#.*)$/gm, '<span class="tk-com">$1</span>').replace(/^(npm|pnpm|yarn|bun|npx)\b/gm, '<span class="tk-fn">$1</span>');
    // js / json / swift / kotlin / dart
    return s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)/g, '<span class="tk-str">$1</span>')
      .replace(/(^|\s)(\/\/.*)$/gm, '$1<span class="tk-com">$2</span>')
      .replace(/\b(import|export|from|const|let|var|function|return|new|static|enum|object|val|class|final|module|package|fun|struct|true|false|null|default|if|else|await|async)\b(?![^<]*<\/span>)/g, '<span class="tk-key">$1</span>')
      .replace(/\b(\d+(?:\.\d+)?)\b(?![^<]*<\/span>)/g, '<span class="tk-num">$1</span>');
  }
  function dedent(s) {
    var lines = s.replace(/^\n+|\s+$/g, '').split('\n');
    var min = Math.min.apply(null, lines.filter(function (l) { return l.trim(); }).map(function (l) { return l.match(/^\s*/)[0].length; }));
    return lines.map(function (l) { return l.slice(min); }).join('\n');
  }
  function copy(text, btn) {
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).catch(function () {
      var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }).finally(function () {
      if (btn) { btn.classList.add('done'); var o = btn.innerHTML; btn.innerHTML = I('check') + 'Copied'; setTimeout(function () { btn.classList.remove('done'); btn.innerHTML = o; }, 1600); }
      sToast('Copied to clipboard');
    });
  }
  var st;
  function sToast(msg) {
    var el = document.querySelector('.s-toast'); if (!el) { el = document.createElement('div'); el.className = 's-toast'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show'); clearTimeout(st); st = setTimeout(function () { el.classList.remove('show'); }, 1800);
  }
  function codeBlock(code, lang, label) {
    var w = document.createElement('div'); w.className = 'code';
    w.innerHTML = '<div class="code-head"><span>' + (label || lang) + '</span><span class="sp"></span><button class="copy-btn" type="button">' + I('copy') + 'Copy</button></div><pre data-lenis-prevent><code></code></pre>';
    w.querySelector('code').innerHTML = hl(code, lang);
    w.querySelector('.copy-btn').onclick = function () { copy(w._code || code, this); };
    w._code = code;
    return w;
  }
  window.ClaySite = { codeBlock: codeBlock, hl: hl, copy: copy, OSI: OSI, toast: sToast, dedent: dedent, OS_ORDER: OS_ORDER };

  // Static <pre data-lang> blocks
  document.querySelectorAll('pre[data-lang]').forEach(function (pre) {
    var block = codeBlock(dedent(pre.textContent), pre.getAttribute('data-lang'), pre.getAttribute('data-label'));
    pre.replaceWith(block);
  });

  // Demos: capture markup before icons hydrate, add Preview/Code toggle + copy
  document.querySelectorAll('.demo').forEach(function (demo) {
    var stage = demo.querySelector('.demo-stage');
    var src = dedent(stage.innerHTML.replace(/ data-follow-mode=""/g, ''));
    var head = document.createElement('div'); head.className = 'demo-head';
    head.innerHTML = '<span class="t"></span><div class="seg" role="group" aria-label="View"><button type="button" aria-pressed="true" data-v="preview">Preview</button><button type="button" aria-pressed="false" data-v="code">Code</button></div><button class="copy-btn" type="button">' + I('copy') + '<span class="hide-xs">Copy</span></button>';
    head.querySelector('.t').textContent = demo.getAttribute('data-title') || '';
    demo.insertBefore(head, stage);
    var cb = codeBlock(src, 'html'); cb.hidden = true; demo.appendChild(cb);
    head.querySelector('.copy-btn').onclick = function () { copy(src, this); };
    head.querySelectorAll('[data-v]').forEach(function (b) {
      b.onclick = function () {
        var code = b.getAttribute('data-v') === 'code';
        head.querySelectorAll('[data-v]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        cb.hidden = !code;
      };
    });
  });

  /* ------------------------------------------------------------ */
  /* Sample app screens per platform                               */
  /* ------------------------------------------------------------ */
  function statusBar(os) {
    var icons = '<span class="clay-statusbar-icons">' + I('signal').replace('clay-icon', 'clay-icon" style="width:16px;height:16px') + I('wifi').replace('clay-icon', 'clay-icon" style="width:16px;height:16px') + I('battery').replace('clay-icon', 'clay-icon" style="width:22px;height:18px') + '</span>';
    return os === 'android' ? '<div class="clay-statusbar clay-statusbar--android"><span>9:41</span>' + icons + '</div>' : '<div class="clay-statusbar"><span>9:41</span>' + icons + '</div>';
  }
  function mobileScreen(os, mode) {
    var ios = os === 'ios';
    var top = ios
      ? '<div class="clay-appbar" style="border:0;background:transparent;min-height:40px"><button class="clay-btn clay-btn--ghost clay-btn--sm" style="padding:0 4px">' + I('chevron-left') + 'Back</button><span class="clay-spacer"></span><button class="clay-btn clay-btn--ghost clay-btn--icon clay-btn--sm" aria-label="Add">' + I('plus') + '</button></div><div class="clay-large-title">Wallet</div>'
      : '<div class="clay-appbar"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Menu">' + I('menu') + '</button><span class="clay-appbar-title" style="font-size:22px">Wallet</span><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Search">' + I('search') + '</button><span class="clay-avatar clay-avatar--sm">MA</span></div>';
    return '<div class="clay-device' + (ios ? '' : ' clay-device--android') + '"><div class="clay-device-island"></div>' +
      '<div class="clay-device-screen clay" data-clay-os="' + os + '" data-clay-mode="' + mode + '">' + statusBar(os) + top +
      '<div style="flex:1;overflow:hidden;padding:4px 16px 0;display:flex;flex-direction:column;gap:14px">' +
      '<div class="clay-card" style="background:linear-gradient(135deg,var(--clay-primary),color-mix(in oklab,var(--clay-primary) 55%,#ff8a6b));color:var(--clay-on-primary);border:0"><div class="clay-card-body" style="gap:2px"><span style="opacity:.8;font-size:13px">Total balance</span><span style="font-size:30px;font-weight:700;letter-spacing:-.02em">$24,580.20</span><span style="opacity:.85;font-size:12px">+ 12.4% this month</span></div></div>' +
      '<div class="clay-segmented" style="width:100%"><input type="radio" name="sg-' + os + '-' + mode + '" id="sg1-' + os + mode + '" checked><label for="sg1-' + os + mode + '">Week</label><input type="radio" name="sg-' + os + '-' + mode + '" id="sg2-' + os + mode + '"><label for="sg2-' + os + mode + '">Month</label><input type="radio" name="sg-' + os + '-' + mode + '" id="sg3-' + os + mode + '"><label for="sg3-' + os + mode + '">Year</label></div>' +
      '<ul class="clay-list">' +
      '<li class="clay-list-item clay-list-item--action"><span class="clay-list-icon" style="background:#ff9500">' + I('cart') + '</span><span class="clay-list-text"><span class="clay-list-title">Groceries</span><span class="clay-list-sub">Today · Card</span></span><span class="clay-list-trail">−$84</span></li>' +
      '<li class="clay-list-item clay-list-item--action"><span class="clay-list-icon" style="background:#34c759">' + I('wallet') + '</span><span class="clay-list-text"><span class="clay-list-title">Salary</span><span class="clay-list-sub">Yesterday</span></span><span class="clay-list-trail" style="color:var(--clay-success)">+$4,200</span></li>' +
      '<li class="clay-list-item"><span class="clay-list-icon" style="background:#5856d6">' + I('bell') + '</span><span class="clay-list-text"><span class="clay-list-title">Alerts</span></span><input type="checkbox" role="switch" class="clay-switch" checked aria-label="Alerts"></li>' +
      '</ul>' +
      '<button class="clay-btn clay-btn--block">' + I('send') + 'Send money</button>' +
      '</div>' +
      '<nav class="clay-tabbar"><a class="clay-tabbar-item is-active" aria-current="page">' + I('home') + 'Home</a><a class="clay-tabbar-item">' + I('chart') + 'Insights</a><a class="clay-tabbar-item">' + I('wallet') + 'Cards</a><a class="clay-tabbar-item">' + I('user') + 'Profile</a></nav>' +
      (ios ? '<div class="clay-home-indicator" style="position:absolute;bottom:0;left:50%;transform:translateX(-50%)"></div>' : '') +
      '</div></div>';
  }
  function titleBar(os) {
    if (os === 'macos') return '<div class="clay-titlebar"><span class="clay-traffic"><i></i><i></i><i></i></span><span class="clay-titlebar-title">Clay — Dashboard</span><span style="width:52px"></span></div>';
    if (os === 'windows') return '<div class="clay-titlebar" style="background:var(--clay-bg);border:0;font-weight:400;color:var(--clay-text)">' + I('layers').replace('clay-icon', 'clay-icon" style="width:16px;height:16px;color:var(--clay-primary)') + '<span>Clay Dashboard</span><span class="clay-caption-btns"><i></i><i></i><i></i></span></div>';
    if (os === 'linux') return '<div class="clay-titlebar" style="height:46px;background:var(--clay-surface-2)"><button class="clay-btn clay-btn--plain clay-btn--icon clay-btn--sm" aria-label="Menu">' + I('menu') + '</button><span class="clay-titlebar-title" style="color:var(--clay-text);font-weight:700">Dashboard</span><span class="clay-gnome-btns"><i></i></span></div>';
    return '<div class="clay-titlebar"><span class="clay-traffic" style="opacity:.5"><i></i><i></i><i></i></span><span style="flex:1;display:flex;justify-content:center"><span style="padding:3px 40px;border-radius:8px;background:var(--clay-surface);font-weight:500;font-size:12px;color:var(--clay-text-3)">app.clay.design</span></span><span style="width:52px"></span></div>';
  }
  function desktopScreen(os, mode) {
    return '<div class="clay-window clay" data-clay-os="' + os + '" data-clay-mode="' + mode + '">' + titleBar(os) +
      '<div style="flex:1;display:flex;min-height:0">' +
      '<aside class="clay-sidebar" style="min-width:150px;width:150px;background:' + (os === 'macos' ? 'color-mix(in oklab,var(--clay-surface-2) 70%,transparent)' : 'var(--clay-bg)') + ';border-right:1px solid var(--clay-border)">' +
      '<a class="clay-sidebar-item" aria-current="page">' + I('home') + 'Overview</a><a class="clay-sidebar-item">' + I('chart') + 'Analytics</a><a class="clay-sidebar-item">' + I('users') + 'Team <span class="clay-badge">4</span></a><a class="clay-sidebar-item">' + I('settings') + 'Settings</a></aside>' +
      '<div style="flex:1;min-width:0;padding:16px;display:flex;flex-direction:column;gap:12px;overflow:hidden">' +
      '<div class="clay-row clay-row-between" style="flex-wrap:nowrap"><span class="clay-h3" style="white-space:nowrap">Overview</span><span class="clay-row" style="gap:8px;flex-wrap:nowrap"><button class="clay-btn clay-btn--secondary clay-btn--sm">Export</button><button class="clay-btn clay-btn--sm">' + I('plus') + 'New</button></span></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
      '<div class="clay-card"><div class="clay-card-body clay-stat" style="padding:12px 14px"><span class="clay-stat-label">Revenue</span><span class="clay-stat-value" style="font-size:22px">$48.2k</span><span class="clay-stat-delta">▲ 8.1%</span></div></div>' +
      '<div class="clay-card"><div class="clay-card-body clay-stat" style="padding:12px 14px"><span class="clay-stat-label">Active users</span><span class="clay-stat-value" style="font-size:22px">2,914</span><span class="clay-stat-delta is-down">▼ 1.2%</span></div></div></div>' +
      '<div class="clay-card"><div class="clay-card-body" style="padding:12px 14px;gap:10px"><div class="clay-row clay-row-between"><span class="clay-label">Storage</span><span class="clay-caption">72%</span></div><div class="clay-progress" style="--clay-value:72%"><span></span></div>' +
      '<div class="clay-row clay-row-between"><span class="clay-label">Auto-sync</span><input type="checkbox" role="switch" class="clay-switch" checked aria-label="Auto-sync"></div></div></div>' +
      '</div></div></div>';
  }
  function appScreen(os, mode) { return (os === 'ios' || os === 'android') ? mobileScreen(os, mode) : desktopScreen(os, mode); }
  window.ClaySite.appScreen = appScreen;

  /* Hero platform switcher (auto-cycles until touched) */
  var heroStage = document.getElementById('heroStage');
  if (heroStage) {
    var strip = document.getElementById('heroOS'), idx = 1, timer, layers = [];
    strip.innerHTML = OS_ORDER.map(function (o) { return '<button class="os-pill" type="button" data-os="' + o + '" aria-pressed="false">' + OSI[o] + Clay.OS[o].label + '</button>'; }).join('');
    var showOS = function (os) {
      strip.querySelectorAll('.os-pill').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-os') === os); });
      var layer = document.createElement('div'); layer.className = 'stage-swap out'; layer.innerHTML = appScreen(os, 'light');
      heroStage.appendChild(layer); Clay.upgrade(layer);
      requestAnimationFrame(function () { requestAnimationFrame(function () { layer.classList.remove('out'); }); });
      layers.forEach(function (l) { l.classList.add('out'); setTimeout(function () { l.remove(); }, 900); });
      layers = [layer];
      var lbl = document.getElementById('heroOSLabel'); if (lbl) lbl.textContent = Clay.OS[os].family;
    };
    strip.addEventListener('click', function (e) { var b = e.target.closest('[data-os]'); if (!b) return; clearInterval(timer); showOS(b.getAttribute('data-os')); });
    showOS('ios');
    if (!reduce) timer = setInterval(function () { idx = (idx + 1) % OS_ORDER.length; showOS(OS_ORDER[idx]); }, 4200);
  }

  /* Platform gallery (6 presets side by side) */
  document.querySelectorAll('[data-os-gallery]').forEach(function (g) {
    g.innerHTML = OS_ORDER.map(function (os, i) {
      var p = Clay.OS[os];
      return '<article class="glass os-card reveal" style="--d:' + (i * 0.06) + 's"><div class="os-card-head"><h3>' + OSI[os] + p.label + '</h3><small>' + p.family + '</small></div>' +
        '<div class="os-card-stage clay" data-clay-os="' + os + '" data-follow-mode data-clay-mode="' + html.getAttribute('data-clay-mode') + '">' +
        '<div class="clay-row clay-row-between"><span class="clay-title">Notifications</span><input type="checkbox" role="switch" class="clay-switch" checked aria-label="Notifications"></div>' +
        '<div class="clay-segmented"><input type="radio" name="g-' + os + '" id="g1' + os + '" checked><label for="g1' + os + '">Daily</label><input type="radio" name="g-' + os + '" id="g2' + os + '"><label for="g2' + os + '">Weekly</label></div>' +
        '<input class="clay-input" placeholder="Search settings">' +
        '<div class="clay-row"><label class="clay-choice"><input type="checkbox" class="clay-check" checked>Email</label><label class="clay-choice"><input type="radio" class="clay-radio" name="r' + os + '" checked>Push</label></div>' +
        '<input type="range" class="clay-range" value="60" aria-label="Volume">' +
        '<div class="clay-row" style="margin-top:auto"><button class="clay-btn">Save</button><button class="clay-btn clay-btn--tonal">Cancel</button></div></div></article>';
    }).join('');
    g.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    Clay.upgrade(g);
  });

  /* ------------------------------------------------------------ */
  /* Theme sync for page-level controls                            */
  /* ------------------------------------------------------------ */
  function syncUI() {
    var t = Clay.getTheme();
    document.querySelectorAll('[data-sync-os]').forEach(function (g) { g.querySelectorAll('[data-os]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-os') === t.os); }); });
    document.querySelectorAll('[data-sync-mode]').forEach(function (g) { g.querySelectorAll('[data-mode]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-mode') === t.mode); }); });
    document.querySelectorAll('[data-live="os"]').forEach(function (el) { el.textContent = Clay.OS[t.os].label + ' · ' + Clay.OS[t.os].family; });
    document.dispatchEvent(new CustomEvent('clay:themechange', { detail: t }));
  }

  /* Page-level OS / mode switchers (toolbars) */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-sync-os] [data-os]'); if (b) Clay.setOS(b.getAttribute('data-os'));
    var m = e.target.closest('[data-sync-mode] [data-mode]'); if (m) Clay.setMode(m.getAttribute('data-mode'));
  });
  document.querySelectorAll('[data-sync-os]').forEach(function (g) {
    g.innerHTML = OS_ORDER.map(function (o) { return '<button type="button" data-os="' + o + '" aria-pressed="false">' + OSI[o] + '<span>' + Clay.OS[o].label + '</span></button>'; }).join('');
  });
  document.querySelectorAll('[data-sync-mode]').forEach(function (g) {
    g.innerHTML = '<button type="button" data-mode="light" aria-pressed="false" aria-label="Light">' + I('sun') + '</button><button type="button" data-mode="dark" aria-pressed="false" aria-label="Dark">' + I('moon') + '</button>';
  });

  syncFollowers(); syncUI();
  Clay.upgrade();
})();
