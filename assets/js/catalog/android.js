/* Clay component catalog — Android (Material Design 3) */
(function () {
  var C = window.ClayCatalog = window.ClayCatalog || [];
  var A = ['android'];
  C.push(
  { id: 'm3-buttons', name: 'Buttons', cat: 'Actions', os: A, native: { android: 'Common buttons (filled, tonal, elevated, outlined, text)' },
    desc: 'The five Material 3 emphasis levels. Every button has a ripple.',
    html: `
<button class="clay-btn">Filled</button>
<button class="clay-btn clay-btn--tonal">Filled tonal</button>
<button class="clay-btn clay-btn--elevated">Elevated</button>
<button class="clay-btn clay-btn--outline">Outlined</button>
<button class="clay-btn clay-btn--ghost">Text</button>
<button class="clay-btn"><i data-clay-icon="plus"></i>With icon</button>
<button class="clay-btn" disabled>Disabled</button>` },

  { id: 'm3-fab', name: 'Floating action buttons', cat: 'Actions', os: A, native: { android: 'FAB (small, regular, large, extended)' },
    desc: 'The primary action on a screen, in four sizes and three colour roles.',
    html: `<button class="clay-fab clay-fab--sm" aria-label="Edit"><i data-clay-icon="edit"></i></button><button class="clay-fab" aria-label="Compose"><i data-clay-icon="edit"></i></button><button class="clay-fab clay-fab--lg" aria-label="Compose"><i data-clay-icon="edit"></i></button><button class="clay-fab clay-fab--primary"><i data-clay-icon="plus"></i>Extended</button><button class="clay-fab clay-fab--tertiary"><i data-clay-icon="sparkles"></i>Tertiary</button>` },

  { id: 'm3-chips', name: 'Chips', cat: 'Selection', os: A, native: { android: 'Chips (assist, filter, input, suggestion)' },
    desc: 'Assist chips trigger actions, filter chips narrow content, input chips hold entities and suggestion chips offer replies.',
    html: `
<div class="clay-stack" style="width:100%">
<div class="clay-row"><span class="clay-caption" style="width:84px">Assist</span><button class="clay-chip"><i data-clay-icon="calendar"></i>Add to calendar</button><button class="clay-chip"><i data-clay-icon="pin"></i>Directions</button></div>
<div class="clay-row"><span class="clay-caption" style="width:84px">Filter</span><button class="clay-chip" aria-pressed="true"><i data-clay-icon="check"></i>Vegan</button><button class="clay-chip" aria-pressed="false">Gluten-free</button><button class="clay-chip" aria-pressed="false">Spicy</button></div>
<div class="clay-row"><span class="clay-caption" style="width:84px">Input</span><span class="clay-chip"><span class="clay-avatar" style="--_s:20px;font-size:9px">AL</span>Ada<button class="clay-chip-x" aria-label="Remove"><i data-clay-icon="x"></i></button></span><span class="clay-chip">Design<button class="clay-chip-x" aria-label="Remove"><i data-clay-icon="x"></i></button></span></div>
<div class="clay-row"><span class="clay-caption" style="width:84px">Suggestion</span><button class="clay-chip">Sounds good!</button><button class="clay-chip">On my way</button></div>
</div>` },

  { id: 'm3-textfields', name: 'Text fields', cat: 'Inputs', os: A, native: { android: 'Text fields (filled & outlined)' },
    desc: 'Filled and outlined fields with floating labels.',
    html: `<div class="clay-float" style="min-width:240px"><input id="m3f1" class="clay-input clay-input--filled" placeholder=" "><label for="m3f1">Filled</label></div><div class="clay-float clay-float--outlined" style="min-width:240px"><input id="m3f2" class="clay-input" placeholder=" " value="Clay"><label for="m3f2">Outlined</label></div>` },

  { id: 'm3-topbars', name: 'Top app bars', cat: 'Navigation', os: A, native: { android: 'Top app bar (small, center-aligned, medium, large)' },
    desc: 'Four sizes of top app bar.',
    html: `
<div class="clay-stack" style="width:100%;gap:10px;background:var(--clay-bg)">
<div class="clay-appbar"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Menu"><i data-clay-icon="menu"></i></button><span class="clay-appbar-title">Small</span><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Search"><i data-clay-icon="search"></i></button></div>
<div class="clay-appbar clay-appbar--center"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Menu"><i data-clay-icon="menu"></i></button><span class="clay-appbar-title">Center-aligned</span><span class="clay-avatar clay-avatar--sm">MA</span></div>
<div class="clay-appbar clay-appbar--medium"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Back"><i data-clay-icon="chevron-left"></i></button><span class="clay-spacer"></span><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Bookmark"><i data-clay-icon="bookmark"></i></button><span class="clay-appbar-title">Medium title</span></div>
<div class="clay-appbar clay-appbar--large"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Back"><i data-clay-icon="chevron-left"></i></button><span class="clay-spacer"></span><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="More"><i data-clay-icon="more"></i></button><span class="clay-appbar-title">Large title</span></div>
</div>`, frame: 'phone', layout: 'flush' },

  { id: 'm3-searchbar', name: 'Search bar', cat: 'Navigation', os: A,
    desc: 'A pill-shaped search bar with leading menu and trailing avatar.',
    html: `<div class="clay-searchbar clay-searchbar--pill" style="width:100%"><i data-clay-icon="menu"></i><input placeholder="Search your mail" aria-label="Search"><span class="clay-avatar clay-avatar--sm">MA</span></div>`, frame: 'phone' },

  { id: 'm3-navbar', name: 'Navigation bar', cat: 'Navigation', os: A,
    desc: 'Bottom navigation with a pill indicator behind the active icon.',
    html: `<nav class="clay-tabbar" aria-label="Main" style="width:100%"><a class="clay-tabbar-item is-active" aria-current="page"><i data-clay-icon="home"></i>Home</a><a class="clay-tabbar-item" style="position:relative"><i data-clay-icon="message"></i>Chat<span class="clay-count" style="right:28%;top:0">3</span></a><a class="clay-tabbar-item"><i data-clay-icon="bookmark"></i>Saved</a><a class="clay-tabbar-item"><i data-clay-icon="user"></i>Profile</a></nav>`, frame: 'phone', layout: 'flush' },

  { id: 'm3-bottom-appbar', name: 'Bottom app bar', cat: 'Navigation', os: A,
    desc: 'Actions and a docked FAB along the bottom.',
    html: `<div class="clay-bottom-appbar" style="width:100%"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Check"><i data-clay-icon="check-circle"></i></button><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Edit"><i data-clay-icon="edit"></i></button><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Mic"><i data-clay-icon="music"></i></button><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Image"><i data-clay-icon="image"></i></button><button class="clay-fab" aria-label="Add"><i data-clay-icon="plus"></i></button></div>`, frame: 'phone', layout: 'flush' },

  { id: 'm3-rail', name: 'Navigation rail', cat: 'Navigation', os: A, native: { android: 'Navigation rail (tablets & foldables)' },
    desc: 'Side navigation for medium and expanded window sizes.',
    html: `<div class="clay-row" style="align-items:stretch;flex-wrap:nowrap;width:100%;background:var(--clay-bg);border-radius:16px;overflow:hidden"><nav class="clay-navrail" aria-label="Main"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Menu"><i data-clay-icon="menu"></i></button><button class="clay-fab" aria-label="Compose"><i data-clay-icon="edit"></i></button><button class="clay-navrail-item is-active"><i data-clay-icon="mail"></i>Inbox</button><button class="clay-navrail-item"><i data-clay-icon="message"></i>Chat</button><button class="clay-navrail-item"><i data-clay-icon="users"></i>Rooms</button><button class="clay-navrail-item"><i data-clay-icon="calendar"></i>Meet</button></nav><div class="clay-grow clay-p-6 clay-stack"><span class="clay-h3">Inbox</span><div class="clay-skeleton" style="height:56px;border-radius:16px"></div><div class="clay-skeleton" style="height:56px;border-radius:16px"></div></div></div>` },

  { id: 'm3-drawer', name: 'Navigation drawer', cat: 'Navigation', os: A,
    desc: 'A modal or standard drawer with headline and destinations.',
    html: `<nav class="clay-sidebar" aria-label="Mail" style="width:300px;border-radius:0 16px 16px 0;background:var(--clay-surface-2)"><span class="clay-sidebar-label" style="text-transform:none;letter-spacing:0;font-size:14px;color:var(--clay-text-2)">Mail</span><a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="mail"></i>Inbox<span class="clay-label" style="margin-left:auto">24</span></a><a class="clay-sidebar-item"><i data-clay-icon="send"></i>Outbox</a><a class="clay-sidebar-item"><i data-clay-icon="heart"></i>Favourites</a><a class="clay-sidebar-item"><i data-clay-icon="trash"></i>Trash</a><hr class="clay-divider"><span class="clay-sidebar-label" style="text-transform:none;letter-spacing:0;font-size:14px;color:var(--clay-text-2)">Labels</span><a class="clay-sidebar-item"><i data-clay-icon="bookmark"></i>Family</a></nav>` },

  { id: 'm3-time', name: 'Time picker', cat: 'Selection', os: A, native: { android: 'Time picker (dial)' },
    desc: 'A clock-dial time picker.',
    html: `<div class="clay-card clay-card--filled" style="padding:24px;border-radius:28px"><div class="clay-stack" style="align-items:center;gap:20px"><span class="clay-caption" style="align-self:flex-start">Select time</span><div class="clay-time-display"><b class="is-active">09</b><span style="font-size:52px">:</span><b>41</b><span class="clay-stack" style="gap:0;border:1px solid var(--clay-border-strong);border-radius:8px;overflow:hidden;font-size:13px;margin-left:8px"><span style="padding:8px 10px;background:var(--clay-primary-soft)">AM</span><span style="padding:8px 10px;border-top:1px solid var(--clay-border-strong)">PM</span></span></div><div class="clay-clock" style="--clay-hand:270deg">${[12,1,2,3,4,5,6,7,8,9,10,11].map(function(n,i){return '<span style="--i:'+i+'"'+(n===9?' class="is-selected"':'')+'>'+n+'</span>';}).join('')}</div><div class="clay-row" style="align-self:flex-end"><button class="clay-btn clay-btn--ghost">Cancel</button><button class="clay-btn clay-btn--ghost">OK</button></div></div></div>`, layout: 'center' },

  { id: 'm3-sliders', name: 'Discrete slider', cat: 'Selection', os: A, native: { android: 'Slider (discrete with ticks)' },
    desc: 'A slider that snaps to stops, with tick marks.',
    html: `<div style="width:100%"><input type="range" class="clay-range" min="0" max="5" step="1" value="3" aria-label="Level"><div class="clay-ticks"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>` },

  { id: 'm3-fullscreen', name: 'Full-screen dialog', cat: 'Overlays', os: A,
    desc: 'A complex task that needs the whole screen on mobile.',
    html: `<div style="width:100%;background:var(--clay-bg);min-height:300px"><div class="clay-appbar"><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Close"><i data-clay-icon="x"></i></button><span class="clay-appbar-title">New event</span><button class="clay-btn clay-btn--ghost">Save</button></div><div class="clay-stack" style="padding:16px"><div class="clay-float clay-float--outlined"><input id="fsd1" class="clay-input" placeholder=" "><label for="fsd1">Event name</label></div><div class="clay-float clay-float--outlined"><input id="fsd2" class="clay-input" placeholder=" " value="Tue, 21 Oct"><label for="fsd2">Date</label></div><label class="clay-choice clay-row-between" style="display:flex"><span>All-day</span><input type="checkbox" role="switch" class="clay-switch"></label></div></div>`, frame: 'phone', layout: 'flush' },

  { id: 'm3-sidesheet', name: 'Side sheet', cat: 'Overlays', os: A,
    desc: 'Secondary content and filters from the side, on large screens.',
    html: `<div class="clay-card clay-card--filled" style="width:300px;border-radius:16px 0 0 16px;align-self:stretch"><div class="clay-card-body"><div class="clay-row clay-row-between"><span class="clay-title" style="font-size:22px;font-weight:400">Filters</span><button class="clay-btn clay-btn--plain clay-btn--icon" aria-label="Close"><i data-clay-icon="x"></i></button></div><label class="clay-choice"><input type="checkbox" class="clay-check" checked>Unread</label><label class="clay-choice"><input type="checkbox" class="clay-check">Has attachment</label><span class="clay-grow"></span><div class="clay-row"><button class="clay-btn">Apply</button><button class="clay-btn clay-btn--outline">Reset</button></div></div></div>`, layout: 'end' },

  { id: 'm3-cards', name: 'Cards', cat: 'Data display', os: A, native: { android: 'Cards (elevated, filled, outlined)' },
    desc: 'The three Material card types.',
    html: `<article class="clay-card clay-card--elevated"><div class="clay-card-media" style="aspect-ratio:2/1"></div><div class="clay-card-body"><b class="clay-title">Elevated</b><span class="clay-caption">Shadow for separation</span></div></article><article class="clay-card clay-card--filled"><div class="clay-card-body"><b class="clay-title">Filled</b><span class="clay-caption">Subtle container</span><button class="clay-btn clay-btn--tonal clay-btn--sm" style="align-self:flex-start">Action</button></div></article><article class="clay-card clay-card--outlined"><div class="clay-card-body"><b class="clay-title">Outlined</b><span class="clay-caption">Visual boundary</span></div></article>`, layout: 'grid3' },

  { id: 'm3-lists', name: 'Lists', cat: 'Data display', os: A, native: { android: 'Lists (one, two & three-line)' },
    desc: 'One-, two- and three-line list items with leading and trailing elements.',
    html: `<ul class="clay-list" style="width:100%"><li class="clay-list-item clay-list-item--action"><span class="clay-avatar">A</span><span class="clay-list-text"><span class="clay-list-title">One-line item</span></span><input type="checkbox" class="clay-check" aria-label="Select"></li><li class="clay-list-item clay-list-item--action"><span class="clay-list-icon"><i data-clay-icon="image"></i></span><span class="clay-list-text"><span class="clay-list-title">Two-line item</span><span class="clay-list-sub">Supporting text</span></span><span class="clay-list-trail">100+</span></li><li class="clay-list-item clay-list-item--action" style="align-items:flex-start"><span class="clay-card-media" style="width:56px;aspect-ratio:1;border-radius:8px;flex:none"></span><span class="clay-list-text"><span class="clay-list-title">Three-line item</span><span class="clay-list-sub">Supporting text that is long enough to wrap onto a second line in the list.</span></span><input type="checkbox" role="switch" class="clay-switch" aria-label="Toggle"></li></ul>`, frame: 'phone' },

  { id: 'm3-tooltips', name: 'Rich tooltip', cat: 'Feedback', os: A,
    desc: 'Tooltips with a title, body text and an action.',
    html: `<div class="clay-rich-tip"><b>Rich tooltip</b>Rich tooltips bring attention to a particular element or feature.<button class="clay-btn clay-btn--ghost clay-btn--sm" style="align-self:flex-start;padding:0 8px">Learn more</button></div><span class="clay-tip">Plain tooltip</span>` },

  { id: 'm3-snackbar', name: 'Snackbar (static)', cat: 'Feedback', os: A,
    desc: 'The anatomy of a Material snackbar.',
    html: `<div class="clay-toast" style="min-width:320px"><span class="clay-grow">Message archived</span><button class="clay-btn clay-btn--ghost clay-btn--sm">Undo</button><button class="clay-alert-close" style="color:#f5eff7" aria-label="Dismiss"><i data-clay-icon="x"></i></button></div>` },

  { id: 'm3-device', name: 'Device frame', cat: 'Platform', os: A, native: { android: 'Phone frame, status bar & gesture bar' },
    desc: 'An Android phone mockup with punch-hole camera and gesture handle.',
    html: `<div class="clay-device clay-device--android" style="width:240px"><div class="clay-device-island"></div><div class="clay-device-screen"><div class="clay-statusbar clay-statusbar--android"><span>9:41</span><span class="clay-statusbar-icons"><i data-clay-icon="wifi" style="width:14px;height:14px"></i><i data-clay-icon="battery" style="width:18px;height:16px"></i></span></div><div class="clay-searchbar clay-searchbar--pill" style="margin:10px 12px;height:48px"><i data-clay-icon="search"></i><span>Search</span></div><div style="padding:0 12px" class="clay-stack"><div class="clay-skeleton" style="height:90px;border-radius:16px"></div><div class="clay-skeleton" style="height:60px;border-radius:16px"></div></div><span class="clay-grow"></span><div class="clay-home-indicator" style="width:90px;height:4px;opacity:.6"></div></div></div>`, layout: 'center' }
  );
})();
