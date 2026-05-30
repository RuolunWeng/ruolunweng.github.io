(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const Reset = "";
const Main = "";
const FaustInterface = "";
const Library$1 = "";
const Modules = "";
const Scenes = "";
const Playground = "";
const Menu$1 = "";
const AccelerometerEdit$1 = "";
const perfectScrollbar_min = "";
const FaustPiece = "";
(function(global2, exports, perf) {
  function fixSetTarget(param) {
    if (!param)
      return;
    if (!param.setTargetAtTime)
      param.setTargetAtTime = param.setTargetValueAtTime;
  }
  if (window.hasOwnProperty("webkitAudioContext") && !window.hasOwnProperty("AudioContext")) {
    window.AudioContext = webkitAudioContext;
    if (!AudioContext.prototype.hasOwnProperty("createGain"))
      AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
    if (!AudioContext.prototype.hasOwnProperty("createDelay"))
      AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;
    if (!AudioContext.prototype.hasOwnProperty("createScriptProcessor"))
      AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode;
    if (!AudioContext.prototype.hasOwnProperty("createPeriodicWave"))
      AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;
    AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain;
    AudioContext.prototype.createGain = function() {
      var node = this.internal_createGain();
      fixSetTarget(node.gain);
      return node;
    };
    AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay;
    AudioContext.prototype.createDelay = function(maxDelayTime) {
      var node = maxDelayTime ? this.internal_createDelay(maxDelayTime) : this.internal_createDelay();
      fixSetTarget(node.delayTime);
      return node;
    };
    AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource;
    AudioContext.prototype.createBufferSource = function() {
      var node = this.internal_createBufferSource();
      if (!node.start) {
        node.start = function(when, offset, duration) {
          if (offset || duration)
            this.noteGrainOn(when, offset, duration);
          else
            this.noteOn(when);
        };
      }
      if (!node.stop)
        node.stop = node.noteOff;
      fixSetTarget(node.playbackRate);
      return node;
    };
    AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor;
    AudioContext.prototype.createDynamicsCompressor = function() {
      var node = this.internal_createDynamicsCompressor();
      fixSetTarget(node.threshold);
      fixSetTarget(node.knee);
      fixSetTarget(node.ratio);
      fixSetTarget(node.reduction);
      fixSetTarget(node.attack);
      fixSetTarget(node.release);
      return node;
    };
    AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter;
    AudioContext.prototype.createBiquadFilter = function() {
      var node = this.internal_createBiquadFilter();
      fixSetTarget(node.frequency);
      fixSetTarget(node.detune);
      fixSetTarget(node.Q);
      fixSetTarget(node.gain);
      return node;
    };
    if (AudioContext.prototype.hasOwnProperty("createOscillator")) {
      AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function() {
        var node = this.internal_createOscillator();
        if (!node.start)
          node.start = node.noteOn;
        if (!node.stop)
          node.stop = node.noteOff;
        if (!node.setPeriodicWave)
          node.setPeriodicWave = node.setWaveTable;
        fixSetTarget(node.frequency);
        fixSetTarget(node.detune);
        return node;
      };
    }
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/faustplayground/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
const jsURL = "/faustplayground/assets/libfaust-wasm-4c3fc807.js";
const dataURL = "/faustplayground/assets/libfaust-wasm-b8f904ed.data";
const wasmURL = "/faustplayground/assets/libfaust-wasm-5322717e.wasm";
const _Utilitary = class _Utilitary2 {
  static errorCallBack(message) {
  }
  static showFullPageLoading() {
    document.getElementById("loadingPage").style.visibility = "visible";
  }
  static hideFullPageLoading() {
    document.getElementById("loadingPage").style.visibility = "hidden";
  }
  static isAppPedagogique() {
    if (window.location.href.indexOf("kids.html") > -1) {
      return true;
    } else {
      return false;
    }
  }
  //generic function to make XHR request
  static getXHR(url, callback, errCallback) {
    var getrequest = new XMLHttpRequest();
    getrequest.onreadystatechange = function() {
      console.log("enter onreadystatechange");
      if (getrequest.readyState == 4 && getrequest.status == 200) {
        callback(getrequest.responseText);
      } else if (getrequest.readyState == 4 && getrequest.status == 400) {
        errCallback(getrequest.responseText);
      }
    };
    getrequest.open("GET", url, true);
    getrequest.send(null);
  }
  static addLoadingLogo(idTarget) {
    var loadingDiv = document.createElement("div");
    loadingDiv.className = "loadingDiv";
    var loadingImg = document.createElement("img");
    loadingImg.src = _Utilitary2.baseImg + "logoAnim.gif";
    loadingImg.id = "loadingImg";
    var loadingText = document.createElement("span");
    loadingText.textContent = _Utilitary2.messageResource.loading;
    loadingText.id = "loadingText";
    loadingDiv.appendChild(loadingImg);
    loadingDiv.appendChild(loadingText);
    if (document.getElementById(idTarget) != null) {
      document.getElementById(idTarget).appendChild(loadingDiv);
    }
  }
  static removeLoadingLogo(idTarget) {
    var divTarget = document.getElementById(idTarget);
    if (divTarget != null && divTarget.getElementsByClassName("loadingDiv").length > 0) {
      while (divTarget.getElementsByClassName("loadingDiv").length != 0) {
        divTarget.getElementsByClassName("loadingDiv")[0].remove();
      }
    }
  }
  static addFullPageLoading() {
    var loadingText = document.getElementById("loadingTextBig");
    loadingText.id = "loadingTextBig";
    loadingText.textContent = _Utilitary2.messageResource.loading;
  }
  static replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, "g"), replace);
  }
};
_Utilitary.idX = 0;
_Utilitary.baseImg = "img/";
_Utilitary.isAccelerometerOn = false;
_Utilitary.isAccelerometerEditOn = false;
let Utilitary = _Utilitary;
class PositionModule {
}
var Axis = /* @__PURE__ */ ((Axis2) => {
  Axis2[Axis2["x"] = 0] = "x";
  Axis2[Axis2["y"] = 1] = "y";
  Axis2[Axis2["z"] = 2] = "z";
  return Axis2;
})(Axis || {});
var Curve = /* @__PURE__ */ ((Curve2) => {
  Curve2[Curve2["Up"] = 0] = "Up";
  Curve2[Curve2["Down"] = 1] = "Down";
  Curve2[Curve2["UpDown"] = 2] = "UpDown";
  Curve2[Curve2["DownUp"] = 3] = "DownUp";
  return Curve2;
})(Curve || {});
class AccelerometerSlider {
  constructor(accParams) {
    if (accParams != null) {
      this.isEnabled = accParams.isEnabled;
      this.acc = accParams.acc;
      this.setAttributes(accParams.acc);
      this.address = accParams.address;
      this.min = accParams.min;
      this.max = accParams.max;
      this.init = accParams.init;
      this.label = accParams.label;
      this.isActive = Utilitary.isAccelerometerOn;
    }
  }
  setAttributes(fMetaAcc) {
    if (fMetaAcc != null) {
      var arrayMeta = fMetaAcc.split(" ");
      this.axis = parseInt(arrayMeta[0]);
      this.curve = parseInt(arrayMeta[1]);
      this.amin = parseInt(arrayMeta[2]);
      this.amid = parseInt(arrayMeta[3]);
      this.amax = parseInt(arrayMeta[4]);
    }
  }
  setAttributesDetailed(axis, curve, min, mid, max) {
    this.axis = axis;
    this.curve = curve;
    this.amin = min;
    this.amid = mid;
    this.amax = max;
  }
}
const _AccelerometerHandler = class _AccelerometerHandler2 {
  // get Accelerometer value
  getAccelerometerValue() {
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", (event) => {
        this.propagate(event);
      }, false);
    } else {
      console.log(Utilitary.messageResource.noDeviceMotion);
    }
  }
  // propagate the new x, y, z value of the accelerometer to the registred object
  propagate(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    for (var i = 0; i < _AccelerometerHandler2.faustInterfaceControler.length; i++) {
      if (_AccelerometerHandler2.faustInterfaceControler[i].accelerometerSlider.isActive && _AccelerometerHandler2.faustInterfaceControler[i].accelerometerSlider.isEnabled) {
        this.axisSplitter(_AccelerometerHandler2.faustInterfaceControler[i].accelerometerSlider, x, y, z, this.applyNewValueToModule);
      }
    }
    if (_AccelerometerHandler2.faustInterfaceControlerEdit != null) {
      this.axisSplitter(_AccelerometerHandler2.faustInterfaceControlerEdit.accelerometerSlider, x, y, z, this.applyValueToEdit);
    }
  }
  //create and register accelerometerSlide
  static registerAcceleratedSlider(accParams, faustInterfaceControler, sliderEdit) {
    var accelerometerSlide = new AccelerometerSlider(accParams);
    faustInterfaceControler.accelerometerSlider = accelerometerSlide;
    _AccelerometerHandler2.curveSplitter(accelerometerSlide);
    if (sliderEdit) {
      _AccelerometerHandler2.faustInterfaceControlerEdit = faustInterfaceControler;
    } else {
      _AccelerometerHandler2.faustInterfaceControler.push(faustInterfaceControler);
    }
  }
  //give the good axis value to the accelerometerslider, convert it to the faust value before
  axisSplitter(accelerometerSlide, x, y, z, callBack) {
    switch (accelerometerSlide.axis) {
      case 0:
        var newVal = accelerometerSlide.converter.uiToFaust(x);
        callBack(accelerometerSlide, newVal, x);
        break;
      case 1:
        var newVal = accelerometerSlide.converter.uiToFaust(y);
        callBack(accelerometerSlide, newVal, y);
        break;
      case 2:
        var newVal = accelerometerSlide.converter.uiToFaust(z);
        callBack(accelerometerSlide, newVal, z);
        break;
    }
  }
  //update value of the dsp
  applyNewValueToModule(accSlid, newVal, axeValue) {
    accSlid.callbackValueChange(accSlid.address, newVal);
  }
  //update value of the edit range in AccelerometerEditView
  applyValueToEdit(accSlid, newVal, axeValue) {
    _AccelerometerHandler2.faustInterfaceControlerEdit.faustInterfaceView.slider.value = axeValue.toString();
  }
  //Apply the right converter with the right curve to an accelerometerSlider
  static curveSplitter(accelerometerSlide) {
    switch (accelerometerSlide.curve) {
      case 0:
        accelerometerSlide.converter = new AccUpConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
        break;
      case 1:
        accelerometerSlide.converter = new AccDownConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
        break;
      case 2:
        accelerometerSlide.converter = new AccUpDownConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
        break;
      case 3:
        accelerometerSlide.converter = new AccDownUpConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
        break;
      default:
        accelerometerSlide.converter = new AccUpConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
    }
  }
};
_AccelerometerHandler.faustInterfaceControler = [];
_AccelerometerHandler.faustInterfaceControlerEdit = null;
let AccelerometerHandler = _AccelerometerHandler;
class MinMaxClip {
  constructor(x, y) {
    this.fLo = Math.min(x, y);
    this.fHi = Math.max(x, y);
  }
  clip(x) {
    if (x < this.fLo) {
      return this.fLo;
    } else if (x > this.fHi) {
      return this.fHi;
    } else {
      return x;
    }
  }
}
class Interpolator {
  constructor(lo, hi, v1, v2) {
    this.range = new MinMaxClip(lo, hi);
    if (hi != lo) {
      this.fCoef = (v2 - v1) / (hi - lo);
      this.fOffset = v1 - lo * this.fCoef;
    } else {
      this.fCoef = 0;
      this.fOffset = (v1 + v2) / 2;
    }
  }
  returnMappedValue(v) {
    var x = this.range.clip(v);
    return this.fOffset + x * this.fCoef;
  }
  getLowHigh(amin, amax) {
    return { amin: this.range.fLo, amax: this.range.fHi };
  }
}
class Interpolator3pt {
  constructor(lo, mid, hi, v1, vMid, v2) {
    this.fSegment1 = new Interpolator(lo, mid, v1, vMid);
    this.fSegment2 = new Interpolator(mid, hi, vMid, v2);
    this.fMiddle = mid;
  }
  returnMappedValue(x) {
    return x < this.fMiddle ? this.fSegment1.returnMappedValue(x) : this.fSegment2.returnMappedValue(x);
  }
  getMappingValues(amin, amid, amax) {
    var lowHighSegment1 = this.fSegment1.getLowHigh(amin, amid);
    var lowHighSegment2 = this.fSegment2.getLowHigh(amid, amax);
    return { amin: lowHighSegment1.amin, amid: lowHighSegment2.amin, amax: lowHighSegment2.amax };
  }
}
class AccUpConverter {
  constructor(amin, amid, amax, fmin, fmid, fmax) {
    this.fActive = true;
    this.accToFaust = new Interpolator3pt(amin, amid, amax, fmin, fmid, fmax);
    this.faustToAcc = new Interpolator3pt(fmin, fmid, fmax, amin, amid, amax);
  }
  uiToFaust(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  faustToUi(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  setMappingValues(amin, amid, amax, min, init2, max) {
    this.accToFaust = new Interpolator3pt(amin, amid, amax, min, init2, max);
    this.faustToAcc = new Interpolator3pt(min, init2, max, amin, amid, amax);
  }
  getMappingValues(amin, amid, amax) {
    return this.accToFaust.getMappingValues(amin, amid, amax);
  }
  setActive(onOff) {
    this.fActive = onOff;
  }
  getActive() {
    return this.fActive;
  }
}
class AccDownConverter {
  constructor(amin, amid, amax, fmin, fmid, fmax) {
    this.fActive = true;
    this.accToFaust = new Interpolator3pt(amin, amid, amax, fmax, fmid, fmin);
    this.faustToAcc = new Interpolator3pt(fmin, fmid, fmax, amax, amid, amin);
  }
  uiToFaust(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  faustToUi(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  setMappingValues(amin, amid, amax, min, init2, max) {
    this.accToFaust = new Interpolator3pt(amin, amid, amax, max, init2, min);
    this.faustToAcc = new Interpolator3pt(min, init2, max, amax, amid, amin);
  }
  getMappingValues(amin, amid, amax) {
    return this.accToFaust.getMappingValues(amin, amid, amax);
  }
  setActive(onOff) {
    this.fActive = onOff;
  }
  getActive() {
    return this.fActive;
  }
}
class AccUpDownConverter {
  constructor(amin, amid, amax, fmin, fmid, fmax) {
    this.fActive = true;
    this.accToFaust = new Interpolator3pt(amin, amid, amax, fmin, fmax, fmin);
    this.faustToAcc = new Interpolator(fmin, fmax, amin, amax);
  }
  uiToFaust(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  faustToUi(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  setMappingValues(amin, amid, amax, min, init2, max) {
    this.accToFaust = new Interpolator3pt(amin, amid, amax, min, max, min);
    this.faustToAcc = new Interpolator(min, max, amin, amax);
  }
  getMappingValues(amin, amid, amax) {
    return this.accToFaust.getMappingValues(amin, amid, amax);
  }
  setActive(onOff) {
    this.fActive = onOff;
  }
  getActive() {
    return this.fActive;
  }
}
class AccDownUpConverter {
  constructor(amin, amid, amax, fmin, fmid, fmax) {
    this.fActive = true;
    this.accToFaust = new Interpolator3pt(amin, amid, amax, fmax, fmin, fmax);
    this.faustToAcc = new Interpolator(fmin, fmax, amin, amax);
  }
  uiToFaust(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  faustToUi(x) {
    return this.accToFaust.returnMappedValue(x);
  }
  setMappingValues(amin, amid, amax, min, init2, max) {
    this.accToFaust = new Interpolator3pt(amin, amid, amax, max, min, max);
    this.faustToAcc = new Interpolator(min, max, amin, amax);
  }
  getMappingValues(amin, amid, amax) {
    return this.accToFaust.getMappingValues(amin, amid, amax);
  }
  setActive(onOff) {
    this.fActive = onOff;
  }
  getActive() {
    return this.fActive;
  }
}
class FaustInterfaceControler {
  constructor(interfaceCallback, setDSPValueCallback) {
    this.accDefault = "0 0 -10 0 10";
    this.interfaceCallback = interfaceCallback;
    this.setDSPValueCallback = setDSPValueCallback;
  }
  //parse interface json from faust webaudio-asm-wrapper to create corresponding FaustInterfaceControler
  parseFaustJsonUI(ui, module) {
    this.faustControlers = [];
    for (var i = 0; i < ui.length; i++) {
      this.parse_group(ui[i], module);
    }
    return this.faustControlers;
  }
  parse_group(group, module) {
    if (group.items)
      this.parse_items(group.items, module);
  }
  parse_item(item, module) {
    var params = module.getInterfaceParams();
    if (params && params[item.address]) {
      item.init = params[item.address];
    }
    if (item.type === "vgroup" || item.type === "hgroup" || item.type === "tgroup") {
      this.parse_items(item.items, module);
    } else if (item.type === "vslider" || item.type === "hslider") {
      var itemElement = item;
      var controler = new FaustInterfaceControler(
        () => {
          this.interfaceCallback(controler);
        },
        (adress, value) => {
          this.setDSPValueCallback(adress, value);
        }
      );
      controler.name = itemElement.label;
      controler.itemParam = itemElement;
      controler.value = itemElement.init;
      this.faustControlers.push(controler);
    } else if (item.type === "button") {
      var itemElement = item;
      var controler = new FaustInterfaceControler(
        (faustInterface) => {
          this.interfaceCallback(faustInterface);
        },
        (adress, value) => {
          this.setDSPValueCallback(adress, value);
        }
      );
      controler.itemParam = itemElement;
      controler.value = "0";
      this.faustControlers.push(controler);
    } else if (item.type === "checkbox") {
      var itemElement = item;
      var controler = new FaustInterfaceControler(
        (faustInterface) => {
          this.interfaceCallback(faustInterface);
        },
        (adress, value) => {
          this.setDSPValueCallback(adress, value);
        }
      );
      controler.itemParam = itemElement;
      controler.value = "0";
      this.faustControlers.push(controler);
    }
  }
  parse_items(items, node) {
    for (var i = 0; i < items.length; i++)
      this.parse_item(items[i], node);
  }
  setParams() {
    if (this.itemParam.meta != void 0) {
      for (var j = 0; j < this.itemParam.meta.length; j++) {
        if (this.itemParam.meta[j].unit) {
          this.unit = this.itemParam.meta[j].unit;
        }
      }
    }
    if (this.unit == void 0) {
      this.unit = "";
    }
    if (this.itemParam.step != void 0) {
      var precision = this.itemParam.step.toString().split(".").pop().length;
      this.precision = String(precision);
    }
    this.accParams = {
      isEnabled: this.isEnabled,
      acc: this.acc,
      address: this.itemParam.address,
      init: parseFloat(this.itemParam.init),
      max: parseFloat(this.itemParam.max),
      min: parseFloat(this.itemParam.min),
      label: this.itemParam.label
    };
  }
  // create and allocate right faustInterfaceView
  createFaustInterfaceElement() {
    if (this.faustInterfaceView && this.faustInterfaceView.type) {
      if (this.faustInterfaceView.type === "vslider" || this.faustInterfaceView.type === "hslider") {
        return this.faustInterfaceView.addFaustModuleSlider(this.itemParam, parseFloat(this.precision), this.unit);
      } else if (this.faustInterfaceView.type === "button") {
        return this.faustInterfaceView.addFaustButton(this.itemParam);
      } else if (this.faustInterfaceView.type === "checkbox") {
        return this.faustInterfaceView.addFaustCheckBox(this.itemParam.init);
      }
    }
  }
  // Set eventListner of the faustInterfaceView
  setEventListener() {
    if (this.faustInterfaceView && this.faustInterfaceView.type) {
      if (this.faustInterfaceView.type === "vslider" || this.faustInterfaceView.type === "hslider") {
        this.faustInterfaceView.slider.addEventListener("input", (event) => {
          this.interfaceCallback(this);
          event.stopPropagation();
          event.preventDefault();
        });
        this.faustInterfaceView.slider.addEventListener("mousedown", (e) => {
          e.stopPropagation();
        });
        this.faustInterfaceView.slider.addEventListener("touchstart", (e) => {
          e.stopPropagation();
        });
        this.faustInterfaceView.slider.addEventListener("touchmove", (e) => {
          e.stopPropagation();
        });
      } else if (this.faustInterfaceView.type === "button") {
        this.faustInterfaceView.button.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          this.interfaceCallback(this);
        });
        this.faustInterfaceView.button.addEventListener("mouseup", (e) => {
          e.stopPropagation();
          this.interfaceCallback(this);
        });
        this.faustInterfaceView.button.addEventListener("touchstart", (e) => {
          e.stopPropagation();
          this.interfaceCallback(this);
        });
        this.faustInterfaceView.button.addEventListener("touchend", (e) => {
          e.stopPropagation();
          this.interfaceCallback(this);
        });
      } else if (this.faustInterfaceView.type === "checkbox")
        ;
    }
  }
  //attach acceleromterSlider to faustInterfaceControler
  //give the acc or noacc values
  //if no accelerometer value, it create a default noacc one
  createAccelerometer() {
    if (this.itemParam.meta) {
      var meta = this.itemParam.meta;
      for (var i = 0; i < meta.length; i++) {
        if (meta[i].acc) {
          this.acc = meta[i].acc;
          this.accParams.acc = this.acc;
          this.accParams.isEnabled = true;
          AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
          this.accelerometerSlider.callbackValueChange = (address, value) => {
            this.callbackValueChange(address, value);
          };
          this.accelerometerSlider.isEnabled = true;
          this.faustInterfaceView.slider.classList.add("allowed");
          this.faustInterfaceView.group.classList.add(Axis[this.accelerometerSlider.axis]);
          if (Utilitary.isAccelerometerOn) {
            this.accelerometerSlider.isActive = true;
            this.faustInterfaceView.slider.classList.remove("allowed");
            this.faustInterfaceView.slider.classList.add("not-allowed");
            this.faustInterfaceView.slider.disabled = true;
          }
        } else if (meta[i].noacc) {
          this.acc = meta[i].noacc;
          this.accParams.acc = this.acc;
          this.accParams.isEnabled = false;
          AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
          this.accelerometerSlider.callbackValueChange = (address, value) => {
            this.callbackValueChange(address, value);
          };
          this.accelerometerSlider.isEnabled = false;
          this.faustInterfaceView.slider.parentElement.classList.add("disabledAcc");
        }
      }
      if (this.accelerometerSlider == void 0) {
        this.acc = this.accDefault;
        this.accParams.acc = this.acc;
        this.accParams.isEnabled = false;
        AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
        this.accelerometerSlider.callbackValueChange = (address, value) => {
          this.callbackValueChange(address, value);
        };
        this.accelerometerSlider.isEnabled = false;
        if (this.faustInterfaceView.slider != void 0) {
          this.faustInterfaceView.slider.parentElement.classList.add("disabledAcc");
        }
      }
    } else {
      this.acc = this.accDefault;
      this.accParams.acc = this.acc;
      this.accParams.isEnabled = false;
      AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
      this.accelerometerSlider.callbackValueChange = (address, value) => {
        this.callbackValueChange(address, value);
      };
      this.accelerometerSlider.isEnabled = false;
      if (this.faustInterfaceView.slider != void 0) {
        this.faustInterfaceView.slider.parentElement.classList.add("disabledAcc");
      }
    }
  }
  //callback to update the dsp value
  callbackValueChange(address, value) {
    this.setDSPValueCallback(address, String(value));
    this.faustInterfaceView.slider.value = String((value - parseFloat(this.itemParam.min)) / parseFloat(this.itemParam.step));
    this.faustInterfaceView.output.textContent = String(value.toFixed(parseFloat(this.precision)));
  }
}
class FaustInterfaceView {
  constructor(type) {
    this.type = type;
  }
  addFaustModuleSlider(itemParam, precision, unit) {
    var group = document.createElement("div");
    group.className = "control-group";
    var info = document.createElement("div");
    info.className = "slider-info";
    info.setAttribute("min", itemParam.min);
    info.setAttribute("max", itemParam.max);
    info.setAttribute("step", itemParam.step);
    info.setAttribute("precision", String(precision));
    var lab = document.createElement("span");
    lab.className = "label";
    lab.appendChild(document.createTextNode(itemParam.label));
    this.label = lab;
    info.appendChild(lab);
    var val = document.createElement("span");
    val.className = "value";
    this.output = val;
    var myValue = Number(itemParam.init).toFixed(precision);
    val.appendChild(document.createTextNode("" + myValue + " " + unit));
    val.setAttribute("units", unit);
    info.appendChild(val);
    group.appendChild(info);
    var high = (parseFloat(itemParam.max) - parseFloat(itemParam.min)) / parseFloat(itemParam.step);
    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = String(high);
    slider.value = String((parseFloat(itemParam.init) - parseFloat(itemParam.min)) / parseFloat(itemParam.step));
    slider.step = "1";
    this.slider = slider;
    group.appendChild(slider);
    this.group = group;
    return group;
  }
  addFaustCheckBox(ivalue) {
    var group = document.createElement("div");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;
    checkbox.id = "mycheckbox";
    var label = document.createElement("label");
    label.htmlFor = "mycheckbox";
    label.appendChild(document.createTextNode(" " + ivalue));
    group.appendChild(checkbox);
    group.appendChild(label);
    return checkbox;
  }
  addFaustButton(itemParam) {
    var group = document.createElement("div");
    var button = document.createElement("input");
    button.type = "button";
    this.button = button;
    this.button.value = itemParam.label;
    group.appendChild(button);
    return button;
  }
}
class AccelerometerEdit {
  constructor(accelerometerEditView) {
    this.isOn = false;
    this.accelerometerEditView = accelerometerEditView;
    this.eventEditHandler = (event, faustIControler) => {
      this.editEvent(faustIControler, event);
    };
    this.accelerometerEditView.cancelButton.addEventListener("click", () => {
      this.cancelAccelerometerEdit();
    });
    this.accelerometerEditView.validButton.addEventListener("click", () => {
      this.applyAccelerometerEdit();
    });
    this.accelerometerEditView.radioAxisX.addEventListener("change", (event) => {
      this.radioAxisSplit(event);
    });
    this.accelerometerEditView.radioAxisY.addEventListener("change", (event) => {
      this.radioAxisSplit(event);
    });
    this.accelerometerEditView.radioAxisZ.addEventListener("change", (event) => {
      this.radioAxisSplit(event);
    });
    this.accelerometerEditView.radioAxis0.addEventListener("change", (event) => {
      this.disablerEnablerAcc(event);
    });
    this.accelerometerEditView.radioCurve1.addEventListener("change", (event) => {
      this.radioCurveSplit(event);
    });
    this.accelerometerEditView.radioCurve2.addEventListener("change", (event) => {
      this.radioCurveSplit(event);
    });
    this.accelerometerEditView.radioCurve3.addEventListener("change", (event) => {
      this.radioCurveSplit(event);
    });
    this.accelerometerEditView.radioCurve4.addEventListener("change", (event) => {
      this.radioCurveSplit(event);
    });
    this.accelerometerEditView.checkeOnOff.addEventListener("change", (event) => {
      this.accelerometerEventSwitch(event);
    });
    this.accelerometerEditView.rangeVirtual.addEventListener("input", (event) => {
      this.virtualAccelerometer(event);
    });
    this.accelerometerEditView.rangeMin.addEventListener("input", (event) => {
      this.accMin();
    });
    this.accelerometerEditView.rangeMid.addEventListener("input", (event) => {
      this.accMid();
    });
    this.accelerometerEditView.rangeMax.addEventListener("input", (event) => {
      this.accMax();
    });
  }
  //function used when starting or stoping editing mode
  //setting sider with event to edit it
  editAction() {
    if (this.isOn) {
      for (var i = 0; i < AccelerometerHandler.faustInterfaceControler.length; i++) {
        var currentIFControler = AccelerometerHandler.faustInterfaceControler[i];
        if (currentIFControler.faustInterfaceView.group) {
          currentIFControler.faustInterfaceView.group.removeEventListener("click", currentIFControler.callbackEdit, true);
          currentIFControler.faustInterfaceView.group.removeEventListener("touchstart", currentIFControler.callbackEdit, true);
          currentIFControler.faustInterfaceView.group.classList.remove("editControl");
          currentIFControler.faustInterfaceView.slider.classList.remove("edit");
        }
        this.setSliderDisableValue(currentIFControler);
      }
      this.isOn = false;
      Utilitary.isAccelerometerEditOn = false;
    } else {
      for (var i = 0; i < AccelerometerHandler.faustInterfaceControler.length; i++) {
        var currentIFControler = AccelerometerHandler.faustInterfaceControler[i];
        if (currentIFControler.faustInterfaceView.group) {
          currentIFControler.callbackEdit = this.editEvent.bind(this, currentIFControler);
          currentIFControler.faustInterfaceView.group.addEventListener("click", currentIFControler.callbackEdit, true);
          currentIFControler.faustInterfaceView.group.addEventListener("touchstart", currentIFControler.callbackEdit, true);
          currentIFControler.faustInterfaceView.group.classList.add("editControl");
          currentIFControler.faustInterfaceView.slider.classList.add("edit");
          currentIFControler.faustInterfaceView.slider.disabled = true;
        }
      }
      this.isOn = true;
      Utilitary.isAccelerometerEditOn = true;
    }
  }
  //set the slider to disable or enable according to acc isActive and isDisable
  setSliderDisableValue(faustIControler) {
    var acc = faustIControler.accelerometerSlider;
    var slider = faustIControler.faustInterfaceView.slider;
    if (slider) {
      if (acc.isActive && acc.isEnabled) {
        slider.disabled = true;
      } else if (!acc.isActive && acc.isEnabled) {
        slider.disabled = false;
      } else {
        slider.disabled = false;
      }
    }
  }
  //event handler when click/touch slider in edit mode
  editEvent(faustIControler, event) {
    event.stopPropagation();
    event.preventDefault();
    var acc = faustIControler.accelerometerSlider;
    this.faustIControler = faustIControler;
    this.accSlid = faustIControler.accelerometerSlider;
    this.faustView = faustIControler.faustInterfaceView;
    this.storeAccelerometerSliderInfos(faustIControler);
    this.windowResizeEvent = this.placeElement.bind(this);
    window.addEventListener("resize", this.windowResizeEvent);
    this.placeElement();
    this.selectDefaultAxis(acc);
    this.selectDefaultCurve(acc);
    this.accelerometerEditView.checkeOnOff.checked = acc.isActive;
    this.applyRangeMinValues(acc);
    this.applyRangeMidValues(acc);
    this.applyRangeMaxValues(acc);
    this.applyRangeVirtualValues(acc);
    this.copyParamsAccSlider(acc);
    this.applyRangeCurrentValues(acc);
    this.addCloneSlider(faustIControler);
    this.applyAccEnableDisable(acc);
  }
  //cloning the slider edited to preview it
  addCloneSlider(faustIControler) {
    var faustView = faustIControler.faustInterfaceView;
    this.originalSlider = faustView.slider;
    this.originalValueOutput = faustView.output;
    this.currentParentElemSliderClone = faustView.group.cloneNode(true);
    var title = document.createElement("h6");
    title.textContent = faustIControler.name;
    this.accelerometerEditView.container.insertBefore(title, this.accelerometerEditView.radioCurveContainer);
    this.accelerometerEditView.cloneContainer.appendChild(this.currentParentElemSliderClone);
    faustView.slider = this.currentParentElemSliderClone.getElementsByTagName("input")[0];
    faustView.output = this.currentParentElemSliderClone.getElementsByClassName("value")[0];
    this.accelerometerSwitch(faustIControler.accelerometerSlider.isActive);
  }
  //remove clone/preview slider
  removeCloneSlider(faustIControler) {
    var faustView = faustIControler.faustInterfaceView;
    this.accelerometerEditView.cloneContainer.removeChild(this.accelerometerEditView.cloneContainer.getElementsByTagName("div")[0]);
    faustView.slider = this.originalSlider;
    faustView.output = this.originalValueOutput;
    this.accelerometerEditView.container.getElementsByTagName("h6")[0].remove();
  }
  //cancel editing mode, and not applying changes
  cancelAccelerometerEdit() {
    this.accSlid.setAttributes(this.originalAccValue);
    this.accSlid.init = this.originalDefaultVal;
    this.accSlid.callbackValueChange(this.accSlid.address, this.accSlid.init);
    this.faustIControler.faustInterfaceView.slider.value = this.originalDefaultSliderVal;
    this.accelerometerEditView.rangeContainer.className = "";
    this.accelerometerSwitch(this.originalActive);
    this.faustIControler.faustInterfaceView.output.textContent = this.accSlid.init.toString();
    AccelerometerHandler.curveSplitter(this.accSlid);
    this.removeCloneSlider(this.faustIControler);
    this.accSlid.isEnabled = this.originalEnabled;
    this.applyDisableEnableAcc();
    this.accelerometerEditView.blockLayer.style.display = "none";
    window.removeEventListener("resize", this.windowResizeEvent);
  }
  applyAccelerometerEdit() {
    this.removeCloneSlider(this.faustIControler);
    this.faustView.group.classList.remove(this.originalAxis);
    this.faustView.group.classList.add(Axis[this.accSlid.axis]);
    this.accelerometerEditView.blockLayer.style.display = "none";
    window.removeEventListener("resize", this.windowResizeEvent);
    this.accSlid.acc = this.accSlid.axis + " " + this.accSlid.curve + " " + this.accSlid.amin + " " + this.accSlid.amid + " " + this.accSlid.amax;
    this.accelerometerEditView.rangeContainer.className = "";
    this.faustView.slider.classList.remove(this.originalSliderAllowedStyle);
    this.faustView.slider.classList.add(this.sliderAllowedStyle);
    this.faustView.group.removeEventListener("click", this.faustIControler.callbackEdit, true);
    this.faustView.group.removeEventListener("touchstart", this.faustIControler.callbackEdit, true);
    this.faustIControler.callbackEdit = this.editEvent.bind(this, this.faustIControler);
    this.faustView.group.addEventListener("click", this.faustIControler.callbackEdit, true);
    this.faustView.group.addEventListener("touchstart", this.faustIControler.callbackEdit, true);
    if (this.originalAccValue != this.accSlid.acc || this.originalEnabled != this.accSlid.isEnabled) {
      var detail = { sliderName: this.accSlid.label, newAccValue: this.accSlid.acc, isEnabled: this.accSlid.isEnabled };
      this.faustIControler.updateFaustCodeCallback(detail);
    }
    this.applyDisableEnableAcc();
  }
  //disable or enable slider according to isActive and isEnable
  applyDisableEnableAcc() {
    if (this.accSlid.isEnabled) {
      this.faustView.group.classList.remove("disabledAcc");
      if (this.accSlid.isActive) {
        this.faustView.slider.classList.add("not-allowed");
        this.faustView.slider.classList.remove("allowed");
        this.faustView.slider.disabled = true;
      } else {
        this.faustView.slider.classList.remove("not-allowed");
        this.faustView.slider.classList.add("allowed");
        this.faustView.slider.disabled = false;
      }
    } else {
      this.faustView.group.classList.add("disabledAcc");
      this.faustView.slider.classList.remove("not-allowed");
      this.faustView.slider.classList.add("allowed");
      this.faustView.slider.disabled = false;
    }
  }
  //Place graphical element of the editing view
  placeElement() {
    this.accelerometerEditView.blockLayer.style.display = "block";
    this.accelerometerEditView.blockLayer.style.height = window.innerHeight + "px";
    this.accelerometerEditView.rangeContainer.style.top = window.innerHeight / 1.8 + "px";
    this.accelerometerEditView.cloneContainer.style.top = window.innerHeight / 7 + "px";
    this.accelerometerEditView.checkeOnOffContainer.style.top = window.innerHeight / 8 + "px";
    this.accelerometerEditView.radioAxisContainer.style.top = window.innerHeight / 12 + "px";
    this.accelerometerEditView.radioCurveContainer.style.top = window.innerHeight / 25 + "px";
  }
  //store original values of the controller being edited
  storeAccelerometerSliderInfos(faustIControler) {
    var acc = faustIControler.accelerometerSlider;
    this.originalAxis = Axis[acc.axis];
    this.originalAccValue = acc.acc;
    this.originalActive = acc.isActive;
    this.originalEnabled = acc.isEnabled;
    this.originalDefaultVal = acc.init;
    this.originalDefaultSliderVal = faustIControler.faustInterfaceView.slider.value;
    if (acc.isActive) {
      this.originalSliderAllowedStyle = "not-allowed";
    } else {
      this.originalSliderAllowedStyle = "allowed";
    }
  }
  //check or uncheck the checkbox for enabling/disabling the acc on the app
  applyAccEnableDisable(accSlider) {
    if (accSlider.isEnabled) {
      this.accelerometerEditView.radioAxis0.checked = false;
    } else {
      this.accelerometerEditView.radioAxis0.checked = true;
    }
  }
  //check or uncheck the checkbox for enabling/disabling the acc on the app and faust code
  //applying styling accordingly
  disablerEnablerAcc(e) {
    if (this.accSlid.isEnabled) {
      this.accSlid.isEnabled = false;
      this.accelerometerEditView.cloneContainer.getElementsByTagName("div")[0].classList.add("disabledAcc");
      this.faustView.group.classList.add("disabledAcc");
      this.accelerometerEditView.rangeContainer.classList.add("disabledAcc");
    } else {
      this.accSlid.isEnabled = true;
      this.accelerometerEditView.cloneContainer.getElementsByTagName("div")[0].classList.remove("disabledAcc");
      this.faustView.group.classList.remove("disabledAcc");
      this.accelerometerEditView.rangeContainer.classList.remove("disabledAcc");
    }
  }
  //set curve to the good radio button curve
  selectDefaultCurve(accSlider) {
    switch (accSlider.curve) {
      case Curve.Up:
        this.accelerometerEditView.radioCurve1.checked = true;
        break;
      case Curve.Down:
        this.accelerometerEditView.radioCurve2.checked = true;
        break;
      case Curve.UpDown:
        this.accelerometerEditView.radioCurve3.checked = true;
        break;
      case Curve.DownUp:
        this.accelerometerEditView.radioCurve4.checked = true;
        break;
      default:
        this.accelerometerEditView.radioCurve1.checked = true;
        break;
    }
  }
  //set axis to the good radio button axis
  selectDefaultAxis(accSlider) {
    switch (accSlider.axis) {
      case Axis.x:
        this.accelerometerEditView.radioAxisX.checked = true;
        break;
      case Axis.y:
        this.accelerometerEditView.radioAxisY.checked = true;
        break;
      case Axis.z:
        this.accelerometerEditView.radioAxisZ.checked = true;
        break;
    }
  }
  //set values to the minimum acc range
  applyRangeMinValues(accSlider) {
    this.accelerometerEditView.rangeMin.min = "-20";
    this.accelerometerEditView.rangeMin.max = "20";
    this.accelerometerEditView.rangeMin.step = "0.1";
    this.accelerometerEditView.rangeMin.value = String(accSlider.amin);
  }
  //set values to the middle acc range
  applyRangeMidValues(accSlider) {
    this.accelerometerEditView.rangeMid.min = "-20";
    this.accelerometerEditView.rangeMid.max = "20";
    this.accelerometerEditView.rangeMid.step = "0.1";
    this.accelerometerEditView.rangeMid.value = String(accSlider.amid);
  }
  //set values to the maximum acc range
  applyRangeMaxValues(accSlider) {
    this.accelerometerEditView.rangeMax.min = "-20";
    this.accelerometerEditView.rangeMax.max = "20";
    this.accelerometerEditView.rangeMax.step = "0.1";
    this.accelerometerEditView.rangeMax.value = String(accSlider.amax);
  }
  //set values to the virtual range
  applyRangeVirtualValues(accSlider) {
    this.accelerometerEditView.rangeVirtual.min = "-20";
    this.accelerometerEditView.rangeVirtual.max = "20";
    this.accelerometerEditView.rangeVirtual.value = "0";
    this.accelerometerEditView.rangeVirtual.step = "0.1";
  }
  //set values to the accelerometer range
  //create a faustInterfaceControler and register it to the AccelerometerHandler
  applyRangeCurrentValues(accSlider) {
    this.accelerometerEditView.rangeCurrent.min = "-20";
    this.accelerometerEditView.rangeCurrent.max = "20";
    this.accelerometerEditView.rangeCurrent.value = "0";
    this.accelerometerEditView.rangeCurrent.step = "0.1";
    this.accParams.isEnabled = accSlider.isEnabled;
    var faustInterfaceControlerEdit = new FaustInterfaceControler(null, null);
    faustInterfaceControlerEdit.faustInterfaceView = new FaustInterfaceView("edit");
    AccelerometerHandler.registerAcceleratedSlider(this.accParams, faustInterfaceControlerEdit, true);
    var acc = faustInterfaceControlerEdit.accelerometerSlider;
    faustInterfaceControlerEdit.faustInterfaceView.slider = this.accelerometerEditView.rangeCurrent;
    faustInterfaceControlerEdit.faustInterfaceView.slider.parentElement.classList.add(Axis[acc.axis]);
    acc.isActive = true;
  }
  //copy params of the accSlider
  copyParamsAccSlider(accSlider) {
    this.accParams = {
      isEnabled: accSlider.isEnabled,
      acc: accSlider.acc,
      address: accSlider.address,
      min: accSlider.min,
      max: accSlider.max,
      init: accSlider.init,
      label: accSlider.label
    };
  }
  // split edited acc axis according the radio axis selection
  radioAxisSplit(event) {
    console.log("change");
    var radio = event.target;
    if (radio.id == "radioX") {
      this.editAxis(Axis.x);
    } else if (radio.id == "radioY") {
      this.editAxis(Axis.y);
    } else if (radio.id == "radioZ") {
      this.editAxis(Axis.z);
    }
  }
  // split edited acc curve according the radio curve selection
  radioCurveSplit(event) {
    console.log("change");
    var radio = event.target;
    if (radio.id == "radio1") {
      this.editCurve(Curve.Up);
    } else if (radio.id == "radio2") {
      this.editCurve(Curve.Down);
    } else if (radio.id == "radio3") {
      this.editCurve(Curve.UpDown);
    } else if (radio.id == "radio4") {
      this.editCurve(Curve.DownUp);
    }
  }
  //apply new axis value the the AccelerometerSlider
  editAxis(axe) {
    this.accelerometerEditView.cloneContainer.getElementsByTagName("div")[0].classList.remove(Axis[this.accSlid.axis]);
    this.accelerometerEditView.cloneContainer.getElementsByTagName("div")[0].classList.add(Axis[axe]);
    var oldAxis = this.accSlid.axis;
    this.accSlid.axis = axe;
    var editAcc = AccelerometerHandler.faustInterfaceControlerEdit.accelerometerSlider;
    var faustView = AccelerometerHandler.faustInterfaceControlerEdit.faustInterfaceView;
    editAcc.axis = axe;
    faustView.slider.parentElement.classList.remove(Axis[oldAxis]);
    faustView.slider.parentElement.classList.add(Axis[editAcc.axis]);
  }
  //apply new curve value the the AccelerometerSlider
  editCurve(curve) {
    this.accSlid.curve = curve;
    var editAcc = AccelerometerHandler.faustInterfaceControlerEdit.accelerometerSlider;
    editAcc.curve = curve;
    AccelerometerHandler.curveSplitter(this.accSlid);
    this.applyValuetoFaust();
  }
  //event handler to switch isActive
  accelerometerEventSwitch(event) {
    this.accelerometerSwitch(this.accelerometerEditView.checkeOnOff.checked);
  }
  //change isActive of AccelerometerSlider
  accelerometerSwitch(isSliderActive) {
    if (isSliderActive) {
      this.accSlid.isActive = isSliderActive;
      if (this.accSlid.isEnabled) {
        this.sliderAllowedStyle = "not-allowed";
      } else {
        this.sliderAllowedStyle = "allowed";
      }
    } else {
      this.sliderAllowedStyle = "allowed";
      this.accSlid.isActive = isSliderActive;
    }
  }
  //apply value of virtual Accelerometer when it's use//
  //disable acc if enabled
  virtualAccelerometer(event) {
    if (this.accelerometerEditView.checkeOnOff.checked == true) {
      this.accelerometerEditView.checkeOnOff.checked = false;
      this.accelerometerSwitch(false);
      this.accSlid.isActive = false;
    }
    this.applyValuetoFaust();
  }
  //apply change to AccelerometerSlider from min slider
  accMin() {
    this.accSlid.amin = parseFloat(this.accelerometerEditView.rangeMin.value);
    this.accSlid.converter.setMappingValues(this.accSlid.amin, this.accSlid.amid, this.accSlid.amax, this.accSlid.min, this.accSlid.init, this.accSlid.max);
    this.applyValuetoFaust();
  }
  //apply change to AccelerometerSlider from mid slider
  accMid() {
    this.accSlid.amid = parseFloat(this.accelerometerEditView.rangeMid.value);
    this.accSlid.converter.setMappingValues(this.accSlid.amin, this.accSlid.amid, this.accSlid.amax, this.accSlid.min, this.accSlid.init, this.accSlid.max);
    this.applyValuetoFaust();
  }
  //apply change to AccelerometerSlider from max slider
  accMax() {
    this.accSlid.amax = parseFloat(this.accelerometerEditView.rangeMax.value);
    this.accSlid.converter.setMappingValues(this.accSlid.amin, this.accSlid.amid, this.accSlid.amax, this.accSlid.min, this.accSlid.init, this.accSlid.max);
    this.applyValuetoFaust();
  }
  //apply values changes to the AccelerometerSlider
  applyValuetoFaust() {
    var rangeVal = parseFloat(this.accelerometerEditView.rangeVirtual.value);
    Utilitary.accHandler.axisSplitter(this.accSlid, rangeVal, rangeVal, rangeVal, Utilitary.accHandler.applyNewValueToModule);
  }
}
class Message {
  //Message show up and set a time out, if nothing happen, it remove it self
  //if one click, it stays, if double click it's removed (also the close button works)
  //fadeOutType can be eather null or "messageTransitionOutFast", to have new animation create new rules css
  constructor(message, fadeOutType, duration, delay) {
    this.isTouch = false;
    this.fadeOutType = "messageTransitionOut";
    this.duration = 1e4;
    this.delay = 4e3;
    this.messageView = new MessageView();
    this.messageViewContainer = this.messageView.init();
    this.messageView.message.textContent = message;
    this.removeEventHandler = (e) => {
      this.removeMessage(e);
    };
    this.messageView.closeButton.addEventListener("click", this.removeEventHandler);
    if (fadeOutType != void 0) {
      this.fadeOutType = fadeOutType;
    }
    if (duration != void 0) {
      this.duration = duration;
    }
    if (delay != void 0) {
      this.delay = delay;
    }
    document.getElementById("dialogue").appendChild(this.messageViewContainer);
    this.timeoutHide = setTimeout(() => {
      this.hideMessage();
    }, this.duration);
    setTimeout(() => {
      this.displayMessage();
    }, 500);
    document.addEventListener("messagedbltouch", () => {
      this.removeEventHandler();
    });
    this.messageViewContainer.addEventListener("click", (e) => {
      this.clearTimeouts(e);
    });
    this.messageViewContainer.addEventListener("click", () => {
      this.dbleTouchMessage();
    });
    this.messageViewContainer.addEventListener("dblclick", () => {
      this.removeEventHandler();
    });
  }
  displayMessage() {
    this.messageViewContainer.classList.remove("messageHide");
    this.messageViewContainer.classList.add("messageShow");
    this.messageViewContainer.classList.add("messageTransitionIn");
    this.messageViewContainer.classList.remove(this.fadeOutType);
  }
  hideMessage() {
    if (this.messageViewContainer != void 0) {
      this.messageViewContainer.classList.remove("messageTransitionIn");
      this.messageViewContainer.classList.add(this.fadeOutType);
      this.messageViewContainer.classList.add("messageHide");
      this.messageViewContainer.classList.remove("messageShow");
      this.timeoutRemove = setTimeout(() => {
        this.removeMessage();
      }, this.delay);
    }
  }
  removeMessage(e) {
    if (e != void 0) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (this.messageViewContainer != void 0) {
      this.messageViewContainer.remove();
      delete this.messageViewContainer;
    }
  }
  dbleTouchMessage() {
    if (!this.isTouch) {
      this.isTouch = true;
      window.setTimeout(() => {
        this.isTouch = false;
      }, 300);
    } else {
      this.dispatchEventCloseDblTouch();
      this.isTouch = false;
    }
  }
  dispatchEventCloseDblTouch() {
    var event = new CustomEvent("messagedbltouch");
    document.dispatchEvent(event);
  }
  clearTimeouts(e) {
    e.stopPropagation();
    e.preventDefault();
    clearTimeout(this.timeoutHide);
    if (this.timeoutRemove != void 0) {
      clearTimeout(this.timeoutRemove);
    }
    this.displayMessage();
  }
}
class MessageView {
  constructor() {
  }
  init() {
    var messageContainer = document.createElement("div");
    messageContainer.className = "messageContainer messageHide messageTransitionIn";
    var closeButton = document.createElement("div");
    closeButton.id = "closeButton";
    this.closeButton = closeButton;
    var message = document.createElement("div");
    message.className = "message";
    this.message = message;
    messageContainer.appendChild(closeButton);
    messageContainer.appendChild(message);
    return messageContainer;
  }
}
class Confirm {
  constructor(message, callback) {
    this.confirmView = new ConfirmView();
    this.confirmViewContainer = this.confirmView.init();
    this.confirmView.message.textContent = message;
    document.getElementById("dialogue").appendChild(this.confirmViewContainer);
    this.displayMessage();
    this.confirmView.validButton.addEventListener("click", () => {
      callback(() => {
        this.removeMessage();
      });
    });
    this.confirmView.cancelButton.addEventListener("click", () => {
      this.removeMessage();
    });
  }
  displayMessage() {
    this.confirmViewContainer.classList.remove("messageHide");
    this.confirmViewContainer.classList.add("messageShow");
  }
  removeMessage(e) {
    if (e != void 0) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (this.confirmViewContainer != void 0) {
      this.confirmViewContainer.remove();
      delete this.confirmViewContainer;
    }
  }
}
class ConfirmView {
  constructor() {
  }
  init() {
    var messageContainer = document.createElement("div");
    messageContainer.className = "messageContainer messageHide";
    var message = document.createElement("div");
    message.className = "message";
    this.message = message;
    var validContainer = document.createElement("div");
    validContainer.className = "validConfirmContainer";
    var validButton = document.createElement("button");
    validButton.id = "validButton";
    validButton.className = "accButton";
    this.validButton = validButton;
    var cancelButton = document.createElement("button");
    cancelButton.id = "cancelButton";
    cancelButton.className = "accButton";
    this.cancelButton = cancelButton;
    validContainer.appendChild(cancelButton);
    validContainer.appendChild(validButton);
    messageContainer.appendChild(message);
    messageContainer.appendChild(validContainer);
    return messageContainer;
  }
}
class DriveAPI {
  constructor() {
    this.CLIENT_ID = "937268536763-j0tfilisap0274toolo0hehndnhgsrva.apps.googleusercontent.com";
    this.SCOPES = ["https://www.googleapis.com/auth/drive"];
    this.faustFolder = "FaustPlayground";
    this.isFaustFolderPresent = false;
    this.extension = ".jfaust";
  }
  /**
   * Check if current user has authorized this application.
  * disable to deactivate pop up window when not connected
   */
  checkAuth() {
  }
  updateConnection() {
    gapi.auth.authorize(
      {
        "client_id": this.CLIENT_ID,
        "scope": this.SCOPES.join(" "),
        "immediate": true
      },
      (authResult) => {
        this.handleAuthResult(authResult);
      }
    );
  }
  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  handleAuthResult(authResult, auto) {
    if (authResult && !authResult.error) {
      let event = new CustomEvent("authon");
      document.dispatchEvent(event);
      this.loadDriveApi();
    } else {
      let event = new CustomEvent("authoff");
      document.dispatchEvent(event);
    }
    if (authResult.error) {
      let event = new CustomEvent("clouderror", { "detail": authResult.error });
      document.dispatchEvent(event);
    }
  }
  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  handleAuthClick(event) {
    gapi.auth.authorize(
      { client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: false },
      (authResult) => {
        this.handleAuthResult(authResult);
      }
    );
    return false;
  }
  /**
   * Load Drive API client library.
   */
  loadDriveApi() {
    var event = new CustomEvent("startloaddrive");
    document.dispatchEvent(event);
    gapi.client.load("drive", "v2", () => {
      this.listFolder();
    });
  }
  /**
   * Print files.
   */
  listFolder() {
    var request = gapi.client.drive.files.list({
      "maxResults": 1e4,
      "q": "title contains 'jfaust' and trashed!=true "
    });
    request.execute((resp) => {
      var event = new CustomEvent("finishloaddrive");
      document.dispatchEvent(event);
      var files = resp.items;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (file.fileExtension == "jfaust") {
            this.appendPre(file.title, file.id);
          }
        }
      } else {
        this.appendPre(Utilitary.messageResource.noFileOnCloud, null);
      }
    });
  }
  getFileMetadata(fileId) {
    var request = gapi.client.drive.files.get({
      "fileId": fileId
    });
    request.execute((file) => {
      this.appendPre(file.title, file.id);
    });
  }
  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(name, id) {
    var option = document.createElement("option");
    option.value = id;
    option.textContent = name.replace(/.jfaust$/, "");
    var event = new CustomEvent("fillselect", { "detail": option });
    document.dispatchEvent(event);
  }
  /**
  * Download a file's content.
  *
  * @param {File} file Drive File instance.
  * @param {Function} callback Function to call when the request is complete.
  */
  downloadFile(file, callback) {
    if (file.downloadUrl) {
      var accessToken = gapi.auth.getToken().access_token;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", file.downloadUrl);
      xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
      xhr.onload = function() {
        callback(xhr.responseText);
      };
      xhr.onerror = function() {
        callback(null);
      };
      xhr.send();
    } else {
      callback(null);
    }
  }
  /**
  * Print a file's metadata.
  *
  * @param {String} fileId ID of the file to print metadata for.
  */
  getFile(fileId, callback) {
    var request = gapi.client.drive.files.get({
      "fileId": fileId
    });
    try {
      request.execute((resp) => {
        this.lastSavedFileMetadata = resp;
        callback(resp);
      });
    } catch (e) {
      new Message("erreur");
    }
  }
  createFile(fileName, callback) {
    var event = new CustomEvent("startloaddrive");
    document.dispatchEvent(event);
    var request = gapi.client.request({
      "path": "/drive/v2/files",
      "method": "POST",
      "body": {
        "title": fileName + this.extension,
        "mimeType": "application/json"
      }
    });
    request.execute((resp) => {
      this.getFile(resp.id, (fileMetada) => {
        this.updateFile(resp.id, fileMetada, this.tempBlob, null);
      });
    });
  }
  /**
  * Update an existing file's metadata and content.
  *
  * @param {String} fileId ID of the file to update.
  * @param {Object} fileMetadata existing Drive file's metadata.
  * @param {File} fileData File object to read data from.
  * @param {Function} callback Callback function to call when the request is complete.
  */
  updateFile(fileId, fileMetadata, fileData, callback) {
    var event = new CustomEvent("startloaddrive");
    document.dispatchEvent(event);
    const boundary = "-------314159265358979323846";
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var reader = new FileReader();
    reader.readAsBinaryString(fileData);
    reader.onload = function(e) {
      var contentType = fileData.type || "application/octet-stream";
      var base64Data = btoa(reader.result.toString());
      var multipartRequestBody = delimiter + "Content-Type: application/json\r\n\r\n" + JSON.stringify(fileMetadata) + delimiter + "Content-Type: " + contentType + "\r\nContent-Transfer-Encoding: base64\r\n\r\n" + base64Data + close_delim;
      var request = gapi.client.request({
        "path": "/upload/drive/v2/files/" + fileId,
        "method": "PUT",
        "params": { "uploadType": "multipart", "alt": "json" },
        "headers": {
          "Content-Type": 'multipart/mixed; boundary="' + boundary + '"'
        },
        "body": multipartRequestBody
      });
      if (!callback) {
        callback = () => {
          var event2 = new CustomEvent("updatecloudselect");
          document.dispatchEvent(event2);
          event2 = new CustomEvent("successave");
          document.dispatchEvent(event2);
        };
      }
      request.execute(callback);
    };
  }
  trashFile(fileId) {
    var event = new CustomEvent("startloaddrive");
    document.dispatchEvent(event);
    var request = gapi.client.drive.files.trash({
      "fileId": fileId
    });
    request.execute(function(resp) {
      var event2 = new CustomEvent("updatecloudselect");
      document.dispatchEvent(event2);
    });
  }
}
class ModuleFaust {
  constructor(name) {
    this.fOutputConnections = [];
    this.fInputConnections = [];
    this.recallOutputsDestination = [];
    this.recallInputsSource = [];
    this.fName = name;
  }
  /*************** ACTIONS ON IN/OUTPUT MODULES ***************************/
  // ------ Returns Connection Array OR null if there are none
  getInputConnections() {
    return this.fInputConnections;
  }
  getOutputConnections() {
    return this.fOutputConnections;
  }
  addOutputConnection(connector) {
    this.fOutputConnections.push(connector);
  }
  addInputConnection(connector) {
    this.fInputConnections.push(connector);
  }
  removeOutputConnection(connector) {
    this.fOutputConnections.splice(this.fOutputConnections.indexOf(connector), 1);
  }
  removeInputConnection(connector) {
    this.fInputConnections.splice(this.fInputConnections.indexOf(connector), 1);
  }
  /********************** GET/SET SOURCE/NAME/DSP ***********************/
  setSource(code) {
    this.fSource = code;
  }
  getSource() {
    return this.fSource;
  }
  getName() {
    return this.fName;
  }
  getDSP() {
    return this.fDSP;
  }
}
class ModuleView {
  constructor() {
    this.inputOutputNodeDimension = 32;
  }
  createModuleView(ID, x, y, name, htmlParent) {
    var fModuleContainer = document.createElement("div");
    fModuleContainer.className = "moduleFaust";
    fModuleContainer.style.left = "" + x + "px";
    fModuleContainer.style.top = "" + y + "px";
    var fTitle = document.createElement("h6");
    fTitle.className = "module-title";
    fTitle.textContent = "";
    fModuleContainer.appendChild(fTitle);
    var fInterfaceContainer = document.createElement("div");
    fInterfaceContainer.className = "content";
    fModuleContainer.appendChild(fInterfaceContainer);
    this.fInterfaceContainer = fInterfaceContainer;
    if (name == "input") {
      fModuleContainer.id = "moduleInput";
    } else if (name == "output") {
      fModuleContainer.id = "moduleOutput";
    } else {
      var textArea = document.createElement("textarea");
      textArea.rows = 15;
      textArea.cols = 60;
      textArea.className = "textArea";
      textArea.value = "";
      textArea.style.display = "none";
      textArea.contentEditable = "true";
      this.textArea = textArea;
      fModuleContainer.appendChild(textArea);
      var fFooter = document.createElement("footer");
      fFooter.id = "moduleFooter";
      fModuleContainer.id = "module" + ID;
      var fCloseButton = document.createElement("div");
      fCloseButton.draggable = false;
      fCloseButton.className = "close";
      this.closeButton = fCloseButton;
      var fMinButton = document.createElement("div");
      fMinButton.draggable = false;
      fMinButton.className = "minus";
      this.miniButton = fMinButton;
      var fMaxButton = document.createElement("div");
      fMaxButton.draggable = false;
      fMaxButton.className = "max";
      this.maxButton = fMaxButton;
      fModuleContainer.appendChild(fCloseButton);
      fModuleContainer.appendChild(fMinButton);
      fModuleContainer.appendChild(fMaxButton);
      var fEditImg = document.createElement("div");
      fEditImg.className = "edit";
      fEditImg.draggable = false;
      this.fEditImg = fEditImg;
      fFooter.appendChild(fEditImg);
      fModuleContainer.appendChild(fFooter);
    }
    htmlParent.appendChild(fModuleContainer);
    this.fName = name;
    this.fModuleContainer = fModuleContainer;
    this.fInterfaceContainer = fInterfaceContainer;
    this.fEditImg = fEditImg;
    this.fTitle = fTitle;
    this.x = x;
    this.y = y;
  }
  // ------ Returns Graphical input and output Node
  getOutputNode() {
    return this.fOutputNode;
  }
  getInputNode() {
    return this.fInputNode;
  }
  getModuleContainer() {
    return this.fModuleContainer;
  }
  getInterfaceContainer() {
    return this.fInterfaceContainer;
  }
  setInputNode() {
    this.fInputNode = document.createElement("div");
    this.fInputNode.className = "node node-input";
    this.fInputNode.draggable = false;
    var spanNode = document.createElement("span");
    spanNode.draggable = false;
    spanNode.className = "node-button";
    this.fInputNode.appendChild(spanNode);
    this.fModuleContainer.appendChild(this.fInputNode);
  }
  setOutputNode() {
    this.fOutputNode = document.createElement("div");
    this.fOutputNode.className = "node node-output";
    this.fOutputNode.draggable = false;
    var spanNode = document.createElement("span");
    spanNode.draggable = false;
    spanNode.className = "node-button";
    this.fOutputNode.appendChild(spanNode);
    this.fModuleContainer.appendChild(this.fOutputNode);
  }
  deleteInputOutputNodes() {
    if (this.fInputNode) {
      this.fModuleContainer.removeChild(this.fInputNode);
      this.fInputNode = null;
    }
    if (this.fOutputNode) {
      this.fModuleContainer.removeChild(this.fOutputNode);
      this.fOutputNode = null;
    }
  }
  isPointInOutput(x, y) {
    if (this.fOutputNode && this.fOutputNode.getBoundingClientRect().left < x && x < this.fOutputNode.getBoundingClientRect().right && this.fOutputNode.getBoundingClientRect().top < y && y < this.fOutputNode.getBoundingClientRect().bottom) {
      return true;
    }
    return false;
  }
  isPointInInput(x, y) {
    if (this.fInputNode && this.fInputNode.getBoundingClientRect().left <= x && x <= this.fInputNode.getBoundingClientRect().right && this.fInputNode.getBoundingClientRect().top <= y && y <= this.fInputNode.getBoundingClientRect().bottom) {
      return true;
    }
    return false;
  }
  isPointInNode(x, y) {
    if (this.fModuleContainer && this.fModuleContainer.getBoundingClientRect().left < x && x < this.fModuleContainer.getBoundingClientRect().right && this.fModuleContainer.getBoundingClientRect().top < y && y < this.fModuleContainer.getBoundingClientRect().bottom) {
      return true;
    }
    return false;
  }
}
class PathIterator {
  // end position of the current path
  constructor(faustCode) {
    this.fFaustCode = faustCode;
    this.fStart = 0;
    this.fEnd = 0;
  }
  // search and select next string :  "...."
  // (not completely safe, but should be OK)
  findNextPathString() {
    var p1 = this.fFaustCode.indexOf('"', this.fEnd + 1);
    var p2 = this.fFaustCode.indexOf('"', p1 + 1);
    if (this.fEnd < p1 && p1 < p2) {
      this.fStart = p1;
      this.fEnd = p2 + 1;
      var path = this.fFaustCode.slice(this.fStart, this.fEnd);
      return path;
    } else {
      console.log(`no more path found: ${this.fEnd}, ${p1}, ${p2}`);
      return "";
    }
  }
  // Replace the current selected path with a new string and return the update faust code
  updateCurrentPathString(newstring) {
    if (0 < this.fStart && this.fStart < this.fEnd) {
      return this.fFaustCode.slice(0, this.fStart) + newstring + this.fFaustCode.slice(this.fEnd);
    } else {
      console.log("ERROR, trying to update an invalide path");
      return this.fFaustCode;
    }
  }
}
function forgeAccMetadata(newAccValue, isEnabled) {
  if (isEnabled) {
    return `acc:${newAccValue}`;
  } else {
    return `noacc:${newAccValue}`;
  }
}
function removeMetadata(uipath) {
  var r = "";
  var i = 0;
  while (true) {
    var j = uipath.indexOf("[", i);
    if (j == -1) {
      r = r + uipath.slice(i);
      return r;
    } else {
      r = r + uipath.slice(i, j);
      var k = uipath.indexOf("]", j);
      if (k > 0) {
        i = k + 1;
      } else {
        console.log("removeMetada() called on incorrect label: " + uipath);
        return uipath;
      }
    }
  }
}
function replaceAccInPath(oldpath, newacc) {
  var i = oldpath.indexOf("noacc");
  if (i < 0)
    i = oldpath.indexOf("acc");
  if (i < 0) {
    var newpath = oldpath.slice(0, -1) + "[" + newacc + ']"';
    return newpath;
  } else {
    var j = oldpath.indexOf("]", i);
    if (j > 0) {
      var newpath = oldpath.slice(0, i) + newacc + oldpath.slice(j);
      return newpath;
    }
  }
  console.log(`ERROR in replaceAccInPath() : malformed path ${oldpath}`);
  return oldpath;
}
function match(uiname, uipath) {
  var path = removeMetadata(uipath.slice(1, -1));
  var found = path.indexOf(uiname) >= 0;
  return found;
}
function updateAccInFaustCode(faustcode, name, newaccvalue) {
  var cc = new PathIterator(faustcode);
  for (var path = cc.findNextPathString(); path != ""; path = cc.findNextPathString()) {
    if (match(name, path)) {
      var u = replaceAccInPath(path, newaccvalue);
      return cc.updateCurrentPathString(u);
    }
  }
  new Message(name + Utilitary.messageResource.errorAccSliderNotFound);
  return faustcode;
}
const _ModuleClass = class _ModuleClass2 {
  constructor(id, x, y, name, htmlElementModuleContainer, removeModuleCallBack, compileFaust) {
    this.drag = new Drag();
    this.dragList = [];
    this.moduleControles = [];
    this.fModuleInterfaceParams = {};
    this.eventConnectorHandler = (event) => {
      this.dragCnxCallback(event, this);
    };
    this.eventCloseEditHandler = (event) => {
      this.recompileSource(event, this);
    };
    this.eventOpenEditHandler = () => {
      this.edit();
    };
    this.compileFaust = compileFaust;
    this.deleteCallback = removeModuleCallBack;
    this.eventDraggingHandler = (event) => {
      this.dragCallback(event, this);
    };
    this.moduleView = new ModuleView();
    this.moduleView.createModuleView(id, x, y, name, htmlElementModuleContainer);
    this.moduleFaust = new ModuleFaust(name);
    this.addEvents();
  }
  //add all event listener to the moduleView
  addEvents() {
    this.moduleView.getModuleContainer().addEventListener("mousedown", this.eventDraggingHandler, false);
    this.moduleView.getModuleContainer().addEventListener("touchstart", this.eventDraggingHandler, false);
    this.moduleView.getModuleContainer().addEventListener("touchmove", this.eventDraggingHandler, false);
    this.moduleView.getModuleContainer().addEventListener("touchend", this.eventDraggingHandler, false);
    if (this.moduleView.textArea != void 0) {
      this.moduleView.textArea.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      });
      this.moduleView.textArea.addEventListener("touchend", (e) => {
        e.stopPropagation();
      });
      this.moduleView.textArea.addEventListener("touchmove", (e) => {
        e.stopPropagation();
      });
      this.moduleView.textArea.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });
    }
    if (this.moduleView.closeButton != void 0) {
      this.moduleView.closeButton.addEventListener("click", () => {
        this.deleteModule();
      });
      this.moduleView.closeButton.addEventListener("touchend", () => {
        this.deleteModule();
      });
    }
    if (this.moduleView.miniButton != void 0) {
      this.moduleView.miniButton.addEventListener("click", () => {
        this.minModule();
      });
      this.moduleView.miniButton.addEventListener("touchend", () => {
        this.minModule();
      });
    }
    if (this.moduleView.maxButton != void 0) {
      this.moduleView.maxButton.addEventListener("click", () => {
        this.maxModule();
      });
      this.moduleView.maxButton.addEventListener("touchend", () => {
        this.maxModule();
      });
    }
    if (this.moduleView.fEditImg != void 0) {
      this.moduleView.fEditImg.addEventListener("click", this.eventOpenEditHandler);
      this.moduleView.fEditImg.addEventListener("touchend", this.eventOpenEditHandler);
    }
  }
  /***************  PRIVATE METHODS  ******************************/
  dragCallback(event, module) {
    if (event.type == "mousedown") {
      module.drag.getDraggingMouseEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.startDraggingModule(el, x, y, module2, e);
      });
    } else if (event.type == "mouseup") {
      module.drag.getDraggingMouseEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.stopDraggingModule(el, x, y, module2, e);
      });
    } else if (event.type == "mousemove") {
      module.drag.getDraggingMouseEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.whileDraggingModule(el, x, y, module2, e);
      });
    } else if (event.type == "touchstart") {
      module.drag.getDraggingTouchEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.startDraggingModule(el, x, y, module2, e);
      });
    } else if (event.type == "touchmove") {
      module.drag.getDraggingTouchEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.whileDraggingModule(el, x, y, module2, e);
      });
    } else if (event.type == "touchend") {
      module.drag.getDraggingTouchEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.stopDraggingModule(el, x, y, module2, e);
      });
    }
  }
  dragCnxCallback(event, module) {
    if (event.type == "mousedown") {
      module.drag.getDraggingMouseEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.startDraggingConnector(el, x, y, module2, e);
      });
    } else if (event.type == "mouseup") {
      module.drag.getDraggingMouseEvent(event, module, (el, x, y, module2) => {
        module2.drag.stopDraggingConnector(el, x, y, module2);
      });
    } else if (event.type == "mousemove") {
      module.drag.getDraggingMouseEvent(event, module, (el, x, y, module2, e) => {
        module2.drag.whileDraggingConnector(el, x, y, module2, e);
      });
    } else if (event.type == "touchstart") {
      var newdrag = new Drag();
      newdrag.isDragConnector = true;
      newdrag.originTarget = event.target;
      module.dragList.push(newdrag);
      var index = module.dragList.length - 1;
      module.dragList[index].getDraggingTouchEvent(event, module, (el, x, y, module2, e) => {
        module2.dragList[index].startDraggingConnector(el, x, y, module2, e);
      });
    } else if (event.type == "touchmove") {
      for (var i = 0; i < module.dragList.length; i++) {
        if (module.dragList[i].originTarget == event.target) {
          module.dragList[i].getDraggingTouchEvent(event, module, (el, x, y, module2, e) => {
            module2.dragList[i].whileDraggingConnector(el, x, y, module2, e);
          });
        }
      }
    } else if (event.type == "touchend") {
      var customEvent = new CustomEvent("unstylenode");
      document.dispatchEvent(customEvent);
      for (var i = 0; i < module.dragList.length; i++) {
        if (module.dragList[i].originTarget == event.target) {
          module.dragList[i].getDraggingTouchEvent(event, module, (el, x, y, module2) => {
            module2.dragList[i].stopDraggingConnector(el, x, y, module2);
          });
        }
      }
      document.dispatchEvent(customEvent);
    }
  }
  /*******************************  PUBLIC METHODS  **********************************/
  deleteModule() {
    var connector = new Connector();
    connector.disconnectModule(this);
    this.deleteFaustInterface();
    if (this.moduleView) {
      this.moduleView.fModuleContainer.parentNode.removeChild(this.moduleView.fModuleContainer);
    }
    this.deleteDSP(this.moduleFaust.fDSP);
    this.moduleFaust.fDSP = null;
    this.moduleFaust.factory = null;
    this.deleteCallback(this);
  }
  //make module smaller
  minModule() {
    this.moduleView.fInterfaceContainer.classList.add("mini");
    this.moduleView.fTitle.classList.add("miniTitle");
    this.moduleView.miniButton.style.display = "none";
    this.moduleView.maxButton.style.display = "block";
    Connector.redrawInputConnections(this, this.drag);
    Connector.redrawOutputConnections(this, this.drag);
  }
  //restore module size
  maxModule() {
    this.moduleView.fInterfaceContainer.classList.remove("mini");
    this.moduleView.fTitle.classList.remove("miniTitle");
    this.moduleView.maxButton.style.display = "none";
    this.moduleView.miniButton.style.display = "block";
    Connector.redrawInputConnections(this, this.drag);
    Connector.redrawOutputConnections(this, this.drag);
  }
  //--- Create and Update are called once a source code is compiled and the factory exists
  async createDSP(factory, callback) {
    this.moduleFaust.factory = factory;
    try {
      if (factory != null) {
        var moduleFaust = this.moduleFaust;
        const faustMonoDspGenerator = new faustWasmEnv.FaustMonoDspGenerator();
        const dsp = typeof AudioWorklet !== "undefined" ? await faustMonoDspGenerator.createNode(Utilitary.audioContext, "FaustDSP", factory) : await faustMonoDspGenerator.createNode(Utilitary.audioContext, "FaustDSP", factory, true, 1024);
        if (dsp != null) {
          moduleFaust.fDSP = dsp;
          callback();
        } else {
          new Message(Utilitary.messageResource.errorCreateDSP);
          Utilitary.hideFullPageLoading();
        }
      } else {
        throw new Error("create DSP Error : null factory");
      }
    } catch (e) {
      new Message(Utilitary.messageResource.errorCreateDSP + " : " + e);
      Utilitary.hideFullPageLoading();
    }
  }
  //--- Update DSP in module
  updateDSP(factory, module) {
    var toDelete = module.moduleFaust.fDSP;
    var saveOutCnx = new Array().concat(module.moduleFaust.fOutputConnections);
    var saveInCnx = new Array().concat(module.moduleFaust.fInputConnections);
    var connector = new Connector();
    connector.disconnectModule(module);
    module.deleteFaustInterface();
    module.moduleView.deleteInputOutputNodes();
    module.createDSP(factory, function() {
      module.moduleFaust.fName = module.moduleFaust.fTempName;
      module.moduleFaust.fSource = module.moduleFaust.fTempSource;
      module.setFaustInterfaceControles();
      module.createFaustInterface();
      module.addInputOutputNodes();
      module.deleteDSP(toDelete);
      if (saveOutCnx && module.moduleView.getOutputNode()) {
        for (var i = 0; i < saveOutCnx.length; i++) {
          if (saveOutCnx[i])
            connector.createConnection(module, module.moduleView.getOutputNode(), saveOutCnx[i].destination, saveOutCnx[i].destination.moduleView.getInputNode());
        }
      }
      if (saveInCnx && module.moduleView.getInputNode()) {
        for (var i = 0; i < saveInCnx.length; i++) {
          if (saveInCnx[i])
            connector.createConnection(saveInCnx[i].source, saveInCnx[i].source.moduleView.getOutputNode(), module, module.moduleView.getInputNode());
        }
      }
      Utilitary.hideFullPageLoading();
    });
  }
  deleteDSP(todelete) {
    if (todelete)
      todelete.destroy();
  }
  /******************** EDIT SOURCE & RECOMPILE *************************/
  edit() {
    this.saveInterfaceParams();
    var event = new CustomEvent("codeeditevent");
    document.dispatchEvent(event);
    this.deleteFaustInterface();
    this.moduleView.textArea.style.display = "block";
    this.moduleView.textArea.value = this.moduleFaust.fSource;
    Connector.redrawInputConnections(this, this.drag);
    Connector.redrawOutputConnections(this, this.drag);
    this.moduleView.fEditImg.style.backgroundImage = "url(" + Utilitary.baseImg + "enter.png)";
    this.moduleView.fEditImg.addEventListener("click", this.eventCloseEditHandler);
    this.moduleView.fEditImg.addEventListener("touchend", this.eventCloseEditHandler);
    this.moduleView.fEditImg.removeEventListener("click", this.eventOpenEditHandler);
    this.moduleView.fEditImg.removeEventListener("touchend", this.eventOpenEditHandler);
  }
  //---- Update ModuleClass with new name/code source
  update(name, code) {
    var event = new CustomEvent("codeeditevent");
    document.dispatchEvent(event);
    this.moduleFaust.fTempName = name;
    this.moduleFaust.fTempSource = code;
    var module = this;
    this.compileFaust({ name, sourceCode: code, x: this.moduleView.x, y: this.moduleView.y, callback: (factory) => {
      module.updateDSP(factory, module);
    } });
  }
  //---- React to recompilation triggered by click on icon
  recompileSource(event, module) {
    Utilitary.showFullPageLoading();
    var dsp_code = this.moduleView.textArea.value;
    this.moduleView.textArea.style.display = "none";
    Connector.redrawOutputConnections(this, this.drag);
    Connector.redrawInputConnections(this, this.drag);
    module.update(this.moduleView.fTitle.textContent, dsp_code);
    module.recallInterfaceParams();
    module.moduleView.fEditImg.style.backgroundImage = "url(" + Utilitary.baseImg + "edit.png)";
    module.moduleView.fEditImg.addEventListener("click", this.eventOpenEditHandler);
    module.moduleView.fEditImg.addEventListener("touchend", this.eventOpenEditHandler);
    module.moduleView.fEditImg.removeEventListener("click", this.eventCloseEditHandler);
    module.moduleView.fEditImg.removeEventListener("touchend", this.eventCloseEditHandler);
  }
  /***************** CREATE/DELETE the DSP Interface ********************/
  // Fill fInterfaceContainer with the DSP's Interface (--> see FaustInterface.js)
  setFaustInterfaceControles() {
    this.moduleView.fTitle.textContent = this.moduleFaust.fName;
    var moduleFaustInterface = new FaustInterfaceControler(
      (faustInterface) => {
        this.interfaceSliderCallback(faustInterface);
      },
      (adress, value) => {
        this.moduleFaust.fDSP.setParamValue(adress, +value);
      }
    );
    this.moduleControles = moduleFaustInterface.parseFaustJsonUI(JSON.parse(this.moduleFaust.fDSP.getJSON()).ui, this);
  }
  // Create FaustInterfaceControler, set its callback and add its AccelerometerSlider
  createFaustInterface() {
    for (var i = 0; i < this.moduleControles.length; i++) {
      var faustInterfaceControler = this.moduleControles[i];
      faustInterfaceControler.setParams();
      faustInterfaceControler.faustInterfaceView = new FaustInterfaceView(faustInterfaceControler.itemParam.type);
      this.moduleView.getInterfaceContainer().appendChild(faustInterfaceControler.createFaustInterfaceElement());
      faustInterfaceControler.interfaceCallback = this.interfaceSliderCallback.bind(this);
      faustInterfaceControler.updateFaustCodeCallback = this.updateCodeFaust.bind(this);
      faustInterfaceControler.setEventListener();
      faustInterfaceControler.createAccelerometer();
    }
  }
  // Delete all FaustInterfaceControler
  deleteFaustInterface() {
    this.deleteAccelerometerRef();
    while (this.moduleView.fInterfaceContainer.childNodes.length != 0) {
      this.moduleView.fInterfaceContainer.removeChild(this.moduleView.fInterfaceContainer.childNodes[0]);
    }
  }
  // Remove AccelerometerSlider ref from AccelerometerHandler
  deleteAccelerometerRef() {
    for (var i = 0; i < this.moduleControles.length; i++) {
      if (this.moduleControles[i].accelerometerSlider != null && this.moduleControles[i].accelerometerSlider != void 0) {
        var index = AccelerometerHandler.faustInterfaceControler.indexOf(this.moduleControles[i]);
        AccelerometerHandler.faustInterfaceControler.splice(index, 1);
        delete this.moduleControles[i].accelerometerSlider;
      }
    }
    this.moduleControles = [];
  }
  // set DSP value to all FaustInterfaceControlers
  setDSPValue() {
    for (var i = 0; i < this.moduleControles.length; i++) {
      this.moduleFaust.fDSP.setParamValue(this.moduleControles[i].itemParam.address, +this.moduleControles[i].value);
    }
  }
  // set DSP value to specific FaustInterfaceControlers
  setDSPValueCallback(address, value) {
    this.moduleFaust.fDSP.setParamValue(address, +value);
  }
  // Updates Faust Code with new accelerometer metadata
  updateCodeFaust(details) {
    var m = forgeAccMetadata(details.newAccValue, details.isEnabled);
    var s = updateAccInFaustCode(this.moduleFaust.fSource, details.sliderName, m);
    this.moduleFaust.fSource = s;
  }
  //---- Generic callback for Faust Interface
  //---- Called every time an element of the UI changes value
  interfaceSliderCallback(faustControler) {
    var val;
    if (faustControler.faustInterfaceView.slider) {
      var input = faustControler.faustInterfaceView.slider;
      val = Number(parseFloat(input.value) * parseFloat(faustControler.itemParam.step) + parseFloat(faustControler.itemParam.min)).toFixed(parseFloat(faustControler.precision));
    } else if (faustControler.faustInterfaceView.button) {
      var input = faustControler.faustInterfaceView.button;
      if (faustControler.value == void 0 || faustControler.value == "0") {
        faustControler.value = val = "1";
      } else {
        faustControler.value = val = "0";
      }
    }
    var text = faustControler.itemParam.address;
    faustControler.value = val;
    var output = faustControler.faustInterfaceView.output;
    if (output)
      output.textContent = "" + val + " " + faustControler.unit;
    this.moduleFaust.fDSP.setParamValue(text, +val);
  }
  interfaceButtonCallback(faustControler, val) {
    var text = faustControler.itemParam.address;
    faustControler.value = val.toString();
    var output = faustControler.faustInterfaceView.output;
    if (output)
      output.textContent = "" + val + " " + faustControler.unit;
    this.moduleFaust.fDSP.setParamValue(text, val);
  }
  // Save graphical parameters of a Faust Node
  saveInterfaceParams() {
    var controls = this.moduleControles;
    for (var j = 0; j < controls.length; j++) {
      var text = controls[j].itemParam.address;
      this.fModuleInterfaceParams[text] = controls[j].value;
    }
  }
  recallInterfaceParams() {
    for (var key in this.fModuleInterfaceParams)
      this.moduleFaust.fDSP.setParamValue(key, +this.fModuleInterfaceParams[key]);
  }
  getInterfaceParams() {
    return this.fModuleInterfaceParams;
  }
  setInterfaceParams(parameters) {
    this.fModuleInterfaceParams = parameters;
  }
  addInterfaceParam(path, value) {
    this.fModuleInterfaceParams[path] = value.toString();
  }
  /******************* GET/SET INPUT/OUTPUT NODES **********************/
  addInputOutputNodes() {
    if (this.moduleFaust.fDSP.getNumInputs() > 0 && this.moduleView.fName != "input") {
      this.moduleView.setInputNode();
      this.moduleView.fInputNode.addEventListener("mousedown", this.eventConnectorHandler);
      this.moduleView.fInputNode.addEventListener("touchstart", this.eventConnectorHandler);
      this.moduleView.fInputNode.addEventListener("touchmove", this.eventConnectorHandler);
      this.moduleView.fInputNode.addEventListener("touchend", this.eventConnectorHandler);
    }
    if (this.moduleFaust.fDSP.getNumOutputs() > 0 && this.moduleView.fName != "output") {
      this.moduleView.setOutputNode();
      this.moduleView.fOutputNode.addEventListener("mousedown", this.eventConnectorHandler);
      this.moduleView.fOutputNode.addEventListener("touchstart", this.eventConnectorHandler);
      this.moduleView.fOutputNode.addEventListener("touchmove", this.eventConnectorHandler);
      this.moduleView.fOutputNode.addEventListener("touchend", this.eventConnectorHandler);
    }
  }
  //manage style of node when touchover will dragging
  //make the use easier for connections
  styleInputNodeTouchDragOver(el) {
    el.style.border = "15px double rgb(0, 211, 255)";
    el.style.left = "-32px";
    el.style.marginTop = "-32px";
    _ModuleClass2.isNodesModuleUnstyle = false;
  }
  styleOutputNodeTouchDragOver(el) {
    el.style.border = "15px double rgb(0, 211, 255)";
    el.style.right = "-32px";
    el.style.marginTop = "-32px";
    _ModuleClass2.isNodesModuleUnstyle = false;
  }
};
_ModuleClass.isNodesModuleUnstyle = true;
let ModuleClass = _ModuleClass;
const ModuleClass$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModuleClass
}, Symbol.toStringTag, { value: "Module" }));
class Drag {
  constructor() {
    this.zIndex = 0;
    this.connector = new Connector();
    this.isDragConnector = false;
  }
  //used to dispatch the element, the location and the event to the callback function with click event
  getDraggingMouseEvent(mouseEvent, module, draggingFunction) {
    var event = mouseEvent;
    var el = mouseEvent.target;
    var x = mouseEvent.clientX + window.scrollX;
    var y = mouseEvent.clientY + window.scrollY;
    draggingFunction(el, x, y, module, event);
  }
  //used to dispatch the element, the location and the event to the callback function with touch event
  getDraggingTouchEvent(touchEvent, module, draggingFunction) {
    var event = touchEvent;
    if (touchEvent.targetTouches.length > 0) {
      var touch = touchEvent.targetTouches[0];
      var el = touch.target;
      var x = touch.clientX + window.scrollX;
      var y = touch.clientY + window.scrollY;
      draggingFunction(el, x, y, module, event);
    } else if (this.isDragConnector) {
      for (var i = 0; i < touchEvent.changedTouches.length; i++) {
        var touch = touchEvent.changedTouches[i];
        var x = touch.clientX + window.scrollX;
        var y = touch.clientY + window.scrollY;
        var el = document.elementFromPoint(x - scrollX, y - scrollY);
        draggingFunction(el, x, y, module, event);
      }
    } else {
      draggingFunction(null, null, null, module, event);
    }
  }
  startDraggingModule(el, x, y, module, event) {
    var moduleContainer = module.moduleView.getModuleContainer();
    this.cursorStartX = x;
    this.cursorStartY = y;
    this.elementStartLeft = parseInt(moduleContainer.style.left, 10);
    this.elementStartTop = parseInt(moduleContainer.style.top, 10);
    if (isNaN(this.elementStartLeft)) {
      this.elementStartLeft = 0;
    }
    if (isNaN(this.elementStartTop)) {
      this.elementStartTop = 0;
    }
    document.addEventListener("mouseup", module.eventDraggingHandler, false);
    document.addEventListener("mousemove", module.eventDraggingHandler, false);
    event.stopPropagation();
    event.preventDefault();
  }
  whileDraggingModule(el, x, y, module, event) {
    var moduleContainer = module.moduleView.getModuleContainer();
    moduleContainer.style.left = this.elementStartLeft + x - this.cursorStartX + "px";
    moduleContainer.style.top = this.elementStartTop + y - this.cursorStartY + "px";
    if (module.moduleFaust.getInputConnections() != null) {
      Connector.redrawInputConnections(module, this);
    }
    if (module.moduleFaust.getOutputConnections() != null) {
      Connector.redrawOutputConnections(module, this);
    }
    event.stopPropagation();
  }
  stopDraggingModule(el, x, y, module, event) {
    document.removeEventListener("mouseup", module.eventDraggingHandler, false);
    document.removeEventListener("mousemove", module.eventDraggingHandler, false);
  }
  /************************************************************************************/
  /*** Connector Dragging - these are used for dragging the connectors between nodes***/
  /************************************************************************************/
  updateConnectorShapePath(connectorShape, x1, x2, y1, y2) {
    connectorShape.x1 = x1;
    connectorShape.x2 = x2;
    connectorShape.y1 = y1;
    connectorShape.y2 = y2;
  }
  setCurvePath(x1, y1, x2, y2, x1Bezier, x2Bezier) {
    return "M" + x1 + "," + y1 + " C" + x1Bezier + "," + y1 + " " + x2Bezier + "," + y2 + " " + x2 + "," + y2;
  }
  calculBezier(x1, x2) {
    return x1 - (x1 - x2) / 2;
  }
  startDraggingConnection(module, target) {
    if (target.classList.contains("node-button")) {
      target = target.parentNode;
    }
    var offset = target;
    var x = module.moduleView.inputOutputNodeDimension / 2;
    var y = module.moduleView.inputOutputNodeDimension / 2;
    while (offset) {
      x += offset.offsetLeft;
      y += offset.offsetTop;
      offset = offset.offsetParent;
    }
    this.cursorStartX = x;
    this.cursorStartY = y;
    this.isOriginInput = target.classList.contains("node-input");
    module.moduleView.getInterfaceContainer().unlitClassname = module.moduleView.getInterfaceContainer().className;
    var svgns = "http://www.w3.org/2000/svg";
    var curve = document.createElementNS(svgns, "path");
    var d = this.setCurvePath(x, y, x, y, x, x);
    curve.setAttributeNS(null, "d", d);
    curve.setAttributeNS(null, "stroke", "black");
    curve.setAttributeNS(null, "stroke-width", "6");
    curve.setAttributeNS(null, "fill", "none");
    curve.id = String(Connector.connectorId);
    Connector.connectorId++;
    this.connector.connectorShape = curve;
    this.connector.connectorShape.onclick = (event) => {
      this.connector.deleteConnection(event, this);
    };
    document.getElementById("svgCanvas").appendChild(curve);
  }
  stopDraggingConnection(sourceModule, destination, target) {
    if (sourceModule.moduleView.getInterfaceContainer().lastLit) {
      sourceModule.moduleView.getInterfaceContainer().lastLit.className = sourceModule.moduleView.getInterfaceContainer().lastLit.unlitClassname;
      sourceModule.moduleView.getInterfaceContainer().lastLit = null;
    }
    var resultIsConnectionValid = true;
    if (target != null) {
      resultIsConnectionValid = this.isConnectionValid(target);
    }
    sourceModule.moduleView.getInterfaceContainer().className = sourceModule.moduleView.getInterfaceContainer().unlitClassname;
    var x, y;
    if (destination && destination != sourceModule && this.isConnectionUnique(sourceModule, destination) && resultIsConnectionValid) {
      var offset;
      if (!this.isOriginInput)
        offset = destination.moduleView.getInputNode();
      else
        offset = destination.moduleView.getOutputNode();
      var toElem = offset;
      x = destination.moduleView.inputOutputNodeDimension / 2;
      y = destination.moduleView.inputOutputNodeDimension / 2;
      while (offset) {
        x += offset.offsetLeft;
        y += offset.offsetTop;
        offset = offset.offsetParent;
      }
      var x1 = this.cursorStartX;
      var y1 = this.cursorStartY;
      var x2 = x;
      var y2 = y;
      var d = this.setCurvePath(x1, y1, x2, y2, this.calculBezier(x1, x2), this.calculBezier(x1, x2));
      this.connector.connectorShape.setAttributeNS(null, "d", d);
      this.updateConnectorShapePath(this.connector.connectorShape, x1, x2, y1, y2);
      var src = void 0, dst = void 0;
      if (this.isOriginInput) {
        if (toElem.classList.contains("node-output")) {
          src = destination;
          dst = sourceModule;
        }
      } else {
        if (toElem.classList.contains("node-input")) {
          var d = this.setCurvePath(x2, y2, x1, y1, this.calculBezier(x1, x2), this.calculBezier(x1, x2));
          this.connector.connectorShape.setAttributeNS(null, "d", d);
          this.updateConnectorShapePath(this.connector.connectorShape, x2, x1, y2, y1);
          src = sourceModule;
          dst = destination;
        }
      }
      if (src && dst) {
        var connector = new Connector();
        connector.connectModules(src, dst);
        dst.moduleFaust.addInputConnection(connector);
        src.moduleFaust.addOutputConnection(connector);
        this.connector.destination = dst;
        this.connector.source = src;
        connector.saveConnection(src, dst, this.connector.connectorShape);
        this.connector.connectorShape.onclick = (event) => {
          connector.deleteConnection(event, this);
        };
        return;
      }
    }
    this.connector.connectorShape.parentNode.removeChild(this.connector.connectorShape);
    this.connector.connectorShape = null;
  }
  startDraggingConnector(target, x, y, module, event) {
    this.startDraggingConnection(module, target);
    document.addEventListener("mousemove", module.eventConnectorHandler);
    document.addEventListener("mouseup", module.eventConnectorHandler);
    event.preventDefault();
    event.stopPropagation();
  }
  whileDraggingConnector(target, x, y, module, event) {
    if (this.isDragConnector) {
      var currentHoverElement = document.elementFromPoint(x - scrollX, y - scrollY);
      if (currentHoverElement.classList.contains("node-input")) {
        module.styleInputNodeTouchDragOver(currentHoverElement);
      } else if (currentHoverElement.classList.contains("node-output")) {
        module.styleOutputNodeTouchDragOver(currentHoverElement);
      } else if (currentHoverElement.parentElement.classList.contains("node-input")) {
        module.styleInputNodeTouchDragOver(currentHoverElement.parentElement);
      } else if (currentHoverElement.parentElement.classList.contains("node-output")) {
        module.styleOutputNodeTouchDragOver(currentHoverElement.parentElement);
      } else if (!ModuleClass.isNodesModuleUnstyle) {
        var customEvent = new CustomEvent("unstylenode");
        document.dispatchEvent(customEvent);
      }
    }
    var toElem = target;
    var x1 = this.cursorStartX;
    var y1 = this.cursorStartY;
    var x2 = x;
    var y2 = y;
    var d;
    if (!this.isOriginInput) {
      d = this.setCurvePath(x1, y1, x2, y2, this.calculBezier(x1, x2), this.calculBezier(x1, x2));
    } else {
      d = this.setCurvePath(x1, y1, x2, y2, this.calculBezier(x1, x2), this.calculBezier(x1, x2));
    }
    this.connector.connectorShape.setAttributeNS(null, "d", d);
    if (toElem.classList) {
      if (toElem.classList.contains("node-button"))
        toElem = toElem.parentNode;
      if (this.lastLit && this.lastLit != toElem) {
        this.lastLit.className = this.lastLit.unlitClassname;
        this.lastLit = null;
      }
      if (toElem.classList.contains("node")) {
        if (!this.lastLit || this.lastLit != toElem) {
          if (this.isOriginInput) {
            if (toElem.classList.contains("node-output")) {
              toElem.unlitClassname = toElem.className;
              this.lastLit = toElem;
            }
          } else {
            if (toElem.classList.contains("node-input")) {
              toElem.unlitClassname = toElem.className;
              this.lastLit = toElem;
            }
          }
        }
      }
    }
    event.preventDefault();
    event.stopPropagation();
  }
  stopDraggingConnector(target, x, y, module) {
    x = x - window.scrollX;
    y = y - window.scrollY;
    document.removeEventListener("mousemove", module.eventConnectorHandler);
    document.removeEventListener("mouseup", module.eventConnectorHandler);
    var arrivingHTMLNode = target;
    var arrivingHTMLParentNode = arrivingHTMLNode.offsetParent;
    var arrivingNode;
    var modules = Utilitary.currentScene.getModules();
    for (var i = 0; i < modules.length; i++) {
      if (this.isOriginInput && modules[i].moduleView.isPointInOutput(x, y) || modules[i].moduleView.isPointInInput(x, y)) {
        arrivingNode = modules[i];
        break;
      }
    }
    if (arrivingHTMLParentNode != void 0 && arrivingHTMLParentNode.classList.contains("node")) {
      var outputModule = Utilitary.currentScene.getAudioOutput();
      var inputModule = Utilitary.currentScene.getAudioInput();
      if (this.isOriginInput && outputModule.moduleView.isPointInOutput(x, y) || outputModule.moduleView.isPointInInput(x, y) || arrivingHTMLParentNode.offsetParent.getAttribute("id") == "moduleOutput") {
        arrivingNode = outputModule;
      } else if (!this.isOriginInput && inputModule.moduleView.isPointInInput(x, y) || inputModule.moduleView.isPointInOutput(x, y) || arrivingHTMLParentNode.offsetParent.getAttribute("id") == "moduleInput") {
        arrivingNode = inputModule;
      }
    }
    this.stopDraggingConnection(module, arrivingNode, target);
    var index = module.dragList.indexOf(this);
    module.dragList.splice(index, 1);
    this.isDragConnector = false;
  }
  isConnectionValid(target) {
    if (target.classList.contains("node-button")) {
      target = target.parentNode;
    }
    if (target.classList.contains("node-input") && this.isOriginInput) {
      return false;
    } else if (target.classList.contains("node-output") && !this.isOriginInput) {
      return false;
    } else {
      return true;
    }
  }
  isConnectionUnique(moduleSource, moduleDestination) {
    if (this.isOriginInput) {
      for (var i = 0; i < moduleSource.moduleFaust.fInputConnections.length; i++) {
        for (var j = 0; j < moduleDestination.moduleFaust.fOutputConnections.length; j++) {
          if (moduleSource.moduleFaust.fInputConnections[i] == moduleDestination.moduleFaust.fOutputConnections[j]) {
            return false;
          }
        }
      }
    } else {
      for (var i = 0; i < moduleSource.moduleFaust.fOutputConnections.length; i++) {
        for (var j = 0; j < moduleDestination.moduleFaust.fInputConnections.length; j++) {
          if (moduleSource.moduleFaust.fOutputConnections[i] == moduleDestination.moduleFaust.fInputConnections[j]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
class Connector {
  // connect input node to device input
  connectInput(inputModule, divSrc) {
    divSrc.audioNode.connect(inputModule.moduleFaust.getDSP());
  }
  //connect output to device output
  connectOutput(outputModule, divOut) {
    outputModule.moduleFaust.getDSP().connect(divOut.audioNode);
  }
  // Connect Nodes in Web Audio Graph
  connectModules(source, destination) {
    var sourceDSP = void 0;
    var destinationDSP = void 0;
    if (destination != null && destination.moduleFaust.getDSP) {
      destinationDSP = destination.moduleFaust.getDSP();
    }
    if (source.moduleFaust.getDSP) {
      sourceDSP = source.moduleFaust.getDSP();
    }
    if (sourceDSP && destinationDSP) {
      sourceDSP.connect(destinationDSP);
    }
    source.setDSPValue();
    destination.setDSPValue();
  }
  // Disconnect Nodes in Web Audio Graph
  disconnectModules(source, destination) {
    var sourceCopy = source;
    var sourceCopyDSP;
    if (sourceCopy != void 0 && sourceCopy.moduleFaust.getDSP) {
      sourceCopyDSP = sourceCopy.moduleFaust.getDSP();
      sourceCopyDSP.disconnect();
    }
    if (source != void 0 && source.moduleFaust.getOutputConnections()) {
      for (var i = 0; i < source.moduleFaust.getOutputConnections().length; i++) {
        if (source.moduleFaust.getOutputConnections()[i].destination != destination)
          this.connectModules(source, source.moduleFaust.getOutputConnections()[i].destination);
      }
    }
  }
  /**************************************************/
  /***************** Save Connection*****************/
  /**************************************************/
  //----- Add connection to src and dst connections structures
  saveConnection(source, destination, connectorShape) {
    this.connectorShape = connectorShape;
    this.destination = destination;
    this.source = source;
  }
  /***************************************************************/
  /**************** Create/Break Connection(s) *******************/
  /***************************************************************/
  createConnection(source, outtarget, destination, intarget) {
    var drag = new Drag();
    drag.startDraggingConnection(source, outtarget);
    drag.stopDraggingConnection(source, destination);
  }
  deleteConnection(event, drag) {
    event.stopPropagation();
    this.breakSingleInputConnection(this.source, this.destination, this);
    return true;
  }
  breakSingleInputConnection(source, destination, connector) {
    this.disconnectModules(source, destination);
    if (source != void 0 && source.moduleFaust.getOutputConnections()) {
      source.moduleFaust.removeOutputConnection(connector);
    }
    if (destination != void 0 && destination.moduleFaust.getInputConnections()) {
      destination.moduleFaust.removeInputConnection(connector);
    }
    if (connector.connectorShape)
      connector.connectorShape.remove();
  }
  // Disconnect a node from all its connections
  disconnectModule(module) {
    if (module.moduleFaust.getOutputConnections && module.moduleFaust.getOutputConnections()) {
      while (module.moduleFaust.getOutputConnections().length > 0)
        this.breakSingleInputConnection(module, module.moduleFaust.getOutputConnections()[0].destination, module.moduleFaust.getOutputConnections()[0]);
    }
    if (module.moduleFaust.getInputConnections && module.moduleFaust.getInputConnections()) {
      while (module.moduleFaust.getInputConnections().length > 0)
        this.breakSingleInputConnection(module.moduleFaust.getInputConnections()[0].source, module, module.moduleFaust.getInputConnections()[0]);
    }
  }
  static redrawInputConnections(module, drag) {
    var offset = module.moduleView.getInputNode();
    var x = module.moduleView.inputOutputNodeDimension / 2;
    var y = module.moduleView.inputOutputNodeDimension / 2;
    while (offset) {
      x += offset.offsetLeft;
      y += offset.offsetTop;
      offset = offset.offsetParent;
    }
    for (var c = 0; c < module.moduleFaust.getInputConnections().length; c++) {
      var currentConnectorShape = module.moduleFaust.getInputConnections()[c].connectorShape;
      var x1 = x;
      var y1 = y;
      var x2 = currentConnectorShape.x2;
      var y2 = currentConnectorShape.y2;
      var d = drag.setCurvePath(x1, y1, x2, y2, drag.calculBezier(x1, x2), drag.calculBezier(x1, x2));
      currentConnectorShape.setAttributeNS(null, "d", d);
      drag.updateConnectorShapePath(currentConnectorShape, x1, x2, y1, y2);
    }
  }
  static redrawOutputConnections(module, drag) {
    var offset = module.moduleView.getOutputNode();
    var x = module.moduleView.inputOutputNodeDimension / 2;
    var y = module.moduleView.inputOutputNodeDimension / 2;
    while (offset) {
      x += offset.offsetLeft;
      y += offset.offsetTop;
      offset = offset.offsetParent;
    }
    for (var c = 0; c < module.moduleFaust.getOutputConnections().length; c++) {
      if (module.moduleFaust.getOutputConnections()[c].connectorShape) {
        var currentConnectorShape = module.moduleFaust.getOutputConnections()[c].connectorShape;
        var x1 = currentConnectorShape.x1;
        var y1 = currentConnectorShape.y1;
        var x2 = x;
        var y2 = y;
        var d = drag.setCurvePath(x1, y1, x2, y2, drag.calculBezier(x1, x2), drag.calculBezier(x1, x2));
        currentConnectorShape.setAttributeNS(null, "d", d);
        drag.updateConnectorShapePath(currentConnectorShape, x1, x2, y1, y2);
      }
    }
  }
}
Connector.connectorId = 0;
class ModuleTree {
}
class EquivalentFaust {
  isModuleRecursiveExisting(moduleTree) {
    if (Utilitary.recursiveMap[moduleTree.patchID])
      return true;
    return false;
  }
  giveIdToModules(scene) {
    var modules = scene.getModules();
    for (var i = 0; i < modules.length; i++) {
      modules[i].patchID = String(i + 1);
    }
  }
  treatRecursiveModule(moduleTree) {
    var ModuleToReplace = this.getFirstOccurenceOfModuleInCourse(moduleTree);
    Utilitary.recursiveMap[moduleTree.patchID] = ModuleToReplace;
    ModuleToReplace.recursiveFlag = true;
  }
  getFirstOccurenceOfModuleInCourse(moduleTree) {
    for (var i = 0; i < moduleTree.course.length; i++) {
      if (moduleTree.patchID == moduleTree.course[i].patchID) {
        return moduleTree.course[i];
      }
    }
    return null;
  }
  createTree(module, parent) {
    var moduleTree = new ModuleTree();
    moduleTree.patchID = module.patchID;
    moduleTree.course = [];
    if (parent) {
      for (var k = 0; k < parent.course.length; k++)
        moduleTree.course[k] = parent.course[k];
    }
    moduleTree.moduleInputs = [];
    moduleTree.recursiveFlag = false;
    if (this.isModuleRecursiveExisting(moduleTree)) {
      var ModuleToReuse = Utilitary.recursiveMap[moduleTree.patchID];
      moduleTree.sourceCode = ModuleToReuse.sourceCode;
      moduleTree.moduleInputs = ModuleToReuse.moduleInputs;
    } else if (this.getFirstOccurenceOfModuleInCourse(moduleTree)) {
      this.treatRecursiveModule(moduleTree);
      moduleTree = null;
    } else if (module.patchID == "input") {
      moduleTree.sourceCode = module.moduleFaust.getSource();
      moduleTree.course[moduleTree.course.length] = moduleTree;
    } else {
      moduleTree.sourceCode = module.moduleFaust.getSource();
      moduleTree.course[moduleTree.course.length] = moduleTree;
      if (module.moduleFaust.getInputConnections()) {
        for (var j = 0; j < module.moduleFaust.getInputConnections().length; j++)
          moduleTree.moduleInputs[j] = this.createTree(module.moduleFaust.getInputConnections()[j].source, moduleTree);
      }
    }
    return moduleTree;
  }
  /********************************************************************
  ***********************  CREATE FAUST EQUIVALENT ********************
  ********************************************************************/
  //*** The faust equivalent of a scene is calculated following these rules:
  //*** The tree starting from the output Module is computed (tree 1)
  //*** Then if there are unconnected output Modules, there Modules are computed (tree 2, ..., n)
  //*** All trees are composed in parallel
  //*** Every Faust Expression is "Stereoized" before composition with other expressions to ensure composability
  // Computing a Module is computing its entries and merging them in the Module's own faust code.
  computeModule(module) {
    var moduleInputs = module.moduleInputs;
    var faustResult = "";
    if (moduleInputs && moduleInputs.length != 0) {
      var inputCode = "";
      for (var i = 0; i < moduleInputs.length; i++) {
        if (moduleInputs[i]) {
          if (moduleInputs[i].sourceCode && moduleInputs[i].sourceCode.length > 0) {
            if (i != 0) {
              inputCode += ",";
            }
            inputCode += this.computeModule(moduleInputs[i]);
          }
        }
      }
      if (inputCode != "") {
        if (module.recursiveFlag) {
          faustResult += "(" + inputCode + ":> ";
        } else {
          faustResult += inputCode + ":> ";
        }
      }
    }
    var ModuleCode = module.sourceCode;
    if (module.recursiveFlag) {
      faustResult += "stereoize(environment{" + ModuleCode + "}.process))~(_,_)";
    } else {
      faustResult += "stereoize(environment{" + ModuleCode + "}.process)";
    }
    return faustResult;
  }
  // Computing the trees unconnected to the output
  connectUnconnectedModules(faustModuleList, output) {
    for (var i in faustModuleList) {
      var outputNode = faustModuleList[i].moduleView.getOutputNode();
      if (faustModuleList[i].moduleFaust.fName != "input" && outputNode && (!faustModuleList[i].moduleFaust.getOutputConnections || !faustModuleList[i].moduleFaust.getOutputConnections() || faustModuleList[i].moduleFaust.getOutputConnections().length == 0)) {
        var connector = new Connector();
        connector.createConnection(faustModuleList[i], faustModuleList[i].moduleView.getOutputNode(), output, output.moduleView.getInputNode());
      }
    }
  }
  //Calculate Faust Equivalent of the Scene
  getFaustEquivalent(scene, patchName) {
    var faustModuleList = scene.getModules();
    if (faustModuleList.length > 0) {
      var dest = scene.getAudioOutput();
      var src = scene.getAudioInput();
      if (src) {
        src.patchID = "input";
      }
      var faustResult = "stereoize(p) = S(inputs(p), outputs(p))\n				    with {\n				      // degenerated processor with no outputs\n				    S(n,0) = !,! : 0,0; 		// just in case, probably a rare case\n				    \n				      // processors with no inputs\n				    S(0,1) = p <: _/2,_/2; 	// add two fake inputs and split output\n				    S(0,2) = p;\n				    S(0,n) = p,p :> _,_;	// we are sure this will work if n is odd\n				     \n				      // processors with one input\n				    S(1,1) = p,p; 				// add two fake inputs and split output \n				    S(1,n) = p,p :> _/2,_/2;		// we are sure this will work if n is odd\n				     \n			      // processors with two inputs\n				    S(2,1) = p <: _,_; 			// split the output\n				    S(2,2) = p; 				// nothing to do, p is already stereo\n			     \n			      // processors with inputs > 2 and outputs > 2\n			    S(n,m) = _,_ <: p,p :> _,_;	// we are sure this works if n or p are odd\n			    };\n			    \n			    recursivize(p,q) = (_,_,_,_ :> stereoize(p)) ~ stereoize(q);\n			    ";
      this.connectUnconnectedModules(faustModuleList, dest);
      Utilitary.recursiveMap = [];
      this.giveIdToModules(scene);
      var destinationDIVVV = this.createTree(dest, null);
      if (dest.moduleFaust.getInputConnections())
        faustResult += 'process = vgroup("' + patchName + '",(' + this.computeModule(destinationDIVVV) + "));";
      return faustResult;
    } else {
      return null;
    }
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var browser = {};
var canPromise$1 = function() {
  return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
};
var qrcode = {};
var utils$1 = {};
let toSJISFunction;
const CODEWORDS_COUNT = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
utils$1.getSymbolSize = function getSymbolSize(version2) {
  if (!version2)
    throw new Error('"version" cannot be null or undefined');
  if (version2 < 1 || version2 > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return version2 * 4 + 17;
};
utils$1.getSymbolTotalCodewords = function getSymbolTotalCodewords(version2) {
  return CODEWORDS_COUNT[version2];
};
utils$1.getBCHDigit = function(data) {
  let digit = 0;
  while (data !== 0) {
    digit++;
    data >>>= 1;
  }
  return digit;
};
utils$1.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== "function") {
    throw new Error('"toSJISFunc" is not a valid function.');
  }
  toSJISFunction = f;
};
utils$1.isKanjiModeEnabled = function() {
  return typeof toSJISFunction !== "undefined";
};
utils$1.toSJIS = function toSJIS(kanji2) {
  return toSJISFunction(kanji2);
};
var errorCorrectionLevel = {};
(function(exports) {
  exports.L = { bit: 1 };
  exports.M = { bit: 0 };
  exports.Q = { bit: 3 };
  exports.H = { bit: 2 };
  function fromString(string) {
    if (typeof string !== "string") {
      throw new Error("Param is not a string");
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case "l":
      case "low":
        return exports.L;
      case "m":
      case "medium":
        return exports.M;
      case "q":
      case "quartile":
        return exports.Q;
      case "h":
      case "high":
        return exports.H;
      default:
        throw new Error("Unknown EC Level: " + string);
    }
  }
  exports.isValid = function isValid2(level) {
    return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
  };
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
})(errorCorrectionLevel);
function BitBuffer$1() {
  this.buffer = [];
  this.length = 0;
}
BitBuffer$1.prototype = {
  get: function(index) {
    const bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 128 >>> this.length % 8;
    }
    this.length++;
  }
};
var bitBuffer = BitBuffer$1;
function BitMatrix$1(size) {
  if (!size || size < 1) {
    throw new Error("BitMatrix size must be defined and greater than 0");
  }
  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}
BitMatrix$1.prototype.set = function(row, col, value, reserved) {
  const index = row * this.size + col;
  this.data[index] = value;
  if (reserved)
    this.reservedBit[index] = true;
};
BitMatrix$1.prototype.get = function(row, col) {
  return this.data[row * this.size + col];
};
BitMatrix$1.prototype.xor = function(row, col, value) {
  this.data[row * this.size + col] ^= value;
};
BitMatrix$1.prototype.isReserved = function(row, col) {
  return this.reservedBit[row * this.size + col];
};
var bitMatrix = BitMatrix$1;
var alignmentPattern = {};
(function(exports) {
  const getSymbolSize3 = utils$1.getSymbolSize;
  exports.getRowColCoords = function getRowColCoords(version2) {
    if (version2 === 1)
      return [];
    const posCount = Math.floor(version2 / 7) + 2;
    const size = getSymbolSize3(version2);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [size - 7];
    for (let i = 1; i < posCount - 1; i++) {
      positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6);
    return positions.reverse();
  };
  exports.getPositions = function getPositions2(version2) {
    const coords = [];
    const pos = exports.getRowColCoords(version2);
    const posLength = pos.length;
    for (let i = 0; i < posLength; i++) {
      for (let j = 0; j < posLength; j++) {
        if (i === 0 && j === 0 || // top-left
        i === 0 && j === posLength - 1 || // bottom-left
        i === posLength - 1 && j === 0) {
          continue;
        }
        coords.push([pos[i], pos[j]]);
      }
    }
    return coords;
  };
})(alignmentPattern);
var finderPattern = {};
const getSymbolSize2 = utils$1.getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
finderPattern.getPositions = function getPositions(version2) {
  const size = getSymbolSize2(version2);
  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ];
};
var maskPattern = {};
(function(exports) {
  exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  exports.isValid = function isValid2(mask) {
    return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
  };
  exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : void 0;
  };
  exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for (let row = 0; row < size; row++) {
      sameCountCol = sameCountRow = 0;
      lastCol = lastRow = null;
      for (let col = 0; col < size; col++) {
        let module = data.get(row, col);
        if (module === lastCol) {
          sameCountCol++;
        } else {
          if (sameCountCol >= 5)
            points += PenaltyScores.N1 + (sameCountCol - 5);
          lastCol = module;
          sameCountCol = 1;
        }
        module = data.get(col, row);
        if (module === lastRow) {
          sameCountRow++;
        } else {
          if (sameCountRow >= 5)
            points += PenaltyScores.N1 + (sameCountRow - 5);
          lastRow = module;
          sameCountRow = 1;
        }
      }
      if (sameCountCol >= 5)
        points += PenaltyScores.N1 + (sameCountCol - 5);
      if (sameCountRow >= 5)
        points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
  };
  exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for (let row = 0; row < size - 1; row++) {
      for (let col = 0; col < size - 1; col++) {
        const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
        if (last === 4 || last === 0)
          points++;
      }
    }
    return points * PenaltyScores.N2;
  };
  exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for (let row = 0; row < size; row++) {
      bitsCol = bitsRow = 0;
      for (let col = 0; col < size; col++) {
        bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
        if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
          points++;
        bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
        if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
          points++;
      }
    }
    return points * PenaltyScores.N3;
  };
  exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for (let i = 0; i < modulesCount; i++)
      darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
  };
  function getMaskAt(maskPattern2, i, j) {
    switch (maskPattern2) {
      case exports.Patterns.PATTERN000:
        return (i + j) % 2 === 0;
      case exports.Patterns.PATTERN001:
        return i % 2 === 0;
      case exports.Patterns.PATTERN010:
        return j % 3 === 0;
      case exports.Patterns.PATTERN011:
        return (i + j) % 3 === 0;
      case exports.Patterns.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case exports.Patterns.PATTERN101:
        return i * j % 2 + i * j % 3 === 0;
      case exports.Patterns.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 === 0;
      case exports.Patterns.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern2);
    }
  }
  exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (data.isReserved(row, col))
          continue;
        data.xor(row, col, getMaskAt(pattern, row, col));
      }
    }
  };
  exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for (let p = 0; p < numPatterns; p++) {
      setupFormatFunc(p);
      exports.applyMask(p, data);
      const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
      exports.applyMask(p, data);
      if (penalty < lowerPenalty) {
        lowerPenalty = penalty;
        bestPattern = p;
      }
    }
    return bestPattern;
  };
})(maskPattern);
var errorCorrectionCode = {};
const ECLevel$1 = errorCorrectionLevel;
const EC_BLOCKS_TABLE = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
];
const EC_CODEWORDS_TABLE = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
errorCorrectionCode.getBlocksCount = function getBlocksCount(version2, errorCorrectionLevel2) {
  switch (errorCorrectionLevel2) {
    case ECLevel$1.L:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 0];
    case ECLevel$1.M:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 1];
    case ECLevel$1.Q:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 2];
    case ECLevel$1.H:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 3];
    default:
      return void 0;
  }
};
errorCorrectionCode.getTotalCodewordsCount = function getTotalCodewordsCount(version2, errorCorrectionLevel2) {
  switch (errorCorrectionLevel2) {
    case ECLevel$1.L:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 0];
    case ECLevel$1.M:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 1];
    case ECLevel$1.Q:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 2];
    case ECLevel$1.H:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 3];
    default:
      return void 0;
  }
};
var polynomial = {};
var galoisField = {};
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x & 256) {
      x ^= 285;
    }
  }
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();
galoisField.log = function log(n) {
  if (n < 1)
    throw new Error("log(" + n + ")");
  return LOG_TABLE[n];
};
galoisField.exp = function exp(n) {
  return EXP_TABLE[n];
};
galoisField.mul = function mul(x, y) {
  if (x === 0 || y === 0)
    return 0;
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
(function(exports) {
  const GF = galoisField;
  exports.mul = function mul2(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for (let i = 0; i < p1.length; i++) {
      for (let j = 0; j < p2.length; j++) {
        coeff[i + j] ^= GF.mul(p1[i], p2[j]);
      }
    }
    return coeff;
  };
  exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while (result.length - divisor.length >= 0) {
      const coeff = result[0];
      for (let i = 0; i < divisor.length; i++) {
        result[i] ^= GF.mul(divisor[i], coeff);
      }
      let offset = 0;
      while (offset < result.length && result[offset] === 0)
        offset++;
      result = result.slice(offset);
    }
    return result;
  };
  exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([1]);
    for (let i = 0; i < degree; i++) {
      poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
    }
    return poly;
  };
})(polynomial);
const Polynomial = polynomial;
function ReedSolomonEncoder$1(degree) {
  this.genPoly = void 0;
  this.degree = degree;
  if (this.degree)
    this.initialize(this.degree);
}
ReedSolomonEncoder$1.prototype.initialize = function initialize(degree) {
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
ReedSolomonEncoder$1.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error("Encoder not initialized");
  }
  const paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);
  const remainder = Polynomial.mod(paddedData, this.genPoly);
  const start = this.degree - remainder.length;
  if (start > 0) {
    const buff = new Uint8Array(this.degree);
    buff.set(remainder, start);
    return buff;
  }
  return remainder;
};
var reedSolomonEncoder = ReedSolomonEncoder$1;
var version = {};
var mode = {};
var versionCheck = {};
versionCheck.isValid = function isValid(version2) {
  return !isNaN(version2) && version2 >= 1 && version2 <= 40;
};
var regex = {};
const numeric = "[0-9]+";
const alphanumeric = "[A-Z $%*+\\-./:]+";
let kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
kanji = kanji.replace(/u/g, "\\u");
const byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
regex.KANJI = new RegExp(kanji, "g");
regex.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
regex.BYTE = new RegExp(byte, "g");
regex.NUMERIC = new RegExp(numeric, "g");
regex.ALPHANUMERIC = new RegExp(alphanumeric, "g");
const TEST_KANJI = new RegExp("^" + kanji + "$");
const TEST_NUMERIC = new RegExp("^" + numeric + "$");
const TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
regex.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};
regex.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};
regex.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};
(function(exports) {
  const VersionCheck = versionCheck;
  const Regex = regex;
  exports.NUMERIC = {
    id: "Numeric",
    bit: 1 << 0,
    ccBits: [10, 12, 14]
  };
  exports.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 1 << 1,
    ccBits: [9, 11, 13]
  };
  exports.BYTE = {
    id: "Byte",
    bit: 1 << 2,
    ccBits: [8, 16, 16]
  };
  exports.KANJI = {
    id: "Kanji",
    bit: 1 << 3,
    ccBits: [8, 10, 12]
  };
  exports.MIXED = {
    bit: -1
  };
  exports.getCharCountIndicator = function getCharCountIndicator(mode2, version2) {
    if (!mode2.ccBits)
      throw new Error("Invalid mode: " + mode2);
    if (!VersionCheck.isValid(version2)) {
      throw new Error("Invalid version: " + version2);
    }
    if (version2 >= 1 && version2 < 10)
      return mode2.ccBits[0];
    else if (version2 < 27)
      return mode2.ccBits[1];
    return mode2.ccBits[2];
  };
  exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr))
      return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr))
      return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr))
      return exports.KANJI;
    else
      return exports.BYTE;
  };
  exports.toString = function toString(mode2) {
    if (mode2 && mode2.id)
      return mode2.id;
    throw new Error("Invalid mode");
  };
  exports.isValid = function isValid2(mode2) {
    return mode2 && mode2.bit && mode2.ccBits;
  };
  function fromString(string) {
    if (typeof string !== "string") {
      throw new Error("Param is not a string");
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case "numeric":
        return exports.NUMERIC;
      case "alphanumeric":
        return exports.ALPHANUMERIC;
      case "kanji":
        return exports.KANJI;
      case "byte":
        return exports.BYTE;
      default:
        throw new Error("Unknown mode: " + string);
    }
  }
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
})(mode);
(function(exports) {
  const Utils2 = utils$1;
  const ECCode2 = errorCorrectionCode;
  const ECLevel2 = errorCorrectionLevel;
  const Mode2 = mode;
  const VersionCheck = versionCheck;
  const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
  const G18_BCH = Utils2.getBCHDigit(G18);
  function getBestVersionForDataLength(mode2, length, errorCorrectionLevel2) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel2, mode2)) {
        return currentVersion;
      }
    }
    return void 0;
  }
  function getReservedBitsCount(mode2, version2) {
    return Mode2.getCharCountIndicator(mode2, version2) + 4;
  }
  function getTotalBitsFromDataArray(segments2, version2) {
    let totalBits = 0;
    segments2.forEach(function(data) {
      const reservedBits = getReservedBitsCount(data.mode, version2);
      totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
  }
  function getBestVersionForMixedData(segments2, errorCorrectionLevel2) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      const length = getTotalBitsFromDataArray(segments2, currentVersion);
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel2, Mode2.MIXED)) {
        return currentVersion;
      }
    }
    return void 0;
  }
  exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
      return parseInt(value, 10);
    }
    return defaultValue;
  };
  exports.getCapacity = function getCapacity(version2, errorCorrectionLevel2, mode2) {
    if (!VersionCheck.isValid(version2)) {
      throw new Error("Invalid QR Code version");
    }
    if (typeof mode2 === "undefined")
      mode2 = Mode2.BYTE;
    const totalCodewords = Utils2.getSymbolTotalCodewords(version2);
    const ecTotalCodewords = ECCode2.getTotalCodewordsCount(version2, errorCorrectionLevel2);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode2 === Mode2.MIXED)
      return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode2, version2);
    switch (mode2) {
      case Mode2.NUMERIC:
        return Math.floor(usableBits / 10 * 3);
      case Mode2.ALPHANUMERIC:
        return Math.floor(usableBits / 11 * 2);
      case Mode2.KANJI:
        return Math.floor(usableBits / 13);
      case Mode2.BYTE:
      default:
        return Math.floor(usableBits / 8);
    }
  };
  exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel2) {
    let seg;
    const ecl = ECLevel2.from(errorCorrectionLevel2, ECLevel2.M);
    if (Array.isArray(data)) {
      if (data.length > 1) {
        return getBestVersionForMixedData(data, ecl);
      }
      if (data.length === 0) {
        return 1;
      }
      seg = data[0];
    } else {
      seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
  };
  exports.getEncodedBits = function getEncodedBits2(version2) {
    if (!VersionCheck.isValid(version2) || version2 < 7) {
      throw new Error("Invalid QR Code version");
    }
    let d = version2 << 12;
    while (Utils2.getBCHDigit(d) - G18_BCH >= 0) {
      d ^= G18 << Utils2.getBCHDigit(d) - G18_BCH;
    }
    return version2 << 12 | d;
  };
})(version);
var formatInfo = {};
const Utils$3 = utils$1;
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils$3.getBCHDigit(G15);
formatInfo.getEncodedBits = function getEncodedBits(errorCorrectionLevel2, mask) {
  const data = errorCorrectionLevel2.bit << 3 | mask;
  let d = data << 10;
  while (Utils$3.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils$3.getBCHDigit(d) - G15_BCH;
  }
  return (data << 10 | d) ^ G15_MASK;
};
var segments = {};
const Mode$4 = mode;
function NumericData(data) {
  this.mode = Mode$4.NUMERIC;
  this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength2() {
  return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer2) {
  let i, group, value;
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer2.put(value, 10);
  }
  const remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer2.put(value, remainingNum * 3 + 1);
  }
};
var numericData = NumericData;
const Mode$3 = mode;
const ALPHA_NUM_CHARS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function AlphanumericData(data) {
  this.mode = Mode$3.ALPHANUMERIC;
  this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength3(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength2() {
  return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength4() {
  return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write2(bitBuffer2) {
  let i;
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
    bitBuffer2.put(value, 11);
  }
  if (this.data.length % 2) {
    bitBuffer2.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};
var alphanumericData = AlphanumericData;
const Mode$2 = mode;
function ByteData(data) {
  this.mode = Mode$2.BYTE;
  if (typeof data === "string") {
    this.data = new TextEncoder().encode(data);
  } else {
    this.data = new Uint8Array(data);
  }
}
ByteData.getBitsLength = function getBitsLength5(length) {
  return length * 8;
};
ByteData.prototype.getLength = function getLength3() {
  return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength6() {
  return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer2) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer2.put(this.data[i], 8);
  }
};
var byteData = ByteData;
const Mode$1 = mode;
const Utils$2 = utils$1;
function KanjiData(data) {
  this.mode = Mode$1.KANJI;
  this.data = data;
}
KanjiData.getBitsLength = function getBitsLength7(length) {
  return length * 13;
};
KanjiData.prototype.getLength = function getLength4() {
  return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength8() {
  return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer2) {
  let i;
  for (i = 0; i < this.data.length; i++) {
    let value = Utils$2.toSJIS(this.data[i]);
    if (value >= 33088 && value <= 40956) {
      value -= 33088;
    } else if (value >= 57408 && value <= 60351) {
      value -= 49472;
    } else {
      throw new Error(
        "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
      );
    }
    value = (value >>> 8 & 255) * 192 + (value & 255);
    bitBuffer2.put(value, 13);
  }
};
var kanjiData = KanjiData;
var dijkstra = { exports: {} };
(function(module) {
  var dijkstra2 = {
    single_source_shortest_paths: function(graph, s, d) {
      var predecessors = {};
      var costs = {};
      costs[s] = 0;
      var open2 = dijkstra2.PriorityQueue.make();
      open2.push(s, 0);
      var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
      while (!open2.empty()) {
        closest = open2.pop();
        u = closest.value;
        cost_of_s_to_u = closest.cost;
        adjacent_nodes = graph[u] || {};
        for (v in adjacent_nodes) {
          if (adjacent_nodes.hasOwnProperty(v)) {
            cost_of_e = adjacent_nodes[v];
            cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
            cost_of_s_to_v = costs[v];
            first_visit = typeof costs[v] === "undefined";
            if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
              costs[v] = cost_of_s_to_u_plus_cost_of_e;
              open2.push(v, cost_of_s_to_u_plus_cost_of_e);
              predecessors[v] = u;
            }
          }
        }
      }
      if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
        var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
        throw new Error(msg);
      }
      return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
      var nodes = [];
      var u = d;
      while (u) {
        nodes.push(u);
        predecessors[u];
        u = predecessors[u];
      }
      nodes.reverse();
      return nodes;
    },
    find_path: function(graph, s, d) {
      var predecessors = dijkstra2.single_source_shortest_paths(graph, s, d);
      return dijkstra2.extract_shortest_path_from_predecessor_list(
        predecessors,
        d
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(opts) {
        var T = dijkstra2.PriorityQueue, t2 = {}, key;
        opts = opts || {};
        for (key in T) {
          if (T.hasOwnProperty(key)) {
            t2[key] = T[key];
          }
        }
        t2.queue = [];
        t2.sorter = opts.sorter || T.default_sorter;
        return t2;
      },
      default_sorter: function(a, b) {
        return a.cost - b.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(value, cost) {
        var item = { value, cost };
        this.queue.push(item);
        this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  {
    module.exports = dijkstra2;
  }
})(dijkstra);
var dijkstraExports = dijkstra.exports;
(function(exports) {
  const Mode2 = mode;
  const NumericData2 = numericData;
  const AlphanumericData2 = alphanumericData;
  const ByteData2 = byteData;
  const KanjiData2 = kanjiData;
  const Regex = regex;
  const Utils2 = utils$1;
  const dijkstra2 = dijkstraExports;
  function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
  }
  function getSegments(regex2, mode2, str) {
    const segments2 = [];
    let result;
    while ((result = regex2.exec(str)) !== null) {
      segments2.push({
        data: result[0],
        index: result.index,
        mode: mode2,
        length: result[0].length
      });
    }
    return segments2;
  }
  function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode2.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode2.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils2.isKanjiModeEnabled()) {
      byteSegs = getSegments(Regex.BYTE, Mode2.BYTE, dataStr);
      kanjiSegs = getSegments(Regex.KANJI, Mode2.KANJI, dataStr);
    } else {
      byteSegs = getSegments(Regex.BYTE_KANJI, Mode2.BYTE, dataStr);
      kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
      return s1.index - s2.index;
    }).map(function(obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      };
    });
  }
  function getSegmentBitsLength(length, mode2) {
    switch (mode2) {
      case Mode2.NUMERIC:
        return NumericData2.getBitsLength(length);
      case Mode2.ALPHANUMERIC:
        return AlphanumericData2.getBitsLength(length);
      case Mode2.KANJI:
        return KanjiData2.getBitsLength(length);
      case Mode2.BYTE:
        return ByteData2.getBitsLength(length);
    }
  }
  function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
      const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
      if (prevSeg && prevSeg.mode === curr.mode) {
        acc[acc.length - 1].data += curr.data;
        return acc;
      }
      acc.push(curr);
      return acc;
    }, []);
  }
  function buildNodes(segs) {
    const nodes = [];
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      switch (seg.mode) {
        case Mode2.NUMERIC:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.ALPHANUMERIC, length: seg.length },
            { data: seg.data, mode: Mode2.BYTE, length: seg.length }
          ]);
          break;
        case Mode2.ALPHANUMERIC:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.BYTE, length: seg.length }
          ]);
          break;
        case Mode2.KANJI:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.BYTE, length: getStringByteLength(seg.data) }
          ]);
          break;
        case Mode2.BYTE:
          nodes.push([
            { data: seg.data, mode: Mode2.BYTE, length: getStringByteLength(seg.data) }
          ]);
      }
    }
    return nodes;
  }
  function buildGraph(nodes, version2) {
    const table = {};
    const graph = { start: {} };
    let prevNodeIds = ["start"];
    for (let i = 0; i < nodes.length; i++) {
      const nodeGroup = nodes[i];
      const currentNodeIds = [];
      for (let j = 0; j < nodeGroup.length; j++) {
        const node = nodeGroup[j];
        const key = "" + i + j;
        currentNodeIds.push(key);
        table[key] = { node, lastCount: 0 };
        graph[key] = {};
        for (let n = 0; n < prevNodeIds.length; n++) {
          const prevNodeId = prevNodeIds[n];
          if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
            graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
            table[prevNodeId].lastCount += node.length;
          } else {
            if (table[prevNodeId])
              table[prevNodeId].lastCount = node.length;
            graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode2.getCharCountIndicator(node.mode, version2);
          }
        }
      }
      prevNodeIds = currentNodeIds;
    }
    for (let n = 0; n < prevNodeIds.length; n++) {
      graph[prevNodeIds[n]].end = 0;
    }
    return { map: graph, table };
  }
  function buildSingleSegment(data, modesHint) {
    let mode2;
    const bestMode = Mode2.getBestModeForData(data);
    mode2 = Mode2.from(modesHint, bestMode);
    if (mode2 !== Mode2.BYTE && mode2.bit < bestMode.bit) {
      throw new Error('"' + data + '" cannot be encoded with mode ' + Mode2.toString(mode2) + ".\n Suggested mode is: " + Mode2.toString(bestMode));
    }
    if (mode2 === Mode2.KANJI && !Utils2.isKanjiModeEnabled()) {
      mode2 = Mode2.BYTE;
    }
    switch (mode2) {
      case Mode2.NUMERIC:
        return new NumericData2(data);
      case Mode2.ALPHANUMERIC:
        return new AlphanumericData2(data);
      case Mode2.KANJI:
        return new KanjiData2(data);
      case Mode2.BYTE:
        return new ByteData2(data);
    }
  }
  exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
      if (typeof seg === "string") {
        acc.push(buildSingleSegment(seg, null));
      } else if (seg.data) {
        acc.push(buildSingleSegment(seg.data, seg.mode));
      }
      return acc;
    }, []);
  };
  exports.fromString = function fromString(data, version2) {
    const segs = getSegmentsFromString(data, Utils2.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version2);
    const path = dijkstra2.find_path(graph.map, "start", "end");
    const optimizedSegs = [];
    for (let i = 1; i < path.length - 1; i++) {
      optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
  };
  exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(
      getSegmentsFromString(data, Utils2.isKanjiModeEnabled())
    );
  };
})(segments);
const Utils$1 = utils$1;
const ECLevel = errorCorrectionLevel;
const BitBuffer = bitBuffer;
const BitMatrix = bitMatrix;
const AlignmentPattern = alignmentPattern;
const FinderPattern = finderPattern;
const MaskPattern = maskPattern;
const ECCode = errorCorrectionCode;
const ReedSolomonEncoder = reedSolomonEncoder;
const Version = version;
const FormatInfo = formatInfo;
const Mode = mode;
const Segments = segments;
function setupFinderPattern(matrix, version2) {
  const size = matrix.size;
  const pos = FinderPattern.getPositions(version2);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r)
        continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c)
          continue;
        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
function setupTimingPattern(matrix) {
  const size = matrix.size;
  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}
function setupAlignmentPattern(matrix, version2) {
  const pos = AlignmentPattern.getPositions(version2);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
function setupVersionInfo(matrix, version2) {
  const size = matrix.size;
  const bits = Version.getEncodedBits(version2);
  let row, col, mod;
  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}
function setupFormatInfo(matrix, errorCorrectionLevel2, maskPattern2) {
  const size = matrix.size;
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel2, maskPattern2);
  let i, mod;
  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1;
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }
  matrix.set(size - 8, 8, 1, true);
}
function setupData(matrix, data) {
  const size = matrix.size;
  let inc = -1;
  let row = size - 1;
  let bitIndex = 7;
  let byteIndex = 0;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6)
      col--;
    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false;
          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }
          matrix.set(row, col - c, dark);
          bitIndex--;
          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}
function createData(version2, errorCorrectionLevel2, segments2) {
  const buffer = new BitBuffer();
  segments2.forEach(function(data) {
    buffer.put(data.mode.bit, 4);
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version2));
    data.write(buffer);
  });
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version2);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel2);
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 17 : 236, 8);
  }
  return createCodewords(buffer, version2, errorCorrectionLevel2);
}
function createCodewords(bitBuffer2, version2, errorCorrectionLevel2) {
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version2);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel2);
  const dataTotalCodewords = totalCodewords - ecTotalCodewords;
  const ecTotalBlocks = ECCode.getBlocksCount(version2, errorCorrectionLevel2);
  const blocksInGroup2 = totalCodewords % ecTotalBlocks;
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
  const rs = new ReedSolomonEncoder(ecCount);
  let offset = 0;
  const dcData = new Array(ecTotalBlocks);
  const ecData = new Array(ecTotalBlocks);
  let maxDataSize = 0;
  const buffer = new Uint8Array(bitBuffer2.buffer);
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
    dcData[b] = buffer.slice(offset, offset + dataSize);
    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }
  const data = new Uint8Array(totalCodewords);
  let index = 0;
  let i, r;
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }
  return data;
}
function createSymbol(data, version2, errorCorrectionLevel2, maskPattern2) {
  let segments2;
  if (Array.isArray(data)) {
    segments2 = Segments.fromArray(data);
  } else if (typeof data === "string") {
    let estimatedVersion = version2;
    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data);
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel2);
    }
    segments2 = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error("Invalid data");
  }
  const bestVersion = Version.getBestVersionForData(segments2, errorCorrectionLevel2);
  if (!bestVersion) {
    throw new Error("The amount of data is too big to be stored in a QR Code");
  }
  if (!version2) {
    version2 = bestVersion;
  } else if (version2 < bestVersion) {
    throw new Error(
      "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
    );
  }
  const dataBits = createData(version2, errorCorrectionLevel2, segments2);
  const moduleCount = Utils$1.getSymbolSize(version2);
  const modules = new BitMatrix(moduleCount);
  setupFinderPattern(modules, version2);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version2);
  setupFormatInfo(modules, errorCorrectionLevel2, 0);
  if (version2 >= 7) {
    setupVersionInfo(modules, version2);
  }
  setupData(modules, dataBits);
  if (isNaN(maskPattern2)) {
    maskPattern2 = MaskPattern.getBestMask(
      modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel2)
    );
  }
  MaskPattern.applyMask(maskPattern2, modules);
  setupFormatInfo(modules, errorCorrectionLevel2, maskPattern2);
  return {
    modules,
    version: version2,
    errorCorrectionLevel: errorCorrectionLevel2,
    maskPattern: maskPattern2,
    segments: segments2
  };
}
qrcode.create = function create(data, options) {
  if (typeof data === "undefined" || data === "") {
    throw new Error("No input text");
  }
  let errorCorrectionLevel2 = ECLevel.M;
  let version2;
  let mask;
  if (typeof options !== "undefined") {
    errorCorrectionLevel2 = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version2 = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);
    if (options.toSJISFunc) {
      Utils$1.setToSJISFunction(options.toSJISFunc);
    }
  }
  return createSymbol(data, version2, errorCorrectionLevel2, mask);
};
var canvas = {};
var utils = {};
(function(exports) {
  function hex2rgba(hex) {
    if (typeof hex === "number") {
      hex = hex.toString();
    }
    if (typeof hex !== "string") {
      throw new Error("Color should be defined as hex string");
    }
    let hexCode = hex.slice().replace("#", "").split("");
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
      throw new Error("Invalid hex color: " + hex);
    }
    if (hexCode.length === 3 || hexCode.length === 4) {
      hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
        return [c, c];
      }));
    }
    if (hexCode.length === 6)
      hexCode.push("F", "F");
    const hexValue = parseInt(hexCode.join(""), 16);
    return {
      r: hexValue >> 24 & 255,
      g: hexValue >> 16 & 255,
      b: hexValue >> 8 & 255,
      a: hexValue & 255,
      hex: "#" + hexCode.slice(0, 6).join("")
    };
  }
  exports.getOptions = function getOptions(options) {
    if (!options)
      options = {};
    if (!options.color)
      options.color = {};
    const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : void 0;
    const scale = options.scale || 4;
    return {
      width,
      scale: width ? 4 : scale,
      margin,
      color: {
        dark: hex2rgba(options.color.dark || "#000000ff"),
        light: hex2rgba(options.color.light || "#ffffffff")
      },
      type: options.type,
      rendererOpts: options.rendererOpts || {}
    };
  };
  exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
  };
  exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
  };
  exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [opts.color.light, opts.color.dark];
    for (let i = 0; i < symbolSize; i++) {
      for (let j = 0; j < symbolSize; j++) {
        let posDst = (i * symbolSize + j) * 4;
        let pxColor = opts.color.light;
        if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
          const iSrc = Math.floor((i - scaledMargin) / scale);
          const jSrc = Math.floor((j - scaledMargin) / scale);
          pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
        }
        imgData[posDst++] = pxColor.r;
        imgData[posDst++] = pxColor.g;
        imgData[posDst++] = pxColor.b;
        imgData[posDst] = pxColor.a;
      }
    }
  };
})(utils);
(function(exports) {
  const Utils2 = utils;
  function clearCanvas(ctx, canvas2, size) {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    if (!canvas2.style)
      canvas2.style = {};
    canvas2.height = size;
    canvas2.width = size;
    canvas2.style.height = size + "px";
    canvas2.style.width = size + "px";
  }
  function getCanvasElement() {
    try {
      return document.createElement("canvas");
    } catch (e) {
      throw new Error("You need to specify a canvas element");
    }
  }
  exports.render = function render2(qrData, canvas2, options) {
    let opts = options;
    let canvasEl = canvas2;
    if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
      opts = canvas2;
      canvas2 = void 0;
    }
    if (!canvas2) {
      canvasEl = getCanvasElement();
    }
    opts = Utils2.getOptions(opts);
    const size = Utils2.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext("2d");
    const image = ctx.createImageData(size, size);
    Utils2.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
  };
  exports.renderToDataURL = function renderToDataURL(qrData, canvas2, options) {
    let opts = options;
    if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
      opts = canvas2;
      canvas2 = void 0;
    }
    if (!opts)
      opts = {};
    const canvasEl = exports.render(qrData, canvas2, opts);
    const type = opts.type || "image/png";
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
  };
})(canvas);
var svgTag = {};
const Utils = utils;
function getColorAttrib(color, attrib) {
  const alpha = color.a / 255;
  const str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== "undefined")
    str += " " + y;
  return str;
}
function qrToPath(data, size, margin) {
  let path = "";
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;
  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);
    if (!col && !newRow)
      newRow = true;
    if (data[i]) {
      lineLength++;
      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
        moveBy = 0;
        newRow = false;
      }
      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd("h", lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }
  return path;
}
svgTag.render = function render(qrData, options, cb) {
  const opts = Utils.getOptions(options);
  const size = qrData.modules.size;
  const data = qrData.modules.data;
  const qrcodesize = size + opts.margin * 2;
  const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
  const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
  const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
  const svgTag2 = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
  if (typeof cb === "function") {
    cb(null, svgTag2);
  }
  return svgTag2;
};
const canPromise = canPromise$1;
const QRCode = qrcode;
const CanvasRenderer = canvas;
const SvgRenderer = svgTag;
function renderCanvas(renderFunc, canvas2, text, opts, cb) {
  const args = [].slice.call(arguments, 1);
  const argsNum = args.length;
  const isLastArgCb = typeof args[argsNum - 1] === "function";
  if (!isLastArgCb && !canPromise()) {
    throw new Error("Callback required as last argument");
  }
  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error("Too few arguments provided");
    }
    if (argsNum === 2) {
      cb = text;
      text = canvas2;
      canvas2 = opts = void 0;
    } else if (argsNum === 3) {
      if (canvas2.getContext && typeof cb === "undefined") {
        cb = opts;
        opts = void 0;
      } else {
        cb = opts;
        opts = text;
        text = canvas2;
        canvas2 = void 0;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error("Too few arguments provided");
    }
    if (argsNum === 1) {
      text = canvas2;
      canvas2 = opts = void 0;
    } else if (argsNum === 2 && !canvas2.getContext) {
      opts = text;
      text = canvas2;
      canvas2 = void 0;
    }
    return new Promise(function(resolve, reject) {
      try {
        const data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas2, opts));
      } catch (e) {
        reject(e);
      }
    });
  }
  try {
    const data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas2, opts));
  } catch (e) {
    cb(e);
  }
}
browser.create = QRCode.create;
browser.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
browser.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
browser.toString = renderCanvas.bind(null, function(data, _, opts) {
  return SvgRenderer.render(data, opts);
});
class ExportLib {
  //--- Send asynchronous POST request to FaustWeb to compile a faust DSP
  // @exportUrl : url of FaustWeb service to target
  // @name : name of DSP to compile
  // @source_code : Faust code to compile
  // @callback : function called once request succeeded
  // 				- @param : the sha key corresponding to source_code
  static getSHAKey(exportUrl, name, source_code, callback, errCallback) {
    var filename = name + ".dsp";
    var file = new File([source_code], filename);
    var newRequest = new XMLHttpRequest();
    var params = new FormData();
    params.append("file", file);
    var urlToTarget = exportUrl + "/filepost";
    newRequest.open("POST", urlToTarget, true);
    newRequest.onreadystatechange = function() {
      if (newRequest.readyState == 4 && newRequest.status == 200)
        callback(newRequest.responseText);
      else if (newRequest.readyState == 4 && newRequest.status == 400)
        errCallback(newRequest.responseText);
    };
    newRequest.send(params);
  }
  //--- Send asynchronous GET request to precompile target
  // @exportUrl : url of FaustWeb service to target
  // @sha : sha key of DSP to precompile
  // @platform/architecture : platform/architecture to precompile
  // @callback : function called once request succeeded
  // 				- @param : the sha key
  sendPrecompileRequest(exportUrl, sha, platforme, architecture, appType, callback) {
    var getrequest = new XMLHttpRequest();
    getrequest.onreadystatechange = function() {
      if (getrequest.readyState == 4) {
        callback(exportUrl, sha, platforme, architecture, appType);
      }
    };
    var compileUrl = exportUrl + "/" + sha + "/" + platforme + "/" + architecture + "/precompile";
    getrequest.open("GET", compileUrl, true);
    getrequest.send(null);
  }
  //--- Transform target
  // WARNING = THIS FUNCTION REQUIRES QRCODE.JS TO BE INCLUDED IN YOUR HTML FILE
  // @exportUrl : url of FaustWeb service to target
  // @sha : sha key of DSP
  // @platform/architecture/target : platform/architecture/target compiled
  // @cote : width and height of the returned QrCode
  static async getQrCode(url, sha, plateform, architecture, target, size) {
    var downloadString = url + "/" + sha + "/" + plateform + "/" + architecture + "/" + target;
    var whiteContainer = document.createElement("div");
    whiteContainer.style.cssText = "width:" + size.toString() + "px; height:" + size.toString() + "px; background-color:white; position:relative; margin-left:auto; margin-right:auto; padding:3px;";
    whiteContainer.title = downloadString;
    var qq = document.createElement("img");
    qq.width = qq.height = size;
    qq.style.cssText = "display: block";
    qq.alt = "Scan me!";
    qq.src = await browser.toDataURL(downloadString, { errorCorrectionLevel: "H" });
    whiteContainer.appendChild(qq);
    return whiteContainer;
  }
  // Return the array of available platforms from the json description
  getPlatforms(json) {
    var platforms = [];
    var data = JSON.parse(json);
    var index = 0;
    for (var p in data) {
      platforms[index] = p;
      index++;
    }
    return platforms;
  }
  // Return the list of available architectures for a specific platform from the json description
  getArchitectures(json, platform) {
    var data = JSON.parse(json);
    return data[platform];
  }
}
class SceneView {
  initNormalScene(scene) {
    var container = document.createElement("div");
    container.id = "Normal";
    var svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgCanvas.id = "svgCanvas";
    container.appendChild(svgCanvas);
    var head = document.createElement("header");
    head.id = "header";
    container.appendChild(head);
    var uploadDiv = document.createElement("div");
    uploadDiv.id = "upload";
    uploadDiv.className = "uploading";
    head.appendChild(uploadDiv);
    var inputOutputModuleContainer = document.createElement("div");
    inputOutputModuleContainer.id = "inputOutputModuleContainer";
    container.appendChild(inputOutputModuleContainer);
    this.inputOutputModuleContainer = inputOutputModuleContainer;
    var moduleContainer = document.createElement("section");
    moduleContainer.id = "modules";
    moduleContainer.className = "container";
    container.appendChild(moduleContainer);
    var linkWilson = document.createElement("div");
    linkWilson.id = "ChrisLine";
    linkWilson.className = "link";
    linkWilson.textContent = Utilitary.messageResource.reference;
    container.appendChild(linkWilson);
    var alink = document.createElement("a");
    alink.href = "https://github.com/cwilso/WebAudio";
    alink.textContent = Utilitary.messageResource.chrisWilson;
    linkWilson.appendChild(alink);
    var srcDiv = document.createElement("div");
    srcDiv.id = "input";
    srcDiv.className = "source";
    container.appendChild(srcDiv);
    var imageDiv = document.createElement("div");
    imageDiv.id = "logoDiv";
    srcDiv.appendChild(imageDiv);
    var imageLogo = document.createElement("img");
    imageLogo.className = "logoGrame";
    imageLogo.src = "img/grame.png";
    imageDiv.appendChild(imageLogo);
    var dropElementScene = document.createElement("div");
    dropElementScene.className = "dropElementGraph";
    dropElementScene.style.display = "none";
    this.dropElementScene = dropElementScene;
    var dropElementText = document.createElement("div");
    dropElementText.textContent = Utilitary.messageResource.drop;
    dropElementText.className = "dropElementText";
    dropElementScene.appendChild(dropElementText);
    container.appendChild(dropElementScene);
    this.fSceneContainer = container;
  }
}
class Scene {
  constructor(identifiant, compileFaust, sceneView) {
    this.arrayRecalScene = [];
    this.arrayRecalledModule = [];
    this.isMute = false;
    this.fModuleList = [];
    this.sceneName = "Patch";
    this.isInitLoading = true;
    this.isOutputTouch = false;
    this.compileFaust = compileFaust;
    this.sceneView = new SceneView();
    this.sceneView.initNormalScene(this);
    this.integrateSceneInBody();
    this.integrateOutput();
    document.addEventListener("unstylenode", () => {
      this.unstyleNode();
    });
  }
  getSceneContainer() {
    return this.sceneView.fSceneContainer;
  }
  /*********************** MUTE/UNMUTE SCENE ***************************/
  muteScene() {
    var out = document.getElementById("audioOutput");
    if (out !== null) {
      let context = out.audioNode.context;
      if (context != void 0) {
        context.suspend();
        this.isMute = true;
        this.getAudioOutput().moduleView.fInterfaceContainer.style.backgroundImage = "url(img/ico-speaker-mute.png)";
      }
    }
  }
  unmuteScene() {
    console.log("timeIn");
    window.setTimeout(() => {
      this.delayedUnmuteScene();
    }, 500);
  }
  delayedUnmuteScene() {
    console.log("timeout");
    var out = document.getElementById("audioOutput");
    if (out !== null) {
      var context = out.audioNode.context;
      if (context.resume !== void 0) {
        context.resume();
        this.isMute = false;
        this.getAudioOutput().moduleView.fInterfaceContainer.style.backgroundImage = "url(img/ico-speaker.png)";
      }
    }
  }
  //add listner on the output module to give the user the possibility to mute/onmute the scene
  addMuteOutputListner(moduleOutput) {
    moduleOutput.moduleView.fModuleContainer.ontouchstart = () => {
      this.dbleTouchOutput();
    };
    moduleOutput.moduleView.fModuleContainer.ondblclick = () => {
      this.dispatchEventMuteUnmute();
    };
  }
  //custom doubl touch event to mute
  dbleTouchOutput() {
    if (!this.isOutputTouch) {
      this.isOutputTouch = true;
      window.setTimeout(() => {
        this.isOutputTouch = false;
      }, 300);
    } else {
      this.dispatchEventMuteUnmute();
      this.isOutputTouch = false;
    }
  }
  dispatchEventMuteUnmute() {
    if (!this.isMute) {
      this.muteScene();
    } else {
      this.unmuteScene();
    }
  }
  /******************** HANDLE MODULES IN SCENE ************************/
  getModules() {
    return this.fModuleList;
  }
  addModule(module) {
    this.fModuleList.push(module);
  }
  removeModule(module) {
    this.fModuleList.splice(this.fModuleList.indexOf(module), 1);
  }
  /*******************************  PUBLIC METHODS  **********************************/
  integrateSceneInBody() {
    document.body.appendChild(this.sceneView.fSceneContainer);
  }
  /*************** ACTIONS ON AUDIO IN/OUTPUT ***************************/
  integrateInput() {
    var positionInput = this.positionInputModule();
    this.fAudioInput = new ModuleClass(Utilitary.idX++, positionInput.x, positionInput.y, "input", this.sceneView.inputOutputModuleContainer, (module) => {
      this.removeModule(module);
    }, this.compileFaust);
    this.fAudioInput.patchID = "input";
    var scene = this;
    this.compileFaust({ name: "input", sourceCode: "process=_,_;", x: positionInput.x, y: positionInput.y, callback: (factory) => {
      scene.integrateAudioInput(factory);
    } });
  }
  integrateOutput() {
    var positionOutput = this.positionOutputModule();
    var scene = this;
    this.fAudioOutput = new ModuleClass(Utilitary.idX++, positionOutput.x, positionOutput.y, "output", this.sceneView.inputOutputModuleContainer, (module) => {
      this.removeModule(module);
    }, this.compileFaust);
    this.fAudioOutput.patchID = "output";
    this.addMuteOutputListner(this.fAudioOutput);
    this.compileFaust({ name: "output", sourceCode: "process=_,_;", x: positionOutput.x, y: positionOutput.y, callback: (factory) => {
      scene.integrateAudioOutput(factory);
    } });
  }
  integrateAudioOutput(factory) {
    if (this.fAudioOutput) {
      this.fAudioOutput.moduleFaust.setSource("process=_,_;");
      var moduleFaust = this;
      this.fAudioOutput.createDSP(factory, function() {
        moduleFaust.activateAudioOutput(moduleFaust.fAudioOutput);
        moduleFaust.fAudioOutput.addInputOutputNodes();
        moduleFaust.integrateInput();
      });
    }
  }
  integrateAudioInput(factory) {
    if (this.fAudioInput) {
      this.fAudioInput.moduleFaust.setSource("process=_,_;");
      var moduleFaust = this;
      this.fAudioInput.createDSP(factory, function() {
        moduleFaust.activateAudioInput();
        moduleFaust.fAudioInput.addInputOutputNodes();
        Utilitary.hideFullPageLoading();
        moduleFaust.isInitLoading = false;
      });
    }
  }
  getAudioOutput() {
    return this.fAudioOutput;
  }
  getAudioInput() {
    return this.fAudioInput;
  }
  /********************************************************************
  **********************  ACTIVATE PHYSICAL IN/OUTPUT *****************
  ********************************************************************/
  activateAudioInput() {
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false } }).then(
      (mediaStream) => {
        this.getDevice(mediaStream);
        console.log("audio track has settings:", mediaStream.getAudioTracks()[0].getSettings());
      }
    ).catch(
      (err) => {
        console.error(err);
        this.fAudioInput.moduleView.fInterfaceContainer.style.backgroundImage = "url(img/ico-micro-mute.png)";
        this.fAudioInput.moduleView.fInterfaceContainer.title = Utilitary.messageResource.errorGettingAudioInput;
        new Message(Utilitary.messageResource.errorGettingAudioInput);
      }
    );
  }
  getDevice(device) {
    var src = document.getElementById("input");
    src.audioNode = Utilitary.audioContext.createMediaStreamSource(device);
    document.body.appendChild(src);
    var connect = new Connector();
    connect.connectInput(this.fAudioInput, src);
  }
  activateAudioOutput(sceneOutput) {
    var out = document.createElement("div");
    out.id = "audioOutput";
    out.audioNode = Utilitary.audioContext.destination;
    document.body.appendChild(out);
    var connect = new Connector();
    connect.connectOutput(sceneOutput, out);
  }
  /*********************** SAVE/RECALL SCENE ***************************/
  // use a collection of JsonSaveModule describing the scene and the modules to save it in a json string
  // isPrecompiled is used to save or not the asm.js code
  saveScene(isPrecompiled) {
    for (var i = 0; i < this.fModuleList.length; i++) {
      if (this.fModuleList[i].patchID != "output" && this.fModuleList[i].patchID != "input") {
        this.fModuleList[i].patchID = String(i + 1);
      }
    }
    var json;
    var jsonObjectCollection = {};
    for (var i = 0; i < this.fModuleList.length; i++) {
      if (this.fModuleList[i].patchID != "output" && this.fModuleList[i].patchID != "input") {
        jsonObjectCollection[this.fModuleList[i].patchID.toString()] = new JsonSaveModule();
        var jsonObject = jsonObjectCollection[this.fModuleList[i].patchID.toString()];
        jsonObject.sceneName = this.sceneName;
        jsonObject.patchId = this.fModuleList[i].patchID.toString();
        jsonObject.code = this.fModuleList[i].moduleFaust.getSource();
        jsonObject.name = this.fModuleList[i].moduleFaust.getName();
        jsonObject.x = this.fModuleList[i].moduleView.getModuleContainer().getBoundingClientRect().left.toString();
        jsonObject.y = this.fModuleList[i].moduleView.getModuleContainer().getBoundingClientRect().top.toString();
        var inputs = this.fModuleList[i].moduleFaust.getInputConnections();
        var jsonInputs = new JsonInputsSave();
        jsonInputs.source = [];
        if (inputs) {
          for (var j = 0; j < inputs.length; j++) {
            jsonInputs.source.push(inputs[j].source.patchID.toString());
          }
        }
        var outputs = this.fModuleList[i].moduleFaust.getOutputConnections();
        var jsonOutputs = new JsonOutputsSave();
        jsonOutputs.destination = [];
        if (outputs) {
          for (var j = 0; j < outputs.length; j++) {
            jsonOutputs.destination.push(outputs[j].destination.patchID.toString());
          }
        }
        var params = this.fModuleList[i].moduleFaust.getDSP().getParams();
        var jsonParams = new JsonParamsSave();
        jsonParams.sliders = [];
        if (params) {
          for (var j = 0; j < params.length; j++) {
            var jsonSlider = new JsonSliderSave();
            jsonSlider.path = params[j];
            jsonSlider.value = this.fModuleList[i].moduleFaust.getDSP().getParamValue(params[j]).toString();
            jsonParams.sliders.push(jsonSlider);
          }
        }
        var faustIControler = this.fModuleList[i].moduleControles;
        var jsonAccs = new JsonAccSaves();
        jsonAccs.controles = [];
        for (var j = 0; j < faustIControler.length; j++) {
          var jsonAcc = new JsonAccSave();
          var acc = faustIControler[j].accelerometerSlider;
          jsonAcc.axis = acc.axis.toString();
          jsonAcc.curve = acc.curve.toString();
          jsonAcc.amin = acc.amin.toString();
          jsonAcc.amid = acc.amid.toString();
          jsonAcc.amax = acc.amax.toString();
          jsonAcc.adress = acc.address;
          jsonAcc.isEnabled = acc.isEnabled;
          jsonAccs.controles.push(jsonAcc);
        }
        jsonObject.inputs = jsonInputs;
        jsonObject.outputs = jsonOutputs;
        jsonObject.params = jsonParams;
        jsonObject.acc = jsonAccs;
        const { code, json: json2, poly, shaKey } = this.fModuleList[i].moduleFaust.factory;
        const factorySave = { code: btoa(faustWasmEnv.ab2str(code)), json: JSON.parse(json2), poly, shaKey };
        if (factorySave && isPrecompiled) {
          jsonObject.factory = factorySave;
        }
      }
    }
    json = JSON.stringify(jsonObjectCollection);
    return json;
  }
  //recall scene from json/jfaust fill arrayRecalScene with each JsonSaveModule
  recallScene(json) {
    if (json != null) {
      let jsonObjectCollection = {};
      try {
        jsonObjectCollection = JSON.parse(json);
      } catch (e) {
        new Message(Utilitary.messageResource.errorJsonCorrupted);
        Utilitary.hideFullPageLoading();
      }
      for (var index in jsonObjectCollection) {
        var jsonObject = jsonObjectCollection[index];
        this.arrayRecalScene.push(jsonObject);
      }
      this.launchModuleCreation();
    } else {
      Utilitary.hideFullPageLoading();
      new Message(Utilitary.messageResource.errorLoading);
    }
  }
  // recall module at rank 0 of arrayRecalScene
  // direct use of the asm.js code if exist
  // or compile the faust code
  //
  // When arrayRecalScene empty, connect the modules in the scene
  async launchModuleCreation() {
    if (this.arrayRecalScene.length != 0) {
      var jsonObject = this.arrayRecalScene[0];
      if (jsonObject.factory != void 0) {
        this.tempPatchId = jsonObject.patchId;
        const { code, json, poly, shaKey } = jsonObject.factory;
        const [factories] = await faustWasmEnv.faustwasm.FaustCompiler.importDSPFactories(JSON.stringify({ [shaKey]: { code, json, poly } }));
        this.updateAppTempModuleInfo(jsonObject);
        this.sceneName = jsonObject.sceneName;
        this.createModule(factories.get(shaKey));
      } else if (jsonObject.patchId != "output" && jsonObject.patchId != "input") {
        this.tempPatchId = jsonObject.patchId;
        this.sceneName = jsonObject.sceneName;
        var argumentCompile = { name: jsonObject.name, sourceCode: jsonObject.code, x: parseFloat(jsonObject.x), y: parseFloat(jsonObject.y), callback: (factory) => {
          this.createModule(factory);
        } };
        this.compileFaust(argumentCompile);
      } else {
        this.arrayRecalScene.shift();
        this.launchModuleCreation();
      }
    } else {
      for (var i = 0; i < this.arrayRecalledModule.length; i++) {
        this.connectModule(this.arrayRecalledModule[i]);
      }
      for (var i = 0; i < this.arrayRecalledModule.length; i++) {
        delete this.arrayRecalledModule[i].patchID;
      }
      this.arrayRecalledModule = [];
      var event = new CustomEvent("updatename");
      document.dispatchEvent(event);
      Utilitary.hideFullPageLoading();
    }
  }
  //update temporary info for the module being created
  updateAppTempModuleInfo(jsonSaveObject) {
    this.tempModuleX = parseFloat(jsonSaveObject.x);
    this.tempModuleY = parseFloat(jsonSaveObject.y);
    this.tempModuleName = jsonSaveObject.name;
    this.tempModuleSourceCode = jsonSaveObject.code;
    this.tempPatchId = jsonSaveObject.patchId;
    this.tempParams = jsonSaveObject.params;
  }
  //create Module then remove corresponding JsonSaveModule from arrayRecalScene at rank 0
  //re-lunch module of following Module/JsonSaveModule
  createModule(factory) {
    try {
      if (!factory) {
        new Message(
          "Error"
          /*faust.getErrorMessage()*/
        );
        Utilitary.hideFullPageLoading();
        return;
      }
      var module = new ModuleClass(Utilitary.idX++, this.tempModuleX, this.tempModuleY, this.tempModuleName, document.getElementById("modules"), (module2) => {
        this.removeModule(module2);
      }, this.compileFaust);
      module.moduleFaust.setSource(this.tempModuleSourceCode);
      module.createDSP(factory, () => {
        module.patchID = this.tempPatchId;
        if (this.tempParams) {
          for (var i = 0; i < this.tempParams.sliders.length; i++) {
            var slider = this.tempParams.sliders[i];
            module.addInterfaceParam(slider.path, parseFloat(slider.value));
          }
        }
        module.moduleFaust.recallInputsSource = this.arrayRecalScene[0].inputs.source;
        module.moduleFaust.recallOutputsDestination = this.arrayRecalScene[0].outputs.destination;
        this.arrayRecalledModule.push(module);
        module.recallInterfaceParams();
        module.setFaustInterfaceControles();
        module.createFaustInterface();
        module.addInputOutputNodes();
        this.addModule(module);
        this.recallAccValues(this.arrayRecalScene[0].acc, module);
        this.arrayRecalScene.shift();
        this.launchModuleCreation();
      });
    } catch (e) {
      new Message(Utilitary.messageResource.errorCreateModuleRecall);
      this.arrayRecalScene.shift();
      this.launchModuleCreation();
    }
  }
  //recall of the accelerometer mapping parameters for each FaustInterfaceControler of the Module
  recallAccValues(jsonAccs, module) {
    if (jsonAccs != void 0) {
      for (var i in jsonAccs.controles) {
        var controle = jsonAccs.controles[i];
        if (controle != void 0) {
          for (var j in module.moduleControles) {
            var moduleControle = module.moduleControles[j];
            if (moduleControle.itemParam.address == controle.adress) {
              var group = moduleControle.faustInterfaceView.group;
              var slider = moduleControle.faustInterfaceView.slider;
              var acc = moduleControle.accelerometerSlider;
              moduleControle.accelerometerSlider.acc = controle.axis + " " + controle.curve + " " + controle.amin + " " + controle.amid + " " + controle.amax;
              moduleControle.acc = controle.axis + " " + controle.curve + " " + controle.amin + " " + controle.amid + " " + controle.amax;
              acc.amax = parseFloat(controle.amax);
              acc.amid = parseFloat(controle.amid);
              acc.amin = parseFloat(controle.amin);
              acc.axis = parseFloat(controle.axis);
              acc.curve = parseFloat(controle.curve);
              acc.isEnabled = controle.isEnabled;
              AccelerometerHandler.curveSplitter(acc);
              group.className = "control-group";
              group.classList.add(Axis[controle.axis]);
              if (!controle.isEnabled) {
                group.classList.add("disabledAcc");
                slider.classList.add("allowed");
                slider.classList.remove("not-allowed");
                slider.disabled = false;
              } else {
                if (acc.isActive) {
                  slider.classList.add("not-allowed");
                  slider.classList.remove("allowed");
                  slider.disabled = true;
                } else {
                  slider.classList.add("allowed");
                  slider.classList.remove("not-allowed");
                  slider.disabled = false;
                }
              }
            }
          }
        }
      }
    }
  }
  //connect Modules recalled
  connectModule(module) {
    try {
      for (var i = 0; i < module.moduleFaust.recallInputsSource.length; i++) {
        var moduleSource = this.getModuleByPatchId(module.moduleFaust.recallInputsSource[i]);
        if (moduleSource != null) {
          var connector = new Connector();
          connector.createConnection(moduleSource, moduleSource.moduleView.getOutputNode(), module, module.moduleView.getInputNode());
        }
      }
      for (var i = 0; i < module.moduleFaust.recallOutputsDestination.length; i++) {
        var moduleDestination = this.getModuleByPatchId(module.moduleFaust.recallOutputsDestination[i]);
        if (moduleDestination != null) {
          var connector = new Connector();
          connector.createConnection(module, module.moduleView.getOutputNode(), moduleDestination, moduleDestination.moduleView.getInputNode());
        }
      }
    } catch (e) {
      new Message(Utilitary.messageResource.errorConnectionRecall);
    }
  }
  //use to identify the module to be connected to when recalling connections between modules
  getModuleByPatchId(patchId) {
    if (patchId == "output") {
      return this.fAudioOutput;
    } else if (patchId == "input") {
      return this.fAudioInput;
    } else {
      var arrayModules = this.getModules();
      for (var i = 0; i < arrayModules.length; i++) {
        if (arrayModules[i].patchID == patchId) {
          return arrayModules[i];
        }
      }
    }
    return null;
  }
  //use to replace all éèàù ' from string and replace it with eeau__
  static cleanName(newName) {
    newName = Utilitary.replaceAll(newName, "é", "e");
    newName = Utilitary.replaceAll(newName, "è", "e");
    newName = Utilitary.replaceAll(newName, "à", "a");
    newName = Utilitary.replaceAll(newName, "ù", "u");
    newName = Utilitary.replaceAll(newName, " ", "_");
    newName = Utilitary.replaceAll(newName, "'", "_");
    return newName;
  }
  //check if string start only with letter (no accent)
  //and contains only letter (no accent) underscore and number for a lenght between 1 and 50 char
  static isNameValid(newName) {
    var pattern = new RegExp("^[a-zA-Z_][a-zA-Z_0-9]{1,50}$");
    if (pattern.test(newName)) {
      return true;
    } else {
      return false;
    }
  }
  //rename scene if format is correct and return true otherwise return false
  static rename(input, spanRule, spanDynamic) {
    var newName = input.value;
    newName = Scene.cleanName(newName);
    if (Scene.isNameValid(newName)) {
      Utilitary.currentScene.sceneName = newName;
      spanDynamic.textContent = Utilitary.currentScene.sceneName;
      spanRule.style.opacity = "0.6";
      input.style.boxShadow = "0 0 0 green inset";
      input.style.border = "none";
      input.value = Utilitary.currentScene.sceneName;
      var event = new CustomEvent("updatename");
      document.dispatchEvent(event);
      return true;
    } else {
      spanRule.style.opacity = "1";
      input.style.boxShadow = "0 0 6px yellow inset";
      input.style.border = "3px solid red";
      new Message(Utilitary.messageResource.invalidSceneName);
      return false;
    }
  }
  /***************** SET POSITION OF INPUT OUTPUT MODULE ***************/
  positionInputModule() {
    var position = new PositionModule();
    position.x = 10;
    position.y = window.innerHeight / 2;
    return position;
  }
  positionOutputModule() {
    var position = new PositionModule();
    position.x = window.innerWidth - 98;
    position.y = window.innerHeight / 2;
    return position;
  }
  positionDblTapModule() {
    var position = new PositionModule();
    position.x = window.innerWidth / 2;
    position.y = window.innerHeight / 2;
    return position;
  }
  /***************** Unstyle node connection of all modules on touchscreen  ***************/
  unstyleNode() {
    var modules = this.getModules();
    modules.push(this.fAudioInput);
    modules.push(this.fAudioOutput);
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].moduleView.fInputNode) {
        modules[i].moduleView.fInputNode.style.border = "none";
        modules[i].moduleView.fInputNode.style.left = "-16px";
        modules[i].moduleView.fInputNode.style.marginTop = "-18px";
      }
      if (modules[i].moduleView.fOutputNode) {
        modules[i].moduleView.fOutputNode.style.border = "none";
        modules[i].moduleView.fOutputNode.style.right = "-16px";
        modules[i].moduleView.fOutputNode.style.marginTop = "-18px";
      }
    }
    ModuleClass.isNodesModuleUnstyle = true;
  }
}
class JsonSaveModule {
}
class JsonOutputsSave {
}
class JsonInputsSave {
}
class JsonParamsSave {
}
class JsonAccSaves {
}
class JsonAccSave {
}
class JsonSliderSave {
}
const _Export = class _Export2 {
  constructor() {
    this.updateArchitectures = () => {
      if (!this.clearSelectBox("architectures")) {
        return;
      } else {
        var data = JSON.parse(this.jsonText);
        var platformsSelect = document.getElementById("platforms");
        var options = platformsSelect.options[platformsSelect.selectedIndex];
        var selPlatform = options.value;
        var dataCopy = data[selPlatform];
        var iterator = 0;
        for (var subData in dataCopy) {
          if (iterator < dataCopy.length) {
            var mainData = dataCopy[subData];
            this.addItem("architectures", mainData);
            iterator = iterator + 1;
          }
        }
      }
    };
    this.uploadTargets = () => {
      this.clearSelectBox("platforms");
      this.clearSelectBox("architectures");
      var input = document.getElementById("faustweburl");
      _Export2.exportUrl = input.value;
      _Export2.targetsUrl = _Export2.exportUrl + "/targets";
      Utilitary.getXHR(_Export2.targetsUrl, (json) => {
        this.uploadTargetCallback(json);
      }, (errorMessage) => {
      });
    };
    this.exportFaustCode = (shaKey) => {
      var platformsSelect = document.getElementById("platforms");
      var optionPlateform = platformsSelect.options[platformsSelect.selectedIndex];
      var platforme = optionPlateform.value;
      var architecturesSelect = document.getElementById("architectures");
      var optionArchi = architecturesSelect.options[architecturesSelect.selectedIndex];
      var architecture = optionArchi.value;
      var serverUrl = document.getElementById("faustweburl").value;
      var appType = "binary.zip";
      if (architecture == "android")
        appType = "binary.apk";
      var exportLib = new ExportLib();
      exportLib.sendPrecompileRequest(serverUrl, shaKey, platforme, architecture, appType, (serverUrl2, shaKey2, plateforme, architecture2, appType2) => {
        this.setDownloadOptions(serverUrl2, shaKey2, plateforme, architecture2, appType2);
      });
    };
    this.setDownloadOptions = async (serverUrl, shaKey, plateforme, architecture, target_aux) => {
      if (shaKey.indexOf("ERROR") == -1) {
        var disposableExportDiv = document.createElement("div");
        disposableExportDiv.id = "disposableExportDiv";
        var qrDiv = document.createElement("div");
        qrDiv.id = "qrcodeDiv";
        let target;
        if (architecture === "pwa" || architecture === "pwa-poly") {
          target = "index.html";
        } else if (plateforme === "chaos-stratus" && architecture === "effect-installer") {
          target = "installer.sh";
        } else if (plateforme === "android") {
          target = "binary.apk";
        } else {
          target = "binary.zip";
        }
        var myWhiteDiv = await ExportLib.getQrCode(serverUrl, shaKey, plateforme, architecture, target, 120);
        qrDiv.appendChild(myWhiteDiv);
        var downloadBottomButtonContainer = document.createElement("div");
        downloadBottomButtonContainer.className = "bottomButtonContainer";
        var linkDownload = document.createElement("button");
        linkDownload.value = serverUrl + "/" + shaKey + "/" + plateforme + "/" + architecture + "/" + target;
        linkDownload.id = "linkDownload";
        linkDownload.className = "button";
        linkDownload.textContent = Utilitary.messageResource.buttonDownloadApp;
        downloadBottomButtonContainer.appendChild(linkDownload);
        this.exportView.downloadButton = linkDownload;
        this.exportView.downloadButton.onclick = () => {
          window.location.href = this.exportView.downloadButton.value;
        };
        document.getElementById("exportResultContainer").appendChild(disposableExportDiv);
        disposableExportDiv.appendChild(qrDiv);
        disposableExportDiv.appendChild(downloadBottomButtonContainer);
        this.exportView.exportButton.addEventListener("click", this.eventExport);
        this.exportView.exportButton.style.opacity = "1";
        Utilitary.removeLoadingLogo("exportResultContainer");
      } else {
        new Message(shaKey);
      }
      this.exportView.exportButton.addEventListener("click", this.eventExport);
      this.exportView.exportButton.style.opacity = "1";
      Utilitary.removeLoadingLogo("exportResultContainer");
    };
  }
  // Set EventListener
  setEventListeners() {
    this.exportView.refreshButton.onclick = () => {
      this.uploadTargets();
    };
    this.exportView.selectPlatform.onchange = () => {
      this.updateArchitectures();
    };
    this.exportView.inputServerUrl.onkeypress = (e) => {
      if (e.which == 13) {
        this.uploadTargets();
      }
    };
    this.eventExport = (event) => {
      this.exportPatch(event, this);
    };
    this.exportView.exportButton.addEventListener("click", this.eventExport);
    this.exportView.buttonNameApp.onclick = () => {
      this.renameScene();
    };
    this.exportView.inputNameApp.onkeypress = (e) => {
      if (e.which == 13) {
        this.renameScene();
      }
    };
    this.exportView.moreOptionDiv.addEventListener("click", () => {
      this.exportView.moreOptionDiv.style.display = "none";
      this.exportView.lessOptionDiv.style.display = this.exportView.optionContainer.style.display = "block";
    }, false);
    this.exportView.lessOptionDiv.addEventListener("click", () => {
      this.exportView.moreOptionDiv.style.display = "block";
      this.exportView.lessOptionDiv.style.display = this.exportView.optionContainer.style.display = "none";
    }, false);
  }
  // add options into select boxes
  addItem(id, itemText) {
    var platformsSelect = document.getElementById(id);
    var option = document.createElement("option");
    option.text = itemText;
    platformsSelect.add(option);
  }
  //clear select boxes
  clearSelectBox(id) {
    if (document.getElementById(id) != void 0) {
      while (document.getElementById(id).childNodes.length > 0) {
        document.getElementById(id).removeChild(document.getElementById(id).childNodes[0]);
      }
      return true;
    } else {
      return false;
    }
  }
  //callback to refresh Target
  uploadTargetCallback(json) {
    this.jsonText = json;
    var data = JSON.parse(this.jsonText);
    for (var platform in data) {
      this.addItem("platforms", platform);
    }
    this.setDefaultSelect();
    this.updateArchitectures();
  }
  //set selection to default, currently android
  setDefaultSelect() {
    var platefromSelect = document.getElementById("platforms");
    var options = platefromSelect.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].textContent == "android") {
        platefromSelect.selectedIndex = i;
      }
    }
  }
  /********************************************************************
  *********************  HANDLE POST TO FAUST WEB  ********************
  ********************************************************************/
  exportPatch(event, expor) {
    this.exportView.exportButton.removeEventListener("click", this.eventExport);
    this.exportView.exportButton.style.opacity = "0.3";
    Utilitary.currentScene.sceneName;
    this.removeQRCode();
    Utilitary.addLoadingLogo("exportResultContainer");
    var equivalentFaust = new EquivalentFaust();
    var faustCode = equivalentFaust.getFaustEquivalent(Utilitary.currentScene, Utilitary.currentScene.sceneName);
    ExportLib.getSHAKey(document.getElementById("faustweburl").value, Utilitary.currentScene.sceneName, faustCode, expor.exportFaustCode);
  }
  removeQRCode() {
    var disposableExportDiv = document.getElementById("disposableExportDiv");
    if (disposableExportDiv) {
      disposableExportDiv.remove();
    }
  }
  renameScene() {
    Scene.rename(this.exportView.inputNameApp, this.exportView.rulesName, this.exportView.dynamicName);
  }
};
_Export.exportUrl = "https://faustservice.inria.fr";
_Export.targetsUrl = "https://faustservice.inria.fr/targets";
let Export = _Export;
class Library {
  constructor() {
    this.isSmaller = false;
    this.isDblTouch = false;
  }
  //get json with library infos
  fillLibrary() {
    var url = "faust-modules/index.json";
    Utilitary.getXHR(url, (json) => {
      this.fillLibraryCallBack(json);
    }, (errorMessage) => {
    });
  }
  //dispatch library info to each submenu
  fillLibraryCallBack(json) {
    var jsonObject = JSON.parse(json);
    jsonObject.effet = "effetLibrarySelect";
    jsonObject.effetSupprStructure = "faust-modules/effects/";
    jsonObject.instrument = "instrumentLibrarySelect";
    jsonObject.instrumentSupprStructure = "faust-modules/generators/";
    jsonObject.exemple = "exempleLibrarySelect";
    jsonObject.exempleSupprStructure = "faust-modules/combined/";
    this.fillSubMenu(jsonObject.instruments, jsonObject.instrument, jsonObject.instrumentSupprStructure);
    this.fillSubMenu(jsonObject.effets, jsonObject.effet, jsonObject.effetSupprStructure);
    this.fillSubMenu(jsonObject.exemples, jsonObject.exemple, jsonObject.exempleSupprStructure);
  }
  //fill submenu and attach events
  fillSubMenu(options, subMenuId, stringStructureRemoved) {
    var subMenu = document.getElementById(subMenuId);
    for (var i = 0; i < options.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      li.appendChild(a);
      a.href = options[i];
      a.draggable = true;
      a.title = Utilitary.messageResource.hoverLibraryElement;
      a.addEventListener("click", (e) => {
        e.preventDefault();
      });
      var dblckickHandler = this.dispatchEventLibrary.bind(this, a.href);
      a.ondblclick = dblckickHandler;
      a.ontouchstart = (e) => {
        this.dbleTouchMenu(e);
      };
      a.text = this.cleanNameElement(options[i], stringStructureRemoved);
      subMenu.appendChild(li);
    }
  }
  //custom doube touch event handler
  dbleTouchMenu(touchEvent) {
    var anchor = touchEvent.target;
    if (!this.isLibraryTouch) {
      this.isLibraryTouch = true;
      this.previousTouchUrl = anchor.href;
      window.setTimeout(() => {
        this.isLibraryTouch = false;
        this.previousTouchUrl = "";
      }, 300);
    } else if (anchor.href == this.previousTouchUrl) {
      Utilitary.showFullPageLoading();
      this.dispatchEventLibrary(anchor.href);
      this.isLibraryTouch = false;
    } else {
      this.isLibraryTouch = false;
    }
  }
  //dispatch custom double touch
  dispatchEventLibrary(url) {
    var event = new CustomEvent("dbltouchlib", { "detail": url });
    document.dispatchEvent(event);
  }
  // init scroll to show scroll from perfectScroll.js
  initScroll() {
    this.libraryView.effetLibrarySelect.scrollTop += 1;
    this.libraryView.exempleLibrarySelect.scrollTop += 1;
    this.libraryView.intrumentLibrarySelect.scrollTop += 1;
  }
  //remove .dsp extention and uri from element to get title
  cleanNameElement(elementComplete, stringStructureRemoved) {
    return elementComplete.replace(stringStructureRemoved, "").replace(".dsp", "");
  }
}
class Load {
  //Set event listener
  setEventListeners() {
    this.loadView.loadFileButton.addEventListener("click", () => {
      this.openFile();
    });
    this.loadView.buttonLoadLocal.addEventListener("click", () => {
      this.localLoad();
    });
    this.loadView.buttonLoadCloud.addEventListener("click", () => {
      this.cloudLoad();
    });
    this.loadView.buttonConnectDrive.addEventListener("click", (e) => {
      this.drive.handleAuthClick(e);
    });
    this.loadView.aBigExemple.addEventListener("click", (e) => {
      this.getEx(e);
    });
    this.loadView.aLightExemple.addEventListener("click", (e) => {
      this.getEx(e);
    });
    this.loadView.aBigPreExemple.addEventListener("click", (e) => {
      this.getEx(e);
    });
    this.loadView.aLightPreExemple.addEventListener("click", (e) => {
      this.getEx(e);
    });
    this.loadView.buttonChangeAccount.addEventListener("click", (e) => {
      this.logOut();
    });
  }
  //open file from browser dialogue open window
  openFile() {
    if (this.loadView.loadFileInput.files.length > 0) {
      var file = this.loadView.loadFileInput.files.item(0);
      var event = new CustomEvent("fileload", { "detail": file });
      document.dispatchEvent(event);
    }
  }
  //set item from local storage 'item_key' key
  getStorageItemValue(item_key, key) {
    if (localStorage.getItem(item_key)) {
      var item_value = JSON.parse(localStorage.getItem(item_key));
      var item_index = item_value.findIndex((obj) => obj[0] === key);
      return item_index >= 0 ? item_value[item_index][1] : null;
    } else {
      return null;
    }
  }
  //load scene from local storage
  localLoad() {
    if (this.loadView.existingSceneSelect.selectedIndex > -1) {
      Utilitary.showFullPageLoading();
      var option = this.loadView.existingSceneSelect.options[this.loadView.existingSceneSelect.selectedIndex];
      var name = option.value;
      this.sceneCurrent.recallScene(this.getStorageItemValue("FaustPlayground", name));
    }
  }
  //load exemple
  getEx(e) {
    e.preventDefault();
    var anchorTarget = e.target;
    Utilitary.getXHR(anchorTarget.href, (json) => {
      this.loadEx(json);
    }, null);
  }
  loadEx(json) {
    Utilitary.showFullPageLoading();
    this.sceneCurrent.recallScene(json);
  }
  //load file scene from cloud Drive API
  //get id file from Drive API then is able to get content
  cloudLoad() {
    if (this.loadView.cloudSelectFile.selectedIndex > -1) {
      Utilitary.showFullPageLoading();
      var option = this.loadView.cloudSelectFile.options[this.loadView.cloudSelectFile.selectedIndex];
      var id = option.value;
      var file = this.drive.getFile(id, (resp) => {
        this.getContent(resp);
      });
      console.log(file);
    }
  }
  // get content from file loaded from cloud
  getContent(resp) {
    this.drive.downloadFile(resp, (json) => {
      this.sceneCurrent.recallScene(json);
    });
  }
  //logOut from google account
  logOut() {
    var event = new CustomEvent("authoff");
    document.dispatchEvent(event);
  }
}
var FileSaver_min = { exports: {} };
(function(module, exports) {
  (function(a, b) {
    b();
  })(commonjsGlobal, function() {
    function b(a2, b2) {
      return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
    }
    function c(a2, b2, c2) {
      var d2 = new XMLHttpRequest();
      d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
        g(d2.response, b2, c2);
      }, d2.onerror = function() {
        console.error("could not download file");
      }, d2.send();
    }
    function d(a2) {
      var b2 = new XMLHttpRequest();
      b2.open("HEAD", a2, false);
      try {
        b2.send();
      } catch (a3) {
      }
      return 200 <= b2.status && 299 >= b2.status;
    }
    function e(a2) {
      try {
        a2.dispatchEvent(new MouseEvent("click"));
      } catch (c2) {
        var b2 = document.createEvent("MouseEvents");
        b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
      }
    }
    var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
      var i = f.URL || f.webkitURL, j = document.createElement("a");
      g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
        i.revokeObjectURL(j.href);
      }, 4e4), setTimeout(function() {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
      if (g2 = g2 || f2.name || "download", "string" != typeof f2)
        navigator.msSaveOrOpenBlob(b(f2, h), g2);
      else if (d(f2))
        c(f2, g2, h);
      else {
        var i = document.createElement("a");
        i.href = f2, i.target = "_blank", setTimeout(function() {
          e(i);
        });
      }
    } : function(b2, d2, e2, g2) {
      if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
        return c(b2, d2, e2);
      var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h && i || a) && "undefined" != typeof FileReader) {
        var k = new FileReader();
        k.onloadend = function() {
          var a2 = k.result;
          a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
        }, k.readAsDataURL(b2);
      } else {
        var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
        g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
          l.revokeObjectURL(m);
        }, 4e4);
      }
    });
    f.saveAs = g.saveAs = g, module.exports = g;
  });
})(FileSaver_min);
var FileSaver_minExports = FileSaver_min.exports;
class Save {
  setEventListeners() {
    this.saveView.buttonDownloadApp.addEventListener("click", () => {
      this.downloadApp();
    });
    this.saveView.buttonLocalSave.addEventListener("click", () => {
      this.saveLocal();
    });
    this.saveView.buttonLocalSuppr.addEventListener("click", () => {
      this.supprLocal();
    });
    this.saveView.existingSceneSelect.addEventListener("change", () => {
      this.getNameSelected();
    });
    this.saveView.cloudSelectFile.addEventListener("change", () => {
      this.getNameSelectedCloud();
    });
    this.saveView.buttonConnectDrive.addEventListener("click", (e) => {
      this.drive.handleAuthClick(e);
    });
    this.saveView.buttonChangeAccount.addEventListener("click", () => {
      this.logOut();
    });
    this.saveView.buttonSaveCloud.addEventListener("click", () => {
      this.saveCloud();
    });
    this.saveView.buttonCloudSuppr.addEventListener("click", () => {
      this.supprCloud();
    });
    document.addEventListener("successave", () => {
      new Message(Utilitary.messageResource.sucessSave, "messageTransitionOutFast", 2e3, 500);
    });
  }
  //create a file jfaust and save it to the device
  downloadApp() {
    if (this.saveView.inputDownload.value != Utilitary.currentScene.sceneName && !Scene.rename(this.saveView.inputDownload, this.saveView.rulesName, this.saveView.dynamicName))
      ;
    else {
      var jsonScene = this.sceneCurrent.saveScene(this.saveView.checkBoxPrecompile.checked);
      var blob = new Blob([jsonScene], {
        type: "application/json;charset=utf-8;"
      });
      FileSaver_minExports.saveAs(blob, Utilitary.currentScene.sceneName + ".jfaust");
    }
  }
  //set [key, value] in local storage item_key key
  setStorageItemValue(item_key, key, value) {
    var item_value;
    if (localStorage.getItem(item_key)) {
      item_value = JSON.parse(localStorage.getItem(item_key));
    } else {
      item_value = [];
    }
    var item_index = item_value.findIndex((obj) => obj[0] === key);
    if (item_index >= 0) {
      item_value[item_index][1] = value;
    } else {
      item_value.push([key, value]);
    }
    localStorage.setItem(item_key, JSON.stringify(item_value));
  }
  //save scene in local storage
  saveLocal() {
    if (this.saveView.inputLocalStorage.value != Utilitary.currentScene.sceneName && !Scene.rename(this.saveView.inputLocalStorage, this.saveView.rulesName, this.saveView.dynamicName))
      ;
    else {
      if (typeof sessionStorage != "undefined") {
        var name = this.saveView.inputLocalStorage.value;
        var jsonScene = this.sceneCurrent.saveScene(true);
        if (this.isFileExisting(name)) {
          new Confirm(Utilitary.messageResource.confirmReplace, (callback) => {
            this.replaceSaveLocal(name, jsonScene, callback);
          });
          return;
        } else {
          this.setStorageItemValue("FaustPlayground", name, jsonScene);
        }
        new Message(Utilitary.messageResource.sucessSave, "messageTransitionOutFast", 2e3, 500);
        var event = new CustomEvent("updatelist");
        document.dispatchEvent(event);
      } else {
        new Message(Utilitary.messageResource.errorLocalStorage);
      }
    }
  }
  //replace an existing scene in local Storage
  replaceSaveLocal(name, jsonScene, confirmCallBack) {
    this.setStorageItemValue("FaustPlayground", name, jsonScene);
    new Message(Utilitary.messageResource.sucessSave, "messageTransitionOutFast", 2e3, 500);
    var event = new CustomEvent("updatelist");
    document.dispatchEvent(event);
    confirmCallBack();
  }
  //check if a scene name already exist in local storage
  isFileExisting(name) {
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == name) {
        return true;
      }
    }
    return false;
  }
  //check if a scene name already exist in Cloud
  isFileCloudExisting(name) {
    for (var i = 0; i < this.saveView.cloudSelectFile.options.length; i++) {
      if (this.saveView.cloudSelectFile.options[i].textContent == name) {
        return true;
      }
    }
    return false;
  }
  // get scene name selected in select local storage and set it to the input text localStorage
  getNameSelected() {
    var option = this.saveView.existingSceneSelect.options[this.saveView.existingSceneSelect.selectedIndex];
    this.saveView.inputLocalStorage.value = option.value;
  }
  // get scene name selected in select cloud and set it to the input text clou
  getNameSelectedCloud() {
    this.saveView.inputCloudStorage.value = this.saveView.cloudSelectFile.options[this.saveView.cloudSelectFile.selectedIndex].textContent;
  }
  //get value of select option by its text content, used here to get id of drive file
  getValueByTextContent(select, name) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].textContent == name) {
        var option = select.options[i];
        return option.value;
      }
    }
    return null;
  }
  //suppr scene from local storage confirm
  supprLocal() {
    if (this.saveView.existingSceneSelect.selectedIndex > -1) {
      new Confirm(Utilitary.messageResource.confirmSuppr, (callbackConfirm) => {
        this.supprLocalCallback(callbackConfirm);
      });
    }
  }
  //suppr scene from local storage callback
  supprLocalCallback(callbackConfirm) {
    var option = this.saveView.existingSceneSelect.options[this.saveView.existingSceneSelect.selectedIndex];
    var name = option.value;
    localStorage.removeItem(name);
    var event = new CustomEvent("updatelist");
    document.dispatchEvent(event);
    callbackConfirm();
  }
  //logOut from google account
  logOut() {
    var event = new CustomEvent("authoff");
    document.dispatchEvent(event);
  }
  // save scene in the cloud, create a jfaust file
  saveCloud() {
    if (this.saveView.inputCloudStorage.value != Utilitary.currentScene.sceneName && !Scene.rename(this.saveView.inputCloudStorage, this.saveView.rulesName, this.saveView.dynamicName))
      ;
    else {
      var name = this.saveView.inputCloudStorage.value;
      if (this.isFileCloudExisting(name)) {
        new Confirm(Utilitary.messageResource.confirmReplace, (confirmCallback) => {
          this.replaceCloud(name, confirmCallback);
        });
        return;
      } else {
        var jsonScene = this.sceneCurrent.saveScene(true);
        var blob = new Blob([jsonScene], { type: "application/json;charset=utf-8;" });
        this.drive.tempBlob = blob;
        this.drive.createFile(Utilitary.currentScene.sceneName, null);
      }
    }
  }
  //update/replace a scene on the cloud
  replaceCloud(name, confirmCallback) {
    var jsonScene = this.sceneCurrent.saveScene(true);
    var blob = new Blob([jsonScene], { type: "application/json;charset=utf-8;" });
    this.drive.tempBlob = blob;
    var id = this.getValueByTextContent(this.saveView.cloudSelectFile, name);
    if (id != null) {
      this.drive.getFile(id, () => {
        this.drive.updateFile(id, this.drive.lastSavedFileMetadata, blob, null);
      });
    }
    confirmCallback();
  }
  //trash a file in the cloud confirm
  //could be retreive from the cloud's trash can
  supprCloud() {
    if (this.saveView.cloudSelectFile.selectedIndex > -1) {
      new Confirm(Utilitary.messageResource.confirmSuppr, (confirmCallBack) => {
        this.supprCloudCallback(confirmCallBack);
      });
    }
  }
  //trash a file in the cloud callback
  supprCloudCallback(confirmCallBack) {
    var option = this.saveView.cloudSelectFile.options[this.saveView.cloudSelectFile.selectedIndex];
    var id = option.value;
    this.drive.trashFile(id);
    confirmCallBack();
  }
}
class AccelerometerEditView {
  constructor() {
  }
  initAccelerometerEdit() {
    var blockLayer = document.createElement("div");
    blockLayer.id = "accBlockLayer";
    this.blockLayer = blockLayer;
    var container = document.createElement("div");
    container.id = "accEditContainer";
    this.container = container;
    var labelTitle = document.createElement("label");
    labelTitle.id = "labelTitle";
    this.labelTitle = labelTitle;
    var radioCurveContainer = document.createElement("form");
    radioCurveContainer.id = "radioCurveContainer";
    this.radioCurveContainer = radioCurveContainer;
    var label1 = document.createElement("label");
    label1.className = "curve";
    label1.id = "curve1";
    label1.textContent = Utilitary.messageResource.curve1;
    var label2 = document.createElement("label");
    label2.className = "curve";
    label2.id = "curve2";
    label2.textContent = Utilitary.messageResource.curve2;
    var label3 = document.createElement("label");
    label3.className = "curve";
    label3.id = "curve3";
    label3.textContent = Utilitary.messageResource.curve3;
    var label4 = document.createElement("label");
    label4.className = "curve";
    label4.id = "curve4";
    label4.textContent = Utilitary.messageResource.curve4;
    var radio1 = document.createElement("input");
    radio1.id = "radio1";
    radio1.type = "radio";
    radio1.className = "radio";
    radio1.name = "curve";
    this.radioCurve1 = radio1;
    label1.appendChild(radio1);
    var radio2 = document.createElement("input");
    radio2.id = "radio2";
    radio2.type = "radio";
    radio2.className = "radio";
    radio2.name = "curve";
    this.radioCurve2 = radio2;
    label2.appendChild(radio2);
    var radio3 = document.createElement("input");
    radio3.id = "radio3";
    radio3.type = "radio";
    radio3.className = "radio";
    radio3.name = "curve";
    this.radioCurve3 = radio3;
    label3.appendChild(radio3);
    var radio4 = document.createElement("input");
    radio4.id = "radio4";
    radio4.type = "radio";
    radio4.className = "radio";
    radio4.name = "curve";
    this.radioCurve4 = radio4;
    label4.appendChild(radio4);
    radioCurveContainer.appendChild(label1);
    radioCurveContainer.appendChild(label2);
    radioCurveContainer.appendChild(label3);
    radioCurveContainer.appendChild(label4);
    var radioAxisContainer = document.createElement("form");
    radioAxisContainer.id = "radioAxisContainer";
    this.radioAxisContainer = radioAxisContainer;
    var label0 = document.createElement("label");
    label0.className = "axe";
    label0.id = "axe0";
    label0.textContent = Utilitary.messageResource.axis0;
    var labelX = document.createElement("label");
    labelX.className = "axe";
    labelX.id = "axeX";
    labelX.textContent = Utilitary.messageResource.axisX;
    var labelY = document.createElement("label");
    labelY.className = "axe";
    labelY.id = "axeY";
    labelY.textContent = Utilitary.messageResource.axisY;
    var labelZ = document.createElement("label");
    labelZ.className = "axe";
    labelZ.id = "axeZ";
    labelZ.textContent = Utilitary.messageResource.axisZ;
    var radio0 = document.createElement("input");
    radio0.id = "radio0";
    radio0.type = "checkbox";
    radio0.className = "radio";
    radio0.name = "axis";
    this.radioAxis0 = radio0;
    label0.appendChild(radio0);
    var radioX = document.createElement("input");
    radioX.id = "radioX";
    radioX.type = "radio";
    radioX.className = "radio";
    radioX.name = "axis";
    this.radioAxisX = radioX;
    labelX.appendChild(radioX);
    var radioY = document.createElement("input");
    radioY.id = "radioY";
    radioY.type = "radio";
    radioY.className = "radio";
    radioY.name = "axis";
    this.radioAxisY = radioY;
    labelY.appendChild(radioY);
    var radioZ = document.createElement("input");
    radioZ.id = "radioZ";
    radioZ.type = "radio";
    radioZ.className = "radio";
    radioZ.name = "axis";
    this.radioAxisZ = radioZ;
    labelZ.appendChild(radioZ);
    radioAxisContainer.appendChild(label0);
    radioAxisContainer.appendChild(labelX);
    radioAxisContainer.appendChild(labelY);
    radioAxisContainer.appendChild(labelZ);
    var checkOnOffContainer = document.createElement("form");
    checkOnOffContainer.id = "checkOnOffContainer";
    this.checkeOnOffContainer = checkOnOffContainer;
    var checkOnOffLabel = document.createElement("label");
    checkOnOffLabel.id = "checkOnOffLabel";
    checkOnOffLabel.textContent = Utilitary.messageResource.checkBox;
    checkOnOffContainer.appendChild(checkOnOffLabel);
    var checkOnOff = document.createElement("input");
    checkOnOff.type = "checkbox";
    checkOnOff.id = "checkOnOff";
    this.checkeOnOff = checkOnOff;
    checkOnOffLabel.appendChild(checkOnOff);
    var cloneContainer = document.createElement("div");
    cloneContainer.id = "cloneContainer";
    this.cloneContainer = cloneContainer;
    var accRangeMax = document.createElement("input");
    accRangeMax.id = "accRangeMax";
    accRangeMax.className = "accRange";
    accRangeMax.type = "range";
    this.rangeMax = accRangeMax;
    var accRangeMid = document.createElement("input");
    accRangeMid.id = "accRangeMid";
    accRangeMid.className = "accRange";
    accRangeMid.type = "range";
    this.rangeMid = accRangeMid;
    var accRangeMin = document.createElement("input");
    accRangeMin.id = "accRangeMin";
    accRangeMin.className = "accRange";
    accRangeMin.type = "range";
    this.rangeMin = accRangeMin;
    var accRangeCurrent = document.createElement("input");
    accRangeCurrent.id = "accRangeCurrent";
    accRangeCurrent.className = "accRange acc";
    accRangeCurrent.type = "range";
    accRangeCurrent.disabled = true;
    this.rangeCurrent = accRangeCurrent;
    var accRangeVirtual = document.createElement("input");
    accRangeVirtual.id = "accRangeVirtual";
    accRangeVirtual.className = "accRange acc";
    accRangeVirtual.type = "range";
    this.rangeVirtual = accRangeVirtual;
    var rangeContainer = document.createElement("div");
    rangeContainer.id = "rangeContainer";
    this.rangeContainer = rangeContainer;
    rangeContainer.appendChild(accRangeMin);
    rangeContainer.appendChild(accRangeMid);
    rangeContainer.appendChild(accRangeMax);
    rangeContainer.appendChild(accRangeCurrent);
    rangeContainer.appendChild(accRangeVirtual);
    var validContainer = document.createElement("div");
    validContainer.id = "validContainer";
    var validButton = document.createElement("button");
    validButton.id = "validButton";
    validButton.className = "accButton";
    this.validButton = validButton;
    var cancelButton = document.createElement("button");
    cancelButton.id = "cancelButton";
    cancelButton.className = "accButton";
    this.cancelButton = cancelButton;
    validContainer.appendChild(cancelButton);
    validContainer.appendChild(validButton);
    container.appendChild(radioCurveContainer);
    container.appendChild(radioAxisContainer);
    container.appendChild(checkOnOffContainer);
    container.appendChild(cloneContainer);
    container.appendChild(rangeContainer);
    container.appendChild(validContainer);
    blockLayer.appendChild(container);
    return blockLayer;
  }
}
class LoadView {
  initLoadView() {
    var loadContainer = document.createElement("div");
    loadContainer.id = "loadContainer";
    loadContainer.className = "menuContent";
    var loadFileContainer = document.createElement("div");
    loadFileContainer.id = "loadFileContainer";
    loadFileContainer.className = "exportSubmenu";
    var loadLocalContainer = document.createElement("div");
    loadLocalContainer.id = "loadLocalContainer";
    loadLocalContainer.className = "exportSubmenu";
    var loadCloudContainer = document.createElement("div");
    loadCloudContainer.id = "loadCloudContainer";
    loadCloudContainer.className = "exportSubmenu";
    var loadFileBottomButtonContainer = document.createElement("div");
    loadFileBottomButtonContainer.className = "bottomButtonContainer";
    var loadFileDiv = document.createElement("div");
    loadFileDiv.id = "loadFileDiv";
    var loadFileInput = document.createElement("input");
    loadFileInput.type = "file";
    loadFileInput.id = "loadFileInput";
    this.loadFileInput = loadFileInput;
    loadFileDiv.appendChild(loadFileInput);
    var aLightExemple = document.createElement("a");
    aLightExemple.id = "aLightExemple";
    aLightExemple.className = "exempleAnchor";
    aLightExemple.textContent = "Small example";
    aLightExemple.href = "json/Small_Exemple.json";
    aLightExemple.draggable = false;
    this.aLightExemple = aLightExemple;
    var aBigExemple = document.createElement("a");
    aBigExemple.id = "aBigExemple";
    aBigExemple.className = "exempleAnchor";
    aBigExemple.textContent = "Big exemple";
    aBigExemple.href = "json/Big_Exemple.json";
    aBigExemple.draggable = false;
    this.aBigExemple = aBigExemple;
    var aLightPreExemple = document.createElement("a");
    aLightPreExemple.id = "aLightPreExemple";
    aLightPreExemple.className = "exempleAnchor";
    aLightPreExemple.textContent = "Small example precompile";
    aLightPreExemple.href = "json/Small_Exemple_Precompile.json";
    aLightPreExemple.draggable = false;
    this.aLightPreExemple = aLightPreExemple;
    var aBigPreExemple = document.createElement("a");
    aBigPreExemple.id = "aBigPreExemple";
    aBigPreExemple.className = "exempleAnchor";
    aBigPreExemple.textContent = "Big exemple precompile";
    aBigPreExemple.href = "json/Big_Exemple_Precompile.json";
    aBigPreExemple.draggable = false;
    this.aBigPreExemple = aBigPreExemple;
    var loadFileButton = document.createElement("button");
    loadFileButton.type = "button";
    loadFileButton.id = "loadFileButton";
    loadFileButton.className = "button";
    loadFileButton.textContent = Utilitary.messageResource.buttonLoadFile;
    this.loadFileButton = loadFileButton;
    loadFileContainer.appendChild(loadFileDiv);
    loadFileContainer.appendChild(aLightExemple);
    loadFileContainer.appendChild(aLightPreExemple);
    loadFileContainer.appendChild(aBigExemple);
    loadFileContainer.appendChild(aBigPreExemple);
    loadFileBottomButtonContainer.appendChild(loadFileButton);
    loadFileContainer.appendChild(loadFileBottomButtonContainer);
    var existingSceneSelect = document.createElement("select");
    existingSceneSelect.id = "existingLoadSceneSelect";
    existingSceneSelect.className = "sceneSelect";
    existingSceneSelect.size = 7;
    Ps.initialize(existingSceneSelect, { suppressScrollX: true, theme: "my-theme-name" });
    this.existingSceneSelect = existingSceneSelect;
    var localButton = document.createElement("button");
    localButton.type = "button";
    localButton.id = "localLoadButton";
    localButton.className = "button";
    localButton.textContent = Utilitary.messageResource.buttonLoadLocal;
    this.buttonLoadLocal = localButton;
    var localBottomButtonContainer = document.createElement("div");
    localBottomButtonContainer.className = "bottomButtonContainer";
    localBottomButtonContainer.appendChild(localButton);
    loadLocalContainer.appendChild(existingSceneSelect);
    loadLocalContainer.appendChild(localBottomButtonContainer);
    var driveContainer = document.createElement("div");
    driveContainer.id = "driveContainerLoad";
    this.driveContainer = driveContainer;
    var buttonConnectDrive = document.createElement("button");
    buttonConnectDrive.id = "buttonConnectLoadDrive";
    buttonConnectDrive.textContent = Utilitary.messageResource.buttonConnectCloud;
    buttonConnectDrive.className = "button";
    this.buttonConnectDrive = buttonConnectDrive;
    var selectDrive = document.createElement("select");
    selectDrive.size = 6;
    selectDrive.id = "loadSceneSelectDrive";
    selectDrive.className = "sceneSelect ";
    selectDrive.style.display = "none";
    this.cloudSelectFile = selectDrive;
    var changeAccountButton = document.createElement("button");
    changeAccountButton.type = "button";
    changeAccountButton.className = "button changeAccountButton";
    changeAccountButton.textContent = Utilitary.messageResource.buttonLogoutCloud;
    changeAccountButton.style.display = "none";
    this.buttonChangeAccount = changeAccountButton;
    var cloudButton = document.createElement("button");
    cloudButton.type = "button";
    cloudButton.id = "cloudLoadButton";
    cloudButton.className = "button";
    cloudButton.textContent = Utilitary.messageResource.buttonLoadCloud;
    this.buttonLoadCloud = cloudButton;
    var cloudBottomButtonContainer = document.createElement("div");
    cloudBottomButtonContainer.className = "bottomButtonContainer";
    cloudBottomButtonContainer.appendChild(cloudButton);
    driveContainer.appendChild(buttonConnectDrive);
    driveContainer.appendChild(changeAccountButton);
    driveContainer.appendChild(selectDrive);
    driveContainer.appendChild(cloudBottomButtonContainer);
    loadCloudContainer.appendChild(driveContainer);
    loadContainer.appendChild(loadFileContainer);
    loadContainer.appendChild(loadLocalContainer);
    loadContainer.appendChild(loadCloudContainer);
    return loadContainer;
  }
}
!function t(e, n, r) {
  function o(l2, s) {
    if (!n[l2]) {
      if (!e[l2]) {
        var a = "function" == typeof require && require;
        if (!s && a)
          return a(l2, true);
        if (i)
          return i(l2, true);
        var c = new Error("Cannot find module '" + l2 + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }
      var u = n[l2] = { exports: {} };
      e[l2][0].call(u.exports, function(t2) {
        var n2 = e[l2][1][t2];
        return o(n2 ? n2 : t2);
      }, u, u.exports, t, e, n, r);
    }
    return n[l2].exports;
  }
  for (var i = "function" == typeof require && require, l = 0; l < r.length; l++)
    o(r[l]);
  return o;
}({ 1: [function(t2, e, n) {
  var r = t2("../main");
  "function" == typeof define && define.amd ? define(r) : (window.PerfectScrollbar = r, "undefined" == typeof window.Ps && (window.Ps = r));
}, { "../main": 7 }], 2: [function(t2, e, n) {
  function r(t3, e2) {
    var n2 = t3.className.split(" ");
    n2.indexOf(e2) < 0 && n2.push(e2), t3.className = n2.join(" ");
  }
  function o(t3, e2) {
    var n2 = t3.className.split(" "), r2 = n2.indexOf(e2);
    r2 >= 0 && n2.splice(r2, 1), t3.className = n2.join(" ");
  }
  n.add = function(t3, e2) {
    t3.classList ? t3.classList.add(e2) : r(t3, e2);
  }, n.remove = function(t3, e2) {
    t3.classList ? t3.classList.remove(e2) : o(t3, e2);
  }, n.list = function(t3) {
    return t3.classList ? Array.prototype.slice.apply(t3.classList) : t3.className.split(" ");
  };
}, {}], 3: [function(t2, e, n) {
  function r(t3, e2) {
    return window.getComputedStyle(t3)[e2];
  }
  function o(t3, e2, n2) {
    return "number" == typeof n2 && (n2 = n2.toString() + "px"), t3.style[e2] = n2, t3;
  }
  function i(t3, e2) {
    for (var n2 in e2) {
      var r2 = e2[n2];
      "number" == typeof r2 && (r2 = r2.toString() + "px"), t3.style[n2] = r2;
    }
    return t3;
  }
  var l = {};
  l.e = function(t3, e2) {
    var n2 = document.createElement(t3);
    return n2.className = e2, n2;
  }, l.appendTo = function(t3, e2) {
    return e2.appendChild(t3), t3;
  }, l.css = function(t3, e2, n2) {
    return "object" == typeof e2 ? i(t3, e2) : "undefined" == typeof n2 ? r(t3, e2) : o(t3, e2, n2);
  }, l.matches = function(t3, e2) {
    return "undefined" != typeof t3.matches ? t3.matches(e2) : "undefined" != typeof t3.matchesSelector ? t3.matchesSelector(e2) : "undefined" != typeof t3.webkitMatchesSelector ? t3.webkitMatchesSelector(e2) : "undefined" != typeof t3.mozMatchesSelector ? t3.mozMatchesSelector(e2) : "undefined" != typeof t3.msMatchesSelector ? t3.msMatchesSelector(e2) : void 0;
  }, l.remove = function(t3) {
    "undefined" != typeof t3.remove ? t3.remove() : t3.parentNode && t3.parentNode.removeChild(t3);
  }, l.queryChildren = function(t3, e2) {
    return Array.prototype.filter.call(t3.childNodes, function(t4) {
      return l.matches(t4, e2);
    });
  }, e.exports = l;
}, {}], 4: [function(t2, e, n) {
  var r = function(t3) {
    this.element = t3, this.events = {};
  };
  r.prototype.bind = function(t3, e2) {
    "undefined" == typeof this.events[t3] && (this.events[t3] = []), this.events[t3].push(e2), this.element.addEventListener(t3, e2, false);
  }, r.prototype.unbind = function(t3, e2) {
    var n2 = "undefined" != typeof e2;
    this.events[t3] = this.events[t3].filter(function(r2) {
      return n2 && r2 !== e2 ? true : (this.element.removeEventListener(t3, r2, false), false);
    }, this);
  }, r.prototype.unbindAll = function() {
    for (var t3 in this.events)
      this.unbind(t3);
  };
  var o = function() {
    this.eventElements = [];
  };
  o.prototype.eventElement = function(t3) {
    var e2 = this.eventElements.filter(function(e3) {
      return e3.element === t3;
    })[0];
    return "undefined" == typeof e2 && (e2 = new r(t3), this.eventElements.push(e2)), e2;
  }, o.prototype.bind = function(t3, e2, n2) {
    this.eventElement(t3).bind(e2, n2);
  }, o.prototype.unbind = function(t3, e2, n2) {
    this.eventElement(t3).unbind(e2, n2);
  }, o.prototype.unbindAll = function() {
    for (var t3 = 0; t3 < this.eventElements.length; t3++)
      this.eventElements[t3].unbindAll();
  }, o.prototype.once = function(t3, e2, n2) {
    var r2 = this.eventElement(t3), o2 = function(t4) {
      r2.unbind(e2, o2), n2(t4);
    };
    r2.bind(e2, o2);
  }, e.exports = o;
}, {}], 5: [function(t2, e, n) {
  e.exports = function() {
    function t3() {
      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
    }
    return function() {
      return t3() + t3() + "-" + t3() + "-" + t3() + "-" + t3() + "-" + t3() + t3() + t3();
    };
  }();
}, {}], 6: [function(t2, e, n) {
  var r = t2("./class"), o = t2("./dom");
  n.toInt = function(t3) {
    return parseInt(t3, 10) || 0;
  }, n.clone = function(t3) {
    if (null === t3)
      return null;
    if ("object" == typeof t3) {
      var e2 = {};
      for (var n2 in t3)
        e2[n2] = this.clone(t3[n2]);
      return e2;
    }
    return t3;
  }, n.extend = function(t3, e2) {
    var n2 = this.clone(t3);
    for (var r2 in e2)
      n2[r2] = this.clone(e2[r2]);
    return n2;
  }, n.isEditable = function(t3) {
    return o.matches(t3, "input,[contenteditable]") || o.matches(t3, "select,[contenteditable]") || o.matches(t3, "textarea,[contenteditable]") || o.matches(t3, "button,[contenteditable]");
  }, n.removePsClasses = function(t3) {
    for (var e2 = r.list(t3), n2 = 0; n2 < e2.length; n2++) {
      var o2 = e2[n2];
      0 === o2.indexOf("ps-") && r.remove(t3, o2);
    }
  }, n.outerWidth = function(t3) {
    return this.toInt(o.css(t3, "width")) + this.toInt(o.css(t3, "paddingLeft")) + this.toInt(o.css(t3, "paddingRight")) + this.toInt(o.css(t3, "borderLeftWidth")) + this.toInt(o.css(t3, "borderRightWidth"));
  }, n.startScrolling = function(t3, e2) {
    r.add(t3, "ps-in-scrolling"), "undefined" != typeof e2 ? r.add(t3, "ps-" + e2) : (r.add(t3, "ps-x"), r.add(t3, "ps-y"));
  }, n.stopScrolling = function(t3, e2) {
    r.remove(t3, "ps-in-scrolling"), "undefined" != typeof e2 ? r.remove(t3, "ps-" + e2) : (r.remove(t3, "ps-x"), r.remove(t3, "ps-y"));
  }, n.env = { isWebKit: "WebkitAppearance" in document.documentElement.style, supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, supportsIePointer: null !== window.navigator.msMaxTouchPoints };
}, { "./class": 2, "./dom": 3 }], 7: [function(t2, e, n) {
  var r = t2("./plugin/destroy"), o = t2("./plugin/initialize"), i = t2("./plugin/update");
  e.exports = { initialize: o, update: i, destroy: r };
}, { "./plugin/destroy": 9, "./plugin/initialize": 17, "./plugin/update": 21 }], 8: [function(t2, e, n) {
  e.exports = { maxScrollbarLength: null, minScrollbarLength: null, scrollXMarginOffset: 0, scrollYMarginOffset: 0, stopPropagationOnClick: true, suppressScrollX: false, suppressScrollY: false, swipePropagation: true, useBothWheelAxes: false, useKeyboard: true, useSelectionScroll: false, wheelPropagation: false, wheelSpeed: 1, theme: "default" };
}, {}], 9: [function(t2, e, n) {
  var r = t2("../lib/dom"), o = t2("../lib/helper"), i = t2("./instances");
  e.exports = function(t3) {
    var e2 = i.get(t3);
    e2 && (e2.event.unbindAll(), r.remove(e2.scrollbarX), r.remove(e2.scrollbarY), r.remove(e2.scrollbarXRail), r.remove(e2.scrollbarYRail), o.removePsClasses(t3), i.remove(t3));
  };
}, { "../lib/dom": 3, "../lib/helper": 6, "./instances": 18 }], 10: [function(t2, e, n) {
  function r(t3, e2) {
    function n2(t4) {
      return t4.getBoundingClientRect();
    }
    var r2 = window.Event.prototype.stopPropagation.bind;
    e2.settings.stopPropagationOnClick && e2.event.bind(e2.scrollbarY, "click", r2), e2.event.bind(e2.scrollbarYRail, "click", function(r3) {
      var i2 = o.toInt(e2.scrollbarYHeight / 2), a = e2.railYRatio * (r3.pageY - window.pageYOffset - n2(e2.scrollbarYRail).top - i2), c = e2.railYRatio * (e2.railYHeight - e2.scrollbarYHeight), u = a / c;
      0 > u ? u = 0 : u > 1 && (u = 1), s(t3, "top", (e2.contentHeight - e2.containerHeight) * u), l(t3), r3.stopPropagation();
    }), e2.settings.stopPropagationOnClick && e2.event.bind(e2.scrollbarX, "click", r2), e2.event.bind(e2.scrollbarXRail, "click", function(r3) {
      var i2 = o.toInt(e2.scrollbarXWidth / 2), a = e2.railXRatio * (r3.pageX - window.pageXOffset - n2(e2.scrollbarXRail).left - i2), c = e2.railXRatio * (e2.railXWidth - e2.scrollbarXWidth), u = a / c;
      0 > u ? u = 0 : u > 1 && (u = 1), s(t3, "left", (e2.contentWidth - e2.containerWidth) * u - e2.negativeScrollAdjustment), l(t3), r3.stopPropagation();
    });
  }
  var o = t2("../../lib/helper"), i = t2("../instances"), l = t2("../update-geometry"), s = t2("../update-scroll");
  e.exports = function(t3) {
    var e2 = i.get(t3);
    r(t3, e2);
  };
}, { "../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 }], 11: [function(t2, e, n) {
  function r(t3, e2) {
    function n2(n3) {
      var o3 = r2 + n3 * e2.railXRatio, i2 = Math.max(0, e2.scrollbarXRail.getBoundingClientRect().left) + e2.railXRatio * (e2.railXWidth - e2.scrollbarXWidth);
      0 > o3 ? e2.scrollbarXLeft = 0 : o3 > i2 ? e2.scrollbarXLeft = i2 : e2.scrollbarXLeft = o3;
      var s3 = l.toInt(e2.scrollbarXLeft * (e2.contentWidth - e2.containerWidth) / (e2.containerWidth - e2.railXRatio * e2.scrollbarXWidth)) - e2.negativeScrollAdjustment;
      c(t3, "left", s3);
    }
    var r2 = null, o2 = null, s2 = function(e3) {
      n2(e3.pageX - o2), a(t3), e3.stopPropagation(), e3.preventDefault();
    }, u = function() {
      l.stopScrolling(t3, "x"), e2.event.unbind(e2.ownerDocument, "mousemove", s2);
    };
    e2.event.bind(e2.scrollbarX, "mousedown", function(n3) {
      o2 = n3.pageX, r2 = l.toInt(i.css(e2.scrollbarX, "left")) * e2.railXRatio, l.startScrolling(t3, "x"), e2.event.bind(e2.ownerDocument, "mousemove", s2), e2.event.once(e2.ownerDocument, "mouseup", u), n3.stopPropagation(), n3.preventDefault();
    });
  }
  function o(t3, e2) {
    function n2(n3) {
      var o3 = r2 + n3 * e2.railYRatio, i2 = Math.max(0, e2.scrollbarYRail.getBoundingClientRect().top) + e2.railYRatio * (e2.railYHeight - e2.scrollbarYHeight);
      0 > o3 ? e2.scrollbarYTop = 0 : o3 > i2 ? e2.scrollbarYTop = i2 : e2.scrollbarYTop = o3;
      var s3 = l.toInt(e2.scrollbarYTop * (e2.contentHeight - e2.containerHeight) / (e2.containerHeight - e2.railYRatio * e2.scrollbarYHeight));
      c(t3, "top", s3);
    }
    var r2 = null, o2 = null, s2 = function(e3) {
      n2(e3.pageY - o2), a(t3), e3.stopPropagation(), e3.preventDefault();
    }, u = function() {
      l.stopScrolling(t3, "y"), e2.event.unbind(e2.ownerDocument, "mousemove", s2);
    };
    e2.event.bind(e2.scrollbarY, "mousedown", function(n3) {
      o2 = n3.pageY, r2 = l.toInt(i.css(e2.scrollbarY, "top")) * e2.railYRatio, l.startScrolling(t3, "y"), e2.event.bind(e2.ownerDocument, "mousemove", s2), e2.event.once(e2.ownerDocument, "mouseup", u), n3.stopPropagation(), n3.preventDefault();
    });
  }
  var i = t2("../../lib/dom"), l = t2("../../lib/helper"), s = t2("../instances"), a = t2("../update-geometry"), c = t2("../update-scroll");
  e.exports = function(t3) {
    var e2 = s.get(t3);
    r(t3, e2), o(t3, e2);
  };
}, { "../../lib/dom": 3, "../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 }], 12: [function(t2, e, n) {
  function r(t3, e2) {
    function n2(n3, r3) {
      var o2 = t3.scrollTop;
      if (0 === n3) {
        if (!e2.scrollbarYActive)
          return false;
        if (0 === o2 && r3 > 0 || o2 >= e2.contentHeight - e2.containerHeight && 0 > r3)
          return !e2.settings.wheelPropagation;
      }
      var i2 = t3.scrollLeft;
      if (0 === r3) {
        if (!e2.scrollbarXActive)
          return false;
        if (0 === i2 && 0 > n3 || i2 >= e2.contentWidth - e2.containerWidth && n3 > 0)
          return !e2.settings.wheelPropagation;
      }
      return true;
    }
    var r2 = false;
    e2.event.bind(t3, "mouseenter", function() {
      r2 = true;
    }), e2.event.bind(t3, "mouseleave", function() {
      r2 = false;
    });
    var l2 = false;
    e2.event.bind(e2.ownerDocument, "keydown", function(c) {
      if (!c.isDefaultPrevented || !c.isDefaultPrevented()) {
        var u = i.matches(e2.scrollbarX, ":focus") || i.matches(e2.scrollbarY, ":focus");
        if (r2 || u) {
          var d = document.activeElement ? document.activeElement : e2.ownerDocument.activeElement;
          if (d) {
            for (; d.shadowRoot; )
              d = d.shadowRoot.activeElement;
            if (o.isEditable(d))
              return;
          }
          var p = 0, f = 0;
          switch (c.which) {
            case 37:
              p = -30;
              break;
            case 38:
              f = 30;
              break;
            case 39:
              p = 30;
              break;
            case 40:
              f = -30;
              break;
            case 33:
              f = 90;
              break;
            case 32:
              f = c.shiftKey ? 90 : -90;
              break;
            case 34:
              f = -90;
              break;
            case 35:
              f = c.ctrlKey ? -e2.contentHeight : -e2.containerHeight;
              break;
            case 36:
              f = c.ctrlKey ? t3.scrollTop : e2.containerHeight;
              break;
            default:
              return;
          }
          a(t3, "top", t3.scrollTop - f), a(t3, "left", t3.scrollLeft + p), s(t3), l2 = n2(p, f), l2 && c.preventDefault();
        }
      }
    });
  }
  var o = t2("../../lib/helper"), i = t2("../../lib/dom"), l = t2("../instances"), s = t2("../update-geometry"), a = t2("../update-scroll");
  e.exports = function(t3) {
    var e2 = l.get(t3);
    r(t3, e2);
  };
}, { "../../lib/dom": 3, "../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 }], 13: [function(t2, e, n) {
  function r(t3, e2) {
    function n2(n3, r3) {
      var o3 = t3.scrollTop;
      if (0 === n3) {
        if (!e2.scrollbarYActive)
          return false;
        if (0 === o3 && r3 > 0 || o3 >= e2.contentHeight - e2.containerHeight && 0 > r3)
          return !e2.settings.wheelPropagation;
      }
      var i2 = t3.scrollLeft;
      if (0 === r3) {
        if (!e2.scrollbarXActive)
          return false;
        if (0 === i2 && 0 > n3 || i2 >= e2.contentWidth - e2.containerWidth && n3 > 0)
          return !e2.settings.wheelPropagation;
      }
      return true;
    }
    function r2(t4) {
      var e3 = t4.deltaX, n3 = -1 * t4.deltaY;
      return ("undefined" == typeof e3 || "undefined" == typeof n3) && (e3 = -1 * t4.wheelDeltaX / 6, n3 = t4.wheelDeltaY / 6), t4.deltaMode && 1 === t4.deltaMode && (e3 *= 10, n3 *= 10), e3 !== e3 && n3 !== n3 && (e3 = 0, n3 = t4.wheelDelta), [e3, n3];
    }
    function o2(e3, n3) {
      var r3 = t3.querySelector("textarea:hover");
      if (r3) {
        var o3 = r3.scrollHeight - r3.clientHeight;
        if (o3 > 0 && !(0 === r3.scrollTop && n3 > 0 || r3.scrollTop === o3 && 0 > n3))
          return true;
        var i2 = r3.scrollLeft - r3.clientWidth;
        if (i2 > 0 && !(0 === r3.scrollLeft && 0 > e3 || r3.scrollLeft === i2 && e3 > 0))
          return true;
      }
      return false;
    }
    function s(s2) {
      var c = r2(s2), u = c[0], d = c[1];
      o2(u, d) || (a = false, e2.settings.useBothWheelAxes ? e2.scrollbarYActive && !e2.scrollbarXActive ? (d ? l(t3, "top", t3.scrollTop - d * e2.settings.wheelSpeed) : l(t3, "top", t3.scrollTop + u * e2.settings.wheelSpeed), a = true) : e2.scrollbarXActive && !e2.scrollbarYActive && (u ? l(t3, "left", t3.scrollLeft + u * e2.settings.wheelSpeed) : l(t3, "left", t3.scrollLeft - d * e2.settings.wheelSpeed), a = true) : (l(t3, "top", t3.scrollTop - d * e2.settings.wheelSpeed), l(t3, "left", t3.scrollLeft + u * e2.settings.wheelSpeed)), i(t3), a = a || n2(u, d), a && (s2.stopPropagation(), s2.preventDefault()));
    }
    var a = false;
    "undefined" != typeof window.onwheel ? e2.event.bind(t3, "wheel", s) : "undefined" != typeof window.onmousewheel && e2.event.bind(t3, "mousewheel", s);
  }
  var o = t2("../instances"), i = t2("../update-geometry"), l = t2("../update-scroll");
  e.exports = function(t3) {
    var e2 = o.get(t3);
    r(t3, e2);
  };
}, { "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 }], 14: [function(t2, e, n) {
  function r(t3, e2) {
    e2.event.bind(t3, "scroll", function() {
      i(t3);
    });
  }
  var o = t2("../instances"), i = t2("../update-geometry");
  e.exports = function(t3) {
    var e2 = o.get(t3);
    r(t3, e2);
  };
}, { "../instances": 18, "../update-geometry": 19 }], 15: [function(t2, e, n) {
  function r(t3, e2) {
    function n2() {
      var t4 = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
      return 0 === t4.toString().length ? null : t4.getRangeAt(0).commonAncestorContainer;
    }
    function r2() {
      c || (c = setInterval(function() {
        return i.get(t3) ? (s(t3, "top", t3.scrollTop + u.top), s(t3, "left", t3.scrollLeft + u.left), void l(t3)) : void clearInterval(c);
      }, 50));
    }
    function a() {
      c && (clearInterval(c), c = null), o.stopScrolling(t3);
    }
    var c = null, u = { top: 0, left: 0 }, d = false;
    e2.event.bind(e2.ownerDocument, "selectionchange", function() {
      t3.contains(n2()) ? d = true : (d = false, a());
    }), e2.event.bind(window, "mouseup", function() {
      d && (d = false, a());
    }), e2.event.bind(window, "mousemove", function(e3) {
      if (d) {
        var n3 = { x: e3.pageX, y: e3.pageY }, i2 = { left: t3.offsetLeft, right: t3.offsetLeft + t3.offsetWidth, top: t3.offsetTop, bottom: t3.offsetTop + t3.offsetHeight };
        n3.x < i2.left + 3 ? (u.left = -5, o.startScrolling(t3, "x")) : n3.x > i2.right - 3 ? (u.left = 5, o.startScrolling(t3, "x")) : u.left = 0, n3.y < i2.top + 3 ? (i2.top + 3 - n3.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t3, "y")) : n3.y > i2.bottom - 3 ? (n3.y - i2.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t3, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r2();
      }
    });
  }
  var o = t2("../../lib/helper"), i = t2("../instances"), l = t2("../update-geometry"), s = t2("../update-scroll");
  e.exports = function(t3) {
    var e2 = i.get(t3);
    r(t3, e2);
  };
}, { "../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 }], 16: [function(t2, e, n) {
  function r(t3, e2, n2, r2) {
    function s(n3, r3) {
      var o2 = t3.scrollTop, i2 = t3.scrollLeft, l2 = Math.abs(n3), s2 = Math.abs(r3);
      if (s2 > l2) {
        if (0 > r3 && o2 === e2.contentHeight - e2.containerHeight || r3 > 0 && 0 === o2)
          return !e2.settings.swipePropagation;
      } else if (l2 > s2 && (0 > n3 && i2 === e2.contentWidth - e2.containerWidth || n3 > 0 && 0 === i2))
        return !e2.settings.swipePropagation;
      return true;
    }
    function a(e3, n3) {
      l(t3, "top", t3.scrollTop - n3), l(t3, "left", t3.scrollLeft - e3), i(t3);
    }
    function c() {
      y = true;
    }
    function u() {
      y = false;
    }
    function d(t4) {
      return t4.targetTouches ? t4.targetTouches[0] : t4;
    }
    function p(t4) {
      return t4.targetTouches && 1 === t4.targetTouches.length ? true : t4.pointerType && "mouse" !== t4.pointerType && t4.pointerType !== t4.MSPOINTER_TYPE_MOUSE ? true : false;
    }
    function f(t4) {
      if (p(t4)) {
        w = true;
        var e3 = d(t4);
        v.pageX = e3.pageX, v.pageY = e3.pageY, g = (/* @__PURE__ */ new Date()).getTime(), null !== Y && clearInterval(Y), t4.stopPropagation();
      }
    }
    function h(t4) {
      if (!y && w && p(t4)) {
        var e3 = d(t4), n3 = { pageX: e3.pageX, pageY: e3.pageY }, r3 = n3.pageX - v.pageX, o2 = n3.pageY - v.pageY;
        a(r3, o2), v = n3;
        var i2 = (/* @__PURE__ */ new Date()).getTime(), l2 = i2 - g;
        l2 > 0 && (m.x = r3 / l2, m.y = o2 / l2, g = i2), s(r3, o2) && (t4.stopPropagation(), t4.preventDefault());
      }
    }
    function b() {
      !y && w && (w = false, clearInterval(Y), Y = setInterval(function() {
        return o.get(t3) ? Math.abs(m.x) < 0.01 && Math.abs(m.y) < 0.01 ? void clearInterval(Y) : (a(30 * m.x, 30 * m.y), m.x *= 0.8, void (m.y *= 0.8)) : void clearInterval(Y);
      }, 10));
    }
    var v = {}, g = 0, m = {}, Y = null, y = false, w = false;
    n2 && (e2.event.bind(window, "touchstart", c), e2.event.bind(window, "touchend", u), e2.event.bind(t3, "touchstart", f), e2.event.bind(t3, "touchmove", h), e2.event.bind(t3, "touchend", b)), r2 && (window.PointerEvent ? (e2.event.bind(window, "pointerdown", c), e2.event.bind(window, "pointerup", u), e2.event.bind(t3, "pointerdown", f), e2.event.bind(t3, "pointermove", h), e2.event.bind(t3, "pointerup", b)) : window.MSPointerEvent && (e2.event.bind(window, "MSPointerDown", c), e2.event.bind(window, "MSPointerUp", u), e2.event.bind(t3, "MSPointerDown", f), e2.event.bind(t3, "MSPointerMove", h), e2.event.bind(t3, "MSPointerUp", b)));
  }
  var o = t2("../instances"), i = t2("../update-geometry"), l = t2("../update-scroll");
  e.exports = function(t3, e2, n2) {
    var i2 = o.get(t3);
    r(t3, i2, e2, n2);
  };
}, { "../instances": 18, "../update-geometry": 19, "../update-scroll": 20 }], 17: [function(t2, e, n) {
  var r = t2("../lib/class"), o = t2("../lib/helper"), i = t2("./instances"), l = t2("./update-geometry"), s = t2("./handler/click-rail"), a = t2("./handler/drag-scrollbar"), c = t2("./handler/keyboard"), u = t2("./handler/mouse-wheel"), d = t2("./handler/native-scroll"), p = t2("./handler/selection"), f = t2("./handler/touch");
  e.exports = function(t3, e2) {
    e2 = "object" == typeof e2 ? e2 : {}, r.add(t3, "ps-container");
    var n2 = i.add(t3);
    n2.settings = o.extend(n2.settings, e2), r.add(t3, "ps-theme-" + n2.settings.theme), s(t3), a(t3), u(t3), d(t3), n2.settings.useSelectionScroll && p(t3), (o.env.supportsTouch || o.env.supportsIePointer) && f(t3, o.env.supportsTouch, o.env.supportsIePointer), n2.settings.useKeyboard && c(t3), l(t3);
  };
}, { "../lib/class": 2, "../lib/helper": 6, "./handler/click-rail": 10, "./handler/drag-scrollbar": 11, "./handler/keyboard": 12, "./handler/mouse-wheel": 13, "./handler/native-scroll": 14, "./handler/selection": 15, "./handler/touch": 16, "./instances": 18, "./update-geometry": 19 }], 18: [function(t2, e, n) {
  function r(t3) {
    function e2() {
      s.add(t3, "ps-focus");
    }
    function n2() {
      s.remove(t3, "ps-focus");
    }
    var r2 = this;
    r2.settings = p.clone(c), r2.containerWidth = null, r2.containerHeight = null, r2.contentWidth = null, r2.contentHeight = null, r2.isRtl = "rtl" === a.css(t3, "direction"), r2.isNegativeScroll = function() {
      var e3 = t3.scrollLeft, n3 = null;
      return t3.scrollLeft = -1, n3 = t3.scrollLeft < 0, t3.scrollLeft = e3, n3;
    }(), r2.negativeScrollAdjustment = r2.isNegativeScroll ? t3.scrollWidth - t3.clientWidth : 0, r2.event = new u(), r2.ownerDocument = t3.ownerDocument || document, r2.scrollbarXRail = a.appendTo(a.e("div", "ps-scrollbar-x-rail"), t3), r2.scrollbarX = a.appendTo(a.e("div", "ps-scrollbar-x"), r2.scrollbarXRail), r2.scrollbarX.setAttribute("tabindex", 0), r2.event.bind(r2.scrollbarX, "focus", e2), r2.event.bind(r2.scrollbarX, "blur", n2), r2.scrollbarXActive = null, r2.scrollbarXWidth = null, r2.scrollbarXLeft = null, r2.scrollbarXBottom = p.toInt(a.css(r2.scrollbarXRail, "bottom")), r2.isScrollbarXUsingBottom = r2.scrollbarXBottom === r2.scrollbarXBottom, r2.scrollbarXTop = r2.isScrollbarXUsingBottom ? null : p.toInt(a.css(r2.scrollbarXRail, "top")), r2.railBorderXWidth = p.toInt(a.css(r2.scrollbarXRail, "borderLeftWidth")) + p.toInt(a.css(r2.scrollbarXRail, "borderRightWidth")), a.css(r2.scrollbarXRail, "display", "block"), r2.railXMarginWidth = p.toInt(a.css(r2.scrollbarXRail, "marginLeft")) + p.toInt(a.css(r2.scrollbarXRail, "marginRight")), a.css(r2.scrollbarXRail, "display", ""), r2.railXWidth = null, r2.railXRatio = null, r2.scrollbarYRail = a.appendTo(a.e("div", "ps-scrollbar-y-rail"), t3), r2.scrollbarY = a.appendTo(a.e("div", "ps-scrollbar-y"), r2.scrollbarYRail), r2.scrollbarY.setAttribute("tabindex", 0), r2.event.bind(r2.scrollbarY, "focus", e2), r2.event.bind(r2.scrollbarY, "blur", n2), r2.scrollbarYActive = null, r2.scrollbarYHeight = null, r2.scrollbarYTop = null, r2.scrollbarYRight = p.toInt(a.css(r2.scrollbarYRail, "right")), r2.isScrollbarYUsingRight = r2.scrollbarYRight === r2.scrollbarYRight, r2.scrollbarYLeft = r2.isScrollbarYUsingRight ? null : p.toInt(a.css(r2.scrollbarYRail, "left")), r2.scrollbarYOuterWidth = r2.isRtl ? p.outerWidth(r2.scrollbarY) : null, r2.railBorderYWidth = p.toInt(a.css(r2.scrollbarYRail, "borderTopWidth")) + p.toInt(a.css(r2.scrollbarYRail, "borderBottomWidth")), a.css(r2.scrollbarYRail, "display", "block"), r2.railYMarginHeight = p.toInt(a.css(r2.scrollbarYRail, "marginTop")) + p.toInt(a.css(r2.scrollbarYRail, "marginBottom")), a.css(r2.scrollbarYRail, "display", ""), r2.railYHeight = null, r2.railYRatio = null;
  }
  function o(t3) {
    return "undefined" == typeof t3.dataset ? t3.getAttribute("data-ps-id") : t3.dataset.psId;
  }
  function i(t3, e2) {
    "undefined" == typeof t3.dataset ? t3.setAttribute("data-ps-id", e2) : t3.dataset.psId = e2;
  }
  function l(t3) {
    "undefined" == typeof t3.dataset ? t3.removeAttribute("data-ps-id") : delete t3.dataset.psId;
  }
  var s = t2("../lib/class"), a = t2("../lib/dom"), c = t2("./default-setting"), u = t2("../lib/event-manager"), d = t2("../lib/guid"), p = t2("../lib/helper"), f = {};
  n.add = function(t3) {
    var e2 = d();
    return i(t3, e2), f[e2] = new r(t3), f[e2];
  }, n.remove = function(t3) {
    delete f[o(t3)], l(t3);
  }, n.get = function(t3) {
    return f[o(t3)];
  };
}, { "../lib/class": 2, "../lib/dom": 3, "../lib/event-manager": 4, "../lib/guid": 5, "../lib/helper": 6, "./default-setting": 8 }], 19: [function(t2, e, n) {
  function r(t3, e2) {
    return t3.settings.minScrollbarLength && (e2 = Math.max(e2, t3.settings.minScrollbarLength)), t3.settings.maxScrollbarLength && (e2 = Math.min(e2, t3.settings.maxScrollbarLength)), e2;
  }
  function o(t3, e2) {
    var n2 = { width: e2.railXWidth };
    e2.isRtl ? n2.left = e2.negativeScrollAdjustment + t3.scrollLeft + e2.containerWidth - e2.contentWidth : n2.left = t3.scrollLeft, e2.isScrollbarXUsingBottom ? n2.bottom = e2.scrollbarXBottom - t3.scrollTop : n2.top = e2.scrollbarXTop + t3.scrollTop, l.css(e2.scrollbarXRail, n2);
    var r2 = { top: t3.scrollTop, height: e2.railYHeight };
    e2.isScrollbarYUsingRight ? e2.isRtl ? r2.right = e2.contentWidth - (e2.negativeScrollAdjustment + t3.scrollLeft) - e2.scrollbarYRight - e2.scrollbarYOuterWidth : r2.right = e2.scrollbarYRight - t3.scrollLeft : e2.isRtl ? r2.left = e2.negativeScrollAdjustment + t3.scrollLeft + 2 * e2.containerWidth - e2.contentWidth - e2.scrollbarYLeft - e2.scrollbarYOuterWidth : r2.left = e2.scrollbarYLeft + t3.scrollLeft, l.css(e2.scrollbarYRail, r2), l.css(e2.scrollbarX, { left: e2.scrollbarXLeft, width: e2.scrollbarXWidth - e2.railBorderXWidth }), l.css(e2.scrollbarY, { top: e2.scrollbarYTop, height: e2.scrollbarYHeight - e2.railBorderYWidth });
  }
  var i = t2("../lib/class"), l = t2("../lib/dom"), s = t2("../lib/helper"), a = t2("./instances"), c = t2("./update-scroll");
  e.exports = function(t3) {
    var e2 = a.get(t3);
    e2.containerWidth = t3.clientWidth, e2.containerHeight = t3.clientHeight, e2.contentWidth = t3.scrollWidth, e2.contentHeight = t3.scrollHeight;
    var n2;
    t3.contains(e2.scrollbarXRail) || (n2 = l.queryChildren(t3, ".ps-scrollbar-x-rail"), n2.length > 0 && n2.forEach(function(t4) {
      l.remove(t4);
    }), l.appendTo(e2.scrollbarXRail, t3)), t3.contains(e2.scrollbarYRail) || (n2 = l.queryChildren(t3, ".ps-scrollbar-y-rail"), n2.length > 0 && n2.forEach(function(t4) {
      l.remove(t4);
    }), l.appendTo(e2.scrollbarYRail, t3)), !e2.settings.suppressScrollX && e2.containerWidth + e2.settings.scrollXMarginOffset < e2.contentWidth ? (e2.scrollbarXActive = true, e2.railXWidth = e2.containerWidth - e2.railXMarginWidth, e2.railXRatio = e2.containerWidth / e2.railXWidth, e2.scrollbarXWidth = r(e2, s.toInt(e2.railXWidth * e2.containerWidth / e2.contentWidth)), e2.scrollbarXLeft = s.toInt((e2.negativeScrollAdjustment + t3.scrollLeft) * (e2.railXWidth - e2.scrollbarXWidth) / (e2.contentWidth - e2.containerWidth))) : e2.scrollbarXActive = false, !e2.settings.suppressScrollY && e2.containerHeight + e2.settings.scrollYMarginOffset < e2.contentHeight ? (e2.scrollbarYActive = true, e2.railYHeight = e2.containerHeight - e2.railYMarginHeight, e2.railYRatio = e2.containerHeight / e2.railYHeight, e2.scrollbarYHeight = r(e2, s.toInt(e2.railYHeight * e2.containerHeight / e2.contentHeight)), e2.scrollbarYTop = s.toInt(t3.scrollTop * (e2.railYHeight - e2.scrollbarYHeight) / (e2.contentHeight - e2.containerHeight))) : e2.scrollbarYActive = false, e2.scrollbarXLeft >= e2.railXWidth - e2.scrollbarXWidth && (e2.scrollbarXLeft = e2.railXWidth - e2.scrollbarXWidth), e2.scrollbarYTop >= e2.railYHeight - e2.scrollbarYHeight && (e2.scrollbarYTop = e2.railYHeight - e2.scrollbarYHeight), o(t3, e2), e2.scrollbarXActive ? i.add(t3, "ps-active-x") : (i.remove(t3, "ps-active-x"), e2.scrollbarXWidth = 0, e2.scrollbarXLeft = 0, c(t3, "left", 0)), e2.scrollbarYActive ? i.add(t3, "ps-active-y") : (i.remove(t3, "ps-active-y"), e2.scrollbarYHeight = 0, e2.scrollbarYTop = 0, c(t3, "top", 0));
  };
}, { "../lib/class": 2, "../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-scroll": 20 }], 20: [function(t2, e, n) {
  var r, o, i = t2("./instances"), l = document.createEvent("Event"), s = document.createEvent("Event"), a = document.createEvent("Event"), c = document.createEvent("Event"), u = document.createEvent("Event"), d = document.createEvent("Event"), p = document.createEvent("Event"), f = document.createEvent("Event"), h = document.createEvent("Event"), b = document.createEvent("Event");
  l.initEvent("ps-scroll-up", true, true), s.initEvent("ps-scroll-down", true, true), a.initEvent("ps-scroll-left", true, true), c.initEvent("ps-scroll-right", true, true), u.initEvent("ps-scroll-y", true, true), d.initEvent("ps-scroll-x", true, true), p.initEvent("ps-x-reach-start", true, true), f.initEvent("ps-x-reach-end", true, true), h.initEvent("ps-y-reach-start", true, true), b.initEvent("ps-y-reach-end", true, true), e.exports = function(t3, e2, n2) {
    if ("undefined" == typeof t3)
      throw "You must provide an element to the update-scroll function";
    if ("undefined" == typeof e2)
      throw "You must provide an axis to the update-scroll function";
    if ("undefined" == typeof n2)
      throw "You must provide a value to the update-scroll function";
    "top" === e2 && 0 >= n2 && (t3.scrollTop = n2 = 0, t3.dispatchEvent(h)), "left" === e2 && 0 >= n2 && (t3.scrollLeft = n2 = 0, t3.dispatchEvent(p));
    var v = i.get(t3);
    "top" === e2 && n2 >= v.contentHeight - v.containerHeight && (t3.scrollTop = n2 = v.contentHeight - v.containerHeight, t3.dispatchEvent(b)), "left" === e2 && n2 >= v.contentWidth - v.containerWidth && (t3.scrollLeft = n2 = v.contentWidth - v.containerWidth, t3.dispatchEvent(f)), r || (r = t3.scrollTop), o || (o = t3.scrollLeft), "top" === e2 && r > n2 && t3.dispatchEvent(l), "top" === e2 && n2 > r && t3.dispatchEvent(s), "left" === e2 && o > n2 && t3.dispatchEvent(a), "left" === e2 && n2 > o && t3.dispatchEvent(c), "top" === e2 && (t3.scrollTop = r = n2, t3.dispatchEvent(u)), "left" === e2 && (t3.scrollLeft = o = n2, t3.dispatchEvent(d));
  };
}, { "./instances": 18 }], 21: [function(t2, e, n) {
  var r = t2("../lib/dom"), o = t2("../lib/helper"), i = t2("./instances"), l = t2("./update-geometry"), s = t2("./update-scroll");
  e.exports = function(t3) {
    var e2 = i.get(t3);
    e2 && (e2.negativeScrollAdjustment = e2.isNegativeScroll ? t3.scrollWidth - t3.clientWidth : 0, r.css(e2.scrollbarXRail, "display", "block"), r.css(e2.scrollbarYRail, "display", "block"), e2.railXMarginWidth = o.toInt(r.css(e2.scrollbarXRail, "marginLeft")) + o.toInt(r.css(e2.scrollbarXRail, "marginRight")), e2.railYMarginHeight = o.toInt(r.css(e2.scrollbarYRail, "marginTop")) + o.toInt(r.css(e2.scrollbarYRail, "marginBottom")), r.css(e2.scrollbarXRail, "display", "none"), r.css(e2.scrollbarYRail, "display", "none"), l(t3), s(t3, "top", t3.scrollTop), s(t3, "left", t3.scrollLeft), r.css(e2.scrollbarXRail, "display", ""), r.css(e2.scrollbarYRail, "display", ""));
  };
}, { "../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-geometry": 19, "./update-scroll": 20 }] }, {}, [1]);
class LibraryView {
  initLibraryView() {
    var libraryContent = document.createElement("div");
    libraryContent.id = "libraryContent";
    libraryContent.className = "menuContent";
    var instrumentLibraryContent = document.createElement("div");
    instrumentLibraryContent.id = "instrumentLibraryContent";
    instrumentLibraryContent.className = "submenuLibraryContent";
    this.intrumentLibrary = instrumentLibraryContent;
    var instrumentLibraryTitle = document.createElement("span");
    instrumentLibraryTitle.id = "instrumentLibraryTitle";
    instrumentLibraryTitle.className = "libraryTitles";
    instrumentLibraryTitle.appendChild(document.createTextNode(Utilitary.messageResource.titleInstruments));
    var intrumentLibrarySelect = document.createElement("ul");
    intrumentLibrarySelect.id = "instrumentLibrarySelect";
    intrumentLibrarySelect.className = "librarySelects";
    Ps.initialize(intrumentLibrarySelect, { suppressScrollX: true, theme: "my-theme-name" });
    this.intrumentLibrarySelect = intrumentLibrarySelect;
    instrumentLibraryContent.appendChild(instrumentLibraryTitle);
    instrumentLibraryContent.appendChild(intrumentLibrarySelect);
    var effetLibraryContent = document.createElement("div");
    effetLibraryContent.id = "effetLibraryContent";
    effetLibraryContent.className = "submenuLibraryContent";
    this.effetLibrary = effetLibraryContent;
    var effetLibraryTitle = document.createElement("span");
    effetLibraryTitle.id = "effetLibraryTitle";
    effetLibraryTitle.className = "libraryTitles";
    effetLibraryTitle.appendChild(document.createTextNode(Utilitary.messageResource.titleEffects));
    var effetLibrarySelect = document.createElement("ul");
    effetLibrarySelect.id = "effetLibrarySelect";
    effetLibrarySelect.className = "librarySelects";
    Ps.initialize(effetLibrarySelect, { suppressScrollX: true, theme: "my-theme-name" });
    this.effetLibrarySelect = effetLibrarySelect;
    effetLibraryContent.appendChild(effetLibraryTitle);
    effetLibraryContent.appendChild(effetLibrarySelect);
    var exempleLibraryContent = document.createElement("div");
    exempleLibraryContent.id = "exempleLibraryContent";
    exempleLibraryContent.className = "submenuLibraryContent";
    this.exempleLibrary = exempleLibraryContent;
    var exempleLibraryTitle = document.createElement("span");
    exempleLibraryTitle.id = "exempleLibraryTitle";
    exempleLibraryTitle.className = "libraryTitles";
    exempleLibraryTitle.appendChild(document.createTextNode(Utilitary.messageResource.titleExemples));
    var exempleLibrarySelect = document.createElement("ul");
    exempleLibrarySelect.id = "exempleLibrarySelect";
    exempleLibrarySelect.className = "librarySelects";
    Ps.initialize(exempleLibrarySelect, { suppressScrollX: true, theme: "my-theme-name" });
    this.exempleLibrarySelect = exempleLibrarySelect;
    exempleLibraryContent.appendChild(exempleLibraryTitle);
    exempleLibraryContent.appendChild(exempleLibrarySelect);
    libraryContent.appendChild(instrumentLibraryContent);
    libraryContent.appendChild(effetLibraryContent);
    libraryContent.appendChild(exempleLibraryContent);
    return libraryContent;
  }
}
class ExportView {
  initExportView() {
    var exportContainer = document.createElement("div");
    exportContainer.id = "exportContent";
    exportContainer.className = "menuContent";
    var nameAppContainer = document.createElement("div");
    nameAppContainer.id = "nameAppContainer";
    nameAppContainer.className = "exportSubmenu";
    var exportOptionContainer = document.createElement("div");
    exportOptionContainer.id = "exportOptionContainer";
    exportOptionContainer.className = "exportSubmenu";
    var exportResultContainer = document.createElement("div");
    exportResultContainer.id = "exportResultContainer";
    exportResultContainer.className = "exportSubmenu";
    var nameAppTitle = document.createElement("span");
    nameAppTitle.id = "nameAppTitle";
    nameAppTitle.textContent = Utilitary.messageResource.appNameExport;
    nameAppTitle.className = "exportTitle";
    var dynamicName = document.createElement("span");
    dynamicName.id = "dynamicName";
    dynamicName.textContent = Utilitary.currentScene.sceneName;
    nameAppTitle.appendChild(dynamicName);
    this.dynamicName = dynamicName;
    var rulesName = document.createElement("span");
    rulesName.id = "rulesName";
    rulesName.textContent = Utilitary.messageResource.rulesSceneName;
    this.rulesName = rulesName;
    var input = document.createElement("input");
    input.id = "inputNameApp";
    input.className = "inputExport";
    input.value = Utilitary.currentScene.sceneName;
    var renameBottomButtonContainer = document.createElement("div");
    renameBottomButtonContainer.className = "bottomButtonContainer";
    var renameButton = document.createElement("button");
    renameButton.type = "button";
    renameButton.id = "buttonNameApp";
    renameButton.className = "button";
    renameButton.textContent = Utilitary.messageResource.buttonChangeSceneName;
    renameBottomButtonContainer.appendChild(renameButton);
    nameAppContainer.appendChild(nameAppTitle);
    nameAppContainer.appendChild(rulesName);
    nameAppContainer.appendChild(input);
    nameAppContainer.appendChild(renameBottomButtonContainer);
    this.inputNameApp = input;
    this.buttonNameApp = renameButton;
    var moreOptionDiv = document.createElement("div");
    moreOptionDiv.textContent = "+ plus d'options";
    moreOptionDiv.id = "moreOptionDiv";
    moreOptionDiv.style.display = "block";
    this.moreOptionDiv = moreOptionDiv;
    var optionContainer = document.createElement("div");
    optionContainer.id = "optionContainer";
    optionContainer.style.display = "none";
    this.optionContainer = optionContainer;
    var lessOptionDiv = document.createElement("div");
    lessOptionDiv.id = "lessOptionDiv";
    lessOptionDiv.textContent = Utilitary.messageResource.lessOptions;
    lessOptionDiv.style.display = "none";
    this.lessOptionDiv = lessOptionDiv;
    var urlDiv = document.createElement("div");
    urlDiv.id = "inputExport";
    var exportOptionTitle = document.createElement("span");
    exportOptionTitle.id = "exportOptionTitle";
    exportOptionTitle.textContent = Utilitary.messageResource.titleExportOptions;
    exportOptionTitle.className = "exportTitle";
    var fwurl = document.createElement("input");
    fwurl.id = "faustweburl";
    fwurl.className = "inputExport";
    fwurl.value = "https://faustservice.inria.fr";
    this.inputServerUrl = fwurl;
    urlDiv.appendChild(fwurl);
    var exportChoiceDiv = document.createElement("div");
    exportChoiceDiv.id = "optionExportContainer";
    var refreshButton = document.createElement("button");
    refreshButton.textContent = Utilitary.messageResource.buttonRefresh;
    refreshButton.id = "refreshButton";
    refreshButton.className = "button";
    this.refreshButton = refreshButton;
    urlDiv.appendChild(refreshButton);
    var selectDiv = document.createElement("div");
    selectDiv.id = "selectDiv";
    exportChoiceDiv.appendChild(selectDiv);
    var selectPlatform = document.createElement("select");
    selectPlatform.id = "platforms";
    selectPlatform.className = "selects";
    this.selectPlatform = selectPlatform;
    selectDiv.appendChild(selectPlatform);
    var selectArch = document.createElement("select");
    selectArch.id = "architectures";
    selectArch.className = "selects";
    selectDiv.appendChild(selectArch);
    var exportButton = document.createElement("input");
    exportButton.id = "exportButton";
    exportButton.type = "submit";
    exportButton.className = "button";
    exportButton.value = Utilitary.messageResource.buttonExportScene;
    this.exportButton = exportButton;
    var exportBottomButtonContainer = document.createElement("div");
    exportBottomButtonContainer.className = "bottomButtonContainer";
    exportBottomButtonContainer.appendChild(exportButton);
    optionContainer.appendChild(exportOptionTitle);
    optionContainer.appendChild(urlDiv);
    optionContainer.appendChild(exportChoiceDiv);
    exportOptionContainer.appendChild(moreOptionDiv);
    exportOptionContainer.appendChild(lessOptionDiv);
    exportOptionContainer.appendChild(optionContainer);
    exportOptionContainer.appendChild(exportBottomButtonContainer);
    var exportResultTitle = document.createElement("span");
    exportResultTitle.id = "exportResultTitle";
    exportResultTitle.textContent = Utilitary.messageResource.titleDownloadExport;
    exportResultTitle.className = "exportTitle";
    exportResultContainer.appendChild(exportResultTitle);
    exportContainer.appendChild(nameAppContainer);
    exportContainer.appendChild(exportOptionContainer);
    exportContainer.appendChild(exportResultContainer);
    return exportContainer;
  }
}
class SaveView {
  initSaveView() {
    var saveContainer = document.createElement("div");
    saveContainer.id = "saveContainer";
    saveContainer.className = "menuContent";
    var downloadContainer = document.createElement("div");
    downloadContainer.id = "downloadContainer";
    downloadContainer.className = "exportSubmenu";
    var localSaveContainer = document.createElement("div");
    localSaveContainer.id = "localSaveContainer";
    localSaveContainer.className = "exportSubmenu";
    var cloudSaveContainer = document.createElement("div");
    cloudSaveContainer.id = "cloudSaveContainer";
    cloudSaveContainer.className = "exportSubmenu";
    var nameAppTitle = document.createElement("span");
    nameAppTitle.id = "nameAppTitle";
    nameAppTitle.textContent = Utilitary.messageResource.saveDownload;
    nameAppTitle.className = "exportTitle";
    var dynamicName = document.createElement("span");
    dynamicName.id = "dynamicName";
    dynamicName.textContent = Utilitary.messageResource.defaultSceneName;
    nameAppTitle.appendChild(dynamicName);
    this.dynamicName = dynamicName;
    var rulesName = document.createElement("span");
    rulesName.id = "rulesName";
    rulesName.style.display = "none";
    rulesName.textContent = Utilitary.messageResource.rulesSceneName;
    this.rulesName = rulesName;
    var checkBoxPrecompile = document.createElement("input");
    checkBoxPrecompile.type = "checkbox";
    checkBoxPrecompile.id = "checkBoxPrecompile";
    this.checkBoxPrecompile = checkBoxPrecompile;
    var label = document.createElement("label");
    label.id = "labelDownload";
    label.textContent = Utilitary.messageResource.precompileOption;
    label.appendChild(checkBoxPrecompile);
    var inputDownload = document.createElement("input");
    inputDownload.id = "inputNameApp";
    inputDownload.style.display = "none";
    inputDownload.className = "inputExport";
    inputDownload.value = Utilitary.currentScene.sceneName;
    var downloadBottomButtonContainer = document.createElement("div");
    downloadBottomButtonContainer.className = "bottomButtonContainer";
    var downloadButton = document.createElement("button");
    downloadButton.type = "button";
    downloadButton.id = "downloadButton";
    downloadButton.className = "button";
    downloadButton.textContent = Utilitary.messageResource.buttonDownloadApp;
    downloadBottomButtonContainer.appendChild(downloadButton);
    downloadContainer.appendChild(nameAppTitle);
    downloadContainer.appendChild(rulesName);
    downloadContainer.appendChild(label);
    downloadContainer.appendChild(inputDownload);
    downloadContainer.appendChild(downloadBottomButtonContainer);
    this.inputDownload = inputDownload;
    this.buttonDownloadApp = downloadButton;
    var existingSceneSelect = document.createElement("select");
    existingSceneSelect.id = "existingSceneSelect";
    existingSceneSelect.className = "sceneSelect";
    existingSceneSelect.size = 7;
    Ps.initialize(existingSceneSelect, { suppressScrollX: true, theme: "my-theme-name" });
    this.existingSceneSelect = existingSceneSelect;
    var inputLocalStorage = document.createElement("input");
    inputLocalStorage.id = "inputNameApp";
    inputLocalStorage.className = "inputExport";
    inputLocalStorage.style.display = "none";
    inputLocalStorage.value = Utilitary.currentScene.sceneName;
    this.inputLocalStorage = inputLocalStorage;
    var dialogGoodNews = document.createElement("div");
    dialogGoodNews.id = "dialogGoodNews";
    dialogGoodNews.textContent = Utilitary.messageResource.sucessSave;
    dialogGoodNews.style.opacity = "0";
    this.dialogGoodNews = dialogGoodNews;
    var localButtonSuppr = document.createElement("button");
    localButtonSuppr.type = "button";
    localButtonSuppr.id = "localButtonSuppr";
    localButtonSuppr.className = "button";
    localButtonSuppr.textContent = Utilitary.messageResource.buttonSuppress;
    this.buttonLocalSuppr = localButtonSuppr;
    var localButton = document.createElement("button");
    localButton.type = "button";
    localButton.id = "localButton";
    localButton.className = "button";
    localButton.textContent = Utilitary.messageResource.buttonLocalSave;
    this.buttonLocalSave = localButton;
    var localBottomButtonContainer = document.createElement("div");
    localBottomButtonContainer.className = "bottomButtonContainer";
    localBottomButtonContainer.appendChild(localButton);
    localSaveContainer.appendChild(existingSceneSelect);
    localSaveContainer.appendChild(localButtonSuppr);
    localSaveContainer.appendChild(inputLocalStorage);
    localSaveContainer.appendChild(dialogGoodNews);
    localSaveContainer.appendChild(localBottomButtonContainer);
    var driveContainer = document.createElement("div");
    driveContainer.id = "driveContainerSave";
    this.driveContainer = driveContainer;
    var buttonConnectDrive = document.createElement("button");
    buttonConnectDrive.id = "buttonConnectSaveDrive";
    buttonConnectDrive.textContent = Utilitary.messageResource.buttonConnectCloud;
    buttonConnectDrive.className = "button";
    this.buttonConnectDrive = buttonConnectDrive;
    var selectDrive = document.createElement("select");
    selectDrive.size = 6;
    selectDrive.id = "saveSceneSelectDrive";
    selectDrive.className = "sceneSelect ";
    selectDrive.style.display = "none";
    this.cloudSelectFile = selectDrive;
    var inputCloudStorage = document.createElement("input");
    inputCloudStorage.id = "inputNameApp";
    inputCloudStorage.className = "inputExport";
    inputCloudStorage.value = Utilitary.currentScene.sceneName;
    inputCloudStorage.style.display = "none";
    this.inputCloudStorage = inputCloudStorage;
    var cloudButtonSuppr = document.createElement("button");
    cloudButtonSuppr.type = "button";
    cloudButtonSuppr.id = "cloudButtonSuppr";
    cloudButtonSuppr.className = "button";
    cloudButtonSuppr.style.display = "none";
    cloudButtonSuppr.textContent = Utilitary.messageResource.buttonSuppress;
    this.buttonCloudSuppr = cloudButtonSuppr;
    var cloudButton = document.createElement("button");
    cloudButton.type = "button";
    cloudButton.id = "cloudSaveButton";
    cloudButton.className = "button";
    cloudButton.textContent = Utilitary.messageResource.buttonCloudSave;
    this.buttonSaveCloud = cloudButton;
    var changeAccountButton = document.createElement("button");
    changeAccountButton.type = "button";
    changeAccountButton.className = "button changeAccountButton";
    changeAccountButton.textContent = Utilitary.messageResource.buttonLogoutCloud;
    changeAccountButton.style.display = "none";
    this.buttonChangeAccount = changeAccountButton;
    var cloudBottomButtonContainer = document.createElement("div");
    cloudBottomButtonContainer.className = "bottomButtonContainer";
    cloudBottomButtonContainer.appendChild(cloudButton);
    driveContainer.appendChild(buttonConnectDrive);
    driveContainer.appendChild(changeAccountButton);
    driveContainer.appendChild(selectDrive);
    driveContainer.appendChild(cloudButtonSuppr);
    driveContainer.appendChild(inputCloudStorage);
    driveContainer.appendChild(cloudBottomButtonContainer);
    cloudSaveContainer.appendChild(driveContainer);
    saveContainer.appendChild(downloadContainer);
    saveContainer.appendChild(localSaveContainer);
    saveContainer.appendChild(cloudSaveContainer);
    return saveContainer;
  }
}
class MenuView {
  constructor() {
    this.HTMLElementsMenu = [];
    this.HTMLButtonsMenu = [];
    this.menuColorDefault = "rgba(227, 64, 80, 0.73)";
    this.menuColorSelected = "rgb(209, 64, 80)";
  }
  init(htmlContainer) {
    var menuContainer = document.createElement("div");
    menuContainer.id = "menuContainer";
    this.menuContainer = menuContainer;
    var buttonsMenu = document.createElement("div");
    buttonsMenu.id = "buttonsMenu";
    var libraryButtonMenu = document.createElement("div");
    libraryButtonMenu.id = "libraryButtonMenu";
    libraryButtonMenu.className = "buttonsMenu";
    libraryButtonMenu.appendChild(document.createTextNode(Utilitary.messageResource.buttonLibrary));
    this.libraryButtonMenu = libraryButtonMenu;
    var exportButtonMenu = document.createElement("div");
    exportButtonMenu.id = "exportButtonMenu";
    exportButtonMenu.className = "buttonsMenu";
    exportButtonMenu.appendChild(document.createTextNode(Utilitary.messageResource.buttonExport));
    this.exportButtonMenu = exportButtonMenu;
    var editButtonMenu = document.createElement("div");
    editButtonMenu.id = "EditButtonMenu";
    editButtonMenu.className = "buttonsMenu";
    editButtonMenu.appendChild(document.createTextNode(Utilitary.messageResource.buttonEdit));
    this.editButtonMenu = editButtonMenu;
    var loadButtonMenu = document.createElement("div");
    loadButtonMenu.id = "loadButtonMenu";
    loadButtonMenu.className = "buttonsMenu";
    loadButtonMenu.appendChild(document.createTextNode(Utilitary.messageResource.buttonLoad));
    this.loadButton = loadButtonMenu;
    var saveButtonMenu = document.createElement("div");
    saveButtonMenu.id = "saveButtonMenu";
    saveButtonMenu.className = "buttonsMenu";
    saveButtonMenu.appendChild(document.createTextNode(Utilitary.messageResource.buttonSave));
    this.saveButton = saveButtonMenu;
    var fullScreenButton = document.createElement("div");
    fullScreenButton.id = "fullScreenButton";
    fullScreenButton.className = "buttonsLittleMenu";
    this.fullScreenButton = fullScreenButton;
    var accButton = document.createElement("div");
    accButton.id = "accButton";
    accButton.className = "buttonsLittleMenu";
    this.accButton = accButton;
    var cleanButton = document.createElement("div");
    cleanButton.id = "cleanButton";
    cleanButton.className = "buttonsLittleMenu";
    this.cleanButton = cleanButton;
    var faustPieceButton = document.createElement("div");
    faustPieceButton.id = "faustPieceButton";
    faustPieceButton.className = "buttonsMenu";
    faustPieceButton.appendChild(document.createTextNode("🎵 FaustPiece"));
    faustPieceButton.title = "Open FaustPiece Editor / New FaustPiece";
    this.faustPieceButton = faustPieceButton;
    if (!Utilitary.isAccelerometerOn) {
      accButton.style.opacity = "0.2";
    }
    buttonsMenu.appendChild(libraryButtonMenu);
    buttonsMenu.appendChild(loadButtonMenu);
    buttonsMenu.appendChild(editButtonMenu);
    buttonsMenu.appendChild(saveButtonMenu);
    buttonsMenu.appendChild(exportButtonMenu);
    buttonsMenu.appendChild(fullScreenButton);
    buttonsMenu.appendChild(accButton);
    buttonsMenu.appendChild(cleanButton);
    buttonsMenu.appendChild(faustPieceButton);
    this.HTMLButtonsMenu.push(libraryButtonMenu, loadButtonMenu, saveButtonMenu, exportButtonMenu);
    var myScene = document.createElement("div");
    myScene.id = "PatchName";
    myScene.className = "sceneTitle";
    myScene.textContent = Utilitary.currentScene.sceneName;
    buttonsMenu.appendChild(myScene);
    this.patchNameScene = myScene;
    var contentsMenu = document.createElement("div");
    contentsMenu.id = "contentsMenu";
    contentsMenu.style.display = "none";
    var closeButton = document.createElement("div");
    closeButton.id = "closeButton";
    this.closeButton = closeButton;
    var CloseButtonContainer = document.createElement("div");
    CloseButtonContainer.id = "closeButtonContainer";
    CloseButtonContainer.appendChild(closeButton);
    var libraryView = new LibraryView();
    var libraryContent = libraryView.initLibraryView();
    libraryContent.style.display = "none";
    this.libraryView = libraryView;
    var loadView = new LoadView();
    var loadContent = loadView.initLoadView();
    loadContent.style.display = "none";
    this.loadView = loadView;
    var saveView = new SaveView();
    var saveContent = saveView.initSaveView();
    saveContent.style.display = "none";
    this.saveView = saveView;
    var exportView = new ExportView();
    var exportContent = exportView.initExportView();
    exportContent.style.display = "none";
    this.exportView = exportView;
    var accEditView = new AccelerometerEditView();
    var accEditContent = accEditView.initAccelerometerEdit();
    accEditContent.style.display = "none";
    this.accEditView = accEditView;
    contentsMenu.appendChild(CloseButtonContainer);
    contentsMenu.appendChild(libraryContent);
    contentsMenu.appendChild(loadContent);
    contentsMenu.appendChild(saveContent);
    contentsMenu.appendChild(exportContent);
    menuContainer.appendChild(buttonsMenu);
    menuContainer.appendChild(contentsMenu);
    menuContainer.appendChild(accEditContent);
    htmlContainer.appendChild(menuContainer);
    this.HTMLElementsMenu.push(libraryContent, loadContent, saveContent, exportContent);
    this.libraryContent = libraryContent;
    this.loadContent = loadContent;
    this.saveContent = saveContent;
    this.exportContent = exportContent;
    this.contentsMenu = contentsMenu;
  }
}
const SHCUI_TYPES = [
  "button",
  "checkbox",
  "hslider",
  "vslider",
  "hbargraph",
  "vbargraph",
  "pad",
  "trigCue",
  "nextCue",
  "prevCue",
  "initCue",
  "trigCounter",
  "setRef"
];
function parseParams(code) {
  const stripped = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  const results = [];
  const seen2 = /* @__PURE__ */ new Set();
  const widgetRegex = /(?:hslider|vslider|button|checkbox|nentry|hbargraph|vbargraph)\s*\(\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = widgetRegex.exec(stripped)) !== null) {
    const fullLabel = m[1];
    const metaStart = fullLabel.search(/\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)(?:\s|:)[^\]]*\]/);
    const paramPath = metaStart !== -1 ? fullLabel.slice(0, metaStart).trimEnd() : fullLabel;
    if (!paramPath || seen2.has(paramPath))
      continue;
    seen2.add(paramPath);
    let displayName = paramPath.replace(/^(?:[a-z]:\s*)?(?:\[[^\]]*\])+\s*/i, "").replace(/^[a-z]:\s*/i, "").trim();
    if (!displayName)
      displayName = paramPath;
    results.push({ paramPath, displayName, fullLabel });
  }
  return results;
}
function normalizeParamPath(path) {
  let normalized = path.replace(/^[a-z]:/i, "");
  normalized = normalized.replace(/^\/[^/]+\//, "");
  normalized = normalized.replace(/^\//, "");
  return normalized.toLowerCase().trim();
}
function extractUsedParamsFromJson(dspJson) {
  const usedParams = /* @__PURE__ */ new Set();
  let parsedJson = dspJson;
  if (typeof dspJson === "string") {
    try {
      parsedJson = JSON.parse(dspJson);
    } catch (e) {
      console.error("[extractUsedParamsFromJson] Failed to parse JSON:", e);
      return usedParams;
    }
  }
  function collectParams(items) {
    for (const item of items || []) {
      if (!item || typeof item !== "object")
        continue;
      if (item.items) {
        collectParams(item.items);
        continue;
      }
      const type = item.type;
      const isControl = [
        "hslider",
        "vslider",
        "nentry",
        "button",
        "checkbox",
        "hbargraph",
        "vbargraph"
      ].includes(type);
      if (isControl && item.address) {
        const normalizedPath = normalizeParamPath(item.address);
        usedParams.add(normalizedPath);
      }
    }
  }
  collectParams((parsedJson == null ? void 0 : parsedJson.ui) || []);
  return usedParams;
}
function filterUsedParams(declaredParams, dspJson) {
  if (!dspJson) {
    return { usedParams: declaredParams, hiddenCount: 0 };
  }
  const usedParamPaths = extractUsedParamsFromJson(dspJson);
  const usedParams = declaredParams.filter((p) => {
    const normalizedDeclared = normalizeParamPath(p.address);
    return usedParamPaths.has(normalizedDeclared);
  });
  const hiddenCount = declaredParams.length - usedParams.length;
  return { usedParams, hiddenCount };
}
class SHCUICanvas {
  constructor(options) {
    this.elements = [];
    this.currentTab = "";
    this.tabs = [];
    this.addPopover = null;
    this.zoom = 1;
    this.ZOOM_MIN = 0.3;
    this.ZOOM_MAX = 3;
    this.ZOOM_STEP = 0.15;
    this.dragging = null;
    this.resizing = null;
    this.selectedElement = null;
    this.container = options.container;
    this.onChange = options.onChange;
    this.onAdd = options.onAdd;
    this.getCode = options.getCode;
    this.getDspJson = options.getDspJson;
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.height = "100%";
    this.container.style.overflowY = "auto";
    this.tabBar = document.createElement("div");
    this.tabBar.className = "faustpiece-tab-bar";
    this.tabBar.style.cssText = "display:flex;gap:4px;padding:4px;background:#1e1e1e;flex-shrink:0;overflow-x:auto;align-items:center;";
    this.container.appendChild(this.tabBar);
    const zoomBar = document.createElement("div");
    zoomBar.style.cssText = "display:flex;align-items:center;gap:6px;padding:3px 8px;background:#252526;border-bottom:1px solid #333;flex-shrink:0;";
    const zoomLabel = document.createElement("span");
    zoomLabel.style.cssText = "font-size:10px;color:#666;";
    zoomLabel.textContent = "📱 Phone preview (9:16)";
    zoomBar.appendChild(zoomLabel);
    const spacer = document.createElement("span");
    spacer.style.flex = "1";
    zoomBar.appendChild(spacer);
    const zoomOutBtn = this.makeZoomBtn("−", () => this.setZoom(this.zoom - this.ZOOM_STEP));
    zoomBar.appendChild(zoomOutBtn);
    const zoomDisplay = document.createElement("span");
    zoomDisplay.style.cssText = "font-size:11px;color:#aaa;min-width:38px;text-align:center;";
    zoomDisplay.textContent = "100%";
    zoomBar.appendChild(zoomDisplay);
    const zoomInBtn = this.makeZoomBtn("+", () => this.setZoom(this.zoom + this.ZOOM_STEP));
    zoomBar.appendChild(zoomInBtn);
    const zoomResetBtn = this.makeZoomBtn("⊙", () => this.setZoom(1));
    zoomResetBtn.title = "Reset zoom";
    zoomBar.appendChild(zoomResetBtn);
    const addBtn = document.createElement("button");
    addBtn.textContent = "＋ Add Element";
    addBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:2px 8px;cursor:pointer;font-size:11px;margin-left:8px;";
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleAddPopover(addBtn);
    });
    zoomBar.appendChild(addBtn);
    this.container.appendChild(zoomBar);
    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = "background:#2d2d2d;cursor:crosshair;display:block;";
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this._zoomDisplay = zoomDisplay;
    this.bindEvents();
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }
  makeZoomBtn(label, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.cssText = "background:#3a3a3a;color:#ccc;border:none;border-radius:3px;width:22px;height:22px;cursor:pointer;font-size:14px;line-height:1;padding:0;";
    btn.addEventListener("click", onClick);
    return btn;
  }
  setZoom(z) {
    this.zoom = Math.max(this.ZOOM_MIN, Math.min(this.ZOOM_MAX, z));
    const display = this._zoomDisplay;
    if (display)
      display.textContent = `${Math.round(this.zoom * 100)}%`;
    this.resize();
  }
  resize() {
    const containerRect = this.container.getBoundingClientRect();
    const tabBarH = this.tabBar.getBoundingClientRect().height || 28;
    const zoomBarH = 32;
    const availH = (containerRect.height || 500) - tabBarH - zoomBarH;
    const availW = containerRect.width || 300;
    const RATIO = 9 / 16;
    let baseW = availW;
    let baseH = baseW / RATIO;
    if (baseH > availH) {
      baseH = availH;
      baseW = baseH * RATIO;
    }
    const canvasW = Math.floor(baseW * this.zoom);
    const canvasH = Math.floor(canvasW / RATIO);
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.canvas.style.cssText = `background:#2d2d2d;cursor:crosshair;display:block;width:${canvasW}px;height:${canvasH}px;margin:0 auto;flex-shrink:0;`;
    this.render();
  }
  /** Load elements and rebuild tab list */
  setElements(elements) {
    this.elements = elements;
    const tabSet = /* @__PURE__ */ new Set();
    for (const el of elements)
      tabSet.add(el.tab);
    this.tabs = Array.from(tabSet);
    if (this.tabs.length > 0 && !this.tabs.includes(this.currentTab)) {
      this.currentTab = this.tabs[0];
    }
    this.rebuildTabBar();
    this.render();
  }
  rebuildTabBar() {
    this.tabBar.innerHTML = "";
    for (const tab of this.tabs) {
      const btn = document.createElement("button");
      btn.textContent = tab;
      btn.className = "btn btn-sm " + (tab === this.currentTab ? "btn-primary" : "btn-outline-secondary");
      btn.style.cssText = "font-size:11px;padding:2px 8px;white-space:nowrap;";
      btn.addEventListener("click", () => {
        this.currentTab = tab;
        this.rebuildTabBar();
        this.render();
      });
      this.tabBar.appendChild(btn);
    }
  }
  get visibleElements() {
    return this.elements.filter((el) => el.tab === this.currentTab);
  }
  toPixel(pct, dimension) {
    return dimension === "w" ? pct / 100 * this.canvas.width : pct / 100 * this.canvas.height;
  }
  toPct(px, dimension) {
    return dimension === "w" ? px / this.canvas.width * 100 : px / this.canvas.height * 100;
  }
  getElementRect(el) {
    return {
      x: this.toPixel(el.x, "w"),
      y: this.toPixel(el.y, "h"),
      w: this.toPixel(el.w, "w"),
      h: this.toPixel(el.h, "h")
    };
  }
  overlaps(a, b) {
    if (a === b || a.tab !== b.tab)
      return false;
    return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
  }
  render() {
    const { ctx, canvas: canvas2 } = this;
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.strokeStyle = "#3a3a3a";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = i / 10 * canvas2.width;
      const y = i / 10 * canvas2.height;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas2.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas2.width, y);
      ctx.stroke();
    }
    const visible = this.visibleElements;
    for (const el of visible) {
      const { x, y, w, h } = this.getElementRect(el);
      const isSelected = el === this.selectedElement;
      const hasOverlap = visible.some((other) => this.overlaps(el, other));
      ctx.fillStyle = `rgba(${el.r},${el.g},${el.b},${el.a / 255 * 0.6})`;
      ctx.fillRect(x, y, w, h);
      if (hasOverlap) {
        ctx.fillStyle = "rgba(255,60,60,0.35)";
        ctx.fillRect(x, y, w, h);
      }
      ctx.strokeStyle = isSelected ? "#4af" : `rgba(${el.r},${el.g},${el.b},0.9)`;
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = "#fff";
      ctx.font = `${Math.max(9, Math.min(13, h * 0.35))}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = [el.type, el.paramPath.split("/").pop() || el.paramPath];
      const lineH = Math.max(9, Math.min(13, h * 0.35)) + 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * lineH, w - 4);
      });
      if (isSelected) {
        const handles = [
          { hx: x + w - 6, hy: y + h - 6 },
          { hx: x, hy: y + h - 6 },
          { hx: x + w - 6, hy: y },
          { hx: x, hy: y }
        ];
        ctx.fillStyle = "#4af";
        for (const { hx, hy } of handles)
          ctx.fillRect(hx, hy, 6, 6);
      }
    }
  }
  getElementAt(px, py) {
    const visible = this.visibleElements;
    for (let i = visible.length - 1; i >= 0; i--) {
      const el = visible[i];
      const { x, y, w, h } = this.getElementRect(el);
      if (px >= x && px <= x + w && py >= y && py <= y + h)
        return el;
    }
    return null;
  }
  getResizeHandle(el, px, py) {
    const { x, y, w, h } = this.getElementRect(el);
    const tol = 8;
    if (px >= x + w - tol && py >= y + h - tol)
      return "br";
    if (px <= x + tol && py >= y + h - tol)
      return "bl";
    if (px >= x + w - tol && py <= y + tol)
      return "tr";
    if (px <= x + tol && py <= y + tol)
      return "tl";
    return null;
  }
  bindEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const px = (e.clientX - rect.left) * scaleX;
      const py = (e.clientY - rect.top) * scaleY;
      const el = this.getElementAt(px, py);
      this.selectedElement = el;
      if (el) {
        const handle = this.getResizeHandle(el, px, py);
        if (handle) {
          this.resizing = { el, handle, startX: px, startY: py, origX: el.x, origY: el.y, origW: el.w, origH: el.h };
        } else {
          this.dragging = { el, startX: px, startY: py, origX: el.x, origY: el.y };
        }
      }
      this.render();
    });
    this.canvas.addEventListener("mousemove", (e) => {
      var _a, _b;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const px = (e.clientX - rect.left) * scaleX;
      const py = (e.clientY - rect.top) * scaleY;
      if (this.dragging) {
        const { el, startX, startY, origX, origY } = this.dragging;
        const dx = this.toPct(px - startX, "w");
        const dy = this.toPct(py - startY, "h");
        el.x = Math.max(0, Math.min(100 - el.w, origX + dx));
        el.y = Math.max(0, Math.min(100 - el.h, origY + dy));
        this.render();
        (_a = this.onChange) == null ? void 0 : _a.call(this, el, el.x, el.y, el.w, el.h);
      } else if (this.resizing) {
        const { el, handle, startX, startY, origX, origY, origW, origH } = this.resizing;
        const dx = this.toPct(px - startX, "w");
        const dy = this.toPct(py - startY, "h");
        if (handle.includes("r"))
          el.w = Math.max(2, origW + dx);
        if (handle.includes("b"))
          el.h = Math.max(2, origH + dy);
        if (handle.includes("l")) {
          el.x = Math.min(origX + origW - 2, origX + dx);
          el.w = Math.max(2, origW - dx);
        }
        if (handle.includes("t")) {
          el.y = Math.min(origY + origH - 2, origY + dy);
          el.h = Math.max(2, origH - dy);
        }
        el.x = Math.max(0, el.x);
        el.y = Math.max(0, el.y);
        el.w = Math.min(100 - el.x, el.w);
        el.h = Math.min(100 - el.y, el.h);
        this.render();
        (_b = this.onChange) == null ? void 0 : _b.call(this, el, el.x, el.y, el.w, el.h);
      }
    });
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? this.ZOOM_STEP : -this.ZOOM_STEP;
      this.setZoom(this.zoom + delta);
    }, { passive: false });
    const endDrag = () => {
      this.dragging = null;
      this.resizing = null;
    };
    this.canvas.addEventListener("mouseup", endDrag);
    this.canvas.addEventListener("mouseleave", endDrag);
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
    const existingParams = [];
    if (this.getCode) {
      const parsed = parseParams(this.getCode());
      const dspJson = this.getDspJson ? this.getDspJson() : null;
      const paramsWithMeta = parsed.map((p, id) => ({
        id,
        address: p.paramPath,
        min: 0,
        max: 1,
        init: 0
      }));
      const { usedParams: filteredParams } = filterUsedParams(paramsWithMeta, dspJson);
      for (const { address } of filteredParams) {
        if (!existingParams.includes(address))
          existingParams.push(address);
      }
    }
    for (const el of this.elements) {
      if (!existingParams.includes(el.paramPath))
        existingParams.push(el.paramPath);
    }
    const popover = document.createElement("div");
    popover.style.cssText = [
      "position:absolute;z-index:1000;background:#252526;border:1px solid #4af;border-radius:5px;",
      "padding:10px 12px;width:260px;box-shadow:0 4px 16px rgba(0,0,0,0.5);font-size:12px;color:#ccc;"
    ].join("");
    const anchorRect = anchor.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    popover.style.top = `${anchorRect.bottom - containerRect.top + 4}px`;
    popover.style.right = "8px";
    const title = document.createElement("div");
    title.textContent = "＋ Add SHCUI Element";
    title.style.cssText = "font-weight:bold;color:#4af;margin-bottom:8px;font-size:12px;";
    popover.appendChild(title);
    const makeRow = (label, input) => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;gap:6px;margin-bottom:6px;";
      const lbl = document.createElement("span");
      lbl.textContent = label;
      lbl.style.cssText = "width:60px;flex-shrink:0;color:#aaa;font-size:11px;";
      row.appendChild(lbl);
      row.appendChild(input);
      popover.appendChild(row);
    };
    const datalistId = `shcui-params-${Date.now()}`;
    const datalist = document.createElement("datalist");
    datalist.id = datalistId;
    if (existingParams.length > 0) {
      document.createElement("optgroup");
      for (const p of existingParams) {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        datalist.appendChild(opt);
      }
    }
    popover.appendChild(datalist);
    const paramWrap = document.createElement("div");
    paramWrap.style.cssText = "flex:1;display:flex;flex-direction:column;gap:3px;";
    const pathInput = document.createElement("input");
    pathInput.type = "text";
    pathInput.setAttribute("list", datalistId);
    pathInput.placeholder = existingParams.length > 0 ? "Pick or type new param…" : "e.g. freq";
    pathInput.style.cssText = "width:100%;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 5px;font-size:11px;box-sizing:border-box;";
    const hint = document.createElement("div");
    hint.style.cssText = "font-size:10px;color:#555;";
    hint.textContent = existingParams.length > 0 ? `${existingParams.length} param(s) found in DSP — or type a new name` : "No params found in DSP — type a new param name";
    paramWrap.appendChild(pathInput);
    paramWrap.appendChild(hint);
    const paramRow = document.createElement("div");
    paramRow.style.cssText = "display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;";
    const paramLbl = document.createElement("span");
    paramLbl.textContent = "Param";
    paramLbl.style.cssText = "width:60px;flex-shrink:0;color:#aaa;font-size:11px;padding-top:4px;";
    paramRow.appendChild(paramLbl);
    paramRow.appendChild(paramWrap);
    popover.appendChild(paramRow);
    const typeSelect = document.createElement("select");
    typeSelect.style.cssText = "flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 5px;font-size:11px;";
    for (const t2 of SHCUI_TYPES) {
      const opt = document.createElement("option");
      opt.value = t2;
      opt.textContent = t2;
      typeSelect.appendChild(opt);
    }
    makeRow("Type", typeSelect);
    const tabInput = document.createElement("input");
    tabInput.type = "text";
    tabInput.value = this.currentTab || "main";
    tabInput.style.cssText = "flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 5px;font-size:11px;";
    const tabDatalistId = `shcui-tabs-${Date.now()}`;
    const tabDatalist = document.createElement("datalist");
    tabDatalist.id = tabDatalistId;
    for (const tab of this.tabs) {
      const opt = document.createElement("option");
      opt.value = tab;
      tabDatalist.appendChild(opt);
    }
    tabInput.setAttribute("list", tabDatalistId);
    popover.appendChild(tabDatalist);
    makeRow("Tab", tabInput);
    const errMsg = document.createElement("div");
    errMsg.style.cssText = "color:#f44;font-size:10px;min-height:14px;margin-bottom:4px;";
    popover.appendChild(errMsg);
    const btnRow = document.createElement("div");
    btnRow.style.cssText = "display:flex;gap:6px;justify-content:flex-end;";
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.cssText = "background:#3a3a3a;color:#aaa;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
    cancelBtn.addEventListener("click", () => this.closeAddPopover());
    const placeBtn = document.createElement("button");
    placeBtn.textContent = "▶ Place";
    placeBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
    placeBtn.addEventListener("click", () => {
      var _a;
      const path = pathInput.value.trim();
      if (!path) {
        errMsg.textContent = "Param path is required";
        return;
      }
      const tab = tabInput.value.trim() || "main";
      const newEl = {
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
      (_a = this.onAdd) == null ? void 0 : _a.call(this, newEl);
      this.closeAddPopover();
    });
    btnRow.appendChild(cancelBtn);
    btnRow.appendChild(placeBtn);
    popover.appendChild(btnRow);
    const outsideClick = (e) => {
      if (!popover.contains(e.target) && e.target !== anchor) {
        this.closeAddPopover();
        document.removeEventListener("mousedown", outsideClick);
      }
    };
    setTimeout(() => document.addEventListener("mousedown", outsideClick), 0);
    this.addPopover = popover;
    if (!this.container.style.position || this.container.style.position === "static") {
      this.container.style.position = "relative";
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
class PropertyPanel {
  constructor(options) {
    this.currentElement = null;
    this.container = options.container;
    this.onUpdate = options.onUpdate;
    this.onAdd = options.onAdd;
    this.onDelete = options.onDelete;
    this.container.style.cssText = "padding:8px;overflow-y:auto;font-size:12px;color:#ccc;background:#252526;";
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
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;margin-bottom:4px;gap:6px;";
    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.style.cssText = "width:70px;flex-shrink:0;color:#aaa;";
    row.appendChild(lbl);
    row.appendChild(input);
    return row;
  }
  numInput(value, min, max, onChange) {
    const inp = document.createElement("input");
    inp.type = "number";
    inp.value = String(value);
    inp.min = String(min);
    inp.max = String(max);
    inp.style.cssText = "width:60px;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;";
    inp.addEventListener("input", () => onChange(parseFloat(inp.value) || 0));
    return inp;
  }
  textInput(value, onChange) {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.value = value;
    inp.style.cssText = "flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;";
    inp.addEventListener("input", () => onChange(inp.value));
    return inp;
  }
  selectInput(value, options, onChange) {
    const sel = document.createElement("select");
    sel.style.cssText = "flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;";
    for (const opt of options) {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      if (opt === value)
        o.selected = true;
      sel.appendChild(o);
    }
    sel.addEventListener("change", () => onChange(sel.value));
    return sel;
  }
  renderForm(el) {
    this.container.innerHTML = "";
    const title = document.createElement("div");
    title.textContent = "SHCUI Element";
    title.style.cssText = "font-weight:bold;margin-bottom:8px;color:#4af;font-size:13px;";
    this.container.appendChild(title);
    const notify = () => {
      var _a;
      return (_a = this.onUpdate) == null ? void 0 : _a.call(this, el);
    };
    const pathDiv = document.createElement("div");
    pathDiv.style.cssText = "margin-bottom:6px;color:#888;font-size:11px;word-break:break-all;";
    pathDiv.textContent = `Path: ${el.paramPath}`;
    this.container.appendChild(pathDiv);
    this.container.appendChild(this.field("Tab", this.textInput(el.tab, (v) => {
      el.tab = v;
      notify();
    })));
    this.container.appendChild(this.field("Type", this.selectInput(el.type, SHCUI_TYPES, (v) => {
      el.type = v;
      notify();
    })));
    const posTitle = document.createElement("div");
    posTitle.textContent = "Position & Size (0–100)";
    posTitle.style.cssText = "color:#888;font-size:11px;margin:6px 0 2px;";
    this.container.appendChild(posTitle);
    const posRow = document.createElement("div");
    posRow.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:4px;";
    const addPosField = (label, val, setter) => {
      const wrap = document.createElement("div");
      wrap.style.cssText = "display:flex;align-items:center;gap:4px;";
      const lbl = document.createElement("span");
      lbl.textContent = label;
      lbl.style.cssText = "width:16px;color:#aaa;font-size:11px;";
      wrap.appendChild(lbl);
      wrap.appendChild(this.numInput(val, 0, 100, (v) => {
        setter(v);
        notify();
      }));
      posRow.appendChild(wrap);
    };
    addPosField("X", el.x, (v) => el.x = v);
    addPosField("Y", el.y, (v) => el.y = v);
    addPosField("W", el.w, (v) => el.w = v);
    addPosField("H", el.h, (v) => el.h = v);
    this.container.appendChild(posRow);
    const colorTitle = document.createElement("div");
    colorTitle.textContent = "Color (R G B A, 0–255)";
    colorTitle.style.cssText = "color:#888;font-size:11px;margin:6px 0 2px;";
    this.container.appendChild(colorTitle);
    const colorRow = document.createElement("div");
    colorRow.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px;";
    const addColorField = (label, val, setter) => {
      const wrap = document.createElement("div");
      wrap.style.cssText = "display:flex;align-items:center;gap:4px;";
      const lbl = document.createElement("span");
      lbl.textContent = label;
      lbl.style.cssText = "width:16px;color:#aaa;font-size:11px;";
      wrap.appendChild(lbl);
      wrap.appendChild(this.numInput(val, 0, 255, (v) => {
        setter(v);
        notify();
      }));
      colorRow.appendChild(wrap);
    };
    addColorField("R", el.r, (v) => el.r = v);
    addColorField("G", el.g, (v) => el.g = v);
    addColorField("B", el.b, (v) => el.b = v);
    addColorField("A", el.a, (v) => el.a = v);
    this.container.appendChild(colorRow);
    const preview = document.createElement("div");
    preview.style.cssText = `width:100%;height:20px;border-radius:3px;margin-bottom:8px;background:rgba(${el.r},${el.g},${el.b},${el.a / 255});border:1px solid #555;`;
    this.container.appendChild(preview);
    const delBtn = document.createElement("button");
    delBtn.textContent = "✕ Remove SHCUI";
    delBtn.style.cssText = "width:100%;background:#5a2020;color:#fff;border:none;border-radius:3px;padding:4px;cursor:pointer;font-size:11px;";
    delBtn.addEventListener("click", () => {
      var _a;
      return (_a = this.onDelete) == null ? void 0 : _a.call(this, el);
    });
    this.container.appendChild(delBtn);
  }
  /** Update position/size from canvas drag (without re-rendering full form) */
  updatePosition(x, y, w, h) {
    if (!this.currentElement)
      return;
    this.currentElement.x = x;
    this.currentElement.y = y;
    this.currentElement.w = w;
    this.currentElement.h = h;
    this.renderForm(this.currentElement);
  }
}
class SHCUIParser {
  parse(dspCode) {
    const elements = [];
    const errors = [];
    const stripped = dspCode.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    const regex2 = /"([^"]*\[SHCUI:[^\]]*\][^"]*)"/g;
    let match2;
    while ((match2 = regex2.exec(stripped)) !== null) {
      const fullLabel = match2[1];
      const shcuiMatch = fullLabel.match(/\[SHCUI:\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*\]/);
      if (!shcuiMatch)
        continue;
      const metaIdx = fullLabel.search(/\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)(?:\s|:)[^\]]*\]/);
      const paramPath = (metaIdx !== -1 ? fullLabel.slice(0, metaIdx).trimEnd() : fullLabel).trim();
      const [, tab, typeStr, xStr, yStr, wStr, hStr, rStr, gStr, bStr, aStr] = shcuiMatch;
      const x = parseFloat(xStr), y = parseFloat(yStr), w = parseFloat(wStr), h = parseFloat(hStr);
      const r = parseInt(rStr), g = parseInt(gStr), b = parseInt(bStr), a = parseInt(aStr);
      let hasError = false;
      if (x < 0 || x > 100 || y < 0 || y > 100 || w < 0 || w > 100 || h < 0 || h > 100) {
        errors.push({ paramPath, message: `Coordinates/size out of range (0-100): x=${x} y=${y} w=${w} h=${h}` });
        hasError = true;
      }
      if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 255) {
        errors.push({ paramPath, message: `Color values out of range (0-255): r=${r} g=${g} b=${b} a=${a}` });
        hasError = true;
      }
      if (!SHCUI_TYPES.includes(typeStr)) {
        errors.push({ paramPath, message: `Unknown SHCUI type: "${typeStr}"` });
        hasError = true;
      }
      if (!hasError)
        elements.push({ paramPath, tab, type: typeStr, x, y, w, h, r, g, b, a });
    }
    return { data: elements, errors };
  }
  serialize(element) {
    const { tab, type, x, y, w, h, r, g, b, a } = element;
    return `[SHCUI: ${tab} ${type} ${Math.round(x)} ${Math.round(y)} ${Math.round(w)} ${Math.round(h)} ${Math.round(r)} ${Math.round(g)} ${Math.round(b)} ${Math.round(a)}]`;
  }
  parseCueManager(dspCode) {
    const entries = [];
    const stripped = dspCode.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    const inlineMatch = stripped.match(/\[touchCueManager:\s*(\{[^}]*\})\]/);
    const declareMatch = stripped.match(/declare\s+touchCueManager\s+"(\{[^}]*\})"\s*;/);
    const rawContent = ((inlineMatch == null ? void 0 : inlineMatch[1]) || (declareMatch == null ? void 0 : declareMatch[1]) || "").replace(/^\{/, "").replace(/\}$/, "");
    if (!rawContent.trim())
      return entries;
    for (const part of rawContent.split(";")) {
      const trimmed = part.trim();
      if (!trimmed)
        continue;
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx === -1)
        continue;
      const index = parseInt(trimmed.slice(0, colonIdx).trim());
      let tip = trimmed.slice(colonIdx + 1).trim();
      tip = tip.replace(/^['"]|['"]$/g, "");
      if (!isNaN(index) && tip)
        entries.push({ index, tip });
    }
    return entries;
  }
}
class MotionParser {
  parse(dspCode) {
    const mappings = [];
    const errors = [];
    const stripped = dspCode.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    const regex2 = /"([^"]*\[(?:acc|gyr):[^\]]*\][^"]*)"/g;
    let match2;
    while ((match2 = regex2.exec(stripped)) !== null) {
      const fullLabel = match2[1];
      const metaStart = fullLabel.search(/\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)(?:\s|:)[^\]]*\]/);
      const paramPath = metaStart !== -1 ? fullLabel.slice(0, metaStart).trimEnd() : fullLabel;
      const metaRegex = /\[(acc|gyr):\s*(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s*\]/g;
      let metaMatch;
      while ((metaMatch = metaRegex.exec(fullLabel)) !== null) {
        const [, sensor, axisStr, curveStr, aminStr, amidStr, amaxStr] = metaMatch;
        const axis = parseInt(axisStr);
        const curve = parseInt(curveStr);
        const amin = parseFloat(aminStr), amid = parseFloat(amidStr), amax = parseFloat(amaxStr);
        let hasError = false;
        if (![0, 1, 2].includes(axis)) {
          errors.push({ paramPath, message: `Invalid axis value: ${axis}` });
          hasError = true;
        }
        if (![0, 1, 2].includes(curve)) {
          errors.push({ paramPath, message: `Invalid curve value: ${curve}` });
          hasError = true;
        }
        if (amin >= amax) {
          errors.push({ paramPath, message: `amin (${amin}) must be less than amax (${amax})` });
          hasError = true;
        }
        if (!hasError)
          mappings.push({ paramPath, sensor, axis, curve, amin, amid, amax });
      }
    }
    return { data: mappings, errors };
  }
  serialize(mapping) {
    const { sensor, axis, curve, amin, amid, amax } = mapping;
    return `[${sensor}: ${axis} ${curve} ${amin} ${amid} ${amax}]`;
  }
}
class DSPMetadataEditor {
  constructor() {
    this.shcuiParser = new SHCUIParser();
    this.motionParser = new MotionParser();
  }
  findLabelIndex(dspCode, paramPath) {
    const escaped = paramPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex2 = new RegExp(`"(${escaped}[^"]*)"`, "g");
    const match2 = regex2.exec(dspCode);
    if (!match2)
      return null;
    return { start: match2.index + 1, end: match2.index + match2[0].length - 1, label: match2[1] };
  }
  upsertMeta(label, tagName, newValue) {
    const tagRegex = new RegExp(`\\[${tagName}:[^\\]]*\\]`, "g");
    if (tagRegex.test(label))
      return label.replace(new RegExp(`\\[${tagName}:[^\\]]*\\]`), `[${tagName}: ${newValue}]`);
    return label.trimEnd() + ` [${tagName}: ${newValue}]`;
  }
  removeMeta(label, tagName) {
    return label.replace(new RegExp(`\\s*\\[${tagName}:[^\\]]*\\]`, "g"), "").trimEnd();
  }
  applyToLabel(dspCode, paramPath, transform) {
    const found = this.findLabelIndex(dspCode, paramPath);
    if (!found)
      return dspCode;
    return dspCode.slice(0, found.start) + transform(found.label) + dspCode.slice(found.end);
  }
  upsertSHCUI(dspCode, paramPath, element) {
    const value = this.shcuiParser.serialize(element).replace(/^\[SHCUI:\s*/, "").replace(/\]$/, "");
    return this.applyToLabel(dspCode, paramPath, (label) => this.upsertMeta(label, "SHCUI", value));
  }
  removeSHCUI(dspCode, paramPath) {
    return this.applyToLabel(dspCode, paramPath, (label) => this.removeMeta(label, "SHCUI"));
  }
  upsertMotion(dspCode, paramPath, mapping) {
    const value = this.motionParser.serialize(mapping).replace(/^\[(acc|gyr):\s*/, "").replace(/\]$/, "");
    return this.applyToLabel(dspCode, paramPath, (label) => this.upsertMeta(label, mapping.sensor, value));
  }
  removeMotion(dspCode, paramPath, sensor) {
    return this.applyToLabel(dspCode, paramPath, (label) => this.removeMeta(label, sensor));
  }
  upsertMotionLink(dspCode, paramPath, motionLibAddress) {
    return this.applyToLabel(dspCode, paramPath, (label) => this.upsertMeta(label, "motion", motionLibAddress));
  }
  removeMotionLink(dspCode, paramPath) {
    return this.applyToLabel(dspCode, paramPath, (label) => this.removeMeta(label, "motion"));
  }
  readMotionLink(dspCode, paramPath) {
    const found = this.findLabelIndex(dspCode, paramPath);
    if (!found)
      return null;
    const match2 = found.label.match(/\[motion:\s*([^\]]+)\]/);
    return match2 ? match2[1].trim() : null;
  }
  upsertShowName(dspCode, paramPath, showName) {
    return this.applyToLabel(dspCode, paramPath, (label) => this.upsertMeta(label, "showName", showName));
  }
  removeShowName(dspCode, paramPath) {
    return this.applyToLabel(dspCode, paramPath, (label) => this.removeMeta(label, "showName"));
  }
  upsertCueManager(dspCode, cueEntries) {
    const content = cueEntries.map((e) => `${e.index}:'${e.tip}'`).join("; ");
    const newMeta = `[touchCueManager: {${content}}]`;
    const trigCueLabelRegex = /"([^"]*\[SHCUI:[^\]]*trigCue[^\]]*\][^"]*)"/;
    const match2 = dspCode.match(trigCueLabelRegex);
    if (match2) {
      const oldLabel = match2[1];
      const cleanLabel = oldLabel.replace(/\s*\[touchCueManager:[^\]]*\]/g, "").trimEnd();
      const newLabel = cleanLabel + " " + newMeta;
      return dspCode.replace(match2[0], `"${newLabel}"`);
    }
    const declContent = cueEntries.map((e) => `${e.index}:${e.tip}`).join("; ");
    const newDecl = `declare touchCueManager "{${declContent}}";`;
    const existingRegex = /declare\s+touchCueManager\s+"[^"]*"\s*;/;
    if (existingRegex.test(dspCode))
      return dspCode.replace(existingRegex, newDecl);
    return newDecl + "\n" + dspCode;
  }
}
const MOTION_LIB_PARAMS = [
  // Smooth acc
  { name: "sxp", label: "sxp — smooth acc X+" },
  { name: "syp", label: "syp — smooth acc Y+" },
  { name: "szp", label: "szp — smooth acc Z+" },
  { name: "sxn", label: "sxn — smooth acc X−" },
  { name: "syn", label: "syn — smooth acc Y−" },
  { name: "szn", label: "szn — smooth acc Z−" },
  // Interpolated tilt
  { name: "ixp", label: "ixp — interp. tilt X+" },
  { name: "iyp", label: "iyp — interp. tilt Y+" },
  { name: "izp", label: "izp — interp. tilt Z+" },
  { name: "ixn", label: "ixn — interp. tilt X−" },
  { name: "iyn", label: "iyn — interp. tilt Y−" },
  { name: "izn", label: "izn — interp. tilt Z−" },
  // Projected interpolated tilt
  { name: "pixp", label: "pixp — proj. interp. X+" },
  { name: "piyp", label: "piyp — proj. interp. Y+" },
  { name: "pizp", label: "pizp — proj. interp. Z+" },
  { name: "pixn", label: "pixn — proj. interp. X−" },
  { name: "piyn", label: "piyn — proj. interp. Y−" },
  { name: "pizn", label: "pizn — proj. interp. Z−" },
  // Normalised acc
  { name: "axpn", label: "axpn — norm. acc X+" },
  { name: "aypn", label: "aypn — norm. acc Y+" },
  { name: "azpn", label: "azpn — norm. acc Z+" },
  // Raw acc direction
  { name: "axp", label: "axp — acc X+" },
  { name: "ayp", label: "ayp — acc Y+" },
  { name: "azp", label: "azp — acc Z+" },
  { name: "axn", label: "axn — acc X−" },
  { name: "ayn", label: "ayn — acc Y−" },
  { name: "azn", label: "azn — acc Z−" },
  { name: "totalaccel", label: "totalaccel — total accel magnitude" },
  // Gyro normalised
  { name: "gxpn", label: "gxpn — norm. gyro X+" },
  { name: "gypn", label: "gypn — norm. gyro Y+" },
  { name: "gzpn", label: "gzpn — norm. gyro Z+" },
  // Gyro direction
  { name: "gxp", label: "gxp — gyro X+" },
  { name: "gyp", label: "gyp — gyro Y+" },
  { name: "gzp", label: "gzp — gyro Z+" },
  { name: "gxn", label: "gxn — gyro X−" },
  { name: "gyn", label: "gyn — gyro Y−" },
  { name: "gzn", label: "gzn — gyro Z−" },
  { name: "totalgyro", label: "totalgyro — total gyro magnitude" },
  // Normalised interpolated tilt
  { name: "ixpn", label: "ixpn — norm. interp. X+" },
  { name: "iypn", label: "iypn — norm. interp. Y+" },
  { name: "izpn", label: "izpn — norm. interp. Z+" },
  { name: "ixpn_sym", label: "ixpn_sym — sym. norm. interp. X" },
  { name: "iypn_sym", label: "iypn_sym — sym. norm. interp. Y" },
  { name: "izpn_sym", label: "izpn_sym — sym. norm. interp. Z" },
  // Direction of swing
  { name: "dosx", label: "dosx — direction of swing X" },
  { name: "dosy", label: "dosy — direction of swing Y" },
  // Matrix X
  { name: "MXxraw", label: "MXxraw" },
  { name: "MXxneg", label: "MXxneg" },
  { name: "MXxpos", label: "MXxpos" },
  { name: "MXyraw", label: "MXyraw" },
  { name: "MXyneg", label: "MXyneg" },
  { name: "MXypos", label: "MXypos" },
  { name: "MXzraw", label: "MXzraw" },
  { name: "MXzneg", label: "MXzneg" },
  { name: "MXzpos", label: "MXzpos" },
  // Matrix Y
  { name: "MYxraw", label: "MYxraw" },
  { name: "MYxneg", label: "MYxneg" },
  { name: "MYxpos", label: "MYxpos" },
  { name: "MYyraw", label: "MYyraw" },
  { name: "MYyneg", label: "MYyneg" },
  { name: "MYypos", label: "MYypos" },
  { name: "MYzraw", label: "MYzraw" },
  { name: "MYzneg", label: "MYzneg" },
  { name: "MYzpos", label: "MYzpos" },
  // Matrix Z
  { name: "MZxraw", label: "MZxraw" },
  { name: "MZxneg", label: "MZxneg" },
  { name: "MZxpos", label: "MZxpos" },
  { name: "MZyraw", label: "MZyraw" },
  { name: "MZyneg", label: "MZyneg" },
  { name: "MZypos", label: "MZypos" },
  { name: "MZzraw", label: "MZzraw" },
  { name: "MZzneg", label: "MZzneg" },
  { name: "MZzpos", label: "MZzpos" },
  // Amplitude
  { name: "AmpX", label: "AmpX — amplitude X" },
  { name: "AmpY", label: "AmpY — amplitude Y" },
  { name: "AmpZ", label: "AmpZ — amplitude Z" },
  // Gyro XY
  { name: "gyro_xy", label: "gyro_xy — gyro XY combined" }
];
class MotionPanel {
  constructor(options) {
    this.editor = new DSPMetadataEditor();
    this.motionParser = new MotionParser();
    this.params = [];
    this.container = options.container;
    this.getCode = options.getCode;
    this.setCode = options.setCode;
    this.getDspJson = options.getDspJson;
    this.container.style.cssText = "overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;";
  }
  setParams(params) {
    this.params = params;
    this.render();
  }
  parseParamsFromCode(code) {
    const parsed = parseParams(code);
    const params = parsed.map(({ paramPath, fullLabel }, id) => ({
      id,
      address: paramPath,
      min: 0,
      max: 1,
      init: 0,
      accMeta: this.extractMetaFromLabel(fullLabel, "acc"),
      gyrMeta: this.extractMetaFromLabel(fullLabel, "gyr"),
      motionMeta: this.extractMetaFromLabel(fullLabel, "motion"),
      showNameMeta: this.extractMetaFromLabel(fullLabel, "showName")
    }));
    this.params = params;
    this.render();
  }
  extractMetaFromLabel(fullLabel, key) {
    const m = fullLabel.match(new RegExp(`\\[${key}:\\s*([^\\]]+)\\]`));
    return m ? m[1].trim() : void 0;
  }
  render() {
    this.container.innerHTML = "";
    const code = this.getCode();
    const parsed = this.motionParser.parse(code);
    const dspJson = this.getDspJson ? this.getDspJson() : null;
    const { usedParams: filteredParams, hiddenCount } = filterUsedParams(this.params, dspJson);
    const titleA = document.createElement("div");
    titleA.textContent = "Motion Lib Parameter Link [motion: ...]";
    titleA.style.cssText = "padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;";
    this.container.appendChild(titleA);
    const descA = document.createElement("div");
    descA.style.cssText = "padding:3px 10px 5px;color:#666;font-size:10px;line-height:1.5;";
    descA.textContent = "Link a motion lib pre-processed sensor output to a DSP parameter.";
    this.container.appendChild(descA);
    if (!dspJson && this.params.length > 0) {
      const guidance = document.createElement("div");
      guidance.style.cssText = "padding:8px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#fa4;font-size:11px;line-height:1.5;";
      guidance.textContent = '⚠️ Please compile DSP first (click "Run" button) to enable parameter filtering';
      this.container.appendChild(guidance);
    }
    if (hiddenCount > 0) {
      const notification = document.createElement("div");
      notification.style.cssText = "padding:4px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#888;font-size:10px;";
      notification.textContent = `Note: ${hiddenCount} unused parameter(s) hidden from list`;
      this.container.appendChild(notification);
    }
    if (filteredParams.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = hiddenCount > 0 ? "All parameters are unused. No parameters to display." : 'Click "Parse DSP" to load parameters.';
      empty.style.cssText = "padding:8px 10px;color:#666;font-size:11px;";
      this.container.appendChild(empty);
    } else {
      for (const param of filteredParams) {
        this.container.appendChild(this.makeMotionLinkRow(param));
      }
    }
    const titleB = document.createElement("div");
    titleB.textContent = "Native Faust Sensor Mapping [acc/gyr: ...]";
    titleB.style.cssText = "padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-top:2px solid #333;border-bottom:1px solid #333;margin-top:8px;";
    this.container.appendChild(titleB);
    if (filteredParams.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = hiddenCount > 0 ? "All parameters are unused. No parameters to display." : 'Click "Parse DSP" to load parameters.';
      empty.style.cssText = "padding:8px 10px;color:#666;font-size:11px;";
      this.container.appendChild(empty);
    } else {
      for (const param of filteredParams) {
        const existing = parsed.data.filter((m) => m.paramPath === param.address);
        this.container.appendChild(this.makeAccGyrRow(param, existing));
      }
    }
  }
  makeMotionLinkRow(param) {
    const row = document.createElement("div");
    row.style.cssText = "padding:5px 10px;border-bottom:1px solid #2a2a2a;display:flex;align-items:center;gap:6px;";
    const label = document.createElement("span");
    label.textContent = param.address.split("/").pop() || param.address;
    label.title = param.address;
    label.style.cssText = "color:#aaa;font-size:11px;min-width:70px;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0;";
    row.appendChild(label);
    const sel = document.createElement("select");
    sel.style.cssText = "flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 4px;font-size:11px;";
    const noneOpt = document.createElement("option");
    noneOpt.value = "";
    noneOpt.textContent = "— none —";
    sel.appendChild(noneOpt);
    for (const mp of MOTION_LIB_PARAMS) {
      const opt = document.createElement("option");
      opt.value = mp.name;
      opt.textContent = mp.label;
      if (param.motionMeta === mp.name)
        opt.selected = true;
      sel.appendChild(opt);
    }
    if (param.motionMeta && !MOTION_LIB_PARAMS.find((mp) => mp.name === param.motionMeta)) {
      const customOpt = document.createElement("option");
      customOpt.value = param.motionMeta;
      customOpt.textContent = `${param.motionMeta} (custom)`;
      customOpt.selected = true;
      sel.appendChild(customOpt);
    }
    const preview = document.createElement("span");
    const updatePreview = () => {
      preview.textContent = sel.value ? `[motion: ${sel.value}]` : "";
    };
    preview.style.cssText = "font-family:monospace;font-size:10px;color:#666;flex-shrink:0;";
    updatePreview();
    sel.addEventListener("change", () => {
      updatePreview();
      const val = sel.value;
      const code = this.getCode();
      const updated = val ? this.editor.upsertMotionLink(code, param.address, val) : this.editor.removeMotionLink(code, param.address);
      if (updated !== code)
        this.setCode(updated);
    });
    row.appendChild(sel);
    row.appendChild(preview);
    return row;
  }
  makeAccGyrRow(param, existing) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "padding:6px 10px;border-bottom:1px solid #2a2a2a;";
    const header = document.createElement("div");
    header.style.cssText = "display:flex;align-items:center;gap:6px;margin-bottom:4px;";
    const label = document.createElement("span");
    label.textContent = param.address.split("/").pop() || param.address;
    label.title = param.address;
    label.style.cssText = "color:#aaa;font-size:11px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
    header.appendChild(label);
    const rangeInfo = document.createElement("span");
    rangeInfo.textContent = `[${param.min}…${param.max}]`;
    rangeInfo.style.cssText = "color:#666;font-size:10px;";
    header.appendChild(rangeInfo);
    wrap.appendChild(header);
    for (const m of existing)
      wrap.appendChild(this.makeMappingDisplay(param, m));
    wrap.appendChild(this.makeAddMappingForm(param));
    return wrap;
  }
  makeMappingDisplay(param, m) {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:4px;margin-bottom:3px;background:#2a2a2a;border-radius:3px;padding:3px 6px;";
    const info = document.createElement("span");
    info.textContent = `[${m.sensor}: axis=${m.axis} curve=${m.curve} ${m.amin}…${m.amid}…${m.amax}]`;
    info.style.cssText = "flex:1;color:#8cf;font-size:10px;font-family:monospace;";
    row.appendChild(info);
    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.style.cssText = "background:#5a2020;color:#fff;border:none;border-radius:2px;padding:1px 5px;cursor:pointer;font-size:10px;";
    delBtn.addEventListener("click", () => {
      const code = this.getCode();
      const updated = this.editor.removeMotion(code, param.address, m.sensor);
      if (updated !== code) {
        this.setCode(updated);
        this.render();
      }
    });
    row.appendChild(delBtn);
    return row;
  }
  makeAddMappingForm(param) {
    const form = document.createElement("div");
    form.style.cssText = "display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin-top:2px;";
    const makeSelect = (options, defaultVal) => {
      const sel = document.createElement("select");
      sel.style.cssText = "background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:1px 3px;font-size:11px;";
      for (const o of options) {
        const opt = document.createElement("option");
        opt.value = o;
        opt.textContent = o;
        if (o === defaultVal)
          opt.selected = true;
        sel.appendChild(opt);
      }
      return sel;
    };
    const makeNumInput = (placeholder, defaultVal) => {
      const inp = document.createElement("input");
      inp.type = "number";
      inp.placeholder = placeholder;
      inp.value = defaultVal;
      inp.style.cssText = "width:52px;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:1px 3px;font-size:11px;";
      return inp;
    };
    const sensorSel = makeSelect(["acc", "gyr"], "acc");
    const axisSel = makeSelect(["0", "1", "2"], "0");
    const curveSel = makeSelect(["0", "1", "2"], "0");
    const aminInp = makeNumInput("amin", String(param.min));
    const amidInp = makeNumInput("amid", "0");
    const amaxInp = makeNumInput("amax", String(param.max));
    const addBtn = document.createElement("button");
    addBtn.textContent = "+ Add";
    addBtn.style.cssText = "background:#2a4a2a;color:#fff;border:none;border-radius:3px;padding:2px 8px;cursor:pointer;font-size:11px;";
    addBtn.addEventListener("click", () => {
      const amin = parseFloat(aminInp.value), amid = parseFloat(amidInp.value), amax = parseFloat(amaxInp.value);
      if (amin >= amax) {
        alert("amin must be less than amax");
        return;
      }
      const mapping = {
        paramPath: param.address,
        sensor: sensorSel.value,
        axis: parseInt(axisSel.value),
        curve: parseInt(curveSel.value),
        amin,
        amid,
        amax
      };
      const code = this.getCode();
      const updated = this.editor.upsertMotion(code, param.address, mapping);
      if (updated !== code) {
        this.setCode(updated);
        this.render();
      }
    });
    for (const el of [sensorSel, axisSel, curveSel, aminInp, amidInp, amaxInp, addBtn]) {
      form.appendChild(el);
    }
    return form;
  }
}
class CuePanel {
  constructor(options) {
    this.editor = new DSPMetadataEditor();
    this.parser = new SHCUIParser();
    this.container = options.container;
    this.getCode = options.getCode;
    this.setCode = options.setCode;
    this.container.style.cssText = "overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;";
    this.render();
  }
  refresh() {
    this.render();
  }
  // ── Strip comments from DSP code before analysis ──────────────────────────
  stripComments(code) {
    let stripped = code.replace(/\/\*[\s\S]*?\*\//g, "");
    stripped = stripped.replace(/\/\/[^\n]*/g, "");
    return stripped;
  }
  // ── Detect trigCue in non-comment code ────────────────────────────────────
  detectTrigCue(code) {
    const stripped = this.stripComments(code);
    return /\[SHCUI:[^\]]*trigCue[^\]]*\]/.test(stripped);
  }
  // ── Extract all DSP param labels from non-comment code ───────────────────
  extractParams(code) {
    const stripped = this.stripComments(code);
    const parsed = parseParams(stripped);
    return parsed.map((p) => p.paramPath);
  }
  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    this.container.innerHTML = "";
    const code = this.getCode();
    const title = document.createElement("div");
    title.textContent = "Cue System [touchCueManager: ...]";
    title.style.cssText = "padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;";
    this.container.appendChild(title);
    if (!this.detectTrigCue(code)) {
      this.renderCreateCue(code);
    } else {
      this.renderCueEditor(code);
    }
  }
  // ── No trigCue: show create form ──────────────────────────────────────────
  renderCreateCue(code) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "padding:10px;";
    const info = document.createElement("div");
    info.style.cssText = "background:#2a1a00;border:1px solid #6a4a00;border-radius:4px;padding:10px 12px;margin-bottom:12px;font-size:11px;line-height:1.7;";
    info.innerHTML = `
      <div style="color:#fa0;font-weight:bold;margin-bottom:4px;">⚠ No trigCue element found</div>
      <div style="color:#aaa;">The cue system requires a SHCUI element with type <code style="color:#8cf;">trigCue</code>.</div>
      <div style="color:#888;margin-top:6px;">Select an existing DSP parameter to attach <b>trigCue</b> to, or type a new parameter name.</div>
    `;
    wrap.appendChild(info);
    const params = this.extractParams(code);
    const selLabel = document.createElement("div");
    selLabel.textContent = "Link trigCue to parameter:";
    selLabel.style.cssText = "color:#ccc;font-size:11px;margin-bottom:4px;";
    wrap.appendChild(selLabel);
    const datalistId = `cue-params-${Date.now()}`;
    const datalist = document.createElement("datalist");
    datalist.id = datalistId;
    for (const p of params) {
      const opt = document.createElement("option");
      opt.value = p;
      datalist.appendChild(opt);
    }
    wrap.appendChild(datalist);
    const paramInput = document.createElement("input");
    paramInput.type = "text";
    paramInput.setAttribute("list", datalistId);
    paramInput.placeholder = params.length > 0 ? "Pick or type a param name…" : "e.g. myButton";
    paramInput.style.cssText = "background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:4px 8px;font-size:12px;width:220px;display:block;margin-bottom:6px;";
    wrap.appendChild(paramInput);
    const hint = document.createElement("div");
    hint.style.cssText = "font-size:10px;color:#555;margin-bottom:8px;";
    hint.textContent = params.length > 0 ? `${params.length} param(s) found in DSP — or type a new name` : "No params found — type a new param name to create one";
    wrap.appendChild(hint);
    const preview = document.createElement("div");
    preview.style.cssText = "font-family:monospace;font-size:10px;color:#666;margin-bottom:10px;min-height:14px;";
    const updatePreview = () => {
      const n = paramInput.value.trim();
      if (!n) {
        preview.textContent = "";
        return;
      }
      const exists = params.includes(n);
      preview.textContent = exists ? `Will add [SHCUI: main trigCue ...] + [touchCueManager: {...}] to "${n}"` : `Will insert button("${n} [SHCUI: main trigCue ...]", 0) into DSP`;
    };
    paramInput.addEventListener("input", updatePreview);
    wrap.appendChild(preview);
    const errMsg = document.createElement("div");
    errMsg.style.cssText = "color:#f44;font-size:11px;min-height:14px;margin-bottom:6px;";
    wrap.appendChild(errMsg);
    const createBtn = document.createElement("button");
    createBtn.textContent = "＋ Add trigCue & cue manager";
    createBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;";
    createBtn.addEventListener("click", () => {
      const name = paramInput.value.trim();
      if (!name) {
        errMsg.textContent = "Please enter or select a parameter name";
        return;
      }
      const stripped = this.stripComments(code);
      const paramExists = new RegExp(
        `(?:hslider|vslider|button|checkbox|nentry|hbargraph|vbargraph)\\s*\\(\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
      ).test(stripped);
      const defaultCues = Array.from({ length: 10 }, (_, i) => ({
        index: i + 1,
        tip: `Your sample${i + 1}`
      }));
      let updated = code;
      if (paramExists) {
        const shcuiEl = {
          paramPath: name,
          tab: "main",
          type: "trigCue",
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
        const newParam = `
button("${name} [SHCUI: main trigCue 40 45 20 10 255 100 50 200]", 0);
`;
        const processIdx = updated.search(/\bprocess\s*=/);
        if (processIdx !== -1) {
          updated = updated.slice(0, processIdx) + newParam + updated.slice(processIdx);
        } else {
          updated += newParam;
        }
      }
      updated = this.editor.upsertCueManager(updated, defaultCues);
      this.setCode(updated);
      this.render();
    });
    wrap.appendChild(createBtn);
    this.container.appendChild(wrap);
  }
  // ── Has trigCue: show editor ──────────────────────────────────────────────
  renderCueEditor(code) {
    const entries = this.parser.parseCueManager(code);
    const badge = document.createElement("div");
    badge.style.cssText = "padding:4px 10px;font-size:10px;color:#4a4;background:#1a2a1a;border-bottom:1px solid #2a3a2a;";
    badge.textContent = "✓ trigCue element detected — editing touchCueManager";
    this.container.appendChild(badge);
    const listWrap = document.createElement("div");
    listWrap.style.cssText = "padding:6px 10px;";
    const currentEntries = [...entries];
    const renderList = () => {
      listWrap.innerHTML = "";
      for (let i = 0; i < currentEntries.length; i++) {
        const entry = currentEntries[i];
        const row = document.createElement("div");
        row.style.cssText = "display:flex;align-items:center;gap:6px;margin-bottom:4px;";
        const indexLabel = document.createElement("span");
        indexLabel.textContent = `${entry.index}:`;
        indexLabel.style.cssText = "color:#666;font-size:11px;width:20px;flex-shrink:0;";
        row.appendChild(indexLabel);
        const tipInput = document.createElement("input");
        tipInput.type = "text";
        tipInput.value = entry.tip;
        tipInput.style.cssText = "flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:2px 5px;font-size:11px;";
        tipInput.addEventListener("input", () => {
          currentEntries[i] = { index: entry.index, tip: tipInput.value };
        });
        row.appendChild(tipInput);
        const delBtn = document.createElement("button");
        delBtn.textContent = "✕";
        delBtn.style.cssText = "background:#5a2020;color:#fff;border:none;border-radius:2px;padding:1px 5px;cursor:pointer;font-size:10px;";
        delBtn.addEventListener("click", () => {
          currentEntries.splice(i, 1);
          currentEntries.forEach((e, idx) => {
            e.index = idx + 1;
          });
          renderList();
        });
        row.appendChild(delBtn);
        listWrap.appendChild(row);
      }
      const addRow = document.createElement("div");
      addRow.style.cssText = "display:flex;gap:6px;margin-top:4px;";
      const addBtn = document.createElement("button");
      addBtn.textContent = "+ Add Cue";
      addBtn.style.cssText = "background:#2a4a2a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
      addBtn.addEventListener("click", () => {
        currentEntries.push({ index: currentEntries.length + 1, tip: `Your sample${currentEntries.length + 1}` });
        renderList();
      });
      addRow.appendChild(addBtn);
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "✓ Save";
      saveBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
      saveBtn.addEventListener("click", () => {
        const c = this.getCode();
        const updated = this.editor.upsertCueManager(c, currentEntries);
        if (updated !== c)
          this.setCode(updated);
      });
      addRow.appendChild(saveBtn);
      listWrap.appendChild(addRow);
    };
    renderList();
    this.container.appendChild(listWrap);
    if (entries.length > 0) {
      const preview = document.createElement("div");
      preview.style.cssText = "padding:6px 10px;border-top:1px solid #333;";
      const previewTitle = document.createElement("div");
      previewTitle.textContent = "Current cue list:";
      previewTitle.style.cssText = "color:#888;font-size:10px;margin-bottom:4px;";
      preview.appendChild(previewTitle);
      for (const e of entries) {
        const item = document.createElement("div");
        item.textContent = `${e.index}: ${e.tip}`;
        item.style.cssText = "color:#8cf;font-size:11px;font-family:monospace;";
        preview.appendChild(item);
      }
      this.container.appendChild(preview);
    }
    const help = document.createElement("div");
    help.style.cssText = "padding:6px 10px;border-top:1px solid #333;color:#666;font-size:10px;line-height:1.6;";
    help.innerHTML = `<b style="color:#888">Cue control types (set via SHCUI type):</b><br>
      trigCue — trigger current cue and advance<br>
      nextCue — advance to next cue<br>
      prevCue — go back to previous cue<br>
      initCue — reset to first cue`;
    this.container.appendChild(help);
  }
}
class ShowNamePanel {
  constructor(options) {
    this.editor = new DSPMetadataEditor();
    this.params = [];
    this.container = options.container;
    this.getCode = options.getCode;
    this.setCode = options.setCode;
    this.getDspJson = options.getDspJson;
    this.container.style.cssText = "overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;";
    this.render();
  }
  setParams(params) {
    this.params = params;
    this.render();
  }
  parseParamsFromCode(code) {
    const parsed = parseParams(code);
    const params = parsed.map(({ paramPath, fullLabel }, id) => {
      const snMatch = fullLabel.match(/\[showName:\s*([^\]]+)\]/);
      return {
        id,
        address: paramPath,
        min: 0,
        max: 1,
        init: 0,
        showNameMeta: snMatch ? snMatch[1].trim() : void 0
      };
    });
    this.params = params;
    this.render();
  }
  render() {
    this.container.innerHTML = "";
    const title = document.createElement("div");
    title.textContent = "Parameter Display Names [showName: ...]";
    title.style.cssText = "padding:8px 10px 4px;font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;";
    this.container.appendChild(title);
    const help = document.createElement("div");
    help.style.cssText = "padding:4px 10px 6px;color:#666;font-size:10px;line-height:1.5;border-bottom:1px solid #2a2a2a;";
    help.textContent = 'Parameters with a showName will appear in the SHCdyna Setting page "DSP Parameters" list, allowing performers to adjust values at runtime.';
    this.container.appendChild(help);
    const dspJson = this.getDspJson ? this.getDspJson() : null;
    const { usedParams: filteredParams, hiddenCount } = filterUsedParams(this.params, dspJson);
    if (!dspJson && this.params.length > 0) {
      const guidance = document.createElement("div");
      guidance.style.cssText = "padding:8px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#fa4;font-size:11px;line-height:1.5;";
      guidance.textContent = '⚠️ Please compile DSP first (click "Run" button) to enable parameter filtering';
      this.container.appendChild(guidance);
    }
    if (hiddenCount > 0) {
      const notification = document.createElement("div");
      notification.style.cssText = "padding:4px 10px;background:#2a2a1a;border-bottom:1px solid #3a3a2a;color:#888;font-size:10px;";
      notification.textContent = `Note: ${hiddenCount} unused parameter(s) hidden from list`;
      this.container.appendChild(notification);
    }
    if (filteredParams.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = hiddenCount > 0 ? "All parameters are unused. No parameters to display." : 'No parameters found. Click "Parse DSP" to load parameters.';
      empty.style.cssText = "padding:8px 10px;color:#666;font-size:11px;";
      this.container.appendChild(empty);
      return;
    }
    const active = filteredParams.filter((p) => p.showNameMeta);
    if (active.length > 0) {
      const previewWrap = document.createElement("div");
      previewWrap.style.cssText = "padding:6px 10px;background:#252526;border-bottom:1px solid #333;";
      const previewTitle = document.createElement("div");
      previewTitle.textContent = `✓ ${active.length} parameter(s) visible in Setting page:`;
      previewTitle.style.cssText = "color:#4a4;font-size:10px;margin-bottom:3px;font-weight:bold;";
      previewWrap.appendChild(previewTitle);
      for (const p of active) {
        const item = document.createElement("div");
        item.textContent = `"${p.showNameMeta}" → ${p.address}`;
        item.style.cssText = "color:#8cf;font-size:10px;font-family:monospace;padding-left:8px;";
        previewWrap.appendChild(item);
      }
      this.container.appendChild(previewWrap);
    }
    for (const param of filteredParams) {
      this.container.appendChild(this.makeParamRow(param));
    }
  }
  makeParamRow(param) {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid #2a2a2a;";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!param.showNameMeta;
    checkbox.style.cssText = "cursor:pointer;";
    checkbox.addEventListener("change", () => {
      if (!checkbox.checked) {
        const code = this.getCode();
        const updated = this.editor.removeShowName(code, param.address);
        if (updated !== code) {
          this.setCode(updated);
          param.showNameMeta = void 0;
          this.render();
        }
      } else {
        const defaultName = param.address.split("/").pop() || param.address;
        const code = this.getCode();
        const updated = this.editor.upsertShowName(code, param.address, defaultName);
        if (updated !== code) {
          this.setCode(updated);
          param.showNameMeta = defaultName;
          this.render();
        }
      }
    });
    row.appendChild(checkbox);
    const label = document.createElement("span");
    const displayName = param.address.split("/").pop() || param.address;
    label.textContent = displayName;
    label.title = `Full path: ${param.address}`;
    label.style.cssText = "color:#aaa;font-size:11px;min-width:100px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
    row.appendChild(label);
    if (param.showNameMeta) {
      const arrow = document.createElement("span");
      arrow.textContent = "→";
      arrow.style.cssText = "color:#666;font-size:11px;";
      row.appendChild(arrow);
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Display name";
      input.value = param.showNameMeta || "";
      input.style.cssText = "flex:1;background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:3px;padding:3px 6px;font-size:11px;";
      const updateBtn = document.createElement("button");
      updateBtn.textContent = "Update";
      updateBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
      updateBtn.addEventListener("click", () => {
        const val = input.value.trim();
        if (!val) {
          alert("Display name cannot be empty. Uncheck the checkbox to remove showName.");
          return;
        }
        const code = this.getCode();
        const updated = this.editor.upsertShowName(code, param.address, val);
        if (updated !== code) {
          this.setCode(updated);
          param.showNameMeta = val;
          this.render();
        }
      });
      row.appendChild(input);
      row.appendChild(updateBtn);
    } else {
      const hint = document.createElement("span");
      hint.textContent = "(check to enable)";
      hint.style.cssText = "color:#555;font-size:10px;font-style:italic;";
      row.appendChild(hint);
    }
    return row;
  }
}
class HelpPanel {
  constructor(options) {
    this.container = options.container;
    this.container.style.cssText = "overflow-y:auto;height:100%;background:#1e1e1e;color:#ccc;font-size:12px;padding:10px;box-sizing:border-box;";
    this.render();
  }
  section(title, content) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "margin-bottom:14px;";
    const h = document.createElement("div");
    h.textContent = title;
    h.style.cssText = "font-weight:bold;color:#4af;font-size:12px;border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:6px;";
    wrap.appendChild(h);
    const body = document.createElement("div");
    body.style.cssText = "color:#bbb;font-size:11px;line-height:1.7;";
    body.innerHTML = content;
    wrap.appendChild(body);
    return wrap;
  }
  code(text) {
    return `<code style="background:#2a2a2a;color:#8cf;padding:1px 4px;border-radius:2px;font-family:monospace;">${text}</code>`;
  }
  render() {
    this.container.innerHTML = "";
    const title = document.createElement("div");
    title.textContent = "📖 FaustPiece Editor — Help";
    title.style.cssText = "font-weight:bold;color:#4af;font-size:13px;margin-bottom:12px;";
    this.container.appendChild(title);
    this.container.appendChild(this.section("1. .FaustPiece File Format", `
      <b style="color:#ccc">.FaustPiece</b> is the package format used by SHCdyna — a ZIP archive containing:<br>
      • A ${this.code(".dsp")} Faust DSP source file with the <b>same name</b> as the archive (<b>required</b>)<br>
      • Optional audio files (${this.code(".wav")} / ${this.code(".aif")} / ${this.code(".flac")})<br>
      • Optional Faust library files (${this.code(".dsp")})<br><br>
      <b style="color:#e88">Naming rule:</b> No spaces in the filename. The main DSP filename inside the archive must match the archive name (without extension).
    `));
    const shcuiTypeList = SHCUI_TYPES.map((t2) => this.code(t2)).join(" ");
    this.container.appendChild(this.section("2. SHCUI Metadata Syntax", `
      Add a ${this.code("[SHCUI: ...]")} declaration inside a DSP parameter label:<br><br>
      ${this.code("[SHCUI: &lt;tab&gt; &lt;type&gt; &lt;x&gt; &lt;y&gt; &lt;w&gt; &lt;h&gt; &lt;R&gt; &lt;G&gt; &lt;B&gt; &lt;A&gt;]")}<br><br>
      • ${this.code("tab")} — tab page name<br>
      • ${this.code("type")} — widget type (see list below)<br>
      • ${this.code("x y w h")} — screen percentage coordinates (0–100)<br>
      • ${this.code("R G B A")} — color values (0–255)<br><br>
      <b style="color:#ccc">Valid SHCUI types:</b><br>${shcuiTypeList}<br><br>
      <b style="color:#ccc">Example:</b><br>
      ${this.code('hslider("freq [SHCUI: main hslider 10 20 80 10 255 100 50 200]", 440, 20, 2000, 1)')}
    `));
    this.container.appendChild(this.section("3. Motion Mapping Metadata Syntax", `
      <b style="color:#ccc">Native Faust sensor mapping (acc / gyr):</b><br>
      ${this.code("[acc: &lt;axis&gt; &lt;curve&gt; &lt;amin&gt; &lt;amid&gt; &lt;amax&gt;]")}<br>
      ${this.code("[gyr: &lt;axis&gt; &lt;curve&gt; &lt;amin&gt; &lt;amid&gt; &lt;amax&gt;]")}<br><br>
      • ${this.code("axis")} — sensor axis (0=X, 1=Y, 2=Z)<br>
      • ${this.code("curve")} — mapping curve (0=rising, 1=falling, 2=rise-then-fall)<br>
      • ${this.code("amin amid amax")} — mapping range (amin &lt; amax)<br><br>
      <b style="color:#ccc">Motion Lib parameter link:</b><br>
      ${this.code("[motion: &lt;motionLibParamAddress&gt;]")}<br><br>
      Example: ${this.code("[motion: /motionLib/ixp]")} (links interpolated pitch to this parameter)<br><br>
      <b style="color:#ccc">Direct sensor addresses supported by SHCdyna:</b><br>
      ${[
      "/yaw",
      "/pitch",
      "/roll",
      "/useraccX",
      "/useraccY",
      "/useraccZ",
      "/quaternionW",
      "/quaternionX",
      "/quaternionY",
      "/quaternionZ",
      "/compass"
    ].map((a) => this.code(a)).join("  ")}
    `));
    this.container.appendChild(this.section("4. Cue System Syntax", `
      <b style="color:#ccc">Global cue tip text declaration:</b><br>
      ${this.code('declare touchCueManager "{1:tip1; 2:tip2; ...}";')}<br><br>
      <b style="color:#ccc">Cue control types (set via SHCUI type field):</b><br>
      • ${this.code("trigCue")} — trigger current cue and advance<br>
      • ${this.code("nextCue")} — advance to next cue<br>
      • ${this.code("prevCue")} — go back to previous cue<br>
      • ${this.code("initCue")} — reset to first cue<br><br>
      SHCdyna uses the ${this.code("/cue")} parameter integer value to determine the current cue and display the corresponding tip text.
    `));
    this.container.appendChild(this.section("5. showName Metadata Syntax", `
      ${this.code("[showName: &lt;display name&gt;]")}<br><br>
      Parameters with this declaration appear in the SHCdyna Setting page "DSP Parameters" picker, allowing performers to adjust values at runtime.<br><br>
      Example: ${this.code('hslider("freq [showName: Frequency]", 440, 20, 2000, 1)')}
    `));
    this.container.appendChild(this.section("6. Code Autocomplete", `
      When you type ${this.code("[SHCUI:")} in the DSP code editor, the editor will suggest valid SHCUI_Type options:<br><br>
      ${SHCUI_TYPES.map((t2) => this.code(t2)).join("  ")}
    `));
    const linkSection = this.section("7. External Documentation", "");
    const link = document.createElement("a");
    link.href = "https://github.com/RuolunWeng/SHCdyna/wiki/Manual_EN";
    link.textContent = "📎 SHCdyna Wiki — Manual_EN";
    link.target = "_blank";
    link.style.cssText = "color:#4af;font-size:11px;text-decoration:underline;cursor:pointer;";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof window !== "undefined" && window.open) {
        window.open("https://github.com/RuolunWeng/SHCdyna/wiki/Manual_EN", "_blank");
      }
    });
    linkSection.querySelector("div:last-child").appendChild(link);
    this.container.appendChild(linkSection);
  }
}
class FaustPiecePackager {
  async unpack(data, fileName) {
    const JSZip = (await __vitePreload(() => import("./jszip.min-9f6be5f5.js").then((n) => n.j), true ? [] : void 0)).default;
    const zip = await JSZip.loadAsync(data);
    const baseName = fileName.replace(/\.FaustPiece$/i, "");
    const mainDspName = `${baseName}.dsp`;
    const mainDspFile = zip.file(mainDspName);
    if (!mainDspFile)
      throw new Error(`Invalid .FaustPiece: missing main DSP file "${mainDspName}"`);
    const mainDspContent = await mainDspFile.async("string");
    const attachments = [];
    zip.forEach((relativePath) => {
      if (relativePath !== mainDspName)
        attachments.push(relativePath);
    });
    return { mainDspPath: mainDspName, mainDspContent, attachments, tempDir: "" };
  }
  async pack(options, attachmentContents = /* @__PURE__ */ new Map()) {
    const JSZip = (await __vitePreload(() => import("./jszip.min-9f6be5f5.js").then((n) => n.j), true ? [] : void 0)).default;
    const zip = new JSZip();
    const mainDspName = `${options.outputName}.dsp`;
    zip.file(mainDspName, options.dspContent);
    for (const [filename, content] of attachmentContents) {
      const isAudio = /\.(wav|aif|aiff|flac)$/i.test(filename);
      const isLib = filename.endsWith(".dsp") && filename !== mainDspName;
      if (isAudio && !options.includeAudio)
        continue;
      if (isLib && !options.includeLibs)
        continue;
      zip.file(filename, content);
    }
    return zip.generateAsync({ type: "uint8array" });
  }
}
class FileNameValidator {
  validate(name) {
    if (!name || name.length === 0)
      return { valid: false, error: "File name cannot be empty." };
    if (name.includes(" "))
      return { valid: false, error: "File name must not contain spaces." };
    return { valid: true };
  }
}
function makeDivider(leftEl, rightEl, minPx = 60, maxPx = 600) {
  const divider = document.createElement("div");
  divider.style.cssText = [
    "width:5px;flex-shrink:0;cursor:col-resize;",
    "background:#2a2a2a;",
    "transition:background 0.15s;",
    "position:relative;z-index:1;"
  ].join("");
  const grip = document.createElement("div");
  grip.style.cssText = [
    "position:absolute;top:50%;left:50%;",
    "transform:translate(-50%,-50%);",
    "display:flex;flex-direction:column;gap:3px;",
    "pointer-events:none;"
  ].join("");
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = "width:3px;height:3px;border-radius:50%;background:#555;";
    grip.appendChild(dot);
  }
  divider.appendChild(grip);
  divider.addEventListener("mouseenter", () => {
    divider.style.background = "#3a3a3a";
  });
  divider.addEventListener("mouseleave", () => {
    divider.style.background = "#2a2a2a";
  });
  let dragging = false;
  let startX = 0;
  let startWidth = 0;
  divider.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    if (leftEl) {
      startWidth = leftEl.getBoundingClientRect().width;
    } else if (rightEl) {
      startWidth = rightEl.getBoundingClientRect().width;
    }
    divider.style.background = "#4af";
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  });
  document.addEventListener("mousemove", (e) => {
    if (!dragging)
      return;
    const dx = e.clientX - startX;
    if (leftEl) {
      const newW = Math.max(minPx, Math.min(maxPx, startWidth + dx));
      leftEl.style.width = `${newW}px`;
      leftEl.style.flexShrink = "0";
    } else if (rightEl) {
      const newW = Math.max(minPx, Math.min(maxPx, startWidth - dx));
      rightEl.style.width = `${newW}px`;
      rightEl.style.flexShrink = "0";
    }
  });
  document.addEventListener("mouseup", () => {
    if (!dragging)
      return;
    dragging = false;
    divider.style.background = "#2a2a2a";
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  });
  return divider;
}
class EditorPanel {
  constructor(options) {
    this.parser = new SHCUIParser();
    this.editor = new DSPMetadataEditor();
    this.packager = new FaustPiecePackager();
    this.validator = new FileNameValidator();
    this.pieceName = "";
    this.dspCode = "";
    this.attachments = /* @__PURE__ */ new Map();
    this.opts = options;
    this.buildUI();
  }
  // ── UI shell ──────────────────────────────────────────────────────────────
  buildUI() {
    const c = this.opts.container;
    c.style.cssText = "display:flex;flex-direction:column;height:100%;background:#1e1e1e;color:#ccc;overflow:hidden;";
    const toolbar = document.createElement("div");
    toolbar.style.cssText = "display:flex;align-items:center;gap:8px;padding:6px 10px;background:#252526;border-bottom:1px solid #3a3a3a;flex-shrink:0;flex-wrap:wrap;";
    const titleEl = document.createElement("span");
    titleEl.textContent = "🎵 FaustPiece Editor";
    titleEl.style.cssText = "font-weight:bold;color:#4af;font-size:13px;";
    toolbar.appendChild(titleEl);
    toolbar.appendChild(this.makeBtn("📂 Open .FaustPiece", "#1a3a5a", () => this.triggerOpen()));
    toolbar.appendChild(this.makeBtn("↻ Parse DSP", "#2a4a2a", () => this.parseFromDsp()));
    toolbar.appendChild(this.makeBtn("▶ Send to Editor", "#3a2a5a", () => this.pushToIdeEditor()));
    toolbar.appendChild(this.makeBtn("⬇ Save .FaustPiece", "#1a4a2a", () => this.saveFaustPiece()));
    toolbar.appendChild(this.makeBtn("💾 Save As...", "#2a3a4a", () => this.saveAsFaustPiece()));
    this.statusEl = document.createElement("span");
    this.statusEl.style.cssText = "font-size:11px;color:#888;margin-left:auto;";
    toolbar.appendChild(this.statusEl);
    c.appendChild(toolbar);
    this.landingArea = document.createElement("div");
    this.landingArea.style.cssText = "flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#555;";
    this.landingArea.innerHTML = `
      <div style="font-size:48px;">🎵</div>
      <div style="font-size:14px;color:#888;">Open a .FaustPiece file to start editing</div>
      <div style="font-size:11px;color:#555;max-width:360px;text-align:center;line-height:1.7;">
        A .FaustPiece is a ZIP archive containing a <code>.dsp</code> file with the same name as the archive,
        plus optional audio and library files.
      </div>
    `;
    this.landingArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.landingArea.style.background = "#252526";
    });
    this.landingArea.addEventListener("dragleave", () => {
      this.landingArea.style.background = "";
    });
    this.landingArea.addEventListener("drop", async (e) => {
      var _a;
      e.preventDefault();
      this.landingArea.style.background = "";
      const file = (_a = e.dataTransfer) == null ? void 0 : _a.files[0];
      if (file)
        await this.loadFile(file);
    });
    c.appendChild(this.landingArea);
    this.editingArea = document.createElement("div");
    this.editingArea.style.cssText = "flex:1;display:none;flex-direction:column;overflow:hidden;";
    c.appendChild(this.editingArea);
    this.buildEditingArea();
  }
  buildEditingArea() {
    const body = document.createElement("div");
    body.style.cssText = "flex:1;display:flex;overflow:hidden;";
    this.editingArea.appendChild(body);
    const sidebar = document.createElement("div");
    sidebar.style.cssText = "width:160px;flex-shrink:0;display:flex;flex-direction:column;background:#252526;overflow:hidden;";
    const sidebarTitle = document.createElement("div");
    sidebarTitle.style.cssText = "padding:5px 8px;font-size:10px;color:#666;border-bottom:1px solid #333;flex-shrink:0;text-transform:uppercase;letter-spacing:0.5px;";
    sidebarTitle.textContent = "Project Files";
    sidebar.appendChild(sidebarTitle);
    this.fileListEl = document.createElement("div");
    this.fileListEl.style.cssText = "flex:1;overflow-y:auto;padding:4px 0;";
    sidebar.appendChild(this.fileListEl);
    body.appendChild(sidebar);
    body.appendChild(makeDivider(sidebar, null, 80, 400));
    const main = document.createElement("div");
    main.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;";
    body.appendChild(main);
    const tabNav = document.createElement("div");
    tabNav.style.cssText = "display:flex;background:#252526;border-bottom:1px solid #3a3a3a;flex-shrink:0;";
    const tabContents = document.createElement("div");
    tabContents.style.cssText = "flex:1;overflow:hidden;display:flex;";
    const makeTab = (label, active = false) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.style.cssText = `padding:5px 12px;border:none;cursor:pointer;font-size:11px;background:${active ? "#1e1e1e" : "transparent"};color:${active ? "#4af" : "#888"};border-bottom:${active ? "2px solid #4af" : "2px solid transparent"};`;
      const pane = document.createElement("div");
      pane.style.cssText = `display:${active ? "flex" : "none"};flex:1;overflow:hidden;`;
      tabNav.appendChild(btn);
      tabContents.appendChild(pane);
      return [btn, pane];
    };
    const [shcuiBtn, shcuiPane] = makeTab("SHCUI", true);
    const [motionBtn, motionPane] = makeTab("Motion");
    const [cueBtn, cuePane] = makeTab("Cue");
    const [showNameBtn, showNamePane] = makeTab("ShowName");
    const [helpBtn, helpPane] = makeTab("Help");
    const allBtns = [shcuiBtn, motionBtn, cueBtn, showNameBtn, helpBtn];
    const allPanes = [shcuiPane, motionPane, cuePane, showNamePane, helpPane];
    allBtns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        var _a, _b, _c;
        allBtns.forEach((b, j) => {
          b.style.background = j === i ? "#1e1e1e" : "transparent";
          b.style.color = j === i ? "#4af" : "#888";
          b.style.borderBottom = j === i ? "2px solid #4af" : "2px solid transparent";
          allPanes[j].style.display = j === i ? "flex" : "none";
        });
        if (i === 1)
          (_a = this.motionPanel) == null ? void 0 : _a.parseParamsFromCode(this.dspCode);
        if (i === 2)
          (_b = this.cuePanel) == null ? void 0 : _b.refresh();
        if (i === 3)
          (_c = this.showNamePanel) == null ? void 0 : _c.parseParamsFromCode(this.dspCode);
      });
    });
    main.appendChild(tabNav);
    main.appendChild(tabContents);
    const canvasWrap = document.createElement("div");
    canvasWrap.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;";
    const propWrap = document.createElement("div");
    propWrap.style.cssText = "width:220px;flex-shrink:0;overflow-y:auto;";
    shcuiPane.appendChild(canvasWrap);
    shcuiPane.appendChild(makeDivider(null, propWrap, 100, 500));
    shcuiPane.appendChild(propWrap);
    const motionWrap = document.createElement("div");
    motionWrap.style.cssText = "flex:1;overflow:hidden;";
    motionPane.appendChild(motionWrap);
    const cueWrap = document.createElement("div");
    cueWrap.style.cssText = "flex:1;overflow:hidden;";
    cuePane.appendChild(cueWrap);
    const showNameWrap = document.createElement("div");
    showNameWrap.style.cssText = "flex:1;overflow:hidden;";
    showNamePane.appendChild(showNameWrap);
    const helpWrap = document.createElement("div");
    helpWrap.style.cssText = "flex:1;overflow:hidden;";
    helpPane.appendChild(helpWrap);
    const getCode = () => this.dspCode;
    const setCode = (code) => {
      this.dspCode = code;
    };
    this.canvas = new SHCUICanvas({
      container: canvasWrap,
      getCode: () => this.dspCode,
      getDspJson: this.opts.getDspJson,
      onChange: (el, x, y, w, h) => {
        this.dspCode = this.editor.upsertSHCUI(this.dspCode, el.paramPath, el);
        this.propPanel.updatePosition(x, y, w, h);
      },
      onAdd: (el) => {
        this.dspCode = this.editor.upsertSHCUI(this.dspCode, el.paramPath, el);
        this.propPanel.setElement(el);
      }
    });
    this.propPanel = new PropertyPanel({
      container: propWrap,
      onUpdate: (el) => {
        this.dspCode = this.editor.upsertSHCUI(this.dspCode, el.paramPath, el);
        this.canvas.render();
      },
      onDelete: (el) => {
        this.dspCode = this.editor.removeSHCUI(this.dspCode, el.paramPath);
        this.parseFromDsp();
        this.propPanel.setElement(null);
      }
    });
    setInterval(() => {
      const sel = this.canvas.getSelectedElement();
      if (this._lastSel !== sel) {
        this._lastSel = sel;
        this.propPanel.setElement(sel);
      }
    }, 100);
    this.motionPanel = new MotionPanel({ container: motionWrap, getCode, setCode, getDspJson: this.opts.getDspJson });
    this.cuePanel = new CuePanel({ container: cueWrap, getCode, setCode });
    this.showNamePanel = new ShowNamePanel({ container: showNameWrap, getCode, setCode, getDspJson: this.opts.getDspJson });
    this.helpPanel = new HelpPanel({ container: helpWrap });
  }
  // ── File open ─────────────────────────────────────────────────────────────
  triggerOpen() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".FaustPiece,.faustpiece";
    input.addEventListener("change", async () => {
      var _a;
      const file = (_a = input.files) == null ? void 0 : _a[0];
      if (file)
        await this.loadFile(file);
    });
    input.click();
  }
  async loadFile(file) {
    try {
      this.setStatus("Loading…", "#888");
      if (this.opts.clearDspJson) {
        this.opts.clearDspJson();
      }
      const buf = await file.arrayBuffer();
      const result = await this.packager.unpack(new Uint8Array(buf), file.name);
      this.pieceName = file.name.replace(/\.FaustPiece$/i, "");
      this.dspCode = result.mainDspContent;
      this.attachments.clear();
      const JSZip = (await __vitePreload(() => import("./jszip.min-9f6be5f5.js").then((n) => n.j), true ? [] : void 0)).default;
      const zip = await JSZip.loadAsync(buf);
      for (const [zipName, zipEntry] of Object.entries(zip.files)) {
        if (!zipEntry.dir && zipName !== `${this.pieceName}.dsp`) {
          const content = await zipEntry.async("uint8array");
          this.attachments.set(zipName, content);
        }
      }
      this.landingArea.style.display = "none";
      this.editingArea.style.display = "flex";
      this.renderFileList();
      this.parseFromDsp();
      this.setStatus(`✓ Loaded ${this.pieceName}.FaustPiece  (${this.attachments.size} attachment(s))`, "#4a4");
    } catch (e) {
      this.setStatus(`✗ Load failed: ${e.message}`, "#f44");
    }
  }
  // ── Project files sidebar ─────────────────────────────────────────────────
  renderFileList() {
    this.fileListEl.innerHTML = "";
    const dspRow = this.makeFileRow(`${this.pieceName}.dsp`, true);
    this.fileListEl.appendChild(dspRow);
    for (const name of this.attachments.keys()) {
      this.fileListEl.appendChild(this.makeFileRow(name, false));
    }
    const addBtn = document.createElement("button");
    addBtn.textContent = "+ Add file";
    addBtn.style.cssText = "margin:6px 8px;background:#2a3a2a;color:#aaa;border:none;border-radius:3px;padding:3px 8px;cursor:pointer;font-size:10px;width:calc(100% - 16px);";
    addBtn.addEventListener("click", () => this.addAttachment());
    this.fileListEl.appendChild(addBtn);
  }
  makeFileRow(name, isMain) {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;padding:3px 8px;gap:4px;";
    const icon = document.createElement("span");
    icon.textContent = isMain ? "📄" : name.match(/\.(wav|aif|flac)$/i) ? "🎵" : "📎";
    icon.style.cssText = "font-size:11px;flex-shrink:0;";
    row.appendChild(icon);
    const label = document.createElement("span");
    label.textContent = name;
    label.title = name;
    label.style.cssText = `flex:1;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:${isMain ? "#8cf" : "#aaa"};`;
    row.appendChild(label);
    if (!isMain) {
      const del = document.createElement("button");
      del.textContent = "✕";
      del.style.cssText = "background:none;border:none;color:#666;cursor:pointer;font-size:10px;padding:0 2px;flex-shrink:0;";
      del.addEventListener("click", () => {
        this.attachments.delete(name);
        this.renderFileList();
      });
      row.appendChild(del);
    }
    return row;
  }
  addAttachment() {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".wav,.aif,.aiff,.flac,.dsp";
    input.addEventListener("change", async () => {
      if (!input.files)
        return;
      for (const file of Array.from(input.files)) {
        const buf = await file.arrayBuffer();
        this.attachments.set(file.name, new Uint8Array(buf));
      }
      this.renderFileList();
    });
    input.click();
  }
  // ── Parsing ───────────────────────────────────────────────────────────────
  parseFromDsp() {
    var _a, _b, _c;
    const result = this.parser.parse(this.dspCode);
    this.canvas.setElements(result.data);
    (_a = this.motionPanel) == null ? void 0 : _a.parseParamsFromCode(this.dspCode);
    (_b = this.showNamePanel) == null ? void 0 : _b.parseParamsFromCode(this.dspCode);
    (_c = this.cuePanel) == null ? void 0 : _c.refresh();
    if (result.errors.length > 0)
      this.setStatus(`⚠ ${result.errors.length} parse error(s)`, "#f90");
    else if (result.data.length === 0)
      this.setStatus("No [SHCUI:] metadata found", "#888");
    else
      this.setStatus(`✓ ${result.data.length} element(s) loaded`, "#4a4");
  }
  /** Push current DSP to the IDE's Monaco editor for compilation */
  pushToIdeEditor() {
    if (!this.pieceName) {
      this.setStatus("✗ No file loaded", "#f44");
      return;
    }
    this.opts.pushToEditor(`${this.pieceName}.dsp`, this.dspCode);
    this.setStatus(`✓ Sent ${this.pieceName}.dsp to editor`, "#4a4");
  }
  // ── Save ──────────────────────────────────────────────────────────────────
  async saveFaustPiece() {
    if (!this.pieceName) {
      this.setStatus("✗ Open a .FaustPiece file first", "#f44");
      return;
    }
    const confirmed = await this.showSaveConfirm();
    if (!confirmed)
      return;
    try {
      this.setStatus("Packing…", "#888");
      const data = await this.packager.pack(
        { outputName: this.pieceName, outputDir: "", dspContent: this.dspCode, attachments: Array.from(this.attachments.keys()), includeAudio: true, includeLibs: true },
        this.attachments
      );
      this.opts.downloadFile(data, `${this.pieceName}.FaustPiece`);
      this.setStatus(`✓ Saved ${this.pieceName}.FaustPiece`, "#4a4");
    } catch (e) {
      this.setStatus(`✗ Save failed: ${e.message}`, "#f44");
    }
  }
  async saveAsFaustPiece() {
    if (!this.pieceName) {
      this.setStatus("✗ Open a .FaustPiece file first", "#f44");
      return;
    }
    const newName = await this.showSaveAsDialog();
    if (!newName)
      return;
    const validation = this.validator.validate(newName);
    if (!validation.valid) {
      this.setStatus(`✗ Invalid name: ${validation.error}`, "#f44");
      return;
    }
    const oldName = this.pieceName;
    this.pieceName = newName;
    this.dspCode = this.dspCode.replace(
      new RegExp(`\\b${oldName}\\.dsp\\b`, "g"),
      `${newName}.dsp`
    );
    try {
      this.setStatus("Packing…", "#888");
      const data = await this.packager.pack(
        { outputName: this.pieceName, outputDir: "", dspContent: this.dspCode, attachments: Array.from(this.attachments.keys()), includeAudio: true, includeLibs: true },
        this.attachments
      );
      this.opts.downloadFile(data, `${this.pieceName}.FaustPiece`);
      this.setStatus(`✓ Saved as ${this.pieceName}.FaustPiece`, "#4a4");
      this.renderFileList();
    } catch (e) {
      this.setStatus(`✗ Save failed: ${e.message}`, "#f44");
      this.pieceName = oldName;
    }
  }
  showSaveAsDialog() {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:10000;display:flex;align-items:center;justify-content:center;";
      const modal = document.createElement("div");
      modal.style.cssText = "background:#252526;border:1px solid #444;border-radius:6px;padding:20px 24px;width:400px;color:#ccc;font-size:12px;";
      const title = document.createElement("div");
      title.textContent = "💾 Save As New FaustPiece";
      title.style.cssText = "font-weight:bold;color:#4af;font-size:13px;margin-bottom:12px;";
      modal.appendChild(title);
      const label = document.createElement("div");
      label.textContent = "New name (no spaces):";
      label.style.cssText = "color:#aaa;font-size:11px;margin-bottom:6px;";
      modal.appendChild(label);
      const input = document.createElement("input");
      input.type = "text";
      input.value = this.pieceName;
      input.style.cssText = "width:100%;background:#1e1e1e;color:#ccc;border:1px solid #444;border-radius:4px;padding:8px;font-size:12px;margin-bottom:12px;";
      input.select();
      modal.appendChild(input);
      const preview = document.createElement("div");
      preview.style.cssText = "background:#1a2a3a;border:1px solid #2a4a5a;border-radius:4px;padding:8px 12px;margin-bottom:14px;font-size:11px;line-height:1.8;";
      const updatePreview = () => {
        const val = input.value.trim();
        const validation = this.validator.validate(val);
        if (validation.valid) {
          preview.innerHTML = `
            <div style="color:#4a4;font-weight:bold;margin-bottom:4px;">✓ Valid name</div>
            <div>Will save as: <code style="color:#8cf;">${val}.FaustPiece</code></div>
            <div>Main DSP inside: <code style="color:#8cf;">${val}.dsp</code></div>
          `;
        } else {
          preview.innerHTML = `
            <div style="color:#f44;font-weight:bold;margin-bottom:4px;">✗ Invalid name</div>
            <div style="color:#f88;">${validation.error}</div>
          `;
        }
      };
      updatePreview();
      input.addEventListener("input", updatePreview);
      modal.appendChild(preview);
      const btnRow = document.createElement("div");
      btnRow.style.cssText = "display:flex;gap:8px;justify-content:flex-end;";
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.cssText = "background:#3a3a3a;color:#aaa;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;";
      cancelBtn.addEventListener("click", () => {
        document.body.removeChild(overlay);
        resolve(null);
      });
      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = "💾 Save As";
      confirmBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;";
      confirmBtn.addEventListener("click", () => {
        const val = input.value.trim();
        const validation = this.validator.validate(val);
        if (validation.valid) {
          document.body.removeChild(overlay);
          resolve(val);
        } else {
          input.style.borderColor = "#f44";
          setTimeout(() => {
            input.style.borderColor = "#444";
          }, 500);
        }
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
          confirmBtn.click();
        if (e.key === "Escape")
          cancelBtn.click();
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
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:10000;display:flex;align-items:center;justify-content:center;";
      const modal = document.createElement("div");
      modal.style.cssText = "background:#252526;border:1px solid #444;border-radius:6px;padding:20px 24px;width:400px;color:#ccc;font-size:12px;";
      const title = document.createElement("div");
      title.textContent = `Save ${this.pieceName}.FaustPiece`;
      title.style.cssText = "font-weight:bold;color:#4af;font-size:13px;margin-bottom:12px;";
      modal.appendChild(title);
      const infoBox = document.createElement("div");
      infoBox.style.cssText = "background:#1a2a1a;border:1px solid #2a4a2a;border-radius:4px;padding:8px 12px;margin-bottom:14px;font-size:11px;line-height:1.8;";
      infoBox.innerHTML = `
        <div style="color:#4a4;font-weight:bold;margin-bottom:4px;">✓ Naming check</div>
        <div>Archive: <code style="color:#8cf;">${this.pieceName}.FaustPiece</code></div>
        <div>Main DSP inside: <code style="color:#8cf;">${this.pieceName}.dsp</code></div>
        <div style="color:#888;margin-top:4px;font-size:10px;">Names match — SHCdyna will load this correctly.</div>
      `;
      modal.appendChild(infoBox);
      if (this.attachments.size > 0) {
        const attInfo = document.createElement("div");
        attInfo.style.cssText = "color:#aaa;font-size:11px;margin-bottom:14px;";
        attInfo.textContent = `Includes ${this.attachments.size} attachment file(s): ${Array.from(this.attachments.keys()).join(", ")}`;
        modal.appendChild(attInfo);
      }
      const btnRow = document.createElement("div");
      btnRow.style.cssText = "display:flex;gap:8px;justify-content:flex-end;";
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.cssText = "background:#3a3a3a;color:#aaa;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;";
      cancelBtn.addEventListener("click", () => {
        document.body.removeChild(overlay);
        resolve(false);
      });
      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = "⬇ Save";
      confirmBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:6px 14px;cursor:pointer;font-size:12px;";
      confirmBtn.addEventListener("click", () => {
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
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.style.cssText = `background:${bg};color:#fff;border:none;border-radius:3px;padding:4px 10px;cursor:pointer;font-size:12px;`;
    btn.addEventListener("click", onClick);
    return btn;
  }
  setStatus(msg, color = "#888") {
    this.statusEl.textContent = msg;
    this.statusEl.style.color = color;
  }
  /** Called by the IDE tab shown event */
  parseFromEditor() {
    this.parseFromDsp();
  }
}
class NewPiecePanel {
  constructor(opts) {
    this.validator = new FileNameValidator();
    this.packager = new FaustPiecePackager();
    this.editor = new DSPMetadataEditor();
    this.parser = new SHCUIParser();
    this.currentStep = 0;
    this.outputName = "";
    this.dspCode = "";
    this.attachments = [];
    this.dspSourceMode = "upload";
    this.pickedFileName = "";
    this.sentToEditor = false;
    this.opts = opts;
    this.build();
  }
  /**
   * Merge metadata from oldCode into newCode.
   * Extracts all metadata tags (SHCUI, acc, gyr, showName, motion) from oldCode
   * and injects them into newCode for matching parameter paths.
   * 
   * Merge strategy:
   * - Playground (newCode) metadata takes priority
   * - FaustPiece (oldCode) metadata supplements missing metadata
   * - Parameter-level merge: different metadata types can come from different sources
   */
  mergeMetadata(oldCode, newCode) {
    const extractMetadata = (code) => {
      const paramMetadata = /* @__PURE__ */ new Map();
      const labelRegex = /"([^"]+)"/g;
      let match2;
      while ((match2 = labelRegex.exec(code)) !== null) {
        const fullLabel = match2[1];
        const metaStart = fullLabel.search(/\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)(?:\s|:)[^\]]*\]/);
        const paramPath = metaStart !== -1 ? fullLabel.slice(0, metaStart).trimEnd() : fullLabel;
        if (!paramPath)
          continue;
        const metaMap = /* @__PURE__ */ new Map();
        const metaRegex = /\[(SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)(?:\s|:)([^\]]*)\]/g;
        let metaMatch;
        while ((metaMatch = metaRegex.exec(fullLabel)) !== null) {
          const key = metaMatch[1];
          const value = metaMatch[2].trim();
          metaMap.set(key, value);
        }
        if (metaMap.size > 0) {
          paramMetadata.set(paramPath, metaMap);
        }
      }
      return paramMetadata;
    };
    const oldMetadata = extractMetadata(oldCode);
    const newMetadata = extractMetadata(newCode);
    const mergedMetadata = /* @__PURE__ */ new Map();
    for (const [paramPath, metaMap] of newMetadata.entries()) {
      mergedMetadata.set(paramPath, new Map(metaMap));
    }
    for (const [paramPath, oldMetaMap] of oldMetadata.entries()) {
      if (!mergedMetadata.has(paramPath)) {
        mergedMetadata.set(paramPath, new Map(oldMetaMap));
      } else {
        const mergedMap = mergedMetadata.get(paramPath);
        for (const [key, value] of oldMetaMap.entries()) {
          if (!mergedMap.has(key)) {
            mergedMap.set(key, value);
          }
        }
      }
    }
    let result = newCode;
    for (const [paramPath, metaMap] of mergedMetadata.entries()) {
      const escaped = paramPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const newLabelRegex = new RegExp(`"(${escaped}(?:\\s*\\[[^\\]]*\\])*)"`, "g");
      let newMatch;
      while ((newMatch = newLabelRegex.exec(result)) !== null) {
        const oldLabel = newMatch[1];
        const cleanLabel = oldLabel.replace(/\s*\[(?:SHCUI|acc|gyr|motion|showName|style|unit|hidden|tooltip|scale|integer|log|lin|knob|led|numerical|menu|radio|type|osc|midi|screencolor)(?:\s|:)[^\]]*\]/g, "").trim();
        const metaTags = [];
        for (const [key, value] of metaMap.entries()) {
          metaTags.push(`[${key}: ${value}]`);
        }
        const newLabel = cleanLabel + " " + metaTags.join(" ");
        const before = result.slice(0, newMatch.index);
        const after = result.slice(newMatch.index + newMatch[0].length);
        result = before + `"${newLabel}"` + after;
        newLabelRegex.lastIndex = 0;
        break;
      }
    }
    return result;
  }
  build() {
    const c = this.opts.container;
    c.style.cssText = "display:flex;flex-direction:column;height:100%;background:#1e1e1e;color:#ccc;overflow:hidden;";
    const header = document.createElement("div");
    header.style.cssText = "display:flex;align-items:center;padding:8px 14px;background:#252526;border-bottom:1px solid #3a3a3a;flex-shrink:0;";
    const headerTitle = document.createElement("span");
    headerTitle.textContent = "✦ New FaustPiece";
    headerTitle.style.cssText = "font-weight:bold;color:#4af;font-size:13px;flex:1;";
    header.appendChild(headerTitle);
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "↺ Reset";
    resetBtn.style.cssText = "background:#3a3a3a;color:#aaa;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
    resetBtn.addEventListener("click", () => this.reset());
    header.appendChild(resetBtn);
    c.appendChild(header);
    const stepBar = document.createElement("div");
    stepBar.style.cssText = "display:flex;background:#252526;border-bottom:1px solid #333;flex-shrink:0;";
    const stepLabels = ["1. File Name", "2. Attachments", "3. SHCUI Edit", "4. Motion/Cue", "5. Export"];
    stepLabels.forEach((label, i) => {
      const s = document.createElement("div");
      s.id = `newpanel-step-${i}`;
      s.textContent = label;
      s.style.cssText = `flex:1;text-align:center;padding:5px 4px;font-size:10px;color:#666;border-bottom:2px solid transparent;cursor:pointer;`;
      s.addEventListener("click", () => {
        if (i < this.currentStep)
          this.showStep(i);
      });
      stepBar.appendChild(s);
    });
    c.appendChild(stepBar);
    this._stepCount = stepLabels.length;
    this.stepContainer = document.createElement("div");
    this.stepContainer.style.cssText = "flex:1;overflow:hidden;display:flex;flex-direction:column;";
    c.appendChild(this.stepContainer);
    this.showStep(0);
  }
  updateStepIndicator(active) {
    const total = this._stepCount;
    for (let i = 0; i < total; i++) {
      const el = document.getElementById(`newpanel-step-${i}`);
      if (!el)
        continue;
      if (i < active) {
        el.style.color = "#4a4";
        el.style.borderBottom = "2px solid #4a4";
      } else if (i === active) {
        el.style.color = "#4af";
        el.style.borderBottom = "2px solid #4af";
      } else {
        el.style.color = "#666";
        el.style.borderBottom = "2px solid transparent";
      }
    }
  }
  showStep(index) {
    this.currentStep = index;
    this.updateStepIndicator(index);
    this.stepContainer.innerHTML = "";
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
    this.outputName = "";
    this.dspCode = "";
    this.attachments = [];
    this.dspSourceMode = "upload";
    this.pickedFileName = "";
    this.sentToEditor = false;
    this.showStep(0);
  }
  // ── Step 1: File name + DSP source ────────────────────────────────────────
  renderStep1() {
    const wrap = this.makeStepWrap("Step 1: Name & Source DSP");
    const workflowBox = document.createElement("div");
    workflowBox.style.cssText = "background:#1a2a3a;border:1px solid #4a6a8a;border-radius:5px;padding:10px 14px;margin-bottom:14px;font-size:11px;line-height:1.8;";
    workflowBox.innerHTML = `
      <div style="color:#4af;font-weight:bold;font-size:12px;margin-bottom:4px;">💡 Important Workflow</div>
      <div style="color:#ccc;">Before editing metadata, please:</div>
      <div style="color:#8cf;margin:4px 0;">
        &nbsp;1. <b>Compile/Run</b> the DSP in the playground<br>
        &nbsp;2. Then continue editing SHCUI/Motion/Cue metadata
      </div>
      <div style="color:#aaa;">This ensures parameter filtering works correctly and you see only the parameters actually used in your DSP.</div>
    `;
    wrap.appendChild(workflowBox);
    const ruleBox = document.createElement("div");
    ruleBox.style.cssText = "background:#2a1a00;border:1px solid #6a4a00;border-radius:5px;padding:10px 14px;margin-bottom:14px;font-size:11px;line-height:1.8;";
    ruleBox.innerHTML = `
      <div style="color:#fa0;font-weight:bold;font-size:12px;margin-bottom:4px;">⚠ Important naming rule</div>
      <div style="color:#ccc;">The name you enter will be used for <b>both</b>:</div>
      <div style="color:#8cf;font-family:monospace;margin:4px 0;">
        &nbsp;• Archive file: &nbsp;<b>myPiece.FaustPiece</b><br>
        &nbsp;• DSP inside: &nbsp;&nbsp;<b>myPiece.dsp</b>
      </div>
      <div style="color:#aaa;">They must match — SHCdyna requires this to load correctly.</div>
      <div style="color:#888;margin-top:4px;">No spaces allowed.</div>
    `;
    wrap.appendChild(ruleBox);
    const nameLabel = document.createElement("div");
    nameLabel.textContent = "FaustPiece name (no spaces, no extension):";
    nameLabel.style.cssText = "color:#ccc;font-size:12px;margin-bottom:6px;font-weight:bold;";
    wrap.appendChild(nameLabel);
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = this.outputName;
    nameInput.placeholder = "e.g. myPiece";
    nameInput.style.cssText = "background:#3c3c3c;color:#fff;border:2px solid #555;border-radius:4px;padding:7px 10px;font-size:14px;width:280px;display:block;";
    wrap.appendChild(nameInput);
    const preview = document.createElement("div");
    preview.style.cssText = "font-family:monospace;font-size:11px;margin-top:5px;margin-bottom:14px;color:#555;";
    const updatePreview = () => {
      const v = nameInput.value.trim();
      preview.textContent = v ? `→ ${v}.FaustPiece  /  ${v}.dsp` : "";
      preview.style.color = v ? "#8cf" : "#555";
    };
    nameInput.addEventListener("input", updatePreview);
    updatePreview();
    wrap.appendChild(preview);
    const dspLabel = document.createElement("div");
    dspLabel.textContent = "Principal DSP source:";
    dspLabel.style.cssText = "color:#ccc;font-size:12px;margin-bottom:8px;font-weight:bold;";
    wrap.appendChild(dspLabel);
    const modeRow = document.createElement("div");
    modeRow.style.cssText = "display:flex;gap:8px;margin-bottom:10px;";
    let selectedMode = "upload";
    let uploadedCode = "";
    let uploadedName = "";
    const makeMode = (id, label, mode2) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.style.cssText = `padding:5px 12px;border:2px solid #555;border-radius:4px;cursor:pointer;font-size:11px;background:${mode2 === selectedMode ? "#1a3a5a" : "#3c3c3c"};color:${mode2 === selectedMode ? "#fff" : "#aaa"};`;
      btn.addEventListener("click", () => {
        selectedMode = mode2;
        allModeBtns.forEach((b, m) => {
          b.style.background = m === mode2 ? "#1a3a5a" : "#3c3c3c";
          b.style.color = m === mode2 ? "#fff" : "#aaa";
          b.style.borderColor = m === mode2 ? "#4af" : "#555";
        });
        uploadArea.style.display = mode2 === "upload" ? "" : "none";
        pickArea.style.display = mode2 === "pick" ? "" : "none";
      });
      return btn;
    };
    const allModeBtns = /* @__PURE__ */ new Map();
    const uploadModeBtn = makeMode("upload", "📁 Upload .dsp file", "upload");
    const pickModeBtn = makeMode("pick", "📋 Pick from IDE files", "pick");
    allModeBtns.set("upload", uploadModeBtn);
    allModeBtns.set("pick", pickModeBtn);
    modeRow.appendChild(uploadModeBtn);
    modeRow.appendChild(pickModeBtn);
    wrap.appendChild(modeRow);
    const uploadArea = document.createElement("div");
    uploadArea.style.cssText = "margin-bottom:10px;";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".dsp";
    fileInput.style.cssText = "color:#ccc;font-size:11px;display:block;margin-bottom:6px;";
    const uploadStatus = document.createElement("div");
    uploadStatus.style.cssText = "font-size:11px;color:#666;font-family:monospace;";
    uploadStatus.textContent = "No file selected";
    fileInput.addEventListener("change", async () => {
      var _a;
      const file = (_a = fileInput.files) == null ? void 0 : _a[0];
      if (!file)
        return;
      uploadedCode = await file.text();
      uploadedName = file.name.replace(/\.dsp$/i, "");
      uploadStatus.textContent = `✓ ${file.name}  (${uploadedCode.length} chars)`;
      uploadStatus.style.color = "#4a4";
      if (!nameInput.value.trim()) {
        nameInput.value = uploadedName;
        updatePreview();
      }
    });
    uploadArea.appendChild(fileInput);
    uploadArea.appendChild(uploadStatus);
    wrap.appendChild(uploadArea);
    const pickArea = document.createElement("div");
    pickArea.style.cssText = "margin-bottom:10px;display:none;";
    const dspFiles = this.opts.getDspFileList().filter((f) => f.endsWith(".dsp"));
    if (dspFiles.length === 0) {
      const noFiles = document.createElement("div");
      noFiles.style.cssText = "color:#666;font-size:11px;padding:6px 0;";
      noFiles.textContent = "No .dsp files in the IDE project. Upload a file instead.";
      pickArea.appendChild(noFiles);
    } else {
      const sel = document.createElement("select");
      sel.style.cssText = "background:#3c3c3c;color:#ccc;border:1px solid #555;border-radius:4px;padding:5px 8px;font-size:12px;width:280px;";
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "— select a .dsp file —";
      sel.appendChild(placeholder);
      for (const f of dspFiles) {
        const opt = document.createElement("option");
        opt.value = f;
        opt.textContent = f;
        sel.appendChild(opt);
      }
      const pickStatus = document.createElement("div");
      pickStatus.style.cssText = "font-size:11px;color:#666;margin-top:4px;font-family:monospace;";
      sel.addEventListener("change", () => {
        if (!sel.value) {
          pickStatus.textContent = "";
          uploadedCode = "";
          uploadedName = "";
          return;
        }
        const code = this.opts.getDspFileContent(sel.value);
        uploadedCode = code;
        uploadedName = sel.value.replace(/\.dsp$/i, "");
        pickStatus.textContent = `✓ ${sel.value}  (${code.length} chars)`;
        pickStatus.style.color = "#4a4";
        nameInput.value = uploadedName;
        updatePreview();
      });
      pickArea.appendChild(sel);
      pickArea.appendChild(pickStatus);
    }
    wrap.appendChild(pickArea);
    const errMsg = document.createElement("div");
    errMsg.style.cssText = "color:#f44;font-size:11px;margin-top:6px;min-height:16px;";
    wrap.appendChild(errMsg);
    this.stepContainer.appendChild(wrap);
    this.appendNavButtons(null, () => {
      const val = nameInput.value.trim();
      const result = this.validator.validate(val);
      if (!result.valid) {
        errMsg.textContent = result.error || "Invalid file name";
        return;
      }
      if (!uploadedCode) {
        errMsg.textContent = "Please select or upload a .dsp source file";
        return;
      }
      this.outputName = val;
      this.dspCode = uploadedCode;
      this.dspSourceMode = selectedMode;
      this.pickedFileName = selectedMode === "pick" ? uploadedName + ".dsp" : "";
      this.sentToEditor = false;
      this.showStep(1);
    }, "Next →");
  }
  // ── Step 2: Attachments ────────────────────────────────────────────────────
  renderStep2() {
    const wrap = this.makeStepWrap("Step 2: Add Attachment Files (optional)");
    const desc = document.createElement("p");
    desc.textContent = "Optionally add audio files (.wav / .aif / .flac) and Faust library files (.dsp).";
    desc.style.cssText = "color:#aaa;font-size:11px;margin:0 0 12px;";
    wrap.appendChild(desc);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = ".wav,.aif,.aiff,.flac,.dsp";
    fileInput.style.cssText = "color:#ccc;font-size:11px;";
    wrap.appendChild(fileInput);
    const list = document.createElement("ul");
    list.style.cssText = "margin:8px 0 0;padding-left:16px;color:#8cf;font-size:11px;";
    wrap.appendChild(list);
    const renderList = () => {
      list.innerHTML = "";
      this.attachments.forEach((f, i) => {
        const li = document.createElement("li");
        li.style.cssText = "display:flex;align-items:center;gap:6px;margin-bottom:2px;";
        li.textContent = f.name;
        const del = document.createElement("button");
        del.textContent = "✕";
        del.style.cssText = "background:none;border:none;color:#f44;cursor:pointer;font-size:10px;padding:0 2px;";
        del.addEventListener("click", () => {
          this.attachments.splice(i, 1);
          renderList();
        });
        li.appendChild(del);
        list.appendChild(li);
      });
    };
    fileInput.addEventListener("change", () => {
      if (fileInput.files) {
        Array.from(fileInput.files).forEach((f) => this.attachments.push(f));
        renderList();
      }
    });
    renderList();
    this.stepContainer.appendChild(wrap);
    this.appendNavButtons(() => this.showStep(0), () => this.showStep(2), "Next →");
  }
  // ── Step 3: SHCUI editing ──────────────────────────────────────────────────
  renderStep3() {
    const titleBar = document.createElement("div");
    titleBar.style.cssText = "display:flex;align-items:center;padding:6px 14px;background:#252526;border-bottom:1px solid #333;flex-shrink:0;gap:8px;";
    const titleLabel = document.createElement("span");
    titleLabel.textContent = "Step 3: Edit SHCUI Layout";
    titleLabel.style.cssText = "font-weight:bold;color:#ccc;font-size:12px;flex:1;";
    titleBar.appendChild(titleLabel);
    const parseBtn = document.createElement("button");
    parseBtn.textContent = "↻ Parse DSP";
    parseBtn.style.cssText = "background:#2a4a2a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
    titleBar.appendChild(parseBtn);
    if (this.dspSourceMode === "pick") {
      const refreshBtn = document.createElement("button");
      refreshBtn.textContent = "⟳ Refresh from Patch";
      refreshBtn.title = "Re-fetch DSP from current patch state, preserving SHCUI/Motion/Cue/ShowName metadata";
      refreshBtn.style.cssText = "background:#3a2a1a;color:#fa0;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
      refreshBtn.addEventListener("click", () => {
        if (!confirm("This will reload DSP from the current patch. SHCUI/Motion/Cue/ShowName metadata will be preserved where possible. Continue?"))
          return;
        const freshCode = this.opts.getDspFileContent(this.pickedFileName || "Patch.dsp");
        this.dspCode = this.mergeMetadata(this.dspCode, freshCode);
        canvas2.setElements(this.parser.parse(this.dspCode).data);
        refreshBtn.textContent = "✓ Refreshed";
        setTimeout(() => {
          refreshBtn.textContent = "⟳ Refresh from Patch";
        }, 2e3);
      });
      titleBar.appendChild(refreshBtn);
    }
    if (this.dspSourceMode === "upload") {
      const sendBtn = document.createElement("button");
      sendBtn.textContent = this.sentToEditor ? "✓ Synced to Editor" : "▶ Send to Editor";
      sendBtn.title = "Register this DSP in the IDE editor for compilation";
      sendBtn.style.cssText = `background:${this.sentToEditor ? "#2a4a2a" : "#3a2a5a"};color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;`;
      sendBtn.addEventListener("click", () => {
        this.opts.pushToEditor(`${this.outputName}.dsp`, this.dspCode);
        this.sentToEditor = true;
        sendBtn.textContent = "✓ Synced to Editor";
        sendBtn.style.background = "#2a4a2a";
      });
      titleBar.appendChild(sendBtn);
    } else {
      const syncBtn = document.createElement("button");
      syncBtn.textContent = "▶ Send to Editor";
      syncBtn.title = "Send current DSP (with SHCUI edits) to the playground as a module";
      syncBtn.style.cssText = "background:#3a2a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
      syncBtn.addEventListener("click", () => {
        this.opts.pushToEditor(this.pickedFileName || `${this.outputName}.dsp`, this.dspCode);
        syncBtn.textContent = "✓ Sent";
        syncBtn.style.background = "#2a4a2a";
        setTimeout(() => {
          syncBtn.textContent = "▶ Send to Editor";
          syncBtn.style.background = "#3a2a5a";
        }, 2e3);
      });
      titleBar.appendChild(syncBtn);
    }
    this.stepContainer.appendChild(titleBar);
    const body = document.createElement("div");
    body.style.cssText = "flex:1;display:flex;overflow:hidden;min-height:0;";
    const sidebar3 = this.makeProjectSidebar();
    body.appendChild(sidebar3);
    body.appendChild(makeDivider(sidebar3, null, 60, 300));
    const canvasWrap = document.createElement("div");
    canvasWrap.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;";
    const propWrap = document.createElement("div");
    propWrap.style.cssText = "width:220px;flex-shrink:0;overflow-y:auto;";
    body.appendChild(canvasWrap);
    body.appendChild(makeDivider(null, propWrap, 100, 500));
    body.appendChild(propWrap);
    this.stepContainer.appendChild(body);
    let propPanel;
    const setCode = (code) => {
      this.dspCode = code;
    };
    const canvas2 = new SHCUICanvas({
      container: canvasWrap,
      getCode: () => this.dspCode,
      onChange: (el, x, y, w, h) => {
        setCode(this.editor.upsertSHCUI(this.dspCode, el.paramPath, el));
        propPanel == null ? void 0 : propPanel.updatePosition(x, y, w, h);
      },
      onAdd: (el) => {
        setCode(this.editor.upsertSHCUI(this.dspCode, el.paramPath, el));
        propPanel == null ? void 0 : propPanel.setElement(el);
      }
    });
    propPanel = new PropertyPanel({
      container: propWrap,
      onUpdate: (el) => {
        setCode(this.editor.upsertSHCUI(this.dspCode, el.paramPath, el));
        canvas2.render();
      },
      onDelete: (el) => {
        setCode(this.editor.removeSHCUI(this.dspCode, el.paramPath));
        canvas2.setElements(this.parser.parse(this.dspCode).data);
        propPanel.setElement(null);
      }
    });
    let lastSel = void 0;
    const selPoll = setInterval(() => {
      const sel = canvas2.getSelectedElement();
      if (sel !== lastSel) {
        lastSel = sel;
        propPanel.setElement(sel);
      }
    }, 100);
    parseBtn.addEventListener("click", () => canvas2.setElements(this.parser.parse(this.dspCode).data));
    canvas2.setElements(this.parser.parse(this.dspCode).data);
    this.appendNavButtons(
      () => {
        clearInterval(selPoll);
        this.showStep(1);
      },
      () => {
        clearInterval(selPoll);
        this.showStep(3);
      },
      "Next →"
    );
  }
  // ── Step 4: Motion / Cue / ShowName ───────────────────────────────────────
  renderStep4() {
    const wrap = document.createElement("div");
    wrap.style.cssText = "flex:1;overflow:hidden;display:flex;flex-direction:column;";
    const titleBar = document.createElement("div");
    titleBar.style.cssText = "display:flex;align-items:center;padding:6px 14px;background:#252526;border-bottom:1px solid #333;flex-shrink:0;gap:8px;";
    const titleLabel = document.createElement("span");
    titleLabel.textContent = "Step 4: Configure Motion / Cue / ShowName";
    titleLabel.style.cssText = "font-weight:bold;color:#ccc;font-size:12px;flex:1;";
    titleBar.appendChild(titleLabel);
    const sendBtn = document.createElement("button");
    sendBtn.textContent = "▶ Send to Editor";
    sendBtn.title = "Send current DSP (with Motion/Cue edits) to the playground as a module";
    sendBtn.style.cssText = "background:#3a2a5a;color:#fff;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
    sendBtn.addEventListener("click", () => {
      const filename = this.dspSourceMode === "pick" ? this.pickedFileName || `${this.outputName}.dsp` : `${this.outputName}.dsp`;
      this.opts.pushToEditor(filename, this.dspCode);
      if (this.dspSourceMode === "upload")
        this.sentToEditor = true;
      sendBtn.textContent = "✓ Sent";
      sendBtn.style.background = "#2a4a2a";
      setTimeout(() => {
        sendBtn.textContent = "▶ Send to Editor";
        sendBtn.style.background = "#3a2a5a";
      }, 2e3);
    });
    titleBar.appendChild(sendBtn);
    if (this.dspSourceMode === "pick") {
      const refreshBtn = document.createElement("button");
      refreshBtn.textContent = "⟳ Refresh from Patch";
      refreshBtn.title = "Re-fetch DSP from current patch state, preserving SHCUI/Motion/Cue/ShowName metadata";
      refreshBtn.style.cssText = "background:#3a2a1a;color:#fa0;border:none;border-radius:3px;padding:3px 10px;cursor:pointer;font-size:11px;";
      refreshBtn.addEventListener("click", () => {
        if (!confirm("This will reload DSP from the current patch. SHCUI/Motion/Cue/ShowName metadata will be preserved where possible. Continue?"))
          return;
        const freshCode = this.opts.getDspFileContent(this.pickedFileName || "Patch.dsp");
        this.dspCode = this.mergeMetadata(this.dspCode, freshCode);
        motionPanel == null ? void 0 : motionPanel.parseParamsFromCode(this.dspCode);
        cuePanel == null ? void 0 : cuePanel.refresh();
        showNamePanel == null ? void 0 : showNamePanel.parseParamsFromCode(this.dspCode);
        refreshBtn.textContent = "✓ Refreshed";
        setTimeout(() => {
          refreshBtn.textContent = "⟳ Refresh from Patch";
        }, 2e3);
      });
      titleBar.appendChild(refreshBtn);
    }
    wrap.appendChild(titleBar);
    const body = document.createElement("div");
    body.style.cssText = "flex:1;display:flex;overflow:hidden;min-height:0;";
    const sidebar4 = this.makeProjectSidebar();
    body.appendChild(sidebar4);
    body.appendChild(makeDivider(sidebar4, null, 60, 300));
    const content = document.createElement("div");
    content.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;";
    body.appendChild(content);
    const tabNav = document.createElement("div");
    tabNav.style.cssText = "display:flex;background:#252526;border-bottom:1px solid #333;flex-shrink:0;";
    const tabContents = document.createElement("div");
    tabContents.style.cssText = "flex:1;overflow:hidden;display:flex;";
    const makeTab = (label, active = false) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.style.cssText = `padding:4px 10px;border:none;cursor:pointer;font-size:11px;background:${active ? "#1e1e1e" : "transparent"};color:${active ? "#4af" : "#888"};border-bottom:${active ? "2px solid #4af" : "2px solid transparent"};`;
      const pane = document.createElement("div");
      pane.style.cssText = `display:${active ? "flex" : "none"};flex:1;overflow:hidden;`;
      tabNav.appendChild(btn);
      tabContents.appendChild(pane);
      return [btn, pane];
    };
    const [motionBtn, motionPane] = makeTab("Motion", true);
    const [cueBtn, cuePane] = makeTab("Cue");
    const [showNameBtn, showNamePane] = makeTab("ShowName");
    const allBtns = [motionBtn, cueBtn, showNameBtn];
    const allPanes = [motionPane, cuePane, showNamePane];
    const getCode = () => this.dspCode;
    const setCode = (code) => {
      this.dspCode = code;
    };
    let motionPanel;
    let cuePanel;
    let showNamePanel;
    allBtns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        allBtns.forEach((b, j) => {
          b.style.background = j === i ? "#1e1e1e" : "transparent";
          b.style.color = j === i ? "#4af" : "#888";
          b.style.borderBottom = j === i ? "2px solid #4af" : "2px solid transparent";
          allPanes[j].style.display = j === i ? "flex" : "none";
        });
        if (i === 0)
          motionPanel == null ? void 0 : motionPanel.parseParamsFromCode(this.dspCode);
        if (i === 1)
          cuePanel == null ? void 0 : cuePanel.refresh();
        if (i === 2)
          showNamePanel == null ? void 0 : showNamePanel.parseParamsFromCode(this.dspCode);
      });
    });
    content.appendChild(tabNav);
    content.appendChild(tabContents);
    wrap.appendChild(body);
    this.stepContainer.appendChild(wrap);
    const motionWrap = document.createElement("div");
    motionWrap.style.cssText = "flex:1;overflow:hidden;";
    motionPane.appendChild(motionWrap);
    const cueWrap = document.createElement("div");
    cueWrap.style.cssText = "flex:1;overflow:hidden;";
    cuePane.appendChild(cueWrap);
    const showNameWrap = document.createElement("div");
    showNameWrap.style.cssText = "flex:1;overflow:hidden;";
    showNamePane.appendChild(showNameWrap);
    motionPanel = new MotionPanel({ container: motionWrap, getCode, setCode });
    cuePanel = new CuePanel({ container: cueWrap, getCode, setCode });
    showNamePanel = new ShowNamePanel({ container: showNameWrap, getCode, setCode });
    motionPanel.parseParamsFromCode(this.dspCode);
    this.appendNavButtons(() => this.showStep(2), () => this.showStep(4), "Next →");
  }
  // ── Step 5: Confirm & export ───────────────────────────────────────────────
  renderStep5() {
    const wrap = this.makeStepWrap("Step 5: Confirm & Export");
    const nameBox = document.createElement("div");
    nameBox.style.cssText = "background:#1a2a1a;border:1px solid #2a4a2a;border-radius:4px;padding:10px 14px;margin-bottom:12px;font-size:11px;line-height:1.8;";
    nameBox.innerHTML = `
      <div style="color:#4a4;font-weight:bold;margin-bottom:4px;">✓ Naming check</div>
      <div>Archive: <code style="color:#8cf;">${this.outputName}.FaustPiece</code></div>
      <div>Main DSP inside: <code style="color:#8cf;">${this.outputName}.dsp</code></div>
      <div style="color:#888;margin-top:4px;font-size:10px;">Names match — SHCdyna will load this correctly.</div>
    `;
    wrap.appendChild(nameBox);
    const filesBox = document.createElement("div");
    filesBox.style.cssText = "background:#252526;border:1px solid #3a3a3a;border-radius:4px;padding:8px 14px;margin-bottom:12px;font-size:11px;line-height:1.8;";
    const attNames = this.attachments.map((f) => f.name);
    filesBox.innerHTML = `
      <div><b style="color:#4af">Files in archive:</b></div>
      <div style="color:#8cf;font-family:monospace;">📄 ${this.outputName}.dsp (main DSP)</div>
      ${attNames.map((n) => `<div style="color:#aaa;font-family:monospace;">${n.match(/\.(wav|aif|flac)$/i) ? "🎵" : "📎"} ${n}</div>`).join("")}
      ${attNames.length === 0 ? '<div style="color:#666;font-size:10px;">(no attachments)</div>' : ""}
    `;
    wrap.appendChild(filesBox);
    const errMsg = document.createElement("div");
    errMsg.style.cssText = "color:#f44;font-size:11px;margin-bottom:6px;min-height:16px;";
    wrap.appendChild(errMsg);
    const exportBtn = document.createElement("button");
    exportBtn.textContent = "⬇ Export .FaustPiece";
    exportBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:4px;padding:8px 20px;cursor:pointer;font-size:13px;";
    exportBtn.addEventListener("click", async () => {
      const validation = this.validator.validate(this.outputName);
      if (!validation.valid) {
        errMsg.textContent = validation.error || "Invalid file name";
        return;
      }
      exportBtn.disabled = true;
      exportBtn.textContent = "Packing…";
      try {
        const attachmentContents = /* @__PURE__ */ new Map();
        for (const file of this.attachments) {
          attachmentContents.set(file.name, new Uint8Array(await file.arrayBuffer()));
        }
        const data = await this.packager.pack(
          { outputName: this.outputName, outputDir: "", dspContent: this.dspCode, attachments: this.attachments.map((f) => f.name), includeAudio: true, includeLibs: true },
          attachmentContents
        );
        this.opts.downloadFile(data, `${this.outputName}.FaustPiece`);
        errMsg.style.color = "#4a4";
        errMsg.textContent = `✓ Exported ${this.outputName}.FaustPiece`;
        exportBtn.textContent = "✓ Done — Export Again";
        exportBtn.disabled = false;
      } catch (e) {
        errMsg.textContent = `Export failed: ${e.message}`;
        exportBtn.disabled = false;
        exportBtn.textContent = "⬇ Export .FaustPiece";
      }
    });
    wrap.appendChild(exportBtn);
    this.stepContainer.appendChild(wrap);
    this.appendNavButtons(() => this.showStep(3), null, null);
  }
  // ── Project files sidebar ─────────────────────────────────────────────────
  makeProjectSidebar() {
    const sidebar = document.createElement("div");
    sidebar.style.cssText = "width:150px;flex-shrink:0;display:flex;flex-direction:column;background:#252526;overflow:hidden;";
    const title = document.createElement("div");
    title.style.cssText = "padding:5px 8px;font-size:10px;color:#666;border-bottom:1px solid #333;flex-shrink:0;text-transform:uppercase;letter-spacing:0.5px;";
    title.textContent = "Project Files";
    sidebar.appendChild(title);
    const list = document.createElement("div");
    list.style.cssText = "flex:1;overflow-y:auto;padding:4px 0;";
    const dspRow = document.createElement("div");
    dspRow.style.cssText = "display:flex;align-items:center;padding:3px 8px;gap:4px;";
    dspRow.innerHTML = `<span style="font-size:11px;">📄</span><span style="flex:1;font-size:11px;color:#8cf;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${this.outputName}.dsp">${this.outputName}.dsp</span>`;
    list.appendChild(dspRow);
    for (const f of this.attachments) {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;padding:3px 8px;gap:4px;";
      const icon = f.name.match(/\.(wav|aif|flac)$/i) ? "🎵" : "📎";
      row.innerHTML = `<span style="font-size:11px;">${icon}</span><span style="flex:1;font-size:11px;color:#aaa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${f.name}">${f.name}</span>`;
      list.appendChild(row);
    }
    sidebar.appendChild(list);
    return sidebar;
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  makeStepWrap(title) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "padding:14px 16px;overflow-y:auto;";
    const h = document.createElement("div");
    h.textContent = title;
    h.style.cssText = "font-weight:bold;color:#ccc;font-size:12px;margin-bottom:10px;";
    wrap.appendChild(h);
    return wrap;
  }
  appendNavButtons(onBack, onNext, nextLabel) {
    const bar = document.createElement("div");
    bar.style.cssText = "display:flex;gap:8px;padding:10px 16px;background:#252526;border-top:1px solid #333;flex-shrink:0;";
    if (onBack) {
      const backBtn = document.createElement("button");
      backBtn.textContent = "← Back";
      backBtn.style.cssText = "background:#3a3a3a;color:#ccc;border:none;border-radius:3px;padding:5px 14px;cursor:pointer;font-size:12px;";
      backBtn.addEventListener("click", onBack);
      bar.appendChild(backBtn);
    }
    bar.appendChild(document.createElement("span"));
    if (onNext && nextLabel) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = nextLabel;
      nextBtn.style.cssText = "background:#1a3a5a;color:#fff;border:none;border-radius:3px;padding:5px 14px;cursor:pointer;font-size:12px;";
      nextBtn.addEventListener("click", onNext);
      bar.appendChild(nextBtn);
    }
    this.stepContainer.appendChild(bar);
  }
}
class FaustPiecePanel {
  constructor(parentEl) {
    this.isVisible = false;
    this.globalDspCode = "";
    this.patchName = "";
    this.panel = document.createElement("div");
    this.panel.id = "faustpiece-panel";
    this.panel.style.cssText = [
      "position:fixed;top:0;right:0;width:720px;height:100vh;",
      "background:#1e1e1e;z-index:500;display:none;",
      "flex-direction:column;box-shadow:-4px 0 24px rgba(0,0,0,0.6);",
      "font-family:monospace,sans-serif;"
    ].join("");
    const tabBar = document.createElement("div");
    tabBar.style.cssText = "display:flex;background:#252526;border-bottom:1px solid #444;flex-shrink:0;align-items:center;";
    const editorTabBtn = this.makeTabBtn("🎵 FaustPiece Editor", true);
    const newTabBtn = this.makeTabBtn("✦ New FaustPiece", false);
    tabBar.appendChild(editorTabBtn);
    tabBar.appendChild(newTabBtn);
    const patchHint = document.createElement("span");
    patchHint.id = "fp-patch-hint";
    patchHint.style.cssText = "font-size:10px;color:#555;margin-left:8px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
    patchHint.textContent = "No patch loaded";
    tabBar.appendChild(patchHint);
    const refreshBtn = document.createElement("button");
    refreshBtn.textContent = "↻ Sync Patch";
    refreshBtn.title = "Re-generate DSP from current patch state";
    refreshBtn.style.cssText = "background:#2a4a2a;color:#fff;border:none;font-size:11px;padding:3px 8px;cursor:pointer;flex-shrink:0;";
    refreshBtn.addEventListener("click", () => this.syncFromPatch());
    tabBar.appendChild(refreshBtn);
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    closeBtn.title = "Close FaustPiece panel";
    closeBtn.style.cssText = "background:none;border:none;color:#666;font-size:16px;cursor:pointer;padding:0 12px;flex-shrink:0;";
    closeBtn.addEventListener("click", () => this.hide());
    tabBar.appendChild(closeBtn);
    this.panel.appendChild(tabBar);
    const editorContainer = document.createElement("div");
    editorContainer.style.cssText = "flex:1;overflow:hidden;display:flex;";
    const newContainer = document.createElement("div");
    newContainer.style.cssText = "flex:1;overflow:hidden;display:none;";
    this.panel.appendChild(editorContainer);
    this.panel.appendChild(newContainer);
    parentEl.appendChild(this.panel);
    editorTabBtn.addEventListener("click", () => {
      editorContainer.style.display = "flex";
      newContainer.style.display = "none";
      editorTabBtn.style.color = "#4af";
      editorTabBtn.style.borderBottom = "2px solid #4af";
      newTabBtn.style.color = "#888";
      newTabBtn.style.borderBottom = "2px solid transparent";
    });
    newTabBtn.addEventListener("click", () => {
      editorContainer.style.display = "none";
      newContainer.style.display = "flex";
      newTabBtn.style.color = "#4af";
      newTabBtn.style.borderBottom = "2px solid #4af";
      editorTabBtn.style.color = "#888";
      editorTabBtn.style.borderBottom = "2px solid transparent";
    });
    const pushToEditor = (name, code) => {
      const scene = Utilitary.currentScene;
      if (!scene) {
        console.error("[FaustPiecePanel] No current scene available");
        return;
      }
      Utilitary.showFullPageLoading();
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      console.log("[FaustPiecePanel] Creating module:", name);
      console.log("[FaustPiecePanel] Code length:", code.length);
      scene.compileFaust({
        name,
        sourceCode: code,
        x,
        y,
        callback: (factory) => {
          if (!factory) {
            console.error("[FaustPiecePanel] Failed to create DSP factory");
            Utilitary.hideFullPageLoading();
            return;
          }
          console.log("[FaustPiecePanel] Factory created, building module...");
          __vitePreload(() => Promise.resolve().then(() => ModuleClass$1), true ? void 0 : void 0).then(({ ModuleClass: ModuleClass2 }) => {
            const module = new ModuleClass2(
              Utilitary.idX++,
              x,
              y,
              name,
              document.getElementById("modules"),
              (module2) => {
                scene.removeModule(module2);
              },
              scene.compileFaust.bind(scene)
            );
            module.moduleFaust.setSource(code);
            module.createDSP(factory, () => {
              var _a;
              module.setFaustInterfaceControles();
              module.createFaustInterface();
              module.addInputOutputNodes();
              lastCreatedModuleDsp = ((_a = module.moduleFaust) == null ? void 0 : _a.fDSP) || null;
              console.log("[FaustPiecePanel] Stored DSP reference for parameter filtering");
              if (name !== "input" && name !== "output") {
                module.moduleView.fModuleContainer.ondrop = (e) => {
                  e.stopPropagation();
                };
                module.moduleView.fModuleContainer.ondragover = () => {
                  module.moduleView.fModuleContainer.style.opacity = "1";
                  module.moduleView.fModuleContainer.style.boxShadow = "0 0 40px rgb(255, 0, 0)";
                };
                module.moduleView.fModuleContainer.ondragleave = () => {
                  module.moduleView.fModuleContainer.style.opacity = "0.5";
                  module.moduleView.fModuleContainer.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.4)";
                };
              }
              scene.addModule(module);
              Utilitary.hideFullPageLoading();
              console.log("[FaustPiecePanel] Module added to scene successfully");
            });
          }).catch((error) => {
            console.error("[FaustPiecePanel] Failed to import ModuleClass:", error);
            Utilitary.hideFullPageLoading();
          });
        }
      });
    };
    const downloadFile = (data, filename) => {
      const blob = new Blob([data], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5e3);
    };
    const getDspFileList = () => {
      const name = this.getPatchName();
      return name ? [`${name}.dsp`] : [];
    };
    const getDspFileContent = (_name) => {
      const code = this.getGlobalDsp();
      console.log("[FaustPiecePanel] getDspFileContent called");
      console.log("[FaustPiecePanel] Code length:", code.length);
      console.log("[FaustPiecePanel] First 500 chars:", code.substring(0, 500));
      return code;
    };
    let lastCreatedModuleDsp = null;
    const getDspJson = () => {
      if (!lastCreatedModuleDsp) {
        return null;
      }
      try {
        if (typeof lastCreatedModuleDsp.getJSON === "function") {
          const json = lastCreatedModuleDsp.getJSON();
          return json;
        }
      } catch (e) {
        console.error("[FaustPiecePanel] Failed to get DSP JSON:", e);
      }
      return null;
    };
    const clearDspJson = () => {
      lastCreatedModuleDsp = null;
      console.log("[FaustPiecePanel] Cleared DSP JSON reference");
    };
    this.editorPanel = new EditorPanel({
      container: editorContainer,
      pushToEditor,
      downloadFile,
      getDspJson,
      // Task 3.4: Pass the getDspJson callback
      clearDspJson
      // Clear DSP JSON when loading new file
    });
    this.newPiecePanel = new NewPiecePanel({
      container: newContainer,
      getDspFileList,
      getDspFileContent,
      pushToEditor,
      downloadFile
    });
  }
  // ── Public API ────────────────────────────────────────────────────────────
  show() {
    this.panel.style.display = "flex";
    this.isVisible = true;
    this.syncFromPatch();
  }
  hide() {
    this.panel.style.display = "none";
    this.isVisible = false;
  }
  toggle() {
    this.isVisible ? this.hide() : this.show();
  }
  // ── Patch DSP generation ──────────────────────────────────────────────────
  /**
   * Generate the global equivalent Faust DSP from the current patch state.
   * This is the same code the Export feature uses.
   */
  syncFromPatch() {
    const scene = Utilitary.currentScene;
    if (!scene) {
      console.log("[FaustPiecePanel] No current scene");
      return;
    }
    const name = scene.sceneName || "MyPatch";
    this.patchName = name.replace(/[^a-zA-Z0-9_]/g, "") || "MyPatch";
    const eq = new EquivalentFaust();
    const code = eq.getFaustEquivalent(scene, this.patchName);
    this.globalDspCode = code ?? "";
    console.log("[FaustPiecePanel] syncFromPatch called");
    console.log("[FaustPiecePanel] Patch name:", this.patchName);
    console.log("[FaustPiecePanel] Generated code length:", this.globalDspCode.length);
    console.log("[FaustPiecePanel] First 500 chars:", this.globalDspCode.substring(0, 500));
    const hint = document.getElementById("fp-patch-hint");
    if (hint) {
      if (this.globalDspCode) {
        hint.textContent = `Patch: "${this.patchName}" (${this.globalDspCode.length} chars)`;
        hint.style.color = "#4a4";
      } else {
        hint.textContent = "No modules in patch";
        hint.style.color = "#888";
      }
    }
  }
  getGlobalDsp() {
    if (!this.globalDspCode)
      this.syncFromPatch();
    return this.globalDspCode;
  }
  getPatchName() {
    if (!this.patchName)
      this.syncFromPatch();
    return this.patchName;
  }
  makeTabBtn(label, active) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.cssText = [
      `padding:8px 14px;border:none;background:transparent;cursor:pointer;`,
      `font-size:12px;color:${active ? "#4af" : "#888"};`,
      `border-bottom:${active ? "2px solid #4af" : "2px solid transparent"};`,
      `flex-shrink:0;`
    ].join("");
    return btn;
  }
}
var MenuChoices = /* @__PURE__ */ ((MenuChoices2) => {
  MenuChoices2[MenuChoices2["library"] = 0] = "library";
  MenuChoices2[MenuChoices2["export"] = 1] = "export";
  MenuChoices2[MenuChoices2["kids"] = 2] = "kids";
  MenuChoices2[MenuChoices2["edit"] = 3] = "edit";
  MenuChoices2[MenuChoices2["save"] = 4] = "save";
  MenuChoices2[MenuChoices2["load"] = 5] = "load";
  MenuChoices2[MenuChoices2["faustpiece"] = 6] = "faustpiece";
  MenuChoices2[MenuChoices2["null"] = 7] = "null";
  return MenuChoices2;
})(MenuChoices || {});
class Menu {
  constructor(htmlContainer) {
    this.isMenuDriveLoading = false;
    this.currentMenuChoices = 7;
    this.isFullScreen = false;
    this.isAccelerometer = Utilitary.isAccelerometerOn;
    this.menuView = new MenuView();
    this.menuView.init(htmlContainer);
    this.menuView.libraryButtonMenu.onclick = () => {
      this.menuHandler(
        this.newMenuChoices = 0
        /* library */
      );
    };
    this.menuView.exportButtonMenu.onclick = () => {
      this.menuHandler(
        this.newMenuChoices = 1
        /* export */
      );
    };
    this.menuView.editButtonMenu.addEventListener("click", () => {
      this.menuHandler(
        this.newMenuChoices = 3
        /* edit */
      );
    });
    this.menuView.closeButton.onclick = () => {
      this.menuHandler(
        this.newMenuChoices = 7
        /* null */
      );
    };
    this.menuView.saveButton.addEventListener("click", () => {
      this.menuHandler(
        this.newMenuChoices = 4
        /* save */
      );
    });
    this.menuView.loadButton.addEventListener("click", () => {
      this.menuHandler(
        this.newMenuChoices = 5
        /* load */
      );
    });
    this.menuView.fullScreenButton.addEventListener("click", () => {
      this.fullScreen();
    });
    this.menuView.accButton.addEventListener("click", () => {
      this.accelerometer();
    });
    this.menuView.cleanButton.addEventListener("click", () => {
      new Confirm(Utilitary.messageResource.confirmEmptyScene, (callback) => {
        this.cleanScene(callback);
      });
    });
    this.faustPiecePanel = new FaustPiecePanel(document.getElementsByTagName("body")[0]);
    this.menuView.faustPieceButton.addEventListener("click", () => {
      this.faustPiecePanel.toggle();
    });
    document.addEventListener("updatename", (e) => {
      this.updatePatchNameToInput(e);
    });
    document.addEventListener("codeeditevent", () => {
      this.customeCodeEditEvent();
    });
    document.addEventListener("updatelist", () => {
      this.updateSelectLocalEvent();
    });
    document.addEventListener("authon", () => {
      this.authOn();
    });
    document.addEventListener("authoff", () => {
      this.authOff();
    });
    document.addEventListener("fillselect", (optionEvent) => {
      this.fillSelectCloud(optionEvent);
    });
    document.addEventListener("updatecloudselect", () => {
      this.updateSelectCloudEvent();
    });
    document.addEventListener("startloaddrive", () => {
      this.startLoadingDrive();
    });
    document.addEventListener("finishloaddrive", () => {
      this.finishLoadingDrive();
    });
    document.addEventListener("clouderror", (e) => {
      this.connectionProblem(e);
    });
    this.library = new Library();
    this.library.libraryView = this.menuView.libraryView;
    this.library.fillLibrary();
    this.load = new Load();
    this.load.loadView = this.menuView.loadView;
    this.drive = new DriveAPI();
    this.load.drive = this.drive;
    this.load.setEventListeners();
    this.fillSelectLocal(this.load.loadView.existingSceneSelect);
    this.save = new Save();
    this.save.saveView = this.menuView.saveView;
    this.save.setEventListeners();
    this.fillSelectLocal(this.save.saveView.existingSceneSelect);
    this.expor = new Export();
    this.expor.exportView = this.menuView.exportView;
    this.expor.uploadTargets();
    this.expor.setEventListeners();
    this.accEdit = new AccelerometerEdit(this.menuView.accEditView);
  }
  // dispatch the action of the menu buttons to the right submenu handler
  menuHandler(newMenuChoices) {
    switch (newMenuChoices) {
      case 0:
        this.libraryMenu();
        break;
      case 1:
        this.exportMenu();
        break;
      case 3:
        this.editMenu();
        break;
      case 4:
        this.saveMenu();
        break;
      case 5:
        this.loadMenu();
        break;
      case 7:
        this.cleanMenu();
        this.closeMenu();
        break;
    }
  }
  //manage the library display
  libraryMenu() {
    switch (this.currentMenuChoices) {
      case 7:
        this.menuView.contentsMenu.style.display = "block";
        this.menuView.libraryContent.style.display = "block";
        this.currentMenuChoices = 0;
        this.menuView.libraryButtonMenu.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.libraryButtonMenu.style.zIndex = "1";
        this.library.initScroll();
        break;
      case 0:
        this.menuView.contentsMenu.style.display = "none";
        this.menuView.libraryContent.style.display = "none";
        this.currentMenuChoices = 7;
        this.menuView.libraryButtonMenu.style.backgroundColor = this.menuView.menuColorDefault;
        this.menuView.libraryButtonMenu.style.zIndex = "0";
        break;
      default:
        this.cleanMenu();
        this.menuView.libraryButtonMenu.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.libraryButtonMenu.style.zIndex = "1";
        this.menuView.libraryContent.style.display = "block";
        this.currentMenuChoices = 0;
        break;
    }
  }
  //manage the load display
  loadMenu() {
    switch (this.currentMenuChoices) {
      case 7:
        this.menuView.contentsMenu.style.display = "block";
        this.menuView.loadContent.style.display = "inline-table";
        this.currentMenuChoices = 5;
        this.menuView.loadButton.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.loadButton.style.zIndex = "1";
        break;
      case 5:
        this.menuView.contentsMenu.style.display = "none";
        this.menuView.loadContent.style.display = "none";
        this.currentMenuChoices = 7;
        this.menuView.loadButton.style.backgroundColor = this.menuView.menuColorDefault;
        this.menuView.loadButton.style.zIndex = "0";
        break;
      default:
        this.cleanMenu();
        this.menuView.loadButton.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.loadButton.style.zIndex = "1";
        this.menuView.loadContent.style.display = "inline-table";
        this.currentMenuChoices = 5;
        break;
    }
  }
  //manage the export display
  exportMenu() {
    switch (this.currentMenuChoices) {
      case 7:
        this.menuView.contentsMenu.style.display = "block";
        this.menuView.exportContent.style.display = "inline-table";
        this.currentMenuChoices = 1;
        this.menuView.exportButtonMenu.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.exportButtonMenu.style.zIndex = "1";
        break;
      case 1:
        this.menuView.contentsMenu.style.display = "none";
        this.menuView.exportContent.style.display = "none";
        this.currentMenuChoices = 7;
        this.menuView.exportButtonMenu.style.backgroundColor = this.menuView.menuColorDefault;
        this.menuView.exportButtonMenu.style.zIndex = "0";
        break;
      default:
        this.cleanMenu();
        this.menuView.exportButtonMenu.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.exportButtonMenu.style.zIndex = "1";
        this.menuView.exportContent.style.display = "inline-table";
        this.currentMenuChoices = 1;
        break;
    }
  }
  //manage the save display
  saveMenu() {
    switch (this.currentMenuChoices) {
      case 7:
        this.menuView.contentsMenu.style.display = "block";
        this.menuView.saveContent.style.display = "inline-table";
        this.currentMenuChoices = 4;
        this.menuView.saveButton.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.saveButton.style.zIndex = "1";
        break;
      case 4:
        this.menuView.contentsMenu.style.display = "none";
        this.menuView.saveContent.style.display = "none";
        this.currentMenuChoices = 7;
        this.menuView.saveButton.style.backgroundColor = this.menuView.menuColorDefault;
        this.menuView.saveButton.style.zIndex = "0";
        break;
      default:
        this.cleanMenu();
        this.menuView.saveButton.style.backgroundColor = this.menuView.menuColorSelected;
        this.menuView.saveButton.style.zIndex = "1";
        this.menuView.saveContent.style.display = "inline-table";
        this.currentMenuChoices = 4;
        break;
    }
  }
  //manage the accelerometerEdit mode and display
  editMenu() {
    switch (this.currentMenuChoices) {
      case 7:
        this.menuView.editButtonMenu.style.backgroundColor = "#00C50D";
        this.menuView.editButtonMenu.style.boxShadow = "yellow 0px 0px 51px inset";
        this.accEdit.editAction();
        this.currentMenuChoices = 3;
        break;
      case 3:
        this.accEdit.editAction();
        this.menuView.editButtonMenu.style.backgroundColor = this.menuView.menuColorDefault;
        this.menuView.editButtonMenu.style.boxShadow = "none";
        this.menuView.contentsMenu.style.display = "none";
        this.currentMenuChoices = 7;
        break;
      default:
        this.cleanMenu();
        this.menuView.editButtonMenu.style.backgroundColor = "#00C50D";
        this.menuView.editButtonMenu.style.boxShadow = "yellow 0px 0px 51px inset";
        this.accEdit.editAction();
        this.menuView.contentsMenu.style.display = "none";
        this.currentMenuChoices = 3;
        break;
    }
  }
  //Close the menu
  closeMenu() {
    for (var i = 0; i < this.menuView.HTMLElementsMenu.length; i++) {
      this.menuView.HTMLElementsMenu[i].style.display = "none";
    }
    this.menuView.contentsMenu.style.display = "none";
    this.currentMenuChoices = 7;
  }
  //hide all elements currently displayed in the menu
  cleanMenu() {
    if (this.accEdit.isOn) {
      this.accEdit.editAction();
      this.menuView.editButtonMenu.style.backgroundColor = this.menuView.menuColorDefault;
      this.menuView.editButtonMenu.style.boxShadow = "none";
      this.menuView.contentsMenu.style.display = "block";
    }
    for (var i = 0; i < this.menuView.HTMLElementsMenu.length; i++) {
      this.menuView.HTMLElementsMenu[i].style.display = "none";
    }
    for (var i = 0; i < this.menuView.HTMLButtonsMenu.length; i++) {
      this.menuView.HTMLButtonsMenu[i].style.backgroundColor = this.menuView.menuColorDefault;
      this.menuView.HTMLButtonsMenu[i].style.zIndex = "0";
    }
  }
  //update all element that display the scene name
  updatePatchNameToInput(e) {
    this.menuView.patchNameScene.textContent = Utilitary.currentScene.sceneName;
    this.menuView.exportView.dynamicName.textContent = Utilitary.currentScene.sceneName;
    this.menuView.exportView.inputNameApp.value = Utilitary.currentScene.sceneName;
    this.menuView.saveView.dynamicName.textContent = Utilitary.currentScene.sceneName;
    this.menuView.saveView.inputDownload.value = Utilitary.currentScene.sceneName;
    this.menuView.saveView.inputLocalStorage.value = Utilitary.currentScene.sceneName;
    this.menuView.saveView.inputCloudStorage.value = Utilitary.currentScene.sceneName;
    new Message(Utilitary.messageResource.successRenameScene, "messageTransitionOutFast", 2e3, 500);
  }
  //handle fullscreen mode
  fullScreen() {
    if (this.isFullScreen) {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      this.isFullScreen = false;
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
      this.isFullScreen = true;
    }
  }
  //handle the enabing/disabling of all slider having a accelerometer
  accelerometer() {
    if (this.isAccelerometer) {
      this.isAccelerometer = false;
      Utilitary.isAccelerometerOn = false;
      this.menuView.accButton.style.opacity = "0.3";
      for (var i = 0; i < AccelerometerHandler.faustInterfaceControler.length; i++) {
        var acc = AccelerometerHandler.faustInterfaceControler[i].accelerometerSlider;
        var slider = AccelerometerHandler.faustInterfaceControler[i].faustInterfaceView.slider;
        acc.isActive = false;
        slider.classList.remove("not-allowed");
        slider.classList.add("allowed");
        if (!Utilitary.isAccelerometerEditOn) {
          slider.disabled = false;
        }
      }
    } else if (!this.isAccelerometer) {
      this.isAccelerometer = true;
      Utilitary.isAccelerometerOn = true;
      this.menuView.accButton.style.opacity = "1";
      for (var i = 0; i < AccelerometerHandler.faustInterfaceControler.length; i++) {
        var acc = AccelerometerHandler.faustInterfaceControler[i].accelerometerSlider;
        var slider = AccelerometerHandler.faustInterfaceControler[i].faustInterfaceView.slider;
        if (acc.isEnabled) {
          acc.isActive = true;
          slider.classList.add("not-allowed");
          slider.classList.remove("allowed");
          if (!Utilitary.isAccelerometerEditOn) {
            slider.disabled = true;
          }
        }
      }
    }
  }
  //removing all modules from the scene
  cleanScene(callBack) {
    var modules = this.sceneCurrent.getModules();
    while (modules.length != 0) {
      if (modules[0].patchID != "output" && modules[0].patchID != "input") {
        modules[0].deleteModule();
      } else if (modules[0].patchID == "output") {
        modules.shift();
      } else if (modules[0].patchID == "input") {
        modules.shift();
      }
    }
    callBack();
  }
  //close menu when editing a module's Faust code
  //the idea here is to disable the accelerometerEdit mode if enabled
  customeCodeEditEvent() {
    this.menuHandler(
      7
      /* null */
    );
  }
  //refresh the select boxes of localstorage when adding or removing a saved scene
  updateSelectLocalEvent() {
    this.updateSelectLocal(this.menuView.loadView.existingSceneSelect);
    this.updateSelectLocal(this.menuView.saveView.existingSceneSelect);
  }
  //empty a selectBox
  clearSelect(select) {
    select.innerHTML = "";
  }
  //refresh a select box
  updateSelectLocal(select) {
    this.clearSelect(select);
    this.fillSelectLocal(select);
  }
  //get value of 'item_key'
  getStorageItem(item_key) {
    const value = localStorage.getItem(item_key);
    return value ? JSON.parse(value) : null;
  }
  //fill select box
  fillSelectLocal(select) {
    var fpg = this.getStorageItem("FaustPlayground");
    if (fpg) {
      for (var i = 0; i < fpg.length; i++) {
        var option = document.createElement("option");
        option.value = fpg[i][0];
        option.textContent = fpg[i][0];
        select.add(option);
      }
    }
  }
  //dispatch the current scene to the menus objects
  setMenuScene(scene) {
    this.sceneCurrent = scene;
    this.save.sceneCurrent = scene;
    this.load.sceneCurrent = scene;
  }
  //dispatch the drive API to the menus objects
  setDriveApi(drive) {
    this.drive = drive;
    this.save.drive = drive;
    this.load.drive = drive;
  }
  //show element from cloud Drive when logged on
  authOn() {
    this.load.loadView.cloudSelectFile.style.display = "block";
    this.save.saveView.cloudSelectFile.style.display = "block";
    this.load.loadView.buttonChangeAccount.style.display = "block";
    this.save.saveView.buttonChangeAccount.style.display = "block";
    this.load.loadView.buttonConnectDrive.style.display = "none";
    this.save.saveView.buttonConnectDrive.style.display = "none";
    this.save.saveView.buttonCloudSuppr.style.display = "block";
    this.save.saveView.inputCloudStorage.style.display = "block";
  }
  //show element from cloud Drive when logged out
  authOff() {
    this.load.loadView.cloudSelectFile.style.display = "none";
    this.save.saveView.cloudSelectFile.style.display = "none";
    this.load.loadView.buttonChangeAccount.style.display = "none";
    this.save.saveView.buttonChangeAccount.style.display = "none";
    this.load.loadView.buttonConnectDrive.style.display = "block";
    this.save.saveView.buttonConnectDrive.style.display = "block";
    this.save.saveView.buttonCloudSuppr.style.display = "none";
    this.save.saveView.inputCloudStorage.style.display = "none";
    this.clearSelect(this.save.saveView.cloudSelectFile);
    this.clearSelect(this.load.loadView.cloudSelectFile);
    window.open("https://accounts.google.com/logout", "newwindow", "width=500,height=700");
  }
  //display Drive Connection error
  connectionProblem(event) {
    new Message(Utilitary.messageResource.errorConnectionCloud + " : " + event.detail);
  }
  fillSelectCloud(optionEvent) {
    this.load.loadView.cloudSelectFile.add(optionEvent.detail);
    var optionSave = optionEvent.detail.cloneNode(true);
    this.save.saveView.cloudSelectFile.add(optionSave);
  }
  updateSelectCloudEvent() {
    this.clearSelect(this.load.loadView.cloudSelectFile);
    this.clearSelect(this.save.saveView.cloudSelectFile);
    this.drive.updateConnection();
  }
  startLoadingDrive() {
    if (!this.isMenuDriveLoading) {
      this.isMenuDriveLoading = true;
      this.save.saveView.driveContainer.style.display = "none";
      this.load.loadView.driveContainer.style.display = "none";
      Utilitary.addLoadingLogo("loadCloudContainer");
      Utilitary.addLoadingLogo("cloudSaveContainer");
    }
  }
  finishLoadingDrive() {
    if (this.isMenuDriveLoading) {
      this.isMenuDriveLoading = false;
      this.save.saveView.driveContainer.style.display = "block";
      this.load.loadView.driveContainer.style.display = "block";
      Utilitary.removeLoadingLogo("loadCloudContainer");
      Utilitary.removeLoadingLogo("cloudSaveContainer");
    }
  }
}
class App {
  createAllScenes() {
    var sceneView = new SceneView();
    Utilitary.currentScene = new Scene("Normal", this.compileFaust, sceneView);
    this.setGeneralAppListener(this);
  }
  createMenu() {
    this.menu = new Menu(document.getElementsByTagName("body")[0]);
    this.menu.setMenuScene(Utilitary.currentScene);
    Utilitary.currentScene.getSceneContainer().addEventListener("mousedown", () => {
      if (!this.menu.accEdit.isOn) {
        this.menu.newMenuChoices = MenuChoices.null;
        this.menu.menuHandler(this.menu.newMenuChoices);
      }
    }, true);
    Utilitary.currentScene.getSceneContainer().addEventListener("touchstart", () => {
      if (!this.menu.accEdit.isOn) {
        this.menu.newMenuChoices = MenuChoices.null;
        this.menu.menuHandler(this.menu.newMenuChoices);
      }
    }, true);
  }
  //create div to append messages and confirms
  createDialogue() {
    var dialogue = document.createElement("div");
    dialogue.id = "dialogue";
    document.getElementsByTagName("body")[0].appendChild(dialogue);
  }
  /********************************************************************
  ****************  CREATE FAUST FACTORIES AND MODULES ****************
  ********************************************************************/
  async compileFaust(compileFaust) {
    this.tempModuleName = compileFaust.name;
    this.tempModuleSourceCode = compileFaust.sourceCode;
    this.tempModuleX = compileFaust.x;
    this.tempModuleY = compileFaust.y;
    var currentScene = Utilitary.currentScene;
    if (currentScene) {
      currentScene.muteScene();
    }
    try {
      const faustMonoDspGenerator = new faustWasmEnv.FaustMonoDspGenerator();
      await faustMonoDspGenerator.compile(faustWasmEnv.faustCompiler, "FaustDSP", compileFaust.sourceCode, "-ftz 2");
      if (!faustMonoDspGenerator.factory)
        throw new Error("Faust DSP is not compiled");
      this.factory = faustMonoDspGenerator.factory;
      compileFaust.callback(this.factory);
    } catch (error) {
      new Message(error);
    }
    if (currentScene) {
      currentScene.unmuteScene();
    }
  }
  //create Module, set the source faust code to its moduleFaust, set the faust interface , add the input output connection nodes
  //
  createModule(factory) {
    if (!factory) {
      new Message(
        Utilitary.messageResource.errorFactory
        /*+ faust.getErrorMessage() */
      );
      Utilitary.hideFullPageLoading();
      return;
    }
    var module = new ModuleClass(Utilitary.idX++, this.tempModuleX, this.tempModuleY, this.tempModuleName, document.getElementById("modules"), (module2) => {
      Utilitary.currentScene.removeModule(module2);
    }, this.compileFaust);
    module.moduleFaust.setSource(this.tempModuleSourceCode);
    module.createDSP(factory, () => {
      module.setFaustInterfaceControles();
      module.createFaustInterface();
      module.addInputOutputNodes();
      if (this.tempModuleName != "input" && this.tempModuleName != "output") {
        module.moduleView.fModuleContainer.ondrop = (e) => {
          e.stopPropagation();
          this.styleOnDragEnd();
          this.uploadOn(this, module, 0, 0, e);
        };
      }
      module.moduleView.fModuleContainer.ondragover = () => {
        module.moduleView.fModuleContainer.style.opacity = "1";
        module.moduleView.fModuleContainer.style.boxShadow = "0 0 40px rgb(255, 0, 0)";
      };
      module.moduleView.fModuleContainer.ondragleave = () => {
        module.moduleView.fModuleContainer.style.opacity = "0.5";
        module.moduleView.fModuleContainer.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.4)";
      };
      Utilitary.currentScene.addModule(module);
      if (!Utilitary.currentScene.isInitLoading) {
        Utilitary.hideFullPageLoading();
      }
    });
  }
  /********************************************************************
  ***********************  HANDLE DRAG AND DROP ***********************
  ********************************************************************/
  //-- custom event to load file from the load menu with the file explorer
  //Init drag and drop reactions, scroll event and body resize event to resize svg element size,
  // add custom double touch event to load dsp from the library menu
  setGeneralAppListener(app) {
    document.addEventListener("fileload", (e) => {
      this.loadFileEvent(e);
    });
    window.ondragover = function() {
      return false;
    };
    window.ondragend = function() {
      return false;
    };
    document.ondragstart = () => {
      this.styleOnDragStart();
    };
    document.ondragenter = (e) => {
      var srcElement = e.srcElement;
      if (srcElement.className != null && srcElement.className == "node-button")
        ;
      else {
        this.styleOnDragStart();
      }
    };
    document.ondragleave = (e) => {
      var elementTarget = e.target;
      if (elementTarget.id == "svgCanvas") {
        this.styleOnDragEnd();
        e.stopPropagation();
        e.preventDefault();
      }
    };
    document.onscroll = () => {
      this.checkRealWindowSize();
    };
    var body = document.getElementsByTagName("body")[0];
    body.onresize = () => {
      this.checkRealWindowSize();
    };
    window.ondrop = (e) => {
      this.styleOnDragEnd();
      var x = e.clientX;
      var y = e.clientY;
      this.uploadOn(this, null, x, y, e);
    };
    document.addEventListener("dbltouchlib", (e) => {
      this.dblTouchUpload(e);
    });
  }
  //-- Upload content dropped on the page and allocate the content to the right function
  uploadOn(app, module, x, y, e) {
    e.preventDefault();
    if (!e.dataTransfer)
      return;
    Utilitary.showFullPageLoading();
    if (e.dataTransfer.files.length > 0) {
      for (var i = 0; i < e.dataTransfer.files.length; i = i + 1) {
        var f = e.dataTransfer.files[i];
        console.log("FILES DROP : " + i + " : " + f.name);
        this.loadFile(f, module, x + 10 * i, y + 10 * i);
      }
    } else if (e.dataTransfer.getData("URL") && e.dataTransfer.getData("URL").split(":").shift() != "file") {
      var url = e.dataTransfer.getData("URL");
      console.log("URL DROP : " + url);
      this.uploadUrl(app, module, x, y, url);
    } else if (e.dataTransfer.getData("URL").split(":").shift() != "file") {
      var dsp_code = e.dataTransfer.getData("text");
      console.log("Text DROP : " + dsp_code);
      if (dsp_code) {
        console.log("DROP: CASE 2 ");
        this.uploadCodeFaust(app, module, x, y, e, dsp_code);
      } else {
        console.log("DROP: CASE 3 ");
        try {
          this.uploadFileFaust(app, module, x, y, e, dsp_code);
        } catch (error) {
          new Message(error);
          Utilitary.hideFullPageLoading();
        }
      }
    } else {
      console.log("DROP: CASE 4 STRANGE ");
      new Message(Utilitary.messageResource.errorObjectNotFaustCompatible);
      Utilitary.hideFullPageLoading();
    }
  }
  //used for Url pointing at a dsp file
  uploadUrl(app, module, x, y, url) {
    var filename = url.toString().split("/").pop();
    filename = filename.toString().split(".").shift();
    Utilitary.getXHR(url, (codeFaust) => {
      var dsp_code = 'process = vgroup("' + filename + '",environment{' + codeFaust + "}.process);";
      if (module == null) {
        app.compileFaust({ name: filename, sourceCode: dsp_code, x, y, callback: (factory) => {
          app.createModule(factory);
        } });
      } else {
        module.update(filename, dsp_code);
      }
    }, Utilitary.errorCallBack);
  }
  // used for dsp code faust
  uploadCodeFaust(app, module, x, y, e, dsp_code) {
    dsp_code = 'process = vgroup("TEXT",environment{' + dsp_code + "}.process);";
    if (!module) {
      app.compileFaust({ name: "TEXT", sourceCode: dsp_code, x, y, callback: (factory) => {
        app.createModule(factory);
      } });
    } else {
      module.update("TEXT", dsp_code);
    }
  }
  //used for File containing code faust or jfaust/json scene descriptor get the file then pass it to loadFile()
  uploadFileFaust(app, module, x, y, e, dsp_code) {
    var files = e.dataTransfer.files;
    var file = files[0];
    this.loadFile(file, module, x, y);
  }
  //Load file dsp or jfaust
  loadFile(file, module, x, y) {
    var dsp_code;
    var reader = new FileReader();
    var ext = file.name.toString().split(".").pop();
    var filename = file.name.toString().split(".").shift();
    var type;
    if (ext == "dsp") {
      type = "dsp";
      reader.readAsText(file);
    } else if (ext == "json" || ext == "jfaust") {
      type = "json";
      reader.readAsText(file);
    } else {
      throw new Error(Utilitary.messageResource.errorObjectNotFaustCompatible);
    }
    reader.onloadend = (e) => {
      dsp_code = 'process = vgroup("' + filename + '",environment{' + reader.result + "}.process);";
      if (!module && type == "dsp") {
        this.compileFaust({ name: filename, sourceCode: dsp_code, x, y, callback: (factory) => {
          this.createModule(factory);
        } });
      } else if (type == "dsp") {
        module.update(filename, dsp_code);
      } else if (type == "json") {
        Utilitary.currentScene.recallScene(reader.result.toString());
      }
    };
  }
  //used when a custom event from loading file with the browser dialogue
  loadFileEvent(e) {
    Utilitary.showFullPageLoading();
    var file = e.detail;
    var position = Utilitary.currentScene.positionDblTapModule();
    this.loadFile(file, null, position.x, position.y);
  }
  //used with the library double touch custom event
  dblTouchUpload(e) {
    Utilitary.showFullPageLoading();
    var position = Utilitary.currentScene.positionDblTapModule();
    this.uploadUrl(this, null, position.x, position.y, e.detail);
  }
  ////////////////////////////// design on drag or drop //////////////////////////////////////
  // manage style during a drag and drop event
  styleOnDragStart() {
    this.menu.menuView.menuContainer.style.opacity = "0.5";
    this.menu.menuView.menuContainer.classList.add("no_pointer");
    Utilitary.currentScene.sceneView.dropElementScene.style.display = "block";
    Utilitary.currentScene.getSceneContainer().style.boxShadow = "0 0 200px #00f inset";
    var modules = Utilitary.currentScene.getModules();
    for (var i = 0; i < modules.length; i++) {
      modules[i].moduleView.fModuleContainer.style.opacity = "0.5";
    }
  }
  styleOnDragEnd() {
    this.menu.menuView.menuContainer.classList.remove("no_pointer");
    this.menu.menuView.menuContainer.style.opacity = "1";
    Utilitary.currentScene.sceneView.dropElementScene.style.display = "none";
    Utilitary.currentScene.getSceneContainer().style.boxShadow = "none";
    var modules = Utilitary.currentScene.getModules();
    for (var i = 0; i < modules.length; i++) {
      modules[i].moduleView.fModuleContainer.style.opacity = "1";
      modules[i].moduleView.fModuleContainer.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.4)";
    }
  }
  //manage the window size
  checkRealWindowSize() {
    if (window.scrollX > 0) {
      console.log(document.getElementsByTagName("html")[0]);
      document.getElementsByTagName("html")[0].style.width = window.innerWidth + window.scrollX + "px";
      document.getElementById("svgCanvas").style.width = window.innerWidth + window.scrollX + "px";
      document.getElementById("menuContainer").style.width = window.innerWidth + window.scrollX + "px";
    } else {
      document.getElementsByTagName("html")[0].style.width = "100%";
      document.getElementById("svgCanvas").style.width = "100%";
      document.getElementById("menuContainer").style.width = "100%";
    }
    if (window.scrollY > 0) {
      document.getElementsByTagName("html")[0].style.height = window.innerHeight + window.scrollY + "px";
      document.getElementById("svgCanvas").style.height = window.innerHeight + window.scrollY + "px";
    } else {
      document.getElementsByTagName("html")[0].style.height = "100%";
      document.getElementById("svgCanvas").style.height = "100%";
    }
  }
  errorCallBack(message) {
  }
}
const frURL = "data:application/json;base64,ewogICJkZWZhdWx0U2NlbmVOYW1lIjogIlBhdGNoIiwKICAicmVmZXJlbmNlIjogIkV4dGVuc2lvbiBkZSBXZWJBdWRpbyBQbGF5Z3JvdW5kIHBhciIsCiAgImNocmlzV2lsc29uIjogIkNocmlzIFdpbHNvbiIsCiAgImxvYWRpbmciOiAiQ2hhcmdlbWVudCBlbiBjb3VycyIsCiAgImRyb3AiOiAiRMOpcG9zZXIgaWNpIiwKCgogICJub0ZpbGVPbkNsb3VkIjogIkF1Y3VuIGZpY2hpZXIgdHJvdXbDqSBzdXIgR29vZ2xlIERyaXZlIiwKICAKICAKICAiZXJyb3JPYmplY3ROb3RGYXVzdENvbXBhdGlibGUiOiAiTGUgY29udGVudSBuJ2VzdCBwYXMgY29tcGF0aWJsZSBhdmVjIEZhdXN0IiwKICAiZXJyb3JMb2FkaW5nIjogIkVycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGUgbGEgc2PDqG5lIiwKICAiZXJyb3JHZXR0aW5nQXVkaW9JbnB1dCI6ICJMZSBtaWNybyBvdSBsJ2VudHLDqWUgc29uIG4nb250IHBhcyBwdSDDqnRyZSBhY3RpdsOpcyIsCiAgImVycm9ySW5wdXRBUElOb3RBdmFpbGFibGUiOiAiTGUgbWljcm8gb3UgbCdlbnRyw6llIHNvbiBuZSBwZXV2ZW50IHBhcyDDqnRyZSB1dGlsaXPDqXMgZGFucyBjZSBuYXZpZ2F0ZXVyIiwKICAiZXJyb3JBY2NTbGlkZXJOb3RGb3VuZCI6ICI6IFNsaWRlciBub24gdHJvdXbDqSwgbGVzIGNoYW5nZW1lbnRzIHN1ciBjZSBzbGlkZXIgbmUgc2Vyb250IHBhcyBleHBvcnTDqXMgZGFucyBsJ2FwcGxpY2F0aW9uIGZpbmFsZSIsCiAgImVycm9yQWNjZWxlcm9tZXRlck5vdEZvdW5kIjogIkFjY8OpbMOpcm9tw6h0cmUgbm9uIHRyb3V2w6ksIGxlcyBjaGFuZ2VtZW50cyBzdXIgY2Ugc2xpZGVyIG5lIHNlcm9udCBwYXMgZXhwb3J0w6lzIGRhbnMgbCdhcHBsaWNhdGlvbiBmaW5hbGUiLAogICJlcnJvck5vV2ViQXVkaW9BUEkiOiAiSWwgc2VtYmxlcmFpdCBxdWUgbCdBUEkgV2ViIEF1ZGlvIG5lIHNvaXQgcGFzIHN1cHBvcnTDqWUgcGFyIHZvdHJlIG5hdmlnYXRldXIuIFZvdXMgcG91dmV6IHLDqWVzc2F5ZXIgYXZlYyB1biBuYXZpZ2F0ZXVyIHBsdXMgcsOpY2VudC4iLAogICJlcnJvck9jY3VyZWRNZXNzYWdlIjogIlVuZSBlcnJldXIgcydlc3QgcHJvZHVpdGUgOiAiLAogICJlcnJvckZhY3RvcnkiOiAiTGUgY29kZSBGYXVzdCBmb3VybmkgZXN0IGluY29ycmVjdCA6ICIsCiAgImVycm9ySnNvbkNvcnJ1cHRlZCI6ICJMZSBmaWNoaWVyIGVzdCBjb3Jyb21wdSwgaW1wb3NzaWJsZSBkZSBsZSBjaGFyZ2VyIiwgCiAgImVycm9yQ3JlYXRlRFNQIjogIkltcG9zc2libGUgZGUgY3LDqWVyIGxlIERTUCwgbGUgY29kZSBGYXVzdCBjb250aWVudCBkZXMgZXJyZXVycyIsCiAgImVycm9yQ3JlYXRlTW9kdWxlUmVjYWxsIjogIlVuZSBlcnJldXIgcydlc3QgcHJvZHVpdGUgbG9ycyBkZSBsYSBjcsOpYXRpb24gZHUgbW9kdWxlLCBsZSBmaWNoaWVyIGRlIHNhdXZlZ2FyZGUgZXN0IHByb2JhYmxlbWVudCBjb3Jyb21wdSIsCiAgImVycm9yQ29ubmVjdGlvblJlY2FsbCI6ICJVbmUgZXJyZXVyIHMnZXN0IHByb2R1aXRlIGxvcnMgZGUgbGEgY29ubmV4aW9uIGRlcyBtb2R1bGVzLCBsZSBmaWNoaWVyIGRlIHNhdXZlZ2FyZGUgZXN0IHByb2JhYmxlbWVudCBjb3Jyb21wdSIsCiAgImVycm9yTG9jYWxTdG9yYWdlIjogIlZvdHJlIG5hdmlnYXRldXIgbmUgcGVybWV0IHBhcyBsYSBzYXV2ZWdhcmRlIGxvY2FsZSIsCiAgImVycm9yQ29ubmVjdGlvbkNsb3VkIjogIkNvbm5leGlvbiDDoCBHb29nbGUgRHJpdmUgaW1wb3NzaWJsZSIsCiAgCiAgCiAgInNhdmVEb3dubG9hZCI6ICJUw6lsw6ljaGFyZ2VyIGxhIHNjw6huZSA6ICIsCiAgInJ1bGVzU2NlbmVOYW1lIjogIlNldWxlcyBsZXMgbGV0dHJlcyBkZSBsJ2FscGhhYmV0IGV0IGxlcyBub21icmVzIHNvbnQgYWNjZXB0w6lzLiBMZXMgZXNwYWNlcywgbGVzIGFwb3N0cm9waGVzIGV0IGxlcyBhY2NlbnRzIHNvbnQgYXV0b21hdGlxdWVtZW50IHJlbXBsYWPDqXMuIExlIG5vbSBuZSBwZXV0IHBhcyBjb21tZW5jZXIgcGFyIHVuIG5vbWJyZTsgaWwgZG9pdCBjb21wb3J0ZXIgZW50cmUgMSBldCA1MCBjYXJhY3TDqHJlcy4iLAogICJwcmVjb21waWxlT3B0aW9uIjogIlByw6ljb21waWzDqSAocGx1cyBsb3VyZCkiLAogICJidXR0b25Eb3dubG9hZEFwcCI6ICJUw6lsw6ljaGFyZ2VyIiwKICAic3VjZXNzU2F2ZSI6ICJTYXV2ZWdhcmRlIGJpZW4gZWZmZWN0dcOpZSIsCiAgImJ1dHRvblN1cHByZXNzIjogIlN1cHByaW1lciIsCiAgImJ1dHRvbkxvY2FsU2F2ZSI6ICJTYXV2ZWdhcmRlciBsb2NhbGVtZW50IiwKICAiYnV0dG9uQ29ubmVjdENsb3VkIjogIkNvbm5leGlvbiDDoCBHb29nbGUgRHJpdmUiLAogICJidXR0b25DbG91ZFNhdmUiOiAiU2F1dmVnYXJkZXIgZW4gbGlnbmUiLAogICJidXR0b25Mb2dvdXRDbG91ZCI6ICJEw6ljb25uZXhpb24iLAoKCiAgImNvbmZpcm1TdXBwciI6ICJWb3VsZXotdm91cyB2cmFpbWVudCBzdXBwcmltZXIgY2UgUGF0Y2ggPyIsCiAgImNvbmZpcm1SZXBsYWNlIjogIkxlIG5vbSBxdWUgdm91cyB1dGlsaXNleiBleGlzdGUgZMOpasOgLCBzaSB2b3VzIGNvbnRpbnVleiB2b3VzIGxlIHJlbXBsYWNlcmV6LiBWb3VzIHBvdXZleiByZW5vbW1lciBsYSBzY8OobmUgZGFucyBsJ29uZ2xldCBFeHBvcnQuIENvbnRpbnVlcj8iLAogCiAgCiAgImJ1dHRvbkxpYnJhcnkiOiAiQmlibGlvIiwKICAiYnV0dG9uTG9hZCI6ICJDaGFyZ2VyIiwKICAiYnV0dG9uRWRpdCI6ICLDiWRpdGVyIiwKICAiYnV0dG9uU2F2ZSI6ICJTYXV2ZXIiLAogICJidXR0b25FeHBvcnQiOiAiRXhwb3J0ZXIiLAogICJidXR0b25IZWxwIjogIkFpZGUiLAogICJjb25maXJtRW1wdHlTY2VuZSI6ICJWb3VsZXotdm91cyB2cmFpbWVudCB2aWRlciBsYSBzY8OobmUgPyIsCiAgImJ1dHRvbkxvYWRGaWxlIjogIkNoYXJnZXIgdW4gZmljaGllciIsCiAgImJ1dHRvbkxvYWRMb2NhbCI6ICJDaGFyZ2VyIHVuZSBzY8OobmUgbG9jYWxlIiwKICAiYnV0dG9uTG9hZENsb3VkIjogIkNoYXJnZXIgdW5lIHNjw6huZSBlbiBsaWduZSIsCiAgInRpdGxlSW5zdHJ1bWVudHMiOiAiSW5zdHJ1bWVudHMiLAogICJ0aXRsZUVmZmVjdHMiOiAiRWZmZXRzIiwKICAidGl0bGVFeGVtcGxlcyI6ICJFeGVtcGxlcyIsCiAgImhvdmVyTGlicmFyeUVsZW1lbnQiOiAiQ2xpcXVleiwgZ2xpc3NleiwgZMOpcG9zZXogISIsCiAgImFwcE5hbWVFeHBvcnQiOiAiTGUgbm9tIGRlIGwnYXBwbGljYXRpb24gZXN0IDogIiwKICAiYnV0dG9uQ2hhbmdlU2NlbmVOYW1lIjogIk1vZGlmaWVyIGxlIG5vbSBkZSBsJ2FwcGxpY2F0aW9uIiwKICAibGVzc09wdGlvbnMiOiAiLSBtb2lucyBkJ29wdGlvbnMiLAogICJtb3JlT3B0aW9ucyI6ICIrIHBsdXMgZCdvcHRpb25zIiwKICAidGl0bGVFeHBvcnRPcHRpb25zIjogIkNob2l4IGRlIGwnZXhwb3J0IiwKICAiYnV0dG9uUmVmcmVzaCI6ICJSYWZyYcOuY2hpciBsZSBzZXJ2ZXVyIiwKICAiYnV0dG9uRXhwb3J0U2NlbmUiOiAiRXhwb3J0ZXIiLAogICJ0aXRsZURvd25sb2FkRXhwb3J0IjogIlTDqWzDqWNoYXJnZW1lbnQiLAogICJpbnZhbGlkU2NlbmVOYW1lIjogIkxlIG5vbSBjaG9pc2kgZXN0IGludmFsaWRlIiwKICAic3VjY2Vzc1JlbmFtZVNjZW5lIjogIkxlIG5vbSBhIGJpZW4gw6l0w6kgY2hhbmfDqSIsCiAgImN1cnZlMSI6ICJjb3VyYmUgMSA6ICIsCiAgImN1cnZlMiI6ICJjb3VyYmUgMiA6ICIsCiAgImN1cnZlMyI6ICJjb3VyYmUgMyA6ICIsCiAgImN1cnZlNCI6ICJjb3VyYmUgNCA6ICIsCiAgImF4aXNYIjogImF4ZSBYIDogIiwKICAiYXhpc1kiOiAiYXhlIFkgOiAiLAogICJheGlzWiI6ICJheGUgWiA6ICIsCiAgImF4aXMwIjogIm9mZiA6ICIsCiAgImNoZWNrQm94IjogImFjdGl2ZXIvZMOpc2FjdGl2ZXIgbCdhY2PDqWzDqXJvbcOodHJlIiwKICAibm9EZXZpY2VNb3Rpb24iOiAiSWwgc2VtYmxlcmFpdCBxdWUgdm90cmUgbmF2aWdhdGV1ciBuZSBzdXBwb3J0ZSBwYXMgbCdBUEkgRGV2aWNlIE1vdGlvbiwgdm91cyBuJ2F1cmV6IGRvbmMgcGFzIGFjY8OocyBhdXggYWNjw6lsw6lyb23DqHRyZXMgZGUgdm90cmUgYXBwYXJlaWwuIgp9Cg==";
const enURL = "data:application/json;base64,ewogICJkZWZhdWx0U2NlbmVOYW1lIjogIlBhdGNoIiwKICAicmVmZXJlbmNlIjogIkV4dGVuc2lvbiBvZiB0aGUgV2ViQXVkaW8gUGxheWdyb3VuZCBieSIsCiAgImNocmlzV2lsc29uIjogIkNocmlzIFdpbHNvbiIsCiAgImxvYWRpbmciOiAiTG9hZGluZyIsCiAgImRyb3AiOiAiRHJvcCBoZXJlIiwKCgogICJub0ZpbGVPbkNsb3VkIjogIk5vIGZpbGUgZm91bmQgb24gR29vZ2xlIERyaXZlIiwKICAKICAKICAiZXJyb3JPYmplY3ROb3RGYXVzdENvbXBhdGlibGUiOiAiQ29udGVudCBpcyBub3QgY29tcGF0aWJsZSB3aXRoIEZhdXN0IiwKICAiZXJyb3JMb2FkaW5nIjogIkVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIHNjZW5lIiwKICAiZXJyb3JHZXR0aW5nQXVkaW9JbnB1dCI6ICJDb3VsZCBub3QgZW5hYmxlIG1pY3JvcGhvbmUgb3IgYXVkaW8gaW5wdXQiLAogICJlcnJvcklucHV0QVBJTm90QXZhaWxhYmxlIjogIlRoZSBtaWNyb3Bob25lIG9yIGF1ZGlvIGlucHV0IGNhbm5vdCBiZSB1c2VkIGluIHlvdXIgYnJvd3NlciIsCiAgImVycm9yQWNjU2xpZGVyTm90Rm91bmQiOiAiQ291bGQgbm90IGZpbmQgc2xpZGVyLCBtb2RpZmljYXRpb25zIG9uIHRoZSBzbGlkZXIgd2lsbCBub3QgYmUgZXhwb3J0ZWQgaW4gdGhlIGZpbmFsIHZlcnNpb24gb2YgdGhlIGFwcGxpY2F0aW9uIiwKICAiZXJyb3JBY2NlbGVyb21ldGVyTm90Rm91bmQiOiAiQ291bGQgbm90IGZpbmQgYWNjZWxlcm9tZXRlciwgbW9kaWZpY2F0aW9ucyBvbiB0aGUgc2xpZGVyIHdpbGwgbm90IGJlIGV4cG9ydGVkIGluIHRoZSBmaW5hbCB2ZXJzaW9uIG9mIHRoZSBhcHBsaWNhdGlvbiIsCiAgImVycm9yTm9XZWJBdWRpb0FQSSI6ICJJdCBhcHBlYXJzIHRoYXQgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIFdlYiBBdWRpbyBBUEkuIFRyeSB3aXRoIGEgbW9yZSByZWNlbnQgdmVyc2lvbiBvZiB0aGUgYnJvd3NlciIsCiAgImVycm9yT2NjdXJlZE1lc3NhZ2UiOiAiQW4gZXJyb3IgaGFzIG9jY3VyZWQ6IiwKICAiZXJyb3JGYWN0b3J5IjogIlRoZSBwcm92aWRlZCBGYXVzdCBjb2RlIGlzIG5vdCBjb3JyZWN0OiAiLAogICJlcnJvckpzb25Db3JydXB0ZWQiOiAiVGhpcyBmaWxlIGlzIGNvcnJ1cHQgYW5kIGNhbm5vdCBiZSBsb2FkZWQiLCAKICAiZXJyb3JDcmVhdGVEU1AiOiAiQ2Fubm90IGNyZWF0ZSB0aGUgRFNQIGZpbGUsIHRoZSBGYXVzdCBjb2RlIGNvbnRhaW5zIGVycm9ycyIsCiAgImVycm9yQ3JlYXRlTW9kdWxlUmVjYWxsIjogIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgY3JlYXRpbmcgdGhlIG1vZHVsZSwgdGhlIHNhdmUgZmlsZSBpcyBwcm9iYWJseSBjb3JydXB0IiwKICAiZXJyb3JDb25uZWN0aW9uUmVjYWxsIjogIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgY29ubmVjdGluZyBtb2R1bGVzLCB0aGUgc2F2ZSBmaWxlIGlzIHByb2JhYmx5IGNvcnJ1cHQiLAogICJlcnJvckxvY2FsU3RvcmFnZSI6ICJZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBsb2NhbCBzdG9yYWdlIiwKICAiZXJyb3JDb25uZWN0aW9uQ2xvdWQiOiAiVW5hYmxlIHRvIGNvbm5lY3QgdG8gR29vZ2xlIERyaXZlIiwKICAKICAKICAic2F2ZURvd25sb2FkIjogIkRvd25sb2FkIHRoZSBzY2VuZTogIiwKICAicnVsZXNTY2VuZU5hbWUiOiAiT25seSBhbHBoYWJldCBsZXR0ZXJzIGFuZCBudW1iZXJzIGFyZSBhY2NlcHRlZC4gU3BhY2VzLCBhcG9zdHJvcGhlcyBhbmQgYWNjZW50cyBhcmUgYXV0b21hdGljYWxseSByZXBsYWNlZC4gVGhlIG5hbWUgY2Fubm90IHN0YXJ0IHdpdGggYSBudW1iZXIuIEl0IG11c3QgYmUgYmV0d2VlbiAxIGFuZCA1MCBjaGFyYWN0ZXJzLiIsCiAgInByZWNvbXBpbGVPcHRpb24iOiAiUHJlY29tcGlsZWQgKGhlYXZpZXIpIiwKICAiYnV0dG9uRG93bmxvYWRBcHAiOiAiRG93bmxvYWQiLAogICJzdWNlc3NTYXZlIjogIkZpbGUgc2F2ZWQgc3VjY2Vzc2Z1bGx5IiwKICAiYnV0dG9uU3VwcHJlc3MiOiAiRGVsZXRlIiwKICAiYnV0dG9uTG9jYWxTYXZlIjogIlNhdmUgbG9jYWxseSIsCiAgImJ1dHRvbkNvbm5lY3RDbG91ZCI6ICJDb25uZWN0IHRvIEdvb2dsZSBEcml2ZSIsCiAgImJ1dHRvbkNsb3VkU2F2ZSI6ICJTYXZlIG9ubGluZSIsCiAgImJ1dHRvbkxvZ291dENsb3VkIjogIkxvZyBvdXQiLAoKCiAgImNvbmZpcm1TdXBwciI6ICJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZGVsZXRlIHRoaXMgUGF0Y2g/IiwKICAiY29uZmlybVJlcGxhY2UiOiAiVGhlIG5hbWUgeW91IGFyZSB1c2luZyBhbHJlYWR5IGV4aXN0cywgaWYgeW91IGNvbnRpbnVlIHRoZSBleGlzdGluZyBmaWxlIHdpbGwgYmUgcmVwbGFjZWQuIFlvdSBjYW4gcmVuYW1lIHRoZSBzY2VuZSBpbiB0aGUgRXhwb3J0IHRhYi4gUmVwbGFjZT8iLAogCiAgCiAgImJ1dHRvbkxpYnJhcnkiOiAiTGlicmFyeSIsCiAgImJ1dHRvbkxvYWQiOiAiTG9hZCIsCiAgImJ1dHRvbkVkaXQiOiAiRWRpdCIsCiAgImJ1dHRvblNhdmUiOiAiU2F2ZSIsCiAgImJ1dHRvbkV4cG9ydCI6ICJFeHBvcnQiLAogICJidXR0b25IZWxwIjogIkhlbHAiLAogICJjb25maXJtRW1wdHlTY2VuZSI6ICJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZW1wdHkgdGhlIHNjZW5lPyIsCiAgImJ1dHRvbkxvYWRGaWxlIjogIkxvYWQgZmlsZSIsCiAgImJ1dHRvbkxvYWRMb2NhbCI6ICJMb2FkIGxvY2FsIHNjZW5lIiwKICAiYnV0dG9uTG9hZENsb3VkIjogIkxvYWQgb25saW5lIHNjZW5lIiwKICAidGl0bGVJbnN0cnVtZW50cyI6ICJJbnN0cnVtZW50cyIsCiAgInRpdGxlRWZmZWN0cyI6ICJFZmZlY3RzIiwKICAidGl0bGVFeGVtcGxlcyI6ICJFeGFtcGxlcyIsCiAgImhvdmVyTGlicmFyeUVsZW1lbnQiOiAiQ2xpY2ssIGRyYWcgYW5kIGRyb3AhIiwKICAiYXBwTmFtZUV4cG9ydCI6ICJUaGUgYXBwbGljYXRpb24gaXMgY2FsbGVkOiIsCiAgImJ1dHRvbkNoYW5nZVNjZW5lTmFtZSI6ICJDaGFuZ2UgdGhlIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uIiwKICAibGVzc09wdGlvbnMiOiAiLSBsZXNzIG9wdGlvbnMiLAogICJtb3JlT3B0aW9ucyI6ICIrIG1vcmUgb3B0aW9ucyIsCiAgInRpdGxlRXhwb3J0T3B0aW9ucyI6ICJDaG9vc2UgZXhwb3J0IiwKICAiYnV0dG9uUmVmcmVzaCI6ICJSZWZyZXNoIHNlcnZlciIsCiAgImJ1dHRvbkV4cG9ydFNjZW5lIjogIkV4cG9ydCIsCiAgInRpdGxlRG93bmxvYWRFeHBvcnQiOiAiRG93bmxvYWQiLAogICJpbnZhbGlkU2NlbmVOYW1lIjogIlRoZSBjaG9zZW4gbmFtZSBpcyBpbnZhbGlkIiwKICAic3VjY2Vzc1JlbmFtZVNjZW5lIjogIlRoZSBuYW1lIGhhcyBiZWVuIGNoYW5nZWQgc3VjY2Vzc2Z1bGx5IiwKICAiY3VydmUxIjogImN1cnZlIDE6ICIsCiAgImN1cnZlMiI6ICJjdXJ2ZSAyOiAiLAogICJjdXJ2ZTMiOiAiY3VydmUgMzogIiwKICAiY3VydmU0IjogImN1cnZlIDQ6ICIsCiAgImF4aXNYIjogIlggYXhpczogIiwKICAiYXhpc1kiOiAiWSBheGlzOiAiLAogICJheGlzWiI6ICJaIGF4aXM6ICIsCiAgImF4aXMwIjogIm9mZjogIiwKICAiY2hlY2tCb3giOiAiZW5hYmxlL2Rpc2FibGUgYWNjZWxlcm9tZXRlciIsCiAgIm5vRGV2aWNlTW90aW9uIjogIkl0IGFwcGVhcnMgdGhhdCB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgRGV2aWNlIE1vdGlvbiBBUEksIHlvdSB3aWxsIHRoZXJlZm9yZSBiZSB1bmFibGUgdG8gYWNjZXNzIHRoZSBhY2NlbGVyb21ldGVycyBvZiB5b3VyIGRldmljZS4iCn0K";
class Resources {
  //get resource depending on the location, default is french
  static getResources(app) {
    var localization = navigator.language;
    if (localization == "fr" || localization == "fr-FR") {
      Utilitary.getXHR(frURL, (resource) => {
        Resources.loadMessages(resource, app);
      }, Utilitary.errorCallBack);
    } else {
      Utilitary.getXHR(enURL, (resource) => {
        Resources.loadMessages(resource, app);
      }, Utilitary.errorCallBack);
    }
  }
  // load the json object
  static loadMessages(resourceJson, app) {
    Utilitary.messageResource = JSON.parse(resourceJson);
    resumeInit(app);
  }
}
let faustWasmEnv;
async function init() {
  console.log("FaustPlayground: version 1.5.0 (2026-01-13)");
  const faustwasm = await __vitePreload(() => import("./index-9d1390f2.js"), true ? [] : void 0);
  console.log(faustwasm);
  const { instantiateFaustModuleFromFile, FaustCompiler, LibFaust, FaustMonoDspGenerator, FaustPolyDspGenerator, ab2str, str2ab } = faustwasm;
  const faustModule = await instantiateFaustModuleFromFile(jsURL, dataURL, wasmURL);
  const libFaust = new LibFaust(faustModule);
  const faustCompiler = new FaustCompiler(libFaust);
  faustWasmEnv = {
    faustwasm,
    faustCompiler,
    FaustMonoDspGenerator,
    FaustPolyDspGenerator,
    ab2str,
    str2ab
  };
  var app = new App();
  Resources.getResources(app);
}
function resumeInit(app) {
  app.createDialogue();
  try {
    const AudioContext2 = globalThis.AudioContext || globalThis.webkitAudioContext;
    Utilitary.audioContext = new AudioContext2({ latencyHint: 1e-5 });
    Utilitary.audioContext.destination.channelInterpretation = "discrete";
    Utilitary.audioContext.destination.channelCount = Utilitary.audioContext.destination.maxChannelCount;
  } catch (e) {
    new Message(Utilitary.messageResource.errorNoWebAudioAPI);
    Utilitary.hideFullPageLoading();
  }
  Utilitary.addFullPageLoading();
  app.createAllScenes();
  app.createMenu();
  var accHandler = new AccelerometerHandler();
  Utilitary.accHandler = accHandler;
  accHandler.getAccelerometerValue();
  Utilitary.driveApi = new DriveAPI();
  app.menu.setDriveApi(Utilitary.driveApi);
  Utilitary.driveApi.checkAuth();
  window.addEventListener("error", (e) => {
    if (e.message == "Uncaught Error: workerError" || e.message == "Error: workerError") {
      new Message(Utilitary.messageResource.errorOccuredMessage + e.message);
      Utilitary.hideFullPageLoading();
    }
    if (e.message == "Uncaught Error: Upload2Error") {
      Utilitary.hideFullPageLoading();
      e.preventDefault();
    }
  });
}
window.addEventListener("touchend", IosInit, false);
window.addEventListener("touchstart", IosInit2, false);
function IosInit() {
  var buffer = Utilitary.audioContext.createBuffer(1, 1, 22050);
  var source = Utilitary.audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(Utilitary.audioContext.destination);
  if (source.noteOn) {
    source.noteOn(0);
  } else if (source.start) {
    source.start();
  }
  window.removeEventListener("touchend", IosInit, false);
}
function IosInit2() {
  var buffer = Utilitary.audioContext.createBuffer(1, 1, 22050);
  var source = Utilitary.audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(Utilitary.audioContext.destination);
  if (source.noteOn) {
    source.noteOn(0);
  } else if (source.start) {
    source.start();
  }
  window.removeEventListener("touchstart", IosInit2, false);
}
var isWasm = typeof WebAssembly !== "undefined";
if (!isWasm) {
  alert("WebAssembly is not supported in this browser, the page will not work !");
}
init();
export {
  __vitePreload as _,
  commonjsGlobal as c,
  getDefaultExportFromCjs as g
};
