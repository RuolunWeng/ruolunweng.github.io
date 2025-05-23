'use strict';

var isWebKitAudio = (typeof(webkitAudioContext) !== "undefined");
var isPoly = false;

var audio_context = (isWebKitAudio) ? new webkitAudioContext() : new AudioContext();
var buffer_size = 1024;
var audio_input = null;
var midi_input = [];
var factory = null;
var DSP = null;
var dsp_code = null;
var faust_svg = null;
var poly_flag = "OFF";
var poly_nvoices = 16;
var output_handler = null;
//var libraries_url = "http://faust.grame.fr/libraries/";
var libraries_url = location.origin + location.pathname.substring(0, location.pathname.lastIndexOf('/')) + "/libraries/";
var preload_url = "dsp/Kisana.dsp";
var module = null;
var acc_flag = true;
var midi_flag = false;

function setBufferSize(bs_item) {
    buffer_size = bs_item.options[bs_item.selectedIndex].value;
    compileDSP();
}

// MIDI input handling
function keyOn(channel, pitch, velocity) {
    if (DSP && isPoly) {
        DSP.keyOn(channel, pitch, velocity);
    }
}

function keyOff(channel, pitch, velocity) {
    if (DSP && isPoly) {
        DSP.keyOff(channel, pitch, velocity);
    }
}

function pitchWheel(channel, bend) {
    if (DSP && isPoly) {
        DSP.pitchWheel(channel, bend);
    }
}

function ctrlChange(channel, ctrl, value) {
    if (DSP && isPoly) {
        DSP.ctrlChange(channel, ctrl, value);
    }
}

function midiMessageReceived(ev) {
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
        pitchWheel(channel, ((data2 * 128.0 + data1) - 8192) / 8192.0);
    }
}

function onerrorcallback(error) {
    console.log(error);
}

function onsuccesscallbackJazz(access) {
    var inputs = access.getInputs();
    for (var i = 0; i < inputs.length; i++) {
        var input = access.getInput(inputs[i]);
        midi_input.push(input);
        input.onmessage = midiMessageReceived;
    }
}

function onsuccesscallbackStandard(access) {
    for (var input of access.inputs.values()) {
        midi_input.push(input);
        input.onmidimessage = midiMessageReceived;
        console.log(input.name);
    }
}

function activateMIDIInput() {
    console.log("activateMIDIInput");
    if (typeof(navigator.requestMIDIAccess) !== "undefined") {
        if (navigator.requestMIDIAccess() != undefined) {
            navigator.requestMIDIAccess().then(onsuccesscallbackStandard, onerrorcallback);
        } else {
            navigator.requestMIDIAccess(onsuccesscallbackJazz, onerrorcallback);
        }
    } else {
        alert("MIDI input cannot be activated, either your browser still does't have it, or you need to explicitly activate it.");
    }
}





// Audio input handling
function activateAudioInput() {
    console.log("activateAudioInput");
    /*
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
    */
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false } })
        // 'as any' is needed here because of a typo in lib.d.ts (echoCancellation is written echoCancelation)
        .then((mediaStream) => {
            // Create an AudioNode from the stream.
            audio_input = audio_context.createMediaStreamSource(mediaStream);
            // Connect it to the destination.
            audio_input.connect(DSP);
            console.log("audio track has settings:", mediaStream.getAudioTracks()[0].getSettings());
        }).catch((err) => {
            console.error(err);
        });

}


// DRAG-DROP
function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type === "dragover" ? "hover" : "");
}

function fileSelectHandler(e) {
    uploadFileOn(e, compileDSP);
}

function uploadFile(e) {
    fileDragHover(e);
    uploadOn(e, compileDSP);
}

function displayContents(contents) {
    //var element = document.getElementById('file-content');
   // element.textContent = contents;
}


function uploadFileOn(e, callback) {

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
            callback(e);
        };

    } else {
        window.alert("This object is not Faust code...");
    }
}

function uploadOn(e, callback) {

    // CASE 1 : THE DROPPED OBJECT IS A URL TO SOME FAUST CODE
    if (e.dataTransfer.getData('URL') && e.dataTransfer.getData('URL').split(':').shift() != "file") {
        var url = e.dataTransfer.getData('URL');
        var filename = url.toString().split('/').pop();
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


// argv / metadata / get params ne marche pas  --- need .start()

function compileDSP() {

    if (!dsp_code) {
        return;
    }
    if (DSP) {
        if (audio_input) {
            audio_input.disconnect(DSP);
        }
        _f4u$t.hard_delete(faust_svg);
        //DSP.stop();
        if (isPoly) {
            faust.deletePolyDSPInstance(DSP);
        } else {
            //faust.deleteDSPInstance(DSP);
            module.deleteModule();
            module = null;
        }
        DSP = null;
        //console.log("Reloading....");
        //displayContents("Reloading....");
    }

    if (factory) {
        faust.deleteDSPFactory(factory);
    }

    if (poly_flag === "ON") {

        isPoly = true;
        console.log("Poly DSP");

        // Create a poly DSP factory from the dsp code
        factory = faust.createDSPFactory(dsp_code, ["-I", libraries_url],

            function(factory) {

                if (!factory) {
                    alert(faust.getErrorMessage());
                    return;
                }

                faust.createPolyDSPInstance(factory,
                    audio_context,
                    buffer_size,
                    poly_nvoices,
                    function(dsp) {

                        if (DSP.getNumInputs() > 0) {
                            activateAudioInput();
                        } else {
                            audio_input = null;
                        }

                        // Setup UI
                        _f4u$t.main_loop = function() {}
                        faust_svg = $('<div />');
                        $('body').append(faust_svg);
                        output_handler = _f4u$t.main(DSP.json(), $(faust_svg), DSP.setParamValue);
                        DSP.setHandler(output_handler);
                        console.log(DSP.getNumInputs());
                        console.log(DSP.getNumOutputs());

                        DSP.start();
                    });
            });

    } else {

        isPoly = false;
        console.log("Mono DSP");


        // Create a mono DSP factory from the dsp code
        factory = faust.createDSPFactory(dsp_code, ["-I", libraries_url],

            function(factory) {
                if (!factory) {
                    alert(faust.getErrorMessage());
                    return;
                }

                module = new ModuleClass("Dummy");
                module.moduleFaust.setSource(dsp_code);
                module.createDSP(factory, audio_context, buffer_size);
                //displayContents(dsp_code);

                DSP = module.moduleFaust.getDSP();

                if (DSP.getNumInputs() > 0) {
                    activateAudioInput();
                } else {
                    audio_input = null;
                }

                // Setup UI
                _f4u$t.main_loop = function() {}
                faust_svg = $('<div />');
                $('body').append(faust_svg);
                output_handler = _f4u$t.main(DSP.json(), $(faust_svg), DSP.setParamValue);
                //DSP.setHandler(output_handler);

                module.setFaustInterfaceControles(output_handler);
                module.createFaustInterface();

                console.log(DSP.getNumInputs());
                console.log(DSP.getNumOutputs());

                console.log(DSP.json());

                DSP.start();

            });
    }

}

function initKisana() {
    console.log("Kisana DSP");

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // Dynamically init the Faust generated node from an URL
            dsp_code = xmlhttp.responseText;
            displayContents(dsp_code);
            compileDSP();

        }
    }

    xmlhttp.open("GET", preload_url, false);
    xmlhttp.send();
}


function init() {
    if (midi_flag) {
        activateMIDIInput();
    }

    var fileSelct = document.getElementById("file-input");
    fileSelct.addEventListener("change", fileSelectHandler, false);
    $('.loadfile').on('click', function() { $('#file-input').click(); return false; });

    /*
    var filedrag1 = document.getElementById("filedrag");
    filedrag1.addEventListener("dragover", fileDragHover, false);
    filedrag1.addEventListener("dragleave", fileDragHover, false);
    filedrag1.addEventListener("drop", uploadFile, false);
    filedrag1.textContent = "Drop a Faust .dsp file or URL here (compiled using libfaustworker)";
    */

    var versionInfo = document.getElementById("versionInfo");
    versionInfo.textContent = "Compiled using libfaust-worker";

    if (acc_flag) {
        var accHandler = new AccelerometerHandler();
        accHandler.getAccelerometerValue();
    }

    //initKisana();
}


if (window.File && window.FileList && window.FileReader) {
    init();
}

// To activate audio on iOS
window.addEventListener('touchend', iosInit, false);
window.addEventListener('touchstart', iosInit2, false);

function iosInit() {
    // create empty buffer
    var buffer = audio_context.createBuffer(1, 1, 22050);
    var source = audio_context.createBufferSource();
    source.buffer = buffer;

    // connect to output (your speakers)
    source.connect(audio_context.destination);

    // play the file
    if (source.noteOn) {
        source.noteOn(0);
    } else if (source.start) {
        source.start();
    }
    
    window.DeviceMotionEvent.requestPermission();
    window.removeEventListener('touchend', iosInit, false);
}

function iosInit2() {
    // create empty buffer
    var buffer = audio_context.createBuffer(1, 1, 22050);
    var source = audio_context.createBufferSource();
    source.buffer = buffer;

    // connect to output (your speakers)
    source.connect(audio_context.destination);

    // play the file
    if (source.noteOn) {
        source.noteOn(0);
    } else if (source.start) {
        source.start();
    }
    window.removeEventListener('touchstart', iosInit2, false);
}
