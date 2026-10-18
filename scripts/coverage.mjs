// Component coverage test: checks the Clay catalog against each platform's official component inventory.
// References: Ant Design + MUI + Tailwind UI + shadcn/Radix (web), Apple HIG (iOS, macOS), Material 3 (Android),
// Fluent 2 / WinUI Gallery (Windows), GNOME HIG + libadwaita (Linux).
// Run: node scripts/coverage.mjs   (exit code 1 when anything is missing)
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = fileURLToPath(new URL('..', import.meta.url));
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['shared.js', 'web.js', 'ios.js', 'android.js', 'desktop.js', ...readdirSync(root + 'assets/js/catalog').filter((f) => !/^(shared|web|ios|android|desktop)\.js$/.test(f)).sort((a, b) => (a === 'groups.js') - (b === 'groups.js'))]) {
  vm.runInContext(readFileSync(root + 'assets/js/catalog/' + f, 'utf8'), ctx, { filename: f });
}
const catalog = ctx.window.ClayCatalog;
const groups = ctx.window.ClayGroups || [];

// Each requirement: label → regex tested against "id name native-name" of components available on that OS.
const REF = {
  web: {
    Button: /button/, 'Icon button': /icon-buttons/, 'Button group': /button-group/, 'Split button': /split/, 'Toggle group': /toggle/, Dropdown: /dropdown/, 'Float / back to top': /back-top/,
    Typography: /typography/, Divider: /divider/, Grid: /\bgrid\b/, Splitter: /splitter/, 'Aspect ratio / scroll area': /aspect/,
    Navbar: /navbar/, 'Mega menu': /mega/, Sidebar: /sidebar/, Breadcrumb: /breadcrumb/, Pagination: /pagination/, Steps: /steps/, Tabs: /\btabs\b/, Anchor: /anchor/, 'Command palette': /command/, Footer: /footer/,
    Input: /text-field/, Textarea: /textarea/, Password: /password/, Search: /search/, Select: /\bselect\b/, Autocomplete: /combobox|autocomplete/, 'Tree select': /tree-select/, Cascader: /cascader/, 'Input number': /number/, 'Tags input': /tags/,
    Mentions: /mention/, OTP: /otp/, Checkbox: /checkbox/, Radio: /radio/, Switch: /switch/, Slider: /slider/, 'Range slider': /range-slider/, Rate: /rating/, 'Color picker': /color-picker/, 'Date picker': /calendar|date/, 'Date range': /date-range/,
    'Time picker': /datetime|time/, Transfer: /transfer/, Upload: /upload/, Form: /forms/, 'Input addons': /addons/, 'Floating label': /floating/,
    Avatar: /avatar/, Badge: /badges/, Card: /\bcard\b/, Carousel: /carousel/, Accordion: /accordion/, Descriptions: /description/, Empty: /empty/, 'Image gallery': /gallery/, 'Image preview / lightbox': /lightbox/, List: /list-group/,
    Popover: /popover/, 'QR code': /qr/, Statistic: /stats/, Table: /data-table/, Tag: /chips/, Timeline: /timeline/, Tooltip: /tooltip/, Tour: /tour/, Tree: /\btree\b/, Kbd: /kbd/, Chart: /charts/, Kanban: /kanban/, Chat: /chat/,
    Alert: /alert/, Banner: /banner/, Drawer: /drawer/, Toast: /toast/, Modal: /dialog/, Notification: /notification/, Popconfirm: /popconfirm/, Progress: /progress/, Result: /result/, Skeleton: /skeleton/, Spin: /spinner/, Watermark: /watermark/,
    'Context menu': /context-menu/, Menu: /\bmenu\b/, 'Cookie consent': /cookie/, 'Rich text editor': /editor/, 'Media player': /media/, 'Keyboard shortcuts': /shortcuts/, 'Emoji picker': /emoji/, 'Event calendar': /event-calendar/, Countdown: /countdown/, 'Copy button': /copy/, 'Theme toggle': /theme-toggle/, 'Sortable list': /sortable/, 'Password strength': /password-strength|levelbar/, 'Vertical steps': /vertical-steps/, 'Load more': /load-more/,
    Hero: /hero/, Features: /features/, Pricing: /pricing/, Testimonials: /testimonial/, 'Logo cloud': /logo/, 'CTA / newsletter': /\bcta\b/, FAQ: /faq/, 'Sign in': /auth/, Contact: /contact/, Blog: /blog/, Team: /team/,
  },
  ios: {
    Buttons: /ios-buttons/, 'Pull-down button': /pull-down/, Toggle: /switch/, 'Segmented control': /segmented/, Slider: /slider/, Stepper: /stepper/, Picker: /picker/, 'Date picker': /calendar/, 'Text field': /text-field/, 'Secure field': /password/,
    'Text editor': /textarea/, 'Search field': /searchbar/, Lists: /ios-list/, 'Swipe actions': /swipe/, 'Selection list': /checklist/, 'Navigation bar': /ios-navbar/, 'Tab bar': /tabbar/, Toolbar: /toolbar/, 'Sidebar / split view (iPad)': /split-view/,
    'Page control': /page-control/, 'Progress view': /progress/, 'Activity indicator': /spinner/, Gauge: /gauge/, Alert: /dialog/, 'Action sheet': /actionsheet/, Sheet: /sheet/, Popover: /popover/, 'Context menu': /\bmenu\b/,
    'Disclosure group': /disclosure/, 'Colour picker': /color/, Collection: /gallery|collection/, Charts: /charts/, Widgets: /widgets/, 'Live Activity': /live-activity/, Notifications: /notification/, 'Content unavailable': /empty/,
    Badges: /badges/, Avatar: /avatar/, Card: /card/, 'Verification code': /otp/, Chat: /chat/, 'Media player': /media/, 'Device frame': /device/,
  },
  android: {
    'Common buttons': /m3-buttons/, 'Icon buttons': /icon-buttons/, 'Segmented buttons': /segmented/, FAB: /fab/, 'FAB menu': /fab-menu/, 'Button groups': /button-group/, 'Split button': /split/, Cards: /cards/, Carousel: /carousel/,
    Checkbox: /checkbox/, Chips: /chips/, 'Date pickers': /calendar/, 'Time pickers': /m3-time/, Dialogs: /dialog/, 'Full-screen dialog': /fullscreen/, Divider: /divider/, Lists: /lists/, Menus: /\bmenu\b/,
    'Navigation bar': /m3-navbar/, 'Navigation drawer': /drawer/, 'Navigation rail': /rail/, 'Progress indicators': /progress/, 'Loading indicator': /loading/, Radio: /radio/, Search: /searchbar/, 'Bottom sheets': /sheet/, 'Side sheets': /sidesheet/,
    Sliders: /slider/, Snackbar: /toast|snackbar/, Switch: /switch/, Tabs: /\btabs\b/, 'Text fields': /textfields/, Tooltips: /tooltip/, 'Top app bar': /topbars/, 'Bottom app bar': /bottom-appbar/, Toolbars: /float-toolbar/,
    Badges: /badges/, Avatar: /avatar/, Skeleton: /skeleton/, 'Media player': /media/, 'Device frame': /device/, 'Date range picker': /date-range/, 'Vertical stepper': /vertical-steps/, 'Drag to reorder': /sortable/,
  },
  macos: {
    Window: /mac-window/, Toolbar: /mac-window/, Sidebar: /mac-sidebar/, 'Menu bar': /menubar/, 'Context menu': /context-menu|\bmenu\b/, 'Push buttons': /mac-buttons/, 'Pop-up button': /popup/, 'Pull-down button': /pull-down|dropdown/,
    Checkbox: /checkbox/, Radio: /radio/, Switch: /switch/, 'Segmented control': /segmented/, Slider: /slider/, Stepper: /stepper/, 'Text field': /text-field/, 'Search field': /search/, 'Combo box': /combobox/, 'Token field': /tags/,
    'Date picker': /calendar/, 'Colour well': /color-well/, 'Path control': /path/, 'Disclosure': /accordion/, 'Progress indicator': /progress/, 'Level indicator': /levelbar/, 'Tab view': /\btabs\b/, 'Table view': /table/,
    'Outline view': /tree/, 'Column view': /cascader/, 'Split view': /splitter/, Popover: /popover/, Sheet: /mac-sheet/, Alert: /dialog/, 'Box / inspector': /groupbox/, 'Help button': /mac-buttons/, Notifications: /notification/,
    'Spotlight / command': /command/, Dock: /dock/, 'Menu bar extra': /status-menu/, 'Reorderable rows': /sortable/, 'Keyboard shortcuts': /shortcuts/, 'Character viewer': /emoji/, 'Rich text': /editor/, Charts: /charts/,
  },
  windows: {
    'Title bar / window': /win-window/, Button: /win-buttons/, DropDownButton: /dropdown/, HyperlinkButton: /win-buttons/, SplitButton: /split/, ToggleButton: /toggle/, CheckBox: /checkbox/, ComboBox: /\bselect\b/, RadioButtons: /radio/,
    RatingControl: /rating/, Slider: /slider/, ToggleSwitch: /switch/, AutoSuggestBox: /combobox/, NumberBox: /number/, PasswordBox: /password/, TextBox: /text-field/, RichEditBox: /editor/, CalendarView: /calendar/,
    DatePicker: /win-datepicker/, TimePicker: /timepicker/, ColorPicker: /color-picker/, ContentDialog: /dialog/, Flyout: /popover/, MenuFlyout: /\bmenu\b/, MenuBar: /menubar/, CommandBar: /commandbar/, TeachingTip: /teaching/,
    InfoBar: /infobar/, InfoBadge: /badges/, ProgressBar: /progress/, ProgressRing: /spinner/, ToolTip: /tooltip/, Expander: /expander/, SettingsCard: /expander/, ListView: /listview/, GridView: /gallery/, TreeView: /tree/,
    FlipView: /carousel/, PipsPager: /page-control|pagination/, BreadcrumbBar: /breadcrumb/, NavigationView: /navview/, 'SelectorBar / Pivot': /\btabs\b/, TabView: /tab-view/, PersonPicture: /avatar/, 'Mica / Acrylic': /surfaces/,
    SplitView: /splitter/, DataGrid: /table/, 'Toast notification': /notification/, 'Media player': /media/, 'Keyboard shortcuts': /shortcuts/, 'Emoji panel': /emoji/, Charts: /charts/,
  },
  linux: {
    'Header bar': /headerbar/, 'View switcher': /headerbar/, 'View switcher bar': /switcher-bar/, Buttons: /adw-buttons/, 'Split button': /split/, 'Toggle group': /toggle/, 'Boxed list rows': /adw-rows/, 'Status page': /adw-status|empty/,
    Banner: /adw-banner/, Toast: /toast/, 'Alert dialog': /dialog/, 'About dialog': /about/, 'Bottom sheet': /sheet/, 'Navigation split view': /adw-split/, 'Tab bar': /tab-view/, 'Popover menu': /\bmenu\b/, Popover: /popover/,
    Spinner: /spinner/, 'Progress bar': /progress/, 'Level bar': /levelbar/, Avatar: /avatar/, 'Search entry': /search/, Check: /checkbox/, Radio: /radio/, Switch: /switch/, Scale: /slider/, 'Spin button': /number/,
    Entry: /text-field/, 'Text view': /textarea/, 'Drop-down': /\bselect\b/, Calendar: /calendar/, Carousel: /carousel/, 'Carousel indicator': /page-control/, 'Shortcuts dialog': /shortcuts/, 'Emoji chooser': /emoji/,
    'Menu bar': /menubar/, 'Tree list': /tree/, 'Preferences dialog': /preferences/, 'Column view': /table/, Paned: /splitter/, 'File chooser': /upload/, Charts: /charts/,
  },
};

let missingTotal = 0, reqTotal = 0;
for (const [os, reqs] of Object.entries(REF)) {
  const items = catalog.filter((c) => c.os.includes(os));
  const hay = items.map((c) => `${c.id} ${c.name} ${(c.native && c.native[os]) || ''}`.toLowerCase());
  const missing = Object.entries(reqs).filter(([, re]) => !hay.some((h) => re.test(h))).map(([k]) => k);
  reqTotal += Object.keys(reqs).length; missingTotal += missing.length;
  const pct = Math.round((1 - missing.length / Object.keys(reqs).length) * 100);
  console.log(`${os.padEnd(8)} ${String(items.length).padStart(3)} components · ${String(Object.keys(reqs).length).padStart(3)} required · ${pct}% covered${missing.length ? '\n         missing: ' + missing.join(', ') : ''}`);
}
const ids = catalog.map((c) => c.id), dup = ids.filter((id, i) => ids.indexOf(id) !== i);
// Every component must live on exactly one page (group), and every grouped id must exist
const grouped = groups.flatMap((g) => g.ids);
const orphans = ids.filter((id) => !grouped.includes(id));
const twice = grouped.filter((id, i) => grouped.indexOf(id) !== i);
const ghosts = grouped.filter((id) => !ids.includes(id));
console.log(`groups   ${groups.length} pages · ${grouped.length} placed${orphans.length ? ' · ungrouped: ' + orphans.join(', ') : ''}${twice.length ? ' · in two groups: ' + twice.join(', ') : ''}${ghosts.length ? ' · unknown ids: ' + ghosts.join(', ') : ''}`);
missingTotal += orphans.length + twice.length + ghosts.length;
if (dup.length) { console.log('duplicate ids: ' + dup.join(', ')); missingTotal++; }
console.log(`\n${catalog.length} catalog entries · ${reqTotal - missingTotal}/${reqTotal} requirements met`);
process.exit(missingTotal ? 1 : 0);
