/* Clay component catalog — Web (marketing sites, web apps, dashboards) */
(function () {
  var C = window.ClayCatalog = window.ClayCatalog || [];
  var W = ['web'];
  C.push(
  /* Actions */
  { id: 'web-buttons', name: 'Buttons', cat: 'Actions', os: W,
    desc: 'Primary, tonal, secondary, outline, ghost, danger and link variants in three sizes, with loading and disabled states.',
    html: `
<button class="clay-btn">Primary</button>
<button class="clay-btn clay-btn--tonal">Tonal</button>
<button class="clay-btn clay-btn--secondary">Secondary</button>
<button class="clay-btn clay-btn--outline">Outline</button>
<button class="clay-btn clay-btn--ghost">Ghost</button>
<button class="clay-btn clay-btn--danger">Delete</button>
<button class="clay-btn clay-btn--link">Link</button>
<button class="clay-btn clay-btn--sm">Small</button>
<button class="clay-btn clay-btn--lg"><i data-clay-icon="download"></i>Large</button>
<button class="clay-btn clay-btn--pill clay-btn--tonal"><i data-clay-icon="sparkles"></i>Pill</button>
<button class="clay-btn is-loading">Saving</button>
<button class="clay-btn" disabled>Disabled</button>` },

  { id: 'button-group', name: 'Button group', cat: 'Actions', os: ['web', 'macos', 'windows'],
    desc: 'Related actions joined into one control.',
    html: `<div class="clay-btn-group"><button class="clay-btn clay-btn--secondary"><i data-clay-icon="chevron-left"></i></button><button class="clay-btn clay-btn--secondary">Today</button><button class="clay-btn clay-btn--secondary"><i data-clay-icon="chevron-right"></i></button></div>
<div class="clay-btn-group"><button class="clay-btn clay-btn--secondary">Day</button><button class="clay-btn clay-btn--secondary">Week</button><button class="clay-btn clay-btn--secondary">Month</button></div>` },

  { id: 'web-dropdown', name: 'Dropdown button', cat: 'Actions', os: ['web', 'windows', 'macos', 'ios'], native: { windows: 'DropDownButton', macos: 'Pull-down button', ios: 'Pull-down menu' },
    desc: 'A button that opens a menu of choices.',
    html: `
<div class="clay-dropdown">
  <button class="clay-btn clay-btn--secondary" data-clay-menu aria-haspopup="menu" aria-expanded="false"><i data-clay-icon="filter"></i>Sort by<i data-clay-icon="chevron-down"></i></button>
  <div class="clay-menu" role="menu"><span class="clay-menu-label">Sort</span><button class="clay-menu-item" role="menuitem">Newest first</button><button class="clay-menu-item" role="menuitem">Oldest first</button><button class="clay-menu-item" role="menuitem">Most popular</button></div>
</div>`, layout: 'tall' },

  { id: 'back-top', name: 'Back to top', cat: 'Actions', os: W,
    desc: 'A floating shortcut back to the top of long pages.',
    html: `<button class="clay-backtop" aria-label="Back to top"><i data-clay-icon="arrow-up-right" style="transform:rotate(-45deg)"></i></button>` },

  /* Inputs */
  { id: 'floating-label', name: 'Floating label field', cat: 'Inputs', os: ['web', 'android'], native: { android: 'Outlined text field' },
    desc: 'The label sits inside the field and floats up on focus or when the field has a value.',
    html: `
<div class="clay-float" style="min-width:240px"><input id="fl1" class="clay-input" placeholder=" "><label for="fl1">Email address</label></div>
<div class="clay-float clay-float--outlined" style="min-width:240px"><input id="fl2" class="clay-input" placeholder=" " value="Clay Studio"><label for="fl2">Workspace</label></div>` },

  { id: 'input-addons', name: 'Input addons', cat: 'Inputs', os: W,
    desc: 'Prefixes, suffixes and icons attached to inputs.',
    html: `
<div class="clay-field" style="min-width:300px"><label for="ad1">Website</label><div class="clay-addon"><span>https://</span><input id="ad1" class="clay-input" value="clay.design"><span>.com</span></div></div>
<div class="clay-field" style="min-width:220px"><label for="ad2">Price</label><div class="clay-input-group"><i data-clay-icon="wallet"></i><input id="ad2" class="clay-input" inputmode="decimal" value="1,250.00"><span class="clay-input-suffix">USD</span></div></div>` },

  { id: 'combobox', name: 'Autocomplete', cat: 'Inputs', os: ['web', 'windows', 'android'], native: { web: 'Combobox / autocomplete', windows: 'AutoSuggestBox', android: 'Exposed dropdown menu' },
    desc: 'Type to filter suggestions, then click to pick.',
    html: `
<div class="clay-field" style="width:280px"><label for="cb1">Framework</label>
<div class="clay-combobox"><input id="cb1" class="clay-input" placeholder="Start typing…" autocomplete="off" role="combobox" aria-expanded="false">
<ul class="clay-listbox" role="listbox"><li class="clay-option" role="option">React</li><li class="clay-option" role="option">Vue</li><li class="clay-option" role="option">Svelte</li><li class="clay-option" role="option">Angular</li><li class="clay-option" role="option">Solid</li><li class="clay-option" role="option">Astro</li></ul></div></div>`, layout: 'tall' },

  { id: 'listbox', name: 'Listbox (multi-select)', cat: 'Inputs', os: W,
    desc: 'An always-visible list of selectable options.',
    html: `<ul class="clay-listbox clay-listbox--static" role="listbox" aria-label="Plan" style="width:260px"><li class="clay-option" role="option" aria-selected="false">Starter<span class="clay-caption">Free</span></li><li class="clay-option" role="option" aria-selected="true">Pro</li><li class="clay-option" role="option" aria-selected="false">Team<span class="clay-caption">$49</span></li><li class="clay-option" role="option" aria-selected="false">Enterprise</li></ul>` },

  { id: 'otp', name: 'One-time code', cat: 'Inputs', os: ['web', 'ios', 'android'], native: { ios: 'Verification code', android: 'Verification code' },
    desc: 'Auto-advancing PIN or OTP input. Backspace moves back a field.',
    html: `<div class="clay-field"><span class="clay-field-label">Verification code</span><div class="clay-otp"><input inputmode="numeric" maxlength="1" aria-label="Digit 1"><input inputmode="numeric" maxlength="1" aria-label="Digit 2"><input inputmode="numeric" maxlength="1" aria-label="Digit 3"><input inputmode="numeric" maxlength="1" aria-label="Digit 4"><input inputmode="numeric" maxlength="1" aria-label="Digit 5"><input inputmode="numeric" maxlength="1" aria-label="Digit 6"></div></div>` },

  { id: 'range-slider', name: 'Range slider', cat: 'Selection', os: ['web', 'android'], native: { android: 'Range slider' },
    desc: 'Two thumbs for a minimum and a maximum.',
    html: `<div style="width:100%"><div class="clay-row clay-row-between clay-label"><span>Price</span><span>$20 – $80</span></div><div class="clay-range-dual"><input type="range" class="clay-range" value="20" aria-label="Minimum"><input type="range" class="clay-range" value="80" aria-label="Maximum"></div></div>` },

  { id: 'datetime-native', name: 'Date & time inputs', cat: 'Selection', os: W,
    desc: 'Native date, time, month and week inputs, which use each browser\'s own picker.',
    html: `
<div class="clay-field"><label for="dt1">Date</label><input id="dt1" type="date" class="clay-input" value="2026-10-19"></div>
<div class="clay-field"><label for="dt2">Time</label><input id="dt2" type="time" class="clay-input" value="09:41"></div>
<div class="clay-field"><label for="dt3">Month</label><input id="dt3" type="month" class="clay-input" value="2026-10"></div>`, layout: 'grid3' },

  { id: 'transfer', name: 'Transfer list', cat: 'Selection', os: W,
    desc: 'Move items between two lists, for permissions and column pickers.',
    html: `
<div class="clay-transfer" style="width:100%">
  <div class="clay-transfer-list"><header>Available <span class="clay-caption" data-count>4</span></header><ul><li><label class="clay-choice"><input type="checkbox" class="clay-check">Read</label></li><li><label class="clay-choice"><input type="checkbox" class="clay-check">Write</label></li><li><label class="clay-choice"><input type="checkbox" class="clay-check">Delete</label></li><li><label class="clay-choice"><input type="checkbox" class="clay-check">Billing</label></li></ul></div>
  <div class="clay-transfer-btns"><button class="clay-btn clay-btn--icon clay-btn--secondary" data-clay-transfer="right" aria-label="Move right"><i data-clay-icon="chevron-right"></i></button><button class="clay-btn clay-btn--icon clay-btn--secondary" data-clay-transfer="left" aria-label="Move left"><i data-clay-icon="chevron-left"></i></button></div>
  <div class="clay-transfer-list"><header>Granted <span class="clay-caption" data-count>1</span></header><ul><li><label class="clay-choice"><input type="checkbox" class="clay-check">Admin</label></li></ul></div>
</div>` },

  { id: 'cascader', name: 'Cascader', cat: 'Selection', os: W,
    desc: 'Pick from hierarchical options column by column.',
    html: `<div class="clay-cascader"><ul><li class="has-children" aria-selected="true">Asia</li><li class="has-children">Europe</li><li class="has-children">Americas</li></ul><ul><li class="has-children">Japan</li><li class="has-children" aria-selected="true">Bangladesh</li><li class="has-children">India</li></ul><ul><li aria-selected="true">Dhaka</li><li>Chattogram</li><li>Sylhet</li></ul></div>` },

  { id: 'forms', name: 'Form layout', cat: 'Inputs', os: W,
    desc: 'A complete, validated form with sections, a two-column grid and actions.',
    html: `
<form class="clay-card" style="width:100%" onsubmit="event.preventDefault()"><div class="clay-card-body" style="gap:16px">
  <div><span class="clay-title">Profile</span><p class="clay-caption">This information will be displayed publicly.</p></div>
  <div class="clay-cols"><div class="clay-field clay-span-6"><label for="fm1">First name</label><input id="fm1" class="clay-input" required></div><div class="clay-field clay-span-6"><label for="fm2">Last name</label><input id="fm2" class="clay-input" required></div>
  <div class="clay-field"><label for="fm3">About</label><textarea id="fm3" class="clay-textarea" placeholder="A few words…"></textarea></div></div>
  <label class="clay-choice"><input type="checkbox" class="clay-check">I agree to the <a href="#">terms</a></label>
</div><div class="clay-card-footer"><button type="reset" class="clay-btn clay-btn--ghost">Cancel</button><button class="clay-btn" data-clay-toast="Profile saved" data-clay-toast-type="success">Save</button></div></form>` },

  /* Navigation */
  { id: 'navbar', name: 'Navbar', cat: 'Navigation', os: W,
    desc: 'A responsive site header with brand, links and actions.',
    html: `<nav class="clay-navbar" style="width:100%"><a class="clay-navbar-brand" href="#"><span class="clay-avatar clay-avatar--sm clay-avatar--square">C</span>Acme</a><div class="clay-navbar-links"><a href="#" aria-current="page">Product</a><a href="#">Pricing</a><a href="#">Docs</a><a href="#">Blog</a></div><span class="clay-grow"></span><button class="clay-btn clay-btn--ghost clay-btn--sm">Sign in</button><button class="clay-btn clay-btn--sm">Get started</button></nav>`, layout: 'flush' },

  { id: 'mega-menu', name: 'Mega menu', cat: 'Navigation', os: W,
    desc: 'A rich multi-column navigation panel.',
    html: `<div class="clay-mega" style="width:100%"><a href="#"><span><i data-clay-icon="chart"></i></span><span><b>Analytics</b><small>Understand your traffic and conversions.</small></span></a><a href="#"><span><i data-clay-icon="zap"></i></span><span><b>Automations</b><small>Build workflows without code.</small></span></a><a href="#"><span><i data-clay-icon="shield"></i></span><span><b>Security</b><small>SSO, audit logs and more.</small></span></a><a href="#"><span><i data-clay-icon="layers"></i></span><span><b>Integrations</b><small>Connect 200+ tools.</small></span></a></div>` },

  { id: 'sidebar', name: 'Sidebar', cat: 'Navigation', os: ['web'],
    desc: 'App navigation with sections, badges and an active state.',
    html: `
<nav class="clay-sidebar" aria-label="Workspace" style="border:1px solid var(--clay-border);border-radius:var(--clay-radius-lg)">
  <span class="clay-sidebar-label">Workspace</span>
  <a class="clay-sidebar-item" aria-current="page"><i data-clay-icon="home"></i>Dashboard</a>
  <a class="clay-sidebar-item"><i data-clay-icon="folder"></i>Projects<span class="clay-badge">12</span></a>
  <a class="clay-sidebar-item"><i data-clay-icon="message"></i>Messages</a>
  <a class="clay-sidebar-item"><i data-clay-icon="calendar"></i>Calendar</a>
  <span class="clay-sidebar-label">Account</span>
  <a class="clay-sidebar-item"><i data-clay-icon="settings"></i>Settings</a>
  <a class="clay-sidebar-item"><i data-clay-icon="logout"></i>Sign out</a>
</nav>` },

  { id: 'pagination', name: 'Pagination', cat: 'Navigation', os: ['web', 'windows'], native: { windows: 'PipsPager / pagination' },
    desc: 'Navigate between pages of results.',
    html: `<nav class="clay-pagination" aria-label="Pagination"><button class="clay-page" aria-label="Previous"><i data-clay-icon="chevron-left"></i></button><button class="clay-page">1</button><button class="clay-page" aria-current="page">2</button><button class="clay-page">3</button><span class="clay-subtle">…</span><button class="clay-page">12</button><button class="clay-page" aria-label="Next"><i data-clay-icon="chevron-right"></i></button></nav>` },

  { id: 'steps', name: 'Steps', cat: 'Navigation', os: W,
    desc: 'Progress through a multi-step flow.',
    html: `<ol class="clay-steps" style="width:100%"><li class="clay-step is-done">Account</li><li class="clay-step is-done">Profile</li><li class="clay-step is-current" aria-current="step">Billing</li><li class="clay-step">Confirm</li></ol>` },

  { id: 'pill-tabs', name: 'Pill tabs', cat: 'Navigation', os: W,
    desc: 'Compact segmented tabs for filters and periods.',
    html: `<div class="clay-tabs clay-tabs--pill" role="tablist" aria-label="Period"><button class="clay-tab" role="tab" aria-selected="false" tabindex="-1">Daily</button><button class="clay-tab" role="tab" aria-selected="true">Monthly</button><button class="clay-tab" role="tab" aria-selected="false" tabindex="-1">Yearly</button></div>` },

  { id: 'anchor', name: 'Table of contents', cat: 'Navigation', os: W, native: { web: 'Anchor / table of contents' },
    desc: 'In-page navigation for long documents.',
    html: `<nav class="clay-anchor" aria-label="On this page"><a href="#">Introduction</a><a href="#" aria-current="true">Installation</a><a href="#">Theming</a><a href="#">API reference</a></nav>` },

  { id: 'footer', name: 'Footer', cat: 'Navigation', os: W,
    desc: 'A site footer with brand, link columns and legal text.',
    html: `<footer class="clay-site-footer" style="width:100%"><div><b class="clay-title">Acme</b><p class="clay-caption" style="margin-top:8px">Tools for teams who ship.</p></div><div><h5>Product</h5><a href="#">Features</a><a href="#">Pricing</a><a href="#">Changelog</a></div><div><h5>Company</h5><a href="#">About</a><a href="#">Careers</a><a href="#">Press</a></div><div><h5>Legal</h5><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div></footer>`, layout: 'flush' },

  /* Feedback */
  { id: 'alert', name: 'Alert', cat: 'Feedback', os: W,
    desc: 'Inline, dismissible status messages in four tones.',
    html: `
<div class="clay-alert" role="status"><i data-clay-icon="info"></i><div><div class="clay-alert-title">New version available</div>Clay 1.1 adds visionOS presets.</div><button class="clay-alert-close" data-clay-dismiss aria-label="Dismiss"><i data-clay-icon="x"></i></button></div>
<div class="clay-alert clay-alert--success" role="status"><i data-clay-icon="check-circle"></i><div><div class="clay-alert-title">Payment received</div>Invoice #2048 is paid.</div></div>
<div class="clay-alert clay-alert--warning" role="status"><i data-clay-icon="alert"></i><div><div class="clay-alert-title">Storage almost full</div>You've used 92% of your plan.</div></div>
<div class="clay-alert clay-alert--danger" role="alert"><i data-clay-icon="x"></i><div><div class="clay-alert-title">Deployment failed</div>Build exited with code 1.</div></div>`, layout: 'col' },

  { id: 'banner', name: 'Announcement banner', cat: 'Feedback', os: W,
    desc: 'A site-wide strip for launches and promotions.',
    html: `<div style="width:100%" class="clay-stack"><div class="clay-banner"><span>🎉 <b>Clay 1.0</b> is here: six platforms, one system.</span><a class="clay-btn clay-btn--sm" href="#">Read more</a><button class="clay-alert-close" data-clay-dismiss aria-label="Dismiss"><i data-clay-icon="x"></i></button></div><div class="clay-banner clay-banner--dark">Scheduled maintenance on Sunday, 02:00–03:00 UTC.</div></div>`, layout: 'flush' },

  { id: 'result', name: 'Result page', cat: 'Feedback', os: W, native: { web: 'Result / success / 404' },
    desc: 'Full-page outcomes: success, error and not found.',
    html: `
<div class="clay-result"><span class="clay-result-icon"><i data-clay-icon="check"></i></span><span class="clay-h3">Payment successful</span><span class="clay-muted">Order #A-2048 is on its way.</span><div class="clay-row"><button class="clay-btn">View order</button><button class="clay-btn clay-btn--secondary">Continue shopping</button></div></div>
<div class="clay-result"><span class="clay-result-code">404</span><span class="clay-h3">Page not found</span><span class="clay-muted">The page you're looking for drifted into space.</span><a class="clay-btn clay-btn--tonal" href="#">Back home</a></div>`, layout: 'grid2' },

  { id: 'tour', name: 'Product tour', cat: 'Feedback', os: W, native: { web: 'Tour / coachmark' },
    desc: 'Step-by-step onboarding hints anchored to UI.',
    html: `<div class="clay-tour" role="dialog" aria-label="Tour step"><b>Meet the Foundations panel</b><span style="opacity:.9;font-size:14px">Change colour, radius and type on the right and watch every component update.</span><div class="clay-tour-foot"><span>2 of 4</span><span class="clay-row" style="gap:6px"><button class="clay-btn clay-btn--ghost clay-btn--sm" data-clay-dismiss>Skip</button><button class="clay-btn clay-btn--sm">Next</button></span></div></div>`, layout: 'pad-top' },

  { id: 'cookie', name: 'Cookie consent', cat: 'Feedback', os: W,
    desc: 'A privacy-friendly consent bar that defaults to "essential only".',
    html: `<div class="clay-cookie" role="region" aria-label="Cookie consent" style="width:100%"><i data-clay-icon="shield" style="color:var(--clay-primary)"></i><p>We use essential cookies to make this site work. With your consent we'd also use analytics.</p><button class="clay-btn clay-btn--secondary clay-btn--sm" data-clay-dismiss>Essential only</button><button class="clay-btn clay-btn--sm" data-clay-dismiss>Accept all</button></div>` },

  /* Overlays */
  { id: 'drawer', name: 'Drawer', cat: 'Overlays', os: ['web'],
    desc: 'A side panel for filters, settings and detail views.',
    html: `
<button class="clay-btn clay-btn--secondary" data-clay-open="#drw1"><i data-clay-icon="filter"></i>Open filters</button>
<dialog class="clay-dialog clay-drawer" id="drw1" aria-label="Filters"><div class="clay-dialog-body" style="text-align:left;height:100%">
  <div class="clay-row clay-row-between"><h3 class="clay-dialog-title">Filters</h3><button class="clay-btn clay-btn--icon clay-btn--ghost" data-clay-close aria-label="Close"><i data-clay-icon="x"></i></button></div>
  <div class="clay-field"><label for="drk">Keyword</label><input id="drk" class="clay-input" placeholder="e.g. dashboard"></div>
  <label class="clay-choice"><input type="checkbox" class="clay-check" checked>In stock</label><label class="clay-choice"><input type="checkbox" class="clay-check">On sale</label>
  <span class="clay-grow"></span><button class="clay-btn clay-btn--block" data-clay-close>Apply</button></div></dialog>` },

  { id: 'modal-form', name: 'Form modal', cat: 'Overlays', os: W,
    desc: 'A modal carrying a short form.',
    html: `
<button class="clay-btn" data-clay-open="#mdf"><i data-clay-icon="users"></i>Invite member</button>
<dialog class="clay-dialog" id="mdf" aria-labelledby="mdf-t"><form method="dialog"><div class="clay-dialog-body"><h3 class="clay-dialog-title" id="mdf-t">Invite a teammate</h3><div class="clay-field"><label for="mdf-e">Email</label><input id="mdf-e" class="clay-input" type="email" placeholder="name@company.com"></div><div class="clay-field"><label for="mdf-r">Role</label><select id="mdf-r" class="clay-select"><option>Editor</option><option>Viewer</option><option>Admin</option></select></div></div>
<div class="clay-dialog-actions"><button class="clay-btn clay-btn--secondary" value="cancel">Cancel</button><button class="clay-btn" value="ok">Send invite</button></div></form></dialog>` },

  /* Data display */
  { id: 'data-table', name: 'Data table', cat: 'Data display', os: W,
    desc: 'Sortable columns, row selection, toolbar and pagination.',
    html: `
<div class="clay-table-wrap" style="width:100%">
  <div class="clay-table-toolbar"><div class="clay-input-group" style="flex:1;min-width:180px"><i data-clay-icon="search"></i><input class="clay-input" placeholder="Search customers" aria-label="Search"></div><button class="clay-btn clay-btn--secondary clay-btn--sm"><i data-clay-icon="filter"></i>Filter</button><button class="clay-btn clay-btn--sm"><i data-clay-icon="plus"></i>Add</button></div>
  <table class="clay-table"><thead><tr><th style="width:36px"><input type="checkbox" class="clay-check" data-clay-select-all aria-label="Select all"></th><th aria-sort="ascending">Customer</th><th aria-sort="none">Status</th><th aria-sort="none" class="is-num">Amount</th></tr></thead>
  <tbody>
    <tr><td><input type="checkbox" class="clay-check" aria-label="Select"></td><td>Ada Lovelace</td><td><span class="clay-badge clay-badge--success clay-badge--dot">Paid</span></td><td class="is-num">$1,240.00</td></tr>
    <tr><td><input type="checkbox" class="clay-check" aria-label="Select"></td><td>Alan Turing</td><td><span class="clay-badge clay-badge--warning clay-badge--dot">Pending</span></td><td class="is-num">$980.00</td></tr>
    <tr><td><input type="checkbox" class="clay-check" aria-label="Select"></td><td>Grace Hopper</td><td><span class="clay-badge clay-badge--danger clay-badge--dot">Failed</span></td><td class="is-num">$320.00</td></tr>
    <tr><td><input type="checkbox" class="clay-check" aria-label="Select"></td><td>Katherine Johnson</td><td><span class="clay-badge clay-badge--neutral">Draft</span></td><td class="is-num">$49.00</td></tr>
  </tbody></table>
  <div class="clay-table-foot"><span>Showing 1–4 of 48</span><nav class="clay-pagination" aria-label="Pagination"><button class="clay-page" aria-current="page">1</button><button class="clay-page">2</button><button class="clay-page">3</button></nav></div>
</div>` },

  { id: 'list-group', name: 'List group', cat: 'Data display', os: W,
    desc: 'Bordered lists with icons, metadata and actions.',
    html: `<ul class="clay-list clay-list--bordered" style="width:100%;max-width:520px"><li class="clay-list-item clay-list-item--action"><span class="clay-list-icon"><i data-clay-icon="file"></i></span><span class="clay-list-text"><span class="clay-list-title">Q3 report.pdf</span><span class="clay-list-sub">2.4 MB · Edited 2h ago</span></span><span class="clay-list-trail"><i data-clay-icon="download"></i></span></li><li class="clay-list-item clay-list-item--action"><span class="clay-list-icon" style="background:var(--clay-secondary)"><i data-clay-icon="image"></i></span><span class="clay-list-text"><span class="clay-list-title">Hero artwork.png</span><span class="clay-list-sub">8.1 MB · Yesterday</span></span><span class="clay-list-trail"><i data-clay-icon="download"></i></span></li></ul>` },

  { id: 'description-list', name: 'Description list', cat: 'Data display', os: W,
    desc: 'Key–value details for records and settings summaries.',
    html: `<dl class="clay-desc" style="width:100%;max-width:520px"><dt>Customer</dt><dd>Ada Lovelace</dd><dt>Plan</dt><dd>Pro · Annual</dd><dt>Status</dt><dd><span class="clay-badge clay-badge--success">Active</span></dd><dt>Renews</dt><dd>12 Oct 2027</dd></dl>` },

  { id: 'chips', name: 'Tags & chips', cat: 'Data display', os: W,
    desc: 'Toggleable filter chips and removable tags.',
    html: `<button class="clay-chip" aria-pressed="true"><i data-clay-icon="check"></i>Design</button><button class="clay-chip" aria-pressed="false">Engineering</button><button class="clay-chip" aria-pressed="false">Marketing</button><span class="clay-chip">mutaher@clay.design<button class="clay-chip-x" aria-label="Remove"><i data-clay-icon="x"></i></button></span>` },

  { id: 'timeline', name: 'Timeline', cat: 'Data display', os: W,
    desc: 'Chronological events such as order tracking or activity.',
    html: `<ol class="clay-timeline"><li><b>Order placed</b><div class="clay-caption">Oct 14, 09:12</div></li><li><b>Packed &amp; shipped</b><div class="clay-caption">Oct 15, 16:40</div></li><li><b>Out for delivery</b><div class="clay-caption">Today, 08:05</div></li></ol>` },

  { id: 'stats', name: 'Statistics', cat: 'Data display', os: W, native: { web: 'Stat / KPI cards' },
    desc: 'KPI cards for dashboards.',
    html: `
<div class="clay-card"><div class="clay-card-body clay-stat"><span class="clay-stat-label">Revenue</span><span class="clay-stat-value">$84,210</span><span class="clay-stat-delta">▲ 14.2%</span></div></div>
<div class="clay-card"><div class="clay-card-body clay-stat"><span class="clay-stat-label">Active users</span><span class="clay-stat-value">12,914</span><span class="clay-stat-delta is-down">▼ 1.2%</span></div></div>
<div class="clay-card"><div class="clay-card-body clay-stat"><span class="clay-stat-label">Conversion</span><span class="clay-stat-value">4.8%</span><span class="clay-stat-delta">▲ 0.6%</span></div></div>`, layout: 'grid3' },

  { id: 'charts', name: 'Charts', cat: 'Data display', os: W,
    desc: 'Lightweight CSS bar and donut charts driven by custom properties.',
    html: `
<div class="clay-card" style="flex:2;min-width:260px"><div class="clay-card-body"><span class="clay-title">Weekly sessions</span><div class="clay-bars"><div><i style="--h:40%"></i>Mon</div><div><i style="--h:62%"></i>Tue</div><div><i style="--h:55%"></i>Wed</div><div><i style="--h:88%"></i>Thu</div><div><i style="--h:70%"></i>Fri</div><div class="is-muted"><i style="--h:30%"></i>Sat</div><div class="is-muted"><i style="--h:24%"></i>Sun</div></div></div></div>
<div class="clay-card" style="flex:1;min-width:200px"><div class="clay-card-body" style="align-items:center"><span class="clay-title" style="align-self:flex-start">Traffic</span><div class="clay-donut" style="--v:58"><span>58%</span></div><span class="clay-caption">Organic · Paid · Other</span></div></div>` },

  { id: 'kanban', name: 'Kanban board', cat: 'Data display', os: W,
    desc: 'Columns of cards for task workflows.',
    html: `<div class="clay-kanban" style="width:100%">
<div class="clay-kanban-col"><header>To do <span class="clay-badge clay-badge--neutral">2</span></header><div class="clay-kanban-card">Design token export<span class="clay-badge clay-badge--warning">Design</span></div><div class="clay-kanban-card">Write docs</div></div>
<div class="clay-kanban-col"><header>In progress <span class="clay-badge clay-badge--neutral">1</span></header><div class="clay-kanban-card">Android presets<div class="clay-progress" style="--clay-value:60%"><span></span></div></div></div>
<div class="clay-kanban-col"><header>Done <span class="clay-badge clay-badge--neutral">1</span></header><div class="clay-kanban-card">Launch site<span class="clay-badge clay-badge--success">Shipped</span></div></div></div>` },

  { id: 'gallery', name: 'Image gallery', cat: 'Data display', os: W,
    desc: 'A responsive media grid.',
    html: `<div class="clay-gallery" style="width:100%"><div></div><div></div><div></div><div></div><div></div><div></div></div>` },

  { id: 'typography', name: 'Typography & prose', cat: 'Data display', os: W,
    desc: 'Headings, body copy, quotes and code blocks for articles and docs.',
    html: `<article class="clay-prose"><h2 class="clay-h2">Design once</h2><p>Clay maps one semantic type scale onto each platform's native ramp, so <a href="#">headings</a>, body copy and captions always feel at home.</p><blockquote class="clay-blockquote">"Simplicity is the ultimate sophistication."</blockquote><pre class="clay-pre">Clay.setTheme({ font: 'Inter', fontScale: 1.05 });</pre></article>` },

  /* Layout */
  { id: 'grid', name: 'Grid', cat: 'Layout', os: W, native: { web: 'Grid / columns' },
    desc: 'A 12-column responsive grid plus an auto-fill grid and flex stacks.',
    html: `<div class="clay-cols" style="width:100%"><div class="clay-span-8 clay-card clay-card--filled clay-p-4 clay-label">span-8</div><div class="clay-span-4 clay-card clay-card--filled clay-p-4 clay-label">span-4</div><div class="clay-span-4 clay-card clay-card--filled clay-p-4 clay-label">span-4</div><div class="clay-span-4 clay-card clay-card--filled clay-p-4 clay-label">span-4</div><div class="clay-span-4 clay-card clay-card--filled clay-p-4 clay-label">span-4</div></div>` },

  { id: 'splitter', name: 'Splitter', cat: 'Layout', os: ['web', 'macos', 'windows', 'linux'], native: { macos: 'Split view', windows: 'SplitView', linux: 'Paned' },
    desc: 'Resizable panes. Drag the handle.',
    html: `<div class="clay-splitter" style="width:100%"><div class="clay-p-4"><b class="clay-label">Sidebar</b><p class="clay-caption">Drag the handle →</p></div><div class="clay-splitter-handle" role="separator" aria-orientation="vertical" tabindex="0"></div><div class="clay-p-4" style="background:var(--clay-surface)"><b class="clay-label">Content</b></div></div>` },

  { id: 'aspect-ratio', name: 'Aspect ratio & scroll area', cat: 'Layout', os: W,
    desc: 'Fixed-ratio media boxes and styled scroll containers.',
    html: `<div class="clay-ratio" style="width:240px">16 : 9</div><div class="clay-ratio" style="width:120px;--clay-ratio:1">1 : 1</div><div class="clay-scroll-area clay-card clay-card--outlined clay-p-4" style="height:120px;width:200px"><p class="clay-caption">Scrollable content. ${'Lorem ipsum dolor sit amet. '.repeat(10)}</p></div>` },

  /* Sections & patterns */
  { id: 'hero', name: 'Hero section', cat: 'Sections', os: W,
    desc: 'The first thing visitors see: headline, value proposition and calls to action.',
    html: `<section class="clay-section clay-hero-sec" style="width:100%"><span class="clay-eyebrow">✦ New · v1.0</span><h1 class="clay-display">Ship beautiful apps faster</h1><p>One design system for every platform: web, iOS, Android, macOS, Windows and Linux.</p><div class="clay-row" style="justify-content:center"><button class="clay-btn clay-btn--lg">Get started</button><button class="clay-btn clay-btn--lg clay-btn--secondary">Live demo</button></div></section>`, layout: 'flush' },

  { id: 'features', name: 'Feature grid', cat: 'Sections', os: W,
    desc: 'Highlight product capabilities.',
    html: `<div class="clay-grid" style="width:100%;--clay-grid-min:200px">
<div class="clay-feature"><span class="clay-feature-icon"><i data-clay-icon="zap"></i></span><b class="clay-title">Blazing fast</b><p class="clay-label clay-muted" style="font-weight:400">About 37kb gzipped and zero dependencies.</p></div>
<div class="clay-feature"><span class="clay-feature-icon"><i data-clay-icon="layers"></i></span><b class="clay-title">Token driven</b><p class="clay-label clay-muted" style="font-weight:400">120+ variables power every pixel.</p></div>
<div class="clay-feature"><span class="clay-feature-icon"><i data-clay-icon="accessibility"></i></span><b class="clay-title">Accessible</b><p class="clay-label clay-muted" style="font-weight:400">WCAG 2.2 AA out of the box.</p></div></div>` },

  { id: 'pricing', name: 'Pricing table', cat: 'Sections', os: W,
    desc: 'Plan comparison with a featured tier.',
    html: `<div class="clay-pricing" style="width:100%">
<div class="clay-price-card"><b class="clay-title">Starter</b><span class="clay-price">$0<small>/mo</small></span><ul class="clay-checklist"><li>1 project</li><li>Community support</li></ul><button class="clay-btn clay-btn--secondary clay-btn--block">Start free</button></div>
<div class="clay-price-card is-featured"><b class="clay-title">Pro</b><span class="clay-price">$12<small>/mo</small></span><ul class="clay-checklist"><li>Unlimited projects</li><li>Native token export</li><li>Priority support</li></ul><button class="clay-btn clay-btn--block">Upgrade</button></div>
<div class="clay-price-card"><b class="clay-title">Team</b><span class="clay-price">$49<small>/mo</small></span><ul class="clay-checklist"><li>Everything in Pro</li><li>SSO &amp; audit log</li></ul><button class="clay-btn clay-btn--secondary clay-btn--block">Contact sales</button></div></div>` },

  { id: 'testimonials', name: 'Testimonials', cat: 'Sections', os: W,
    desc: 'Social proof from customers.',
    html: `<div class="clay-grid" style="width:100%;--clay-grid-min:240px"><figure class="clay-quote-card"><p>"We shipped iOS, Android and web from one design language in a week."</p><figcaption class="clay-row" style="flex-wrap:nowrap"><span class="clay-avatar clay-avatar--sm">AL</span><span><b class="clay-label">Ada Lovelace</b><div class="clay-caption">CTO, Engine Co.</div></span></figcaption></figure><figure class="clay-quote-card"><p>"The Foundations panel sold our designers in five minutes."</p><figcaption class="clay-row" style="flex-wrap:nowrap"><span class="clay-avatar clay-avatar--sm" style="background:linear-gradient(135deg,#ff9f80,#e11d48)">GH</span><span><b class="clay-label">Grace Hopper</b><div class="clay-caption">Design lead, Compile</div></span></figcaption></figure></div>` },

  { id: 'logo-cloud', name: 'Logo cloud', cat: 'Sections', os: W,
    desc: 'Trusted-by logos.',
    html: `<div class="clay-stack" style="width:100%;align-items:center"><span class="clay-overline">Trusted by teams at</span><div class="clay-logos"><span>Northwind</span><span>Globex</span><span>Initech</span><span>Umbrella</span><span>Hooli</span></div></div>` },

  { id: 'cta', name: 'Call to action & newsletter', cat: 'Sections', os: W,
    desc: 'Conversion band with an email capture.',
    html: `<section class="clay-card clay-card--filled" style="width:100%"><div class="clay-card-body" style="align-items:center;text-align:center;padding:40px 24px;gap:14px"><h2 class="clay-h2">Stay in the loop</h2><p class="clay-muted">One email a month. No spam, ever.</p><form class="clay-row" style="justify-content:center;width:100%;max-width:420px;flex-wrap:nowrap" onsubmit="event.preventDefault()"><input class="clay-input" type="email" placeholder="you@company.com" aria-label="Email"><button class="clay-btn" data-clay-toast="Subscribed!" data-clay-toast-type="success">Subscribe</button></form></div></section>` },

  { id: 'faq', name: 'FAQ', cat: 'Sections', os: W,
    desc: 'Frequently asked questions in an accordion.',
    html: `<div class="clay-accordion-group" style="width:100%"><details class="clay-accordion" name="faq-w" open><summary>How do I install Clay?</summary><p>Add two lines from the CDN, or run npm install clay-ds.</p></details><details class="clay-accordion" name="faq-w"><summary>Can I change the brand colour?</summary><p>Yes. Set --clay-primary or call Clay.setTheme().</p></details><details class="clay-accordion" name="faq-w"><summary>Is there a Figma kit?</summary><p>Export DTCG tokens and import them into Figma Variables.</p></details></div>` },

  { id: 'auth', name: 'Sign-in form', cat: 'Sections', os: W, native: { web: 'Authentication' },
    desc: 'Email and password sign-in with social login.',
    html: `<form class="clay-auth clay-card" onsubmit="event.preventDefault()"><div class="clay-card-body" style="gap:14px"><div style="text-align:center"><span class="clay-h3">Welcome back</span><p class="clay-caption">Sign in to continue to Clay</p></div><button type="button" class="clay-btn clay-btn--secondary clay-btn--block"><i data-clay-icon="globe"></i>Continue with Google</button><div class="clay-or">or</div><div class="clay-field"><label for="au1">Email</label><input id="au1" class="clay-input" type="email" autocomplete="email"></div><div class="clay-field"><label for="au2">Password</label><div class="clay-input-group"><input id="au2" type="password" class="clay-input" autocomplete="current-password"><button class="clay-input-action" type="button" data-clay-reveal aria-label="Show password"><i data-clay-icon="lock"></i></button></div></div><div class="clay-row clay-row-between"><label class="clay-choice clay-label"><input type="checkbox" class="clay-check">Remember me</label><a href="#" class="clay-label">Forgot?</a></div><button class="clay-btn clay-btn--block">Sign in</button></div></form>`, layout: 'center' },

  { id: 'contact', name: 'Contact section', cat: 'Sections', os: W,
    desc: 'Contact details beside a short form.',
    html: `<div class="clay-cols" style="width:100%"><div class="clay-span-6 clay-stack"><h2 class="clay-h2">Let's talk</h2><p class="clay-muted">We reply within one business day.</p><span class="clay-row"><i data-clay-icon="mail"></i>hello@clay.design</span><span class="clay-row"><i data-clay-icon="pin"></i>London · Dhaka</span></div><form class="clay-span-6 clay-stack" onsubmit="event.preventDefault()"><input class="clay-input" placeholder="Name" aria-label="Name"><input class="clay-input" type="email" placeholder="Email" aria-label="Email"><textarea class="clay-textarea" placeholder="Message" aria-label="Message"></textarea><button class="clay-btn" data-clay-toast="Message sent" data-clay-toast-type="success">Send</button></form></div>` },

  { id: 'blog-cards', name: 'Blog cards', cat: 'Sections', os: W,
    desc: 'Article previews with meta.',
    html: `<div class="clay-grid" style="width:100%;--clay-grid-min:220px"><article class="clay-card clay-card--interactive"><div class="clay-card-media"></div><div class="clay-card-body"><span class="clay-overline">Engineering</span><b class="clay-title">Tokens all the way down</b><span class="clay-caption">Oct 12 · 6 min read</span></div></article><article class="clay-card clay-card--interactive"><div class="clay-card-media" style="background:linear-gradient(135deg,#0ea5e9,#10b981)"></div><div class="clay-card-body"><span class="clay-overline">Design</span><b class="clay-title">One system, six dialects</b><span class="clay-caption">Oct 3 · 4 min read</span></div></article></div>` },

  { id: 'team', name: 'Team grid', cat: 'Sections', os: W,
    desc: 'People with roles and links.',
    html: `<div class="clay-grid" style="width:100%;--clay-grid-min:150px"><div class="clay-stack" style="align-items:center;text-align:center;gap:6px"><span class="clay-avatar clay-avatar--xl">MA</span><b>Mutaher</b><span class="clay-caption">Founder</span></div><div class="clay-stack" style="align-items:center;text-align:center;gap:6px"><span class="clay-avatar clay-avatar--xl" style="background:linear-gradient(135deg,#ff9f80,#e11d48)">AL</span><b>Ada</b><span class="clay-caption">Engineering</span></div><div class="clay-stack" style="align-items:center;text-align:center;gap:6px"><span class="clay-avatar clay-avatar--xl" style="background:linear-gradient(135deg,#5ee6d0,#0284c7)">GH</span><b>Grace</b><span class="clay-caption">Design</span></div></div>` }
  );
})();
