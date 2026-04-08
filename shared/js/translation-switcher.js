/* ============================================================
   BMC — Translation Mode Manager
   Reads the user's chosen translation mode (set on index.html)
   from localStorage and configures the page accordingly.

   GTranslate mode  — custom language select calls doGTranslate();
                      float.js engine loaded; float bubble hidden
   Manual mode      — ?lang=xx URL parameter routing; GTranslate
                      not loaded; manual lang button shown
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'bmc-translation-mode';
  var mode = localStorage.getItem(STORAGE_KEY) || 'gtranslate';

  /* Expose globally so main.js can branch on this value */
  window.BMC_TRANSLATION_MODE = mode;

  /* Mark <html> early so CSS rules apply before first paint */
  document.documentElement.setAttribute('data-translation-mode', mode);

  /* ── Mode-specific CSS ──────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    /* GTranslate mode: hide the manual lang button */
    '[data-translation-mode="gtranslate"] .header-lang-btn { display: none !important; }',

    /* Hide the GTranslate float bubble entirely — we use our own select.
       The wrapper is kept in the DOM so the engine initialises correctly.
       .gt_float_wrapper is the bubble container injected by float.js.
       The iframe and Google toolbar banner are also suppressed. */
    '[data-translation-mode="gtranslate"] .gtranslate_wrapper { position:fixed;top:-9999px;left:-9999px; }',
    '.gt_float_wrapper                    { display: none !important; }',
    '.goog-te-banner-frame                { display: none !important; }',
    'body { top: 0 !important; }',

    /* Manual mode: hide GTranslate controls */
    '[data-translation-mode="manual"] .header-gt-select { display: none !important; }',
    '[data-translation-mode="manual"] .translate-bar    { display: none !important; }',

    /* Custom GTranslate select — in the sticky header */
    '.header-gt-select {',
    '  background: rgba(255,255,255,0.15);',
    '  border: 1px solid rgba(255,255,255,0.4);',
    '  color: #ffffff;',
    '  border-radius: 20px;',
    '  padding: 4px 10px;',
    '  font-size: 0.875rem;',
    '  font-weight: 600;',
    '  min-height: 36px;',
    '  cursor: pointer;',
    '  font-family: inherit;',
    '  appearance: none;',
    '  -webkit-appearance: none;',
    '}',
    '.header-gt-select option { color: #1c2833; background: #ffffff; }',
    '.header-gt-select:focus { outline: 3px solid rgba(255,255,255,0.6); }',
  ].join('\n');
  document.head.appendChild(style);

  /* ── Load GTranslate engine (float.js) in GTranslate mode ── */
  if (mode === 'gtranslate') {
    window.gtranslateSettings = {
      default_language: 'en',
      native_language_names: true,
      detect_browser_language: false,
      wrapper_selector: '.gtranslate_wrapper'
    };
    var s = document.createElement('script');
    s.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
    s.defer = true;
    document.head.appendChild(s);

    /* float.js injects its bubble widget asynchronously into the DOM
       after the page loads. Use a MutationObserver to catch it and
       hide it as soon as it appears — CSS alone isn't fast enough. */
    var observer = new MutationObserver(function () {
      var bubble = document.querySelector('.gt_float_wrapper');
      if (bubble) {
        bubble.style.cssText = 'display:none!important';
        observer.disconnect();
      }
    });
    document.addEventListener('DOMContentLoaded', function () {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

})();
