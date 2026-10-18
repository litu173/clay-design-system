/*!
 * Clay Design System v1.0.0 — runtime: theming API, platform presets, token export & component behaviours.
 * https://github.com/litu173/clay-design-system · MIT
 *
 *   Clay.init({ os: 'auto', mode: 'auto', primary: '#6d5efc', radius: 12, font: 'Inter' })
 *   Clay.setTheme({ primary: '#e11d48', radius: 20 })
 *   Clay.toast({ title: 'Saved', type: 'success' })
 *   Clay.export('swiftui')
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Clay = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var doc = typeof document !== 'undefined' ? document : null;
  var VERSION = '1.0.0';

  /* ------------------------------------------------------------------ */
  /* Platform presets — the token values each OS starts from              */
  /* ------------------------------------------------------------------ */
  var OS = {
    web:     { label: 'Web',     family: 'Clay',            primary: '#6d5efc', radius: 12, font: 'Inter',       controlH: 40, base: 16 },
    ios:     { label: 'iOS',     family: 'Human Interface', primary: '#007aff', radius: 12, font: 'SF Pro',      controlH: 44, base: 17 },
    android: { label: 'Android', family: 'Material 3',      primary: '#6750a4', radius: 12, font: 'Roboto',      controlH: 40, base: 16 },
    macos:   { label: 'macOS',   family: 'Human Interface', primary: '#007aff', radius: 6,  font: 'SF Pro',      controlH: 28, base: 13 },
    windows: { label: 'Windows', family: 'Fluent 2',        primary: '#0f6cbd', radius: 4,  font: 'Segoe UI',    controlH: 32, base: 14 },
    linux:   { label: 'Linux',   family: 'GNOME Adwaita',   primary: '#3584e4', radius: 6,  font: 'Cantarell',   controlH: 34, base: 15 }
  };

  /* Brand themes — colour/shape/type personalities that sit on top of any OS */
  var THEMES = {
    clay:     { primary: '#6d5efc', secondary: '#ff8a6b', radius: 12, font: 'Inter' },
    indigo:   { primary: '#4f46e5', secondary: '#06b6d4', radius: 10, font: 'Plus Jakarta Sans' },
    ocean:    { primary: '#0284c7', secondary: '#14b8a6', radius: 14, font: 'DM Sans' },
    emerald:  { primary: '#059669', secondary: '#84cc16', radius: 8,  font: 'Manrope' },
    sunset:   { primary: '#ea580c', secondary: '#db2777', radius: 16, font: 'Outfit' },
    rose:     { primary: '#e11d48', secondary: '#f59e0b', radius: 20, font: 'Sora' },
    gold:     { primary: '#a16207', secondary: '#78350f', radius: 4,  font: 'Fraunces' },
    graphite: { primary: '#18181b', secondary: '#71717a', radius: 6,  font: 'Geist' },
    neon:     { primary: '#c026d3', secondary: '#22d3ee', radius: 24, font: 'Space Grotesk' }
  };

  var SYSTEM_FONTS = {
    'SF Pro': '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif',
    'Segoe UI': '"Segoe UI Variable Text", "Segoe UI", "Selawik", system-ui, sans-serif',
    'Cantarell': '"Cantarell", "Adwaita Sans", "Inter", "Ubuntu", system-ui, sans-serif',
    'System': 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
  };
  var GOOGLE_FONTS = ['Inter', 'Roboto', 'Manrope', 'DM Sans', 'Plus Jakarta Sans', 'Outfit', 'Sora', 'Space Grotesk', 'IBM Plex Sans', 'Nunito', 'Poppins', 'Geist', 'Figtree', 'Lexend', 'Work Sans', 'Rubik', 'Fraunces', 'Playfair Display', 'Instrument Serif', 'JetBrains Mono'];
  var SERIFS = { 'Fraunces': 1, 'Playfair Display': 1, 'Instrument Serif': 1 };

  var DEFAULTS = { os: 'web', mode: 'light', primary: null, secondary: null, radius: null, font: null, fontScale: 1, density: 1, space: 4, shadow: 1, motion: true };
  var state = Object.assign({}, DEFAULTS);
  var target = doc ? doc.documentElement : null;
  var listeners = [];

  /* ------------------------------------------------------------------ */
  /* Colour helpers                                                       */
  /* ------------------------------------------------------------------ */
  function hexToRgb(hex) {
    var h = String(hex).replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h.slice(0, 6), 16);
    if (isNaN(n)) return null;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function luminance(rgb) {
    var a = [rgb.r, rgb.g, rgb.b].map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  /** Best text colour (#fff / #000) for a background */
  function contrast(hex) {
    var rgb = hexToRgb(hex); if (!rgb) return '#ffffff';
    var L = luminance(rgb);
    return (1.05 / (L + 0.05)) >= ((L + 0.05) / 0.05) * 0.78 ? '#ffffff' : '#0b0b12';
  }
  function ratio(a, b) {
    var la = luminance(hexToRgb(a)), lb = luminance(hexToRgb(b));
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  var probeCanvas;
  /** Resolve any CSS colour (incl. color-mix, oklab, rgb()) to #rrggbb or #rrggbbaa */
  function toHex(value, ctxEl) {
    if (!doc || !value) return value;
    value = String(value).trim();
    if (/^#[0-9a-f]{3,8}$/i.test(value)) return value.length === 4 ? '#' + value.slice(1).split('').map(function (c) { return c + c; }).join('') : value.toLowerCase();
    var el = doc.createElement('i');
    el.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden;color:' + value;
    (ctxEl || doc.body || doc.documentElement).appendChild(el);
    var c = getComputedStyle(el).color; el.remove();
    var m = c.match(/^rgba?\(([^)]+)\)/);
    if (!m) {
      probeCanvas = probeCanvas || doc.createElement('canvas');
      probeCanvas.width = probeCanvas.height = 1;
      var ctx = probeCanvas.getContext('2d', { willReadFrequently: true });
      ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1);
      var d = ctx.getImageData(0, 0, 1, 1).data;
      m = [0, d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3] / 255)];
    }
    var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
    var hex = '#' + [p[0], p[1], p[2]].map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join('');
    if (p.length > 3 && p[3] < 1) hex += ('0' + Math.round(p[3] * 255).toString(16)).slice(-2);
    return hex;
  }

  function fontStack(name) {
    if (!name) return null;
    if (SYSTEM_FONTS[name]) return SYSTEM_FONTS[name];
    return '"' + name + '", ' + (SERIFS[name] ? 'ui-serif, Georgia, serif' : 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif');
  }
  var loadedFonts = {};
  /** Load a Google Font on demand (no-op for system fonts) */
  function loadFont(name) {
    if (!doc || !name || loadedFonts[name] || GOOGLE_FONTS.indexOf(name) < 0) return;
    loadedFonts[name] = 1;
    var l = doc.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(name).replace(/%20/g, '+') + ':wght@300;400;500;600;700;800&display=swap';
    doc.head.appendChild(l);
  }

  /* ------------------------------------------------------------------ */
  /* Theming                                                              */
  /* ------------------------------------------------------------------ */
  function detectOS() {
    if (typeof navigator === 'undefined') return 'web';
    var ua = navigator.userAgent || '', p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    if (/android/i.test(ua)) return 'android';
    if (/iPhone|iPad|iPod/.test(ua) || (p === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
    if (/Mac/i.test(p)) return 'macos';
    if (/Win/i.test(p)) return 'windows';
    if (/Linux|X11|CrOS/i.test(p + ua)) return 'linux';
    return 'web';
  }
  function resolveMode(mode) {
    if (mode !== 'auto') return mode;
    return (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function apply(el) {
    el = el || target; if (!el) return;
    var s = el.style;
    el.setAttribute('data-clay-os', state.os);
    el.setAttribute('data-clay-mode', resolveMode(state.mode));
    el.setAttribute('data-clay-motion', state.motion ? 'on' : 'off');
    function set(k, v) { if (v === null || v === undefined || v === '') s.removeProperty(k); else s.setProperty(k, v); }
    set('--clay-primary', state.primary);
    set('--clay-on-primary', state.primary ? contrast(state.primary) : null);
    set('--clay-secondary', state.secondary);
    if (state.radius === null) { ['--clay-radius', '--clay-btn-radius', '--clay-input-radius', '--clay-card-radius', '--clay-list-radius', '--clay-dialog-radius', '--clay-radius-sm', '--clay-radius-lg', '--clay-radius-xl', '--clay-check-radius'].forEach(function (k) { s.removeProperty(k); }); }
    else {
      var r = +state.radius;
      set('--clay-radius', r + 'px');
      set('--clay-radius-sm', Math.round(r * 0.6) + 'px');
      set('--clay-radius-lg', Math.round(r * 1.4) + 'px');
      set('--clay-radius-xl', Math.round(Math.max(r * 2, 8)) + 'px');
      set('--clay-btn-radius', state.os === 'android' && r >= 8 ? '999px' : r + 'px');
      set('--clay-input-radius', Math.round(r * 0.75) + 'px');
      set('--clay-card-radius', Math.round(r * 1.4) + 'px');
      set('--clay-list-radius', Math.round(r * 1.2) + 'px');
      set('--clay-dialog-radius', Math.round(Math.max(r * 2, 8)) + 'px');
      if (state.os !== 'ios') set('--clay-check-radius', Math.max(2, Math.round(r * 0.35)) + 'px');
    }
    if (state.font) { loadFont(state.font); set('--clay-font', fontStack(state.font)); set('--clay-font-display', fontStack(state.font)); }
    else { s.removeProperty('--clay-font'); s.removeProperty('--clay-font-display'); }
    set('--clay-font-scale', state.fontScale !== 1 ? String(state.fontScale) : null);
    set('--clay-density', state.density !== 1 ? String(state.density) : null);
    set('--clay-space', state.space !== 4 ? state.space + 'px' : null);
    set('--clay-shadow-strength', state.shadow !== 1 ? String(state.shadow) : null);
    listeners.forEach(function (fn) { try { fn(getTheme()); } catch (e) {} });
  }

  function getTheme() { return Object.assign({}, state); }

  /** Merge options into the theme and apply them. Pass null for a key to fall back to the OS preset. */
  function setTheme(opts, el) {
    opts = opts || {};
    if (opts.theme && THEMES[opts.theme]) opts = Object.assign({}, THEMES[opts.theme], opts);
    Object.keys(opts).forEach(function (k) { if (k in DEFAULTS) state[k] = opts[k]; });
    if (el) target = el;
    apply();
    return getTheme();
  }
  /** Switch platform. By default resets colour/shape/type overrides so the OS preset shows through. */
  function setOS(os, keepOverrides) {
    if (os === 'auto') os = detectOS();
    if (!OS[os]) os = 'web';
    var patch = { os: os };
    if (!keepOverrides) { patch.primary = null; patch.radius = null; patch.font = null; patch.secondary = null; }
    return setTheme(patch);
  }
  function setMode(mode) { return setTheme({ mode: mode }); }
  function reset() { state = Object.assign({}, DEFAULTS, { os: state.os, mode: state.mode }); apply(); return getTheme(); }
  function onChange(fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; }

  /* ------------------------------------------------------------------ */
  /* Token resolution & export                                            */
  /* ------------------------------------------------------------------ */
  var COLOR_KEYS = ['primary', 'on-primary', 'secondary', 'success', 'warning', 'danger', 'info', 'bg', 'surface', 'surface-2', 'surface-3', 'elevated', 'border', 'border-strong', 'text', 'text-2', 'text-3',
    'primary-50', 'primary-100', 'primary-200', 'primary-300', 'primary-400', 'primary-500', 'primary-600', 'primary-700', 'primary-800', 'primary-900'];
  function camel(k) { return k.replace(/-([a-z0-9])/g, function (_, c) { return c.toUpperCase(); }); }
  function px(v) { return parseFloat(v) || 0; }

  /** Resolved design tokens for an element (defaults to the themed root) */
  function tokens(el) {
    el = el || target;
    var cs = getComputedStyle(el), g = function (k) { return cs.getPropertyValue('--clay-' + k).trim(); };
    var scale = parseFloat(g('font-scale')) || 1, unit = px(g('space')) * (parseFloat(g('density')) || 1);
    var color = {};
    COLOR_KEYS.forEach(function (k) { color[camel(k)] = toHex(g(k), el); });
    var fontRaw = g('font');
    return {
      meta: { name: 'Clay', version: VERSION, os: el.getAttribute('data-clay-os') || 'web', mode: el.getAttribute('data-clay-mode') || 'light' },
      color: color,
      radius: { xs: px(g('radius-xs')) || Math.round(px(g('radius')) * 0.35), sm: px(g('radius-sm')), md: px(g('radius')), lg: px(g('radius-lg')), xl: px(g('radius-xl')), button: px(g('btn-radius')), card: px(g('card-radius')), full: 999 },
      font: { family: fontRaw, primary: (fontRaw.split(',')[0] || '').replace(/["']/g, '').trim(), mono: g('font-mono'),
        size: { display: Math.round(px(g('fs-display')) * scale), h1: Math.round(px(g('fs-h1')) * scale), h2: Math.round(px(g('fs-h2')) * scale), h3: Math.round(px(g('fs-h3')) * scale), title: Math.round(px(g('fs-title')) * scale), body: Math.round(px(g('fs-body')) * scale), label: Math.round(px(g('fs-label')) * scale), caption: Math.round(px(g('fs-caption')) * scale) },
        weight: { regular: +g('fw-regular') || 400, medium: +g('fw-medium') || 500, strong: +g('fw-strong') || 600, heading: +g('fw-heading') || 700 } },
      space: { unit: unit, 1: unit, 2: unit * 2, 3: unit * 3, 4: unit * 4, 5: unit * 5, 6: unit * 6, 8: unit * 8, 10: unit * 10, 12: unit * 12, 16: unit * 16 },
      size: { control: Math.round(px(g('control-h-base')) * (parseFloat(g('density')) || 1)) },
      motion: { duration: g('dur'), durationSlow: g('dur-slow'), easing: g('ease') }
    };
  }

  function exportTokens(format, el) {
    var t = tokens(el), c = t.color, out = [];
    var nm = function (k) { return k.replace(/([A-Z0-9]+)/g, '-$1').toLowerCase(); };
    switch (format) {
      case 'css': {
        out.push(':root {');
        Object.keys(c).forEach(function (k) { out.push('  --clay-' + nm(k) + ': ' + c[k] + ';'); });
        ['sm', 'md', 'lg', 'xl'].forEach(function (k) { out.push('  --clay-radius' + (k === 'md' ? '' : '-' + k) + ': ' + t.radius[k] + 'px;'); });
        out.push('  --clay-font: ' + t.font.family + ';');
        out.push('  --clay-space: ' + t.space.unit + 'px;');
        out.push('  --clay-control-h-base: ' + t.size.control + 'px;');
        out.push('}');
        return out.join('\n');
      }
      case 'scss': {
        Object.keys(c).forEach(function (k) { out.push('$clay-' + nm(k) + ': ' + c[k] + ';'); });
        ['sm', 'md', 'lg', 'xl'].forEach(function (k) { out.push('$clay-radius-' + k + ': ' + t.radius[k] + 'px;'); });
        out.push('$clay-font: ' + t.font.family + ';');
        return out.join('\n');
      }
      case 'json': return JSON.stringify(t, null, 2);
      case 'figma': case 'dtcg': {
        var w3c = { clay: { color: {}, radius: {}, fontSize: {}, spacing: {} } };
        Object.keys(c).forEach(function (k) { w3c.clay.color[k] = { $type: 'color', $value: c[k] }; });
        Object.keys(t.radius).forEach(function (k) { w3c.clay.radius[k] = { $type: 'dimension', $value: t.radius[k] + 'px' }; });
        Object.keys(t.font.size).forEach(function (k) { w3c.clay.fontSize[k] = { $type: 'dimension', $value: t.font.size[k] + 'px' }; });
        [1, 2, 3, 4, 6, 8, 12].forEach(function (k) { w3c.clay.spacing[k] = { $type: 'dimension', $value: t.space[k] + 'px' }; });
        w3c.clay.fontFamily = { $type: 'fontFamily', $value: t.font.primary };
        return JSON.stringify(w3c, null, 2);
      }
      case 'tailwind': {
        return [
          '// tailwind.config.js — Clay preset (colours stay live via CSS variables)',
          'module.exports = {',
          '  theme: {',
          '    extend: {',
          '      colors: {',
          '        primary: { DEFAULT: "var(--clay-primary)", foreground: "var(--clay-on-primary)", ' + [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(function (n) { return n + ': "var(--clay-primary-' + n + ')"'; }).join(', ') + ' },',
          '        secondary: "var(--clay-secondary)", success: "var(--clay-success)", warning: "var(--clay-warning)", danger: "var(--clay-danger)", info: "var(--clay-info)",',
          '        background: "var(--clay-bg)", surface: { DEFAULT: "var(--clay-surface)", 2: "var(--clay-surface-2)", 3: "var(--clay-surface-3)" },',
          '        border: "var(--clay-border)", foreground: { DEFAULT: "var(--clay-text)", muted: "var(--clay-text-2)", subtle: "var(--clay-text-3)" },',
          '      },',
          '      borderRadius: { sm: "var(--clay-radius-sm)", DEFAULT: "var(--clay-radius)", lg: "var(--clay-radius-lg)", xl: "var(--clay-radius-xl)" },',
          '      fontFamily: { sans: ["var(--clay-font)"], mono: ["var(--clay-font-mono)"] },',
          '      boxShadow: { 1: "var(--clay-shadow-1)", 2: "var(--clay-shadow-2)", 3: "var(--clay-shadow-3)", 4: "var(--clay-shadow-4)" },',
          '      transitionTimingFunction: { clay: "var(--clay-ease)" },',
          '    },',
          '  },',
          '};'
        ].join('\n');
      }
      case 'swiftui': {
        var sw = function (hex) { var r = hexToRgb(hex) || { r: 0, g: 0, b: 0 }; var a = hex.length > 7 ? (parseInt(hex.slice(7, 9), 16) / 255).toFixed(2) : '1'; return 'Color(red: ' + (r.r / 255).toFixed(3) + ', green: ' + (r.g / 255).toFixed(3) + ', blue: ' + (r.b / 255).toFixed(3) + ', opacity: ' + a + ')'; };
        out.push('// ClayTheme.swift — generated by Clay ' + VERSION + ' (' + t.meta.os + ', ' + t.meta.mode + ')', 'import SwiftUI', '', 'enum Clay {', '    enum Colors {');
        Object.keys(c).forEach(function (k) { out.push('        static let ' + k + ' = ' + sw(c[k])); });
        out.push('    }', '    enum Radius {');
        ['sm', 'md', 'lg', 'xl'].forEach(function (k) { out.push('        static let ' + k + ': CGFloat = ' + t.radius[k]); });
        out.push('    }', '    enum Spacing {');
        [1, 2, 3, 4, 6, 8].forEach(function (k) { out.push('        static let s' + k + ': CGFloat = ' + t.space[k]); });
        out.push('    }', '    enum Typography {');
        Object.keys(t.font.size).forEach(function (k) { out.push('        static let ' + k + ' = Font.custom("' + t.font.primary + '", size: ' + t.font.size[k] + ')'); });
        out.push('    }', '}', '', '// Usage: Text("Hello").font(Clay.Typography.body).foregroundStyle(Clay.Colors.text)');
        return out.join('\n');
      }
      case 'compose': {
        var kc = function (hex) { var h = hex.replace('#', ''); var a = h.length > 6 ? h.slice(6, 8) : 'FF'; return 'Color(0x' + (a + h.slice(0, 6)).toUpperCase() + ')'; };
        out.push('// ClayTheme.kt — generated by Clay ' + VERSION, 'package design.clay', '', 'import androidx.compose.material3.*', 'import androidx.compose.ui.graphics.Color', 'import androidx.compose.ui.unit.dp', 'import androidx.compose.foundation.shape.RoundedCornerShape', '', 'object ClayColors {');
        Object.keys(c).forEach(function (k) { out.push('    val ' + k.charAt(0).toUpperCase() + k.slice(1) + ' = ' + kc(c[k])); });
        out.push('}', '', 'val ClayColorScheme = ' + (t.meta.mode === 'dark' ? 'darkColorScheme' : 'lightColorScheme') + '(',
          '    primary = ClayColors.Primary, onPrimary = ClayColors.OnPrimary,', '    secondary = ClayColors.Secondary, error = ClayColors.Danger,',
          '    background = ClayColors.Bg, surface = ClayColors.Surface, surfaceVariant = ClayColors.Surface2,',
          '    onBackground = ClayColors.Text, onSurface = ClayColors.Text, onSurfaceVariant = ClayColors.Text2, outline = ClayColors.BorderStrong', ')', '',
          'val ClayShapes = Shapes(', '    small = RoundedCornerShape(' + t.radius.sm + '.dp),', '    medium = RoundedCornerShape(' + t.radius.md + '.dp),', '    large = RoundedCornerShape(' + t.radius.lg + '.dp),', '    extraLarge = RoundedCornerShape(' + t.radius.xl + '.dp)', ')', '',
          '@androidx.compose.runtime.Composable', 'fun ClayTheme(content: @androidx.compose.runtime.Composable () -> Unit) =', '    MaterialTheme(colorScheme = ClayColorScheme, shapes = ClayShapes, content = content)');
        return out.join('\n');
      }
      case 'flutter': {
        var fc = function (hex) { var h = hex.replace('#', ''); var a = h.length > 6 ? h.slice(6, 8) : 'FF'; return 'Color(0x' + (a + h.slice(0, 6)).toUpperCase() + ')'; };
        out.push('// clay_theme.dart — generated by Clay ' + VERSION, "import 'package:flutter/material.dart';", '', 'class ClayColors {');
        Object.keys(c).forEach(function (k) { out.push('  static const ' + k + ' = ' + fc(c[k]) + ';'); });
        out.push('}', '', 'class ClayRadius {');
        ['sm', 'md', 'lg', 'xl'].forEach(function (k) { out.push('  static const ' + k + ' = ' + t.radius[k] + '.0;'); });
        out.push('}', '', 'final clayTheme = ThemeData(', '  useMaterial3: true,', "  fontFamily: '" + t.font.primary + "',",
          '  colorScheme: ColorScheme.fromSeed(seedColor: ClayColors.primary, brightness: Brightness.' + (t.meta.mode === 'dark' ? 'dark' : 'light') + ').copyWith(',
          '    primary: ClayColors.primary, onPrimary: ClayColors.onPrimary, secondary: ClayColors.secondary,',
          '    error: ClayColors.danger, surface: ClayColors.surface, onSurface: ClayColors.text, outline: ClayColors.borderStrong,', '  ),',
          '  scaffoldBackgroundColor: ClayColors.bg,',
          '  filledButtonTheme: FilledButtonThemeData(style: FilledButton.styleFrom(minimumSize: const Size(64, ' + t.size.control + '), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(' + Math.min(t.radius.button, 100) + ')))),',
          '  cardTheme: CardThemeData(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(ClayRadius.lg))),', ');');
        return out.join('\n');
      }
      case 'xaml': {
        out.push('<!-- ClayTheme.xaml — WinUI 3 / WPF resource dictionary generated by Clay ' + VERSION + ' -->', '<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">');
        Object.keys(c).forEach(function (k) { var h = c[k].replace('#', ''); var a = h.length > 6 ? h.slice(6, 8) : 'FF'; out.push('    <Color x:Key="Clay' + k.charAt(0).toUpperCase() + k.slice(1) + 'Color">#' + (a + h.slice(0, 6)).toUpperCase() + '</Color>'); });
        out.push('    <SolidColorBrush x:Key="AccentFillColorDefaultBrush" Color="{StaticResource ClayPrimaryColor}"/>', '    <CornerRadius x:Key="ControlCornerRadius">' + t.radius.sm + '</CornerRadius>', '    <CornerRadius x:Key="OverlayCornerRadius">' + t.radius.lg + '</CornerRadius>', '    <FontFamily x:Key="ClayFontFamily">' + t.font.primary + '</FontFamily>', '</ResourceDictionary>');
        return out.join('\n');
      }
      case 'gtk': {
        out.push('/* ~/.config/gtk-4.0/gtk.css — libadwaita named colours generated by Clay ' + VERSION + ' */',
          '@define-color accent_bg_color ' + c.primary + ';', '@define-color accent_fg_color ' + c.onPrimary + ';', '@define-color accent_color ' + c.primary + ';',
          '@define-color destructive_bg_color ' + c.danger + ';', '@define-color success_color ' + c.success + ';', '@define-color warning_color ' + c.warning + ';', '@define-color error_color ' + c.danger + ';',
          '@define-color window_bg_color ' + c.bg + ';', '@define-color window_fg_color ' + c.text + ';', '@define-color view_bg_color ' + c.surface + ';', '@define-color card_bg_color ' + c.surface + ';', '@define-color headerbar_bg_color ' + c.surface2 + ';', '',
          'button, entry { border-radius: ' + t.radius.sm + 'px; }', '.card, list.boxed-list { border-radius: ' + t.radius.lg + 'px; }', 'window { font-family: "' + t.font.primary + '"; }');
        return out.join('\n');
      }
      default: throw new Error('Clay.export: unknown format "' + format + '". Use css, scss, json, figma, tailwind, swiftui, compose, flutter, xaml or gtk.');
    }
  }

  /* ------------------------------------------------------------------ */
  /* Icons (24px, stroke)                                                 */
  /* ------------------------------------------------------------------ */
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="M4 12.5 9.5 18 20 6.5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'chevron-left': '<path d="m15 6-6 6 6 6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    more: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2.5h6L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0"/><circle cx="12" cy="19.5" r=".8"/>',
    bluetooth: '<path d="m7 7 10 10-5 5V2l5 5L7 17"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    share: '<path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8M16 6l-4-4-4 4M12 2v13"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-1 .8-1.7 1.7-1.7h2A5.6 5.6 0 0 0 22 10.8C22 5.9 17.5 2 12 2z"/>',
    type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    smartphone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
    tablet: '<rect x="4" y="2" width="16" height="20" rx="2.5"/><path d="M11 18h2"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    watch: '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4"/>',
    tv: '<rect x="2" y="5" width="20" height="13" rx="2"/><path d="m7 2 5 3 5-3M8 21h8"/>',
    sparkles: '<path d="M10.5 3.5c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7z"/><path d="M18.5 15.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3z"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/>',
    bars: '<path d="M6 20V10M12 20V4M18 20v-7"/>',
    wallet: '<rect x="2" y="5" width="20" height="15" rx="2"/><path d="M16 12.5h2M2 9h20"/>',
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    play: '<path d="m6 3 14 9-14 9z"/>',
    pause: '<path d="M7 4v16M17 4v16"/>',
    filter: '<path d="M3 4h18l-7 9v6l-4 2v-8z"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    cloud: '<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A7 7 0 1 0 6.5 19z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
    message: '<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12z"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    battery: '<rect x="2" y="7" width="17" height="10" rx="2.5"/><path d="M22 11v2"/><rect x="4" y="9" width="11" height="6" rx="1" fill="currentColor" stroke="none"/>',
    signal: '<path d="M4 20v-3M9 20v-7M14 20V9M19 20V4"/>',
    package: '<path d="m21 16-9 5-9-5V8l9-5 9 5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    terminal: '<path d="m4 17 6-5-6-5M12 19h8"/>',
    cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    drop: '<path d="M12 2.7s7 7.3 7 12.3a7 7 0 0 1-14 0c0-5 7-12.3 7-12.3z"/>',
    ruler: '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m7.5 10.5 2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2"/>',
    box: '<rect x="3" y="3" width="18" height="18" rx="3"/>',
    accessibility: '<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.5 7-1.5M12 10v5l-3 6M12 15l3 6"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>'
  };
  function icon(name, attrs) {
    var body = ICONS[name] || ICONS.box;
    return '<svg class="clay-icon" viewBox="0 0 24 24" aria-hidden="true"' + (attrs ? ' ' + attrs : '') + '>' + body + '</svg>';
  }
  /** Replace <i data-clay-icon="name"></i> placeholders with inline SVG */
  function hydrateIcons(scope) {
    (scope || doc).querySelectorAll('i[data-clay-icon]').forEach(function (el) {
      var tmp = doc.createElement('span'); tmp.innerHTML = icon(el.getAttribute('data-clay-icon'));
      var svg = tmp.firstChild; if (el.className) svg.setAttribute('class', 'clay-icon ' + el.className);
      if (el.getAttribute('style')) svg.setAttribute('style', el.getAttribute('style'));
      el.replaceWith(svg);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Toasts                                                               */
  /* ------------------------------------------------------------------ */
  var toasters = {};
  function toast(opts) {
    if (typeof opts === 'string') opts = { title: opts };
    opts = Object.assign({ type: 'info', duration: 3800, position: 'corner' }, opts);
    var pos = opts.position;
    var host = toasters[pos];
    if (!host || !host.isConnected) {
      host = toasters[pos] = doc.createElement('div');
      host.className = 'clay-toaster'; host.setAttribute('data-position', pos); host.setAttribute('role', 'status'); host.setAttribute('aria-live', 'polite');
      (opts.container || doc.body).appendChild(host);
    }
    var root = opts.scope || target;
    ['data-clay-os', 'data-clay-mode'].forEach(function (a) { if (root && root.getAttribute(a)) host.setAttribute(a, root.getAttribute(a)); });
    if (root && root.getAttribute('style')) host.setAttribute('style', root.getAttribute('style'));
    host.classList.add('clay');
    host.style.background = 'transparent';
    var ic = { success: 'check', warning: 'alert', danger: 'x', info: 'info' }[opts.type] || 'info';
    var t = doc.createElement('div');
    t.className = 'clay-toast'; t.setAttribute('data-type', opts.type);
    t.innerHTML = (opts.icon === false ? '' : '<span class="clay-toast-icon">' + icon(ic) + '</span>') +
      '<div class="clay-grow">' + (opts.title ? '<div class="clay-toast-title"></div>' : '') + (opts.message ? '<div class="clay-toast-msg"></div>' : '') + '</div>' +
      (opts.action ? '<button class="clay-btn clay-btn--ghost clay-btn--sm" type="button"></button>' : '');
    if (opts.title) t.querySelector('.clay-toast-title').textContent = opts.title;
    if (opts.message) t.querySelector('.clay-toast-msg').textContent = opts.message;
    var close = function () { if (t.classList.contains('is-leaving')) return; t.classList.add('is-leaving'); setTimeout(function () { t.remove(); }, 260); };
    if (opts.action) { var b = t.querySelector('.clay-btn'); b.textContent = opts.action.label || opts.action; b.onclick = function () { if (opts.action.onClick) opts.action.onClick(); close(); }; }
    host.appendChild(t);
    if (opts.duration) setTimeout(close, opts.duration);
    return { close: close, el: t };
  }

  /* ------------------------------------------------------------------ */
  /* Dialogs (native <dialog> with animated close)                       */
  /* ------------------------------------------------------------------ */
  function $(sel) { return typeof sel === 'string' ? doc.querySelector(sel) : sel; }
  var dialog = {
    open: function (sel) { var d = $(sel); if (!d) return; d.classList.remove('is-closing'); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); return d; },
    close: function (sel, value) {
      var d = $(sel); if (!d || !d.open) return;
      d.classList.add('is-closing');
      var done = function () { d.classList.remove('is-closing'); d.close(value); };
      var ms = parseFloat(getComputedStyle(d).animationDuration) * 1000;
      if (ms > 5) setTimeout(done, ms); else done();
    }
  };

  /* ------------------------------------------------------------------ */
  /* Calendar                                                             */
  /* ------------------------------------------------------------------ */
  function renderCalendar(el, date) {
    var d = date || new Date(), y = d.getFullYear(), m = d.getMonth(), today = new Date();
    var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), prevDays = new Date(y, m, 0).getDate();
    var sel = el._claySel || (today.getMonth() === m && today.getFullYear() === y ? today.getDate() : 1);
    var html = '<div class="clay-calendar-head"><button class="clay-btn clay-btn--plain clay-btn--icon clay-btn--sm" data-cal="-1" aria-label="Previous month">' + icon('chevron-left') + '</button><span>' +
      d.toLocaleString(undefined, { month: 'long', year: 'numeric' }) + '</span><button class="clay-btn clay-btn--plain clay-btn--icon clay-btn--sm" data-cal="1" aria-label="Next month">' + icon('chevron-right') + '</button></div><div class="clay-calendar-grid">';
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function (w) { html += '<span>' + w + '</span>'; });
    for (var i = first - 1; i >= 0; i--) html += '<button class="is-muted" tabindex="-1">' + (prevDays - i) + '</button>';
    for (var n = 1; n <= days; n++) {
      var isToday = n === today.getDate() && m === today.getMonth() && y === today.getFullYear();
      html += '<button data-day="' + n + '" class="' + (isToday ? 'is-today' : '') + '" aria-pressed="' + (n === sel) + '">' + n + '</button>';
    }
    var tail = (7 - ((first + days) % 7)) % 7;
    for (var k = 1; k <= tail; k++) html += '<button class="is-muted" tabindex="-1">' + k + '</button>';
    el.innerHTML = html + '</div>';
    el._clayDate = d; el._rs = el._re = null;
    if (el.hasAttribute('data-clay-range')) el.querySelectorAll('[aria-pressed="true"]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
  }

  /* ------------------------------------------------------------------ */
  /* Behaviours (event delegation — works for content added later)        */
  /* ------------------------------------------------------------------ */
  function updateRange(r) {
    var min = +r.min || 0, max = +r.max || 100, v = +r.value;
    r.style.setProperty('--clay-value', ((v - min) / (max - min)) * 100 + '%');
  }
  function ripple(e, el) {
    var v = getComputedStyle(el).getPropertyValue('--clay-ripple').trim();
    if (v !== '1') return;
    var r = el.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2.2, sp = doc.createElement('span');
    sp.className = 'clay-ripple';
    sp.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
    el.appendChild(sp); setTimeout(function () { sp.remove(); }, 650);
  }
  function selectTab(tab) {
    var list = tab.closest('[role="tablist"]'); if (!list) return;
    list.querySelectorAll('[role="tab"]').forEach(function (t) {
      var on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      var p = t.getAttribute('aria-controls') && doc.getElementById(t.getAttribute('aria-controls'));
      if (p) p.hidden = !on;
    });
  }
  function closeMenus(except) {
    doc.querySelectorAll('.clay-dropdown.is-open').forEach(function (d) {
      if (d !== except) { d.classList.remove('is-open'); var b = d.querySelector('[data-clay-menu]'); if (b) b.setAttribute('aria-expanded', 'false'); }
    });
  }

  var bound = false;
  function bind() {
    if (bound || !doc) return; bound = true;
    doc.addEventListener('pointerdown', function (e) {
      var b = e.target.closest('.clay-btn, .clay-fab, .clay-list-item--action, .clay-chip, .clay-tabbar-item');
      if (b) ripple(e, b);
    });
    doc.addEventListener('click', function (e) {
      var t = e.target, el;
      if ((el = t.closest('[data-clay-open]'))) { e.preventDefault(); dialog.open(el.getAttribute('data-clay-open')); return; }
      if ((el = t.closest('[data-clay-close]'))) { var d = el.closest('dialog'); if (d) { e.preventDefault(); dialog.close(d, el.getAttribute('data-clay-close') || ''); } }
      if (t.tagName === 'DIALOG' && t.classList.contains('clay-dialog') && t.getAttribute('data-clay-dismissible') !== 'false') {
        var r = t.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(t);
      }
      if ((el = t.closest('[data-clay-menu]'))) {
        var dd = el.closest('.clay-dropdown'); var open = !dd.classList.contains('is-open');
        closeMenus(dd); dd.classList.toggle('is-open', open); el.setAttribute('aria-expanded', open);
        if (open) { var first = dd.querySelector('.clay-menu-item'); if (first && e.detail === 0) first.focus(); }
        return;
      }
      if (t.closest('.clay-menu-item')) closeMenus();
      else if (!t.closest('.clay-dropdown')) closeMenus();
      if ((el = t.closest('[role="tab"]'))) selectTab(el);
      if ((el = t.closest('.clay-chip[aria-pressed]'))) el.setAttribute('aria-pressed', el.getAttribute('aria-pressed') !== 'true');
      if ((el = t.closest('.clay-chip-x'))) { var chip = el.closest('.clay-chip'); chip.style.transition = 'opacity .2s, transform .2s'; chip.style.opacity = 0; chip.style.transform = 'scale(.8)'; setTimeout(function () { chip.remove(); }, 200); }
      if ((el = t.closest('[data-clay-toast]'))) toast({ title: el.getAttribute('data-clay-toast'), message: el.getAttribute('data-clay-toast-message') || '', type: el.getAttribute('data-clay-toast-type') || 'info', scope: el.closest('[data-clay-os]') || target, action: el.getAttribute('data-clay-toast-action') || undefined });
      if ((el = t.closest('.clay-stepper button'))) {
        var inp = el.parentNode.querySelector('input'); var step = +(inp.step || 1) * (el.hasAttribute('data-inc') ? 1 : -1);
        var nv = (+inp.value || 0) + step; if (inp.min !== '' && nv < +inp.min) nv = +inp.min; if (inp.max !== '' && nv > +inp.max) nv = +inp.max; inp.value = nv;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if ((el = t.closest('.clay-tabbar-item'))) {
        var bar = el.closest('.clay-tabbar'); bar.querySelectorAll('.clay-tabbar-item').forEach(function (i) { i.classList.toggle('is-active', i === el); i.removeAttribute('aria-current'); });
        el.setAttribute('aria-current', 'page');
      }
      if ((el = t.closest('.clay-sidebar-item')) && !el.getAttribute('href')) {
        el.parentNode.querySelectorAll('.clay-sidebar-item').forEach(function (i) { i.removeAttribute('aria-current'); }); el.setAttribute('aria-current', 'page');
      }
      if ((el = t.closest('.clay-page')) && !el.disabled && /^\d+$/.test(el.textContent.trim())) {
        el.parentNode.querySelectorAll('.clay-page').forEach(function (i) { i.removeAttribute('aria-current'); }); el.setAttribute('aria-current', 'page');
      }
      var cal = t.closest('.clay-calendar[data-clay-calendar]');
      if (cal) {
        if ((el = t.closest('[data-cal]'))) { var cd = cal._clayDate; cal._claySel = null; renderCalendar(cal, new Date(cd.getFullYear(), cd.getMonth() + +el.getAttribute('data-cal'), 1)); }
        else if ((el = t.closest('[data-day]')) && cal.hasAttribute('data-clay-range')) {
          var dn = +el.getAttribute('data-day');
          if (!cal._rs || cal._re) { cal._rs = dn; cal._re = null; } else if (dn < cal._rs) { cal._re = cal._rs; cal._rs = dn; } else cal._re = dn;
          cal.querySelectorAll('[data-day]').forEach(function (b) { var d = +b.getAttribute('data-day'), e2 = cal._re || cal._rs; b.setAttribute('aria-pressed', 'false'); b.classList.toggle('is-start', d === cal._rs); b.classList.toggle('is-end', d === e2); b.classList.toggle('is-range', d > cal._rs && d < e2); });
          if (cal._re) cal.dispatchEvent(new CustomEvent('clay:range', { bubbles: true, detail: { start: new Date(cal._clayDate.getFullYear(), cal._clayDate.getMonth(), cal._rs), end: new Date(cal._clayDate.getFullYear(), cal._clayDate.getMonth(), cal._re) } }));
        }
        else if ((el = t.closest('[data-day]'))) { cal._claySel = +el.getAttribute('data-day'); cal.querySelectorAll('[data-day]').forEach(function (b) { b.setAttribute('aria-pressed', b === el); }); cal.dispatchEvent(new CustomEvent('clay:select', { bubbles: true, detail: new Date(cal._clayDate.getFullYear(), cal._clayDate.getMonth(), cal._claySel) })); }
      }
    });
    /* ---- extended components ---- */
    doc.addEventListener('click', function (e) {
      var t = e.target, el;
      // password reveal
      if ((el = t.closest('[data-clay-reveal]'))) { var pw = el.parentNode.querySelector('input'); var show = pw.type === 'password'; pw.type = show ? 'text' : 'password'; el.setAttribute('aria-pressed', show); el.innerHTML = icon(show ? 'eye' : 'lock'); }
      // number boxes / steppers
      if ((el = t.closest('[data-clay-step]'))) {
        var host = el.closest('.clay-numberbox, .clay-mac-stepper, .clay-stepper'); var ni = host && host.querySelector('input');
        if (ni) { var st = (+ni.step || 1) * +el.getAttribute('data-clay-step'); var v = (+ni.value || 0) + st; if (ni.min !== '' && v < +ni.min) v = +ni.min; if (ni.max !== '' && v > +ni.max) v = +ni.max; ni.value = Math.round(v * 1000) / 1000; ni.dispatchEvent(new Event('input', { bubbles: true })); }
      }
      // toggle group (single unless data-multiple) and standalone toggles
      if ((el = t.closest('.clay-toggle-group > button, .clay-viewswitcher > button'))) {
        var grp = el.parentNode;
        if (grp.hasAttribute('data-multiple')) el.setAttribute('aria-pressed', el.getAttribute('aria-pressed') !== 'true');
        else grp.querySelectorAll(':scope > button').forEach(function (b) { b.setAttribute('aria-pressed', b === el); });
      }
      if ((el = t.closest('.clay-toggle'))) el.setAttribute('aria-pressed', el.getAttribute('aria-pressed') !== 'true');
      // swatches, cascader, tab-view tabs, rail, list selection
      if ((el = t.closest('.clay-swatch-row > button'))) el.parentNode.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b === el); });
      if ((el = t.closest('.clay-cascader li'))) el.parentNode.querySelectorAll('li').forEach(function (b) { b.setAttribute('aria-selected', b === el); });
      if ((el = t.closest('.clay-tabview-tab')) && !t.closest('.clay-chip-x')) el.parentNode.querySelectorAll('.clay-tabview-tab').forEach(function (b) { b.classList.toggle('is-active', b === el); });
      if ((el = t.closest('.clay-navrail-item'))) el.parentNode.querySelectorAll('.clay-navrail-item').forEach(function (b) { b.classList.toggle('is-active', b === el); });
      if ((el = t.closest('.clay-tree summary, .clay-tree-leaf'))) { var tr = el.closest('.clay-tree'); tr.querySelectorAll('.is-selected').forEach(function (n) { n.classList.remove('is-selected'); }); el.classList.add('is-selected'); }
      if ((el = t.closest('.clay-dots i'))) el.parentNode.querySelectorAll('i').forEach(function (b) { b.classList.toggle('is-active', b === el); });
      // dismissible surfaces
      if ((el = t.closest('[data-clay-dismiss]'))) { var box = el.closest('.clay-alert, .clay-banner, .clay-cookie, .clay-tour, .clay-teaching-tip, .clay-notification, .clay-toast'); if (box) { box.style.transition = 'opacity .25s, transform .25s'; box.style.opacity = 0; box.style.transform = 'scale(.97)'; setTimeout(function () { box.remove(); }, 250); } }
      // combobox options
      if ((el = t.closest('.clay-combobox .clay-option'))) { var cb = el.closest('.clay-combobox'); var ci = cb.querySelector('input'); ci.value = el.getAttribute('data-value') || el.textContent.trim(); cb.querySelectorAll('.clay-option').forEach(function (o) { o.setAttribute('aria-selected', o === el); }); cb.classList.remove('is-open'); }
      doc.querySelectorAll('.clay-combobox.is-open').forEach(function (c) { if (!c.contains(t)) c.classList.remove('is-open'); });
      // tags input: focus field, remove handled by chip-x
      if ((el = t.closest('.clay-tags')) && t === el) { var ti = el.querySelector('input'); if (ti) ti.focus(); }
      // carousel
      if ((el = t.closest('.clay-carousel-nav'))) { var trk = el.closest('.clay-carousel').querySelector('.clay-carousel-track'); trk.scrollBy({ left: (el.classList.contains('clay-carousel-nav--prev') ? -1 : 1) * trk.clientWidth * 0.9, behavior: 'smooth' }); }
      // transfer list
      if ((el = t.closest('[data-clay-transfer]'))) {
        var tf = el.closest('.clay-transfer'), lists = tf.querySelectorAll('.clay-transfer-list ul'), dir = el.getAttribute('data-clay-transfer');
        var from = lists[dir === 'right' ? 0 : 1], to = lists[dir === 'right' ? 1 : 0];
        from.querySelectorAll('input:checked').forEach(function (c) { c.checked = false; to.appendChild(c.closest('li')); });
        tf.querySelectorAll('.clay-transfer-list').forEach(function (l) { var n = l.querySelector('[data-count]'); if (n) n.textContent = l.querySelectorAll('li').length; });
      }
      // sortable tables
      if ((el = t.closest('.clay-table th[aria-sort]'))) {
        var tbl = el.closest('table'), idx = Array.prototype.indexOf.call(el.parentNode.children, el), asc = el.getAttribute('aria-sort') !== 'ascending';
        tbl.querySelectorAll('th[aria-sort]').forEach(function (h) { h.setAttribute('aria-sort', 'none'); }); el.setAttribute('aria-sort', asc ? 'ascending' : 'descending');
        var body = tbl.tBodies[0], rows = Array.prototype.slice.call(body.rows);
        rows.sort(function (a, b) { var x = a.cells[idx].textContent.trim(), y = b.cells[idx].textContent.trim(); var nx = parseFloat(x.replace(/[^0-9.\-]/g, '')), ny = parseFloat(y.replace(/[^0-9.\-]/g, '')); var r = (!isNaN(nx) && !isNaN(ny)) ? nx - ny : x.localeCompare(y); return asc ? r : -r; });
        rows.forEach(function (r) { body.appendChild(r); });
      }
      // swipe row (tap to toggle; drag handled below)
      if ((el = t.closest('.clay-swipe-content')) && !el._dragged) el.closest('.clay-swipe').classList.toggle('is-open');
      if ((el = t.closest('.clay-swipe-actions button'))) el.closest('.clay-swipe').classList.remove('is-open');
      // command palette trigger & back-to-top
      if ((el = t.closest('[data-clay-command]'))) { var cp = $(el.getAttribute('data-clay-command')); if (cp) { dialog.open(cp); var ci2 = cp.querySelector('input'); if (ci2) setTimeout(function () { ci2.focus(); }, 30); } }
      if (t.closest('.clay-backtop')) window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    doc.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('[data-clay-select-all]')) { var tb = t.closest('table'); tb.querySelectorAll('tbody input[type="checkbox"]').forEach(function (c) { c.checked = t.checked; c.closest('tr').classList.toggle('is-selected', t.checked); }); }
      else if (t.matches('.clay-table tbody input[type="checkbox"]')) t.closest('tr').classList.toggle('is-selected', t.checked);
    });
    // right-click menus — <div data-clay-contextmenu> … <div class="clay-menu"> … </div></div>
    var ctxMenu = null;
    function closeCtx() { if (ctxMenu) { ctxMenu.classList.remove('is-open', 'is-ctx'); ctxMenu.style.left = ctxMenu.style.top = ''; ctxMenu = null; } }
    doc.addEventListener('contextmenu', function (e) {
      var area = e.target.closest && e.target.closest('[data-clay-contextmenu]'); if (!area) return;
      var m = area.querySelector('.clay-menu'); if (!m) return;
      e.preventDefault(); closeCtx(); ctxMenu = m;
      m.classList.add('is-ctx', 'is-open');
      var w = m.offsetWidth, h = m.offsetHeight;
      m.style.left = Math.min(e.clientX, innerWidth - w - 8) + 'px'; m.style.top = Math.min(e.clientY, innerHeight - h - 8) + 'px';
      var first = m.querySelector('.clay-menu-item'); if (first) first.focus({ preventScroll: true });
    });
    doc.addEventListener('click', function (e) { if (ctxMenu && (!ctxMenu.contains(e.target) || e.target.closest('.clay-menu-item'))) closeCtx(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCtx(); });
    addEventListener('scroll', closeCtx, { passive: true });
    doc.addEventListener('focusin', function (e) { var c = e.target.closest && e.target.closest('.clay-combobox'); if (c && e.target.tagName === 'INPUT') c.classList.add('is-open'); });
    doc.addEventListener('input', function (e) {
      var t = e.target;
      var cb = t.closest && t.closest('.clay-combobox');
      if (cb && t.tagName === 'INPUT') { var q = t.value.toLowerCase(); cb.classList.add('is-open'); cb.querySelectorAll('.clay-option').forEach(function (o) { o.hidden = q && o.textContent.toLowerCase().indexOf(q) < 0; }); }
      var cmd = t.closest && t.closest('.clay-command');
      if (cmd && t.tagName === 'INPUT') { var q2 = t.value.toLowerCase(); cmd.querySelectorAll('.clay-option').forEach(function (o) { o.hidden = q2 && o.textContent.toLowerCase().indexOf(q2) < 0; }); }
      if (t.matches && t.matches('[data-clay-count]')) { var c = doc.getElementById(t.getAttribute('data-clay-count')); if (c) c.textContent = t.value.length + (t.maxLength > 0 ? ' / ' + t.maxLength : ''); }
      var dual = t.closest && t.closest('.clay-range-dual');
      if (dual) { var rs = dual.querySelectorAll('.clay-range'), lo = Math.min(+rs[0].value, +rs[1].value), hi = Math.max(+rs[0].value, +rs[1].value), mx = +rs[0].max || 100; rs[0].style.setProperty('--clay-lo', lo / mx * 100 + '%'); rs[0].style.setProperty('--clay-hi', hi / mx * 100 + '%'); }
    });
    doc.addEventListener('keydown', function (e) {
      var t = e.target;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { var cp = doc.querySelector('dialog.clay-command[data-clay-hotkey]'); if (cp) { e.preventDefault(); dialog.open(cp); var ci = cp.querySelector('input'); if (ci) setTimeout(function () { ci.focus(); }, 30); } }
      var tags = t.closest && t.closest('.clay-tags');
      if (tags && t.tagName === 'INPUT') {
        if ((e.key === 'Enter' || e.key === ',') && t.value.trim()) {
          e.preventDefault(); var chip = doc.createElement('span'); chip.className = 'clay-chip'; chip.textContent = t.value.trim();
          var x = doc.createElement('button'); x.type = 'button'; x.className = 'clay-chip-x'; x.setAttribute('aria-label', 'Remove'); x.innerHTML = icon('x'); chip.appendChild(x);
          tags.insertBefore(chip, t); t.value = '';
        } else if (e.key === 'Backspace' && !t.value) { var chips = tags.querySelectorAll('.clay-chip'); if (chips.length) chips[chips.length - 1].remove(); }
      }
    });
    // pointer drag: splitter + swipe rows
    doc.addEventListener('pointerdown', function (e) {
      var h = e.target.closest && e.target.closest('.clay-splitter-handle');
      if (h) {
        var sp = h.parentNode, r = sp.getBoundingClientRect(); h.classList.add('is-drag'); h.setPointerCapture(e.pointerId);
        var mv = function (ev) { var pct = Math.min(85, Math.max(15, (ev.clientX - r.left) / r.width * 100)); sp.style.setProperty('--clay-split', pct + '%'); };
        var up = function () { h.classList.remove('is-drag'); h.removeEventListener('pointermove', mv); h.removeEventListener('pointerup', up); };
        h.addEventListener('pointermove', mv); h.addEventListener('pointerup', up);
      }
      var sc = e.target.closest && e.target.closest('.clay-swipe-content');
      if (sc) {
        var x0 = e.clientX, row = sc.closest('.clay-swipe'), base = row.classList.contains('is-open') ? -148 : 0; sc._dragged = false;
        var mv2 = function (ev) { var dx = ev.clientX - x0; if (Math.abs(dx) > 4) { sc._dragged = true; sc.style.transition = 'none'; sc.style.transform = 'translateX(' + Math.min(0, Math.max(-200, base + dx)) + 'px)'; } };
        var up2 = function (ev) { doc.removeEventListener('pointermove', mv2); doc.removeEventListener('pointerup', up2); sc.style.transition = ''; sc.style.transform = ''; if (sc._dragged) row.classList.toggle('is-open', base + ev.clientX - x0 < -60); setTimeout(function () { sc._dragged = false; }, 0); };
        doc.addEventListener('pointermove', mv2); doc.addEventListener('pointerup', up2);
      }
    });
    doc.addEventListener('input', function (e) {
      var t = e.target;
      if (t.classList.contains('clay-range')) updateRange(t);
      if (t.closest('.clay-otp') && t.value) { t.value = t.value.slice(-1); var nx = t.nextElementSibling; if (nx && nx.tagName === 'INPUT') nx.focus(); }
    });
    doc.addEventListener('keydown', function (e) {
      var t = e.target;
      if (e.key === 'Escape') closeMenus();
      if (t.closest && t.closest('.clay-otp') && e.key === 'Backspace' && !t.value) { var pv = t.previousElementSibling; if (pv) pv.focus(); }
      if (t.getAttribute && t.getAttribute('role') === 'tab' && /Arrow(Left|Right)|Home|End/.test(e.key)) {
        var tabs = Array.prototype.slice.call(t.closest('[role="tablist"]').querySelectorAll('[role="tab"]')), i = tabs.indexOf(t);
        var n = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        tabs[n].focus(); selectTab(tabs[n]); e.preventDefault();
      }
      if (t.closest && t.closest('.clay-menu') && /Arrow(Up|Down)/.test(e.key)) {
        var items = Array.prototype.slice.call(t.closest('.clay-menu').querySelectorAll('.clay-menu-item')), j = items.indexOf(t);
        items[(j + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); e.preventDefault();
      }
    });
    ['dragenter', 'dragover'].forEach(function (ev) { doc.addEventListener(ev, function (e) { var z = e.target.closest && e.target.closest('.clay-dropzone'); if (z) { z.classList.add('is-over'); } }); });
    ['dragleave', 'drop'].forEach(function (ev) { doc.addEventListener(ev, function (e) { var z = e.target.closest && e.target.closest('.clay-dropzone'); if (z) z.classList.remove('is-over'); }); });
    doc.addEventListener('change', function (e) {
      var z = e.target.closest && e.target.closest('.clay-dropzone');
      if (z && e.target.files && e.target.files.length) { var lbl = z.querySelector('[data-clay-files]'); if (lbl) lbl.textContent = Array.prototype.map.call(e.target.files, function (f) { return f.name; }).join(', '); }
    });
    if (typeof matchMedia !== 'undefined') matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (state.mode === 'auto') apply(); });
  }

  /** Upgrade static markup (ranges, icons, calendars). Safe to call repeatedly on new content. */
  function upgrade(scope) {
    scope = scope || doc;
    hydrateIcons(scope);
    scope.querySelectorAll('.clay-range').forEach(updateRange);
    scope.querySelectorAll('.clay-calendar[data-clay-calendar]').forEach(function (c) { if (!c._clayDate) renderCalendar(c); });
    scope.querySelectorAll('.clay-check[data-indeterminate]').forEach(function (c) { c.indeterminate = true; });
  }

  /** Boot Clay. Reads data-clay-* attributes on the target as defaults. */
  function init(opts) {
    opts = opts || {};
    target = opts.target ? $(opts.target) : (doc ? doc.documentElement : null);
    if (!target) return;
    var os = opts.os || target.getAttribute('data-clay-os') || 'web';
    state = Object.assign({}, DEFAULTS, { os: os === 'auto' ? detectOS() : os, mode: opts.mode || target.getAttribute('data-clay-mode') || 'light' });
    if (opts.theme && THEMES[opts.theme]) Object.assign(state, THEMES[opts.theme]);
    Object.keys(opts).forEach(function (k) { if (k in DEFAULTS && k !== 'os' && k !== 'mode') state[k] = opts[k]; });
    if (opts.apply !== false) apply();
    bind();
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { upgrade(); });
    else upgrade();
    return getTheme();
  }

  // Auto-init when the script tag carries data-clay-auto, e.g. <script src="clay.js" data-clay-auto data-os="auto"></script>
  if (doc && doc.currentScript && doc.currentScript.hasAttribute('data-clay-auto')) {
    var ds = doc.currentScript.dataset;
    init({ os: ds.os, mode: ds.mode, theme: ds.theme, primary: ds.primary || null, radius: ds.radius ? +ds.radius : null, font: ds.font || null });
  } else if (doc) {
    bind();
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { upgrade(); }); else upgrade();
  }

  return {
    version: VERSION, OS: OS, THEMES: THEMES, FONTS: GOOGLE_FONTS.concat(Object.keys(SYSTEM_FONTS)),
    init: init, setTheme: setTheme, getTheme: getTheme, setOS: setOS, setMode: setMode, reset: reset, onChange: onChange,
    detectOS: detectOS, tokens: tokens, export: exportTokens, contrast: contrast, contrastRatio: ratio, toHex: toHex, loadFont: loadFont,
    toast: toast, dialog: dialog, icon: icon, icons: ICONS, upgrade: upgrade, calendar: renderCalendar
  };
});
