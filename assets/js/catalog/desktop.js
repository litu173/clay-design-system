/* Clay component catalog — desktop platforms: macOS (HIG), Windows 11 (Fluent 2), Linux (GNOME / libadwaita) */
(function () {
  var C = window.ClayCatalog = window.ClayCatalog || [];
  var M = ['macos'], WIN = ['windows'], L = ['linux'];
  C.push(
  /* ======================= macOS ======================= */
  { id: 'mac-window', name: 'Window', cat: 'Platform', os: M, native: { macos: 'Window with title bar & sidebar' },
    desc: 'A standard window with traffic lights, a translucent sidebar and a unified toolbar.',
    html: `<div class="clay-window" style="width:100%;height:300px"><div style="display:flex;flex:1;min-height:0">
<aside class="clay-sidebar" style="width:190px;min-width:190px;background:color-mix(in oklab,var(--clay-surface-2) 75%,transparent);padding-top:0"><div style="height:46px;display:flex;align-items:center;padding:0 6px"><span class="clay-traffic"><i></i><i></i><i></i></span></div><span class="clay-sidebar-label" style="text-transform:none;letter-spacing:0">Favourites</span><a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="home"></i>Home</a><a class="clay-sidebar-item"><i data-clay-icon="download"></i>Downloads</a><a class="clay-sidebar-item"><i data-clay-icon="cloud"></i>iCloud Drive</a></aside>
<div style="flex:1;display:flex;flex-direction:column;min-width:0"><div class="clay-mac-toolbar"><button class="clay-tool" aria-label="Back"><i data-clay-icon="chevron-left"></i></button><button class="clay-tool" aria-label="Forward"><i data-clay-icon="chevron-right"></i></button><span class="clay-toolbar-title">Home</span><button class="clay-tool" aria-label="Grid"><i data-clay-icon="grid"></i></button><button class="clay-tool" aria-label="Share"><i data-clay-icon="share"></i></button><div class="clay-input-group" style="width:150px"><i data-clay-icon="search"></i><input class="clay-input clay-search" placeholder="Search" aria-label="Search"></div></div><div class="clay-p-4 clay-grid" style="--clay-grid-min:90px"><div class="clay-stack" style="align-items:center;gap:4px"><i data-clay-icon="folder" style="width:48px;height:48px;color:var(--clay-primary)"></i><span class="clay-caption">Projects</span></div><div class="clay-stack" style="align-items:center;gap:4px"><i data-clay-icon="folder" style="width:48px;height:48px;color:var(--clay-primary)"></i><span class="clay-caption">Designs</span></div><div class="clay-stack" style="align-items:center;gap:4px"><i data-clay-icon="file" style="width:48px;height:48px;color:var(--clay-text-3)"></i><span class="clay-caption">Notes.md</span></div></div></div></div></div>`, layout: 'bg' },

  { id: 'mac-buttons', name: 'Push buttons', cat: 'Actions', os: M, native: { macos: 'Push buttons (default, regular, borderless)' },
    desc: 'The blue default button, regular bezel buttons, borderless buttons and the help button.',
    html: `<button class="clay-btn">Default</button><button class="clay-btn clay-btn--secondary">Regular</button><button class="clay-btn clay-btn--secondary" disabled>Disabled</button><button class="clay-btn clay-btn--ghost">Borderless</button><button class="clay-btn clay-btn--secondary clay-btn--sm">Small</button><button class="clay-btn clay-btn--secondary clay-btn--lg">Large</button><button class="clay-help-btn" aria-label="Help">?</button>` },

  { id: 'mac-popup', name: 'Pop-up button', cat: 'Inputs', os: M, native: { macos: 'Pop-up button' },
    desc: 'The macOS select, with its double-chevron accessory.',
    html: `<label class="clay-row" style="gap:8px">Sort by:<select class="clay-popup"><option>Name</option><option>Date Modified</option><option>Size</option><option>Kind</option></select></label>` },

  { id: 'mac-stepper', name: 'Stepper', cat: 'Inputs', os: M,
    desc: 'A numeric field paired with stacked up and down arrows.',
    html: `<label class="clay-row" style="gap:8px">Font size:<span class="clay-mac-stepper"><input class="clay-input" type="number" value="13" min="8" max="72" aria-label="Font size"><span class="clay-mac-stepper-btns"><button type="button" data-clay-step="1" aria-label="Increase">▲</button><button type="button" data-clay-step="-1" aria-label="Decrease">▼</button></span></span></label>` },

  { id: 'mac-slider', name: 'Slider with ticks', cat: 'Selection', os: M,
    desc: 'A slider with tick marks and labelled end points.',
    html: `<div style="width:100%;max-width:340px"><input type="range" class="clay-range" min="0" max="10" value="6" aria-label="Key repeat"><div class="clay-ticks">${'<i></i>'.repeat(11)}</div><div class="clay-row clay-row-between clay-caption" style="margin-top:4px"><span>Slow</span><span>Fast</span></div></div>` },

  { id: 'mac-color-well', name: 'Colour well', cat: 'Inputs', os: M,
    desc: 'A swatch that opens the system colour panel.',
    html: `<label class="clay-row" style="gap:10px">Accent colour<span class="clay-color-well"><i></i></span></label><label class="clay-row" style="gap:10px">Highlight<input type="color" value="#ffcc00" aria-label="Highlight" style="width:44px;height:24px;border:0;padding:0;background:none"></label>` },

  { id: 'mac-path', name: 'Path control', cat: 'Navigation', os: M,
    desc: 'Shows a file\'s location as a clickable path.',
    html: `<span class="clay-path"><span><i data-clay-icon="monitor"></i>Macintosh HD</span><span><i data-clay-icon="folder"></i>Users</span><span><i data-clay-icon="folder"></i>mutaher</span><span><i data-clay-icon="file"></i>Clay.sketch</span></span>` },

  { id: 'mac-sidebar', name: 'Source list', cat: 'Navigation', os: M, native: { macos: 'Sidebar (source list)' },
    desc: 'Translucent sidebar navigation with sections.',
    html: `<nav class="clay-sidebar" aria-label="Mailboxes" style="background:var(--clay-surface-2);border-radius:10px;width:220px"><span class="clay-sidebar-label" style="text-transform:none;letter-spacing:0">Favourites</span><a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="mail"></i>Inbox<span class="clay-caption" style="margin-left:auto">12</span></a><a class="clay-sidebar-item"><i data-clay-icon="send"></i>Sent</a><a class="clay-sidebar-item"><i data-clay-icon="file"></i>Drafts</a><span class="clay-sidebar-label" style="text-transform:none;letter-spacing:0">Smart Mailboxes</span><a class="clay-sidebar-item"><i data-clay-icon="star"></i>Flagged</a></nav>` },

  { id: 'mac-sheet', name: 'Sheet', cat: 'Overlays', os: M, native: { macos: 'Sheet (window-modal)' },
    desc: 'A window-modal panel that drops from the title bar.',
    html: `<div class="clay-window" style="width:100%;height:280px"><div class="clay-titlebar"><span class="clay-traffic"><i></i><i></i><i></i></span><span class="clay-titlebar-title">Untitled</span><span style="width:52px"></span></div><div style="flex:1;position:relative;background:var(--clay-surface)"><div class="clay-card" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:320px;border-radius:0 0 12px 12px;box-shadow:var(--clay-shadow-3)"><div class="clay-card-body"><b>Save As:</b><input class="clay-input" value="Untitled.clay" aria-label="File name"><div class="clay-row" style="gap:8px">Where:<select class="clay-popup"><option>Documents</option><option>Desktop</option></select></div><div class="clay-row" style="justify-content:flex-end;gap:8px"><button class="clay-btn clay-btn--secondary">Cancel</button><button class="clay-btn">Save</button></div></div></div></div></div>`, layout: 'bg' },

  { id: 'mac-groupbox', name: 'Group box & inspector', cat: 'Layout', os: M, native: { macos: 'Box / inspector panel' },
    desc: 'Grouped settings, as you see them in inspectors and System Settings.',
    html: `<div class="clay-stack" style="width:260px;gap:18px"><fieldset class="clay-box" style="margin:0"><legend>Appearance</legend><div class="clay-stack" style="gap:8px"><label class="clay-choice"><input type="radio" class="clay-radio" name="mac-ap" checked>Light</label><label class="clay-choice"><input type="radio" class="clay-radio" name="mac-ap">Dark</label><label class="clay-choice"><input type="radio" class="clay-radio" name="mac-ap">Auto</label></div></fieldset><fieldset class="clay-box" style="margin:0"><legend>Text</legend><label class="clay-choice clay-row-between" style="display:flex">Show ruler<input type="checkbox" role="switch" class="clay-switch" checked></label></fieldset></div>`, layout: 'bg' },

  /* ======================= Windows ======================= */
  { id: 'win-window', name: 'Window (Mica)', cat: 'Platform', os: WIN, native: { windows: 'Window with title bar, Mica & NavigationView' },
    desc: 'A Windows 11 app window: Mica backdrop, caption buttons and a NavigationView.',
    html: `<div class="clay-window clay-mica" style="width:100%;height:300px;border-radius:8px"><div class="clay-titlebar" style="background:transparent;border:0;font-weight:400;color:var(--clay-text)"><i data-clay-icon="layers" style="width:16px;height:16px;color:var(--clay-primary)"></i><span>Clay Studio</span><span class="clay-caption-btns"><i></i><i></i><i></i></span></div><div style="flex:1;display:flex;min-height:0"><nav class="clay-sidebar" style="background:transparent;min-width:200px;width:200px"><a class="clay-sidebar-item"><i data-clay-icon="menu"></i></a><a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="home"></i>Home</a><a class="clay-sidebar-item"><i data-clay-icon="folder"></i>Files</a><a class="clay-sidebar-item"><i data-clay-icon="settings"></i>Settings</a></nav><div style="flex:1;background:var(--clay-surface);border-radius:8px 0 0 0;border:1px solid var(--clay-border);padding:20px" class="clay-stack"><span class="clay-h3">Home</span><div class="clay-settings-card"><i data-clay-icon="palette"></i><div class="clay-settings-card-text">Personalisation<small>Background, colours, themes</small></div><span class="clay-chevron"></span></div></div></div></div>`, layout: 'bg' },

  { id: 'win-buttons', name: 'Buttons', cat: 'Actions', os: WIN, native: { windows: 'Button (accent, standard, subtle, hyperlink)' },
    desc: 'Fluent 2 button appearances.',
    html: `<button class="clay-btn">Accent</button><button class="clay-btn clay-btn--secondary">Standard</button><button class="clay-btn clay-btn--plain">Subtle</button><button class="clay-btn clay-btn--link">Hyperlink</button><button class="clay-btn clay-btn--secondary"><i data-clay-icon="mail"></i>With icon</button><button class="clay-btn clay-btn--secondary" disabled>Disabled</button>` },

  { id: 'win-commandbar', name: 'Command bar', cat: 'Navigation', os: WIN, native: { windows: 'CommandBar' },
    desc: 'Primary app commands with icons and labels, plus an overflow.',
    html: `<div class="clay-commandbar" role="toolbar" aria-label="Commands"><button><i data-clay-icon="plus"></i>New</button><button><i data-clay-icon="edit"></i>Edit</button><button><i data-clay-icon="share"></i>Share</button><span class="clay-divider-v"></span><button><i data-clay-icon="trash"></i>Delete</button><button aria-label="More"><i data-clay-icon="more"></i></button></div>` },

  { id: 'win-navview', name: 'NavigationView', cat: 'Navigation', os: WIN,
    desc: 'Left navigation with the accent selection pill and a collapsible pane.',
    html: `<nav class="clay-sidebar" aria-label="App" style="width:260px;background:var(--clay-bg);border-radius:8px"><a class="clay-sidebar-item"><i data-clay-icon="menu"></i></a><div class="clay-input-group" style="margin:4px 0 8px"><i data-clay-icon="search"></i><input class="clay-input" placeholder="Find a setting" aria-label="Find a setting"></div><a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="monitor"></i>System</a><a class="clay-sidebar-item"><i data-clay-icon="bluetooth"></i>Bluetooth &amp; devices</a><a class="clay-sidebar-item"><i data-clay-icon="wifi"></i>Network &amp; internet</a><a class="clay-sidebar-item"><i data-clay-icon="palette"></i>Personalisation</a></nav>` },

  { id: 'win-infobar', name: 'InfoBar', cat: 'Feedback', os: WIN,
    desc: 'App-wide status messages with severity and actions.',
    html: `<div class="clay-alert" role="status"><i data-clay-icon="info"></i><div class="clay-grow"><b>Update available.</b> Restart to install the latest version.</div><button class="clay-btn clay-btn--secondary clay-btn--sm">Restart</button><button class="clay-alert-close" data-clay-dismiss aria-label="Close"><i data-clay-icon="x"></i></button></div><div class="clay-alert clay-alert--success" role="status"><i data-clay-icon="check-circle"></i><div class="clay-grow"><b>Saved.</b> Your settings are synced.</div></div><div class="clay-alert clay-alert--warning" role="status"><i data-clay-icon="alert"></i><div class="clay-grow"><b>Battery saver is on.</b></div></div><div class="clay-alert clay-alert--danger" role="alert"><i data-clay-icon="x"></i><div class="clay-grow"><b>Couldn't connect.</b> Check your network.</div></div>`, layout: 'col' },

  { id: 'win-teaching', name: 'TeachingTip', cat: 'Feedback', os: WIN,
    desc: 'Contextual onboarding with a hero image.',
    html: `<div class="clay-teaching-tip" role="dialog" aria-label="Tip"><div class="clay-teaching-tip-hero"></div><div class="clay-teaching-tip-body"><b>Save automatically</b><span class="clay-muted">Turn on AutoSave and your work is saved as you go.</span><div class="clay-row" style="justify-content:flex-end;margin-top:6px"><button class="clay-btn clay-btn--secondary clay-btn--sm" data-clay-dismiss>Not now</button><button class="clay-btn clay-btn--sm">Turn on</button></div></div></div>` },

  { id: 'win-expander', name: 'Expander & SettingsCard', cat: 'Data display', os: WIN, native: { windows: 'Expander / SettingsCard' },
    desc: 'The building blocks of Windows 11 Settings.',
    html: `<div style="width:100%"><div class="clay-settings-card"><i data-clay-icon="sun"></i><div class="clay-settings-card-text">Night light<small>Use warmer colours to help block blue light</small></div><input type="checkbox" role="switch" class="clay-switch" checked aria-label="Night light"></div><div class="clay-settings-card"><i data-clay-icon="monitor"></i><div class="clay-settings-card-text">Display resolution</div><select class="clay-select" style="width:auto" aria-label="Resolution"><option>2560 × 1440</option><option>1920 × 1080</option></select></div><details class="clay-expander" style="margin-top:4px"><summary><i data-clay-icon="bell"></i><span class="clay-settings-card-text">Notifications<small>Alerts from apps and system</small></span></summary><div class="clay-stack" style="gap:10px"><label class="clay-choice"><input type="checkbox" class="clay-check" checked>Show on lock screen</label><label class="clay-choice"><input type="checkbox" class="clay-check">Play sounds</label></div></details></div>` },

  { id: 'win-listview', name: 'ListView', cat: 'Data display', os: WIN,
    desc: 'A selectable list with the accent selection indicator.',
    html: `<nav class="clay-sidebar" style="width:100%;max-width:420px;border:1px solid var(--clay-border);border-radius:8px" aria-label="Contacts"><a class="clay-sidebar-item" style="height:56px"><span class="clay-avatar clay-avatar--sm">AL</span><span class="clay-list-text"><b class="clay-label">Ada Lovelace</b><span class="clay-caption">Engineer</span></span></a><a class="clay-sidebar-item" aria-current="page" style="height:56px"><span class="clay-avatar clay-avatar--sm" style="background:linear-gradient(135deg,#5ee6d0,#0284c7)">AT</span><span class="clay-list-text"><b class="clay-label">Alan Turing</b><span class="clay-caption">Mathematician</span></span></a><a class="clay-sidebar-item" style="height:56px"><span class="clay-avatar clay-avatar--sm" style="background:linear-gradient(135deg,#ff9f80,#e11d48)">GH</span><span class="clay-list-text"><b class="clay-label">Grace Hopper</b><span class="clay-caption">Admiral</span></span></a></nav>` },

  { id: 'win-timepicker', name: 'TimePicker', cat: 'Selection', os: WIN,
    desc: 'A column flyout for hours, minutes and AM/PM.',
    html: `<div class="clay-colpicker" role="dialog" aria-label="Pick a time"><div class="clay-colpicker-cols"><div><span>8</span><span class="is-selected">9</span><span>10</span></div><div><span>40</span><span class="is-selected">41</span><span>42</span></div><div><span class="is-selected">AM</span><span>PM</span></div></div><div class="clay-colpicker-foot"><button aria-label="Accept"><i data-clay-icon="check"></i></button><button aria-label="Dismiss"><i data-clay-icon="x"></i></button></div></div>` },

  { id: 'win-surfaces', name: 'Mica & Acrylic', cat: 'Platform', os: WIN, native: { windows: 'Materials (Mica, Acrylic)' },
    desc: 'The Windows 11 backdrop materials.',
    html: `<div style="position:relative;width:100%;height:200px;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#0f6cbd,#8764b8 50%,#e3008c)"><div class="clay-acrylic" style="position:absolute;inset:24px auto 24px 24px;width:46%;border-radius:8px;padding:16px"><b>Acrylic</b><p class="clay-caption">Transient surfaces: flyouts and menus</p></div><div class="clay-mica" style="position:absolute;inset:24px 24px 24px auto;width:40%;border-radius:8px;padding:16px;border:1px solid var(--clay-border)"><b>Mica</b><p class="clay-caption">Long-lived window backdrop</p></div></div>` },

  /* ======================= Linux / GNOME ======================= */
  { id: 'adw-headerbar', name: 'Header bar', cat: 'Navigation', os: L, native: { linux: 'AdwHeaderBar' },
    desc: 'A combined title bar and toolbar with a view switcher and window controls.',
    html: `<div class="clay-window" style="width:100%;border-radius:14px"><div class="clay-titlebar" style="height:47px;background:var(--clay-surface-2)"><button class="clay-btn clay-btn--plain clay-btn--icon clay-btn--sm" aria-label="New"><i data-clay-icon="plus"></i></button><span style="flex:1;display:flex;justify-content:center"><span class="clay-viewswitcher" role="group" aria-label="Views"><button aria-pressed="true"><i data-clay-icon="music"></i>Songs</button><button aria-pressed="false"><i data-clay-icon="users"></i>Artists</button><button aria-pressed="false"><i data-clay-icon="layers"></i>Albums</button></span></span><button class="clay-btn clay-btn--plain clay-btn--icon clay-btn--sm" aria-label="Menu"><i data-clay-icon="menu"></i></button><span class="clay-gnome-btns"><i></i></span></div><div class="clay-p-6" style="background:var(--clay-bg);min-height:120px"><span class="clay-muted">Content</span></div></div>`, layout: 'bg' },

  { id: 'adw-buttons', name: 'Buttons', cat: 'Actions', os: L, native: { linux: 'Buttons (suggested, destructive, flat, pill, circular)' },
    desc: 'libadwaita button styles.',
    html: `<button class="clay-btn">Suggested</button><button class="clay-btn clay-btn--secondary">Regular</button><button class="clay-btn clay-btn--plain">Flat</button><button class="clay-btn clay-btn--danger">Destructive</button><button class="clay-btn clay-btn--pill clay-btn--lg">Pill</button><button class="clay-btn clay-btn--icon clay-btn--pill clay-btn--secondary" aria-label="Add"><i data-clay-icon="plus"></i></button><button class="clay-btn clay-btn--icon clay-btn--pill" aria-label="Play"><i data-clay-icon="play"></i></button>` },

  { id: 'adw-rows', name: 'Boxed list rows', cat: 'Data display', os: L, native: { linux: 'AdwActionRow, SwitchRow, ComboRow, EntryRow, SpinRow, ExpanderRow' },
    desc: 'Every libadwaita row type in a boxed list.',
    html: `<div class="clay-pref-group" style="width:100%;max-width:560px"><h4>Preferences</h4><p>Rows adapt to any content.</p><ul class="clay-boxed">
<li><span class="clay-boxed-text">Action row<small>Opens a sub-page</small></span><span class="clay-chevron"></span></li>
<li><span class="clay-boxed-text">Switch row</span><input type="checkbox" role="switch" class="clay-switch" checked aria-label="Switch row"></li>
<li><span class="clay-boxed-text">Combo row</span><select class="clay-select" style="width:auto;min-height:32px" aria-label="Combo"><option>Automatic</option><option>Always</option><option>Never</option></select></li>
<li><input class="clay-entry" placeholder="Entry row" aria-label="Entry row"><i data-clay-icon="edit" style="color:var(--clay-text-3)"></i></li>
<li><span class="clay-boxed-text">Spin row</span><div class="clay-numberbox" style="width:130px"><input class="clay-input" type="number" value="3" aria-label="Spin"><span class="clay-numberbox-btns"><button type="button" data-clay-step="-1" aria-label="Decrease"><i data-clay-icon="minus"></i></button><button type="button" data-clay-step="1" aria-label="Increase"><i data-clay-icon="plus"></i></button></span></div></li>
<li><details><summary><span class="clay-boxed-text">Expander row<small>Reveals nested rows</small></span></summary><div>Nested content lives here.</div></details></li>
</ul></div>`, layout: 'bg' },

  { id: 'adw-status', name: 'Status page', cat: 'Feedback', os: L, native: { linux: 'AdwStatusPage' },
    desc: 'A large empty, error or welcome state.',
    html: `<div class="clay-result" style="width:100%"><i data-clay-icon="search" style="width:96px;height:96px;color:var(--clay-text-3);stroke-width:1.2"></i><span class="clay-h1">No Results Found</span><span class="clay-muted">Try a different search.</span><button class="clay-btn clay-btn--pill clay-btn--lg">Reset Filters</button></div>` },

  { id: 'adw-banner', name: 'Banner', cat: 'Feedback', os: L, native: { linux: 'AdwBanner' },
    desc: 'A full-width message under the header bar.',
    html: `<div class="clay-banner" style="width:100%;background:var(--clay-primary-soft)"><span>Metered connection: updates are paused.</span><button class="clay-btn clay-btn--sm clay-btn--secondary">Allow</button></div>`, layout: 'flush' },

  { id: 'adw-levelbar', name: 'Level bar', cat: 'Feedback', os: L, native: { linux: 'GtkLevelBar' },
    desc: 'Discrete levels such as password strength or battery.',
    html: `<div class="clay-stack" style="width:260px"><span class="clay-caption">Password strength: weak</span><div class="clay-levelbar is-low"><i class="is-on"></i><i></i><i></i><i></i><i></i></div><span class="clay-caption">Medium</span><div class="clay-levelbar is-mid"><i class="is-on"></i><i class="is-on"></i><i class="is-on"></i><i></i><i></i></div><span class="clay-caption">Strong</span><div class="clay-levelbar"><i class="is-on"></i><i class="is-on"></i><i class="is-on"></i><i class="is-on"></i><i class="is-on"></i></div></div>` },

  { id: 'adw-split', name: 'Navigation split view', cat: 'Navigation', os: L, native: { linux: 'AdwNavigationSplitView' },
    desc: 'An adaptive sidebar and content layout.',
    html: `<div class="clay-window" style="width:100%;height:260px;border-radius:14px"><div style="flex:1;display:flex;min-height:0"><nav class="clay-sidebar" style="width:200px;min-width:200px;background:var(--clay-surface-2)"><div class="clay-row clay-row-between" style="height:40px;padding:0 4px"><b>Settings</b><button class="clay-btn clay-btn--plain clay-btn--icon clay-btn--sm" aria-label="Search"><i data-clay-icon="search"></i></button></div><a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="wifi"></i>Wi-Fi</a><a class="clay-sidebar-item"><i data-clay-icon="bluetooth"></i>Bluetooth</a><a class="clay-sidebar-item"><i data-clay-icon="monitor"></i>Displays</a><a class="clay-sidebar-item"><i data-clay-icon="palette"></i>Appearance</a></nav><div style="flex:1;padding:18px;background:var(--clay-bg)"><ul class="clay-boxed"><li><span class="clay-boxed-text">Wi-Fi</span><input type="checkbox" role="switch" class="clay-switch" checked aria-label="Wi-Fi"></li><li><span class="clay-boxed-text">Clay-5G<small>Connected</small></span><i data-clay-icon="lock" style="color:var(--clay-text-3)"></i></li></ul></div></div></div>`, layout: 'bg' },

  { id: 'adw-about', name: 'About dialog', cat: 'Overlays', os: L, native: { linux: 'AdwAboutDialog' },
    desc: 'App information with version, credits and links.',
    html: `<div class="clay-dialog is-static" style="width:340px"><div class="clay-dialog-body" style="align-items:center;text-align:center"><span style="width:96px;height:96px;border-radius:24px;background:linear-gradient(135deg,var(--clay-primary),var(--clay-secondary));display:grid;place-items:center;color:#fff"><i data-clay-icon="layers" style="width:48px;height:48px"></i></span><span class="clay-h3">Clay</span><span class="clay-muted">Mutaher</span><span class="clay-badge">1.0.0</span><ul class="clay-boxed" style="width:100%;margin-top:10px;text-align:left"><li><span class="clay-boxed-text">Website</span><i data-clay-icon="arrow-up-right"></i></li><li><span class="clay-boxed-text">Credits</span><span class="clay-chevron"></span></li></ul></div></div>`, layout: 'center' }
  );
})();
