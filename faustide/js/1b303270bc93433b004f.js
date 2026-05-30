"use strict";
(self["webpackChunkfausteditorweb"] = self["webpackChunkfausteditorweb"] || []).push([[3369],{

/***/ 43369
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewPiecePanel: () => (/* binding */ NewPiecePanel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47075);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10467);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54705);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54756);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FileNameValidator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38318);
/* harmony import */ var _FaustPiecePackager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37954);
/* harmony import */ var _SHCUICanvas__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57841);
/* harmony import */ var _PropertyPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94162);
/* harmony import */ var _MotionPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40027);
/* harmony import */ var _CuePanel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33400);
/* harmony import */ var _ShowNamePanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(51751);
/* harmony import */ var _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(66328);
/* harmony import */ var _SHCUIParser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14954);
/* harmony import */ var _ResizeDivider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(30838);



function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }











class NewPiecePanel {
  constructor(opts) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "opts", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "validator", new _FileNameValidator__WEBPACK_IMPORTED_MODULE_4__/* .FileNameValidator */ .o());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "packager", new _FaustPiecePackager__WEBPACK_IMPORTED_MODULE_5__/* .FaustPiecePackager */ .m());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "editor", new _DSPMetadataEditor__WEBPACK_IMPORTED_MODULE_11__/* .DSPMetadataEditor */ .K());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "parser", new _SHCUIParser__WEBPACK_IMPORTED_MODULE_12__/* .SHCUIParser */ .k());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "stepContainer", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "currentStep", 0);
    // Internal project state — independent of shared IDE file manager
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "outputName", '');
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "dspCode", '');
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "attachments", []);
    // Track DSP source mode: 'pick' = from IDE file manager, 'upload' = external file
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "dspSourceMode", 'upload');
    // If 'pick', the IDE filename being edited (for sync-back)
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "pickedFileName", '');
    // Whether we've already pushed the uploaded DSP to the IDE editor
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(this, "sentToEditor", false);
    this.opts = opts;
    this.build();
  }
  build() {
    var c = this.opts.container;
    c.style.cssText = 'display:flex;flex-direction:column;height:100%;background:#1e1e1e;color:#ccc;overflow:hidden;';

    // Header
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;padding:8px 14px;background:#252526;border-bottom:1px solid #3a3a3a;flex-shrink:0;';
    var headerTitle = document.createElement('span');
    headerTitle.textContent = '✦ New FaustPiece';
    headerTitle.style.cssText = 'font-weight:bold;color:#4af;font-size:13px;flex:1;';
    header.appendChild(headerTitle);
    var resetBtn = document.createElement('button');
    resetBtn.textContent = '↺ Reset';
    resetBtn.style.cssText = 'background:#3a3a3a;color:#aaa;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;';
    resetBtn.addEventListener('click', () => this.reset());
    header.appendChild(resetBtn);
    c.appendChild(header);

    // Step indicator
    var stepBar = document.createElement('div');
    stepBar.style.cssText = 'display:flex;background:#252526;border-bottom:1px solid #333;flex-shrink:0;';
    var stepLabels = ['1. File Name', '2. Attachments', '3. SHCUI Edit', '4. Motion/Cue', '5. Export'];
    stepLabels.forEach((label, i) => {
      var s = document.createElement('div');
      s.id = "newpanel-step-".concat(i);
      s.textContent = label;
      s.style.cssText = "flex:1;text-align:center;padding:5px 4px;font-size:10px;color:#666;border-bottom:2px solid transparent;cursor:pointer;";
      s.addEventListener('click', () => {
        if (i < this.currentStep) this.showStep(i);
      });
      stepBar.appendChild(s);
    });
    c.appendChild(stepBar);
    this._stepCount = stepLabels.length;
    this.stepContainer = document.createElement('div');
    this.stepContainer.style.cssText = 'flex:1;overflow:hidden;display:flex;flex-direction:column;';
    c.appendChild(this.stepContainer);
    this.showStep(0);
  }
  updateStepIndicator(active) {
    var total = this._stepCount;
    for (var i = 0; i < total; i++) {
      var el = document.getElementById("newpanel-step-".concat(i));
      if (!el) continue;
      if (i < active) {
        el.style.color = '#4a4';
        el.style.borderBottom = '2px solid #4a4';
      } else if (i === active) {
        el.style.color = '#4af';
        el.style.borderBottom = '2px solid #4af';
      } else {
        el.style.color = '#666';
        el.style.borderBottom = '2px solid transparent';
      }
    }
  }
  showStep(index) {
    this.currentStep = index;
    this.updateStepIndicator(index);
    this.stepContainer.innerHTML = '';
    switch (index) {
      case 0:
        this.renderStep1();
        break;
      case 1:
        this.renderStep2();
        break;
      case 2:
        this.renderStep3();
        break;
      case 3:
        this.renderStep4();
        break;
      case 4:
        this.renderStep5();
        break;
    }
  }
  reset() {
    this.outputName = '';
    this.dspCode = '';
    this.attachments = [];
    this.dspSourceMode = 'upload';
    this.pickedFileName = '';
    this.sentToEditor = false;
    this.showStep(0);
  }

  // ── Step 1: File name + DSP source ────────────────────────────────────────

  renderStep1() {
    var wrap = this.makeStepWrap('Step 1: Name & Source DSP');

    // Important workflow reminder
    var workflowBox = document.createElement('div');
    workflowBox.style.cssText = 'background:#1a2a3a;border:1px solid #4a6a8a;border-radius:5px;padding:10px 14px;margin-bottom:14px;font-size:11px;line-height:1.8;';
    workflowBox.innerHTML = "\n      <div style=\"color:#4af;font-weight:bold;font-size:12px;margin-bottom:4px;\">\uD83D\uDCA1 Important Workflow</div>\n      <div style=\"color:#ccc;\">Before editing metadata, please:</div>\n      <div style=\"color:#8cf;margin:4px 0;\">\n        &nbsp;1. <b>Compile/Run</b> the DSP in the IDE<br>\n        &nbsp;2. Then continue editing SHCUI/Motion/Cue metadata\n      </div>\n      <div style=\"color:#aaa;\">This ensures parameter filtering works correctly and you see only the parameters actually used in your DSP.</div>\n    ";
    wrap.appendChild(workflowBox);

    // Naming rule callout
    var ruleBox = document.createElement('div');
    ruleBox.style.cssText = 'background:#2a1a00;border:1px solid #6a4a00;border-radius:5px;padding:10px 14px;margin-bottom:14px;font-size:11px;line-height:1.8;';
    ruleBox.innerHTML = "\n      <div style=\"color:#fa0;font-weight:bold;font-size:12px;margin-bottom:4px;\">\u26A0 Important naming rule</div>\n      <div style=\"color:#ccc;\">The name you enter will be used for <b>both</b>:</div>\n      <div style=\"color:#8cf;font-family:monospace;margin:4px 0;\">\n        &nbsp;\u2022 Archive file: &nbsp;<b>myPiece.FaustPiece</b><br>\n        &nbsp;\u2022 DSP inside: &nbsp;&nbsp;<b>myPiece.dsp</b>\n      </div>\n      <div style=\"color:#aaa;\">They must match \u2014 SHCdyna requires this to load correctly.</div>\n      <div style=\"color:#888;margin-top:4px;\">No spaces allowed.</div>\n    ";
    wrap.appendChild(ruleBox);

    // ── FaustPiece name ───────────────────────────────────────────────────
    var nameLabel = document.createElement('div');
    nameLabel.textContent = 'FaustPiece name (no spaces, no extension):';
    nameLabel.style.cssText = 'color:#ccc;font-size:12px;margin-bottom:6px;font-weight:bold;';
    wrap.appendChild(nameLabel);
    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = this.outputName;
    nameInput.placeholder = 'e.g. myPiece';
    nameInput.style.cssText = 'background:#3c3c3c;color:#fff;border:2px solid #555;border-radius:4px;padding:7px 10px;font-size:14px;width:280px;display:block;';
    wrap.appendChild(nameInput);
    var preview = document.createElement('div');
    preview.style.cssText = 'font-family:monospace;font-size:11px;margin-top:5px;margin-bottom:14px;color:#555;';
    var updatePreview = () => {
      var v = nameInput.value.trim();
      preview.textContent = v ? "\u2192 ".concat(v, ".FaustPiece  /  ").concat(v, ".dsp") : '';
      preview.style.color = v ? '#8cf' : '#555';
    };
    nameInput.addEventListener('input', updatePreview);
    updatePreview();
    wrap.appendChild(preview);

    // ── DSP source selection ──────────────────────────────────────────────
    var dspLabel = document.createElement('div');
    dspLabel.textContent = 'Principal DSP source:';
    dspLabel.style.cssText = 'color:#ccc;font-size:12px;margin-bottom:8px;font-weight:bold;';
    wrap.appendChild(dspLabel);

    // Source mode toggle
    var modeRow = document.createElement('div');
    modeRow.style.cssText = 'display:flex;gap:8px;margin-bottom:10px;';
    var selectedMode = 'upload';
    var uploadedCode = '';
    var uploadedName = '';
    var makeMode = (id, label, mode) => {
      var btn = document.createElement('button');
      btn.textContent = label;
      btn.style.cssText = "padding:5px 12px;border:2px solid #555;border-radius:4px;cursor:pointer;font-size:11px;background:".concat(mode === selectedMode ? '#1a3a5a' : '#3c3c3c', ";color:").concat(mode === selectedMode ? '#fff' : '#aaa', ";");
      btn.addEventListener('click', () => {
        selectedMode = mode;
        allModeBtns.forEach((b, m) => {
          b.style.background = m === mode ? '#1a3a5a' : '#3c3c3c';
          b.style.color = m === mode ? '#fff' : '#aaa';
          b.style.borderColor = m === mode ? '#4af' : '#555';
        });
        uploadArea.style.display = mode === 'upload' ? '' : 'none';
        pickArea.style.display = mode === 'pick' ? '' : 'none';

        // Clear name input when switching to pick mode
        if (mode === 'pick') {
          nameInput.value = '';
          uploadedCode = '';
          uploadedName = '';
          updatePreview();
        }
      });
      return btn;
    };
    var allModeBtns = new Map();
    var uploadModeBtn = makeMode('upload', '📁 Upload .dsp file', 'upload');
    var pickModeBtn = makeMode('pick', '📋 Pick from IDE files', 'pick');
    allModeBtns.set('upload', uploadModeBtn);
    allModeBtns.set('pick', pickModeBtn);
    modeRow.appendChild(uploadModeBtn);
    modeRow.appendChild(pickModeBtn);
    wrap.appendChild(modeRow);

    // Upload area
    var uploadArea = document.createElement('div');
    uploadArea.style.cssText = 'margin-bottom:10px;';
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.dsp';
    fileInput.style.cssText = 'color:#ccc;font-size:11px;display:block;margin-bottom:6px;';
    var uploadStatus = document.createElement('div');
    uploadStatus.style.cssText = 'font-size:11px;color:#666;font-family:monospace;';
    uploadStatus.textContent = 'No file selected';
    fileInput.addEventListener('change', /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
      var _fileInput$files;
      var file;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            file = (_fileInput$files = fileInput.files) === null || _fileInput$files === void 0 ? void 0 : _fileInput$files[0];
            if (file) {
              _context.next = 1;
              break;
            }
            return _context.abrupt("return");
          case 1:
            _context.next = 2;
            return file.text();
          case 2:
            uploadedCode = _context.sent;
            uploadedName = file.name.replace(/\.dsp$/i, '');
            uploadStatus.textContent = "\u2713 ".concat(file.name, "  (").concat(uploadedCode.length, " chars)");
            uploadStatus.style.color = '#4a4';
            // Auto-fill name if empty
            if (!nameInput.value.trim()) {
              nameInput.value = uploadedName;
              updatePreview();
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    uploadArea.appendChild(fileInput);
    uploadArea.appendChild(uploadStatus);
    wrap.appendChild(uploadArea);

    // Pick from IDE files area
    var pickArea = document.createElement('div');
    pickArea.style.cssText = 'margin-bottom:10px;display:none;';
    var dspFiles = this.opts.getDspFileList().filter(f => f.endsWith('.dsp'));
    if (dspFiles.length === 0) {
      var noFiles = document.createElement('div');
      noFiles.style.cssText = 'color:#666;font-size:11px;padding:6px 0;';
      noFiles.textContent = 'No .dsp files in the IDE project. Upload a file instead.';
      pickArea.appendChild(noFiles);
    } else {
      var sel = document.createElement('select');
      sel.style.cssText = 'background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:4px;padding:5px 8px;font-size:12px;width:280px;';
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = '— select a .dsp file —';
      sel.appendChild(placeholder);
      var _iterator = _createForOfIteratorHelper(dspFiles),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var f = _step.value;
          var opt = document.createElement('option');
          opt.value = f;
          opt.textContent = f;
          sel.appendChild(opt);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var pickStatus = document.createElement('div');
      pickStatus.style.cssText = 'font-size:11px;color:#666;margin-top:4px;font-family:monospace;';
      sel.addEventListener('change', () => {
        if (!sel.value) {
          pickStatus.textContent = '';
          uploadedCode = '';
          uploadedName = '';
          return;
        }
        var code = this.opts.getDspFileContent(sel.value);
        uploadedCode = code;
        uploadedName = sel.value.replace(/\.dsp$/i, '');
        pickStatus.textContent = "\u2713 ".concat(sel.value, "  (").concat(code.length, " chars)");
        pickStatus.style.color = '#4a4';
        // Always update name when picking from files
        nameInput.value = uploadedName;
        updatePreview();
      });
      pickArea.appendChild(sel);
      pickArea.appendChild(pickStatus);
    }
    wrap.appendChild(pickArea);

    // Error message
    var errMsg = document.createElement('div');
    errMsg.style.cssText = 'color:#f44;font-size:11px;margin-top:6px;min-height:16px;';
    wrap.appendChild(errMsg);
    this.stepContainer.appendChild(wrap);
    this.appendNavButtons(null, () => {
      var val = nameInput.value.trim();
      var result = this.validator.validate(val);
      if (!result.valid) {
        errMsg.textContent = result.error || 'Invalid file name';
        return;
      }
      if (!uploadedCode) {
        errMsg.textContent = 'Please select or upload a .dsp source file';
        return;
      }
      this.outputName = val;
      this.dspCode = uploadedCode;
      this.dspSourceMode = selectedMode;
      this.pickedFileName = selectedMode === 'pick' ? uploadedName + '.dsp' : '';
      this.sentToEditor = false;
      this.showStep(1);
    }, 'Next →');
  }

  // ── Step 2: Attachments ────────────────────────────────────────────────────

  renderStep2() {
    var wrap = this.makeStepWrap('Step 2: Add Attachment Files (optional)');
    var desc = document.createElement('p');
    desc.textContent = 'Optionally add audio files (.wav / .aif / .flac) and Faust library files (.dsp).';
    desc.style.cssText = 'color:#aaa;font-size:11px;margin:0 0 12px;';
    wrap.appendChild(desc);
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.wav,.aif,.aiff,.flac,.dsp';
    fileInput.style.cssText = 'color:#ccc;font-size:11px;';
    wrap.appendChild(fileInput);
    var list = document.createElement('ul');
    list.style.cssText = 'margin:8px 0 0;padding-left:16px;color:#8cf;font-size:11px;';
    wrap.appendChild(list);
    var renderList = () => {
      list.innerHTML = '';
      this.attachments.forEach((f, i) => {
        var li = document.createElement('li');
        li.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:2px;';
        li.textContent = f.name;
        var del = document.createElement('button');
        del.textContent = '✕';
        del.style.cssText = 'background:none;border:none;color:#f44;cursor:pointer;font-size:10px;padding:0 2px;';
        del.addEventListener('click', () => {
          this.attachments.splice(i, 1);
          renderList();
        });
        li.appendChild(del);
        list.appendChild(li);
      });
    };
    fileInput.addEventListener('change', () => {
      if (fileInput.files) {
        Array.from(fileInput.files).forEach(f => this.attachments.push(f));
        renderList();
      }
    });
    renderList();
    this.stepContainer.appendChild(wrap);
    this.appendNavButtons(() => this.showStep(0), () => this.showStep(2), 'Next →');
  }

  // ── Step 3: SHCUI editing ──────────────────────────────────────────────────

  renderStep3() {
    var titleBar = document.createElement('div');
    titleBar.style.cssText = 'display:flex;align-items:center;padding:6px 14px;background:#252526;border-bottom:1px solid #333;flex-shrink:0;gap:8px;';
    var titleLabel = document.createElement('span');
    titleLabel.textContent = 'Step 3: Edit SHCUI Layout';
    titleLabel.style.cssText = 'font-weight:bold;color:#ccc;font-size:12px;flex:1;';
    titleBar.appendChild(titleLabel);
    var parseBtn = document.createElement('button');
    parseBtn.textContent = '↻ Parse DSP';
    parseBtn.style.cssText = 'background:#2a4a2a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;';
    titleBar.appendChild(parseBtn);
    if (this.dspSourceMode === 'upload') {
      // External upload: show Send to Editor button
      var sendBtn = document.createElement('button');
      sendBtn.textContent = this.sentToEditor ? '✓ Synced to Editor' : '▶ Send to Editor';
      sendBtn.title = 'Register this DSP in the IDE editor for compilation';
      sendBtn.style.cssText = "background:".concat(this.sentToEditor ? '#2a4a2a' : '#3a2a5a', ";color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;");
      sendBtn.addEventListener('click', () => {
        this.opts.pushToEditor("".concat(this.outputName, ".dsp"), this.dspCode);
        this.sentToEditor = true;
        sendBtn.textContent = '✓ Synced to Editor';
        sendBtn.style.background = '#2a4a2a';
      });
      titleBar.appendChild(sendBtn);
    } else {
      // Picked from IDE: show sync status indicator
      var syncLabel = document.createElement('span');
      syncLabel.style.cssText = 'font-size:10px;color:#4a4;padding:2px 6px;background:#1a2a1a;border-radius:3px;';
      syncLabel.textContent = "\u2194 Linked: ".concat(this.pickedFileName);
      syncLabel.title = 'Changes sync back to the IDE file automatically';
      titleBar.appendChild(syncLabel);
    }
    this.stepContainer.appendChild(titleBar);
    var body = document.createElement('div');
    body.style.cssText = 'flex:1;display:flex;overflow:hidden;min-height:0;';
    var sidebar3 = this.makeProjectSidebar();
    body.appendChild(sidebar3);
    body.appendChild((0,_ResizeDivider__WEBPACK_IMPORTED_MODULE_13__/* .makeDivider */ .g)(sidebar3, null, 60, 300));
    var canvasWrap = document.createElement('div');
    canvasWrap.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;';
    var propWrap = document.createElement('div');
    propWrap.style.cssText = 'width:220px;flex-shrink:0;overflow-y:auto;';
    body.appendChild(canvasWrap);
    body.appendChild((0,_ResizeDivider__WEBPACK_IMPORTED_MODULE_13__/* .makeDivider */ .g)(null, propWrap, 100, 500));
    body.appendChild(propWrap);
    this.stepContainer.appendChild(body);
    var propPanel;

    // setCode: update internal dspCode, and if 'pick' mode sync back to IDE
    var setCode = code => {
      this.dspCode = code;
      if (this.dspSourceMode === 'pick' && this.pickedFileName) {
        // Sync back to the IDE file manager
        this.opts.pushToEditor(this.pickedFileName, code);
      } else if (this.dspSourceMode === 'upload' && this.sentToEditor) {
        // Keep IDE in sync if already sent
        this.opts.pushToEditor("".concat(this.outputName, ".dsp"), code);
      }
    };
    var canvas = new _SHCUICanvas__WEBPACK_IMPORTED_MODULE_6__/* .SHCUICanvas */ .B({
      container: canvasWrap,
      getCode: () => this.dspCode,
      onChange: (el, x, y, w, h) => {
        var _propPanel;
        setCode(this.editor.upsertSHCUI(this.dspCode, el.paramPath, el));
        (_propPanel = propPanel) === null || _propPanel === void 0 || _propPanel.updatePosition(x, y, w, h);
      },
      onAdd: el => {
        var _propPanel2;
        setCode(this.editor.upsertSHCUI(this.dspCode, el.paramPath, el));
        (_propPanel2 = propPanel) === null || _propPanel2 === void 0 || _propPanel2.setElement(el);
      }
    });
    propPanel = new _PropertyPanel__WEBPACK_IMPORTED_MODULE_7__/* .PropertyPanel */ .Q({
      container: propWrap,
      onUpdate: el => {
        setCode(this.editor.upsertSHCUI(this.dspCode, el.paramPath, el));
        canvas.render();
      },
      onDelete: el => {
        setCode(this.editor.removeSHCUI(this.dspCode, el.paramPath));
        canvas.setElements(this.parser.parse(this.dspCode).data);
        propPanel.setElement(null);
      }
    });
    var lastSel = undefined;
    var selPoll = setInterval(() => {
      var sel = canvas.getSelectedElement();
      if (sel !== lastSel) {
        lastSel = sel;
        propPanel.setElement(sel);
      }
    }, 100);
    parseBtn.addEventListener('click', () => canvas.setElements(this.parser.parse(this.dspCode).data));
    canvas.setElements(this.parser.parse(this.dspCode).data);
    this.appendNavButtons(() => {
      clearInterval(selPoll);
      this.showStep(1);
    }, () => {
      clearInterval(selPoll);
      this.showStep(3);
    }, 'Next →');
  }

  // ── Step 4: Motion / Cue / ShowName ───────────────────────────────────────

  renderStep4() {
    var wrap = this.makeStepWrap('Step 4: Configure Motion / Cue / ShowName');
    wrap.style.flex = '1';
    wrap.style.overflow = 'hidden';
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';

    // Project files sidebar + content
    var body = document.createElement('div');
    body.style.cssText = 'flex:1;display:flex;overflow:hidden;min-height:0;';
    var sidebar4 = this.makeProjectSidebar();
    body.appendChild(sidebar4);
    body.appendChild((0,_ResizeDivider__WEBPACK_IMPORTED_MODULE_13__/* .makeDivider */ .g)(sidebar4, null, 60, 300));
    var content = document.createElement('div');
    content.style.cssText = 'flex:1;display:flex;flex-direction:column;overflow:hidden;';
    body.appendChild(content);
    var tabNav = document.createElement('div');
    tabNav.style.cssText = 'display:flex;background:#252526;border-bottom:1px solid #333;flex-shrink:0;';
    var tabContents = document.createElement('div');
    tabContents.style.cssText = 'flex:1;overflow:hidden;display:flex;';
    var makeTab = function makeTab(label) {
      var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var btn = document.createElement('button');
      btn.textContent = label;
      btn.style.cssText = "padding:4px 10px;border:none;cursor:pointer;font-size:11px;background:".concat(active ? '#1e1e1e' : 'transparent', ";color:").concat(active ? '#4af' : '#888', ";border-bottom:").concat(active ? '2px solid #4af' : '2px solid transparent', ";");
      var pane = document.createElement('div');
      pane.style.cssText = "display:".concat(active ? 'flex' : 'none', ";flex:1;overflow:hidden;");
      tabNav.appendChild(btn);
      tabContents.appendChild(pane);
      return [btn, pane];
    };
    var _makeTab = makeTab('Motion', true),
      _makeTab2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_makeTab, 2),
      motionBtn = _makeTab2[0],
      motionPane = _makeTab2[1];
    var _makeTab3 = makeTab('Cue'),
      _makeTab4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_makeTab3, 2),
      cueBtn = _makeTab4[0],
      cuePane = _makeTab4[1];
    var _makeTab5 = makeTab('ShowName'),
      _makeTab6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_makeTab5, 2),
      showNameBtn = _makeTab6[0],
      showNamePane = _makeTab6[1];
    var allBtns = [motionBtn, cueBtn, showNameBtn];
    var allPanes = [motionPane, cuePane, showNamePane];

    // Internal getCode/setCode closures over this.dspCode
    var getCode = () => this.dspCode;
    var setCode = code => {
      this.dspCode = code;
      if (this.dspSourceMode === 'pick' && this.pickedFileName) {
        this.opts.pushToEditor(this.pickedFileName, code);
      } else if (this.dspSourceMode === 'upload' && this.sentToEditor) {
        this.opts.pushToEditor("".concat(this.outputName, ".dsp"), code);
      }
    };
    var motionPanel;
    var cuePanel;
    var showNamePanel;
    allBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        var _motionPanel, _cuePanel, _showNamePanel;
        allBtns.forEach((b, j) => {
          b.style.background = j === i ? '#1e1e1e' : 'transparent';
          b.style.color = j === i ? '#4af' : '#888';
          b.style.borderBottom = j === i ? '2px solid #4af' : '2px solid transparent';
          allPanes[j].style.display = j === i ? 'flex' : 'none';
        });
        if (i === 0) (_motionPanel = motionPanel) === null || _motionPanel === void 0 || _motionPanel.parseParamsFromCode(this.dspCode);
        if (i === 1) (_cuePanel = cuePanel) === null || _cuePanel === void 0 || _cuePanel.refresh();
        if (i === 2) (_showNamePanel = showNamePanel) === null || _showNamePanel === void 0 || _showNamePanel.parseParamsFromCode(this.dspCode);
      });
    });
    content.appendChild(tabNav);
    content.appendChild(tabContents);
    wrap.appendChild(body);
    this.stepContainer.appendChild(wrap);
    var motionWrap = document.createElement('div');
    motionWrap.style.cssText = 'flex:1;overflow:hidden;';
    motionPane.appendChild(motionWrap);
    var cueWrap = document.createElement('div');
    cueWrap.style.cssText = 'flex:1;overflow:hidden;';
    cuePane.appendChild(cueWrap);
    var showNameWrap = document.createElement('div');
    showNameWrap.style.cssText = 'flex:1;overflow:hidden;';
    showNamePane.appendChild(showNameWrap);
    motionPanel = new _MotionPanel__WEBPACK_IMPORTED_MODULE_8__/* .MotionPanel */ .L({
      container: motionWrap,
      getCode,
      setCode
    });
    cuePanel = new _CuePanel__WEBPACK_IMPORTED_MODULE_9__/* .CuePanel */ .E({
      container: cueWrap,
      getCode,
      setCode
    });
    showNamePanel = new _ShowNamePanel__WEBPACK_IMPORTED_MODULE_10__/* .ShowNamePanel */ .$({
      container: showNameWrap,
      getCode,
      setCode
    });
    motionPanel.parseParamsFromCode(this.dspCode);
    this.appendNavButtons(() => this.showStep(2), () => this.showStep(4), 'Next →');
  }

  // ── Step 5: Confirm & export ───────────────────────────────────────────────

  renderStep5() {
    var _this = this;
    var wrap = this.makeStepWrap('Step 5: Confirm & Export');

    // Naming check box
    var nameBox = document.createElement('div');
    nameBox.style.cssText = 'background:#1a2a1a;border:1px solid #2a4a2a;border-radius:4px;padding:10px 14px;margin-bottom:12px;font-size:11px;line-height:1.8;';
    nameBox.innerHTML = "\n      <div style=\"color:#4a4;font-weight:bold;margin-bottom:4px;\">\u2713 Naming check</div>\n      <div>Archive: <code style=\"color:#8cf;\">".concat(this.outputName, ".FaustPiece</code></div>\n      <div>Main DSP inside: <code style=\"color:#8cf;\">").concat(this.outputName, ".dsp</code></div>\n      <div style=\"color:#888;margin-top:4px;font-size:10px;\">Names match \u2014 SHCdyna will load this correctly.</div>\n    ");
    wrap.appendChild(nameBox);

    // Project files summary
    var filesBox = document.createElement('div');
    filesBox.style.cssText = 'background:#252526;border:1px solid #3a3a3a;border-radius:4px;padding:8px 14px;margin-bottom:12px;font-size:11px;line-height:1.8;';
    var attNames = this.attachments.map(f => f.name);
    filesBox.innerHTML = "\n      <div><b style=\"color:#4af\">Files in archive:</b></div>\n      <div style=\"color:#8cf;font-family:monospace;\">\uD83D\uDCC4 ".concat(this.outputName, ".dsp (main DSP)</div>\n      ").concat(attNames.map(n => "<div style=\"color:#aaa;font-family:monospace;\">".concat(n.match(/\.(wav|aif|flac)$/i) ? '🎵' : '📎', " ").concat(n, "</div>")).join(''), "\n      ").concat(attNames.length === 0 ? '<div style="color:#666;font-size:10px;">(no attachments)</div>' : '', "\n    ");
    wrap.appendChild(filesBox);
    var errMsg = document.createElement('div');
    errMsg.style.cssText = 'color:#f44;font-size:11px;margin-bottom:6px;min-height:16px;';
    wrap.appendChild(errMsg);
    var exportBtn = document.createElement('button');
    exportBtn.textContent = '⬇ Export .FaustPiece';
    exportBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:8px 20px;cursor:pointer;font-size:13px;';
    exportBtn.addEventListener('click', /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
      var validation, attachmentContents, _iterator2, _step2, file, data, _t, _t2, _t3, _t4, _t5, _t6;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            validation = _this.validator.validate(_this.outputName);
            if (validation.valid) {
              _context2.next = 1;
              break;
            }
            errMsg.textContent = validation.error || 'Invalid file name';
            return _context2.abrupt("return");
          case 1:
            exportBtn.disabled = true;
            exportBtn.textContent = 'Packing…';
            _context2.prev = 2;
            attachmentContents = new Map();
            _iterator2 = _createForOfIteratorHelper(_this.attachments);
            _context2.prev = 3;
            _iterator2.s();
          case 4:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 7;
              break;
            }
            file = _step2.value;
            _t = attachmentContents;
            _t2 = file.name;
            _t3 = Uint8Array;
            _context2.next = 5;
            return file.arrayBuffer();
          case 5:
            _t4 = _context2.sent;
            _t.set.call(_t, _t2, new _t3(_t4));
          case 6:
            _context2.next = 4;
            break;
          case 7:
            _context2.next = 9;
            break;
          case 8:
            _context2.prev = 8;
            _t5 = _context2["catch"](3);
            _iterator2.e(_t5);
          case 9:
            _context2.prev = 9;
            _iterator2.f();
            return _context2.finish(9);
          case 10:
            _context2.next = 11;
            return _this.packager.pack({
              outputName: _this.outputName,
              outputDir: '',
              dspContent: _this.dspCode,
              attachments: _this.attachments.map(f => f.name),
              includeAudio: true,
              includeLibs: true
            }, attachmentContents);
          case 11:
            data = _context2.sent;
            _this.opts.downloadFile(data, "".concat(_this.outputName, ".FaustPiece"));
            errMsg.style.color = '#4a4';
            errMsg.textContent = "\u2713 Exported ".concat(_this.outputName, ".FaustPiece");
            exportBtn.textContent = '✓ Done — Export Again';
            exportBtn.disabled = false;
            _context2.next = 13;
            break;
          case 12:
            _context2.prev = 12;
            _t6 = _context2["catch"](2);
            errMsg.textContent = "Export failed: ".concat(_t6.message);
            exportBtn.disabled = false;
            exportBtn.textContent = '⬇ Export .FaustPiece';
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[2, 12], [3, 8, 9, 10]]);
    })));
    wrap.appendChild(exportBtn);
    this.stepContainer.appendChild(wrap);
    this.appendNavButtons(() => this.showStep(3), null, null);
  }

  // ── Project files sidebar ─────────────────────────────────────────────────

  makeProjectSidebar() {
    var sidebar = document.createElement('div');
    sidebar.style.cssText = 'width:150px;flex-shrink:0;display:flex;flex-direction:column;background:#252526;overflow:hidden;';
    var title = document.createElement('div');
    title.style.cssText = 'padding:5px 8px;font-size:10px;color:#666;border-bottom:1px solid #333;flex-shrink:0;text-transform:uppercase;letter-spacing:0.5px;';
    title.textContent = 'Project Files';
    sidebar.appendChild(title);
    var list = document.createElement('div');
    list.style.cssText = 'flex:1;overflow-y:auto;padding:4px 0;';

    // Main DSP
    var dspRow = document.createElement('div');
    dspRow.style.cssText = 'display:flex;align-items:center;padding:3px 8px;gap:4px;';
    dspRow.innerHTML = "<span style=\"font-size:11px;\">\uD83D\uDCC4</span><span style=\"flex:1;font-size:11px;color:#8cf;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;\" title=\"".concat(this.outputName, ".dsp\">").concat(this.outputName, ".dsp</span>");
    list.appendChild(dspRow);

    // Attachments
    var _iterator3 = _createForOfIteratorHelper(this.attachments),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var f = _step3.value;
        var row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;padding:3px 8px;gap:4px;';
        var icon = f.name.match(/\.(wav|aif|flac)$/i) ? '🎵' : '📎';
        row.innerHTML = "<span style=\"font-size:11px;\">".concat(icon, "</span><span style=\"flex:1;font-size:11px;color:#aaa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;\" title=\"").concat(f.name, "\">").concat(f.name, "</span>");
        list.appendChild(row);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    sidebar.appendChild(list);
    return sidebar;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  makeStepWrap(title) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'padding:14px 16px;overflow-y:auto;';
    var h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-weight:bold;color:#ccc;font-size:12px;margin-bottom:10px;';
    wrap.appendChild(h);
    return wrap;
  }
  appendNavButtons(onBack, onNext, nextLabel) {
    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;gap:8px;padding:10px 16px;background:#252526;border-top:1px solid #333;flex-shrink:0;';
    if (onBack) {
      var backBtn = document.createElement('button');
      backBtn.textContent = '← Back';
      backBtn.style.cssText = 'background:#3a3a3a;color:#ccc;border:none;border-radius:3px;padding:5px 14px;cursor:pointer;font-size:12px;';
      backBtn.addEventListener('click', onBack);
      bar.appendChild(backBtn);
    }
    bar.appendChild(document.createElement('span'));
    if (onNext && nextLabel) {
      var nextBtn = document.createElement('button');
      nextBtn.textContent = nextLabel;
      nextBtn.style.cssText = 'background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:5px 14px;cursor:pointer;font-size:12px;';
      nextBtn.addEventListener('click', onNext);
      bar.appendChild(nextBtn);
    }
    this.stepContainer.appendChild(bar);
  }
}

/***/ }

}]);
//# sourceMappingURL=1b303270bc93433b004f.js.map