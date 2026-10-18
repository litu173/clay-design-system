/* Clay component catalog — coverage additions (found by scripts/coverage.mjs) and cross-platform tagging */
(function () {
  var C = window.ClayCatalog = window.ClayCatalog || [];
  function patch(id, os, native) {
    var c = C.filter(function (x) { return x.id === id; })[0]; if (!c) return;
    c.os = c.os.concat(os.filter(function (o) { return c.os.indexOf(o) < 0; })); // copy: entries share os arrays
    c.native = Object.assign(c.native || {}, native || {});
  }
  patch('button-group', ['android'], { android: 'Connected button group' });
  patch('split-button', ['android'], { android: 'Split button' });
  patch('combobox', ['macos'], { macos: 'Combo box' });
  patch('adw-levelbar', ['macos'], { macos: 'Level indicator' });
  patch('cascader', ['macos'], { macos: 'Column view (browser)' });
  patch('carousel', ['windows', 'linux'], { windows: 'FlipView', linux: 'Carousel' });
  patch('gallery', ['ios', 'windows', 'android'], { ios: 'Collection view (grid)', windows: 'GridView', android: 'Image grid' });
  patch('charts', ['ios', 'android', 'macos', 'windows', 'linux'], { ios: 'Swift Charts', macos: 'Swift Charts', windows: 'Charts', android: 'Charts', linux: 'Charts' });
  patch('color-picker', ['ios'], { ios: 'Color picker' });
  patch('ios-page-control', ['windows', 'linux'], { windows: 'PipsPager', linux: 'Carousel indicator dots' });
  patch('adw-levelbar', ['web'], { web: 'Password strength / level meter' });

  // Deterministic decorative QR-style matrix (pair with any encoder for real codes)
  function qr(seed) {
    var n = 25, s = seed, cells = '';
    function rnd() { s = (s * 9301 + 49297) % 233280; return s / 233280; }
    function finder(x, y) { return '<rect x="' + x + '" y="' + y + '" width="7" height="7" fill="#000"/><rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" fill="#fff"/><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3" fill="#000"/>'; }
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      var inF = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
      if (!inF && rnd() > 0.52) cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    }
    return '<svg viewBox="0 0 25 25" shape-rendering="crispEdges" aria-hidden="true"><g fill="#000">' + cells + '</g>' + finder(0, 0) + finder(18, 0) + finder(0, 18) + '</svg>';
  }
  var DESK = ['web', 'macos', 'windows', 'linux'];
  var emojis = '😀 😂 🥹 😍 🤩 😎 🤔 😴 👍 👏 🙌 🔥 ✨ 🎉 💜 🚀 ☕ 🌈 🍕 🎧 📌 ✅ ⚡ 🌙'.split(' ');

  C.push(
  /* ---------- Web additions ---------- */
  { id: 'tree-select', name: 'Tree select', cat: 'Selection', os: ['web'],
    desc: 'Choose from a hierarchy inside a dropdown field.',
    html: `<div class="clay-field" style="width:300px"><label for="trs">Department</label><div class="clay-combobox is-open"><input id="trs" class="clay-input" value="Engineering / Platform" readonly><div class="clay-listbox" style="padding:6px"><ul class="clay-tree"><li><details open><summary>Engineering</summary><ul><li class="clay-tree-leaf is-selected">Platform</li><li class="clay-tree-leaf">Mobile</li></ul></details></li><li><details><summary>Design</summary><ul><li class="clay-tree-leaf">Brand</li></ul></details></li><li class="clay-tree-leaf">Finance</li></ul></div></div></div>`, layout: 'tall' },

  { id: 'mentions', name: 'Mentions', cat: 'Inputs', os: ['web'],
    desc: 'Type @ to mention people, as in comments and chat.',
    html: `<div class="clay-field" style="width:min(100%,420px)"><label for="mnt">Comment</label><div class="clay-combobox is-open"><textarea id="mnt" class="clay-textarea" style="min-height:80px">Great work @gr</textarea><ul class="clay-listbox" role="listbox" style="width:240px"><li class="clay-option is-active" role="option"><span class="clay-avatar clay-avatar--sm" style="background:linear-gradient(135deg,#ff9f80,#e11d48)">GH</span>Grace Hopper</li><li class="clay-option" role="option"><span class="clay-avatar clay-avatar--sm">GR</span>Greg Rivers</li></ul></div></div>`, layout: 'tall' },

  { id: 'date-range', name: 'Date range picker', cat: 'Selection', os: ['web', 'windows'], native: { windows: 'CalendarView (range)' },
    desc: 'Click a start date and then an end date. Fires a clay:range event.',
    html: `<div class="clay-calendar" data-clay-calendar data-clay-range></div>`, layout: 'center' },

  { id: 'lightbox', name: 'Image preview', cat: 'Overlays', os: ['web'], native: { web: 'Image preview / lightbox' },
    desc: 'Click a thumbnail to open it full size in a dialog.',
    html: `<button class="clay-thumb" data-clay-open="#lbx" aria-label="Open image"></button><button class="clay-thumb" data-clay-open="#lbx" aria-label="Open image" style="background:linear-gradient(135deg,#0ea5e9,#10b981)"></button>
<dialog class="clay-dialog clay-lightbox" id="lbx" aria-label="Image preview"><div class="clay-slide">Aurora · 4096 × 2560</div><div class="clay-row clay-row-between" style="padding:10px 14px"><span class="clay-caption" style="color:#aaa">1 of 2</span><button class="clay-btn clay-btn--sm clay-btn--secondary" data-clay-close>Close</button></div></dialog>` },

  { id: 'qr-code', name: 'QR code', cat: 'Data display', os: ['web'],
    desc: 'A styled frame for QR codes. Pair it with any encoder to produce a real matrix; the pattern shown here is decorative.',
    html: `<div class="clay-stack" style="align-items:center;gap:8px"><div class="clay-qr">${qr(7)}</div><span class="clay-caption">Scan to open on mobile</span></div>` },

  { id: 'popconfirm', name: 'Popconfirm', cat: 'Overlays', os: ['web'],
    desc: 'A lightweight confirmation anchored to the action that needs it.',
    html: `<div class="clay-stack" style="gap:10px;align-items:flex-start"><div class="clay-popover clay-popover--arrow" style="max-width:280px;padding:14px" role="alertdialog" aria-label="Confirm"><div class="clay-row" style="flex-wrap:nowrap;align-items:flex-start;gap:10px"><i data-clay-icon="alert" style="color:var(--clay-warning)"></i><div><b class="clay-label">Delete this task?</b><p class="clay-caption">This cannot be undone.</p></div></div><div class="clay-row" style="justify-content:flex-end;gap:6px;margin-top:10px"><button class="clay-btn clay-btn--secondary clay-btn--sm">No</button><button class="clay-btn clay-btn--danger clay-btn--sm">Yes, delete</button></div></div></div>`, layout: 'pad-top' },

  { id: 'watermark', name: 'Watermark', cat: 'Data display', os: ['web'],
    desc: 'A repeating, theme-aware watermark over sensitive content.',
    html: `<div class="clay-card clay-watermark" style="width:100%"><div class="clay-card-body"><b class="clay-title">Q3 board report</b><p class="clay-muted">Revenue grew 42% quarter on quarter, driven by the native token export feature.</p><div class="clay-skeleton" style="height:60px;animation:none"></div></div></div>` },

  /* ---------- Shared desktop/web ---------- */
  { id: 'context-menu', name: 'Context menu', cat: 'Overlays', os: DESK, native: { windows: 'MenuFlyout (context)', macos: 'Contextual menu', linux: 'Context popover menu' },
    desc: 'Right-click (or long-press) the area below. Positioned at the pointer and kept inside the viewport.',
    html: `<div class="clay-ctx-area" data-clay-contextmenu>Right-click anywhere here
<div class="clay-menu" role="menu"><button class="clay-menu-item" role="menuitem"><i data-clay-icon="copy"></i>Copy<kbd class="clay-kbd">⌘C</kbd></button><button class="clay-menu-item" role="menuitem"><i data-clay-icon="edit"></i>Rename</button><button class="clay-menu-item" role="menuitem"><i data-clay-icon="share"></i>Share…</button><div class="clay-menu-sep"></div><button class="clay-menu-item clay-menu-item--danger" role="menuitem"><i data-clay-icon="trash"></i>Move to Trash</button></div></div>` },

  { id: 'editor', name: 'Rich text editor', cat: 'Inputs', os: ['web', 'macos', 'windows'], native: { windows: 'RichEditBox', macos: 'Rich text view' },
    desc: 'A formatting toolbar over a contenteditable surface. Clay styles it; wire it to your favourite editor engine.',
    html: `<div class="clay-editor" style="width:100%"><div class="clay-editor-toolbar" role="toolbar" aria-label="Formatting"><select class="clay-select" style="width:auto;min-height:30px;font-size:13px" aria-label="Style"><option>Paragraph</option><option>Heading 1</option><option>Heading 2</option></select><span class="clay-divider-v"></span><button aria-pressed="true" aria-label="Bold"><b>B</b></button><button aria-label="Italic"><i style="font-family:serif">I</i></button><button aria-label="Underline"><u>U</u></button><span class="clay-divider-v"></span><button aria-label="Link"><i data-clay-icon="share"></i></button><button aria-label="Image"><i data-clay-icon="image"></i></button><button aria-label="Code"><i data-clay-icon="code"></i></button></div><div class="clay-editor-body" contenteditable="true"><p><b>Clay</b> makes cross-platform UI feel <i>native</i>. Try typing here…</p></div></div>` },

  { id: 'media', name: 'Media player', cat: 'Data display', os: ['web', 'ios', 'android', 'windows'], native: { ios: 'Now Playing', android: 'Media controls', windows: 'MediaPlayerElement' },
    desc: 'Artwork, scrubber and transport controls.',
    html: `<div class="clay-player"><div class="clay-player-art"><i data-clay-icon="music"></i></div><div><b>Midnight Tokens</b><div class="clay-caption">The Design Systems</div></div><input type="range" class="clay-range" value="38" aria-label="Seek"><div class="clay-player-row"><span>1:24</span><span class="clay-grow"></span><span>-2:16</span></div><div class="clay-player-controls"><button class="clay-btn clay-btn--icon clay-btn--ghost" aria-label="Previous"><i data-clay-icon="chevron-left"></i></button><button class="clay-btn clay-btn--icon clay-btn--lg" aria-label="Pause"><i data-clay-icon="pause"></i></button><button class="clay-btn clay-btn--icon clay-btn--ghost" aria-label="Next"><i data-clay-icon="chevron-right"></i></button></div></div>`, layout: 'center' },

  { id: 'shortcuts', name: 'Keyboard shortcuts', cat: 'Overlays', os: DESK, native: { linux: 'Shortcuts dialog', windows: 'Keyboard shortcuts', macos: 'Keyboard shortcuts' },
    desc: 'A reference of keyboard shortcuts. Many apps open it with ? or Ctrl+/.',
    html: `<div class="clay-dialog is-static" style="width:min(100%,640px)"><div class="clay-dialog-body" style="text-align:left"><h3 class="clay-dialog-title">Keyboard shortcuts</h3><div class="clay-shortcuts"><h4>General</h4><div>Search<span><kbd class="clay-kbd">⌘</kbd> <kbd class="clay-kbd">K</kbd></span></div><div>New project<span><kbd class="clay-kbd">⌘</kbd> <kbd class="clay-kbd">N</kbd></span></div><div>Settings<span><kbd class="clay-kbd">⌘</kbd> <kbd class="clay-kbd">,</kbd></span></div><div>Show shortcuts<span><kbd class="clay-kbd">?</kbd></span></div><h4>Editing</h4><div>Undo<span><kbd class="clay-kbd">⌘</kbd> <kbd class="clay-kbd">Z</kbd></span></div><div>Duplicate<span><kbd class="clay-kbd">⌘</kbd> <kbd class="clay-kbd">D</kbd></span></div></div></div></div>`, layout: 'center' },

  { id: 'emoji', name: 'Emoji picker', cat: 'Inputs', os: DESK, native: { macos: 'Character viewer', windows: 'Emoji panel', linux: 'Emoji chooser' },
    desc: 'Searchable emoji grid with category tabs.',
    html: `<div class="clay-emoji" role="dialog" aria-label="Emoji"><div class="clay-input-group"><i data-clay-icon="search"></i><input class="clay-input" placeholder="Search emoji" aria-label="Search emoji"></div><div class="clay-emoji-grid">${emojis.map(function (e) { return '<button type="button" aria-label="' + e + '">' + e + '</button>'; }).join('')}</div><div class="clay-emoji-cats"><i data-clay-icon="refresh"></i><i data-clay-icon="sun"></i><i data-clay-icon="heart"></i><i data-clay-icon="star"></i><i data-clay-icon="zap"></i><i data-clay-icon="globe"></i></div></div>` },

  /* ---------- iOS ---------- */
  { id: 'ios-split-view', name: 'Sidebar & split view', cat: 'Navigation', os: ['ios'], native: { ios: 'Split view (iPadOS sidebar)' },
    desc: 'The iPad three-column layout: sidebar, list and detail.',
    html: `<div class="clay-device clay-device--tablet" style="width:min(100%,620px)"><div class="clay-device-screen" style="flex-direction:row"><nav class="clay-sidebar" style="min-width:170px;width:170px;background:var(--clay-surface-2);padding-top:28px"><span class="clay-large-title" style="font-size:24px;padding:0 6px 8px">Mail</span><a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="mail"></i>Inbox</a><a class="clay-sidebar-item"><i data-clay-icon="send"></i>Sent</a><a class="clay-sidebar-item"><i data-clay-icon="star"></i>Flagged</a></nav><div style="width:190px;border-right:1px solid var(--clay-border);padding-top:28px;background:var(--clay-surface)"><div class="clay-list-item"><span class="clay-list-text"><b class="clay-label">Ada Lovelace</b><span class="clay-caption">Tokens review</span></span></div><div class="clay-list-item" style="background:var(--clay-primary);color:#fff"><span class="clay-list-text"><b class="clay-label">Grace Hopper</b><span class="clay-caption" style="color:#fffc">Launch plan</span></span></div></div><div style="flex:1;padding:32px 18px" class="clay-stack"><b class="clay-title">Launch plan</b><div class="clay-skeleton"></div><div class="clay-skeleton" style="width:70%"></div></div></div></div>`, layout: 'center' },

  { id: 'ios-gauge', name: 'Gauge', cat: 'Feedback', os: ['ios'], native: { ios: 'Gauge (circular & accessory)' },
    desc: 'A value within a range, as an arc or ring.',
    html: `<div class="clay-stack" style="align-items:center;gap:4px"><div class="clay-gauge" style="--v:.62"><b style="font-size:22px;position:relative">62</b></div><span class="clay-caption">Air quality</span></div><div class="clay-stack" style="align-items:center;gap:6px"><div class="clay-gauge-ring" style="--v:.7"></div><span class="clay-caption">Activity · 70%</span></div>` },

  /* ---------- Android (Material 3 expressive) ---------- */
  { id: 'm3-fab-menu', name: 'FAB menu', cat: 'Actions', os: ['android'],
    desc: 'A FAB that opens into a menu of related actions.',
    html: `<div class="clay-fab-menu"><button class="clay-fab-menu-item"><i data-clay-icon="image"></i>Photo</button><button class="clay-fab-menu-item"><i data-clay-icon="file"></i>Document</button><button class="clay-fab-menu-item"><i data-clay-icon="folder"></i>Folder</button><button class="clay-fab clay-fab--primary" aria-label="Close menu" style="border-radius:50%"><i data-clay-icon="x"></i></button></div>`, layout: 'end' },

  { id: 'm3-float-toolbar', name: 'Floating toolbar', cat: 'Navigation', os: ['android'], native: { android: 'Toolbar (floating)' },
    desc: 'A floating, pill-shaped toolbar for contextual actions.',
    html: `<div class="clay-float-toolbar" role="toolbar" aria-label="Editing"><button aria-label="Draw" class="is-active"><i data-clay-icon="edit"></i></button><button aria-label="Text"><i data-clay-icon="type"></i></button><button aria-label="Image"><i data-clay-icon="image"></i></button><button aria-label="Share"><i data-clay-icon="share"></i></button></div>`, layout: 'center' },

  { id: 'm3-loading', name: 'Loading indicator', cat: 'Feedback', os: ['android'], native: { android: 'Loading indicator (expressive)' },
    desc: 'A shape-morphing loading indicator, uncontained and contained.',
    html: `<span class="clay-shape-loader" role="status" aria-label="Loading"></span><span class="clay-shape-loader--contained" role="status" aria-label="Loading"></span>` },

  /* ---------- Windows ---------- */
  { id: 'win-datepicker', name: 'DatePicker', cat: 'Selection', os: ['windows'],
    desc: 'The Fluent day, month and year column picker.',
    html: `<div class="clay-colpicker" role="dialog" aria-label="Pick a date"><div class="clay-colpicker-cols"><div style="width:120px"><span>September</span><span class="is-selected">October</span><span>November</span></div><div><span>18</span><span class="is-selected">19</span><span>20</span></div><div><span>2025</span><span class="is-selected">2026</span><span>2027</span></div></div><div class="clay-colpicker-foot"><button aria-label="Accept"><i data-clay-icon="check"></i></button><button aria-label="Dismiss"><i data-clay-icon="x"></i></button></div></div>` },

  /* ---------- Linux ---------- */
  { id: 'adw-switcher-bar', name: 'View switcher bar', cat: 'Navigation', os: ['linux'], native: { linux: 'AdwViewSwitcherBar (mobile)' },
    desc: 'The bottom view switcher used on narrow, phone-sized windows.',
    html: `<nav class="clay-tabbar" aria-label="Views" style="width:100%;background:var(--clay-surface-2)"><a class="clay-tabbar-item is-active" aria-current="page"><i data-clay-icon="music"></i>Songs</a><a class="clay-tabbar-item"><i data-clay-icon="users"></i>Artists</a><a class="clay-tabbar-item"><i data-clay-icon="layers"></i>Albums</a></nav>`, frame: 'phone', layout: 'flush' }
  );

  C.push(
  { id: 'event-calendar', name: 'Event calendar', cat: 'Data display', os: ['web', 'macos', 'windows', 'linux'], native: { macos: 'Calendar (month view)', windows: 'Calendar month view', linux: 'Calendar month view' },
    desc: 'A month view with events, as in scheduling apps.', wide: true,
    html: `<div class="clay-events"><div class="clay-events-head"><b class="clay-title">October 2026</b><span class="clay-grow"></span><div class="clay-btn-group"><button class="clay-btn clay-btn--secondary clay-btn--sm" aria-label="Previous"><i data-clay-icon="chevron-left"></i></button><button class="clay-btn clay-btn--secondary clay-btn--sm">Today</button><button class="clay-btn clay-btn--secondary clay-btn--sm" aria-label="Next"><i data-clay-icon="chevron-right"></i></button></div></div>
<div class="clay-events-grid">${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(function (d) { return '<span>' + d + '</span>'; }).join('')}${(function () { var h = '', ev = { 6: '<span class="clay-event">Design review</span>', 9: '<span class="clay-event clay-event--warning">Token freeze</span>', 14: '<span class="clay-event">Sprint planning</span><span class="clay-event clay-event--success">Ship 1.0 🚀</span>', 19: '<span class="clay-event clay-event--success">Launch day</span>', 23: '<span class="clay-event">Retro</span>' }; for (var i = 0; i < 21; i++) { var d = i - 2; h += '<div class="' + (d < 1 ? 'is-muted' : d === 19 ? 'is-today' : '') + '"><b>' + (d < 1 ? 28 + d : d) + '</b>' + (ev[d] || '') + '</div>'; } return h; })()}</div></div>` },

  { id: 'countdown', name: 'Countdown', cat: 'Data display', os: ['web', 'ios', 'android'], native: { ios: 'Timer text', android: 'Countdown' },
    desc: 'A live countdown for launches and sales. Set data-clay-countdown to an ISO date.',
    html: `<div class="clay-countdown" data-clay-countdown="2026-12-31T23:59:59" role="timer" aria-label="Time remaining"><div><b>00</b><small>Days</small></div><i>:</i><div><b>00</b><small>Hours</small></div><i>:</i><div><b>00</b><small>Min</small></div><i>:</i><div><b>00</b><small>Sec</small></div></div>`, layout: 'center' },

  { id: 'copy-button', name: 'Copy to clipboard', cat: 'Actions', os: ['web', 'macos', 'windows', 'linux'],
    desc: 'One-click copy with a success state. Add data-clay-copy="text" to any button.',
    html: `<div class="clay-copy-field" style="width:min(100%,420px)"><code>npm install clay-ds</code><button class="clay-btn clay-btn--sm clay-btn--secondary" data-clay-copy="npm install clay-ds"><i data-clay-icon="copy"></i>Copy</button></div><button class="clay-btn clay-btn--icon clay-btn--tonal" data-clay-copy="https://clay.design" aria-label="Copy link"><i data-clay-icon="copy"></i></button>` },

  { id: 'theme-toggle', name: 'Theme toggle', cat: 'Selection', os: ['web'],
    desc: 'A playful light/dark switch built on role="switch".',
    html: `<button class="clay-theme-toggle" role="switch" aria-checked="false" aria-label="Dark mode"></button><button class="clay-theme-toggle" role="switch" aria-checked="true" aria-label="Dark mode"></button>` },

  { id: 'sortable-list', name: 'Sortable list', cat: 'Data display', os: ['web', 'ios', 'android', 'macos', 'windows', 'linux'], native: { ios: 'Reorderable list', android: 'Drag-to-reorder list', windows: 'ListView (reorder)', macos: 'Reorderable table rows', linux: 'Reorderable rows' },
    desc: 'Drag rows to reorder them, or focus a row and press Alt + ↑/↓.',
    html: `<ul class="clay-sortable" aria-label="Priorities"><li draggable="true" tabindex="0"><span class="clay-drag-handle">⋮⋮</span>Design tokens<span class="clay-badge" style="margin-left:auto">P0</span></li><li draggable="true" tabindex="0"><span class="clay-drag-handle">⋮⋮</span>Android presets<span class="clay-badge clay-badge--warning" style="margin-left:auto">P1</span></li><li draggable="true" tabindex="0"><span class="clay-drag-handle">⋮⋮</span>Docs site<span class="clay-badge clay-badge--neutral" style="margin-left:auto">P2</span></li><li draggable="true" tabindex="0"><span class="clay-drag-handle">⋮⋮</span>Figma kit<span class="clay-badge clay-badge--neutral" style="margin-left:auto">P3</span></li></ul>` },

  { id: 'password-strength', name: 'Password strength', cat: 'Inputs', os: ['web', 'android', 'linux'],
    desc: 'A password field with a strength meter and rules checklist.',
    html: `<div class="clay-field" style="width:300px"><label for="pws">New password</label><input id="pws" type="password" class="clay-input" value="Clay2026"><div class="clay-levelbar is-mid" aria-label="Strength: medium"><i class="is-on"></i><i class="is-on"></i><i class="is-on"></i><i></i><i></i></div><ul class="clay-checklist" style="font-size:12px"><li>8+ characters</li><li>Upper &amp; lower case</li><li style="opacity:.5">A symbol</li></ul></div>` },

  { id: 'vertical-steps', name: 'Vertical steps', cat: 'Navigation', os: ['web', 'android'], native: { android: 'Vertical stepper' },
    desc: 'Step-by-step progress for onboarding and checkout.',
    html: `<ol class="clay-steps clay-steps--vertical"><li class="clay-step is-done">Create account<small>Done · Oct 18</small></li><li class="clay-step is-done">Choose a platform<small>iOS · Android · Web</small></li><li class="clay-step is-current" aria-current="step">Customise tokens<small>Colour, type and radius</small></li><li class="clay-step">Export &amp; ship<small>CDN, npm or native</small></li></ol>` },

  { id: 'load-more', name: 'Load more', cat: 'Navigation', os: ['web', 'ios', 'android'], native: { ios: 'Load more row', android: 'Load more' },
    desc: 'Progressive loading as an alternative to pagination.',
    html: `<div class="clay-stack" style="width:100%;max-width:440px"><ul class="clay-list clay-list--bordered" id="lm-list"><li class="clay-list-item">Result 1</li><li class="clay-list-item">Result 2</li><li class="clay-list-item" hidden>Result 3</li><li class="clay-list-item" hidden>Result 4</li><li class="clay-list-item" hidden>Result 5</li><li class="clay-list-item" hidden>Result 6</li></ul><button class="clay-btn clay-btn--secondary clay-btn--block" data-clay-loadmore="#lm-list">Load more</button></div>` },

  { id: 'mac-dock', name: 'Dock', cat: 'Platform', os: ['macos'], native: { macos: 'Dock' },
    desc: 'The macOS Dock with magnification and running indicators. Hover the icons.',
    html: `<div class="clay-dock"><button class="is-running" style="background:linear-gradient(135deg,#5ac8fa,#007aff)" aria-label="Finder"><i data-clay-icon="smartphone"></i></button><button class="is-running" style="background:linear-gradient(135deg,#ffb48e,#7d66f5)" aria-label="Clay"><i data-clay-icon="layers"></i></button><button style="background:linear-gradient(135deg,#34c759,#248a3d)" aria-label="Messages"><i data-clay-icon="message"></i></button><button style="background:linear-gradient(135deg,#ff9f0a,#ff375f)" aria-label="Music"><i data-clay-icon="music"></i></button><button style="background:linear-gradient(135deg,#8e8e93,#48484a)" aria-label="Settings"><i data-clay-icon="settings"></i></button></div>`, layout: 'bg' },

  { id: 'mac-status-menu', name: 'Menu bar extra', cat: 'Navigation', os: ['macos'], native: { macos: 'Status menu (menu bar extra)' },
    desc: 'A menu bar icon with its own menu, for background utilities.',
    html: `<div style="width:100%"><div class="clay-menubar"><b>Clay</b><span>File</span><span>Edit</span><span class="clay-menubar-end"><span class="is-open" style="padding:2px 6px;border-radius:4px;background:rgb(0 0 0 / .08)"><i data-clay-icon="layers" style="width:15px;height:15px"></i></span><i data-clay-icon="wifi" style="width:15px;height:15px"></i><span>Mon 9:41</span></span></div><div class="clay-menu clay-menu--static" role="menu" style="margin-left:auto;margin-right:60px;margin-top:2px;width:240px"><span class="clay-menu-label">Clay Sync</span><button class="clay-menu-item" role="menuitem"><i data-clay-icon="refresh"></i>Sync now</button><button class="clay-menu-item" role="menuitem"><i data-clay-icon="palette"></i>Open theme…</button><div class="clay-menu-sep"></div><button class="clay-menu-item" role="menuitem">Quit Clay<kbd class="clay-kbd">⌘Q</kbd></button></div></div>`, layout: 'flush' },

  { id: 'adw-preferences', name: 'Preferences dialog', cat: 'Overlays', os: ['linux'], native: { linux: 'AdwPreferencesDialog' },
    desc: 'Grouped settings pages with a view switcher and search.',
    html: `<div class="clay-dialog is-static" style="width:min(100%,520px)"><div class="clay-titlebar" style="height:46px;border-radius:14px 14px 0 0"><button class="clay-btn clay-btn--plain clay-btn--icon clay-btn--sm" aria-label="Search"><i data-clay-icon="search"></i></button><span style="flex:1;display:flex;justify-content:center"><span class="clay-viewswitcher"><button aria-pressed="true"><i data-clay-icon="settings"></i>General</button><button aria-pressed="false"><i data-clay-icon="palette"></i>Appearance</button></span></span><span class="clay-gnome-btns"><i></i></span></div><div class="clay-dialog-body" style="text-align:left;background:var(--clay-bg)"><div class="clay-pref-group"><h4>Behaviour</h4><ul class="clay-boxed"><li><span class="clay-boxed-text">Run in background</span><input type="checkbox" role="switch" class="clay-switch" checked aria-label="Run in background"></li><li><span class="clay-boxed-text">Start on login</span><input type="checkbox" role="switch" class="clay-switch" aria-label="Start on login"></li></ul></div></div></div>`, layout: 'center' }
  );
  // patches for entries defined above in this file
  patch('date-range', ['android'], { android: 'Date range picker' });
})();
