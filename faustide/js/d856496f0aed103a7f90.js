"use strict";
(self["webpackChunkfausteditorweb"] = self["webpackChunkfausteditorweb"] || []).push([[5873],{

/***/ 95873
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  EditorPanel: () => (/* binding */ EditorPanel)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 5 modules
var slicedToArray = __webpack_require__(47075);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(10467);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(54705);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(54756);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./src/faustpiece/SHCUICanvas.ts
var SHCUICanvas = __webpack_require__(57841);
// EXTERNAL MODULE: ./src/faustpiece/PropertyPanel.ts
var PropertyPanel = __webpack_require__(94162);
// EXTERNAL MODULE: ./src/faustpiece/MotionPanel.ts
var MotionPanel = __webpack_require__(40027);
// EXTERNAL MODULE: ./src/faustpiece/CuePanel.ts
var CuePanel = __webpack_require__(33400);
// EXTERNAL MODULE: ./src/faustpiece/ShowNamePanel.ts
var ShowNamePanel = __webpack_require__(51751);
// EXTERNAL MODULE: ./src/faustpiece/types.ts
var types = __webpack_require__(87526);
;// ./src/faustpiece/HelpPanel.ts


class HelpPanel {
  constructor(options) {
    (0,defineProperty/* default */.A)(this, "container", void 0);
    this.container = options.container;
    this.container.style.cssText = 'overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;padding:10px;box-sizing:border-box;';
    this.render();
  }
  section(title, content) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'margin-bottom:14px;';
    var h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:6px;';
    wrap.appendChild(h);
    var body = document.createElement('div');
    body.style.cssText = 'color:#bbb;font-size:11px;line-height:1.7;';
    body.innerHTML = content;
    wrap.appendChild(body);
    return wrap;
  }
  code(text) {
    return "<code style=\"background:#2a2a2a;color:#8cf;padding:1px 4px;border-radius:2px;font-family:monospace;\">".concat(text, "</code>");
  }
  render() {
    this.container.innerHTML = '';
    var title = document.createElement('div');
    title.textContent = '📖 FaustPiece Editor — Help';
    title.style.cssText = 'font-weight:bold;color:#4af;font-size:13px;margin-bottom:12px;';
    this.container.appendChild(title);

    // 1. File format
    this.container.appendChild(this.section('1. .FaustPiece File Format', "\n      <b style=\"color:#ccc\">.FaustPiece</b> is the package format used by SHCdyna \u2014 a ZIP archive containing:<br>\n      \u2022 A ".concat(this.code('.dsp'), " Faust DSP source file with the <b>same name</b> as the archive (<b>required</b>)<br>\n      \u2022 Optional audio files (").concat(this.code('.wav'), " / ").concat(this.code('.aif'), " / ").concat(this.code('.flac'), ")<br>\n      \u2022 Optional Faust library files (").concat(this.code('.dsp'), ")<br><br>\n      <b style=\"color:#e88\">Naming rule:</b> No spaces in the filename. The main DSP filename inside the archive must match the archive name (without extension).\n    ")));

    // 2. SHCUI metadata syntax
    var shcuiTypeList = types/* SHCUI_TYPES */.J.map(t => this.code(t)).join(' ');
    this.container.appendChild(this.section('2. SHCUI Metadata Syntax', "\n      Add a ".concat(this.code('[SHCUI: ...]'), " declaration inside a DSP parameter label:<br><br>\n      ").concat(this.code('[SHCUI: &lt;tab&gt; &lt;type&gt; &lt;x&gt; &lt;y&gt; &lt;w&gt; &lt;h&gt; &lt;R&gt; &lt;G&gt; &lt;B&gt; &lt;A&gt;]'), "<br><br>\n      \u2022 ").concat(this.code('tab'), " \u2014 tab page name<br>\n      \u2022 ").concat(this.code('type'), " \u2014 widget type (see list below)<br>\n      \u2022 ").concat(this.code('x y w h'), " \u2014 screen percentage coordinates (0\u2013100)<br>\n      \u2022 ").concat(this.code('R G B A'), " \u2014 color values (0\u2013255)<br><br>\n      <b style=\"color:#ccc\">Valid SHCUI types:</b><br>").concat(shcuiTypeList, "<br><br>\n      <b style=\"color:#ccc\">Example:</b><br>\n      ").concat(this.code('hslider("freq [SHCUI: main hslider 10 20 80 10 255 100 50 200]", 440, 20, 2000, 1)'), "\n    ")));

    // 3. Motion mapping syntax
    this.container.appendChild(this.section('3. Motion Mapping Metadata Syntax', "\n      <b style=\"color:#ccc\">Native Faust sensor mapping (acc / gyr):</b><br>\n      ".concat(this.code('[acc: &lt;axis&gt; &lt;curve&gt; &lt;amin&gt; &lt;amid&gt; &lt;amax&gt;]'), "<br>\n      ").concat(this.code('[gyr: &lt;axis&gt; &lt;curve&gt; &lt;amin&gt; &lt;amid&gt; &lt;amax&gt;]'), "<br><br>\n      \u2022 ").concat(this.code('axis'), " \u2014 sensor axis (0=X, 1=Y, 2=Z)<br>\n      \u2022 ").concat(this.code('curve'), " \u2014 mapping curve (0=rising, 1=falling, 2=rise-then-fall)<br>\n      \u2022 ").concat(this.code('amin amid amax'), " \u2014 mapping range (amin &lt; amax)<br><br>\n      <b style=\"color:#ccc\">Motion Lib parameter link:</b><br>\n      ").concat(this.code('[motion: &lt;motionLibParamAddress&gt;]'), "<br><br>\n      Example: ").concat(this.code('[motion: /motionLib/ixp]'), " (links interpolated pitch to this parameter)<br><br>\n      <b style=\"color:#ccc\">Direct sensor addresses supported by SHCdyna:</b><br>\n      ").concat(['/yaw', '/pitch', '/roll', '/useraccX', '/useraccY', '/useraccZ', '/quaternionW', '/quaternionX', '/quaternionY', '/quaternionZ', '/compass'].map(a => this.code(a)).join('  '), "\n    ")));

    // 4. Cue system
    this.container.appendChild(this.section('4. Cue System Syntax', "\n      <b style=\"color:#ccc\">Global cue tip text declaration:</b><br>\n      ".concat(this.code('declare touchCueManager "{1:tip1; 2:tip2; ...}";'), "<br><br>\n      <b style=\"color:#ccc\">Cue control types (set via SHCUI type field):</b><br>\n      \u2022 ").concat(this.code('trigCue'), " \u2014 trigger current cue and advance<br>\n      \u2022 ").concat(this.code('nextCue'), " \u2014 advance to next cue<br>\n      \u2022 ").concat(this.code('prevCue'), " \u2014 go back to previous cue<br>\n      \u2022 ").concat(this.code('initCue'), " \u2014 reset to first cue<br><br>\n      SHCdyna uses the ").concat(this.code('/cue'), " parameter integer value to determine the current cue and display the corresponding tip text.\n    ")));

    // 5. showName
    this.container.appendChild(this.section('5. showName Metadata Syntax', "\n      ".concat(this.code('[showName: &lt;display name&gt;]'), "<br><br>\n      Parameters with this declaration appear in the SHCdyna Setting page \"DSP Parameters\" picker, allowing performers to adjust values at runtime.<br><br>\n      Example: ").concat(this.code('hslider("freq [showName: Frequency]", 440, 20, 2000, 1)'), "\n    ")));

    // 6. Autocomplete
    this.container.appendChild(this.section('6. Code Autocomplete', "\n      When you type ".concat(this.code('[SHCUI:'), " in the DSP code editor, the editor will suggest valid SHCUI_Type options:<br><br>\n      ").concat(types/* SHCUI_TYPES */.J.map(t => this.code(t)).join('  '), "\n    ")));

    // 7. External link
    var linkSection = this.section('7. External Documentation', '');
    var link = document.createElement('a');
    link.href = 'https://github.com/RuolunWeng/SHCdyna/wiki/Manual_EN';
    link.textContent = '📎 SHCdyna Wiki — Manual_EN';
    link.target = '_blank';
    link.style.cssText = 'color:#4af;font-size:11px;text-decoration:underline;cursor:pointer;';
    link.addEventListener('click', e => {
      e.preventDefault();
      if (typeof window !== 'undefined' && window.open) {
        window.open('https://github.com/RuolunWeng/SHCdyna/wiki/Manual_EN', '_blank');
      }
    });
    linkSection.querySelector('div:last-child').appendChild(link);
    this.container.appendChild(linkSection);
  }
}
// EXTERNAL MODULE: ./src/faustpiece/SHCUIParser.ts
var SHCUIParser = __webpack_require__(14954);
// EXTERNAL MODULE: ./src/faustpiece/DSPMetadataEditor.ts
var DSPMetadataEditor = __webpack_require__(66328);
// EXTERNAL MODULE: ./src/faustpiece/FaustPiecePackager.ts
var FaustPiecePackager = __webpack_require__(37954);
// EXTERNAL MODULE: ./src/faustpiece/FileNameValidator.ts
var FileNameValidator = __webpack_require__(38318);
;// ./src/faustpiece/model.ts





// EXTERNAL MODULE: ./src/faustpiece/ResizeDivider.ts
var ResizeDivider = __webpack_require__(30838);
;// ./src/faustpiece/EditorPanel.ts



function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }












class EditorPanel {
  constructor(options) {
    (0,defineProperty/* default */.A)(this, "opts", void 0);
    (0,defineProperty/* default */.A)(this, "canvas", void 0);
    (0,defineProperty/* default */.A)(this, "propPanel", void 0);
    (0,defineProperty/* default */.A)(this, "motionPanel", void 0);
    (0,defineProperty/* default */.A)(this, "cuePanel", void 0);
    (0,defineProperty/* default */.A)(this, "showNamePanel", void 0);
    (0,defineProperty/* default */.A)(this, "helpPanel", void 0);
    (0,defineProperty/* default */.A)(this, "parser", new SHCUIParser/* SHCUIParser */.k());
    (0,defineProperty/* default */.A)(this, "editor", new DSPMetadataEditor/* DSPMetadataEditor */.K());
    (0,defineProperty/* default */.A)(this, "packager", new FaustPiecePackager/* FaustPiecePackager */.m());
    (0,defineProperty/* default */.A)(this, "validator", new FileNameValidator/* FileNameValidator */.o());
    // Internal project state — independent of the shared IDE file manager
    (0,defineProperty/* default */.A)(this, "pieceName", '');
    // e.g. "mySong"
    (0,defineProperty/* default */.A)(this, "dspCode", '');
    // current DSP text
    (0,defineProperty/* default */.A)(this, "attachments", new Map());
    // filename → content
    (0,defineProperty/* default */.A)(this, "statusEl", void 0);
    (0,defineProperty/* default */.A)(this, "fileListEl", void 0);
    (0,defineProperty/* default */.A)(this, "landingArea", void 0);
    (0,defineProperty/* default */.A)(this, "editingArea", void 0);
    this.opts = options;
    this.buildUI();
  }

  // ── UI shell ──────────────────────────────────────────────────────────────

  buildUI() {
    var _this = this;
    var c = this.opts.container;
    c.style.cssText = 'display:flex;flex-direction:column;height:100%;background:#1e1e1e;color:#ccc;overflow:hidden;';

    // Toolbar
    var toolbar = document.createElement('div');
    toolbar.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px;background:#252526;border-bottom:1px solid #3a3a3a;flex-shrink:0;flex-wrap:wrap;';
    var titleEl = document.createElement('span');
    titleEl.textContent = '🎵 FaustPiece Editor';
    titleEl.style.cssText = 'font-weight:bold;color:#4af;font-size:13px;';
    toolbar.appendChild(titleEl);
    toolbar.appendChild(this.makeBtn('📂 Open .FaustPiece', '#1a3a5a', () => this.triggerOpen()));
    toolbar.appendChild(this.makeBtn('↻ Parse DSP', '#2a4a2a', () => this.parseFromDsp()));
    toolbar.appendChild(this.makeBtn('▶ Send to Editor', '#3a2a5a', () => this.pushToIdeEditor()));
    toolbar.appendChild(this.makeBtn('⬇ Save .FaustPiece', '#1a4a2a', () => this.saveFaustPiece()));
    toolbar.appendChild(this.makeBtn('💾 Save As...', '#2a3a4a', () => this.saveAsFaustPiece()));
    this.statusEl = document.createElement('span');
    this.statusEl.style.cssText = 'font-size:11px;color:#888;margin-left:auto;';
    toolbar.appendChild(this.statusEl);
    c.appendChild(toolbar);

    // Landing
    this.landingArea = document.createElement('div');
    this.landingArea.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#555;';
    this.landingArea.innerHTML = "\n      <div style=\"font-size:48px;\">\uD83C\uDFB5</div>\n      <div style=\"font-size:14px;color:#888;\">Open a .FaustPiece file to start editing</div>\n      <div style=\"font-size:11px;color:#555;max-width:360px;text-align:center;line-height:1.7;\">\n        A .FaustPiece is a ZIP archive containing a <code>.dsp</code> file with the same name as the archive,\n        plus optional audio and library files.\n      </div>\n    ";
    this.landingArea.addEventListener('dragover', e => {
      e.preventDefault();
      this.landingArea.style.background = '#252526';
    });
    this.landingArea.addEventListener('dragleave', () => {
      this.landingArea.style.background = '';
    });
    this.landingArea.addEventListener('drop', /*#__PURE__*/function () {
      var _ref = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee(e) {
        var _e$dataTransfer;
        var file;
        return regenerator_default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              _this.landingArea.style.background = '';
              file = (_e$dataTransfer = e.dataTransfer) === null || _e$dataTransfer === void 0 ? void 0 : _e$dataTransfer.files[0];
              if (!file) {
                _context.next = 1;
                break;
              }
              _context.next = 1;
              return _this.loadFile(file);
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    c.appendChild(this.landingArea);

    // Editing area (hidden until loaded)
    this.editingArea = document.createElement('div');
    this.editingArea.style.cssText = 'flex:1;display:none;flex-direction:column;overflow:hidden;';
    c.appendChild(this.editingArea);
    this.buildEditingArea();
  }
  buildEditingArea() {
    // Project files sidebar + main content
    var body = document.createElement('div');
    body.style.cssText = 'flex:1;display:flex;overflow:hidden;';
    this.editingArea.appendChild(body);

    // ── Project files sidebar ─────────────────────────────────────────────
    var sidebar = document.createElement('div');
    sidebar.style.cssText = 'width:160px;flex-shrink:0;display:flex;flex-direction:column;background:#252526;overflow:hidden;';
    var sidebarTitle = document.createElement('div');
    sidebarTitle.style.cssText = 'padding:5px 8px;font-size:10px;color:#666;border-bottom:1px solid #333;flex-shrink:0;text-transform:uppercase;letter-spacing:0.5px;';
    sidebarTitle.textContent = 'Project Files';
    sidebar.appendChild(sidebarTitle);
    this.fileListEl = document.createElement('div');
    this.fileListEl.style.cssText = 'flex:1;overflow-y:auto;padding:4px 0;';
    sidebar.appendChild(this.fileListEl);
    body.appendChild(sidebar);
    body.appendChild((0,ResizeDivider/* makeDivider */.g)(sidebar, null, 80, 400));

    // ── Main editing content ──────────────────────────────────────────────
    var main = document.createElement('div');
    main.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;';
    body.appendChild(main);

    // Tab nav
    var tabNav = document.createElement('div');
    tabNav.style.cssText = 'display:flex;background:#252526;border-bottom:1px solid #3a3a3a;flex-shrink:0;';
    var tabContents = document.createElement('div');
    tabContents.style.cssText = 'flex:1;overflow:hidden;display:flex;';
    var makeTab = function makeTab(label) {
      var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var btn = document.createElement('button');
      btn.textContent = label;
      btn.style.cssText = "padding:5px 12px;border:none;cursor:pointer;font-size:11px;background:".concat(active ? '#1e1e1e' : 'transparent', ";color:").concat(active ? '#4af' : '#888', ";border-bottom:").concat(active ? '2px solid #4af' : '2px solid transparent', ";");
      var pane = document.createElement('div');
      pane.style.cssText = "display:".concat(active ? 'flex' : 'none', ";flex:1;overflow:hidden;");
      tabNav.appendChild(btn);
      tabContents.appendChild(pane);
      return [btn, pane];
    };
    var _makeTab = makeTab('SHCUI', true),
      _makeTab2 = (0,slicedToArray/* default */.A)(_makeTab, 2),
      shcuiBtn = _makeTab2[0],
      shcuiPane = _makeTab2[1];
    var _makeTab3 = makeTab('Motion'),
      _makeTab4 = (0,slicedToArray/* default */.A)(_makeTab3, 2),
      motionBtn = _makeTab4[0],
      motionPane = _makeTab4[1];
    var _makeTab5 = makeTab('Cue'),
      _makeTab6 = (0,slicedToArray/* default */.A)(_makeTab5, 2),
      cueBtn = _makeTab6[0],
      cuePane = _makeTab6[1];
    var _makeTab7 = makeTab('ShowName'),
      _makeTab8 = (0,slicedToArray/* default */.A)(_makeTab7, 2),
      showNameBtn = _makeTab8[0],
      showNamePane = _makeTab8[1];
    var _makeTab9 = makeTab('Help'),
      _makeTab0 = (0,slicedToArray/* default */.A)(_makeTab9, 2),
      helpBtn = _makeTab0[0],
      helpPane = _makeTab0[1];
    var allBtns = [shcuiBtn, motionBtn, cueBtn, showNameBtn, helpBtn];
    var allPanes = [shcuiPane, motionPane, cuePane, showNamePane, helpPane];
    allBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        var _this$motionPanel, _this$cuePanel, _this$showNamePanel;
        allBtns.forEach((b, j) => {
          b.style.background = j === i ? '#1e1e1e' : 'transparent';
          b.style.color = j === i ? '#4af' : '#888';
          b.style.borderBottom = j === i ? '2px solid #4af' : '2px solid transparent';
          allPanes[j].style.display = j === i ? 'flex' : 'none';
        });
        if (i === 1) (_this$motionPanel = this.motionPanel) === null || _this$motionPanel === void 0 || _this$motionPanel.parseParamsFromCode(this.dspCode);
        if (i === 2) (_this$cuePanel = this.cuePanel) === null || _this$cuePanel === void 0 || _this$cuePanel.refresh();
        if (i === 3) (_this$showNamePanel = this.showNamePanel) === null || _this$showNamePanel === void 0 || _this$showNamePanel.parseParamsFromCode(this.dspCode);
      });
    });
    main.appendChild(tabNav);
    main.appendChild(tabContents);

    // SHCUI pane — canvas + draggable divider + property panel
    var canvasWrap = document.createElement('div');
    canvasWrap.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;';
    var propWrap = document.createElement('div');
    propWrap.style.cssText = 'width:220px;flex-shrink:0;overflow-y:auto;';
    shcuiPane.appendChild(canvasWrap);
    shcuiPane.appendChild((0,ResizeDivider/* makeDivider */.g)(null, propWrap, 100, 500));
    shcuiPane.appendChild(propWrap);
    var motionWrap = document.createElement('div');
    motionWrap.style.cssText = 'flex:1;overflow:hidden;';
    motionPane.appendChild(motionWrap);
    var cueWrap = document.createElement('div');
    cueWrap.style.cssText = 'flex:1;overflow:hidden;';
    cuePane.appendChild(cueWrap);
    var showNameWrap = document.createElement('div');
    showNameWrap.style.cssText = 'flex:1;overflow:hidden;';
    showNamePane.appendChild(showNameWrap);
    var helpWrap = document.createElement('div');
    helpWrap.style.cssText = 'flex:1;overflow:hidden;';
    helpPane.appendChild(helpWrap);

    // Internal getCode/setCode operate on this.dspCode
    var getCode = () => this.dspCode;
    var setCode = code => {
      this.dspCode = code;
    };
    var getDspJson = this.opts.getDspJson; // Task 3.4: Pass getDspJson to panels

    this.canvas = new SHCUICanvas/* SHCUICanvas */.B({
      container: canvasWrap,
      getCode: () => this.dspCode,
      getDspJson,
      // Task 3.4: Pass getDspJson to canvas
      onChange: (el, x, y, w, h) => {
        this.dspCode = this.editor.upsertSHCUI(this.dspCode, el.paramPath, el);
        this.propPanel.updatePosition(x, y, w, h);
      },
      onAdd: el => {
        this.dspCode = this.editor.upsertSHCUI(this.dspCode, el.paramPath, el);
        this.propPanel.setElement(el);
      }
    });
    this.propPanel = new PropertyPanel/* PropertyPanel */.Q({
      container: propWrap,
      onUpdate: el => {
        this.dspCode = this.editor.upsertSHCUI(this.dspCode, el.paramPath, el);
        this.canvas.render();
      },
      onDelete: el => {
        this.dspCode = this.editor.removeSHCUI(this.dspCode, el.paramPath);
        this.parseFromDsp();
        this.propPanel.setElement(null);
      }
    });
    setInterval(() => {
      var sel = this.canvas.getSelectedElement();
      if (this._lastSel !== sel) {
        this._lastSel = sel;
        this.propPanel.setElement(sel);
      }
    }, 100);
    this.motionPanel = new MotionPanel/* MotionPanel */.L({
      container: motionWrap,
      getCode,
      setCode,
      getDspJson
    });
    this.cuePanel = new CuePanel/* CuePanel */.E({
      container: cueWrap,
      getCode,
      setCode
    });
    this.showNamePanel = new ShowNamePanel/* ShowNamePanel */.$({
      container: showNameWrap,
      getCode,
      setCode,
      getDspJson
    });
    this.helpPanel = new HelpPanel({
      container: helpWrap
    });
  }

  // ── File open ─────────────────────────────────────────────────────────────

  triggerOpen() {
    var _this2 = this;
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.FaustPiece,.faustpiece';
    input.addEventListener('change', /*#__PURE__*/(0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee2() {
      var _input$files;
      var file;
      return regenerator_default().wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            file = (_input$files = input.files) === null || _input$files === void 0 ? void 0 : _input$files[0];
            if (!file) {
              _context2.next = 1;
              break;
            }
            _context2.next = 1;
            return _this2.loadFile(file);
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    input.click();
  }
  loadFile(file) {
    var _this3 = this;
    return (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee3() {
      var buf, result, JSZip, zip, _i, _Object$entries, _Object$entries$_i, zipName, zipEntry, content, _t;
      return regenerator_default().wrap(function (_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _this3.setStatus('Loading…', '#888');

            // Clear compiled DSP JSON from previous file
            if (_this3.opts.clearDspJson) {
              _this3.opts.clearDspJson();
            }
            _context3.next = 1;
            return file.arrayBuffer();
          case 1:
            buf = _context3.sent;
            _context3.next = 2;
            return _this3.packager.unpack(new Uint8Array(buf), file.name);
          case 2:
            result = _context3.sent;
            _this3.pieceName = file.name.replace(/\.FaustPiece$/i, '');
            _this3.dspCode = result.mainDspContent;
            _this3.attachments.clear();

            // Store attachment contents from unpack result
            // (UnpackResult.attachments are filenames; we re-read from the zip)
            // Re-unpack to get binary content for each attachment
            _context3.next = 3;
            return __webpack_require__.e(/* import() */ 1710).then(__webpack_require__.t.bind(__webpack_require__, 71710, 23));
          case 3:
            JSZip = _context3.sent.default;
            _context3.next = 4;
            return JSZip.loadAsync(buf);
          case 4:
            zip = _context3.sent;
            _i = 0, _Object$entries = Object.entries(zip.files);
          case 5:
            if (!(_i < _Object$entries.length)) {
              _context3.next = 8;
              break;
            }
            _Object$entries$_i = (0,slicedToArray/* default */.A)(_Object$entries[_i], 2), zipName = _Object$entries$_i[0], zipEntry = _Object$entries$_i[1];
            if (!(!zipEntry.dir && zipName !== "".concat(_this3.pieceName, ".dsp"))) {
              _context3.next = 7;
              break;
            }
            _context3.next = 6;
            return zipEntry.async('uint8array');
          case 6:
            content = _context3.sent;
            _this3.attachments.set(zipName, content);
          case 7:
            _i++;
            _context3.next = 5;
            break;
          case 8:
            _this3.landingArea.style.display = 'none';
            _this3.editingArea.style.display = 'flex';
            _this3.renderFileList();
            _this3.parseFromDsp();
            _this3.setStatus("\u2713 Loaded ".concat(_this3.pieceName, ".FaustPiece  (").concat(_this3.attachments.size, " attachment(s))"), '#4a4');
            _context3.next = 10;
            break;
          case 9:
            _context3.prev = 9;
            _t = _context3["catch"](0);
            _this3.setStatus("\u2717 Load failed: ".concat(_t.message), '#f44');
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 9]]);
    }))();
  }

  // ── Project files sidebar ─────────────────────────────────────────────────

  renderFileList() {
    this.fileListEl.innerHTML = '';

    // Main DSP entry
    var dspRow = this.makeFileRow("".concat(this.pieceName, ".dsp"), true);
    this.fileListEl.appendChild(dspRow);

    // Attachments
    var _iterator = _createForOfIteratorHelper(this.attachments.keys()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var name = _step.value;
        this.fileListEl.appendChild(this.makeFileRow(name, false));
      }

      // Add attachment button
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var addBtn = document.createElement('button');
    addBtn.textContent = '+ Add file';
    addBtn.style.cssText = 'margin:6px 8px;background:#2a3a2a;color:#aaa;border:none;border-radius:3px;padding:3px 8px;cursor:pointer;font-size:10px;width:calc(100% - 16px);';
    addBtn.addEventListener('click', () => this.addAttachment());
    this.fileListEl.appendChild(addBtn);
  }
  makeFileRow(name, isMain) {
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;padding:3px 8px;gap:4px;';
    var icon = document.createElement('span');
    icon.textContent = isMain ? '📄' : name.match(/\.(wav|aif|flac)$/i) ? '🎵' : '📎';
    icon.style.cssText = 'font-size:11px;flex-shrink:0;';
    row.appendChild(icon);
    var label = document.createElement('span');
    label.textContent = name;
    label.title = name;
    label.style.cssText = "flex:1;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:".concat(isMain ? '#8cf' : '#aaa', ";");
    row.appendChild(label);
    if (!isMain) {
      var del = document.createElement('button');
      del.textContent = '✕';
      del.style.cssText = 'background:none;border:none;color:#666;cursor:pointer;font-size:10px;padding:0 2px;flex-shrink:0;';
      del.addEventListener('click', () => {
        this.attachments.delete(name);
        this.renderFileList();
      });
      row.appendChild(del);
    }
    return row;
  }
  addAttachment() {
    var _this4 = this;
    var input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.wav,.aif,.aiff,.flac,.dsp';
    input.addEventListener('change', /*#__PURE__*/(0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee4() {
      var _i2, _Array$from, file, buf;
      return regenerator_default().wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (input.files) {
              _context4.next = 1;
              break;
            }
            return _context4.abrupt("return");
          case 1:
            _i2 = 0, _Array$from = Array.from(input.files);
          case 2:
            if (!(_i2 < _Array$from.length)) {
              _context4.next = 5;
              break;
            }
            file = _Array$from[_i2];
            _context4.next = 3;
            return file.arrayBuffer();
          case 3:
            buf = _context4.sent;
            _this4.attachments.set(file.name, new Uint8Array(buf));
          case 4:
            _i2++;
            _context4.next = 2;
            break;
          case 5:
            _this4.renderFileList();
          case 6:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
    input.click();
  }

  // ── Parsing ───────────────────────────────────────────────────────────────

  parseFromDsp() {
    var _this$motionPanel2, _this$showNamePanel2, _this$cuePanel2;
    var result = this.parser.parse(this.dspCode);
    this.canvas.setElements(result.data);
    (_this$motionPanel2 = this.motionPanel) === null || _this$motionPanel2 === void 0 || _this$motionPanel2.parseParamsFromCode(this.dspCode);
    (_this$showNamePanel2 = this.showNamePanel) === null || _this$showNamePanel2 === void 0 || _this$showNamePanel2.parseParamsFromCode(this.dspCode);
    (_this$cuePanel2 = this.cuePanel) === null || _this$cuePanel2 === void 0 || _this$cuePanel2.refresh(); // Refresh cue panel when loading new file
    if (result.errors.length > 0) this.setStatus("\u26A0 ".concat(result.errors.length, " parse error(s)"), '#f90');else if (result.data.length === 0) this.setStatus('No [SHCUI:] metadata found', '#888');else this.setStatus("\u2713 ".concat(result.data.length, " element(s) loaded"), '#4a4');
  }

  /** Push current DSP to the IDE's Monaco editor for compilation */
  pushToIdeEditor() {
    if (!this.pieceName) {
      this.setStatus('✗ No file loaded', '#f44');
      return;
    }
    this.opts.pushToEditor("".concat(this.pieceName, ".dsp"), this.dspCode);
    this.setStatus("\u2713 Sent ".concat(this.pieceName, ".dsp to editor"), '#4a4');
  }

  // ── Save ──────────────────────────────────────────────────────────────────

  saveFaustPiece() {
    var _this5 = this;
    return (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee5() {
      var confirmed, data, _t2;
      return regenerator_default().wrap(function (_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (_this5.pieceName) {
              _context5.next = 1;
              break;
            }
            _this5.setStatus('✗ Open a .FaustPiece file first', '#f44');
            return _context5.abrupt("return");
          case 1:
            _context5.next = 2;
            return _this5.showSaveConfirm();
          case 2:
            confirmed = _context5.sent;
            if (confirmed) {
              _context5.next = 3;
              break;
            }
            return _context5.abrupt("return");
          case 3:
            _context5.prev = 3;
            _this5.setStatus('Packing…', '#888');
            _context5.next = 4;
            return _this5.packager.pack({
              outputName: _this5.pieceName,
              outputDir: '',
              dspContent: _this5.dspCode,
              attachments: Array.from(_this5.attachments.keys()),
              includeAudio: true,
              includeLibs: true
            }, _this5.attachments);
          case 4:
            data = _context5.sent;
            _this5.opts.downloadFile(data, "".concat(_this5.pieceName, ".FaustPiece"));
            _this5.setStatus("\u2713 Saved ".concat(_this5.pieceName, ".FaustPiece"), '#4a4');
            _context5.next = 6;
            break;
          case 5:
            _context5.prev = 5;
            _t2 = _context5["catch"](3);
            _this5.setStatus("\u2717 Save failed: ".concat(_t2.message), '#f44');
          case 6:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[3, 5]]);
    }))();
  }
  saveAsFaustPiece() {
    var _this6 = this;
    return (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee6() {
      var newName, validation, oldName, data, _t3;
      return regenerator_default().wrap(function (_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (_this6.pieceName) {
              _context6.next = 1;
              break;
            }
            _this6.setStatus('✗ Open a .FaustPiece file first', '#f44');
            return _context6.abrupt("return");
          case 1:
            _context6.next = 2;
            return _this6.showSaveAsDialog();
          case 2:
            newName = _context6.sent;
            if (newName) {
              _context6.next = 3;
              break;
            }
            return _context6.abrupt("return");
          case 3:
            // Validate new name
            validation = _this6.validator.validate(newName);
            if (validation.valid) {
              _context6.next = 4;
              break;
            }
            _this6.setStatus("\u2717 Invalid name: ".concat(validation.error), '#f44');
            return _context6.abrupt("return");
          case 4:
            // Update piece name and DSP code
            oldName = _this6.pieceName;
            _this6.pieceName = newName;

            // Update DSP code to reflect new name (if DSP filename is referenced)
            _this6.dspCode = _this6.dspCode.replace(new RegExp("\\b".concat(oldName, "\\.dsp\\b"), 'g'), "".concat(newName, ".dsp"));

            // Save with new name
            _context6.prev = 5;
            _this6.setStatus('Packing…', '#888');
            _context6.next = 6;
            return _this6.packager.pack({
              outputName: _this6.pieceName,
              outputDir: '',
              dspContent: _this6.dspCode,
              attachments: Array.from(_this6.attachments.keys()),
              includeAudio: true,
              includeLibs: true
            }, _this6.attachments);
          case 6:
            data = _context6.sent;
            _this6.opts.downloadFile(data, "".concat(_this6.pieceName, ".FaustPiece"));
            _this6.setStatus("\u2713 Saved as ".concat(_this6.pieceName, ".FaustPiece"), '#4a4');
            _this6.renderFileList(); // Update UI with new name
            _context6.next = 8;
            break;
          case 7:
            _context6.prev = 7;
            _t3 = _context6["catch"](5);
            _this6.setStatus("\u2717 Save failed: ".concat(_t3.message), '#f44');
            // Revert name on failure
            _this6.pieceName = oldName;
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[5, 7]]);
    }))();
  }
  showSaveAsDialog() {
    return new Promise(resolve => {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:10000;display:flex;align-items:center;justify-content:center;';
      var modal = document.createElement('div');
      modal.style.cssText = 'background:#252526;border:1px solid #444;border-radius:6px;padding:20px 24px;width:400px;color:#ccc;font-size:12px;';
      var title = document.createElement('div');
      title.textContent = '💾 Save As New FaustPiece';
      title.style.cssText = 'font-weight:bold;color:#4af;font-size:13px;margin-bottom:12px;';
      modal.appendChild(title);
      var label = document.createElement('div');
      label.textContent = 'New name (no spaces):';
      label.style.cssText = 'color:#aaa;font-size:11px;margin-bottom:6px;';
      modal.appendChild(label);
      var input = document.createElement('input');
      input.type = 'text';
      input.value = this.pieceName;
      input.style.cssText = 'width:100%;background:#1e1e1e;color:#ccc;border:1px solid #444;border-radius:4px;padding:8px;font-size:12px;margin-bottom:12px;';
      input.select();
      modal.appendChild(input);
      var preview = document.createElement('div');
      preview.style.cssText = 'background:#1a2a3a;border:1px solid #2a4a5a;border-radius:4px;padding:8px 12px;margin-bottom:14px;font-size:11px;line-height:1.8;';
      var updatePreview = () => {
        var val = input.value.trim();
        var validation = this.validator.validate(val);
        if (validation.valid) {
          preview.innerHTML = "\n            <div style=\"color:#4a4;font-weight:bold;margin-bottom:4px;\">\u2713 Valid name</div>\n            <div>Will save as: <code style=\"color:#8cf;\">".concat(val, ".FaustPiece</code></div>\n            <div>Main DSP inside: <code style=\"color:#8cf;\">").concat(val, ".dsp</code></div>\n          ");
        } else {
          preview.innerHTML = "\n            <div style=\"color:#f44;font-weight:bold;margin-bottom:4px;\">\u2717 Invalid name</div>\n            <div style=\"color:#f88;\">".concat(validation.error, "</div>\n          ");
        }
      };
      updatePreview();
      input.addEventListener('input', updatePreview);
      modal.appendChild(preview);
      var btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:8px;justify-content:flex-end;';
      var cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.style.cssText = 'background:#3a3a3a;color:#aaa;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;';
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve(null);
      });
      var confirmBtn = document.createElement('button');
      confirmBtn.textContent = '💾 Save As';
      confirmBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;';
      confirmBtn.addEventListener('click', () => {
        var val = input.value.trim();
        var validation = this.validator.validate(val);
        if (validation.valid) {
          document.body.removeChild(overlay);
          resolve(val);
        } else {
          input.style.borderColor = '#f44';
          setTimeout(() => {
            input.style.borderColor = '#444';
          }, 500);
        }
      });
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') confirmBtn.click();
        if (e.key === 'Escape') cancelBtn.click();
      });
      btnRow.appendChild(cancelBtn);
      btnRow.appendChild(confirmBtn);
      modal.appendChild(btnRow);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      input.focus();
    });
  }
  showSaveConfirm() {
    return new Promise(resolve => {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:10000;display:flex;align-items:center;justify-content:center;';
      var modal = document.createElement('div');
      modal.style.cssText = 'background:#252526;border:1px solid #444;border-radius:6px;padding:20px 24px;width:400px;color:#ccc;font-size:12px;';
      var title = document.createElement('div');
      title.textContent = "Save ".concat(this.pieceName, ".FaustPiece");
      title.style.cssText = 'font-weight:bold;color:#4af;font-size:13px;margin-bottom:12px;';
      modal.appendChild(title);
      var infoBox = document.createElement('div');
      infoBox.style.cssText = 'background:#1a2a1a;border:1px solid #2a4a2a;border-radius:4px;padding:8px 12px;margin-bottom:14px;font-size:11px;line-height:1.8;';
      infoBox.innerHTML = "\n        <div style=\"color:#4a4;font-weight:bold;margin-bottom:4px;\">\u2713 Naming check</div>\n        <div>Archive: <code style=\"color:#8cf;\">".concat(this.pieceName, ".FaustPiece</code></div>\n        <div>Main DSP inside: <code style=\"color:#8cf;\">").concat(this.pieceName, ".dsp</code></div>\n        <div style=\"color:#888;margin-top:4px;font-size:10px;\">Names match \u2014 SHCdyna will load this correctly.</div>\n      ");
      modal.appendChild(infoBox);
      if (this.attachments.size > 0) {
        var attInfo = document.createElement('div');
        attInfo.style.cssText = 'color:#aaa;font-size:11px;margin-bottom:14px;';
        attInfo.textContent = "Includes ".concat(this.attachments.size, " attachment file(s): ").concat(Array.from(this.attachments.keys()).join(', '));
        modal.appendChild(attInfo);
      }
      var btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;gap:8px;justify-content:flex-end;';
      var cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.style.cssText = 'background:#3a3a3a;color:#aaa;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;';
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve(false);
      });
      var confirmBtn = document.createElement('button');
      confirmBtn.textContent = '⬇ Save';
      confirmBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;';
      confirmBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve(true);
      });
      btnRow.appendChild(cancelBtn);
      btnRow.appendChild(confirmBtn);
      modal.appendChild(btnRow);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    });
  }
  makeBtn(text, bg, onClick) {
    var btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = "background:".concat(bg, ";color:#fff;border:none;border-radius:3px;padding:4px 10px;cursor:pointer;font-size:12px;");
    btn.addEventListener('click', onClick);
    return btn;
  }
  setStatus(msg) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#888';
    this.statusEl.textContent = msg;
    this.statusEl.style.color = color;
  }

  /** Called by the IDE tab shown event */
  parseFromEditor() {
    this.parseFromDsp();
  }
}

/***/ }

}]);
//# sourceMappingURL=d856496f0aed103a7f90.js.map