/* Clay component pages — related components live together on one page (like Ant Design's IA).
   Every catalog id must appear in exactly one group; scripts/coverage.mjs enforces it. */
window.ClayGroups = [
  /* General */
  { id: 'button', section: 'General', name: 'Buttons', icon: 'box', desc: 'Every way to trigger an action: emphasis levels, icon buttons, groups, split buttons, toggles, dropdown buttons and copy buttons.', ids: ['web-buttons', 'ios-buttons', 'm3-buttons', 'mac-buttons', 'win-buttons', 'adw-buttons', 'icon-buttons', 'button-group', 'split-button', 'toggle-group', 'web-dropdown', 'copy-button'] },
  { id: 'floating', section: 'General', name: 'Floating actions', icon: 'plus', desc: 'Floating action buttons, FAB menus and back-to-top.', ids: ['m3-fab', 'm3-fab-menu', 'back-top'] },
  { id: 'typography', section: 'General', name: 'Typography & icons', icon: 'type', desc: 'Headings, prose, quotes, code, keyboard keys, highlights and the built-in icon set.', ids: ['typography', 'kbd', 'icons'] },
  /* Layout */
  { id: 'layout', section: 'Layout', name: 'Layout', icon: 'grid', desc: 'Grids, dividers, resizable split panes, aspect ratios and group boxes.', ids: ['grid', 'divider', 'splitter', 'aspect-ratio', 'mac-groupbox'] },
  /* Navigation */
  { id: 'app-bars', section: 'Navigation', name: 'App bars & toolbars', icon: 'menu', desc: 'Top-level bars: navbars, navigation bars, top and bottom app bars, command bars, header bars and menu bars.', ids: ['navbar', 'mega-menu', 'ios-navbar', 'ios-toolbar', 'm3-topbars', 'm3-bottom-appbar', 'm3-float-toolbar', 'win-commandbar', 'adw-headerbar', 'menubar', 'mac-status-menu'] },
  { id: 'sidebars', section: 'Navigation', name: 'Sidebars & rails', icon: 'layers', desc: 'Persistent side navigation: sidebars, source lists, NavigationView, navigation rails, drawers and split views.', ids: ['sidebar', 'mac-sidebar', 'win-navview', 'm3-rail', 'm3-drawer', 'adw-split', 'ios-split-view'] },
  { id: 'tabs', section: 'Navigation', name: 'Tabs & tab bars', icon: 'bookmark', desc: 'Switch between peer views: tabs, pill tabs, document tabs, bottom tab bars and view switchers.', ids: ['tabs', 'pill-tabs', 'tab-view', 'ios-tabbar', 'm3-navbar', 'adw-switcher-bar'] },
  { id: 'wayfinding', section: 'Navigation', name: 'Breadcrumbs & pagination', icon: 'compass', desc: 'Show where people are and move through content: breadcrumbs, path controls, pagination, page dots, load more, tables of contents and footers.', ids: ['breadcrumbs', 'mac-path', 'pagination', 'load-more', 'ios-page-control', 'anchor', 'footer'] },
  { id: 'steps', section: 'Navigation', name: 'Steps', icon: 'check-circle', desc: 'Horizontal and vertical progress through multi-step flows.', ids: ['steps', 'vertical-steps'] },
  { id: 'search', section: 'Navigation', name: 'Search & command', icon: 'search', desc: 'Search fields, platform search bars and the ⌘K command palette.', ids: ['search-field', 'ios-searchbar', 'm3-searchbar', 'command-palette'] },
  { id: 'menus', section: 'Navigation', name: 'Menus', icon: 'more', desc: 'Dropdown and context menus in every platform style.', ids: ['menu', 'context-menu'] },
  /* Data entry */
  { id: 'text-fields', section: 'Data entry', name: 'Text fields', icon: 'edit', desc: 'Single and multi-line text, floating labels, addons, passwords, strength meters and one-time codes.', ids: ['text-field', 'm3-textfields', 'floating-label', 'input-addons', 'textarea', 'password', 'password-strength', 'otp'] },
  { id: 'select', section: 'Data entry', name: 'Select & autocomplete', icon: 'chevron-down', desc: 'Choosing from options: selects, pop-up buttons, autocomplete, listboxes, tree selects, cascaders, transfer lists, tags and mentions.', ids: ['select', 'mac-popup', 'combobox', 'listbox', 'tree-select', 'cascader', 'transfer', 'tags-input', 'mentions'] },
  { id: 'selection', section: 'Data entry', name: 'Checkbox, radio & switch', icon: 'check', desc: 'Binary and single-choice controls: checkboxes, radios, switches, iOS checkmark lists, segmented controls and theme toggles.', ids: ['checkbox', 'radio', 'switch', 'ios-checklist', 'segmented', 'theme-toggle'] },
  { id: 'sliders', section: 'Data entry', name: 'Sliders, steppers & rating', icon: 'ruler', desc: 'Pick values from a range: sliders, range and discrete sliders, number inputs, steppers and star ratings.', ids: ['slider', 'range-slider', 'm3-sliders', 'mac-slider', 'number-input', 'ios-stepper', 'mac-stepper', 'rating'] },
  { id: 'date-time', section: 'Data entry', name: 'Date & time', icon: 'calendar', desc: 'Calendars, date ranges, native inputs, picker wheels, clock dials and column pickers.', ids: ['calendar', 'date-range', 'datetime-native', 'ios-picker', 'm3-time', 'win-timepicker', 'win-datepicker'] },
  { id: 'color', section: 'Data entry', name: 'Colour & emoji', icon: 'palette', desc: 'Colour pickers, colour wells and emoji choosers.', ids: ['color-picker', 'mac-color-well', 'emoji'] },
  { id: 'upload', section: 'Data entry', name: 'Upload & editor', icon: 'upload', desc: 'File drop zones and rich text editing.', ids: ['file-upload', 'editor'] },
  { id: 'forms', section: 'Data entry', name: 'Forms', icon: 'file', desc: 'Complete, validated form layouts.', ids: ['forms'] },
  /* Data display */
  { id: 'cards', section: 'Data display', name: 'Cards', icon: 'box', desc: 'Content containers: cards, Material card types, KPI stats and media players.', ids: ['card', 'm3-cards', 'stats', 'media'] },
  { id: 'lists', section: 'Data display', name: 'Lists', icon: 'menu', desc: 'List groups, inset-grouped lists, swipe actions, Material lists, ListView, sortable lists and notification feeds.', ids: ['list-group', 'ios-list', 'ios-swipe', 'm3-lists', 'win-listview', 'sortable-list', 'notification-center'] },
  { id: 'settings-rows', section: 'Data display', name: 'Accordion & settings rows', icon: 'settings', desc: 'Expandable and settings-style rows: accordions, disclosure groups, Fluent expanders and Adwaita boxed lists.', ids: ['accordion', 'ios-disclosure', 'win-expander', 'adw-rows'] },
  { id: 'tables', section: 'Data display', name: 'Tables & trees', icon: 'grid', desc: 'Data tables with sorting and selection, desktop tables, tree views and description lists.', ids: ['data-table', 'desktop-table', 'tree', 'description-list'] },
  { id: 'chips', section: 'Data display', name: 'Chips, badges & avatars', icon: 'user', desc: 'Compact labels and people: chips, tags, badges, counts and avatars.', ids: ['chips', 'm3-chips', 'badges', 'avatar'] },
  { id: 'data-viz', section: 'Data display', name: 'Charts & time', icon: 'chart', desc: 'Charts, event calendars, timelines, countdowns and kanban boards.', ids: ['charts', 'event-calendar', 'timeline', 'countdown', 'kanban'] },
  { id: 'media', section: 'Data display', name: 'Media & chat', icon: 'image', desc: 'Carousels, galleries, chat bubbles, QR codes and watermarks.', ids: ['carousel', 'gallery', 'chat', 'qr-code', 'watermark'] },
  /* Feedback */
  { id: 'alerts', section: 'Feedback', name: 'Alerts & banners', icon: 'info', desc: 'Inline and page-level messages: alerts, InfoBars, banners and cookie consent.', ids: ['alert', 'win-infobar', 'banner', 'adw-banner', 'cookie'] },
  { id: 'toasts', section: 'Feedback', name: 'Toasts & notifications', icon: 'bell', desc: 'Transient and system messages: toasts, snackbars and notifications.', ids: ['toast', 'm3-snackbar', 'notification'] },
  { id: 'progress', section: 'Feedback', name: 'Progress & loading', icon: 'refresh', desc: 'Progress bars, spinners, expressive loaders, skeletons, level bars and gauges.', ids: ['progress', 'spinner', 'm3-loading', 'skeleton', 'adw-levelbar', 'ios-gauge'] },
  { id: 'results', section: 'Feedback', name: 'Empty & result states', icon: 'folder', desc: 'Empty states, status pages and success, error or 404 results.', ids: ['empty', 'adw-status', 'result'] },
  { id: 'tips', section: 'Feedback', name: 'Tooltips, popovers & tours', icon: 'message', desc: 'Anchored help: tooltips, rich tooltips, popovers, popconfirms, teaching tips and product tours.', ids: ['tooltip', 'm3-tooltips', 'popover', 'popconfirm', 'win-teaching', 'tour'] },
  /* Overlays */
  { id: 'dialogs', section: 'Overlays', name: 'Dialogs', icon: 'box', desc: 'Modal dialogs in every platform style, plus form modals, full-screen dialogs, image previews, shortcut sheets, about dialogs and preferences.', ids: ['dialog', 'modal-form', 'm3-fullscreen', 'lightbox', 'shortcuts', 'adw-about', 'adw-preferences'] },
  { id: 'sheets', section: 'Overlays', name: 'Sheets & drawers', icon: 'layers', desc: 'Edge-anchored surfaces: bottom sheets, iOS sheets and action sheets, macOS sheets, drawers and side sheets.', ids: ['sheet', 'ios-sheet-large', 'ios-actionsheet', 'mac-sheet', 'drawer', 'm3-sidesheet'] },
  /* Page sections (web) */
  { id: 'sections-hero', section: 'Page sections', name: 'Hero & features', icon: 'sparkles', desc: 'Above-the-fold sections: hero, feature grid, logo cloud and call to action.', ids: ['hero', 'features', 'logo-cloud', 'cta'] },
  { id: 'sections-proof', section: 'Page sections', name: 'Pricing & social proof', icon: 'star', desc: 'Pricing tables, testimonials, FAQs, blog cards and team grids.', ids: ['pricing', 'testimonials', 'faq', 'blog-cards', 'team'] },
  { id: 'sections-forms', section: 'Page sections', name: 'Sign-in & contact', icon: 'mail', desc: 'Authentication and contact sections.', ids: ['auth', 'contact'] },
  /* Platform */
  { id: 'platform', section: 'Platform', name: 'Windows, devices & system UI', icon: 'monitor', desc: 'Platform chrome: app windows, Mica and Acrylic, the Dock, widgets, Live Activities and device frames.', ids: ['mac-window', 'mac-dock', 'win-window', 'win-surfaces', 'ios-widgets', 'ios-live-activity', 'ios-device', 'm3-device'] }
];
