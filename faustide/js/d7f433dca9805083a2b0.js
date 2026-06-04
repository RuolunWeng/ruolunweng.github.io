"use strict";
(self["webpackChunkfausteditorweb"] = self["webpackChunkfausteditorweb"] || []).push([[5940],{

/***/ 14954
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ SHCUIParser)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47075);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87526);

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

class SHCUIParser {
  maskComments(dspCode) {
    var masked = '';
    var state = 'code';
    var escaped = false;
    for (var i = 0; i < dspCode.length; i++) {
      var ch = dspCode[i];
      var next = dspCode[i + 1];
      if (state === 'lineComment') {
        if (ch === '\n') {
          state = 'code';
          masked += ch;
        } else {
          masked += ' ';
        }
        continue;
      }
      if (state === 'blockComment') {
        if (ch === '*' && next === '/') {
          masked += '  ';
          i++;
          state = 'code';
        } else {
          masked += ch === '\n' ? ch : ' ';
        }
        continue;
      }
      if (state === 'string') {
        masked += ch;
        if (escaped) {
          escaped = false;
        } else if (ch === '\\') {
          escaped = true;
        } else if (ch === '"') {
          state = 'code';
        }
        continue;
      }
      if (ch === '/' && next === '/') {
        masked += '  ';
        i++;
        state = 'lineComment';
      } else if (ch === '/' && next === '*') {
        masked += '  ';
        i++;
        state = 'blockComment';
      } else {
        masked += ch;
        if (ch === '"') state = 'string';
      }
    }
    return masked;
  }
  parse(dspCode) {
    var elements = [];
    var errors = [];
    var stripped = this.maskComments(dspCode);
    var regex = /"([^"]*\[SHCUI:[^\]]*\][^"]*)"/g;
    var match;
    while ((match = regex.exec(stripped)) !== null) {
      var fullLabel = match[1];
      var shcuiMatch = fullLabel.match(/\[SHCUI:\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*\]/);
      if (!shcuiMatch) continue;
      // Extract paramPath: everything before the first metadata [...] block
      // Handles labels like "[3]Resonance[acc:...]" and "h:[1]Hands/1[acc:...]"
      // Metadata blocks contain a colon. Ordering prefixes [1],[2] are NOT metadata.
      var metaIdx = fullLabel.search(/\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)[^\]]*\]/);
      var paramPath = (metaIdx !== -1 ? fullLabel.slice(0, metaIdx).trimEnd() : fullLabel).trim();
      var _shcuiMatch = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(shcuiMatch, 11),
        tab = _shcuiMatch[1],
        typeStr = _shcuiMatch[2],
        xStr = _shcuiMatch[3],
        yStr = _shcuiMatch[4],
        wStr = _shcuiMatch[5],
        hStr = _shcuiMatch[6],
        rStr = _shcuiMatch[7],
        gStr = _shcuiMatch[8],
        bStr = _shcuiMatch[9],
        aStr = _shcuiMatch[10];
      var x = parseFloat(xStr),
        y = parseFloat(yStr),
        w = parseFloat(wStr),
        h = parseFloat(hStr);
      var r = parseInt(rStr),
        g = parseInt(gStr),
        b = parseInt(bStr),
        a = parseInt(aStr);
      var hasError = false;
      if (x < 0 || x > 100 || y < 0 || y > 100 || w < 0 || w > 100 || h < 0 || h > 100) {
        errors.push({
          paramPath,
          message: "Coordinates/size out of range (0-100): x=".concat(x, " y=").concat(y, " w=").concat(w, " h=").concat(h)
        });
        hasError = true;
      }
      if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 255) {
        errors.push({
          paramPath,
          message: "Color values out of range (0-255): r=".concat(r, " g=").concat(g, " b=").concat(b, " a=").concat(a)
        });
        hasError = true;
      }
      if (!_types__WEBPACK_IMPORTED_MODULE_1__/* .SHCUI_TYPES */ .J.includes(typeStr)) {
        errors.push({
          paramPath,
          message: "Unknown SHCUI type: \"".concat(typeStr, "\"")
        });
        hasError = true;
      }
      if (!hasError) elements.push({
        paramPath,
        tab,
        type: typeStr,
        x,
        y,
        w,
        h,
        r,
        g,
        b,
        a
      });
    }
    return {
      data: elements,
      errors
    };
  }
  serialize(element) {
    var tab = element.tab,
      type = element.type,
      x = element.x,
      y = element.y,
      w = element.w,
      h = element.h,
      r = element.r,
      g = element.g,
      b = element.b,
      a = element.a;
    // Round coordinates/size to integers to avoid floating-point noise
    return "[SHCUI: ".concat(tab, " ").concat(type, " ").concat(Math.round(x), " ").concat(Math.round(y), " ").concat(Math.round(w), " ").concat(Math.round(h), " ").concat(Math.round(r), " ").concat(Math.round(g), " ").concat(Math.round(b), " ").concat(Math.round(a), "]");
  }
  parseCueManager(dspCode) {
    var entries = [];
    var stripped = this.maskComments(dspCode);

    // Match inline label metadata: [touchCueManager: {1:'tip1'; 2:'tip2'; ...}]
    // or declare format: declare touchCueManager "{1:tip1; 2:tip2; ...}";
    var inlineMatch = stripped.match(/\[touchCueManager:\s*(\{[^}]*\})\]/);
    var declareMatch = stripped.match(/declare\s+touchCueManager\s+"(\{[^}]*\})"\s*;/);
    var rawContent = ((inlineMatch === null || inlineMatch === void 0 ? void 0 : inlineMatch[1]) || (declareMatch === null || declareMatch === void 0 ? void 0 : declareMatch[1]) || '').replace(/^\{/, '').replace(/\}$/, '');
    if (!rawContent.trim()) return entries;
    var _iterator = _createForOfIteratorHelper(rawContent.split(';')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var part = _step.value;
        var trimmed = part.trim();
        if (!trimmed) continue;
        var colonIdx = trimmed.indexOf(':');
        if (colonIdx === -1) continue;
        var index = parseInt(trimmed.slice(0, colonIdx).trim());
        // Strip surrounding quotes (single or double) from tip
        var tip = trimmed.slice(colonIdx + 1).trim();
        tip = tip.replace(/^['"]|['"]$/g, '');
        if (!isNaN(index) && tip) entries.push({
          index,
          tip
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return entries;
  }
}

/***/ },

/***/ 22858
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ MotionParser)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47075);

class MotionParser {
  maskComments(dspCode) {
    var masked = '';
    var state = 'code';
    var escaped = false;
    for (var i = 0; i < dspCode.length; i++) {
      var ch = dspCode[i];
      var next = dspCode[i + 1];
      if (state === 'lineComment') {
        if (ch === '\n') {
          state = 'code';
          masked += ch;
        } else {
          masked += ' ';
        }
        continue;
      }
      if (state === 'blockComment') {
        if (ch === '*' && next === '/') {
          masked += '  ';
          i++;
          state = 'code';
        } else {
          masked += ch === '\n' ? ch : ' ';
        }
        continue;
      }
      if (state === 'string') {
        masked += ch;
        if (escaped) {
          escaped = false;
        } else if (ch === '\\') {
          escaped = true;
        } else if (ch === '"') {
          state = 'code';
        }
        continue;
      }
      if (ch === '/' && next === '/') {
        masked += '  ';
        i++;
        state = 'lineComment';
      } else if (ch === '/' && next === '*') {
        masked += '  ';
        i++;
        state = 'blockComment';
      } else {
        masked += ch;
        if (ch === '"') state = 'string';
      }
    }
    return masked;
  }
  parse(dspCode) {
    var mappings = [];
    var errors = [];
    var stripped = this.maskComments(dspCode);
    var regex = /"([^"]*\[(?:acc|gyr):[^\]]*\][^"]*)"/g;
    var match;
    while ((match = regex.exec(stripped)) !== null) {
      var fullLabel = match[1];
      var metaStart = fullLabel.search(/\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)(?:\s|:)[^\]]*\]/);
      var paramPath = metaStart !== -1 ? fullLabel.slice(0, metaStart).trimEnd() : fullLabel;
      var metaRegex = /\[(acc|gyr):\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*\]/g;
      var metaMatch = void 0;
      while ((metaMatch = metaRegex.exec(fullLabel)) !== null) {
        var _metaMatch = metaMatch,
          _metaMatch2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_metaMatch, 7),
          sensor = _metaMatch2[1],
          axisStr = _metaMatch2[2],
          curveStr = _metaMatch2[3],
          aminStr = _metaMatch2[4],
          amidStr = _metaMatch2[5],
          amaxStr = _metaMatch2[6];
        var axis = parseInt(axisStr);
        var curve = parseInt(curveStr);
        var amin = parseFloat(aminStr),
          amid = parseFloat(amidStr),
          amax = parseFloat(amaxStr);
        var hasError = false;
        if (![0, 1, 2].includes(axis)) {
          errors.push({
            paramPath,
            message: "Invalid axis value: ".concat(axis)
          });
          hasError = true;
        }
        if (![0, 1, 2].includes(curve)) {
          errors.push({
            paramPath,
            message: "Invalid curve value: ".concat(curve)
          });
          hasError = true;
        }
        if (amin >= amax) {
          errors.push({
            paramPath,
            message: "amin (".concat(amin, ") must be less than amax (").concat(amax, ")")
          });
          hasError = true;
        }
        if (!hasError) mappings.push({
          paramPath,
          sensor: sensor,
          axis,
          curve,
          amin,
          amid,
          amax
        });
      }
    }
    return {
      data: mappings,
      errors
    };
  }
  serialize(mapping) {
    var sensor = mapping.sensor,
      axis = mapping.axis,
      curve = mapping.curve,
      amin = mapping.amin,
      amid = mapping.amid,
      amax = mapping.amax;
    return "[".concat(sensor, ": ").concat(axis, " ").concat(curve, " ").concat(amin, " ").concat(amid, " ").concat(amax, "]");
  }
}

/***/ },

/***/ 30838
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ makeDivider)
/* harmony export */ });
/**
 * ResizeDivider.ts
 *
 * Creates a draggable vertical divider between two flex siblings.
 * Dragging adjusts the width of the left panel (if provided) or the
 * right panel (if provided). Pass null for the panel you don't want
 * to resize directly — the flex layout handles the other side.
 *
 * @param leftEl   The element to the left whose width is adjusted, or null
 * @param rightEl  The element to the right whose width is adjusted, or null
 * @param minPx    Minimum width in pixels for the resized panel
 * @param maxPx    Maximum width in pixels for the resized panel
 */
function makeDivider(leftEl, rightEl) {
  var minPx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
  var maxPx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 600;
  var divider = document.createElement('div');
  divider.style.cssText = ['width:5px;flex-shrink:0;cursor:col-resize;', 'background:#2a2a2a;', 'transition:background 0.15s;', 'position:relative;z-index:1;'].join('');

  // Visual grip dots
  var grip = document.createElement('div');
  grip.style.cssText = ['position:absolute;top:50%;left:50%;', 'transform:translate(-50%,-50%);', 'display:flex;flex-direction:column;gap:3px;', 'pointer-events:none;'].join('');
  for (var i = 0; i < 3; i++) {
    var dot = document.createElement('div');
    dot.style.cssText = 'width:3px;height:3px;border-radius:50%;background:#555;';
    grip.appendChild(dot);
  }
  divider.appendChild(grip);
  divider.addEventListener('mouseenter', () => {
    divider.style.background = '#3a3a3a';
  });
  divider.addEventListener('mouseleave', () => {
    divider.style.background = '#2a2a2a';
  });
  var dragging = false;
  var startX = 0;
  var startWidth = 0;
  divider.addEventListener('mousedown', e => {
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    // Determine which panel we're resizing
    if (leftEl) {
      startWidth = leftEl.getBoundingClientRect().width;
    } else if (rightEl) {
      startWidth = rightEl.getBoundingClientRect().width;
    }
    divider.style.background = '#4af';
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    var dx = e.clientX - startX;
    if (leftEl) {
      var newW = Math.max(minPx, Math.min(maxPx, startWidth + dx));
      leftEl.style.width = "".concat(newW, "px");
      leftEl.style.flexShrink = '0';
    } else if (rightEl) {
      var _newW = Math.max(minPx, Math.min(maxPx, startWidth - dx));
      rightEl.style.width = "".concat(_newW, "px");
      rightEl.style.flexShrink = '0';
    }
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    divider.style.background = '#2a2a2a';
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
  return divider;
}

/***/ },

/***/ 33400
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ CuePanel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54705);
/* harmony import */ var _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66328);
/* harmony import */ var _parseParams__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95526);
/* harmony import */ var _SHCUIParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14954);

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



class CuePanel {
  constructor(options) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "container", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "getCode", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "setCode", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "editor", new _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_1__/* .DSPMetadataEditor */ .K());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "parser", new _SHCUIParser__WEBPACK_IMPORTED_MODULE_3__/* .SHCUIParser */ .k());
    this.container = options.container;
    this.getCode = options.getCode;
    this.setCode = options.setCode;
    this.container.style.cssText = 'overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;';
    this.render();
  }
  refresh() {
    this.render();
  }

  // ── Strip comments from DSP code before analysis ──────────────────────────

  stripComments(code) {
    // Remove block comments /* ... */
    var stripped = code.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove line comments // ...
    stripped = stripped.replace(/\/\/[^\n]*/g, '');
    return stripped;
  }

  // ── Detect trigCue in non-comment code ────────────────────────────────────

  detectTrigCue(code) {
    var stripped = this.stripComments(code);
    return /\[SHCUI:[^\]]*trigCue[^\]]*\]/.test(stripped);
  }

  // ── Extract all DSP param labels from non-comment code ───────────────────

  extractParams(code) {
    var stripped = this.stripComments(code);
    var parsed = (0,_parseParams__WEBPACK_IMPORTED_MODULE_2__/* .parseParams */ .S)(stripped);
    return parsed.map(p => p.paramPath);
  }

  // ── Main render ───────────────────────────────────────────────────────────

  render() {
    this.container.innerHTML = '';
    var code = this.getCode();
    var title = document.createElement('div');
    title.textContent = 'Cue System [touchCueManager: ...]';
    title.style.cssText = 'padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;';
    this.container.appendChild(title);
    if (!this.detectTrigCue(code)) {
      this.renderCreateCue(code);
    } else {
      this.renderCueEditor(code);
    }
  }

  // ── No trigCue: show create form ──────────────────────────────────────────

  renderCreateCue(code) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px;';
    var info = document.createElement('div');
    info.style.cssText = 'background:#2a1a00;border:1px solid #6a4a00;border-radius:4px;padding:10px 12px;margin-bottom:12px;font-size:11px;line-height:1.7;';
    info.innerHTML = "\n      <div style=\"color:#fa0;font-weight:bold;margin-bottom:4px;\">\u26A0 No trigCue element found</div>\n      <div style=\"color:#aaa;\">The cue system requires a SHCUI element with type <code style=\"color:#8cf;\">trigCue</code>.</div>\n      <div style=\"color:#888;margin-top:6px;\">Select an existing DSP parameter to attach <b>trigCue</b> to, or type a new parameter name.</div>\n    ";
    wrap.appendChild(info);
    var params = this.extractParams(code);
    var selLabel = document.createElement('div');
    selLabel.textContent = 'Link trigCue to parameter:';
    selLabel.style.cssText = 'color:#ccc;font-size:11px;margin-bottom:4px;';
    wrap.appendChild(selLabel);

    // Dropdown of existing params + free-text option
    var datalistId = "cue-params-".concat(Date.now());
    var datalist = document.createElement('datalist');
    datalist.id = datalistId;
    var _iterator = _createForOfIteratorHelper(params),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var p = _step.value;
        var opt = document.createElement('option');
        opt.value = p;
        datalist.appendChild(opt);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    wrap.appendChild(datalist);
    var paramInput = document.createElement('input');
    paramInput.type = 'text';
    paramInput.setAttribute('list', datalistId);
    paramInput.placeholder = params.length > 0 ? 'Pick or type a param name…' : 'e.g. myButton';
    paramInput.style.cssText = 'background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:4px 8px;font-size:12px;width:220px;display:block;margin-bottom:6px;';
    wrap.appendChild(paramInput);
    var hint = document.createElement('div');
    hint.style.cssText = 'font-size:10px;color:#555;margin-bottom:8px;';
    hint.textContent = params.length > 0 ? "".concat(params.length, " param(s) found in DSP \u2014 or type a new name") : 'No params found — type a new param name to create one';
    wrap.appendChild(hint);
    var preview = document.createElement('div');
    preview.style.cssText = 'font-family:monospace;font-size:10px;color:#666;margin-bottom:10px;min-height:14px;';
    var updatePreview = () => {
      var n = paramInput.value.trim();
      if (!n) {
        preview.textContent = '';
        return;
      }
      var exists = params.includes(n);
      preview.textContent = exists ? "Will add [SHCUI: main trigCue ...] + [touchCueManager: {...}] to \"".concat(n, "\"") : "Will insert button(\"".concat(n, " [SHCUI: main trigCue ...]\", 0) into DSP");
    };
    paramInput.addEventListener('input', updatePreview);
    wrap.appendChild(preview);
    var errMsg = document.createElement('div');
    errMsg.style.cssText = 'color:#f44;font-size:11px;min-height:14px;margin-bottom:6px;';
    wrap.appendChild(errMsg);
    var createBtn = document.createElement('button');
    createBtn.textContent = '＋ Add trigCue & cue manager';
    createBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;';
    createBtn.addEventListener('click', () => {
      var name = paramInput.value.trim();
      if (!name) {
        errMsg.textContent = 'Please enter or select a parameter name';
        return;
      }
      var stripped = this.stripComments(code);
      var paramExists = new RegExp("(?:hslider|vslider|button|checkbox|nentry|hbargraph|vbargraph)\\s*\\(\\s*\"".concat(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).test(stripped);
      var defaultCues = Array.from({
        length: 10
      }, (_, i) => ({
        index: i + 1,
        tip: "Your sample".concat(i + 1)
      }));
      var updated = code;
      if (paramExists) {
        // Add SHCUI trigCue metadata to existing param
        var shcuiEl = {
          paramPath: name,
          tab: 'main',
          type: 'trigCue',
          x: 40,
          y: 45,
          w: 20,
          h: 10,
          r: 255,
          g: 100,
          b: 50,
          a: 200
        };
        updated = this.editor.upsertSHCUI(updated, name, shcuiEl);
      } else {
        // Insert a new button param before process line
        var newParam = "\nbutton(\"".concat(name, " [SHCUI: main trigCue 40 45 20 10 255 100 50 200]\", 0);\n");
        var processIdx = updated.search(/\bprocess\s*=/);
        if (processIdx !== -1) {
          updated = updated.slice(0, processIdx) + newParam + updated.slice(processIdx);
        } else {
          updated += newParam;
        }
      }

      // Add touchCueManager inline metadata on the trigCue param
      updated = this.editor.upsertCueManager(updated, defaultCues);
      this.setCode(updated);
      this.render();
    });
    wrap.appendChild(createBtn);
    this.container.appendChild(wrap);
  }

  // ── Has trigCue: show editor ──────────────────────────────────────────────

  renderCueEditor(code) {
    var entries = this.parser.parseCueManager(code);
    var badge = document.createElement('div');
    badge.style.cssText = 'padding:4px 10px;font-size:10px;color:#4a4;background:#1a2a1a;border-bottom:1px solid #2a3a2a;';
    badge.textContent = '✓ trigCue element detected — editing touchCueManager';
    this.container.appendChild(badge);
    var listWrap = document.createElement('div');
    listWrap.style.cssText = 'padding:6px 10px;';
    var currentEntries = [...entries];
    var renderList = () => {
      listWrap.innerHTML = '';
      var _loop = function _loop(i) {
        var entry = currentEntries[i];
        var row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:4px;';
        var indexLabel = document.createElement('span');
        indexLabel.textContent = "".concat(entry.index, ":");
        indexLabel.style.cssText = 'color:#666;font-size:11px;width:20px;flex-shrink:0;';
        row.appendChild(indexLabel);
        var tipInput = document.createElement('input');
        tipInput.type = 'text';
        tipInput.value = entry.tip;
        tipInput.style.cssText = 'flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 5px;font-size:11px;';
        tipInput.addEventListener('input', () => {
          currentEntries[i] = {
            index: entry.index,
            tip: tipInput.value
          };
        });
        row.appendChild(tipInput);
        var delBtn = document.createElement('button');
        delBtn.textContent = '✕';
        delBtn.style.cssText = 'background:#5a2020;color:#fff;border:none;border-radius:2px;padding:1px 5px;cursor:pointer;font-size:10px;';
        delBtn.addEventListener('click', () => {
          currentEntries.splice(i, 1);
          currentEntries.forEach((e, idx) => {
            e.index = idx + 1;
          });
          renderList();
        });
        row.appendChild(delBtn);
        listWrap.appendChild(row);
      };
      for (var i = 0; i < currentEntries.length; i++) {
        _loop(i);
      }
      var addRow = document.createElement('div');
      addRow.style.cssText = 'display:flex;gap:6px;margin-top:4px;';
      var addBtn = document.createElement('button');
      addBtn.textContent = '+ Add Cue';
      addBtn.style.cssText = 'background:#2a4a2a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;';
      addBtn.addEventListener('click', () => {
        currentEntries.push({
          index: currentEntries.length + 1,
          tip: "Your sample".concat(currentEntries.length + 1)
        });
        renderList();
      });
      addRow.appendChild(addBtn);
      var saveBtn = document.createElement('button');
      saveBtn.textContent = '✓ Save';
      saveBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;';
      saveBtn.addEventListener('click', () => {
        var c = this.getCode();
        var updated = this.editor.upsertCueManager(c, currentEntries);
        if (updated !== c) this.setCode(updated);
      });
      addRow.appendChild(saveBtn);
      listWrap.appendChild(addRow);
    };
    renderList();
    this.container.appendChild(listWrap);
    if (entries.length > 0) {
      var preview = document.createElement('div');
      preview.style.cssText = 'padding:6px 10px;border-top:1px solid #333;';
      var previewTitle = document.createElement('div');
      previewTitle.textContent = 'Current cue list:';
      previewTitle.style.cssText = 'color:#888;font-size:10px;margin-bottom:4px;';
      preview.appendChild(previewTitle);
      var _iterator2 = _createForOfIteratorHelper(entries),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var e = _step2.value;
          var item = document.createElement('div');
          item.textContent = "".concat(e.index, ": ").concat(e.tip);
          item.style.cssText = 'color:#8cf;font-size:11px;font-family:monospace;';
          preview.appendChild(item);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.container.appendChild(preview);
    }
    var help = document.createElement('div');
    help.style.cssText = 'padding:6px 10px;border-top:1px solid #333;color:#666;font-size:10px;line-height:1.6;';
    help.innerHTML = "<b style=\"color:#888\">Cue control types (set via SHCUI type):</b><br>\n      trigCue \u2014 trigger current cue and advance<br>\n      nextCue \u2014 advance to next cue<br>\n      prevCue \u2014 go back to previous cue<br>\n      initCue \u2014 reset to first cue";
    this.container.appendChild(help);
  }
}

/***/ },

/***/ 37954
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ FaustPiecePackager)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47075);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10467);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54756);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);


function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

class FaustPiecePackager {
  unpack(data, fileName) {
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var JSZip, zip, baseName, mainDspName, mainDspFile, mainDspContent, attachments;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 1;
            return __webpack_require__.e(/* import() */ 1710).then(__webpack_require__.t.bind(__webpack_require__, 71710, 23));
          case 1:
            JSZip = _context.sent.default;
            _context.next = 2;
            return JSZip.loadAsync(data);
          case 2:
            zip = _context.sent;
            baseName = fileName.replace(/\.FaustPiece$/i, '');
            mainDspName = "".concat(baseName, ".dsp");
            mainDspFile = zip.file(mainDspName);
            if (mainDspFile) {
              _context.next = 3;
              break;
            }
            throw new Error("Invalid .FaustPiece: missing main DSP file \"".concat(mainDspName, "\""));
          case 3:
            _context.next = 4;
            return mainDspFile.async('string');
          case 4:
            mainDspContent = _context.sent;
            attachments = [];
            zip.forEach(relativePath => {
              if (relativePath !== mainDspName) attachments.push(relativePath);
            });
            return _context.abrupt("return", {
              mainDspPath: mainDspName,
              mainDspContent,
              attachments,
              tempDir: ''
            });
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
  pack(options) {
    var _arguments = arguments;
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      var attachmentContents, JSZip, zip, mainDspName, _iterator, _step, _step$value, filename, content, isAudio, isLib, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            attachmentContents = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : new Map();
            _context2.next = 1;
            return __webpack_require__.e(/* import() */ 1710).then(__webpack_require__.t.bind(__webpack_require__, 71710, 23));
          case 1:
            JSZip = _context2.sent.default;
            zip = new JSZip();
            mainDspName = "".concat(options.outputName, ".dsp");
            zip.file(mainDspName, options.dspContent);
            _iterator = _createForOfIteratorHelper(attachmentContents);
            _context2.prev = 2;
            _iterator.s();
          case 3:
            if ((_step = _iterator.n()).done) {
              _context2.next = 7;
              break;
            }
            _step$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_step.value, 2), filename = _step$value[0], content = _step$value[1];
            isAudio = /\.(wav|aif|aiff|flac)$/i.test(filename);
            isLib = filename.endsWith('.dsp') && filename !== mainDspName;
            if (!(isAudio && !options.includeAudio)) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("continue", 6);
          case 4:
            if (!(isLib && !options.includeLibs)) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("continue", 6);
          case 5:
            zip.file(filename, content);
          case 6:
            _context2.next = 3;
            break;
          case 7:
            _context2.next = 9;
            break;
          case 8:
            _context2.prev = 8;
            _t = _context2["catch"](2);
            _iterator.e(_t);
          case 9:
            _context2.prev = 9;
            _iterator.f();
            return _context2.finish(9);
          case 10:
            return _context2.abrupt("return", zip.generateAsync({
              type: 'uint8array'
            }));
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[2, 8, 9, 10]]);
    }))();
  }
}

/***/ },

/***/ 38318
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ FileNameValidator)
/* harmony export */ });
class FileNameValidator {
  validate(name) {
    if (!name || name.length === 0) return {
      valid: false,
      error: 'File name cannot be empty.'
    };
    if (name.includes(' ')) return {
      valid: false,
      error: 'File name must not contain spaces.'
    };
    return {
      valid: true
    };
  }
}

/***/ },

/***/ 40027
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ MotionPanel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47075);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54705);
/* harmony import */ var _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66328);
/* harmony import */ var _MotionParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22858);
/* harmony import */ var _parseParams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(95526);
/* harmony import */ var _parameterFiltering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(67804);


function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





// Motion lib output params from DspFaustMotion (sourced from DspFaustMotion.cpp)
// These are ALL [motionName: ...] declared params — the value written is the name directly (e.g. [motion: ixp]).
var MOTION_LIB_PARAMS = [
// Smooth acc
{
  name: 'sxp',
  label: 'sxp — smooth acc X+'
}, {
  name: 'syp',
  label: 'syp — smooth acc Y+'
}, {
  name: 'szp',
  label: 'szp — smooth acc Z+'
}, {
  name: 'sxn',
  label: 'sxn — smooth acc X−'
}, {
  name: 'syn',
  label: 'syn — smooth acc Y−'
}, {
  name: 'szn',
  label: 'szn — smooth acc Z−'
},
// Interpolated tilt
{
  name: 'ixp',
  label: 'ixp — interp. tilt X+'
}, {
  name: 'iyp',
  label: 'iyp — interp. tilt Y+'
}, {
  name: 'izp',
  label: 'izp — interp. tilt Z+'
}, {
  name: 'ixn',
  label: 'ixn — interp. tilt X−'
}, {
  name: 'iyn',
  label: 'iyn — interp. tilt Y−'
}, {
  name: 'izn',
  label: 'izn — interp. tilt Z−'
},
// Projected interpolated tilt
{
  name: 'pixp',
  label: 'pixp — proj. interp. X+'
}, {
  name: 'piyp',
  label: 'piyp — proj. interp. Y+'
}, {
  name: 'pizp',
  label: 'pizp — proj. interp. Z+'
}, {
  name: 'pixn',
  label: 'pixn — proj. interp. X−'
}, {
  name: 'piyn',
  label: 'piyn — proj. interp. Y−'
}, {
  name: 'pizn',
  label: 'pizn — proj. interp. Z−'
},
// Normalised acc
{
  name: 'axpn',
  label: 'axpn — norm. acc X+'
}, {
  name: 'aypn',
  label: 'aypn — norm. acc Y+'
}, {
  name: 'azpn',
  label: 'azpn — norm. acc Z+'
},
// Raw acc direction
{
  name: 'axp',
  label: 'axp — acc X+'
}, {
  name: 'ayp',
  label: 'ayp — acc Y+'
}, {
  name: 'azp',
  label: 'azp — acc Z+'
}, {
  name: 'axn',
  label: 'axn — acc X−'
}, {
  name: 'ayn',
  label: 'ayn — acc Y−'
}, {
  name: 'azn',
  label: 'azn — acc Z−'
}, {
  name: 'totalaccel',
  label: 'totalaccel — total accel magnitude'
},
// Gyro normalised
{
  name: 'gxpn',
  label: 'gxpn — norm. gyro X+'
}, {
  name: 'gypn',
  label: 'gypn — norm. gyro Y+'
}, {
  name: 'gzpn',
  label: 'gzpn — norm. gyro Z+'
},
// Gyro direction
{
  name: 'gxp',
  label: 'gxp — gyro X+'
}, {
  name: 'gyp',
  label: 'gyp — gyro Y+'
}, {
  name: 'gzp',
  label: 'gzp — gyro Z+'
}, {
  name: 'gxn',
  label: 'gxn — gyro X−'
}, {
  name: 'gyn',
  label: 'gyn — gyro Y−'
}, {
  name: 'gzn',
  label: 'gzn — gyro Z−'
}, {
  name: 'totalgyro',
  label: 'totalgyro — total gyro magnitude'
},
// Normalised interpolated tilt
{
  name: 'ixpn',
  label: 'ixpn — norm. interp. X+'
}, {
  name: 'iypn',
  label: 'iypn — norm. interp. Y+'
}, {
  name: 'izpn',
  label: 'izpn — norm. interp. Z+'
}, {
  name: 'ixpn_sym',
  label: 'ixpn_sym — sym. norm. interp. X'
}, {
  name: 'iypn_sym',
  label: 'iypn_sym — sym. norm. interp. Y'
}, {
  name: 'izpn_sym',
  label: 'izpn_sym — sym. norm. interp. Z'
},
// Direction of swing
{
  name: 'dosx',
  label: 'dosx — direction of swing X'
}, {
  name: 'dosy',
  label: 'dosy — direction of swing Y'
},
// Matrix X
{
  name: 'MXxraw',
  label: 'MXxraw'
}, {
  name: 'MXxneg',
  label: 'MXxneg'
}, {
  name: 'MXxpos',
  label: 'MXxpos'
}, {
  name: 'MXyraw',
  label: 'MXyraw'
}, {
  name: 'MXyneg',
  label: 'MXyneg'
}, {
  name: 'MXypos',
  label: 'MXypos'
}, {
  name: 'MXzraw',
  label: 'MXzraw'
}, {
  name: 'MXzneg',
  label: 'MXzneg'
}, {
  name: 'MXzpos',
  label: 'MXzpos'
},
// Matrix Y
{
  name: 'MYxraw',
  label: 'MYxraw'
}, {
  name: 'MYxneg',
  label: 'MYxneg'
}, {
  name: 'MYxpos',
  label: 'MYxpos'
}, {
  name: 'MYyraw',
  label: 'MYyraw'
}, {
  name: 'MYyneg',
  label: 'MYyneg'
}, {
  name: 'MYypos',
  label: 'MYypos'
}, {
  name: 'MYzraw',
  label: 'MYzraw'
}, {
  name: 'MYzneg',
  label: 'MYzneg'
}, {
  name: 'MYzpos',
  label: 'MYzpos'
},
// Matrix Z
{
  name: 'MZxraw',
  label: 'MZxraw'
}, {
  name: 'MZxneg',
  label: 'MZxneg'
}, {
  name: 'MZxpos',
  label: 'MZxpos'
}, {
  name: 'MZyraw',
  label: 'MZyraw'
}, {
  name: 'MZyneg',
  label: 'MZyneg'
}, {
  name: 'MZypos',
  label: 'MZypos'
}, {
  name: 'MZzraw',
  label: 'MZzraw'
}, {
  name: 'MZzneg',
  label: 'MZzneg'
}, {
  name: 'MZzpos',
  label: 'MZzpos'
},
// Amplitude
{
  name: 'AmpX',
  label: 'AmpX — amplitude X'
}, {
  name: 'AmpY',
  label: 'AmpY — amplitude Y'
}, {
  name: 'AmpZ',
  label: 'AmpZ — amplitude Z'
},
// Gyro XY
{
  name: 'gyro_xy',
  label: 'gyro_xy — gyro XY combined'
}];
class MotionPanel {
  constructor(options) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, "container", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, "getCode", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, "setCode", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, "getDspJson", void 0);
    // Task 3.4: Get compiled DSP JSON
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, "editor", new _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_2__/* .DSPMetadataEditor */ .K());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, "motionParser", new _MotionParser__WEBPACK_IMPORTED_MODULE_3__/* .MotionParser */ .E());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(this, "params", []);
    this.container = options.container;
    this.getCode = options.getCode;
    this.setCode = options.setCode;
    this.getDspJson = options.getDspJson; // Task 3.4
    this.container.style.cssText = 'overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;';
  }
  setParams(params) {
    this.params = params;
    this.render();
  }
  parseParamsFromCode(code) {
    var parsed = (0,_parseParams__WEBPACK_IMPORTED_MODULE_4__/* .parseParams */ .S)(code);
    var params = parsed.map((_ref, id) => {
      var paramPath = _ref.paramPath,
        fullLabel = _ref.fullLabel;
      return {
        id,
        address: paramPath,
        min: 0,
        max: 1,
        init: 0,
        accMeta: this.extractMetaFromLabel(fullLabel, 'acc'),
        gyrMeta: this.extractMetaFromLabel(fullLabel, 'gyr'),
        motionMeta: this.extractMetaFromLabel(fullLabel, 'motion'),
        showNameMeta: this.extractMetaFromLabel(fullLabel, 'showName')
      };
    });
    this.params = params;
    this.render();
  }
  extractMetaFromLabel(fullLabel, key) {
    var m = fullLabel.match(new RegExp("\\[".concat(key, ":\\s*([^\\]]+)\\]")));
    return m ? m[1].trim() : undefined;
  }
  render() {
    var _this = this;
    this.container.innerHTML = '';
    var code = this.getCode();
    var parsed = this.motionParser.parse(code);

    // Task 3.2: Filter parameters to only show used ones
    var dspJson = this.getDspJson ? this.getDspJson() : null;
    console.log('[MotionPanel] render called');
    console.log('[MotionPanel] getDspJson available:', !!this.getDspJson);
    console.log('[MotionPanel] dspJson:', dspJson);
    console.log('[MotionPanel] Total params before filtering:', this.params.length);
    console.log('[MotionPanel] FaustPiece param addresses:', this.params.map(p => p.address));
    var _effectiveParams = (0,_parameterFiltering__WEBPACK_IMPORTED_MODULE_5__/* .effectiveParams */ .K6)(this.params, dspJson),
      filteredParams = _effectiveParams.params,
      hiddenCount = _effectiveParams.hiddenCount;
    console.log('[MotionPanel] Params after filtering:', filteredParams.length);
    console.log('[MotionPanel] Hidden count:', hiddenCount);
    console.log('[MotionPanel] Filtered param addresses:', filteredParams.map(p => p.address));

    // Show guidance message if DSP not compiled yet
    if (!dspJson && this.params.length > 0) {
      var guidance = document.createElement('div');
      guidance.style.cssText = 'padding:8px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#fa4;font-size:11px;line-height:1.5;';
      guidance.textContent = '⚠️ Please compile DSP first (click "Run" button) to enable parameter filtering';
      this.container.appendChild(guidance);
    }

    // ── Sub-panel A: Motion Lib Link ──────────────────────────────────────
    var titleA = document.createElement('div');
    titleA.textContent = 'Motion Lib Parameter Link [motion: ...]';
    titleA.style.cssText = 'padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;';
    this.container.appendChild(titleA);
    var descA = document.createElement('div');
    descA.style.cssText = 'padding:3px 10px 5px;color:#666;font-size:10px;line-height:1.5;';
    descA.textContent = 'Link a motion lib pre-processed sensor output to a DSP parameter.';
    this.container.appendChild(descA);

    // Task 3.3: Add notification UI component
    if (hiddenCount > 0) {
      var notification = document.createElement('div');
      notification.style.cssText = 'padding:4px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#888;font-size:10px;';
      notification.textContent = "Note: ".concat(hiddenCount, " unused parameter(s) hidden from list");
      this.container.appendChild(notification);
    }
    if (filteredParams.length === 0) {
      var empty = document.createElement('div');
      empty.textContent = hiddenCount > 0 ? 'All parameters are unused. No parameters to display.' : 'Click "Parse DSP" to load parameters.';
      empty.style.cssText = 'padding:8px 10px;color:#666;font-size:11px;';
      this.container.appendChild(empty);
    } else {
      var _iterator = _createForOfIteratorHelper(filteredParams),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var param = _step.value;
          this.container.appendChild(this.makeMotionLinkRow(param));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    // ── Sub-panel B: acc/gyr mapping ──────────────────────────────────────
    var titleB = document.createElement('div');
    titleB.textContent = 'Native Faust Sensor Mapping [acc/gyr: ...]';
    titleB.style.cssText = 'padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-top:2px solid #333;border-bottom:1px solid #333;margin-top:8px;';
    this.container.appendChild(titleB);
    if (filteredParams.length === 0) {
      var _empty = document.createElement('div');
      _empty.textContent = hiddenCount > 0 ? 'All parameters are unused. No parameters to display.' : 'Click "Parse DSP" to load parameters.';
      _empty.style.cssText = 'padding:8px 10px;color:#666;font-size:11px;';
      this.container.appendChild(_empty);
    } else {
      var _iterator2 = _createForOfIteratorHelper(filteredParams),
        _step2;
      try {
        var _loop = function _loop() {
          var param = _step2.value;
          var writePath = param.sourceAddress || param.address;
          var existing = parsed.data.filter(m => m.paramPath === writePath);
          var _iterator3 = _createForOfIteratorHelper(_this.mappingsFromParamMeta(param)),
            _step3;
          try {
            var _loop2 = function _loop2() {
              var mapping = _step3.value;
              if (!existing.some(m => m.sensor === mapping.sensor)) existing.push(mapping);
            };
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              _loop2();
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          _this.container.appendChild(_this.makeAccGyrRow(param, existing));
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }
  mappingsFromParamMeta(param) {
    var mappings = [];
    var _iterator4 = _createForOfIteratorHelper([['acc', param.accMeta], ['gyr', param.gyrMeta]]),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _step4$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_step4.value, 2),
          sensor = _step4$value[0],
          meta = _step4$value[1];
        if (!meta) continue;
        var parts = meta.trim().split(/\s+/);
        if (parts.length < 5) continue;
        var _parts = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(parts, 5),
          axisStr = _parts[0],
          curveStr = _parts[1],
          aminStr = _parts[2],
          amidStr = _parts[3],
          amaxStr = _parts[4];
        var axis = parseInt(axisStr);
        var curve = parseInt(curveStr);
        var amin = parseFloat(aminStr);
        var amid = parseFloat(amidStr);
        var amax = parseFloat(amaxStr);
        if (![0, 1, 2].includes(axis) || ![0, 1, 2].includes(curve) || !Number.isFinite(amin) || !Number.isFinite(amid) || !Number.isFinite(amax)) continue;
        var writePath = param.sourceAddress || param.address;
        mappings.push({
          paramPath: writePath,
          sensor,
          axis,
          curve,
          amin,
          amid,
          amax
        });
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return mappings;
  }
  makeMotionLinkRow(param) {
    var row = document.createElement('div');
    row.style.cssText = 'padding:5px 10px;border-bottom:1px solid #2a2a2a;display:flex;align-items:center;gap:6px;';
    var writable = param.sourceWritable !== false;
    var label = document.createElement('span');
    label.textContent = param.address.split('/').pop() || param.address;
    label.title = param.address;
    label.style.cssText = 'color:#aaa;font-size:11px;min-width:70px;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0;';
    row.appendChild(label);

    // Dropdown of known motion lib params + "(none)" option
    var sel = document.createElement('select');
    sel.style.cssText = 'flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;font-size:11px;';
    sel.disabled = !writable;
    var noneOpt = document.createElement('option');
    noneOpt.value = '';
    noneOpt.textContent = '— none —';
    sel.appendChild(noneOpt);
    for (var _i = 0, _MOTION_LIB_PARAMS = MOTION_LIB_PARAMS; _i < _MOTION_LIB_PARAMS.length; _i++) {
      var mp = _MOTION_LIB_PARAMS[_i];
      var opt = document.createElement('option');
      opt.value = mp.name;
      opt.textContent = mp.label;
      if (param.motionMeta === mp.name) opt.selected = true;
      sel.appendChild(opt);
    }

    // If current value isn't in the known list, add it as a custom option
    if (param.motionMeta && !MOTION_LIB_PARAMS.find(mp => mp.name === param.motionMeta)) {
      var customOpt = document.createElement('option');
      customOpt.value = param.motionMeta;
      customOpt.textContent = "".concat(param.motionMeta, " (custom)");
      customOpt.selected = true;
      sel.appendChild(customOpt);
    }

    // Preview of the metadata that will be written
    var preview = document.createElement('span');
    var updatePreview = () => {
      preview.textContent = writable ? sel.value ? "[motion: ".concat(sel.value, "]") : '' : 'from import/compiled UI - not editable';
    };
    preview.style.cssText = "font-family:monospace;font-size:10px;color:".concat(writable ? '#666' : '#fa4', ";flex-shrink:0;");
    updatePreview();
    sel.addEventListener('change', () => {
      if (!writable) return;
      updatePreview();
      var val = sel.value;
      var code = this.getCode();
      var writePath = param.sourceAddress || param.address;
      var updated = val ? this.editor.upsertMotionLink(code, writePath, val) : this.editor.removeMotionLink(code, writePath);
      if (updated !== code) this.setCode(updated);
    });
    row.appendChild(sel);
    row.appendChild(preview);
    return row;
  }
  makeAccGyrRow(param, existing) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'padding:6px 10px;border-bottom:1px solid #2a2a2a;';
    var writable = param.sourceWritable !== false;
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:4px;';
    var label = document.createElement('span');
    label.textContent = param.address.split('/').pop() || param.address;
    label.title = param.address;
    label.style.cssText = 'color:#aaa;font-size:11px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
    header.appendChild(label);
    var rangeInfo = document.createElement('span');
    rangeInfo.textContent = "[".concat(param.min, "\u2026").concat(param.max, "]");
    rangeInfo.style.cssText = 'color:#666;font-size:10px;';
    header.appendChild(rangeInfo);
    wrap.appendChild(header);
    var _iterator5 = _createForOfIteratorHelper(existing),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var m = _step5.value;
        wrap.appendChild(this.makeMappingDisplay(param, m));
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    if (writable) {
      wrap.appendChild(this.makeAddMappingForm(param));
    } else {
      var note = document.createElement('div');
      note.textContent = 'This parameter comes from imported/compiled UI and cannot be edited because its label is not in the current DSP file.';
      note.style.cssText = 'color:#fa4;font-size:10px;line-height:1.4;margin-top:3px;';
      wrap.appendChild(note);
    }
    return wrap;
  }
  makeMappingDisplay(param, m) {
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:4px;margin-bottom:3px;background:#2a2a2a;border-radius:3px;padding:3px 6px;';
    var info = document.createElement('span');
    info.textContent = "[".concat(m.sensor, ": axis=").concat(m.axis, " curve=").concat(m.curve, " ").concat(m.amin, "\u2026").concat(m.amid, "\u2026").concat(m.amax, "]");
    info.style.cssText = 'flex:1;color:#8cf;font-size:10px;font-family:monospace;';
    row.appendChild(info);
    var delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.style.cssText = 'background:#5a2020;color:#fff;border:none;border-radius:2px;padding:1px 5px;cursor:pointer;font-size:10px;';
    delBtn.disabled = param.sourceWritable === false;
    if (delBtn.disabled) {
      delBtn.title = 'Cannot edit metadata for imported/compiled UI parameters';
      delBtn.style.opacity = '0.45';
      delBtn.style.cursor = 'not-allowed';
    }
    delBtn.addEventListener('click', () => {
      if (param.sourceWritable === false) return;
      var code = this.getCode();
      var writePath = param.sourceAddress || param.address;
      var updated = this.editor.removeMotion(code, writePath, m.sensor);
      if (updated !== code) {
        this.setCode(updated);
        this.render();
      }
    });
    row.appendChild(delBtn);
    return row;
  }
  makeAddMappingForm(param) {
    var form = document.createElement('div');
    form.style.cssText = 'display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin-top:2px;';
    var makeSelect = (options, defaultVal) => {
      var sel = document.createElement('select');
      sel.style.cssText = 'background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:1px 3px;font-size:11px;';
      var _iterator6 = _createForOfIteratorHelper(options),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var o = _step6.value;
          var opt = document.createElement('option');
          opt.value = o;
          opt.textContent = o;
          if (o === defaultVal) opt.selected = true;
          sel.appendChild(opt);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return sel;
    };
    var makeNumInput = (placeholder, defaultVal) => {
      var inp = document.createElement('input');
      inp.type = 'number';
      inp.placeholder = placeholder;
      inp.value = defaultVal;
      inp.style.cssText = 'width:52px;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:1px 3px;font-size:11px;';
      return inp;
    };
    var sensorSel = makeSelect(['acc', 'gyr'], 'acc');
    var axisSel = makeSelect(['0', '1', '2'], '0');
    var curveSel = makeSelect(['0', '1', '2'], '0');
    var aminInp = makeNumInput('amin', String(param.min));
    var amidInp = makeNumInput('amid', '0');
    var amaxInp = makeNumInput('amax', String(param.max));
    var addBtn = document.createElement('button');
    addBtn.textContent = '+ Add';
    addBtn.style.cssText = 'background:#2a4a2a;color:#fff;border:none;border-radius:3px;padding:2px 8px;cursor:pointer;font-size:11px;';
    addBtn.addEventListener('click', () => {
      var amin = parseFloat(aminInp.value),
        amid = parseFloat(amidInp.value),
        amax = parseFloat(amaxInp.value);
      if (amin >= amax) {
        alert('amin must be less than amax');
        return;
      }
      var mapping = {
        paramPath: param.sourceAddress || param.address,
        sensor: sensorSel.value,
        axis: parseInt(axisSel.value),
        curve: parseInt(curveSel.value),
        amin,
        amid,
        amax
      };
      var code = this.getCode();
      var writePath = param.sourceAddress || param.address;
      var updated = this.editor.upsertMotion(code, writePath, mapping);
      if (updated !== code) {
        this.setCode(updated);
        this.render();
      }
    });
    for (var _i2 = 0, _arr = [sensorSel, axisSel, curveSel, aminInp, amidInp, amaxInp, addBtn]; _i2 < _arr.length; _i2++) {
      var el = _arr[_i2];
      form.appendChild(el);
    }
    return form;
  }
}

/***/ },

/***/ 47075
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _slicedToArray)
});

;// ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

;// ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

;// ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

;// ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

;// ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

;// ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}


/***/ },

/***/ 51751
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ ShowNamePanel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54705);
/* harmony import */ var _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66328);
/* harmony import */ var _parseParams__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95526);
/* harmony import */ var _parameterFiltering__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67804);

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



class ShowNamePanel {
  constructor(options) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "container", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "getCode", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "setCode", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "getDspJson", void 0);
    // Task 3.4: Get compiled DSP JSON
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "editor", new _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_1__/* .DSPMetadataEditor */ .K());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "params", []);
    this.container = options.container;
    this.getCode = options.getCode;
    this.setCode = options.setCode;
    this.getDspJson = options.getDspJson; // Task 3.4
    this.container.style.cssText = 'overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;';
    this.render();
  }
  setParams(params) {
    this.params = params;
    this.render();
  }
  parseParamsFromCode(code) {
    var parsed = (0,_parseParams__WEBPACK_IMPORTED_MODULE_2__/* .parseParams */ .S)(code);
    var params = parsed.map((_ref, id) => {
      var paramPath = _ref.paramPath,
        fullLabel = _ref.fullLabel;
      var snMatch = fullLabel.match(/\[showName:\s*([^\]]+)\]/);
      return {
        id,
        address: paramPath,
        min: 0,
        max: 1,
        init: 0,
        showNameMeta: snMatch ? snMatch[1].trim() : undefined
      };
    });
    this.params = params;
    this.render();
  }
  render() {
    this.container.innerHTML = '';
    var title = document.createElement('div');
    title.textContent = 'Parameter Display Names [showName: ...]';
    title.style.cssText = 'padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;';
    this.container.appendChild(title);
    var help = document.createElement('div');
    help.style.cssText = 'padding:4px 10px 6px;color:#666;font-size:10px;line-height:1.5;border-bottom:1px solid #2a2a2a;';
    help.textContent = 'Parameters with a showName will appear in the SHCdyna Setting page "DSP Parameters" list, allowing performers to adjust values at runtime.';
    this.container.appendChild(help);

    // Task 3.2: Filter parameters to only show used ones
    var dspJson = this.getDspJson ? this.getDspJson() : null;
    var _effectiveParams = (0,_parameterFiltering__WEBPACK_IMPORTED_MODULE_3__/* .effectiveParams */ .K6)(this.params, dspJson),
      filteredParams = _effectiveParams.params,
      hiddenCount = _effectiveParams.hiddenCount;

    // Show guidance message if DSP not compiled yet
    if (!dspJson && this.params.length > 0) {
      var guidance = document.createElement('div');
      guidance.style.cssText = 'padding:8px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#fa4;font-size:11px;line-height:1.5;';
      guidance.textContent = '⚠️ Please compile DSP first (click "Run" button) to enable parameter filtering';
      this.container.appendChild(guidance);
    }

    // Task 3.3: Add notification UI component
    if (hiddenCount > 0) {
      var notification = document.createElement('div');
      notification.style.cssText = 'padding:4px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#888;font-size:10px;';
      notification.textContent = "Note: ".concat(hiddenCount, " unused parameter(s) hidden from list");
      this.container.appendChild(notification);
    }
    if (filteredParams.length === 0) {
      var empty = document.createElement('div');
      empty.textContent = hiddenCount > 0 ? 'All parameters are unused. No parameters to display.' : 'No parameters found. Click "Parse DSP" to load parameters.';
      empty.style.cssText = 'padding:8px 10px;color:#666;font-size:11px;';
      this.container.appendChild(empty);
      return;
    }

    // Show active parameters summary
    var active = filteredParams.filter(p => p.showNameMeta);
    if (active.length > 0) {
      var previewWrap = document.createElement('div');
      previewWrap.style.cssText = 'padding:6px 10px;background:#252526;border-bottom:1px solid #333;';
      var previewTitle = document.createElement('div');
      previewTitle.textContent = "\u2713 ".concat(active.length, " parameter(s) visible in Setting page:");
      previewTitle.style.cssText = 'color:#4a4;font-size:10px;margin-bottom:3px;font-weight:bold;';
      previewWrap.appendChild(previewTitle);
      var _iterator = _createForOfIteratorHelper(active),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var p = _step.value;
          var item = document.createElement('div');
          item.textContent = "\"".concat(p.showNameMeta, "\" \u2192 ").concat(p.address);
          item.style.cssText = 'color:#8cf;font-size:10px;font-family:monospace;padding-left:8px;';
          previewWrap.appendChild(item);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.container.appendChild(previewWrap);
    }

    // Parameter list
    var _iterator2 = _createForOfIteratorHelper(filteredParams),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var param = _step2.value;
        this.container.appendChild(this.makeParamRow(param));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  makeParamRow(param) {
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid #2a2a2a;';
    var writable = param.sourceWritable !== false;
    var writePath = param.sourceAddress || param.address;

    // Checkbox to enable/disable showName
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!param.showNameMeta;
    checkbox.style.cssText = 'cursor:pointer;';
    checkbox.disabled = !writable;
    if (!writable) {
      checkbox.title = 'Cannot edit metadata for imported/compiled UI parameters';
      checkbox.style.cursor = 'not-allowed';
    }
    checkbox.addEventListener('change', () => {
      if (!writable) return;
      if (!checkbox.checked) {
        // Remove showName
        var code = this.getCode();
        var updated = this.editor.removeShowName(code, writePath);
        if (updated !== code) {
          this.setCode(updated);
          param.showNameMeta = undefined;
          this.render();
        }
      } else {
        // Enable with default name (parameter display name)
        var defaultName = param.address.split('/').pop() || param.address;
        var _code = this.getCode();
        var _updated = this.editor.upsertShowName(_code, writePath, defaultName);
        if (_updated !== _code) {
          this.setCode(_updated);
          param.showNameMeta = defaultName;
          this.render();
        }
      }
    });
    row.appendChild(checkbox);

    // Parameter label
    var label = document.createElement('span');
    var displayName = param.address.split('/').pop() || param.address;
    label.textContent = displayName;
    label.title = "Full path: ".concat(param.address);
    label.style.cssText = 'color:#aaa;font-size:11px;min-width:100px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
    row.appendChild(label);
    if (!writable) {
      var warning = document.createElement('span');
      warning.textContent = 'from import/compiled UI - not editable';
      warning.style.cssText = 'color:#fa4;font-size:10px;flex:1;';
      row.appendChild(warning);
      return row;
    }

    // Display name input (only visible when checked)
    if (param.showNameMeta) {
      var arrow = document.createElement('span');
      arrow.textContent = '→';
      arrow.style.cssText = 'color:#666;font-size:11px;';
      row.appendChild(arrow);
      var input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Display name';
      input.value = param.showNameMeta || '';
      input.style.cssText = 'flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 6px;font-size:11px;';
      var updateBtn = document.createElement('button');
      updateBtn.textContent = 'Update';
      updateBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;';
      updateBtn.addEventListener('click', () => {
        var val = input.value.trim();
        if (!val) {
          alert('Display name cannot be empty. Uncheck the checkbox to remove showName.');
          return;
        }
        var code = this.getCode();
        var updated = this.editor.upsertShowName(code, writePath, val);
        if (updated !== code) {
          this.setCode(updated);
          param.showNameMeta = val;
          this.render();
        }
      });
      row.appendChild(input);
      row.appendChild(updateBtn);
    } else {
      var hint = document.createElement('span');
      hint.textContent = '(check to enable)';
      hint.style.cssText = 'color:#555;font-size:10px;font-style:italic;';
      row.appendChild(hint);
    }
    return row;
  }
}

/***/ },

/***/ 57841
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ SHCUICanvas)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54705);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87526);
/* harmony import */ var _parseParams__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95526);
/* harmony import */ var _parameterFiltering__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67804);

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



class SHCUICanvas {
  constructor(options) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "canvas", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "ctx", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "elements", []);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "currentTab", '');
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "tabs", []);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "tabBar", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "container", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "onChange", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "onAdd", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "getCode", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "getDspJson", void 0);
    // Task 3.4
    // Quick-add popover DOM ref (so we can close it)
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "addPopover", null);
    // Zoom: scale factor applied to the base 9:16 canvas size
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "zoom", 1.0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "ZOOM_MIN", 0.3);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "ZOOM_MAX", 3.0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "ZOOM_STEP", 0.15);
    // Drag state
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "dragging", null);
    // Resize state
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "resizing", null);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "selectedElement", null);
    this.container = options.container;
    this.onChange = options.onChange;
    this.onAdd = options.onAdd;
    this.getCode = options.getCode;
    this.getDspJson = options.getDspJson; // Task 3.4
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'column';
    this.container.style.height = '100%';
    this.container.style.overflowY = 'auto';

    // Tab bar
    this.tabBar = document.createElement('div');
    this.tabBar.className = 'faustpiece-tab-bar';
    this.tabBar.style.cssText = 'display:flex;gap:4px;padding:4px;background:#1e1e1e;flex-shrink:0;overflow-x:auto;align-items:center;';
    this.container.appendChild(this.tabBar);

    // Zoom controls bar
    var zoomBar = document.createElement('div');
    zoomBar.style.cssText = 'display:flex;align-items:center;gap:6px;padding:3px 8px;background:#252526;border-bottom:1px solid #333;flex-shrink:0;';
    var zoomLabel = document.createElement('span');
    zoomLabel.style.cssText = 'font-size:10px;color:#666;';
    zoomLabel.textContent = '📱 Phone preview (9:16)';
    zoomBar.appendChild(zoomLabel);
    var spacer = document.createElement('span');
    spacer.style.flex = '1';
    zoomBar.appendChild(spacer);
    var zoomOutBtn = this.makeZoomBtn('−', () => this.setZoom(this.zoom - this.ZOOM_STEP));
    zoomBar.appendChild(zoomOutBtn);
    var zoomDisplay = document.createElement('span');
    zoomDisplay.style.cssText = 'font-size:11px;color:#aaa;min-width:38px;text-align:center;';
    zoomDisplay.textContent = '100%';
    zoomBar.appendChild(zoomDisplay);
    var zoomInBtn = this.makeZoomBtn('+', () => this.setZoom(this.zoom + this.ZOOM_STEP));
    zoomBar.appendChild(zoomInBtn);
    var zoomResetBtn = this.makeZoomBtn('⊙', () => this.setZoom(1.0));
    zoomResetBtn.title = 'Reset zoom';
    zoomBar.appendChild(zoomResetBtn);

    // Add element button
    var addBtn = document.createElement('button');
    addBtn.textContent = '＋ Add Element';
    addBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:2px 8px;cursor:pointer;font-size:11px;margin-left:8px;';
    addBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.toggleAddPopover(addBtn);
    });
    zoomBar.appendChild(addBtn);
    this.container.appendChild(zoomBar);

    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'background:#2d2d2d;cursor:crosshair;display:block;';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Store zoomDisplay ref for updates
    this._zoomDisplay = zoomDisplay;
    this.bindEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  makeZoomBtn(label, onClick) {
    var btn = document.createElement('button');
    btn.textContent = label;
    btn.style.cssText = 'background:#3a3a3a;color:#ccc;border:none;border-radius:3px;width:22px;height:22px;cursor:pointer;font-size:14px;line-height:1;padding:0;';
    btn.addEventListener('click', onClick);
    return btn;
  }
  setZoom(z) {
    this.zoom = Math.max(this.ZOOM_MIN, Math.min(this.ZOOM_MAX, z));
    var display = this._zoomDisplay;
    if (display) display.textContent = "".concat(Math.round(this.zoom * 100), "%");
    this.resize();
  }
  resize() {
    var containerRect = this.container.getBoundingClientRect();
    var tabBarH = this.tabBar.getBoundingClientRect().height || 28;
    var zoomBarH = 32;
    var availH = (containerRect.height || 500) - tabBarH - zoomBarH;
    var availW = containerRect.width || 300;

    // Base size: fit 9:16 into available space, then apply zoom
    var RATIO = 9 / 16;
    var baseW = availW;
    var baseH = baseW / RATIO;
    if (baseH > availH) {
      baseH = availH;
      baseW = baseH * RATIO;
    }
    var canvasW = Math.floor(baseW * this.zoom);
    var canvasH = Math.floor(canvasW / RATIO);
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.canvas.style.cssText = "background:#2d2d2d;cursor:crosshair;display:block;width:".concat(canvasW, "px;height:").concat(canvasH, "px;margin:0 auto;flex-shrink:0;");
    this.render();
  }

  /** Load elements and rebuild tab list */
  setElements(elements) {
    this.elements = elements;
    var tabSet = new Set();
    var _iterator = _createForOfIteratorHelper(elements),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        tabSet.add(el.tab);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this.tabs = Array.from(tabSet);
    if (this.tabs.length > 0 && !this.tabs.includes(this.currentTab)) {
      this.currentTab = this.tabs[0];
    }
    this.rebuildTabBar();
    this.render();
  }
  rebuildTabBar() {
    var _this = this;
    this.tabBar.innerHTML = '';
    var _iterator2 = _createForOfIteratorHelper(this.tabs),
      _step2;
    try {
      var _loop = function _loop() {
        var tab = _step2.value;
        var btn = document.createElement('button');
        btn.textContent = tab;
        btn.className = 'btn btn-sm ' + (tab === _this.currentTab ? 'btn-primary' : 'btn-outline-secondary');
        btn.style.cssText = 'font-size:11px;padding:2px 8px;white-space:nowrap;';
        btn.addEventListener('click', () => {
          _this.currentTab = tab;
          _this.rebuildTabBar();
          _this.render();
        });
        _this.tabBar.appendChild(btn);
      };
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  get visibleElements() {
    return this.elements.filter(el => el.tab === this.currentTab);
  }
  toPixel(pct, dimension) {
    return dimension === 'w' ? pct / 100 * this.canvas.width : pct / 100 * this.canvas.height;
  }
  toPct(px, dimension) {
    return dimension === 'w' ? px / this.canvas.width * 100 : px / this.canvas.height * 100;
  }
  getElementRect(el) {
    return {
      x: this.toPixel(el.x, 'w'),
      y: this.toPixel(el.y, 'h'),
      w: this.toPixel(el.w, 'w'),
      h: this.toPixel(el.h, 'h')
    };
  }
  overlaps(a, b) {
    if (a === b || a.tab !== b.tab) return false;
    return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
  }
  render() {
    var _this2 = this;
    var ctx = this.ctx,
      canvas = this.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background grid
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 0.5;
    for (var i = 0; i <= 10; i++) {
      var x = i / 10 * canvas.width;
      var y = i / 10 * canvas.height;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    var visible = this.visibleElements;
    var _iterator3 = _createForOfIteratorHelper(visible),
      _step3;
    try {
      var _loop2 = function _loop2() {
        var el = _step3.value;
        var _this2$getElementRect = _this2.getElementRect(el),
          x = _this2$getElementRect.x,
          y = _this2$getElementRect.y,
          w = _this2$getElementRect.w,
          h = _this2$getElementRect.h;
        var isSelected = el === _this2.selectedElement;
        var hasOverlap = visible.some(other => _this2.overlaps(el, other));
        ctx.fillStyle = "rgba(".concat(el.r, ",").concat(el.g, ",").concat(el.b, ",").concat(el.a / 255 * 0.6, ")");
        ctx.fillRect(x, y, w, h);
        if (hasOverlap) {
          ctx.fillStyle = 'rgba(255,60,60,0.35)';
          ctx.fillRect(x, y, w, h);
        }
        ctx.strokeStyle = isSelected ? '#4af' : "rgba(".concat(el.r, ",").concat(el.g, ",").concat(el.b, ",0.9)");
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = '#fff';
        ctx.font = "".concat(Math.max(9, Math.min(13, h * 0.35)), "px monospace");
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var lines = [el.type, el.paramPath.split('/').pop() || el.paramPath];
        var lineH = Math.max(9, Math.min(13, h * 0.35)) + 2;
        lines.forEach((line, i) => {
          ctx.fillText(line, x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * lineH, w - 4);
        });
        if (isSelected) {
          var handles = [{
            hx: x + w - 6,
            hy: y + h - 6
          }, {
            hx: x,
            hy: y + h - 6
          }, {
            hx: x + w - 6,
            hy: y
          }, {
            hx: x,
            hy: y
          }];
          ctx.fillStyle = '#4af';
          for (var _i = 0, _handles = handles; _i < _handles.length; _i++) {
            var _handles$_i = _handles[_i],
              hx = _handles$_i.hx,
              hy = _handles$_i.hy;
            ctx.fillRect(hx, hy, 6, 6);
          }
        }
      };
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  getElementAt(px, py) {
    var visible = this.visibleElements;
    for (var i = visible.length - 1; i >= 0; i--) {
      var el = visible[i];
      var _this$getElementRect = this.getElementRect(el),
        x = _this$getElementRect.x,
        y = _this$getElementRect.y,
        w = _this$getElementRect.w,
        h = _this$getElementRect.h;
      if (px >= x && px <= x + w && py >= y && py <= y + h) return el;
    }
    return null;
  }
  getResizeHandle(el, px, py) {
    var _this$getElementRect2 = this.getElementRect(el),
      x = _this$getElementRect2.x,
      y = _this$getElementRect2.y,
      w = _this$getElementRect2.w,
      h = _this$getElementRect2.h;
    var tol = 8;
    if (px >= x + w - tol && py >= y + h - tol) return 'br';
    if (px <= x + tol && py >= y + h - tol) return 'bl';
    if (px >= x + w - tol && py <= y + tol) return 'tr';
    if (px <= x + tol && py <= y + tol) return 'tl';
    return null;
  }
  bindEvents() {
    this.canvas.addEventListener('mousedown', e => {
      var rect = this.canvas.getBoundingClientRect();
      var scaleX = this.canvas.width / rect.width;
      var scaleY = this.canvas.height / rect.height;
      var px = (e.clientX - rect.left) * scaleX;
      var py = (e.clientY - rect.top) * scaleY;
      var el = this.getElementAt(px, py);
      this.selectedElement = el;
      if (el) {
        var handle = this.getResizeHandle(el, px, py);
        if (handle) {
          this.resizing = {
            el,
            handle,
            startX: px,
            startY: py,
            origX: el.x,
            origY: el.y,
            origW: el.w,
            origH: el.h
          };
        } else {
          this.dragging = {
            el,
            startX: px,
            startY: py,
            origX: el.x,
            origY: el.y
          };
        }
      }
      this.render();
    });
    this.canvas.addEventListener('mousemove', e => {
      var rect = this.canvas.getBoundingClientRect();
      var scaleX = this.canvas.width / rect.width;
      var scaleY = this.canvas.height / rect.height;
      var px = (e.clientX - rect.left) * scaleX;
      var py = (e.clientY - rect.top) * scaleY;
      if (this.dragging) {
        var _this$onChange;
        var _this$dragging = this.dragging,
          el = _this$dragging.el,
          startX = _this$dragging.startX,
          startY = _this$dragging.startY,
          origX = _this$dragging.origX,
          origY = _this$dragging.origY;
        var dx = this.toPct(px - startX, 'w');
        var dy = this.toPct(py - startY, 'h');
        el.x = Math.max(0, Math.min(100 - el.w, origX + dx));
        el.y = Math.max(0, Math.min(100 - el.h, origY + dy));
        this.render();
        (_this$onChange = this.onChange) === null || _this$onChange === void 0 || _this$onChange.call(this, el, el.x, el.y, el.w, el.h);
      } else if (this.resizing) {
        var _this$onChange2;
        var _this$resizing = this.resizing,
          _el = _this$resizing.el,
          handle = _this$resizing.handle,
          _startX = _this$resizing.startX,
          _startY = _this$resizing.startY,
          _origX = _this$resizing.origX,
          _origY = _this$resizing.origY,
          origW = _this$resizing.origW,
          origH = _this$resizing.origH;
        var _dx = this.toPct(px - _startX, 'w');
        var _dy = this.toPct(py - _startY, 'h');
        if (handle.includes('r')) _el.w = Math.max(2, origW + _dx);
        if (handle.includes('b')) _el.h = Math.max(2, origH + _dy);
        if (handle.includes('l')) {
          _el.x = Math.min(_origX + origW - 2, _origX + _dx);
          _el.w = Math.max(2, origW - _dx);
        }
        if (handle.includes('t')) {
          _el.y = Math.min(_origY + origH - 2, _origY + _dy);
          _el.h = Math.max(2, origH - _dy);
        }
        _el.x = Math.max(0, _el.x);
        _el.y = Math.max(0, _el.y);
        _el.w = Math.min(100 - _el.x, _el.w);
        _el.h = Math.min(100 - _el.y, _el.h);
        this.render();
        (_this$onChange2 = this.onChange) === null || _this$onChange2 === void 0 || _this$onChange2.call(this, _el, _el.x, _el.y, _el.w, _el.h);
      }
    });

    // Scroll wheel zoom
    this.canvas.addEventListener('wheel', e => {
      e.preventDefault();
      var delta = e.deltaY < 0 ? this.ZOOM_STEP : -this.ZOOM_STEP;
      this.setZoom(this.zoom + delta);
    }, {
      passive: false
    });
    var endDrag = () => {
      this.dragging = null;
      this.resizing = null;
    };
    this.canvas.addEventListener('mouseup', endDrag);
    this.canvas.addEventListener('mouseleave', endDrag);
  }
  getSelectedElement() {
    return this.selectedElement;
  }
  getCurrentTab() {
    return this.currentTab;
  }
  getTabs() {
    return this.tabs;
  }

  // ── Quick-add popover ─────────────────────────────────────────────────────

  toggleAddPopover(anchor) {
    if (this.addPopover) {
      this.closeAddPopover();
      return;
    }

    // Extract existing DSP param labels from code (handles all label formats)
    var existingParams = [];
    var readonlyParams = new Set();
    if (this.getCode) {
      var parsed = (0,_parseParams__WEBPACK_IMPORTED_MODULE_2__/* .parseParams */ .S)(this.getCode());

      // Task 3.2 & 3.5: Filter to only show used parameters
      // Get compiled JSON if available
      var dspJson = this.getDspJson ? this.getDspJson() : null;
      var paramsWithMeta = parsed.map((p, id) => ({
        id,
        address: p.paramPath,
        min: 0,
        max: 1,
        init: 0
      }));
      var _effectiveParams = (0,_parameterFiltering__WEBPACK_IMPORTED_MODULE_3__/* .effectiveParams */ .K6)(paramsWithMeta, dspJson),
        filteredParams = _effectiveParams.params;
      var _iterator4 = _createForOfIteratorHelper(filteredParams),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _step4.value,
            address = _step4$value.address,
            sourceAddress = _step4$value.sourceAddress,
            sourceWritable = _step4$value.sourceWritable;
          var writePath = sourceAddress || address;
          if (!existingParams.includes(writePath)) existingParams.push(writePath);
          if (sourceWritable === false) readonlyParams.add(writePath);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    // Also include params already on canvas (may have paths not in code yet)
    var _iterator5 = _createForOfIteratorHelper(this.elements),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var el = _step5.value;
        if (!existingParams.includes(el.paramPath)) existingParams.push(el.paramPath);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    var popover = document.createElement('div');
    popover.style.cssText = ['position:absolute;z-index:1000;background:#252526;border:1px solid #4af;border-radius:5px;', 'padding:10px 12px;width:260px;box-shadow:0 4px 16px rgba(0,0,0,0.5);font-size:12px;color:#ccc;'].join('');
    var anchorRect = anchor.getBoundingClientRect();
    var containerRect = this.container.getBoundingClientRect();
    popover.style.top = "".concat(anchorRect.bottom - containerRect.top + 4, "px");
    popover.style.right = '8px';
    var title = document.createElement('div');
    title.textContent = '＋ Add SHCUI Element';
    title.style.cssText = 'font-weight:bold;color:#4af;margin-bottom:8px;font-size:12px;';
    popover.appendChild(title);
    var makeRow = (label, input) => {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:6px;';
      var lbl = document.createElement('span');
      lbl.textContent = label;
      lbl.style.cssText = 'width:60px;flex-shrink:0;color:#aaa;font-size:11px;';
      row.appendChild(lbl);
      row.appendChild(input);
      popover.appendChild(row);
    };

    // ── Param: datalist for existing + free text for new ─────────────────
    var datalistId = "shcui-params-".concat(Date.now());
    var datalist = document.createElement('datalist');
    datalist.id = datalistId;

    // Section header options (non-selectable visual separators via disabled options)
    if (existingParams.length > 0) {
      var grpExisting = document.createElement('optgroup');
      // datalist doesn't support optgroup well, so just add all as options
      var _iterator6 = _createForOfIteratorHelper(existingParams),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var p = _step6.value;
          var opt = document.createElement('option');
          opt.value = p;
          opt.textContent = readonlyParams.has(p) ? "".concat(p, " (not editable)") : p;
          datalist.appendChild(opt);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
    popover.appendChild(datalist);
    var paramWrap = document.createElement('div');
    paramWrap.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:3px;';
    var pathInput = document.createElement('input');
    pathInput.type = 'text';
    pathInput.setAttribute('list', datalistId);
    pathInput.placeholder = existingParams.length > 0 ? 'Pick or type new param…' : 'e.g. freq';
    pathInput.style.cssText = 'width:100%;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 5px;font-size:11px;box-sizing:border-box;';

    // Hint below input
    var hint = document.createElement('div');
    hint.style.cssText = 'font-size:10px;color:#555;';
    var updateParamHint = () => {
      var selected = pathInput.value.trim();
      if (readonlyParams.has(selected)) {
        hint.style.color = '#fa4';
        hint.textContent = 'This parameter comes from imported/compiled UI and cannot be edited because its label is not in the current DSP file.';
      } else {
        hint.style.color = '#555';
        hint.textContent = existingParams.length > 0 ? "".concat(existingParams.length, " param(s) found in DSP \u2014 or type a new name") : 'No params found in DSP — type a new param name';
      }
    };
    pathInput.addEventListener('input', updateParamHint);
    updateParamHint();
    paramWrap.appendChild(pathInput);
    paramWrap.appendChild(hint);
    var paramRow = document.createElement('div');
    paramRow.style.cssText = 'display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;';
    var paramLbl = document.createElement('span');
    paramLbl.textContent = 'Param';
    paramLbl.style.cssText = 'width:60px;flex-shrink:0;color:#aaa;font-size:11px;padding-top:4px;';
    paramRow.appendChild(paramLbl);
    paramRow.appendChild(paramWrap);
    popover.appendChild(paramRow);

    // ── Type selector ─────────────────────────────────────────────────────
    var typeSelect = document.createElement('select');
    typeSelect.style.cssText = 'flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 5px;font-size:11px;';
    var _iterator7 = _createForOfIteratorHelper(_types__WEBPACK_IMPORTED_MODULE_1__/* .SHCUI_TYPES */ .J),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var t = _step7.value;
        var _opt = document.createElement('option');
        _opt.value = t;
        _opt.textContent = t;
        typeSelect.appendChild(_opt);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    makeRow('Type', typeSelect);

    // ── Tab input ─────────────────────────────────────────────────────────
    var tabInput = document.createElement('input');
    tabInput.type = 'text';
    tabInput.value = this.currentTab || 'main';
    tabInput.style.cssText = 'flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 5px;font-size:11px;';
    // Datalist for existing tabs
    var tabDatalistId = "shcui-tabs-".concat(Date.now());
    var tabDatalist = document.createElement('datalist');
    tabDatalist.id = tabDatalistId;
    var _iterator8 = _createForOfIteratorHelper(this.tabs),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var tab = _step8.value;
        var _opt2 = document.createElement('option');
        _opt2.value = tab;
        tabDatalist.appendChild(_opt2);
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    tabInput.setAttribute('list', tabDatalistId);
    popover.appendChild(tabDatalist);
    makeRow('Tab', tabInput);
    var errMsg = document.createElement('div');
    errMsg.style.cssText = 'color:#f44;font-size:10px;min-height:14px;margin-bottom:4px;';
    popover.appendChild(errMsg);

    // ── Buttons ───────────────────────────────────────────────────────────
    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:6px;justify-content:flex-end;';
    var cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = 'background:#3a3a3a;color:#aaa;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;';
    cancelBtn.addEventListener('click', () => this.closeAddPopover());
    var placeBtn = document.createElement('button');
    placeBtn.textContent = '▶ Place';
    placeBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;';
    placeBtn.addEventListener('click', () => {
      var _this$onAdd;
      var path = pathInput.value.trim();
      if (!path) {
        errMsg.textContent = 'Param path is required';
        return;
      }
      if (readonlyParams.has(path)) {
        errMsg.textContent = 'This imported/compiled UI parameter is not editable in the current DSP file.';
        return;
      }
      var tab = tabInput.value.trim() || 'main';
      var newEl = {
        paramPath: path,
        tab,
        type: typeSelect.value,
        x: 40,
        y: 45,
        w: 20,
        h: 10,
        r: 100,
        g: 150,
        b: 255,
        a: 200
      };
      this.elements.push(newEl);
      if (!this.tabs.includes(tab)) {
        this.tabs.push(tab);
      }
      this.currentTab = tab;
      this.rebuildTabBar();
      this.selectedElement = newEl;
      this.render();
      (_this$onAdd = this.onAdd) === null || _this$onAdd === void 0 || _this$onAdd.call(this, newEl);
      this.closeAddPopover();
    });
    btnRow.appendChild(cancelBtn);
    btnRow.appendChild(placeBtn);
    popover.appendChild(btnRow);
    var outsideClick = e => {
      if (!popover.contains(e.target) && e.target !== anchor) {
        this.closeAddPopover();
        document.removeEventListener('mousedown', outsideClick);
      }
    };
    setTimeout(() => document.addEventListener('mousedown', outsideClick), 0);
    this.addPopover = popover;
    if (!this.container.style.position || this.container.style.position === 'static') {
      this.container.style.position = 'relative';
    }
    this.container.appendChild(popover);
    pathInput.focus();
  }
  closeAddPopover() {
    if (this.addPopover) {
      this.addPopover.remove();
      this.addPopover = null;
    }
  }
}

/***/ },

/***/ 66328
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ DSPMetadataEditor)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54705);
/* harmony import */ var _SHCUIParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14954);
/* harmony import */ var _MotionParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22858);



class DSPMetadataEditor {
  constructor() {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "shcuiParser", new _SHCUIParser__WEBPACK_IMPORTED_MODULE_1__/* .SHCUIParser */ .k());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "motionParser", new _MotionParser__WEBPACK_IMPORTED_MODULE_2__/* .MotionParser */ .E());
  }
  maskComments(dspCode) {
    var masked = '';
    var state = 'code';
    var escaped = false;
    for (var i = 0; i < dspCode.length; i++) {
      var ch = dspCode[i];
      var next = dspCode[i + 1];
      if (state === 'lineComment') {
        if (ch === '\n') {
          state = 'code';
          masked += ch;
        } else {
          masked += ' ';
        }
        continue;
      }
      if (state === 'blockComment') {
        if (ch === '*' && next === '/') {
          masked += '  ';
          i++;
          state = 'code';
        } else {
          masked += ch === '\n' ? ch : ' ';
        }
        continue;
      }
      if (state === 'string') {
        masked += ch;
        if (escaped) {
          escaped = false;
        } else if (ch === '\\') {
          escaped = true;
        } else if (ch === '"') {
          state = 'code';
        }
        continue;
      }
      if (ch === '/' && next === '/') {
        masked += '  ';
        i++;
        state = 'lineComment';
      } else if (ch === '/' && next === '*') {
        masked += '  ';
        i++;
        state = 'blockComment';
      } else {
        masked += ch;
        if (ch === '"') state = 'string';
      }
    }
    return masked;
  }
  findLabelIndex(dspCode, paramPath) {
    var escaped = paramPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp("\"(".concat(escaped, "[^\"]*)\""), 'g');
    var match = regex.exec(this.maskComments(dspCode));
    if (!match) return null;
    return {
      start: match.index + 1,
      end: match.index + match[0].length - 1,
      label: dspCode.slice(match.index + 1, match.index + match[0].length - 1)
    };
  }
  upsertMeta(label, tagName, newValue) {
    var tagRegex = new RegExp("\\[".concat(tagName, ":[^\\]]*\\]"), 'g');
    if (tagRegex.test(label)) return label.replace(new RegExp("\\[".concat(tagName, ":[^\\]]*\\]")), "[".concat(tagName, ": ").concat(newValue, "]"));
    return label.trimEnd() + " [".concat(tagName, ": ").concat(newValue, "]");
  }
  removeMeta(label, tagName) {
    return label.replace(new RegExp("\\s*\\[".concat(tagName, ":[^\\]]*\\]"), 'g'), '').trimEnd();
  }
  applyToLabel(dspCode, paramPath, transform) {
    var found = this.findLabelIndex(dspCode, paramPath);
    if (!found) return dspCode;
    return dspCode.slice(0, found.start) + transform(found.label) + dspCode.slice(found.end);
  }
  upsertSHCUI(dspCode, paramPath, element) {
    var value = this.shcuiParser.serialize(element).replace(/^\[SHCUI:\s*/, '').replace(/\]$/, '');
    return this.applyToLabel(dspCode, paramPath, label => this.upsertMeta(label, 'SHCUI', value));
  }
  removeSHCUI(dspCode, paramPath) {
    return this.applyToLabel(dspCode, paramPath, label => this.removeMeta(label, 'SHCUI'));
  }
  upsertMotion(dspCode, paramPath, mapping) {
    var value = this.motionParser.serialize(mapping).replace(/^\[(acc|gyr):\s*/, '').replace(/\]$/, '');
    return this.applyToLabel(dspCode, paramPath, label => this.upsertMeta(label, mapping.sensor, value));
  }
  removeMotion(dspCode, paramPath, sensor) {
    return this.applyToLabel(dspCode, paramPath, label => this.removeMeta(label, sensor));
  }
  upsertMotionLink(dspCode, paramPath, motionLibAddress) {
    return this.applyToLabel(dspCode, paramPath, label => this.upsertMeta(label, 'motion', motionLibAddress));
  }
  removeMotionLink(dspCode, paramPath) {
    return this.applyToLabel(dspCode, paramPath, label => this.removeMeta(label, 'motion'));
  }
  readMotionLink(dspCode, paramPath) {
    var found = this.findLabelIndex(dspCode, paramPath);
    if (!found) return null;
    var match = found.label.match(/\[motion:\s*([^\]]+)\]/);
    return match ? match[1].trim() : null;
  }
  upsertShowName(dspCode, paramPath, showName) {
    return this.applyToLabel(dspCode, paramPath, label => this.upsertMeta(label, 'showName', showName));
  }
  removeShowName(dspCode, paramPath) {
    return this.applyToLabel(dspCode, paramPath, label => this.removeMeta(label, 'showName'));
  }
  upsertCueManager(dspCode, cueEntries) {
    var content = cueEntries.map(e => "".concat(e.index, ":'").concat(e.tip, "'")).join('; ');
    var newMeta = "[touchCueManager: {".concat(content, "}]");

    // Try to find the trigCue param label and add/update inline metadata there
    var trigCueLabelRegex = /"([^"]*\[SHCUI:[^\]]*trigCue[^\]]*\][^"]*)"/;
    var match = trigCueLabelRegex.exec(this.maskComments(dspCode));
    if (match) {
      var oldLabel = dspCode.slice(match.index + 1, match.index + match[0].length - 1);
      // Remove existing touchCueManager metadata if present
      var cleanLabel = oldLabel.replace(/\s*\[touchCueManager:[^\]]*\]/g, '').trimEnd();
      var newLabel = cleanLabel + ' ' + newMeta;
      return dspCode.slice(0, match.index) + "\"".concat(newLabel, "\"") + dspCode.slice(match.index + match[0].length);
    }

    // Fallback: use declare statement (legacy / no trigCue param found)
    var declContent = cueEntries.map(e => "".concat(e.index, ":").concat(e.tip)).join('; ');
    var newDecl = "declare touchCueManager \"{".concat(declContent, "}\";");
    var existingRegex = /declare\s+touchCueManager\s+"[^"]*"\s*;/;
    if (existingRegex.test(dspCode)) return dspCode.replace(existingRegex, newDecl);
    return newDecl + '\n' + dspCode;
  }
}

/***/ },

/***/ 67804
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K6: () => (/* binding */ effectiveParams)
/* harmony export */ });
/* unused harmony exports extractUsedParamsFromJson, paramsFromDspJson, filterUsedParams */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54705);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47075);


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * parameterFiltering.ts
 * 
 * Task 3.1 & 3.2: Usage detection and parameter filtering
 * 
 * This module provides functions to detect which parameters are actually used
 * in the compiled DSP (appear in compiled JSON) and filter out unused parameters
 * from editable lists.
 */

/**
 * Extract parameter paths from compiled Faust JSON.
 * These are the parameters that survived compilation (actually used in DSP).
 * 
 * Task 3.1: Usage detection function
 * 
 * @param dspJson - Compiled Faust JSON descriptor
 * @returns Set of parameter paths that appear in compiled JSON
 */
/**
 * Normalize a parameter path for comparison.
 * Handles different path formats:
 * - FaustPiece format: "h:grain/density" → "grain/density"
 * - Compiled JSON format: "/GranularSynth3/grain/density" → "grain/density"
 * 
 * @param path - Parameter path to normalize
 * @returns Normalized path (group/param format)
 */
function normalizeParamPath(path) {
  // Remove leading group prefix (h:, v:, t:, etc.)
  var normalized = path.replace(/^[a-z]:/i, '');

  // Remove leading slash and DSP name prefix (/DspName/...)
  normalized = normalized.replace(/^\/[^/]+\//, '');

  // Remove leading slash if still present
  normalized = normalized.replace(/^\//, '');
  return normalized.toLowerCase().trim();
}
function extractUsedParamsFromJson(dspJson) {
  var _parsedJson;
  var usedParams = new Set();

  // Parse JSON string if needed
  var parsedJson = dspJson;
  if (typeof dspJson === 'string') {
    try {
      parsedJson = JSON.parse(dspJson);
    } catch (e) {
      console.error('[extractUsedParamsFromJson] Failed to parse JSON:', e);
      return usedParams;
    }
  }
  function collectParams(items) {
    var _iterator = _createForOfIteratorHelper(items || []),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (!item || typeof item !== 'object') continue;

        // Recursively process groups
        if (item.items) {
          collectParams(item.items);
          continue;
        }

        // Check if this is a control widget
        var type = item.type;
        var isControl = ['hslider', 'vslider', 'nentry', 'button', 'checkbox', 'hbargraph', 'vbargraph'].includes(type);
        if (isControl && item.address) {
          // Normalize the path before adding to set
          var normalizedPath = normalizeParamPath(item.address);
          usedParams.add(normalizedPath);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  collectParams(((_parsedJson = parsedJson) === null || _parsedJson === void 0 ? void 0 : _parsedJson.ui) || []);
  return usedParams;
}

/**
 * Enumerate runtime DSP parameters directly from compiled Faust JSON.
 * This is the authoritative list after Faust has expanded imports and
 * discarded controls that are not part of the compiled DSP UI.
 */
function paramsFromDspJson(dspJson) {
  var _parsedJson2;
  if (!dspJson) return [];
  var parsedJson = dspJson;
  if (typeof dspJson === 'string') {
    try {
      parsedJson = JSON.parse(dspJson);
    } catch (e) {
      console.error('[paramsFromDspJson] Failed to parse JSON:', e);
      return [];
    }
  }
  var params = [];
  var fallbackId = 0;
  function getMetaValue(meta, key) {
    if (!meta) return undefined;
    var _iterator2 = _createForOfIteratorHelper(meta),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var entry = _step2.value;
        if (key in entry) return entry[key];
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return undefined;
  }
  function collectParams(items) {
    var _iterator3 = _createForOfIteratorHelper(items || []),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var item = _step3.value;
        if (!item || typeof item !== 'object') continue;
        if (item.items) {
          collectParams(item.items);
          continue;
        }
        var type = item.type;
        var isControl = ['hslider', 'vslider', 'nentry', 'button', 'checkbox', 'hbargraph', 'vbargraph'].includes(type);
        if (isControl && item.address) {
          var _item$index, _item$min, _item$max, _item$init;
          params.push({
            id: (_item$index = item.index) !== null && _item$index !== void 0 ? _item$index : fallbackId,
            address: item.address,
            min: (_item$min = item.min) !== null && _item$min !== void 0 ? _item$min : 0,
            max: (_item$max = item.max) !== null && _item$max !== void 0 ? _item$max : 1,
            init: (_item$init = item.init) !== null && _item$init !== void 0 ? _item$init : 0,
            accMeta: getMetaValue(item.meta, 'acc'),
            gyrMeta: getMetaValue(item.meta, 'gyr'),
            motionMeta: getMetaValue(item.meta, 'motion'),
            showNameMeta: getMetaValue(item.meta, 'showName')
          });
          fallbackId++;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  collectParams(((_parsedJson2 = parsedJson) === null || _parsedJson2 === void 0 ? void 0 : _parsedJson2.ui) || []);
  return params;
}

/**
 * Prefer compiled Faust JSON when present; fall back to source-derived params
 * only before compilation has produced an authoritative UI descriptor.
 */
function effectiveParams(sourceParams, dspJson) {
  var compiledParams = paramsFromDspJson(dspJson);
  if (compiledParams.length > 0) {
    var sourceByPath = new Map(sourceParams.map(p => [normalizeParamPath(p.address), p.address]));
    var findSourceAddress = address => {
      var normalized = normalizeParamPath(address);
      var exact = sourceByPath.get(normalized);
      if (exact) return exact;
      var _iterator4 = _createForOfIteratorHelper(sourceByPath.entries()),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(_step4.value, 2),
            sourcePath = _step4$value[0],
            sourceAddress = _step4$value[1];
          if (normalized.endsWith("/".concat(sourcePath)) || sourcePath.endsWith("/".concat(normalized))) {
            return sourceAddress;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var lastSegment = normalized.split('/').pop();
      var lastSegmentMatches = Array.from(sourceByPath.entries()).filter(_ref => {
        var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(_ref, 1),
          sourcePath = _ref2[0];
        return sourcePath.split('/').pop() === lastSegment;
      });
      if (lastSegmentMatches.length === 1) return lastSegmentMatches[0][1];
      return undefined;
    };
    return {
      params: compiledParams.map(param => {
        var sourceAddress = findSourceAddress(param.address);
        return _objectSpread(_objectSpread({}, param), {}, {
          sourceAddress,
          sourceWritable: !!sourceAddress
        });
      }),
      hiddenCount: Math.max(0, sourceParams.length - compiledParams.length),
      fromCompiledJson: true
    };
  }
  var _filterUsedParams = filterUsedParams(sourceParams, dspJson),
    usedParams = _filterUsedParams.usedParams,
    hiddenCount = _filterUsedParams.hiddenCount;
  return {
    params: usedParams.map(param => _objectSpread(_objectSpread({}, param), {}, {
      sourceWritable: true
    })),
    hiddenCount,
    fromCompiledJson: false
  };
}

/**
 * Filter parameters to only include those that are used in compiled JSON.
 * 
 * Task 3.2: Parameter list filtering logic
 * 
 * @param declaredParams - Array of declared parameters from DSP source
 * @param dspJson - Compiled Faust JSON descriptor (null if not compiled)
 * @returns Object with filtered params and count of hidden parameters
 */
function filterUsedParams(declaredParams, dspJson) {
  // If no compiled JSON available, show all parameters (compilation not complete)
  if (!dspJson) {
    return {
      usedParams: declaredParams,
      hiddenCount: 0
    };
  }
  var usedParamPaths = extractUsedParamsFromJson(dspJson);
  console.log('[filterUsedParams] Declared param paths:', declaredParams.map(p => p.address));
  console.log('[filterUsedParams] Used param paths from compiled JSON:', Array.from(usedParamPaths));

  // Filter to only include parameters that appear in compiled JSON
  // Normalize both paths for comparison
  var usedParams = declaredParams.filter(p => {
    var normalizedDeclared = normalizeParamPath(p.address);
    var isUsed = usedParamPaths.has(normalizedDeclared);
    if (!isUsed) {
      console.log("[filterUsedParams] Filtering out unused param: \"".concat(p.address, "\" (normalized: \"").concat(normalizedDeclared, "\")"));
    }
    return isUsed;
  });
  var hiddenCount = declaredParams.length - usedParams.length;
  return {
    usedParams,
    hiddenCount
  };
}

/***/ },

/***/ 87526
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ SHCUI_TYPES)
/* harmony export */ });
// SHCUI types

var SHCUI_TYPES = ['button', 'checkbox', 'hslider', 'vslider', 'hbargraph', 'vbargraph', 'pad', 'trigCue', 'nextCue', 'prevCue', 'initCue', 'trigCounter', 'setRef'];

/***/ },

/***/ 94162
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ PropertyPanel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54705);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87526);

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

class PropertyPanel {
  constructor(options) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "container", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "currentElement", null);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "onUpdate", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "onAdd", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(this, "onDelete", void 0);
    this.container = options.container;
    this.onUpdate = options.onUpdate;
    this.onAdd = options.onAdd;
    this.onDelete = options.onDelete;
    this.container.style.cssText = 'padding:8px;overflow-y:auto;font-size:12px;color:#ccc;background:#252526;';
    this.renderEmpty();
  }
  renderEmpty() {
    this.container.innerHTML = '<div style="color:#888;padding:8px;">Select an element on the canvas to edit its properties.</div>';
  }
  setElement(element) {
    this.currentElement = element;
    if (!element) {
      this.renderEmpty();
      return;
    }
    this.renderForm(element);
  }
  field(label, input) {
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;margin-bottom:4px;gap:6px;';
    var lbl = document.createElement('label');
    lbl.textContent = label;
    lbl.style.cssText = 'width:70px;flex-shrink:0;color:#aaa;';
    row.appendChild(lbl);
    row.appendChild(input);
    return row;
  }
  numInput(value, min, max, onChange) {
    var inp = document.createElement('input');
    inp.type = 'number';
    inp.value = String(value);
    inp.min = String(min);
    inp.max = String(max);
    inp.style.cssText = 'width:60px;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;';
    inp.addEventListener('input', () => onChange(parseFloat(inp.value) || 0));
    return inp;
  }
  textInput(value, onChange) {
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.value = value;
    inp.style.cssText = 'flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;';
    inp.addEventListener('input', () => onChange(inp.value));
    return inp;
  }
  selectInput(value, options, onChange) {
    var sel = document.createElement('select');
    sel.style.cssText = 'flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;';
    var _iterator = _createForOfIteratorHelper(options),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var opt = _step.value;
        var o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        if (opt === value) o.selected = true;
        sel.appendChild(o);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    sel.addEventListener('change', () => onChange(sel.value));
    return sel;
  }
  renderForm(el) {
    this.container.innerHTML = '';
    var title = document.createElement('div');
    title.textContent = 'SHCUI Element';
    title.style.cssText = 'font-weight:bold;margin-bottom:8px;color:#4af;font-size:13px;';
    this.container.appendChild(title);
    var notify = () => {
      var _this$onUpdate;
      return (_this$onUpdate = this.onUpdate) === null || _this$onUpdate === void 0 ? void 0 : _this$onUpdate.call(this, el);
    };

    // paramPath (read-only display)
    var pathDiv = document.createElement('div');
    pathDiv.style.cssText = 'margin-bottom:6px;color:#888;font-size:11px;word-break:break-all;';
    pathDiv.textContent = "Path: ".concat(el.paramPath);
    this.container.appendChild(pathDiv);

    // Tab
    this.container.appendChild(this.field('Tab', this.textInput(el.tab, v => {
      el.tab = v;
      notify();
    })));
    // Type
    this.container.appendChild(this.field('Type', this.selectInput(el.type, _types__WEBPACK_IMPORTED_MODULE_1__/* .SHCUI_TYPES */ .J, v => {
      el.type = v;
      notify();
    })));

    // Position/Size
    var posTitle = document.createElement('div');
    posTitle.textContent = 'Position & Size (0–100)';
    posTitle.style.cssText = 'color:#888;font-size:11px;margin:6px 0 2px;';
    this.container.appendChild(posTitle);
    var posRow = document.createElement('div');
    posRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:4px;';
    var addPosField = (label, val, setter) => {
      var wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;align-items:center;gap:4px;';
      var lbl = document.createElement('span');
      lbl.textContent = label;
      lbl.style.cssText = 'width:16px;color:#aaa;font-size:11px;';
      wrap.appendChild(lbl);
      wrap.appendChild(this.numInput(val, 0, 100, v => {
        setter(v);
        notify();
      }));
      posRow.appendChild(wrap);
    };
    addPosField('X', el.x, v => el.x = v);
    addPosField('Y', el.y, v => el.y = v);
    addPosField('W', el.w, v => el.w = v);
    addPosField('H', el.h, v => el.h = v);
    this.container.appendChild(posRow);

    // Color
    var colorTitle = document.createElement('div');
    colorTitle.textContent = 'Color (R G B A, 0–255)';
    colorTitle.style.cssText = 'color:#888;font-size:11px;margin:6px 0 2px;';
    this.container.appendChild(colorTitle);
    var colorRow = document.createElement('div');
    colorRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px;';
    var addColorField = (label, val, setter) => {
      var wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;align-items:center;gap:4px;';
      var lbl = document.createElement('span');
      lbl.textContent = label;
      lbl.style.cssText = 'width:16px;color:#aaa;font-size:11px;';
      wrap.appendChild(lbl);
      wrap.appendChild(this.numInput(val, 0, 255, v => {
        setter(v);
        notify();
      }));
      colorRow.appendChild(wrap);
    };
    addColorField('R', el.r, v => el.r = v);
    addColorField('G', el.g, v => el.g = v);
    addColorField('B', el.b, v => el.b = v);
    addColorField('A', el.a, v => el.a = v);
    this.container.appendChild(colorRow);

    // Color preview
    var preview = document.createElement('div');
    preview.style.cssText = "width:100%;height:20px;border-radius:3px;margin-bottom:8px;background:rgba(".concat(el.r, ",").concat(el.g, ",").concat(el.b, ",").concat(el.a / 255, ");border:1px solid #555;");
    this.container.appendChild(preview);

    // Delete button
    var delBtn = document.createElement('button');
    delBtn.textContent = '✕ Remove SHCUI';
    delBtn.style.cssText = 'width:100%;background:#5a2020;color:#fff;border:none;border-radius:3px;padding:4px;cursor:pointer;font-size:11px;';
    delBtn.addEventListener('click', () => {
      var _this$onDelete;
      return (_this$onDelete = this.onDelete) === null || _this$onDelete === void 0 ? void 0 : _this$onDelete.call(this, el);
    });
    this.container.appendChild(delBtn);
  }

  /** Update position/size from canvas drag (without re-rendering full form) */
  updatePosition(x, y, w, h) {
    if (!this.currentElement) return;
    this.currentElement.x = x;
    this.currentElement.y = y;
    this.currentElement.w = w;
    this.currentElement.h = h;
    // Re-render to sync inputs
    this.renderForm(this.currentElement);
  }
}

/***/ },

/***/ 95526
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ parseParams)
/* harmony export */ });
/**
 * parseParams.ts
 *
 * Robust DSP parameter extraction from Faust source code.
 *
 * Handles all label formats:
 *   "freq"                          → paramPath: "freq"
 *   "[3]Resonance[acc:2 1 -10 0 12]" → paramPath: "[3]Resonance"  (display: "Resonance")
 *   "h:[1]Instrument Hands/1 (Note %b)[acc:...]" → paramPath: "h:[1]Instrument Hands/1 (Note %b)"
 *   "Wah Wah[acc:0 1 -10 0 10]"    → paramPath: "Wah Wah"
 *
 * The paramPath is the full label text BEFORE the first metadata block,
 * which is what DSPMetadataEditor uses to locate the label in the source.
 */

function maskComments(code) {
  var masked = '';
  var state = 'code';
  var escaped = false;
  for (var i = 0; i < code.length; i++) {
    var ch = code[i];
    var next = code[i + 1];
    if (state === 'lineComment') {
      if (ch === '\n') {
        state = 'code';
        masked += ch;
      } else {
        masked += ' ';
      }
      continue;
    }
    if (state === 'blockComment') {
      if (ch === '*' && next === '/') {
        masked += '  ';
        i++;
        state = 'code';
      } else {
        masked += ch === '\n' ? ch : ' ';
      }
      continue;
    }
    if (state === 'string') {
      masked += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        state = 'code';
      }
      continue;
    }
    if (ch === '/' && next === '/') {
      masked += '  ';
      i++;
      state = 'lineComment';
    } else if (ch === '/' && next === '*') {
      masked += '  ';
      i++;
      state = 'blockComment';
    } else {
      masked += ch;
      if (ch === '"') state = 'string';
    }
  }
  return masked;
}

/**
 * Extract all DSP UI parameters from Faust source code.
 * Masks comments first, then finds all hslider/vslider/button/etc. labels.
 */
function parseParams(code) {
  var stripped = maskComments(code);
  var results = [];
  var seen = new Set();

  // Match the full label string inside the first string argument of any UI widget
  // The label can contain anything including [ ] metadata blocks
  var widgetRegex = /(?:hslider|vslider|button|checkbox|nentry|hbargraph|vbargraph)\s*\(\s*"((?:[^"\\]|\\.)*)"/g;
  var m;
  while ((m = widgetRegex.exec(stripped)) !== null) {
    var fullLabel = m[1];

    // paramPath = everything before the first [ metadata block
    // e.g. "[3]Resonance[acc:...]" → "[3]Resonance"
    // e.g. "Wah Wah[acc:...]"      → "Wah Wah"
    // e.g. "h:[1]Hands/1[acc:...]" → "h:[1]Hands/1"
    // Metadata blocks contain a colon: [key:value]. Ordering prefixes [1],[2] do NOT.
    var metaStart = fullLabel.search(/\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)[^\]]*\]/);
    var paramPath = metaStart !== -1 ? fullLabel.slice(0, metaStart).trimEnd() : fullLabel;
    if (!paramPath || seen.has(paramPath)) continue;
    seen.add(paramPath);

    // displayName: strip leading [N] ordering prefix and group path separators
    // "[3]Resonance" → "Resonance"
    // "h:[1]Instrument Hands/1 (Note %b)" → "Instrument Hands/1 (Note %b)"
    var displayName = paramPath.replace(/^(?:[a-z]:\s*)?(?:\[[^\]]*\])+\s*/i, '') // strip leading [N] or h:[N]
    .replace(/^[a-z]:\s*/i, '') // strip remaining group prefix like "h:"
    .trim();
    if (!displayName) displayName = paramPath;
    results.push({
      paramPath,
      displayName,
      fullLabel
    });
  }
  return results;
}

/***/ }

}]);
//# sourceMappingURL=d7f433dca9805083a2b0.js.map