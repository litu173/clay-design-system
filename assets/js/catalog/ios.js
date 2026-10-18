/* Clay component catalog — iOS / iPadOS (Human Interface Guidelines) */
(function () {
  var C = window.ClayCatalog = window.ClayCatalog || [];
  var I = ['ios'];
  var status = '<div class="clay-statusbar"><span>9:41</span><span class="clay-statusbar-icons"><i data-clay-icon="signal" style="width:16px;height:16px"></i><i data-clay-icon="wifi" style="width:16px;height:16px"></i><i data-clay-icon="battery" style="width:22px;height:18px"></i></span></div>';
  C.push(
  { id: 'ios-buttons', name: 'Buttons', cat: 'Actions', os: I, native: { ios: 'Button styles (filled, tinted, gray, plain)' },
    desc: 'The four system button styles, in three sizes, with a capsule shape option.',
    html: `
<button class="clay-btn">Filled</button>
<button class="clay-btn clay-btn--tonal">Tinted</button>
<button class="clay-btn clay-btn--gray">Gray</button>
<button class="clay-btn clay-btn--ghost">Plain</button>
<button class="clay-btn clay-btn--capsule clay-btn--sm">Capsule</button>
<button class="clay-btn clay-btn--danger clay-btn--tonal">Delete</button>
<button class="clay-btn clay-btn--lg clay-btn--block">Continue</button>` },

  { id: 'ios-navbar', name: 'Navigation bar', cat: 'Navigation', os: I, native: { ios: 'Navigation bar (large title)' },
    desc: 'Back button, centred inline title, trailing actions and a collapsing large title.',
    html: `
<div style="width:100%;background:var(--clay-bg)">${status}
<div class="clay-appbar" style="border:0;background:transparent"><button class="clay-btn clay-btn--ghost clay-btn--sm" style="padding:0 4px"><i data-clay-icon="chevron-left"></i>Settings</button><span class="clay-appbar-title">General</span><span class="clay-spacer"></span><button class="clay-btn clay-btn--ghost clay-btn--icon clay-btn--sm" aria-label="Add"><i data-clay-icon="plus"></i></button></div>
<div class="clay-large-title">Inbox</div></div>`, frame: 'phone', layout: 'flush' },

  { id: 'ios-searchbar', name: 'Search bar', cat: 'Navigation', os: I,
    desc: 'A filled search field with a Cancel action.',
    html: `<div class="clay-searchbar" style="width:100%"><div class="clay-input-group"><i data-clay-icon="search"></i><input class="clay-input" placeholder="Search" aria-label="Search" value="Clay"></div><button class="clay-searchbar-cancel">Cancel</button></div>`, frame: 'phone' },

  { id: 'ios-tabbar', name: 'Tab bar', cat: 'Navigation', os: I,
    desc: 'Top-level navigation at the bottom of the screen, with badges.',
    html: `<nav class="clay-tabbar" aria-label="Main" style="width:100%"><a class="clay-tabbar-item is-active" aria-current="page"><i data-clay-icon="home"></i>Home</a><a class="clay-tabbar-item"><i data-clay-icon="compass"></i>Explore</a><a class="clay-tabbar-item" style="position:relative"><i data-clay-icon="message"></i>Chats<span class="clay-count" style="right:18%">4</span></a><a class="clay-tabbar-item"><i data-clay-icon="user"></i>Profile</a></nav>`, frame: 'phone', layout: 'flush' },

  { id: 'ios-toolbar', name: 'Toolbar', cat: 'Navigation', os: I,
    desc: 'Contextual actions along the bottom edge.',
    html: `<div class="clay-toolbar" style="width:100%"><button aria-label="Share"><i data-clay-icon="share"></i></button><button aria-label="Favourite"><i data-clay-icon="heart"></i></button><span class="clay-caption" style="color:var(--clay-text-2)">Updated just now</span><button aria-label="Compose"><i data-clay-icon="edit"></i></button></div>`, frame: 'phone', layout: 'flush' },

  { id: 'ios-page-control', name: 'Page control', cat: 'Navigation', os: I,
    desc: 'Dots that show your position in a set of pages.',
    html: `<span class="clay-dots"><i class="is-active"></i><i></i><i></i><i></i></span><span class="clay-dots clay-dots--glass" style="--clay-text:#fff;--clay-text-3:#fff"><i></i><i class="is-active"></i><i></i></span>` },

  { id: 'ios-list', name: 'Inset grouped list', cat: 'Data display', os: I, native: { ios: 'List (inset grouped)' },
    desc: 'Settings-style rows with icons, values, chevrons and toggles.',
    html: `
<div style="width:100%;background:var(--clay-bg);padding:8px 16px 16px">
<div class="clay-list-header">Connectivity</div>
<ul class="clay-list">
  <li class="clay-list-item"><span class="clay-list-icon" style="background:#ff9500"><i data-clay-icon="plane"></i></span><span class="clay-list-text"><span class="clay-list-title">Airplane Mode</span></span><input type="checkbox" role="switch" class="clay-switch" aria-label="Airplane Mode"></li>
  <li class="clay-list-item clay-list-item--action"><span class="clay-list-icon" style="background:#007aff"><i data-clay-icon="wifi"></i></span><span class="clay-list-text"><span class="clay-list-title">Wi-Fi</span></span><span class="clay-list-trail">Clay-5G<span class="clay-chevron"></span></span></li>
  <li class="clay-list-item clay-list-item--action"><span class="clay-list-icon" style="background:#007aff"><i data-clay-icon="bluetooth"></i></span><span class="clay-list-text"><span class="clay-list-title">Bluetooth</span></span><span class="clay-list-trail">On<span class="clay-chevron"></span></span></li>
</ul>
<div class="clay-list-header">Account</div>
<ul class="clay-list"><li class="clay-list-item clay-list-item--action"><span class="clay-avatar">MA</span><span class="clay-list-text"><span class="clay-list-title">Mutaher</span><span class="clay-list-sub">Apple Account, iCloud+ and more</span></span><span class="clay-chevron"></span></li></ul>
</div>`, frame: 'phone', layout: 'flush' },

  { id: 'ios-swipe', name: 'Swipe actions', cat: 'Data display', os: I,
    desc: 'Swipe a row left, or tap it, to reveal its actions.',
    html: `
<ul class="clay-list" style="width:100%">
  <li class="clay-swipe"><div class="clay-swipe-actions"><button style="background:#8e8e93"><i data-clay-icon="more"></i>More</button><button style="background:var(--clay-danger)"><i data-clay-icon="trash"></i>Delete</button></div><div class="clay-swipe-content clay-list-item"><span class="clay-avatar clay-avatar--sm">AL</span><span class="clay-list-text"><span class="clay-list-title">Ada Lovelace</span><span class="clay-list-sub">Swipe me ←</span></span><span class="clay-list-trail">9:41</span></div></li>
  <li class="clay-swipe"><div class="clay-swipe-actions"><button style="background:#ff9500"><i data-clay-icon="bookmark"></i>Flag</button><button style="background:var(--clay-danger)"><i data-clay-icon="trash"></i>Delete</button></div><div class="clay-swipe-content clay-list-item"><span class="clay-avatar clay-avatar--sm" style="background:linear-gradient(135deg,#ff9f80,#e11d48)">GH</span><span class="clay-list-text"><span class="clay-list-title">Grace Hopper</span><span class="clay-list-sub">Sent you a file</span></span><span class="clay-list-trail">Mon</span></div></li>
</ul>`, frame: 'phone' },

  { id: 'ios-checklist', name: 'Selection list', cat: 'Selection', os: I, native: { ios: 'List selection (checkmarks)' },
    desc: 'iOS uses checkmarks in lists instead of checkboxes and radios.',
    html: `<ul class="clay-list" style="width:100%" role="radiogroup" aria-label="Sort"><li class="clay-list-item clay-list-item--action" role="radio" aria-checked="true"><span class="clay-list-text"><span class="clay-list-title">Newest</span></span><span style="color:var(--clay-primary)"><i data-clay-icon="check"></i></span></li><li class="clay-list-item clay-list-item--action" role="radio" aria-checked="false"><span class="clay-list-text"><span class="clay-list-title">Oldest</span></span></li><li class="clay-list-item clay-list-item--action" role="radio" aria-checked="false"><span class="clay-list-text"><span class="clay-list-title">Most played</span></span></li></ul>`, frame: 'phone' },

  { id: 'ios-stepper', name: 'Stepper', cat: 'Inputs', os: I,
    desc: 'Increment or decrement a value.',
    html: `<div class="clay-row clay-row-between" style="width:100%;max-width:340px"><span>Copies: <b>2</b></span><div class="clay-ios-stepper" role="group" aria-label="Copies"><button aria-label="Decrease">−</button><button aria-label="Increase">+</button></div></div>` },

  { id: 'ios-picker', name: 'Picker wheel', cat: 'Selection', os: I, native: { ios: 'Picker (wheel) / time picker' },
    desc: 'Scroll-snapping wheel columns for dates, times and options.',
    html: `<div class="clay-wheel" style="width:100%" aria-label="Time"><div class="clay-wheel-col" tabindex="0">${[7,8,9,10,11,12,1,2].map(function(n){return '<span>'+n+'</span>';}).join('')}</div><div class="clay-wheel-col" tabindex="0">${['00','15','30','41','45'].map(function(n){return '<span>'+n+'</span>';}).join('')}</div><div class="clay-wheel-col" tabindex="0"><span>AM</span><span>PM</span></div></div>`, frame: 'phone' },

  { id: 'ios-actionsheet', name: 'Action sheet', cat: 'Overlays', os: I,
    desc: 'A set of choices related to an action, with destructive and cancel options.',
    html: `<div class="clay-actionsheet"><div class="clay-actionsheet-group"><div class="clay-actionsheet-title">This photo will be deleted from all your devices.</div><button>Save to Files</button><button>Duplicate</button><button class="is-danger">Delete Photo</button></div><div class="clay-actionsheet-group"><button class="is-cancel">Cancel</button></div></div>`, frame: 'phone', layout: 'center' },

  { id: 'ios-sheet-large', name: 'Sheet with detents', cat: 'Overlays', os: I, native: { ios: 'Sheet (large detent, grabber)' },
    desc: 'A modal card with a grabber, title bar and Done action.',
    html: `<div class="clay-dialog clay-sheet is-static" style="box-shadow:var(--clay-shadow-3);min-height:260px"><div class="clay-sheet-handle"></div><div class="clay-appbar" style="border:0;background:transparent"><button class="clay-btn clay-btn--ghost clay-btn--sm">Cancel</button><span class="clay-appbar-title">New Event</span><span class="clay-spacer"></span><button class="clay-btn clay-btn--ghost clay-btn--sm" style="font-weight:700">Add</button></div><div style="padding:8px 16px"><ul class="clay-list" style="background:var(--clay-surface-2)"><li class="clay-list-item"><input class="clay-input" placeholder="Title" style="background:none;padding:0" aria-label="Title"></li><li class="clay-list-item"><input class="clay-input" placeholder="Location" style="background:none;padding:0" aria-label="Location"></li></ul></div></div>`, frame: 'phone', layout: 'flush' },

  { id: 'ios-disclosure', name: 'Disclosure group', cat: 'Data display', os: I,
    desc: 'Expandable rows for secondary content.',
    html: `<ul class="clay-list" style="width:100%"><li class="clay-list-item" style="display:block"><details class="clay-accordion" style="border:0" open><summary style="padding:4px 0">Advanced</summary><p style="padding:0">Show developer options, logs and experimental features.</p></details></li></ul>`, frame: 'phone' },

  { id: 'ios-widgets', name: 'Widgets', cat: 'Platform', os: I, native: { ios: 'Home Screen widgets' },
    desc: 'Small and medium Home Screen widgets.',
    html: `<div class="clay-widget clay-widget--accent"><i data-clay-icon="sun" style="width:28px;height:28px"></i><div><div style="font-size:34px;font-weight:300;line-height:1">21°</div><div style="font-size:13px;opacity:.85">London · Sunny</div></div></div><div class="clay-widget clay-widget--medium"><div class="clay-row clay-row-between"><b>Up next</b><span class="clay-caption">Today</span></div><div class="clay-stack" style="gap:6px"><div class="clay-row" style="flex-wrap:nowrap;gap:8px"><span style="width:4px;height:32px;border-radius:2px;background:var(--clay-primary)"></span><div><b class="clay-label">Design review</b><div class="clay-caption">10:00 – 11:00</div></div></div><div class="clay-row" style="flex-wrap:nowrap;gap:8px"><span style="width:4px;height:32px;border-radius:2px;background:var(--clay-success)"></span><div><b class="clay-label">Ship Clay 1.0 🚀</b><div class="clay-caption">14:00</div></div></div></div></div>`, layout: 'bg' },

  { id: 'ios-live-activity', name: 'Live Activity', cat: 'Platform', os: I, native: { ios: 'Dynamic Island & Live Activity' },
    desc: 'Compact and expanded Dynamic Island presentations.',
    html: `<div class="clay-island-pill"><i data-clay-icon="music" style="width:14px;height:14px;color:#ff9f0a"></i><span class="clay-bars" style="height:12px;width:22px;gap:2px;padding:0"><div><i style="--h:50%;background:#ff9f0a"></i></div><div><i style="--h:100%;background:#ff9f0a"></i></div><div><i style="--h:70%;background:#ff9f0a"></i></div></span></div><div class="clay-island"><span class="clay-notification-icon" style="border-radius:12px"><i data-clay-icon="send"></i></span><div class="clay-grow"><b>Courier arriving</b><div style="opacity:.7;font-size:12px">2 stops away · 8 min</div><div class="clay-progress" style="--clay-value:70%;margin-top:6px;background:#333"><span style="background:#30d158"></span></div></div></div>`, layout: 'center' },

  { id: 'ios-device', name: 'Device frame', cat: 'Platform', os: I, native: { ios: 'iPhone frame, status bar & home indicator' },
    desc: 'An iPhone mockup with Dynamic Island, status bar and home indicator.',
    html: `<div class="clay-device" style="width:240px"><div class="clay-device-island" style="width:74px;height:22px;top:9px"></div><div class="clay-device-screen">${status}<div class="clay-large-title" style="font-size:28px">Today</div><div style="padding:0 14px" class="clay-stack"><div class="clay-skeleton" style="height:90px;border-radius:14px"></div><div class="clay-skeleton" style="height:60px;border-radius:14px"></div></div><span class="clay-grow"></span><div class="clay-home-indicator"></div></div></div>`, layout: 'center' }
  );
})();
