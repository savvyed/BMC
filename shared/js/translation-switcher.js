/* ============================================================
   BMC Dev — Translation Mode Switcher
   DEV BRANCH ONLY — not for production.

   Runs before main.js to set window.BMC_TRANSLATION_MODE, then
   injects a fixed toolbar so the team can compare:

     GTranslate  — automatic translation via the GTranslate widget
     Manual      — content routed by ?lang=xx URL parameter

   The chosen mode is stored in localStorage and survives navigation.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'bmc-translation-mode';
  var DEFAULT_MODE = 'gtranslate';
  var mode = localStorage.getItem(STORAGE_KEY) || DEFAULT_MODE;

  /* Expose globally so main.js can branch on this value */
  window.BMC_TRANSLATION_MODE = mode;

  /* ── Mark <html> early so CSS rules fire before paint ── */
  document.documentElement.setAttribute('data-translation-mode', mode);

  /* ── Inject toolbar CSS ─────────────────────────────────────── */
  var css = [
    '/* BMC Dev — Translation Switcher */',

    /* Fixed dev bar */
    '#bmc-dev-bar{',
    '  position:fixed;bottom:0;left:0;right:0;z-index:10000;',
    '  display:flex;align-items:center;gap:8px;',
    '  padding:5px 12px;',
    '  background:#1c1c1e;color:#f5f5f7;',
    '  font:12px/1.4 system-ui,sans-serif;',
    '  border-top:2px solid #FF9F0A;',
    '  box-shadow:0 -2px 8px rgba(0,0,0,.4);',
    '}',
    '.dev-bar-icon{font-size:14px;flex-shrink:0}',
    '.dev-bar-label{color:#a1a1a6;white-space:nowrap;margin-right:2px}',
    '.dev-bar-btn{',
    '  padding:3px 10px;border-radius:12px;',
    '  border:1px solid #48484a;background:transparent;',
    '  color:#a1a1a6;font-size:11px;cursor:pointer;',
    '  transition:border-color .15s,color .15s;white-space:nowrap;',
    '}',
    '.dev-bar-btn:hover{border-color:#FF9F0A;color:#f5f5f7}',
    '.dev-bar-btn--active{',
    '  background:#FF9F0A;border-color:#FF9F0A;',
    '  color:#1c1c1e;font-weight:600;',
    '}',
    '.dev-bar-sub{opacity:.65;font-size:10px}',
    '.dev-bar-sep{color:#48484a;user-select:none}',
    '.dev-bar-note{margin-left:auto;color:#636366;font-size:10px;white-space:nowrap}',

    /* Push page content up so the fixed bar doesn\'t overlap the footer */
    'body{padding-bottom:44px !important}',

    /* GTranslate mode: hide the manual language indicator in the header */
    '[data-translation-mode="gtranslate"] .header-lang-btn{display:none !important}',

    /* Manual mode: hide the GTranslate widget mount point */
    '[data-translation-mode="manual"] .gtranslate_wrapper{display:none !important}',

    /* GTranslate mode: show the hint below the language-select buttons */
    '[data-translation-mode="gtranslate"] .lang-gtranslate-hint{display:block !important}',
    '.lang-gtranslate-hint{',
    '  display:none;text-align:center;',
    '  color:#94a3b8;font-size:13px;margin-top:12px;line-height:1.5;',
    '}',
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── GTranslate: load the widget only in gtranslate mode ─── */
  if (mode === 'gtranslate') {
    window.gtranslateSettings = {
      default_language: 'en',
      native_language_names: true,
      detect_browser_language: true,
      wrapper_selector: '.gtranslate_wrapper'
    };
    var gts = document.createElement('script');
    gts.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
    gts.defer = true;
    document.head.appendChild(gts);
  }

  /* ── Dev toolbar ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('div');
    bar.id = 'bmc-dev-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Developer: translation mode switcher');
    bar.innerHTML =
      '<span class="dev-bar-icon" aria-hidden="true">🛠</span>' +
      '<span class="dev-bar-label">Translation&nbsp;mode:</span>' +
      '<button class="dev-bar-btn' + (mode === 'gtranslate' ? ' dev-bar-btn--active' : '') +
        '" data-mode="gtranslate" type="button">' +
        'GTranslate <span class="dev-bar-sub">(automatic)</span>' +
      '</button>' +
      '<span class="dev-bar-sep" aria-hidden="true">|</span>' +
      '<button class="dev-bar-btn' + (mode === 'manual' ? ' dev-bar-btn--active' : '') +
        '" data-mode="manual" type="button">' +
        'Manual routing <span class="dev-bar-sub">(?lang=xx)</span>' +
      '</button>' +
      '<span class="dev-bar-note" aria-hidden="true">dev branch only</span>';

    document.body.appendChild(bar);

    bar.querySelectorAll('.dev-bar-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newMode = btn.getAttribute('data-mode');
        if (newMode === mode) return;
        localStorage.setItem(STORAGE_KEY, newMode);

        /* When switching to GTranslate, strip ?lang so the page
           reloads cleanly without a manual-mode lang parameter */
        if (newMode === 'gtranslate') {
          var url = new URL(window.location.href);
          url.searchParams.delete('lang');
          window.location.replace(url.toString());
        } else {
          window.location.reload();
        }
      });
    });
  });

})();
