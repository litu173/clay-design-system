/* Clay component catalog — cross-platform components (each styles itself natively per OS).
   Entry: { id, name, cat, os: [...], desc, native: { os: 'Native name' }, frame: 'phone' | 'narrow', html } */
(function () {
  var C = window.ClayCatalog = window.ClayCatalog || [];
  var ALL = ['web', 'ios', 'android', 'macos', 'windows', 'linux'];
  var NO_IOS = ['web', 'android', 'macos', 'windows', 'linux'];
  var DESK = ['web', 'macos', 'windows', 'linux'];

  C.push(
  /* ---------------- Actions ---------------- */
  { id: 'icon-buttons', name: 'Icon buttons', cat: 'Actions', os: ALL, native: { android: 'Icon buttons (standard, filled, tonal, outlined)', windows: 'AppBarButton', linux: 'Circular buttons' },
    desc: 'Compact actions for toolbars and cards. Always give them an aria-label.',
    html: `
<button class="clay-btn clay-btn--icon" aria-label="Favourite"><i data-clay-icon="heart"></i></button>
<button class="clay-btn clay-btn--icon clay-btn--tonal" aria-label="Share"><i data-clay-icon="share"></i></button>
<button class="clay-btn clay-btn--icon clay-btn--outline" aria-label="Edit"><i data-clay-icon="edit"></i></button>
<button class="clay-btn clay-btn--icon clay-btn--ghost" aria-label="More"><i data-clay-icon="more"></i></button>
<button class="clay-btn clay-btn--icon clay-btn--secondary clay-btn--pill" aria-label="Settings"><i data-clay-icon="settings"></i></button>
<span style="position:relative;display:inline-flex"><button class="clay-btn clay-btn--icon clay-btn--secondary" aria-label="Notifications, 3 unread"><i data-clay-icon="bell"></i></button><span class="clay-count">3</span></span>` },

  { id: 'segmented', name: 'Segmented control', cat: 'Actions', os: ['web', 'ios', 'android', 'macos'], native: { android: 'Segmented buttons', macos: 'Segmented control' },
    desc: 'Switch between closely related views. Built from native radios, so it works without JavaScript.',
    html: `
<div class="clay-segmented" role="radiogroup" aria-label="View">
  <input type="radio" name="seg-a" id="seg-a1" checked><label for="seg-a1">Day</label>
  <input type="radio" name="seg-a" id="seg-a2"><label for="seg-a2">Week</label>
  <input type="radio" name="seg-a" id="seg-a3"><label for="seg-a3">Month</label>
  <input type="radio" name="seg-a" id="seg-a4"><label for="seg-a4">Year</label>
</div>` },

  { id: 'split-button', name: 'Split button', cat: 'Actions', os: DESK, native: { windows: 'SplitButton', linux: 'Split button', macos: 'Pull-down push button' },
    desc: 'A default action plus a menu of related actions.',
    html: `
<div class="clay-dropdown">
  <div class="clay-split">
    <button class="clay-btn">Save</button>
    <button class="clay-btn" data-clay-menu aria-label="More save options" aria-haspopup="menu" aria-expanded="false"><i data-clay-icon="chevron-down"></i></button>
  </div>
  <div class="clay-menu" role="menu">
    <button class="clay-menu-item" role="menuitem">Save as…</button>
    <button class="clay-menu-item" role="menuitem">Save a copy</button>
    <button class="clay-menu-item" role="menuitem">Export as PDF</button>
  </div>
</div>
<div class="clay-split"><button class="clay-btn clay-btn--secondary">Merge</button><button class="clay-btn clay-btn--secondary" aria-label="Merge options"><i data-clay-icon="chevron-down"></i></button></div>` },

  { id: 'toggle-group', name: 'Toggle group', cat: 'Actions', os: ['web', 'windows', 'linux'], native: { windows: 'ToggleButton', linux: 'Toggle group' },
    desc: 'Pressed or unpressed buttons. Single-select by default; add data-multiple for multi-select.',
    html: `
<div class="clay-toggle-group" role="group" aria-label="Text alignment">
  <button aria-pressed="true" aria-label="Align left"><i data-clay-icon="menu"></i></button>
  <button aria-pressed="false" aria-label="Bold"><b>B</b></button>
  <button aria-pressed="false" aria-label="Italic"><i style="font-family:serif">I</i></button>
</div>
<div class="clay-toggle-group" data-multiple role="group" aria-label="Filters">
  <button aria-pressed="true">Unread</button><button aria-pressed="false">Starred</button><button aria-pressed="true">Mentions</button>
</div>
<button class="clay-toggle" aria-pressed="false"><i data-clay-icon="star"></i>Favourite</button>` },

  /* ---------------- Inputs ---------------- */
  { id: 'text-field', name: 'Text field', cat: 'Inputs', os: ALL, native: { windows: 'TextBox', linux: 'Entry', macos: 'Text field', ios: 'Text field' },
    desc: 'Labelled single-line input with helper and error states. It is filled on iOS and GNOME, outlined on Material and has an accent underline on Fluent.',
    html: `
<div class="clay-field"><label for="tf1">Full name</label><input id="tf1" class="clay-input" placeholder="Ada Lovelace"><span class="clay-help">As it appears on your ID.</span></div>
<div class="clay-field is-invalid"><label for="tf2">Email</label><input id="tf2" class="clay-input" value="ada@" aria-invalid="true" aria-describedby="tf2e"><span class="clay-help" id="tf2e">Enter a valid email address.</span></div>
<div class="clay-field"><label for="tf3">Disabled</label><input id="tf3" class="clay-input" value="Read only" disabled></div>`, layout: 'grid3' },

  { id: 'textarea', name: 'Text area', cat: 'Inputs', os: ALL, native: { ios: 'Text editor', windows: 'TextBox (multi-line)', linux: 'Text view' },
    desc: 'Multi-line input with a live character counter.',
    html: `
<div class="clay-field" style="width:100%"><label for="ta1">Message</label><textarea id="ta1" class="clay-textarea" maxlength="200" data-clay-count="ta1c" placeholder="Tell us about your project…"></textarea><span class="clay-counter" id="ta1c">0 / 200</span></div>` },

  { id: 'password', name: 'Password field', cat: 'Inputs', os: ALL, native: { ios: 'Secure field', windows: 'PasswordBox', linux: 'Password entry', macos: 'Secure text field' },
    desc: 'Masked input with a reveal toggle.',
    html: `
<div class="clay-field" style="min-width:260px"><label for="pw1">Password</label><div class="clay-input-group"><input id="pw1" type="password" class="clay-input" value="correct-horse"><button class="clay-input-action" type="button" data-clay-reveal aria-label="Show password" aria-pressed="false"><i data-clay-icon="lock"></i></button></div></div>` },

  { id: 'search-field', name: 'Search field', cat: 'Inputs', os: ['web', 'macos', 'windows', 'linux'], native: { linux: 'Search entry', windows: 'Search box' },
    desc: 'Search input with a leading icon and shortcut hint.',
    html: `
<div class="clay-input-group" style="min-width:280px"><i data-clay-icon="search"></i><input class="clay-input clay-search" placeholder="Search" aria-label="Search"><span class="clay-input-suffix"><kbd class="clay-kbd">⌘K</kbd></span></div>` },

  { id: 'select', name: 'Select', cat: 'Inputs', os: ['web', 'windows', 'linux'], native: { windows: 'ComboBox', linux: 'Drop-down' },
    desc: 'Native select with platform styling. Gets the OS picker on mobile automatically.',
    html: `
<div class="clay-field" style="min-width:240px"><label for="sel1">Country</label><select id="sel1" class="clay-select"><option>United Kingdom</option><option>United States</option><option>Bangladesh</option><option>Germany</option><option>Japan</option></select></div>` },

  { id: 'number-input', name: 'Number input', cat: 'Inputs', os: ['web', 'windows', 'linux'], native: { web: 'Input number', windows: 'NumberBox', linux: 'Spin button' },
    desc: 'Numeric input with increment and decrement controls. Respects min, max and step.',
    html: `
<div class="clay-field"><label for="nb1">Quantity</label><div class="clay-numberbox"><input id="nb1" class="clay-input" type="number" value="2" min="0" max="99"><span class="clay-numberbox-btns"><button type="button" data-clay-step="-1" aria-label="Decrease"><i data-clay-icon="minus"></i></button><button type="button" data-clay-step="1" aria-label="Increase"><i data-clay-icon="plus"></i></button></span></div></div>
<div class="clay-field"><span class="clay-field-label">Guests</span><div class="clay-stepper"><button type="button" data-clay-step="-1" aria-label="Decrease">−</button><input type="number" value="4" min="1" max="12" aria-label="Guests"><button type="button" data-clay-step="1" aria-label="Increase">+</button></div></div>` },

  { id: 'tags-input', name: 'Tags input', cat: 'Inputs', os: ['web', 'macos'], native: { web: 'Tags input / multi-select', macos: 'Token field' },
    desc: 'Type and press Enter or comma to add a token. Backspace removes the last one.',
    html: `
<div class="clay-field" style="width:100%;max-width:440px"><label for="tg1">Recipients</label>
<div class="clay-tags"><span class="clay-chip">ada@clay.design<button class="clay-chip-x" type="button" aria-label="Remove"><i data-clay-icon="x"></i></button></span><span class="clay-chip">grace@clay.design<button class="clay-chip-x" type="button" aria-label="Remove"><i data-clay-icon="x"></i></button></span><input id="tg1" placeholder="Add people…"></div></div>` },

  { id: 'file-upload', name: 'File upload', cat: 'Inputs', os: DESK, native: { web: 'Upload / dropzone' },
    desc: 'Drag-and-drop zone backed by a native file input.',
    html: `
<label class="clay-dropzone" style="width:100%"><input type="file" multiple><span class="clay-empty-icon"><i data-clay-icon="upload"></i></span><b>Drop files or click to upload</b><span class="clay-caption" data-clay-files>PNG, JPG or PDF up to 10MB</span></label>` },

  { id: 'color-picker', name: 'Colour picker', cat: 'Inputs', os: ['web', 'windows'], native: { windows: 'ColorPicker' },
    desc: 'A spectrum area, hue rail and swatches, with a native colour input as the accessible fallback.',
    html: `
<div class="clay-color-picker"><div class="clay-color-area" aria-hidden="true"></div><div class="clay-hue" aria-hidden="true"></div>
<div class="clay-swatch-row"><button style="background:#6d5efc" aria-pressed="true" aria-label="Violet"></button><button style="background:#0ea5e9" aria-pressed="false" aria-label="Sky"></button><button style="background:#10b981" aria-pressed="false" aria-label="Emerald"></button><button style="background:#f59e0b" aria-pressed="false" aria-label="Amber"></button><button style="background:#ef4444" aria-pressed="false" aria-label="Red"></button><button style="background:#111" aria-pressed="false" aria-label="Black"></button></div>
<div class="clay-row" style="gap:8px;flex-wrap:nowrap"><input type="color" value="#6d5efc" aria-label="Custom colour" style="width:36px;height:32px;border:0;background:none;padding:0"><input class="clay-input" value="#6D5EFC" aria-label="Hex"></div></div>` },

  { id: 'rating', name: 'Rating', cat: 'Inputs', os: ['web', 'windows'], native: { windows: 'RatingControl' },
    desc: 'Star rating built from radios, with hover preview.',
    html: `
<div class="clay-rating" role="radiogroup" aria-label="Rating">
  <input type="radio" name="rate-s" id="rs5"><label for="rs5" aria-label="5 stars">★</label>
  <input type="radio" name="rate-s" id="rs4" checked><label for="rs4" aria-label="4 stars">★</label>
  <input type="radio" name="rate-s" id="rs3"><label for="rs3" aria-label="3 stars">★</label>
  <input type="radio" name="rate-s" id="rs2"><label for="rs2" aria-label="2 stars">★</label>
  <input type="radio" name="rate-s" id="rs1"><label for="rs1" aria-label="1 star">★</label>
</div>` },

  /* ---------------- Selection ---------------- */
  { id: 'checkbox', name: 'Checkbox', cat: 'Selection', os: NO_IOS, native: { windows: 'CheckBox', linux: 'Check button' },
    desc: 'Multiple choice with checked, unchecked, indeterminate and disabled states.',
    html: `
<div class="clay-stack" role="group" aria-label="Notifications">
  <label class="clay-choice"><input type="checkbox" class="clay-check" checked>Product updates</label>
  <label class="clay-choice"><input type="checkbox" class="clay-check">Weekly digest</label>
  <label class="clay-choice"><input type="checkbox" class="clay-check" data-indeterminate>Select all (partial)</label>
  <label class="clay-choice"><input type="checkbox" class="clay-check" disabled>Disabled</label>
</div>` },

  { id: 'radio', name: 'Radio buttons', cat: 'Selection', os: NO_IOS, native: { windows: 'RadioButtons', linux: 'Radio check buttons' },
    desc: 'A single choice from a short list.',
    html: `
<div class="clay-stack" role="radiogroup" aria-label="Shipping">
  <label class="clay-choice"><input type="radio" class="clay-radio" name="ship-s" checked>Standard · Free</label>
  <label class="clay-choice"><input type="radio" class="clay-radio" name="ship-s">Express · $9</label>
  <label class="clay-choice"><input type="radio" class="clay-radio" name="ship-s">Same day · $19</label>
</div>` },

  { id: 'switch', name: 'Switch', cat: 'Selection', os: ALL, native: { ios: 'Toggle', windows: 'ToggleSwitch', macos: 'Switch', linux: 'Switch' },
    desc: 'An instant on/off setting. It is a plain checkbox with role="switch", and its size, colour and thumb motion adapt to each OS.',
    html: `
<input type="checkbox" role="switch" class="clay-switch" checked aria-label="Wi-Fi">
<input type="checkbox" role="switch" class="clay-switch" aria-label="Bluetooth">
<input type="checkbox" role="switch" class="clay-switch" checked disabled aria-label="Locked">
<label class="clay-choice"><input type="checkbox" role="switch" class="clay-switch" checked>Airplane mode</label>` },

  { id: 'slider', name: 'Slider', cat: 'Selection', os: ALL, native: { linux: 'Scale' },
    desc: 'Pick a value from a continuous range.',
    html: `
<div class="clay-row" style="flex-wrap:nowrap;width:100%"><i data-clay-icon="sun"></i><input type="range" class="clay-range" value="35" aria-label="Brightness"><i data-clay-icon="sun" style="width:28px;height:28px"></i></div>` },

  { id: 'calendar', name: 'Date picker', cat: 'Selection', os: ALL, native: { ios: 'Date picker (graphical)', android: 'Date picker', windows: 'CalendarView', macos: 'Date picker (graphical)', linux: 'Calendar' },
    desc: 'Interactive month view. Fires a clay:select event with the chosen date.',
    html: `<div class="clay-calendar" data-clay-calendar></div>`, layout: 'center' },

  /* ---------------- Navigation ---------------- */
  { id: 'tabs', name: 'Tabs', cat: 'Navigation', os: ['web', 'android', 'macos', 'windows'], native: { android: 'Tabs (primary)', macos: 'Tab view', windows: 'SelectorBar / Pivot' },
    desc: 'Switch between peer panels. Arrow keys move between tabs.',
    html: `
<div style="width:100%">
  <div class="clay-tabs" role="tablist" aria-label="Project">
    <button class="clay-tab" role="tab" aria-selected="true" aria-controls="tbs1">Overview</button>
    <button class="clay-tab" role="tab" aria-selected="false" aria-controls="tbs2" tabindex="-1">Activity</button>
    <button class="clay-tab" role="tab" aria-selected="false" aria-controls="tbs3" tabindex="-1">Settings</button>
  </div>
  <div class="clay-tabpanel" id="tbs1" role="tabpanel"><p class="clay-muted">Key metrics and recent files.</p></div>
  <div class="clay-tabpanel" id="tbs2" role="tabpanel" hidden><p class="clay-muted">Everything your team shipped.</p></div>
  <div class="clay-tabpanel" id="tbs3" role="tabpanel" hidden><p class="clay-muted">Permissions, integrations and billing.</p></div>
</div>` },

  { id: 'breadcrumbs', name: 'Breadcrumbs', cat: 'Navigation', os: ['web', 'windows'], native: { windows: 'BreadcrumbBar' },
    desc: 'Shows where the current page sits in the hierarchy.',
    html: `<nav aria-label="Breadcrumb"><ol class="clay-breadcrumbs"><li><a href="#">Home</a></li><li><a href="#">Library</a></li><li><a href="#">Components</a></li><li aria-current="page">Buttons</li></ol></nav>` },

  { id: 'tab-view', name: 'Document tabs', cat: 'Navigation', os: ['web', 'windows', 'linux'], native: { windows: 'TabView', linux: 'Tab bar', web: 'Browser-style tabs' },
    desc: 'Closable document tabs for editors and browsers.',
    html: `
<div class="clay-tabview" style="width:100%">
  <button class="clay-tabview-tab is-active"><i data-clay-icon="file" style="width:14px;height:14px"></i>index.html<span class="clay-chip-x" aria-label="Close"><i data-clay-icon="x"></i></span></button>
  <button class="clay-tabview-tab"><i data-clay-icon="file" style="width:14px;height:14px"></i>clay.css<span class="clay-chip-x" aria-label="Close"><i data-clay-icon="x"></i></span></button>
  <button class="clay-tabview-tab"><i data-clay-icon="file" style="width:14px;height:14px"></i>README.md<span class="clay-chip-x" aria-label="Close"><i data-clay-icon="x"></i></span></button>
  <button class="clay-btn clay-btn--icon clay-btn--ghost clay-btn--sm" aria-label="New tab" style="align-self:center"><i data-clay-icon="plus"></i></button>
</div>`, layout: 'flush' },

  { id: 'menubar', name: 'Menu bar', cat: 'Navigation', os: ['macos', 'windows', 'linux'], native: { windows: 'MenuBar', linux: 'Popover menu bar' },
    desc: 'The classic desktop application menu.',
    html: `
<div style="width:100%">
<div class="clay-menubar"><b>Clay</b><span>File</span><span class="is-open">Edit</span><span>View</span><span>Window</span><span>Help</span><span class="clay-menubar-end"><i data-clay-icon="wifi" style="width:15px;height:15px"></i><i data-clay-icon="search" style="width:15px;height:15px"></i><span>Mon 9:41</span></span></div>
<div class="clay-menu clay-menu--static" role="menu" style="margin-left:80px;margin-top:2px;width:220px">
  <button class="clay-menu-item" role="menuitem">Undo<kbd class="clay-kbd">⌘Z</kbd></button><button class="clay-menu-item" role="menuitem">Redo<kbd class="clay-kbd">⇧⌘Z</kbd></button><div class="clay-menu-sep"></div>
  <button class="clay-menu-item" role="menuitem">Cut<kbd class="clay-kbd">⌘X</kbd></button><button class="clay-menu-item" role="menuitem">Copy<kbd class="clay-kbd">⌘C</kbd></button><button class="clay-menu-item" role="menuitem">Paste<kbd class="clay-kbd">⌘V</kbd></button>
</div></div>`, layout: 'flush' },

  { id: 'command-palette', name: 'Command palette', cat: 'Navigation', os: ['web', 'macos', 'linux'], native: { macos: 'Spotlight-style search', linux: 'Command search' },
    desc: 'Keyboard-first search across actions. Press ⌘K or Ctrl+K anywhere on this page.',
    html: `
<button class="clay-btn clay-btn--secondary" data-clay-command="#cmdk"><i data-clay-icon="search"></i>Search commands<kbd class="clay-kbd">⌘K</kbd></button>
<dialog class="clay-dialog clay-command" id="cmdk" data-clay-hotkey aria-label="Command palette">
  <div class="clay-command-search"><i data-clay-icon="search"></i><input placeholder="Type a command or search…" aria-label="Search commands"><kbd class="clay-kbd">esc</kbd></div>
  <ul class="clay-command-list" role="listbox">
    <li class="clay-command-group">Suggestions</li>
    <li class="clay-option" role="option" data-clay-close><i data-clay-icon="plus"></i>New project<span class="clay-caption">⌘N</span></li>
    <li class="clay-option" role="option" data-clay-close><i data-clay-icon="users"></i>Invite teammates</li>
    <li class="clay-option" role="option" data-clay-close><i data-clay-icon="palette"></i>Change theme<span class="clay-caption">⌘T</span></li>
    <li class="clay-command-group">Navigation</li>
    <li class="clay-option" role="option" data-clay-close><i data-clay-icon="home"></i>Go to dashboard</li>
    <li class="clay-option" role="option" data-clay-close><i data-clay-icon="settings"></i>Open settings<span class="clay-caption">⌘,</span></li>
  </ul>
  <div class="clay-command-foot"><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></div>
</dialog>` },

  { id: 'carousel', name: 'Carousel', cat: 'Navigation', os: ['web', 'android'], native: { android: 'Carousel (multi-browse)' },
    desc: 'Scroll-snapping slides with arrow and dot navigation. Swipeable on touch.',
    html: `
<div class="clay-carousel clay-carousel--multi" style="width:100%">
  <div class="clay-carousel-track">
    <div class="clay-slide">Aurora</div><div class="clay-slide" style="background:linear-gradient(135deg,#0ea5e9,#10b981)">Lagoon</div><div class="clay-slide" style="background:linear-gradient(135deg,#f97316,#db2777)">Sunset</div><div class="clay-slide" style="background:linear-gradient(135deg,#111,#6d5efc)">Midnight</div>
  </div>
  <button class="clay-carousel-nav clay-carousel-nav--prev" aria-label="Previous"><i data-clay-icon="chevron-left"></i></button>
  <button class="clay-carousel-nav clay-carousel-nav--next" aria-label="Next"><i data-clay-icon="chevron-right"></i></button>
</div>` },

  /* ---------------- Feedback ---------------- */
  { id: 'progress', name: 'Progress bar', cat: 'Feedback', os: ALL, native: { ios: 'Progress view', android: 'Linear progress indicator', windows: 'ProgressBar', macos: 'Progress indicator (bar)' },
    desc: 'Determinate and indeterminate progress.',
    html: `
<div class="clay-progress" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="--clay-value:62%"><span></span></div>
<div class="clay-progress clay-progress--indeterminate" role="progressbar" aria-label="Loading"><span></span></div>`, layout: 'col' },

  { id: 'spinner', name: 'Spinner', cat: 'Feedback', os: ALL, native: { ios: 'Activity indicator', android: 'Circular progress indicator', windows: 'ProgressRing', macos: 'Progress indicator (spinning)', linux: 'Spinner' },
    desc: 'Indeterminate loading indicators and determinate rings. Apple platforms get the spoked style.',
    html: `
<span class="clay-spinner" role="status" aria-label="Loading"></span>
<span class="clay-spinner" style="--_s:34px" role="status" aria-label="Loading"></span>
<div class="clay-ring" style="--clay-value:72"><span>72%</span></div>
<div class="clay-ring" style="--clay-value:35;--_s:64px"><span>35%</span></div>` },

  { id: 'badges', name: 'Badges', cat: 'Feedback', os: ALL, native: { windows: 'InfoBadge', android: 'Badges' },
    desc: 'Status labels and notification counts.',
    html: `
<span class="clay-badge">Default</span><span class="clay-badge clay-badge--solid">Solid</span><span class="clay-badge clay-badge--success clay-badge--dot">Online</span><span class="clay-badge clay-badge--warning">Beta</span><span class="clay-badge clay-badge--danger">3 errors</span><span class="clay-badge clay-badge--neutral">v1.0</span>
<span style="position:relative;display:inline-flex;margin-left:10px"><i data-clay-icon="mail" style="width:26px;height:26px"></i><span class="clay-count">12</span></span>` },

  { id: 'toast', name: 'Toast', cat: 'Feedback', os: ['web', 'android', 'linux', 'windows'], native: { android: 'Snackbar', linux: 'Toast', windows: 'In-app notification' },
    desc: 'Brief, auto-dismissing messages. Call Clay.toast() or use data-clay-toast.',
    html: `
<button class="clay-btn" data-clay-toast="Changes saved" data-clay-toast-type="success" data-clay-toast-message="Your profile is up to date.">Success</button>
<button class="clay-btn clay-btn--tonal" data-clay-toast="Message archived" data-clay-toast-action="Undo">With action</button>
<button class="clay-btn clay-btn--secondary" data-clay-toast="Upload failed" data-clay-toast-type="danger" data-clay-toast-message="Check your connection.">Error</button>` },

  { id: 'tooltip', name: 'Tooltip', cat: 'Feedback', os: NO_IOS, native: { android: 'Plain tooltip', macos: 'Help tag', windows: 'ToolTip' },
    desc: 'CSS-only hover and focus hints. Add data-clay-tooltip to any element.',
    html: `
<button class="clay-btn clay-btn--secondary" data-clay-tooltip="Copy to clipboard"><i data-clay-icon="copy"></i>Hover me</button>
<span class="clay-tip">Static tooltip</span>`, layout: 'pad-top' },

  { id: 'notification', name: 'Notification', cat: 'Feedback', os: ['ios', 'macos', 'windows', 'linux'], native: { ios: 'Notification banner', macos: 'Notification', windows: 'Toast notification', linux: 'Notification' },
    desc: 'A system-style notification for alerts that arrive while the app is in the background.',
    html: `
<div class="clay-notification" role="status"><span class="clay-notification-icon"><i data-clay-icon="message"></i></span><div class="clay-grow"><b>Messages <small>now</small></b><div>Ada: The new tokens look amazing ✨</div></div></div>` },

  { id: 'empty', name: 'Empty state', cat: 'Feedback', os: ALL, native: { ios: 'Content unavailable view', linux: 'Status page' },
    desc: 'Explains why a view is empty and what to do next.',
    html: `
<div class="clay-empty" style="width:100%"><span class="clay-empty-icon"><i data-clay-icon="folder"></i></span><span class="clay-title">No projects yet</span><span class="clay-label" style="font-weight:400">Create your first project to get started.</span><button class="clay-btn" style="margin-top:6px"><i data-clay-icon="plus"></i>New project</button></div>` },

  { id: 'skeleton', name: 'Skeleton', cat: 'Feedback', os: ['web', 'android'],
    desc: 'Shimmering placeholders that keep the layout steady while content loads.',
    html: `
<div class="clay-row" style="flex-wrap:nowrap;width:100%"><div class="clay-skeleton" style="width:48px;height:48px;border-radius:50%"></div><div class="clay-grow clay-stack" style="gap:8px"><div class="clay-skeleton" style="width:60%"></div><div class="clay-skeleton" style="width:90%"></div><div class="clay-skeleton" style="width:40%"></div></div></div>` },

  /* ---------------- Overlays ---------------- */
  { id: 'dialog', name: 'Dialog', cat: 'Overlays', os: ALL, native: { web: 'Modal', ios: 'Alert', android: 'Basic dialog', macos: 'Alert', windows: 'ContentDialog', linux: 'Alert dialog' },
    desc: 'Built on the native <dialog>, so focus trapping and Escape come free. The left side shows the static anatomy; the button opens it for real.',
    html: `
<div class="clay-dialog is-static" role="dialog" aria-labelledby="dlgs-t">
  <div class="clay-dialog-body"><span class="clay-dialog-icon"><i data-clay-icon="sparkles"></i></span><h3 class="clay-dialog-title" id="dlgs-t">Enable smart sync?</h3><p class="clay-muted">Clay keeps your themes in sync across every device you sign in to.</p></div>
  <div class="clay-dialog-actions"><button class="clay-btn clay-btn--secondary">Not now</button><button class="clay-btn">Enable</button></div>
</div>
<button class="clay-btn clay-btn--tonal" data-clay-open="#dlgs">Open dialog</button>
<dialog class="clay-dialog" id="dlgs" aria-labelledby="dlgs2-t">
  <div class="clay-dialog-body"><h3 class="clay-dialog-title" id="dlgs2-t">Delete 3 files?</h3><p class="clay-muted">This can't be undone.</p></div>
  <div class="clay-dialog-actions"><button class="clay-btn clay-btn--secondary" data-clay-close>Cancel</button><button class="clay-btn clay-btn--danger" data-clay-close="delete">Delete</button></div>
</dialog>`, layout: 'center' },

  { id: 'menu', name: 'Menu', cat: 'Overlays', os: ALL, native: { web: 'Dropdown menu', ios: 'Context menu', android: 'Menu', macos: 'Context menu', windows: 'MenuFlyout', linux: 'Popover menu' },
    desc: 'Lists of actions. Toggle with data-clay-menu. Supports arrow keys, Escape and outside click.',
    html: `
<div class="clay-menu clay-menu--static" role="menu" aria-label="File actions">
  <button class="clay-menu-item" role="menuitem"><i data-clay-icon="edit"></i>Rename</button>
  <button class="clay-menu-item" role="menuitem"><i data-clay-icon="copy"></i>Duplicate</button>
  <button class="clay-menu-item" role="menuitem"><i data-clay-icon="share"></i>Share…</button>
  <div class="clay-menu-sep" role="separator"></div>
  <button class="clay-menu-item clay-menu-item--danger" role="menuitem"><i data-clay-icon="trash"></i>Delete</button>
</div>
<div class="clay-dropdown">
  <button class="clay-btn clay-btn--secondary" data-clay-menu aria-haspopup="menu" aria-expanded="false">Options<i data-clay-icon="chevron-down"></i></button>
  <div class="clay-menu" role="menu"><button class="clay-menu-item" role="menuitem"><i data-clay-icon="bookmark"></i>Save</button><button class="clay-menu-item" role="menuitem"><i data-clay-icon="download"></i>Download</button></div>
</div>`, layout: 'top' },

  { id: 'popover', name: 'Popover', cat: 'Overlays', os: ['web', 'ios', 'macos', 'linux', 'windows'], native: { windows: 'Flyout', web: 'Popover / hover card' },
    desc: 'Rich, anchored content such as previews, quick settings and profile cards.',
    html: `
<div class="clay-popover clay-popover--arrow clay-stack" style="gap:10px">
  <div class="clay-row" style="flex-wrap:nowrap"><span class="clay-avatar clay-avatar--lg" data-status="online">AL</span><div><b>Ada Lovelace</b><div class="clay-caption">Lead engineer · London</div></div></div>
  <p class="clay-label" style="font-weight:400;color:var(--clay-text-2)">Designing analytical engines and the occasional design system.</p>
  <div class="clay-row"><button class="clay-btn clay-btn--sm">Follow</button><button class="clay-btn clay-btn--sm clay-btn--secondary">Message</button></div>
</div>` },

  { id: 'sheet', name: 'Bottom sheet', cat: 'Overlays', os: ['ios', 'android', 'linux', 'web'], native: { ios: 'Sheet (medium detent)', android: 'Bottom sheet', linux: 'Bottom sheet', web: 'Bottom sheet (mobile web)' },
    desc: 'Supplementary content anchored to the bottom edge. The button opens a live sheet.',
    html: `
<div class="clay-dialog clay-sheet is-static" style="box-shadow:var(--clay-shadow-3)">
  <div class="clay-sheet-handle"></div>
  <div class="clay-dialog-body" style="text-align:left"><h3 class="clay-dialog-title">Share project</h3>
  <div class="clay-row" style="justify-content:space-between;margin-top:8px">
    <span class="clay-stack" style="align-items:center;gap:6px"><span class="clay-list-icon" style="width:52px;height:52px;border-radius:14px"><i data-clay-icon="copy"></i></span><span class="clay-caption">Copy</span></span>
    <span class="clay-stack" style="align-items:center;gap:6px"><span class="clay-list-icon" style="width:52px;height:52px;border-radius:14px;background:#34c759"><i data-clay-icon="message"></i></span><span class="clay-caption">Messages</span></span>
    <span class="clay-stack" style="align-items:center;gap:6px"><span class="clay-list-icon" style="width:52px;height:52px;border-radius:14px;background:#ff9500"><i data-clay-icon="mail"></i></span><span class="clay-caption">Mail</span></span>
    <span class="clay-stack" style="align-items:center;gap:6px"><span class="clay-list-icon" style="width:52px;height:52px;border-radius:14px;background:#5856d6"><i data-clay-icon="more"></i></span><span class="clay-caption">More</span></span>
  </div></div>
</div>
<button class="clay-btn clay-btn--tonal" data-clay-open="#sheet-s" style="margin-top:12px">Open live sheet</button>
<dialog class="clay-dialog clay-sheet" id="sheet-s" aria-label="Options"><div class="clay-sheet-handle"></div><div class="clay-dialog-body" style="text-align:left"><h3 class="clay-dialog-title">Options</h3><p class="clay-muted">Swipe down, press Escape or tap outside to close.</p><button class="clay-btn clay-btn--block" data-clay-close>Done</button></div></dialog>`, frame: 'phone', layout: 'col' },

  /* ---------------- Data display ---------------- */
  { id: 'card', name: 'Card', cat: 'Data display', os: ALL,
    desc: 'Groups related content and actions. It comes in elevated, outlined and filled variants.',
    html: `
<article class="clay-card clay-card--interactive"><div class="clay-card-media"></div><div class="clay-card-body"><span class="clay-overline">Guide</span><h3 class="clay-title">Designing for every OS</h3><p class="clay-label clay-muted" style="font-weight:400">One component, six native personalities.</p></div><div class="clay-card-footer"><button class="clay-btn clay-btn--ghost clay-btn--sm">Save</button><button class="clay-btn clay-btn--sm">Read</button></div></article>
<article class="clay-card clay-card--outlined"><div class="clay-card-body"><span class="clay-list-icon" style="width:40px;height:40px;border-radius:12px"><i data-clay-icon="zap"></i></span><h3 class="clay-title">Outlined</h3><p class="clay-label clay-muted" style="font-weight:400">For dense layouts.</p></div></article>
<article class="clay-card clay-card--filled"><div class="clay-card-body"><span class="clay-list-icon" style="width:40px;height:40px;border-radius:12px;background:var(--clay-secondary)"><i data-clay-icon="star"></i></span><h3 class="clay-title">Filled</h3><p class="clay-label clay-muted" style="font-weight:400">Subtle grouping.</p></div></article>`, layout: 'grid3' },

  { id: 'avatar', name: 'Avatar', cat: 'Data display', os: ALL, native: { windows: 'PersonPicture' },
    desc: 'People and entities, with sizes, presence and groups.',
    html: `
<span class="clay-avatar clay-avatar--sm">SM</span><span class="clay-avatar" data-status="online">MA</span><span class="clay-avatar clay-avatar--lg" data-status="busy" style="background:linear-gradient(135deg,#ff9f80,#e11d48)">JS</span><span class="clay-avatar clay-avatar--xl clay-avatar--square" style="background:linear-gradient(135deg,#5ee6d0,#0284c7)">XL</span>
<span class="clay-avatar-group"><span class="clay-avatar">A</span><span class="clay-avatar" style="background:linear-gradient(135deg,#f1d7a6,#a16207)">B</span><span class="clay-avatar" style="background:linear-gradient(135deg,#5ee6d0,#059669)">C</span><span class="clay-avatar" style="background:var(--clay-surface-3);color:var(--clay-text)">+9</span></span>` },

  { id: 'tree', name: 'Tree view', cat: 'Data display', os: DESK, native: { macos: 'Outline view', windows: 'TreeView', linux: 'Tree list' },
    desc: 'Hierarchical data built on nested <details>, so it is keyboard accessible with zero JavaScript.',
    html: `
<ul class="clay-tree" style="min-width:240px">
  <li><details open><summary><i data-clay-icon="folder"></i>src</summary><ul>
    <li><details open><summary><i data-clay-icon="folder"></i>components</summary><ul><li class="clay-tree-leaf is-selected"><i data-clay-icon="file"></i>Button.tsx</li><li class="clay-tree-leaf"><i data-clay-icon="file"></i>Switch.tsx</li></ul></details></li>
    <li class="clay-tree-leaf"><i data-clay-icon="file"></i>index.ts</li></ul></details></li>
  <li><details><summary><i data-clay-icon="folder"></i>public</summary><ul><li class="clay-tree-leaf"><i data-clay-icon="image"></i>logo.svg</li></ul></details></li>
  <li class="clay-tree-leaf"><i data-clay-icon="file"></i>package.json</li>
</ul>` },

  { id: 'desktop-table', name: 'Table', cat: 'Data display', os: ['macos', 'windows', 'linux'], native: { macos: 'Table view', windows: 'DataGrid', linux: 'Column view' },
    desc: 'Compact, sortable desktop tables. Click a header to sort.',
    html: `
<div class="clay-table-wrap" style="width:100%"><table class="clay-table clay-table--striped clay-table--compact">
<thead><tr><th aria-sort="ascending">Name</th><th aria-sort="none">Kind</th><th aria-sort="none" class="is-num">Size</th><th aria-sort="none">Modified</th></tr></thead>
<tbody><tr><td>Brand guide.pdf</td><td>PDF</td><td class="is-num">4.2 MB</td><td>Today</td></tr><tr><td>Hero.png</td><td>Image</td><td class="is-num">1.8 MB</td><td>Yesterday</td></tr><tr><td>Tokens.json</td><td>JSON</td><td class="is-num">12 KB</td><td>Oct 12</td></tr><tr><td>Roadmap.key</td><td>Keynote</td><td class="is-num">22.6 MB</td><td>Oct 3</td></tr></tbody></table></div>` },

  { id: 'chat', name: 'Chat bubbles', cat: 'Data display', os: ['web', 'ios', 'android'], native: { ios: 'Messages' },
    desc: 'Conversation layout with sent and received bubbles.',
    html: `
<div class="clay-chat" style="width:100%;max-width:420px">
  <div class="clay-chat-meta">Today 9:41</div>
  <div class="clay-bubble">Have you tried the new Clay tokens?</div>
  <div class="clay-bubble clay-bubble--me">Yes! Switched our app to Android in one line 🤯</div>
  <div class="clay-bubble">Same markup, native everywhere ✨</div>
  <div class="clay-chat-input"><input class="clay-input clay-search" placeholder="Message" aria-label="Message"><button class="clay-btn clay-btn--icon clay-btn--pill" aria-label="Send"><i data-clay-icon="send"></i></button></div>
</div>`, frame: 'phone' },

  { id: 'kbd', name: 'Keyboard keys & code', cat: 'Data display', os: DESK,
    desc: 'Shortcuts, inline code and highlighted text.',
    html: `<p class="clay-label" style="font-weight:400">Press <kbd class="clay-kbd">⌘</kbd> <kbd class="clay-kbd">⇧</kbd> <kbd class="clay-kbd">P</kbd> to run <code class="clay-code">Clay.init()</code>, then <mark class="clay-mark">ship it</mark>.</p>` },

  { id: 'divider', name: 'Divider', cat: 'Layout', os: ALL,
    desc: 'Horizontal and vertical separators.',
    html: `<div style="width:100%"><span class="clay-label">Section A</span><hr class="clay-divider"><div class="clay-row" style="height:24px"><span class="clay-caption">Left</span><span class="clay-divider-v"></span><span class="clay-caption">Right</span></div></div>` },

  { id: 'accordion', name: 'Accordion', cat: 'Data display', os: ['web', 'macos'], native: { macos: 'Disclosure group' },
    desc: 'Native <details>, keyboard accessible with zero JavaScript. Give the items the same name="…" to make them exclusive.',
    html: `
<div class="clay-accordion-group" style="width:100%">
  <details class="clay-accordion" name="acc-s" open><summary>Is Clay free for commercial use?</summary><p>Yes. Clay is MIT licensed.</p></details>
  <details class="clay-accordion" name="acc-s"><summary>Does it work with React or Vue?</summary><p>It's plain HTML classes plus a tiny runtime, so it works anywhere.</p></details>
  <details class="clay-accordion" name="acc-s"><summary>Can I use it in native apps?</summary><p>Export tokens to SwiftUI, Compose, Flutter, WinUI or GTK.</p></details>
</div>` },

  { id: 'notification-center', name: 'Notification list', cat: 'Data display', os: ['web', 'macos', 'windows'], native: { macos: 'Notification Center', windows: 'Notification center' },
    desc: 'A stacked feed of notifications with unread state.',
    html: `
<div class="clay-card" style="width:min(100%,380px)">
  <div class="clay-row clay-row-between" style="padding:12px 16px;border-bottom:1px solid var(--clay-border)"><b>Notifications</b><button class="clay-btn clay-btn--link clay-btn--sm">Mark all read</button></div>
  <ul class="clay-list" style="border-radius:0">
    <li class="clay-list-item clay-list-item--action"><span class="clay-avatar clay-avatar--sm">AL</span><span class="clay-list-text"><span class="clay-list-title"><b>Ada</b> commented on <b>Tokens</b></span><span class="clay-list-sub">2 min ago</span></span><span class="clay-badge clay-badge--dot"></span></li>
    <li class="clay-list-item clay-list-item--action"><span class="clay-avatar clay-avatar--sm" style="background:linear-gradient(135deg,#5ee6d0,#0284c7)">AT</span><span class="clay-list-text"><span class="clay-list-title"><b>Alan</b> merged PR #42</span><span class="clay-list-sub">1 hour ago</span></span></li>
    <li class="clay-list-item clay-list-item--action"><span class="clay-list-icon" style="background:var(--clay-success)"><i data-clay-icon="check"></i></span><span class="clay-list-text"><span class="clay-list-title">Deploy succeeded</span><span class="clay-list-sub">Yesterday</span></span></li>
  </ul>
</div>` }
  );
})();
