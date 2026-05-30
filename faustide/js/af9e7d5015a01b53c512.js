"use strict";
(self["webpackChunkfausteditorweb"] = self["webpackChunkfausteditorweb"] || []).push([[9522],{

/***/ 19664
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IF: () => (/* binding */ typescriptDefaults)
/* harmony export */ });
/* unused harmony exports JsxEmit, ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget, getJavaScriptWorker, getTypeScriptWorker, javascriptDefaults, typescriptVersion */
/* harmony import */ var _editor_editor_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3669);

/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// src/language/typescript/lib/typescriptServicesMetadata.ts
var typescriptVersion = "5.0.2";

// src/fillers/monaco-editor-core.ts
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, _editor_editor_api_js__WEBPACK_IMPORTED_MODULE_0__);


// src/language/typescript/monaco.contribution.ts
var ModuleKind = /* @__PURE__ */ ((ModuleKind2) => {
  ModuleKind2[ModuleKind2["None"] = 0] = "None";
  ModuleKind2[ModuleKind2["CommonJS"] = 1] = "CommonJS";
  ModuleKind2[ModuleKind2["AMD"] = 2] = "AMD";
  ModuleKind2[ModuleKind2["UMD"] = 3] = "UMD";
  ModuleKind2[ModuleKind2["System"] = 4] = "System";
  ModuleKind2[ModuleKind2["ES2015"] = 5] = "ES2015";
  ModuleKind2[ModuleKind2["ESNext"] = 99] = "ESNext";
  return ModuleKind2;
})(ModuleKind || {});
var JsxEmit = /* @__PURE__ */ ((JsxEmit2) => {
  JsxEmit2[JsxEmit2["None"] = 0] = "None";
  JsxEmit2[JsxEmit2["Preserve"] = 1] = "Preserve";
  JsxEmit2[JsxEmit2["React"] = 2] = "React";
  JsxEmit2[JsxEmit2["ReactNative"] = 3] = "ReactNative";
  JsxEmit2[JsxEmit2["ReactJSX"] = 4] = "ReactJSX";
  JsxEmit2[JsxEmit2["ReactJSXDev"] = 5] = "ReactJSXDev";
  return JsxEmit2;
})(JsxEmit || {});
var NewLineKind = /* @__PURE__ */ ((NewLineKind2) => {
  NewLineKind2[NewLineKind2["CarriageReturnLineFeed"] = 0] = "CarriageReturnLineFeed";
  NewLineKind2[NewLineKind2["LineFeed"] = 1] = "LineFeed";
  return NewLineKind2;
})(NewLineKind || {});
var ScriptTarget = /* @__PURE__ */ ((ScriptTarget2) => {
  ScriptTarget2[ScriptTarget2["ES3"] = 0] = "ES3";
  ScriptTarget2[ScriptTarget2["ES5"] = 1] = "ES5";
  ScriptTarget2[ScriptTarget2["ES2015"] = 2] = "ES2015";
  ScriptTarget2[ScriptTarget2["ES2016"] = 3] = "ES2016";
  ScriptTarget2[ScriptTarget2["ES2017"] = 4] = "ES2017";
  ScriptTarget2[ScriptTarget2["ES2018"] = 5] = "ES2018";
  ScriptTarget2[ScriptTarget2["ES2019"] = 6] = "ES2019";
  ScriptTarget2[ScriptTarget2["ES2020"] = 7] = "ES2020";
  ScriptTarget2[ScriptTarget2["ESNext"] = 99] = "ESNext";
  ScriptTarget2[ScriptTarget2["JSON"] = 100] = "JSON";
  ScriptTarget2[ScriptTarget2["Latest"] = 99 /* ESNext */] = "Latest";
  return ScriptTarget2;
})(ScriptTarget || {});
var ModuleResolutionKind = /* @__PURE__ */ ((ModuleResolutionKind2) => {
  ModuleResolutionKind2[ModuleResolutionKind2["Classic"] = 1] = "Classic";
  ModuleResolutionKind2[ModuleResolutionKind2["NodeJs"] = 2] = "NodeJs";
  return ModuleResolutionKind2;
})(ModuleResolutionKind || {});
var LanguageServiceDefaultsImpl = class {
  _onDidChange = new monaco_editor_core_exports.Emitter();
  _onDidExtraLibsChange = new monaco_editor_core_exports.Emitter();
  _extraLibs;
  _removedExtraLibs;
  _eagerModelSync;
  _compilerOptions;
  _diagnosticsOptions;
  _workerOptions;
  _onDidExtraLibsChangeTimeout;
  _inlayHintsOptions;
  _modeConfiguration;
  constructor(compilerOptions, diagnosticsOptions, workerOptions, inlayHintsOptions, modeConfiguration) {
    this._extraLibs = /* @__PURE__ */ Object.create(null);
    this._removedExtraLibs = /* @__PURE__ */ Object.create(null);
    this._eagerModelSync = false;
    this.setCompilerOptions(compilerOptions);
    this.setDiagnosticsOptions(diagnosticsOptions);
    this.setWorkerOptions(workerOptions);
    this.setInlayHintsOptions(inlayHintsOptions);
    this.setModeConfiguration(modeConfiguration);
    this._onDidExtraLibsChangeTimeout = -1;
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get onDidExtraLibsChange() {
    return this._onDidExtraLibsChange.event;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  get workerOptions() {
    return this._workerOptions;
  }
  get inlayHintsOptions() {
    return this._inlayHintsOptions;
  }
  getExtraLibs() {
    return this._extraLibs;
  }
  addExtraLib(content, _filePath) {
    let filePath;
    if (typeof _filePath === "undefined") {
      filePath = `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
    } else {
      filePath = _filePath;
    }
    if (this._extraLibs[filePath] && this._extraLibs[filePath].content === content) {
      return {
        dispose: () => {
        }
      };
    }
    let myVersion = 1;
    if (this._removedExtraLibs[filePath]) {
      myVersion = this._removedExtraLibs[filePath] + 1;
    }
    if (this._extraLibs[filePath]) {
      myVersion = this._extraLibs[filePath].version + 1;
    }
    this._extraLibs[filePath] = {
      content,
      version: myVersion
    };
    this._fireOnDidExtraLibsChangeSoon();
    return {
      dispose: () => {
        let extraLib = this._extraLibs[filePath];
        if (!extraLib) {
          return;
        }
        if (extraLib.version !== myVersion) {
          return;
        }
        delete this._extraLibs[filePath];
        this._removedExtraLibs[filePath] = myVersion;
        this._fireOnDidExtraLibsChangeSoon();
      }
    };
  }
  setExtraLibs(libs) {
    for (const filePath in this._extraLibs) {
      this._removedExtraLibs[filePath] = this._extraLibs[filePath].version;
    }
    this._extraLibs = /* @__PURE__ */ Object.create(null);
    if (libs && libs.length > 0) {
      for (const lib of libs) {
        const filePath = lib.filePath || `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
        const content = lib.content;
        let myVersion = 1;
        if (this._removedExtraLibs[filePath]) {
          myVersion = this._removedExtraLibs[filePath] + 1;
        }
        this._extraLibs[filePath] = {
          content,
          version: myVersion
        };
      }
    }
    this._fireOnDidExtraLibsChangeSoon();
  }
  _fireOnDidExtraLibsChangeSoon() {
    if (this._onDidExtraLibsChangeTimeout !== -1) {
      return;
    }
    this._onDidExtraLibsChangeTimeout = window.setTimeout(() => {
      this._onDidExtraLibsChangeTimeout = -1;
      this._onDidExtraLibsChange.fire(void 0);
    }, 0);
  }
  getCompilerOptions() {
    return this._compilerOptions;
  }
  setCompilerOptions(options) {
    this._compilerOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  getDiagnosticsOptions() {
    return this._diagnosticsOptions;
  }
  setDiagnosticsOptions(options) {
    this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  setWorkerOptions(options) {
    this._workerOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  setInlayHintsOptions(options) {
    this._inlayHintsOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
  setMaximumWorkerIdleTime(value) {
  }
  setEagerModelSync(value) {
    this._eagerModelSync = value;
  }
  getEagerModelSync() {
    return this._eagerModelSync;
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(void 0);
  }
};
var typescriptVersion2 = typescriptVersion;
var modeConfigurationDefault = {
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  definitions: true,
  references: true,
  documentHighlights: true,
  rename: true,
  diagnostics: true,
  documentRangeFormattingEdits: true,
  signatureHelp: true,
  onTypeFormattingEdits: true,
  codeActions: true,
  inlayHints: true
};
var typescriptDefaults = new LanguageServiceDefaultsImpl({ allowNonTsExtensions: true, target: 99 /* Latest */ }, { noSemanticValidation: false, noSyntaxValidation: false, onlyVisible: false }, {}, {}, modeConfigurationDefault);
var javascriptDefaults = new LanguageServiceDefaultsImpl({ allowNonTsExtensions: true, allowJs: true, target: 99 /* Latest */ }, { noSemanticValidation: true, noSyntaxValidation: false, onlyVisible: false }, {}, {}, modeConfigurationDefault);
var getTypeScriptWorker = () => {
  return getMode().then((mode) => mode.getTypeScriptWorker());
};
var getJavaScriptWorker = () => {
  return getMode().then((mode) => mode.getJavaScriptWorker());
};
monaco_editor_core_exports.languages.typescript = {
  ModuleKind,
  JsxEmit,
  NewLineKind,
  ScriptTarget,
  ModuleResolutionKind,
  typescriptVersion: typescriptVersion2,
  typescriptDefaults,
  javascriptDefaults,
  getTypeScriptWorker,
  getJavaScriptWorker
};
function getMode() {
  if (false) // removed by dead control flow
{} else {
    return __webpack_require__.e(/* import() */ 9355).then(__webpack_require__.bind(__webpack_require__, 59355));
  }
}
monaco_editor_core_exports.languages.onLanguage("typescript", () => {
  return getMode().then((mode) => mode.setupTypeScript(typescriptDefaults));
});
monaco_editor_core_exports.languages.onLanguage("javascript", () => {
  return getMode().then((mode) => mode.setupJavaScript(javascriptDefaults));
});



/***/ },

/***/ 79522
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  CancellationTokenSource: () => (/* reexport */ editor_api.CancellationTokenSource),
  Emitter: () => (/* reexport */ editor_api.Emitter),
  KeyCode: () => (/* reexport */ editor_api.KeyCode),
  KeyMod: () => (/* reexport */ editor_api.KeyMod),
  MarkerSeverity: () => (/* reexport */ editor_api.MarkerSeverity),
  MarkerTag: () => (/* reexport */ editor_api.MarkerTag),
  Position: () => (/* reexport */ editor_api.Position),
  Range: () => (/* reexport */ editor_api.Range),
  Selection: () => (/* reexport */ editor_api.Selection),
  SelectionDirection: () => (/* reexport */ editor_api.SelectionDirection),
  Token: () => (/* reexport */ editor_api.Token),
  Uri: () => (/* reexport */ editor_api.Uri),
  "default": () => (/* binding */ editor_main),
  editor: () => (/* reexport */ editor_api.editor),
  languages: () => (/* reexport */ editor_api.languages)
});

// NAMESPACE OBJECT: ./node_modules/monaco-editor/esm/vs/editor/editor.main.js
var editor_main_namespaceObject = {};
__webpack_require__.r(editor_main_namespaceObject);
__webpack_require__.d(editor_main_namespaceObject, {
  CancellationTokenSource: () => (editor_api.CancellationTokenSource),
  Emitter: () => (editor_api.Emitter),
  KeyCode: () => (editor_api.KeyCode),
  KeyMod: () => (editor_api.KeyMod),
  MarkerSeverity: () => (editor_api.MarkerSeverity),
  MarkerTag: () => (editor_api.MarkerTag),
  Position: () => (editor_api.Position),
  Range: () => (editor_api.Range),
  Selection: () => (editor_api.Selection),
  SelectionDirection: () => (editor_api.SelectionDirection),
  Token: () => (editor_api.Token),
  Uri: () => (editor_api.Uri),
  editor: () => (editor_api.editor),
  languages: () => (editor_api.languages)
});

// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/anchorSelect/browser/anchorSelect.js + 1 modules
var anchorSelect = __webpack_require__(99594);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/browser/bracketMatching.js + 1 modules
var bracketMatching = __webpack_require__(21283);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/browser/coreCommands.js + 1 modules
var coreCommands = __webpack_require__(72521);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/caretOperations/browser/caretOperations.js + 1 modules
var caretOperations = __webpack_require__(22498);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/caretOperations/browser/transpose.js
var transpose = __webpack_require__(86302);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/clipboard/browser/clipboard.js
var clipboard = __webpack_require__(67860);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/codeAction/browser/codeActionContributions.js + 1 modules
var codeActionContributions = __webpack_require__(70446);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/codelens/browser/codelensController.js + 4 modules
var codelensController = __webpack_require__(62828);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/colorPicker/browser/colorContributions.js
var colorContributions = __webpack_require__(75923);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/colorPicker/browser/standaloneColorPickerActions.js + 1 modules
var standaloneColorPickerActions = __webpack_require__(91625);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/comment/browser/comment.js + 2 modules
var comment = __webpack_require__(72106);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/contextmenu/browser/contextmenu.js
var contextmenu = __webpack_require__(75368);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/cursorUndo/browser/cursorUndo.js
var cursorUndo = __webpack_require__(23676);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/browser/widget/diffEditor/diffEditor.contribution.js
var diffEditor_contribution = __webpack_require__(39823);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/dnd/browser/dnd.js + 2 modules
var dnd = __webpack_require__(23542);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/browser/documentSymbols.js
var documentSymbols = __webpack_require__(56096);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/copyPasteContribution.js + 1 modules
var copyPasteContribution = __webpack_require__(52597);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/dropOrPasteInto/browser/dropIntoEditorContribution.js + 3 modules
var dropIntoEditorContribution = __webpack_require__(47738);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/find/browser/findController.js + 11 modules
var findController = __webpack_require__(54278);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/folding/browser/folding.js + 2 modules
var folding = __webpack_require__(97157);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/fontZoom/browser/fontZoom.js
var fontZoom = __webpack_require__(55600);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/format/browser/formatActions.js
var formatActions = __webpack_require__(36847);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/gotoError/browser/gotoError.js + 5 modules
var gotoError = __webpack_require__(94269);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js + 1 modules
var standaloneGotoLineQuickAccess = __webpack_require__(94806);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/gotoSymbol/browser/goToCommands.js + 1 modules
var goToCommands = __webpack_require__(95976);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/gotoSymbol/browser/link/goToDefinitionAtPosition.js + 1 modules
var goToDefinitionAtPosition = __webpack_require__(68128);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/hover/browser/hover.js + 3 modules
var hover = __webpack_require__(24486);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js + 1 modules
var iPadShowKeyboard = __webpack_require__(24185);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/inPlaceReplace/browser/inPlaceReplace.js + 2 modules
var inPlaceReplace = __webpack_require__(71278);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/indentation/browser/indentation.js
var indentation = __webpack_require__(84432);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/inlayHints/browser/inlayHintsContribution.js + 3 modules
var inlayHintsContribution = __webpack_require__(6550);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/inlineCompletions.contribution.js + 13 modules
var inlineCompletions_contribution = __webpack_require__(66500);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/inlineProgress/browser/inlineProgress.js + 1 modules
var inlineProgress = __webpack_require__(21095);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js + 1 modules
var inspectTokens = __webpack_require__(21845);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/lineSelection/browser/lineSelection.js
var lineSelection = __webpack_require__(91064);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/linesOperations/browser/linesOperations.js + 4 modules
var linesOperations = __webpack_require__(43634);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/linkedEditing/browser/linkedEditing.js + 1 modules
var linkedEditing = __webpack_require__(66473);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/links/browser/links.js + 2 modules
var links = __webpack_require__(60746);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/longLinesHelper/browser/longLinesHelper.js
var longLinesHelper = __webpack_require__(55992);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/multicursor/browser/multicursor.js
var multicursor = __webpack_require__(74984);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/browser/parameterHints.js + 4 modules
var parameterHints = __webpack_require__(32029);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js + 5 modules
var standaloneCommandsQuickAccess = __webpack_require__(5309);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js + 1 modules
var standaloneHelpQuickAccess = __webpack_require__(84253);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js + 2 modules
var standaloneGotoSymbolQuickAccess = __webpack_require__(1722);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/readOnlyMessage/browser/contribution.js
var contribution = __webpack_require__(36651);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch.js
var standaloneReferenceSearch = __webpack_require__(73817);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/rename/browser/rename.js + 2 modules
var rename = __webpack_require__(11957);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/semanticTokens/browser/documentSemanticTokens.js
var documentSemanticTokens = __webpack_require__(64302);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/semanticTokens/browser/viewportSemanticTokens.js
var viewportSemanticTokens = __webpack_require__(25110);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/smartSelect/browser/smartSelect.js + 1 modules
var smartSelect = __webpack_require__(33432);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js
var snippetController2 = __webpack_require__(50960);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/stickyScroll/browser/stickyScrollContribution.js + 8 modules
var stickyScrollContribution = __webpack_require__(12809);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/browser/suggestController.js + 12 modules
var suggestController = __webpack_require__(13891);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/browser/suggestInlineCompletions.js
var suggestInlineCompletions = __webpack_require__(1302);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js
var toggleHighContrast = __webpack_require__(16706);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/toggleTabFocusMode/browser/toggleTabFocusMode.js
var toggleTabFocusMode = __webpack_require__(1184);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/tokenization/browser/tokenization.js
var tokenization = __webpack_require__(32526);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/unicodeHighlighter/browser/unicodeHighlighter.js + 5 modules
var unicodeHighlighter = __webpack_require__(80654);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/unusualLineTerminators/browser/unusualLineTerminators.js
var unusualLineTerminators = __webpack_require__(98690);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/wordHighlighter/browser/wordHighlighter.js
var wordHighlighter = __webpack_require__(60980);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/wordOperations/browser/wordOperations.js
var wordOperations = __webpack_require__(21600);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/contrib/wordPartOperations/browser/wordPartOperations.js
var wordPartOperations = __webpack_require__(51302);
// EXTERNAL MODULE: include-loader!./node_modules/monaco-editor/esm/vs/editor/editor.api.js + 68 modules
var editor_api = __webpack_require__(3669);
;// ./node_modules/monaco-editor/esm/vs/basic-languages/_.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// src/fillers/monaco-editor-core.ts
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, editor_api);


// src/basic-languages/_.contribution.ts
var languageDefinitions = {};
var lazyLanguageLoaders = {};
var LazyLanguageLoader = class {
  static getOrCreate(languageId) {
    if (!lazyLanguageLoaders[languageId]) {
      lazyLanguageLoaders[languageId] = new LazyLanguageLoader(languageId);
    }
    return lazyLanguageLoaders[languageId];
  }
  _languageId;
  _loadingTriggered;
  _lazyLoadPromise;
  _lazyLoadPromiseResolve;
  _lazyLoadPromiseReject;
  constructor(languageId) {
    this._languageId = languageId;
    this._loadingTriggered = false;
    this._lazyLoadPromise = new Promise((resolve, reject) => {
      this._lazyLoadPromiseResolve = resolve;
      this._lazyLoadPromiseReject = reject;
    });
  }
  load() {
    if (!this._loadingTriggered) {
      this._loadingTriggered = true;
      languageDefinitions[this._languageId].loader().then((mod) => this._lazyLoadPromiseResolve(mod), (err) => this._lazyLoadPromiseReject(err));
    }
    return this._lazyLoadPromise;
  }
};
async function loadLanguage(languageId) {
  await LazyLanguageLoader.getOrCreate(languageId).load();
  const model = monaco_editor_core_exports.editor.createModel("", languageId);
  model.dispose();
}
function registerLanguage(def) {
  const languageId = def.id;
  languageDefinitions[languageId] = def;
  monaco_editor_core_exports.languages.register(def);
  const lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
  monaco_editor_core_exports.languages.registerTokensProviderFactory(languageId, {
    create: async () => {
      const mod = await lazyLanguageLoader.load();
      return mod.language;
    }
  });
  monaco_editor_core_exports.languages.onLanguageEncountered(languageId, async () => {
    const mod = await lazyLanguageLoader.load();
    monaco_editor_core_exports.languages.setLanguageConfiguration(languageId, mod.conf);
  });
}


;// ./node_modules/monaco-editor/esm/vs/basic-languages/abap/abap.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/abap/abap.contribution.ts

registerLanguage({
  id: "abap",
  extensions: [".abap"],
  aliases: ["abap", "ABAP"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1420).then(__webpack_require__.bind(__webpack_require__, 21420));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/apex/apex.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/apex/apex.contribution.ts

registerLanguage({
  id: "apex",
  extensions: [".cls"],
  aliases: ["Apex", "apex"],
  mimetypes: ["text/x-apex-source", "text/x-apex"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 7048).then(__webpack_require__.bind(__webpack_require__, 67048));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/azcli/azcli.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/azcli/azcli.contribution.ts

registerLanguage({
  id: "azcli",
  extensions: [".azcli"],
  aliases: ["Azure CLI", "azcli"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 3622).then(__webpack_require__.bind(__webpack_require__, 3622));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/bat/bat.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/bat/bat.contribution.ts

registerLanguage({
  id: "bat",
  extensions: [".bat", ".cmd"],
  aliases: ["Batch", "bat"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6185).then(__webpack_require__.bind(__webpack_require__, 88566));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/bicep/bicep.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/bicep/bicep.contribution.ts

registerLanguage({
  id: "bicep",
  extensions: [".bicep"],
  aliases: ["Bicep"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 9510).then(__webpack_require__.bind(__webpack_require__, 29510));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/cameligo/cameligo.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/cameligo/cameligo.contribution.ts

registerLanguage({
  id: "cameligo",
  extensions: [".mligo"],
  aliases: ["Cameligo"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4334).then(__webpack_require__.bind(__webpack_require__, 94334));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/clojure/clojure.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/clojure/clojure.contribution.ts

registerLanguage({
  id: "clojure",
  extensions: [".clj", ".cljs", ".cljc", ".edn"],
  aliases: ["clojure", "Clojure"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 9150).then(__webpack_require__.bind(__webpack_require__, 89150));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/coffee/coffee.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/coffee/coffee.contribution.ts

registerLanguage({
  id: "coffeescript",
  extensions: [".coffee"],
  aliases: ["CoffeeScript", "coffeescript", "coffee"],
  mimetypes: ["text/x-coffeescript", "text/coffeescript"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 968).then(__webpack_require__.bind(__webpack_require__, 10968));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/cpp/cpp.contribution.ts

registerLanguage({
  id: "c",
  extensions: [".c", ".h"],
  aliases: ["C", "c"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6018).then(__webpack_require__.bind(__webpack_require__, 26018));
    }
  }
});
registerLanguage({
  id: "cpp",
  extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx"],
  aliases: ["C++", "Cpp", "cpp"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6018).then(__webpack_require__.bind(__webpack_require__, 26018));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/csharp/csharp.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/csharp/csharp.contribution.ts

registerLanguage({
  id: "csharp",
  extensions: [".cs", ".csx", ".cake"],
  aliases: ["C#", "csharp"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 9038).then(__webpack_require__.bind(__webpack_require__, 69038));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/csp/csp.contribution.ts

registerLanguage({
  id: "csp",
  extensions: [],
  aliases: ["CSP", "csp"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1446).then(__webpack_require__.bind(__webpack_require__, 21446));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/css/css.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/css/css.contribution.ts

registerLanguage({
  id: "css",
  extensions: [".css"],
  aliases: ["CSS", "css"],
  mimetypes: ["text/css"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4958).then(__webpack_require__.bind(__webpack_require__, 34958));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/cypher/cypher.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/cypher/cypher.contribution.ts

registerLanguage({
  id: "cypher",
  extensions: [".cypher", ".cyp"],
  aliases: ["Cypher", "OpenCypher"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 494).then(__webpack_require__.bind(__webpack_require__, 10494));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/dart/dart.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/dart/dart.contribution.ts

registerLanguage({
  id: "dart",
  extensions: [".dart"],
  aliases: ["Dart", "dart"],
  mimetypes: ["text/x-dart-source", "text/x-dart"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 3062).then(__webpack_require__.bind(__webpack_require__, 53062));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/dockerfile/dockerfile.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/dockerfile/dockerfile.contribution.ts

registerLanguage({
  id: "dockerfile",
  extensions: [".dockerfile"],
  filenames: ["Dockerfile"],
  aliases: ["Dockerfile"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2692).then(__webpack_require__.bind(__webpack_require__, 82692));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/ecl/ecl.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/ecl/ecl.contribution.ts

registerLanguage({
  id: "ecl",
  extensions: [".ecl"],
  aliases: ["ECL", "Ecl", "ecl"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2278).then(__webpack_require__.bind(__webpack_require__, 2278));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/elixir/elixir.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/elixir/elixir.contribution.ts

registerLanguage({
  id: "elixir",
  extensions: [".ex", ".exs"],
  aliases: ["Elixir", "elixir", "ex"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 9329).then(__webpack_require__.bind(__webpack_require__, 91710));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/flow9/flow9.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/flow9/flow9.contribution.ts

registerLanguage({
  id: "flow9",
  extensions: [".flow"],
  aliases: ["Flow9", "Flow", "flow9", "flow"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 3726).then(__webpack_require__.bind(__webpack_require__, 13726));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/fsharp/fsharp.contribution.ts

registerLanguage({
  id: "fsharp",
  extensions: [".fs", ".fsi", ".ml", ".mli", ".fsx", ".fsscript"],
  aliases: ["F#", "FSharp", "fsharp"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2244).then(__webpack_require__.bind(__webpack_require__, 12244));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/freemarker2/freemarker2.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/freemarker2/freemarker2.contribution.ts

registerLanguage({
  id: "freemarker2",
  extensions: [".ftl", ".ftlh", ".ftlx"],
  aliases: ["FreeMarker2", "Apache FreeMarker2"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2094).then(__webpack_require__.bind(__webpack_require__, 22094)).then((m) => m.TagAutoInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-angle.interpolation-dollar",
  aliases: ["FreeMarker2 (Angle/Dollar)", "Apache FreeMarker2 (Angle/Dollar)"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2094).then(__webpack_require__.bind(__webpack_require__, 22094)).then((m) => m.TagAngleInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-bracket.interpolation-dollar",
  aliases: ["FreeMarker2 (Bracket/Dollar)", "Apache FreeMarker2 (Bracket/Dollar)"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2094).then(__webpack_require__.bind(__webpack_require__, 22094)).then((m) => m.TagBracketInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-angle.interpolation-bracket",
  aliases: ["FreeMarker2 (Angle/Bracket)", "Apache FreeMarker2 (Angle/Bracket)"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2094).then(__webpack_require__.bind(__webpack_require__, 22094)).then((m) => m.TagAngleInterpolationBracket);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-bracket.interpolation-bracket",
  aliases: ["FreeMarker2 (Bracket/Bracket)", "Apache FreeMarker2 (Bracket/Bracket)"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2094).then(__webpack_require__.bind(__webpack_require__, 22094)).then((m) => m.TagBracketInterpolationBracket);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-auto.interpolation-dollar",
  aliases: ["FreeMarker2 (Auto/Dollar)", "Apache FreeMarker2 (Auto/Dollar)"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2094).then(__webpack_require__.bind(__webpack_require__, 22094)).then((m) => m.TagAutoInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-auto.interpolation-bracket",
  aliases: ["FreeMarker2 (Auto/Bracket)", "Apache FreeMarker2 (Auto/Bracket)"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2094).then(__webpack_require__.bind(__webpack_require__, 22094)).then((m) => m.TagAutoInterpolationBracket);
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/go/go.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/go/go.contribution.ts

registerLanguage({
  id: "go",
  extensions: [".go"],
  aliases: ["Go"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 5364).then(__webpack_require__.bind(__webpack_require__, 25364));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/graphql/graphql.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/graphql/graphql.contribution.ts

registerLanguage({
  id: "graphql",
  extensions: [".graphql", ".gql"],
  aliases: ["GraphQL", "graphql", "gql"],
  mimetypes: ["application/graphql"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8902).then(__webpack_require__.bind(__webpack_require__, 78902));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/handlebars/handlebars.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/handlebars/handlebars.contribution.ts

registerLanguage({
  id: "handlebars",
  extensions: [".handlebars", ".hbs"],
  aliases: ["Handlebars", "handlebars", "hbs"],
  mimetypes: ["text/x-handlebars-template"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 7836).then(__webpack_require__.bind(__webpack_require__, 97836));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/hcl/hcl.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/hcl/hcl.contribution.ts

registerLanguage({
  id: "hcl",
  extensions: [".tf", ".tfvars", ".hcl"],
  aliases: ["Terraform", "tf", "HCL", "hcl"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 9838).then(__webpack_require__.bind(__webpack_require__, 89838));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/html/html.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/html/html.contribution.ts

registerLanguage({
  id: "html",
  extensions: [".html", ".htm", ".shtml", ".xhtml", ".mdoc", ".jsp", ".asp", ".aspx", ".jshtm"],
  aliases: ["HTML", "htm", "html", "xhtml"],
  mimetypes: ["text/html", "text/x-jshtm", "text/template", "text/ng-template"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2658).then(__webpack_require__.bind(__webpack_require__, 92658));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/ini/ini.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/ini/ini.contribution.ts

registerLanguage({
  id: "ini",
  extensions: [".ini", ".properties", ".gitconfig"],
  filenames: ["config", ".gitattributes", ".gitconfig", ".editorconfig"],
  aliases: ["Ini", "ini"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8542).then(__webpack_require__.bind(__webpack_require__, 68542));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/java/java.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/java/java.contribution.ts

registerLanguage({
  id: "java",
  extensions: [".java", ".jav"],
  aliases: ["Java", "java"],
  mimetypes: ["text/x-java-source", "text/x-java"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 7200).then(__webpack_require__.bind(__webpack_require__, 77200));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/javascript/javascript.contribution.ts

registerLanguage({
  id: "javascript",
  extensions: [".js", ".es6", ".jsx", ".mjs", ".cjs"],
  firstLine: "^#!.*\\bnode",
  filenames: ["jakefile"],
  aliases: ["JavaScript", "javascript", "js"],
  mimetypes: ["text/javascript"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 5550).then(__webpack_require__.bind(__webpack_require__, 65550));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/julia/julia.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/julia/julia.contribution.ts

registerLanguage({
  id: "julia",
  extensions: [".jl"],
  aliases: ["julia", "Julia"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2962).then(__webpack_require__.bind(__webpack_require__, 42962));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/kotlin/kotlin.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/kotlin/kotlin.contribution.ts

registerLanguage({
  id: "kotlin",
  extensions: [".kt", ".kts"],
  aliases: ["Kotlin", "kotlin"],
  mimetypes: ["text/x-kotlin-source", "text/x-kotlin"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8566).then(__webpack_require__.bind(__webpack_require__, 28566));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/less/less.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/less/less.contribution.ts

registerLanguage({
  id: "less",
  extensions: [".less"],
  aliases: ["Less", "less"],
  mimetypes: ["text/x-less", "text/less"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1122).then(__webpack_require__.bind(__webpack_require__, 1122));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/lexon/lexon.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/lexon/lexon.contribution.ts

registerLanguage({
  id: "lexon",
  extensions: [".lex"],
  aliases: ["Lexon"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 5130).then(__webpack_require__.bind(__webpack_require__, 5130));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/lua/lua.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/lua/lua.contribution.ts

registerLanguage({
  id: "lua",
  extensions: [".lua"],
  aliases: ["Lua", "lua"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4114).then(__webpack_require__.bind(__webpack_require__, 64114));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/liquid/liquid.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/liquid/liquid.contribution.ts

registerLanguage({
  id: "liquid",
  extensions: [".liquid", ".html.liquid"],
  aliases: ["Liquid", "liquid"],
  mimetypes: ["application/liquid"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 3096).then(__webpack_require__.bind(__webpack_require__, 83096));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/m3/m3.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/m3/m3.contribution.ts

registerLanguage({
  id: "m3",
  extensions: [".m3", ".i3", ".mg", ".ig"],
  aliases: ["Modula-3", "Modula3", "modula3", "m3"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4120).then(__webpack_require__.bind(__webpack_require__, 4120));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/markdown/markdown.contribution.ts

registerLanguage({
  id: "markdown",
  extensions: [".md", ".markdown", ".mdown", ".mkdn", ".mkd", ".mdwn", ".mdtxt", ".mdtext"],
  aliases: ["Markdown", "markdown"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 9390).then(__webpack_require__.bind(__webpack_require__, 29390));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/mdx/mdx.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/mdx/mdx.contribution.ts

registerLanguage({
  id: "mdx",
  extensions: [".mdx"],
  aliases: ["MDX", "mdx"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 5966).then(__webpack_require__.bind(__webpack_require__, 25966));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/mips/mips.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/mips/mips.contribution.ts

registerLanguage({
  id: "mips",
  extensions: [".s"],
  aliases: ["MIPS", "MIPS-V"],
  mimetypes: ["text/x-mips", "text/mips", "text/plaintext"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 398).then(__webpack_require__.bind(__webpack_require__, 70398));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/msdax/msdax.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/msdax/msdax.contribution.ts

registerLanguage({
  id: "msdax",
  extensions: [".dax", ".msdax"],
  aliases: ["DAX", "MSDAX"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 5786).then(__webpack_require__.bind(__webpack_require__, 25786));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/mysql/mysql.contribution.ts

registerLanguage({
  id: "mysql",
  extensions: [],
  aliases: ["MySQL", "mysql"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 7466).then(__webpack_require__.bind(__webpack_require__, 77466));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/objective-c/objective-c.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/objective-c/objective-c.contribution.ts

registerLanguage({
  id: "objective-c",
  extensions: [".m"],
  aliases: ["Objective-C"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2686).then(__webpack_require__.bind(__webpack_require__, 32686));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/pascal/pascal.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/pascal/pascal.contribution.ts

registerLanguage({
  id: "pascal",
  extensions: [".pas", ".p", ".pp"],
  aliases: ["Pascal", "pas"],
  mimetypes: ["text/x-pascal-source", "text/x-pascal"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6940).then(__webpack_require__.bind(__webpack_require__, 56940));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/pascaligo/pascaligo.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/pascaligo/pascaligo.contribution.ts

registerLanguage({
  id: "pascaligo",
  extensions: [".ligo"],
  aliases: ["Pascaligo", "ligo"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8230).then(__webpack_require__.bind(__webpack_require__, 28230));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/perl/perl.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/perl/perl.contribution.ts

registerLanguage({
  id: "perl",
  extensions: [".pl", ".pm"],
  aliases: ["Perl", "pl"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 7886).then(__webpack_require__.bind(__webpack_require__, 57886));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/pgsql/pgsql.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/pgsql/pgsql.contribution.ts

registerLanguage({
  id: "pgsql",
  extensions: [],
  aliases: ["PostgreSQL", "postgres", "pg", "postgre"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 3182).then(__webpack_require__.bind(__webpack_require__, 43182));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/php/php.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/php/php.contribution.ts

registerLanguage({
  id: "php",
  extensions: [".php", ".php4", ".php5", ".phtml", ".ctp"],
  aliases: ["PHP", "php"],
  mimetypes: ["application/x-php"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6302).then(__webpack_require__.bind(__webpack_require__, 56302));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/pla/pla.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/pla/pla.contribution.ts

registerLanguage({
  id: "pla",
  extensions: [".pla"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8390).then(__webpack_require__.bind(__webpack_require__, 98390));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/postiats/postiats.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/postiats/postiats.contribution.ts

registerLanguage({
  id: "postiats",
  extensions: [".dats", ".sats", ".hats"],
  aliases: ["ATS", "ATS/Postiats"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 198).then(__webpack_require__.bind(__webpack_require__, 70198));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/powerquery/powerquery.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/powerquery/powerquery.contribution.ts

registerLanguage({
  id: "powerquery",
  extensions: [".pq", ".pqm"],
  aliases: ["PQ", "M", "Power Query", "Power Query M"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6590).then(__webpack_require__.bind(__webpack_require__, 26590));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/powershell/powershell.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/powershell/powershell.contribution.ts

registerLanguage({
  id: "powershell",
  extensions: [".ps1", ".psm1", ".psd1"],
  aliases: ["PowerShell", "powershell", "ps", "ps1"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4698).then(__webpack_require__.bind(__webpack_require__, 24698));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/protobuf/protobuf.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/protobuf/protobuf.contribution.ts

registerLanguage({
  id: "proto",
  extensions: [".proto"],
  aliases: ["protobuf", "Protocol Buffers"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1118).then(__webpack_require__.bind(__webpack_require__, 21118));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/pug/pug.contribution.ts

registerLanguage({
  id: "pug",
  extensions: [".jade", ".pug"],
  aliases: ["Pug", "Jade", "jade"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 970).then(__webpack_require__.bind(__webpack_require__, 30970));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/python/python.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/python/python.contribution.ts

registerLanguage({
  id: "python",
  extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi"],
  aliases: ["Python", "py"],
  firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 5196).then(__webpack_require__.bind(__webpack_require__, 45196));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/qsharp/qsharp.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/qsharp/qsharp.contribution.ts

registerLanguage({
  id: "qsharp",
  extensions: [".qs"],
  aliases: ["Q#", "qsharp"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 5618).then(__webpack_require__.bind(__webpack_require__, 25618));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/r/r.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/r/r.contribution.ts

registerLanguage({
  id: "r",
  extensions: [".r", ".rhistory", ".rmd", ".rprofile", ".rt"],
  aliases: ["R", "r"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 205).then(__webpack_require__.bind(__webpack_require__, 92586));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/razor/razor.contribution.ts

registerLanguage({
  id: "razor",
  extensions: [".cshtml"],
  aliases: ["Razor", "razor"],
  mimetypes: ["text/x-cshtml"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 946).then(__webpack_require__.bind(__webpack_require__, 80946));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/redis/redis.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/redis/redis.contribution.ts

registerLanguage({
  id: "redis",
  extensions: [".redis"],
  aliases: ["redis"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8990).then(__webpack_require__.bind(__webpack_require__, 88990));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/redshift/redshift.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/redshift/redshift.contribution.ts

registerLanguage({
  id: "redshift",
  extensions: [],
  aliases: ["Redshift", "redshift"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 558).then(__webpack_require__.bind(__webpack_require__, 70558));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/restructuredtext/restructuredtext.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/restructuredtext/restructuredtext.contribution.ts

registerLanguage({
  id: "restructuredtext",
  extensions: [".rst"],
  aliases: ["reStructuredText", "restructuredtext"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 7246).then(__webpack_require__.bind(__webpack_require__, 67246));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/ruby/ruby.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/ruby/ruby.contribution.ts

registerLanguage({
  id: "ruby",
  extensions: [".rb", ".rbx", ".rjs", ".gemspec", ".pp"],
  filenames: ["rakefile", "Gemfile"],
  aliases: ["Ruby", "rb"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1560).then(__webpack_require__.bind(__webpack_require__, 1560));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/rust/rust.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/rust/rust.contribution.ts

registerLanguage({
  id: "rust",
  extensions: [".rs", ".rlib"],
  aliases: ["Rust", "rust"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4680).then(__webpack_require__.bind(__webpack_require__, 44680));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/sb/sb.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/sb/sb.contribution.ts

registerLanguage({
  id: "sb",
  extensions: [".sb"],
  aliases: ["Small Basic", "sb"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4962).then(__webpack_require__.bind(__webpack_require__, 44962));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/scala/scala.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/scala/scala.contribution.ts

registerLanguage({
  id: "scala",
  extensions: [".scala", ".sc", ".sbt"],
  aliases: ["Scala", "scala", "SBT", "Sbt", "sbt", "Dotty", "dotty"],
  mimetypes: ["text/x-scala-source", "text/x-scala", "text/x-sbt", "text/x-dotty"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6446).then(__webpack_require__.bind(__webpack_require__, 66446));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/scheme/scheme.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/scheme/scheme.contribution.ts

registerLanguage({
  id: "scheme",
  extensions: [".scm", ".ss", ".sch", ".rkt"],
  aliases: ["scheme", "Scheme"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8494).then(__webpack_require__.bind(__webpack_require__, 78494));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/scss/scss.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/scss/scss.contribution.ts

registerLanguage({
  id: "scss",
  extensions: [".scss"],
  aliases: ["Sass", "sass", "scss"],
  mimetypes: ["text/x-scss", "text/scss"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1888).then(__webpack_require__.bind(__webpack_require__, 11888));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/shell/shell.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/shell/shell.contribution.ts

registerLanguage({
  id: "shell",
  extensions: [".sh", ".bash"],
  aliases: ["Shell", "sh"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 9034).then(__webpack_require__.bind(__webpack_require__, 89034));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/solidity/solidity.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/solidity/solidity.contribution.ts

registerLanguage({
  id: "sol",
  extensions: [".sol"],
  aliases: ["sol", "solidity", "Solidity"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 3042).then(__webpack_require__.bind(__webpack_require__, 83042));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/sophia/sophia.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/sophia/sophia.contribution.ts

registerLanguage({
  id: "aes",
  extensions: [".aes"],
  aliases: ["aes", "sophia", "Sophia"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8332).then(__webpack_require__.bind(__webpack_require__, 68332));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/sparql/sparql.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/sparql/sparql.contribution.ts

registerLanguage({
  id: "sparql",
  extensions: [".rq"],
  aliases: ["sparql", "SPARQL"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1282).then(__webpack_require__.bind(__webpack_require__, 61282));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/sql/sql.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/sql/sql.contribution.ts

registerLanguage({
  id: "sql",
  extensions: [".sql"],
  aliases: ["SQL"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1914).then(__webpack_require__.bind(__webpack_require__, 21914));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/st/st.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/st/st.contribution.ts

registerLanguage({
  id: "st",
  extensions: [".st", ".iecst", ".iecplc", ".lc3lib", ".TcPOU", ".TcDUT", ".TcGVL", ".TcIO"],
  aliases: ["StructuredText", "scl", "stl"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 8334).then(__webpack_require__.bind(__webpack_require__, 38334));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/swift/swift.contribution.ts

registerLanguage({
  id: "swift",
  aliases: ["Swift", "swift"],
  extensions: [".swift"],
  mimetypes: ["text/swift"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 4630).then(__webpack_require__.bind(__webpack_require__, 24630));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/systemverilog/systemverilog.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/systemverilog/systemverilog.contribution.ts

registerLanguage({
  id: "systemverilog",
  extensions: [".sv", ".svh"],
  aliases: ["SV", "sv", "SystemVerilog", "systemverilog"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2398).then(__webpack_require__.bind(__webpack_require__, 62398));
    }
  }
});
registerLanguage({
  id: "verilog",
  extensions: [".v", ".vh"],
  aliases: ["V", "v", "Verilog", "verilog"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2398).then(__webpack_require__.bind(__webpack_require__, 62398));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/tcl/tcl.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/tcl/tcl.contribution.ts

registerLanguage({
  id: "tcl",
  extensions: [".tcl"],
  aliases: ["tcl", "Tcl", "tcltk", "TclTk", "tcl/tk", "Tcl/Tk"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6414).then(__webpack_require__.bind(__webpack_require__, 26414));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/twig/twig.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/twig/twig.contribution.ts

registerLanguage({
  id: "twig",
  extensions: [".twig"],
  aliases: ["Twig", "twig"],
  mimetypes: ["text/x-twig"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 2586).then(__webpack_require__.bind(__webpack_require__, 22586));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/typescript/typescript.contribution.ts

registerLanguage({
  id: "typescript",
  extensions: [".ts", ".tsx", ".cts", ".mts"],
  aliases: ["TypeScript", "ts", "typescript"],
  mimetypes: ["text/typescript"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6830).then(__webpack_require__.bind(__webpack_require__, 86830));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/vb/vb.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/vb/vb.contribution.ts

registerLanguage({
  id: "vb",
  extensions: [".vb"],
  aliases: ["Visual Basic", "vb"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1740).then(__webpack_require__.bind(__webpack_require__, 41740));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/wgsl/wgsl.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/wgsl/wgsl.contribution.ts

registerLanguage({
  id: "wgsl",
  extensions: [".wgsl"],
  aliases: ["WebGPU Shading Language", "WGSL", "wgsl"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6134).then(__webpack_require__.bind(__webpack_require__, 16134));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/xml/xml.contribution.ts

registerLanguage({
  id: "xml",
  extensions: [
    ".xml",
    ".xsd",
    ".dtd",
    ".ascx",
    ".csproj",
    ".config",
    ".props",
    ".targets",
    ".wxi",
    ".wxl",
    ".wxs",
    ".xaml",
    ".svg",
    ".svgz",
    ".opf",
    ".xslt",
    ".xsl"
  ],
  firstLine: "(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)",
  aliases: ["XML", "xml"],
  mimetypes: ["text/xml", "application/xml", "application/xaml+xml", "application/xml-dtd"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 1438).then(__webpack_require__.bind(__webpack_require__, 1438));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/yaml/yaml.contribution.ts

registerLanguage({
  id: "yaml",
  extensions: [".yaml", ".yml"],
  aliases: ["YAML", "yaml", "YML", "yml"],
  mimetypes: ["application/x-yaml", "text/x-yaml"],
  loader: () => {
    if (false) // removed by dead control flow
{} else {
      return __webpack_require__.e(/* import() */ 6990).then(__webpack_require__.bind(__webpack_require__, 26990));
    }
  }
});

;// ./node_modules/monaco-editor/esm/vs/basic-languages/monaco.contribution.js

/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/monaco.contribution.ts

















































































;// ./node_modules/monaco-editor/esm/vs/language/css/monaco.contribution.js

/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

var monaco_contribution_defProp = Object.defineProperty;
var monaco_contribution_getOwnPropDesc = Object.getOwnPropertyDescriptor;
var monaco_contribution_getOwnPropNames = Object.getOwnPropertyNames;
var monaco_contribution_hasOwnProp = Object.prototype.hasOwnProperty;
var monaco_contribution_copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of monaco_contribution_getOwnPropNames(from))
      if (!monaco_contribution_hasOwnProp.call(to, key) && key !== except)
        monaco_contribution_defProp(to, key, { get: () => from[key], enumerable: !(desc = monaco_contribution_getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var monaco_contribution_reExport = (target, mod, secondTarget) => (monaco_contribution_copyProps(target, mod, "default"), secondTarget && monaco_contribution_copyProps(secondTarget, mod, "default"));

// src/fillers/monaco-editor-core.ts
var monaco_contribution_monaco_editor_core_exports = {};
monaco_contribution_reExport(monaco_contribution_monaco_editor_core_exports, editor_api);


// src/language/css/monaco.contribution.ts
var LanguageServiceDefaultsImpl = class {
  _onDidChange = new monaco_contribution_monaco_editor_core_exports.Emitter();
  _options;
  _modeConfiguration;
  _languageId;
  constructor(languageId, options, modeConfiguration) {
    this._languageId = languageId;
    this.setOptions(options);
    this.setModeConfiguration(modeConfiguration);
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get languageId() {
    return this._languageId;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  get diagnosticsOptions() {
    return this.options;
  }
  get options() {
    return this._options;
  }
  setOptions(options) {
    this._options = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setDiagnosticsOptions(options) {
    this.setOptions(options);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
};
var optionsDefault = {
  validate: true,
  lint: {
    compatibleVendorPrefixes: "ignore",
    vendorPrefix: "warning",
    duplicateProperties: "warning",
    emptyRules: "warning",
    importStatement: "ignore",
    boxModel: "ignore",
    universalSelector: "ignore",
    zeroUnits: "ignore",
    fontFaceProperties: "warning",
    hexColorLength: "error",
    argumentsInColorFunction: "error",
    unknownProperties: "warning",
    ieHack: "ignore",
    unknownVendorSpecificProperties: "ignore",
    propertyIgnoredDueToDisplay: "warning",
    important: "ignore",
    float: "ignore",
    idSelector: "ignore"
  },
  data: { useDefaultDataProvider: true },
  format: {
    newlineBetweenSelectors: true,
    newlineBetweenRules: true,
    spaceAroundSelectorSeparator: false,
    braceStyle: "collapse",
    maxPreserveNewLines: void 0,
    preserveNewLines: true
  }
};
var modeConfigurationDefault = {
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  definitions: true,
  references: true,
  documentHighlights: true,
  rename: true,
  colors: true,
  foldingRanges: true,
  diagnostics: true,
  selectionRanges: true,
  documentFormattingEdits: true,
  documentRangeFormattingEdits: true
};
var cssDefaults = new LanguageServiceDefaultsImpl("css", optionsDefault, modeConfigurationDefault);
var scssDefaults = new LanguageServiceDefaultsImpl("scss", optionsDefault, modeConfigurationDefault);
var lessDefaults = new LanguageServiceDefaultsImpl("less", optionsDefault, modeConfigurationDefault);
monaco_contribution_monaco_editor_core_exports.languages.css = { cssDefaults, lessDefaults, scssDefaults };
function getMode() {
  if (false) // removed by dead control flow
{} else {
    return __webpack_require__.e(/* import() */ 2745).then(__webpack_require__.bind(__webpack_require__, 52745));
  }
}
monaco_contribution_monaco_editor_core_exports.languages.onLanguage("less", () => {
  getMode().then((mode) => mode.setupMode(lessDefaults));
});
monaco_contribution_monaco_editor_core_exports.languages.onLanguage("scss", () => {
  getMode().then((mode) => mode.setupMode(scssDefaults));
});
monaco_contribution_monaco_editor_core_exports.languages.onLanguage("css", () => {
  getMode().then((mode) => mode.setupMode(cssDefaults));
});


;// ./node_modules/monaco-editor/esm/vs/language/html/monaco.contribution.js

/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

var html_monaco_contribution_defProp = Object.defineProperty;
var html_monaco_contribution_getOwnPropDesc = Object.getOwnPropertyDescriptor;
var html_monaco_contribution_getOwnPropNames = Object.getOwnPropertyNames;
var html_monaco_contribution_hasOwnProp = Object.prototype.hasOwnProperty;
var html_monaco_contribution_copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of html_monaco_contribution_getOwnPropNames(from))
      if (!html_monaco_contribution_hasOwnProp.call(to, key) && key !== except)
        html_monaco_contribution_defProp(to, key, { get: () => from[key], enumerable: !(desc = html_monaco_contribution_getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var html_monaco_contribution_reExport = (target, mod, secondTarget) => (html_monaco_contribution_copyProps(target, mod, "default"), secondTarget && html_monaco_contribution_copyProps(secondTarget, mod, "default"));

// src/fillers/monaco-editor-core.ts
var html_monaco_contribution_monaco_editor_core_exports = {};
html_monaco_contribution_reExport(html_monaco_contribution_monaco_editor_core_exports, editor_api);


// src/language/html/monaco.contribution.ts
var monaco_contribution_LanguageServiceDefaultsImpl = class {
  _onDidChange = new html_monaco_contribution_monaco_editor_core_exports.Emitter();
  _options;
  _modeConfiguration;
  _languageId;
  constructor(languageId, options, modeConfiguration) {
    this._languageId = languageId;
    this.setOptions(options);
    this.setModeConfiguration(modeConfiguration);
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get languageId() {
    return this._languageId;
  }
  get options() {
    return this._options;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  setOptions(options) {
    this._options = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
};
var formatDefaults = {
  tabSize: 4,
  insertSpaces: false,
  wrapLineLength: 120,
  unformatted: 'default": "a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map, object, q, samp, select, small, span, strong, sub, sup, textarea, tt, var',
  contentUnformatted: "pre",
  indentInnerHtml: false,
  preserveNewLines: true,
  maxPreserveNewLines: void 0,
  indentHandlebars: false,
  endWithNewline: false,
  extraLiners: "head, body, /html",
  wrapAttributes: "auto"
};
var monaco_contribution_optionsDefault = {
  format: formatDefaults,
  suggest: {},
  data: { useDefaultDataProvider: true }
};
function getConfigurationDefault(languageId) {
  return {
    completionItems: true,
    hovers: true,
    documentSymbols: true,
    links: true,
    documentHighlights: true,
    rename: true,
    colors: true,
    foldingRanges: true,
    selectionRanges: true,
    diagnostics: languageId === htmlLanguageId,
    documentFormattingEdits: languageId === htmlLanguageId,
    documentRangeFormattingEdits: languageId === htmlLanguageId
  };
}
var htmlLanguageId = "html";
var handlebarsLanguageId = "handlebars";
var razorLanguageId = "razor";
var htmlLanguageService = registerHTMLLanguageService(htmlLanguageId, monaco_contribution_optionsDefault, getConfigurationDefault(htmlLanguageId));
var htmlDefaults = htmlLanguageService.defaults;
var handlebarLanguageService = registerHTMLLanguageService(handlebarsLanguageId, monaco_contribution_optionsDefault, getConfigurationDefault(handlebarsLanguageId));
var handlebarDefaults = handlebarLanguageService.defaults;
var razorLanguageService = registerHTMLLanguageService(razorLanguageId, monaco_contribution_optionsDefault, getConfigurationDefault(razorLanguageId));
var razorDefaults = razorLanguageService.defaults;
html_monaco_contribution_monaco_editor_core_exports.languages.html = {
  htmlDefaults,
  razorDefaults,
  handlebarDefaults,
  htmlLanguageService,
  handlebarLanguageService,
  razorLanguageService,
  registerHTMLLanguageService
};
function monaco_contribution_getMode() {
  if (false) // removed by dead control flow
{} else {
    return __webpack_require__.e(/* import() */ 2077).then(__webpack_require__.bind(__webpack_require__, 72077));
  }
}
function registerHTMLLanguageService(languageId, options = monaco_contribution_optionsDefault, modeConfiguration = getConfigurationDefault(languageId)) {
  const defaults = new monaco_contribution_LanguageServiceDefaultsImpl(languageId, options, modeConfiguration);
  let mode;
  const onLanguageListener = html_monaco_contribution_monaco_editor_core_exports.languages.onLanguage(languageId, async () => {
    mode = (await monaco_contribution_getMode()).setupMode(defaults);
  });
  return {
    defaults,
    dispose() {
      onLanguageListener.dispose();
      mode?.dispose();
      mode = void 0;
    }
  };
}


;// ./node_modules/monaco-editor/esm/vs/language/json/monaco.contribution.js

/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.45.0(5e5af013f8d295555a7210df0d5f2cea0bf5dd56)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

var json_monaco_contribution_defProp = Object.defineProperty;
var json_monaco_contribution_getOwnPropDesc = Object.getOwnPropertyDescriptor;
var json_monaco_contribution_getOwnPropNames = Object.getOwnPropertyNames;
var json_monaco_contribution_hasOwnProp = Object.prototype.hasOwnProperty;
var json_monaco_contribution_copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of json_monaco_contribution_getOwnPropNames(from))
      if (!json_monaco_contribution_hasOwnProp.call(to, key) && key !== except)
        json_monaco_contribution_defProp(to, key, { get: () => from[key], enumerable: !(desc = json_monaco_contribution_getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var json_monaco_contribution_reExport = (target, mod, secondTarget) => (json_monaco_contribution_copyProps(target, mod, "default"), secondTarget && json_monaco_contribution_copyProps(secondTarget, mod, "default"));

// src/fillers/monaco-editor-core.ts
var json_monaco_contribution_monaco_editor_core_exports = {};
json_monaco_contribution_reExport(json_monaco_contribution_monaco_editor_core_exports, editor_api);


// src/language/json/monaco.contribution.ts
var json_monaco_contribution_LanguageServiceDefaultsImpl = class {
  _onDidChange = new json_monaco_contribution_monaco_editor_core_exports.Emitter();
  _diagnosticsOptions;
  _modeConfiguration;
  _languageId;
  constructor(languageId, diagnosticsOptions, modeConfiguration) {
    this._languageId = languageId;
    this.setDiagnosticsOptions(diagnosticsOptions);
    this.setModeConfiguration(modeConfiguration);
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get languageId() {
    return this._languageId;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  get diagnosticsOptions() {
    return this._diagnosticsOptions;
  }
  setDiagnosticsOptions(options) {
    this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
};
var diagnosticDefault = {
  validate: true,
  allowComments: true,
  schemas: [],
  enableSchemaRequest: false,
  schemaRequest: "warning",
  schemaValidation: "warning",
  comments: "error",
  trailingCommas: "error"
};
var monaco_contribution_modeConfigurationDefault = {
  documentFormattingEdits: true,
  documentRangeFormattingEdits: true,
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  tokens: true,
  colors: true,
  foldingRanges: true,
  diagnostics: true,
  selectionRanges: true
};
var jsonDefaults = new json_monaco_contribution_LanguageServiceDefaultsImpl("json", diagnosticDefault, monaco_contribution_modeConfigurationDefault);
json_monaco_contribution_monaco_editor_core_exports.languages.json = { jsonDefaults };
function json_monaco_contribution_getMode() {
  if (false) // removed by dead control flow
{} else {
    return __webpack_require__.e(/* import() */ 4839).then(__webpack_require__.bind(__webpack_require__, 44839));
  }
}
json_monaco_contribution_monaco_editor_core_exports.languages.register({
  id: "json",
  extensions: [".json", ".bowerrc", ".jshintrc", ".jscsrc", ".eslintrc", ".babelrc", ".har"],
  aliases: ["JSON", "json"],
  mimetypes: ["application/json"]
});
json_monaco_contribution_monaco_editor_core_exports.languages.onLanguage("json", () => {
  json_monaco_contribution_getMode().then((mode) => mode.setupMode(jsonDefaults));
});


// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/language/typescript/monaco.contribution.js
var monaco_contribution = __webpack_require__(19664);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js + 84 modules
var codeEditorWidget = __webpack_require__(96923);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/standaloneStrings.js
var standaloneStrings = __webpack_require__(45933);
// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/base/browser/ui/codicons/codiconStyles.js + 2 modules
var codiconStyles = __webpack_require__(30761);
;// ./node_modules/monaco-editor/esm/vs/editor/editor.all.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/























































// Load up these strings even in VSCode, even if they are not used
// in order to get them translated

 // The codicons are defined here and must be loaded

;// ./node_modules/monaco-editor/esm/vs/editor/edcore.main.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/











;// ./node_modules/monaco-editor/esm/vs/editor/editor.main.js







;// include-loader!./node_modules/monaco-editor/esm/vs/editor/editor.main.js
self["MonacoEnvironment"] = (function (paths) {
      function stripTrailingSlash(str) {
        return str.replace(/\/$/, '');
      }
      return {
        globalAPI: false,
        getWorkerUrl: function (moduleId, label) {
          var pathPrefix =  true ? __webpack_require__.p : 0;
          var result = (pathPrefix ? stripTrailingSlash(pathPrefix) + '/' : '') + paths[label];
          if (/^((http:)|(https:)|(file:)|(\/\/))/.test(result)) {
            var currentUrl = String(window.location);
            var currentOrigin = currentUrl.substr(0, currentUrl.length - window.location.hash.length - window.location.search.length - window.location.pathname.length);
            if (result.substring(0, currentOrigin.length) !== currentOrigin) {
              if(/^(\/\/)/.test(result)) {
                result = window.location.protocol + result
              }
              var js = '/*' + label + '*/';
              if (true) {
                // module worker
                js += 'import "' + result + '";';
              } else // removed by dead control flow
{}
              var blob = new Blob([js], { type: 'application/javascript' });
              return URL.createObjectURL(blob);
            }
          }
          return result;
        }
      };
    })({
  "editorWorkerService": "editor.worker.js"
});

































































/* harmony default export */ const editor_main = (editor_main_namespaceObject);
		

/***/ }

}]);
//# sourceMappingURL=af9e7d5015a01b53c512.js.map