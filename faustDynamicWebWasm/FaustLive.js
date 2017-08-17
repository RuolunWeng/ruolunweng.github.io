htt'use strict';

var isWebKitAudio = (typeof (webkitAudioContext) !== "undefined");
var isWasm = (typeof (WebAssembly) !== "undefined");
var isPoly = false;

if (!isWasm) {
    alert("WebAssembly is not supported in this browser, the page will not work !")
}

var audio_context = (isWebKitAudio) ? new webkitAudioContext() : new AudioContext();
var buffer_size = 1024;
var audio_input = null;
var midi_input = [];
var factory = null;
var DSP = null;
var dsp_code = null;
var faust_svg = null;
var poly_flag = "OFF";
var ftz_flag = "2";
var poly_nvoices = 16;
var output_handler = null;
var save_state = true;
var libraries_url = "https://ruolunweng.github.io/faustDynamicWeb/libraries/";



// Set params
function setBufferSize(bs_item)
{
    buffer_size = bs_item.options[bs_item.selectedIndex].value;
    compileDSP();
}

function setPoly(poly_item)
{
    poly_flag = poly_item.options[poly_item.selectedIndex].value;
    compileDSP();
}

function setPolyVoices(voices_item)
{
    poly_nvoices = voices_item.options[voices_item.selectedIndex].value;
    compileDSP();
}

function setFTZ(ftz_item)
{
    ftz_flag = ftz_item.options[ftz_item.selectedIndex].value;
    compileDSP();
}

function setLocalStorage(state)
{
    console.log(state);
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("FaustLocalStorage", ((state) ? "on" : "off"));
    }
}

// Save/Load functions using local storage

function restoreMenu(id, value)
{
    for (var i = 0; i < document.getElementById(id).length; i++) {
        if (document.getElementById(id).options[i].value === value) {
            document.getElementById(id).selectedIndex = i;
            break;
        }
    }
}

function saveDSPState()
{
    if (typeof(Storage) !== "undefined" && localStorage.getItem("FaustLocalStorage") === "on" || save_state) {
        var params = DSP.getParams();
        for (var i = 0; i < params.length; i++) {
            localStorage.setItem(params[i], DSP.getParamValue(params[i]));
        }
    }
}

function savePageState()
{
    if (typeof(Storage) !== "undefined" && localStorage.getItem("FaustLocalStorage") === "on" ) {
        localStorage.setItem("buffer_size", buffer_size);
        localStorage.setItem("poly_flag", poly_flag);
        localStorage.setItem("ftz_flag", ftz_flag);
        localStorage.setItem("poly_nvoices", poly_nvoices);
    }
}

function loadDSPState()
{
    if (typeof(Storage) !== "undefined" && localStorage.getItem("FaustLocalStorage") === "on" || save_state) {
        var params = DSP.getParams();
        for (var i = 0; i < params.length; i++) {
            if (localStorage.getItem(params[i])) {
                // Restore DSP state
                DSP.setParamValue(params[i], Number(localStorage.getItem(params[i])));
                // Restore GUI state
                output_handler(params[i], Number(localStorage.getItem(params[i])));
            }
        }
    }
}

function loadPageState()
{
    if (typeof(Storage) !== "undefined" && localStorage.getItem("FaustLocalStorage") === "on") {
        buffer_size = (localStorage.getItem("buffer_size") ? localStorage.getItem("buffer_size") : 1024);
        poly_flag = (localStorage.getItem("poly_flag") ? localStorage.getItem("poly_flag") : "OFF");
        poly_nvoices = (localStorage.getItem("poly_nvoices") ? localStorage.getItem("poly_nvoices") : 16);
        ftz_flag = (localStorage.getItem("ftz_flag") ? localStorage.getItem("ftz_flag") : 2);

        // Restore menus
        restoreMenu("selectedBuffer", buffer_size);
        restoreMenu("selectedPoly", poly_flag);
        restoreMenu("polyVoices", poly_nvoices);
        restoreMenu("selectedFTZ", ftz_flag);
    }
}







// MIDI input handling
function keyOn(channel, pitch, velocity)
{
    if (DSP && isPoly) {
        DSP.keyOn(channel, pitch, velocity);
    }
}

function keyOff(channel, pitch, velocity)
{
    if (DSP && isPoly) {
        DSP.keyOff(channel, pitch, velocity);
    }
}

function pitchWheel(channel, bend)
{
    if (DSP && isPoly) {
        DSP.pitchWheel(channel, bend);
    }
}

function ctrlChange(channel, ctrl, value)
{
    if (DSP && isPoly) {
        DSP.ctrlChange(channel, ctrl, value);
    }
}

function midiMessageReceived(ev)
{
    var cmd = ev.data[0] >> 4;
    var channel = ev.data[0] & 0xf;
    var data1 = ev.data[1];
    var data2 = ev.data[2];

    if (channel === 9) {
        return;
    } else if (cmd === 8 || ((cmd === 9) && (data2 === 0))) {
        keyOff(channel, data1, data2);
    } else if (cmd === 9) {
        keyOn(channel, data1, data2);
    } else if (cmd === 11) {
        ctrlChange(channel, data1, data2);
    } else if (cmd === 14) {
        pitchWheel(channel, ((data2 * 128.0 + data1)-8192)/8192.0);
    }
}

function onerrorcallback(error)
{
    console.log(error);
}

function onsuccesscallbackJazz(access)
{
    var inputs = access.getInputs();
    for (var i = 0; i <inputs.length; i++) {
        var input = access.getInput(inputs[i]);
        midi_input.push(input);
        input.onmessage = midiMessageReceived;
    }
}

function onsuccesscallbackStandard(access)
{
    for (var input of access.inputs.values()) {
        midi_input.push(input);
        input.onmidimessage = midiMessageReceived;
        console.log(input.name);
    }
}

function activateMIDIInput()
{
    console.log("activateMIDIInput");
    if (typeof (navigator.requestMIDIAccess) !== "undefined") {
        if (navigator.requestMIDIAccess() != undefined) {
            navigator.requestMIDIAccess().then(onsuccesscallbackStandard, onerrorcallback);
        } else{
            navigator.requestMIDIAccess(onsuccesscallbackJazz, onerrorcallback);
        }
    } else {
        alert("MIDI input cannot be activated, either your browser still does't have it, or you need to explicitly activate it.");
    }
}





// Audio input handling
function activateAudioInput()
{
    console.log("activateAudioInput");
    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    }

    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: { echoCancellation: false }}, getDevice, function(e) {
                               alert('Error getting audio input');
                               console.log(e);
                               });
    } else {
        alert('Audio input API not available');
    }
}

function getDevice(device)
{
    // Create an AudioNode from the stream.
    audio_input = audio_context.createMediaStreamSource(device);

    // Connect it to the destination.
    audio_input.connect(DSP);
}





// DRAG-DROP
function fileDragHover(e)
{
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type === "dragover" ? "hover" : "");
}

function fileSelectHandler(e)
{
   uploadFileOn(e,compileDSP);
}

function uploadFile(e)
{
    fileDragHover(e);
    uploadOn(e, compileDSP);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}

function uploadFileOn(e, callback)
{
    if (!isWasm) {
        alert("WebAssembly is not supported in this browser !")
        return;
    }
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];

            if (location.host.indexOf("sitepointstatic") >= 0) return;

            var request = new XMLHttpRequest();
            if (request.upload) {

                var reader = new FileReader();
                var ext = file.name.toString().split('.').pop();
                var filename = file.name.toString().split('.').shift();
                var type;

                if (ext === "dsp") {
                    type = "dsp";
                    reader.readAsText(file);
                } else if (ext === "json") {
                    type = "json";
                    reader.readAsText(file);
                }

                reader.onloadend = function(e) {
                    var contents = e.target.result;
                    displayContents(contents);
                    dsp_code = "process = vgroup(\"" + filename + "\",environment{" + reader.result + "}.process);";
                    callback();
                };

            } else {
              window.alert("This object is not Faust code...");
            }
}

function uploadOn(e, callback)
{
    if (!isWasm) {
        alert("WebAssembly is not supported in this browser !")
        return;
    }

    // CASE 1 : THE DROPPED OBJECT IS A URL TO SOME FAUST CODE
    if (e.dataTransfer.getData('URL') && e.dataTransfer.getData('URL').split(':').shift() != "file") {
        var url = e.dataTransfer.getData('URL');
        var filename = url.toString().split( '/' ).pop();
        filename = filename.toString().split('.').shift();
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var contents = xmlhttp.responseText;
                displayContents(contents);
                dsp_code = "process = vgroup(\"" + filename + "\", environment{" + xmlhttp.responseText + "}.process);";
                callback();
            }
        }

        try {
            xmlhttp.open("GET", url, false);
            // Avoid error "mal formé" on firefox
            xmlhttp.overrideMimeType('text/html');
            xmlhttp.send();
        } catch (err) {
            alert(err);
        }

    } else if (e.dataTransfer.getData('URL').split(':').shift() != "file") {
        dsp_code = e.dataTransfer.getData('text');

        // CASE 2 : THE DROPPED OBJECT IS SOME FAUST CODE
        if (dsp_code) {
            dsp_code = "process = vgroup(\"" + "TEXT" + "\", environment{" + dsp_code + "}.process);";
            callback();
        }
        // CASE 3 : THE DROPPED OBJECT IS A FILE CONTAINING SOME FAUST CODE
        else {
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];

            if (location.host.indexOf("sitepointstatic") >= 0) return;

            var request = new XMLHttpRequest();
            if (request.upload) {

                var reader = new FileReader();
                var ext = file.name.toString().split('.').pop();
                var filename = file.name.toString().split('.').shift();
                var type;

                if (ext === "dsp") {
                    type = "dsp";
                    reader.readAsText(file);
                } else if (ext === "json") {
                    type = "json";
                    reader.readAsText(file);
                }

                reader.onloadend = function(e) {
                    var contents = e.target.result;
                    displayContents(contents);
                    dsp_code = "process = vgroup(\"" + filename + "\",environment{" + reader.result + "}.process);";
                    callback();
                };
            }
        }
    }
    // CASE 4 : ANY OTHER STRANGE THING
    else {
        window.alert("This object is not Faust code...");
    }
}


function compileDSP()
{
    if (DSP) {
        if (audio_input) {
            audio_input.disconnect(DSP);
        }
        DSP.disconnect(audio_context.destination);
        if (isPoly) {
            faust.deletePolyDSPInstance(DSP);
        } else {
            faust.deleteDSPInstance(DSP);
        }
        DSP = null;
        _f4u$t.hard_delete(faust_svg);
    }

    if (!dsp_code) {
        return;
    }

    // Prepare args list
    var argv = [];
    argv.push("-ftz");
    argv.push(ftz_flag);
    argv.push("-I");
    argv.push(libraries_url);

    console.log(argv);

    if (poly_flag === "ON") {

        isPoly = true;
        console.log("Poly DSP");

        // Create a poly DSP factory from the dsp code
        faust.createPolyDSPFactory(dsp_code,
                                   argv,
                                   function (factory) {
                                        if (!factory) {
                                            alert(faust.getErrorMessage());
                                            return;
                                        }

                                        faust.createPolyDSPInstance(factory,
                                                                   audio_context,
                                                                   buffer_size,
                                                                   poly_nvoices,
                                                                   function (dsp) {

                                                                        if (!dsp) {
                                                                            alert(faust.getErrorMessage());
                                                                            return;
                                                                        }

                                                                        DSP = dsp;
                                                                        if (DSP.getNumInputs() > 0) {
                                                                            activateAudioInput();
                                                                        } else {
                                                                            audio_input = null;
                                                                        }

                                                                        // Setup UI
                                                                        faust_svg = $('<div />');
                                                                        $('body').append(faust_svg);
                                                                        output_handler = _f4u$t.main(DSP.getJSON(), $(faust_svg), DSP.setParamValue);
                                                                        DSP.setOutputParamHandler(output_handler);
                                                                        console.log(DSP.getNumInputs());
                                                                        console.log(DSP.getNumOutputs());
                                                                        DSP.metadata({ declare: function(key, value) { console.log("key = " + key + " value = " + value); }});
                                                                        DSP.connect(audio_context.destination);

                                                                        loadDSPState();
                                                                   });
                                    });

    } else {

        isPoly = false;
        console.log("Mono DSP");

        // Create a mono DSP factory from the dsp code
        faust.createDSPFactory(dsp_code,
                               argv,
                               function (factory) {
                                   if (!factory) {
                                        alert(faust.getErrorMessage());
                                        return;
                                   }
                                   faust.createDSPInstance(factory,
                                                           audio_context,
                                                           buffer_size,
                                                           function (dsp) {

                                                                if (!dsp) {
                                                                    alert(faust.getErrorMessage());
                                                                    return;
                                                                }

                                                                DSP = dsp;
                                                                if (DSP.getNumInputs() > 0) {
                                                                    activateAudioInput();
                                                                } else {
                                                                    audio_input = null;
                                                                }

                                                                // Setup UI
                                                                faust_svg = $('<div />');
                                                                $('body').append(faust_svg);
                                                                output_handler = _f4u$t.main(DSP.getJSON(), $(faust_svg), DSP.setParamValue);
                                                                DSP.setOutputParamHandler(output_handler);
                                                                console.log(DSP.getNumInputs());
                                                                console.log(DSP.getNumOutputs());
                                                                DSP.metadata({ declare: function(key, value) { console.log("key = " + key + " value = " + value); }});
                                                                DSP.connect(audio_context.destination);

                                                                loadDSPState();
                                                           });
                               });
    }
}



function initPage()
{
    // No polling from the server needed, so use an empty loop
    _f4u$t.main_loop = function() {}

    // Restore 'save' checkbox state
    //document.getElementById("localstorage").checked = (localStorage.getItem("FaustLocalStorage") === "on");

    // Load page state
    //loadPageState();
}

function init()
{
    activateMIDIInput();

    var fileSelct = document.getElementById("file-input");
    fileSelct.addEventListener("change",fileSelectHandler,false);
    $('.loadfile').on('click', function() { $('#file-input').click();return false;});

    var filedrag1 = document.getElementById("filedrag");
    filedrag1.addEventListener("dragover", fileDragHover, false);
    filedrag1.addEventListener("dragleave", fileDragHover, false);
    filedrag1.addEventListener("drop", uploadFile, false);
    filedrag1.textContent = "Drop a Faust .dsp file or URL here (compiled using libfaust version " + faust.getLibFaustVersion() + ")";
}

// Init page
initPage();

// Save DSP state to local storage
setInterval(function() { savePageState(); if (DSP) { saveDSPState(); }}, 1000);

// 'faust_module' global is defined in webaudio-wasm-wrapper.js file, 'onRuntimeInitialized' will be called when code is ready
// (see https://kripken.github.io/emscripten-site/docs/getting_started/FAQ.html)

faust_module['onRuntimeInitialized'] = init;
