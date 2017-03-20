console.log("Hello!!!!! Shanghai!!!!");

var themeSelect = document.getElementById("theme");


// create web audio api context
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioContext = new AudioContext();

// create player

        var player1 = createPlayer();
        var bufferLoader1 = createBufferLoader();

				var player2 = createPlayer();
        var bufferLoader2 = createBufferLoader();

				var player3 = createPlayer();
        var bufferLoader3 = createBufferLoader();

				var player4 = createPlayer();
        var bufferLoader4 = createBufferLoader();

				var player5 = createPlayer();
        var bufferLoader5 = createBufferLoader();

				var player6 = createPlayer();
        var bufferLoader6 = createBufferLoader();

				var liste1 = [];
				var liste2 = [];
				var listePlayer1 = [player1,player2,player3];
				var listePlayer2 = [player4,player5,player6];

        var stopButton = document.getElementById("stop");
        stopButton.addEventListener('click', function(){
            player1.stop();
						player2.stop();
						player3.stop();
						player4.stop();
						player5.stop();
						player6.stop();
        })
        var pauseButton = document.getElementById("pause");
        pauseButton.addEventListener('click', function(){
            player1.pause();
						player2.pause();
						player3.pause();
						player4.pause();
						player5.pause();
						player6.pause();
        })



  var dsp1 = faust.aigue(audioContext, 256);
	dsp1.connect(audioContext.destination);
	//dsp1.setParamValue("/0x00/izone",1);
  //console.log(dsp1.getProcessor());
  console.log(dsp1.json());

	var dsp2 = faust.crescendo(audioContext, 256);
	dsp2.connect(audioContext.destination);
  //console.log(dsp2.getProcessor());
  console.log(dsp2.json());

	var dsp3 = faust.echo(audioContext, 256);
	dsp3.connect(audioContext.destination);
  //console.log(dsp3.getProcessor());
  console.log(dsp3.json());

	var dsp4 = faust.grave(audioContext, 256);
	dsp4.connect(audioContext.destination);
  //console.log(dsp4.getProcessor());
  console.log(dsp4.json());

	var dsp5 = faust.reverb(audioContext, 256);
	dsp5.connect(audioContext.destination);
  //console.log(dsp5.getProcessor());
  console.log(dsp5.json());

	var dsp6 = faust.thru(audioContext, 256);
	dsp6.connect(audioContext.destination);
  //console.log(dsp6.getProcessor());
  console.log(dsp6.json());

	//var listeDSP = [dsp6,dsp5,dsp3,dsp4,dsp2,dsp1];
  //var selectDSP1,selectDSP2;



	//player1.connect(audioContext.destination);
	//player2.connect(audioContext.destination);

window.onload = init;

    function init() {

			bufferLoader1.load('sons/000_silence.wav').then(function(buffer){
				player1.setBuffer(buffer);
				player1.enableLoop(false);
			})

			//Load player file 2
			bufferLoader2.load('sons/000_silence.wav').then(function(buffer){
				player2.setBuffer(buffer);
				player2.enableLoop(false);
			})

			bufferLoader3.load('sons/000_silence.wav').then(function(buffer){
				player3.setBuffer(buffer);
				player3.enableLoop(false);
			})

			//Load player file 2
			bufferLoader4.load('sons/000_silence.wav').then(function(buffer){
				player4.setBuffer(buffer);
				player4.enableLoop(false);
			})

			bufferLoader5.load('sons/000_silence.wav').then(function(buffer){
				player5.setBuffer(buffer);
				player5.enableLoop(false);
			})

			//Load player file 2
			bufferLoader6.load('sons/000_silence.wav').then(function(buffer){
				player6.setBuffer(buffer);
				player6.enableLoop(false);
			})

}

function getNumber() {
    var minNumber = 0; // The minimum number you want
    var maxNumber = 2; // The maximum number you want
    var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // Generates random number
		console.log(randomnumber);
		return randomnumber;
}


var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var CurX;
var CurY;
var normalX;
var normalY;

// Get new mouse pointer coordinates when mouse is moved
document.onmousemove = updatePage;

function updatePage(e) {
    KeyFlag = false;

    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

    normalX=CurX/WIDTH;
    normalY=CurY/HEIGHT;


		dsp1.setParamValue("/0x00/izone",normalY);
		dsp2.setParamValue("/0x00/izone",normalY);
		dsp3.setParamValue("/0x00/izone",normalY);
		dsp4.setParamValue("/0x00/izone",normalY);
		dsp5.setParamValue("/0x00/izone",normalY);
		dsp6.setParamValue("/0x00/izone",normalY);

}


function themeChange() {

  var themeSetting = themeSelect.value;
  console.log(themeSetting);

  if(themeSetting == "A") {

		player1.stop();
		player2.stop();
		player3.stop();
		player4.stop();
		player5.stop();
		player6.stop();

		// liste bank 1
		liste1 = ['sons/001_Piano.wav','sons/002_AcousticGuitar.wav',
		          'sons/003_ElectricGuitar.wav'];

		bufferLoader1.load(liste1[0]).then(function(buffer){
								player1.setBuffer(buffer);
								player1.enableLoop(false);
							})
		bufferLoader2.load(liste1[1]).then(function(buffer){
								player2.setBuffer(buffer);
								player2.enableLoop(false);
							})
		bufferLoader3.load(liste1[2]).then(function(buffer){
								player3.setBuffer(buffer);
								player3.enableLoop(false);
							})
		// liste bank 2
		liste2 = ['sons/005_Flute.wav','sons/006_Saxophone.wav',
		          'sons/014_Cordes.wav'];

		bufferLoader4.load(liste2[0]).then(function(buffer){
			         player4.setBuffer(buffer);
							 player4.enableLoop(false);
							})
		bufferLoader5.load(liste2[1]).then(function(buffer){
						   player5.setBuffer(buffer);
							 player5.enableLoop(false);
							})
	  bufferLoader6.load(liste2[2]).then(function(buffer){
							 player6.setBuffer(buffer);
							 player6.enableLoop(false);
							})
		player1.connect(dsp6.getProcessor());
		player2.connect(dsp6.getProcessor());
		player3.connect(dsp6.getProcessor());
		player4.connect(dsp5.getProcessor());
		player5.connect(dsp5.getProcessor());
		player6.connect(dsp5.getProcessor());

  } else if(themeSetting == "B") {

		player1.stop();
		player2.stop();
		player3.stop();
		player4.stop();
		player5.stop();
		player6.stop();

		// liste bank 1
		liste1 = ['sons/007_SpokenWord.wav','sons/009_Guns.wav',
		          'sons/010_Orage.wav'];
							bufferLoader1.load(liste1[0]).then(function(buffer){
													player1.setBuffer(buffer);
													player1.enableLoop(false);
												})
							bufferLoader2.load(liste1[1]).then(function(buffer){
													player2.setBuffer(buffer);
													player2.enableLoop(false);
												})
							bufferLoader3.load(liste1[2]).then(function(buffer){
													player3.setBuffer(buffer);
													player3.enableLoop(false);
												})

		// liste bank 2
		liste2 = ['sons/01_Farmstead__Late_Spring_Early_Mor.wav','sons/02_Village__Late_Spring_Evening.wav',
		          'sons/03_Farmstead__Summer_Early_Morning.wav'];
							bufferLoader4.load(liste2[0]).then(function(buffer){
								         player4.setBuffer(buffer);
												 player4.enableLoop(false);
												})
							bufferLoader5.load(liste2[1]).then(function(buffer){
											   player5.setBuffer(buffer);
												 player5.enableLoop(false);
												})
						  bufferLoader6.load(liste2[2]).then(function(buffer){
												 player6.setBuffer(buffer);
												 player6.enableLoop(false);
												})

												player1.connect(dsp4.getProcessor());
												player2.connect(dsp4.getProcessor());
												player3.connect(dsp4.getProcessor());
												player4.connect(dsp3.getProcessor());
												player5.connect(dsp3.getProcessor());
												player6.connect(dsp3.getProcessor());
  } else if(themeSetting == "C") {

		player1.stop();
		player2.stop();
		player3.stop();
		player4.stop();
		player5.stop();
		player6.stop();

		// liste bank 1
		liste1 = ['sons/01_SCHOOLS_General_Atmosphere_Schoo.wav','sons/02_SCHOOLS_General_Atmosphere_Class.wav',
		          'sons/03_SCHOOLS_General_Atmosphere_In_Cl.wav'];
							bufferLoader1.load(liste1[0]).then(function(buffer){
													player1.setBuffer(buffer);
													player1.enableLoop(false);
												})
							bufferLoader2.load(liste1[1]).then(function(buffer){
													player2.setBuffer(buffer);
													player2.enableLoop(false);
												})
							bufferLoader3.load(liste1[2]).then(function(buffer){
													player3.setBuffer(buffer);
													player3.enableLoop(false);
												})

		// liste bank 2
		liste2 = ['sons/1101_Rivers_And_Streams_Brook.wav','sons/1103_Rivers_And_Streams_Stream__Sm.wav',
		          'sons/1106_Rivers_And_Streams_Stream_Flo.wav'];
							bufferLoader4.load(liste2[0]).then(function(buffer){
												 player4.setBuffer(buffer);
												 player4.enableLoop(false);
												})
							bufferLoader5.load(liste2[1]).then(function(buffer){
												 player5.setBuffer(buffer);
												 player5.enableLoop(false);
												})
							bufferLoader6.load(liste2[2]).then(function(buffer){
												 player6.setBuffer(buffer);
												 player6.enableLoop(false);
												})

												player1.connect(dsp2.getProcessor());
												player2.connect(dsp2.getProcessor());
												player3.connect(dsp2.getProcessor());
												player4.connect(dsp1.getProcessor());
												player5.connect(dsp1.getProcessor());
												player6.connect(dsp1.getProcessor());

  } else if(themeSetting == "off") {

		player1.stop();
		player2.stop();
		player3.stop();
		player4.stop();
		player5.stop();
		player6.stop();
		init();

  }

}

themeSelect.onchange = function() {
  themeChange();
}



function soundPlayer1() {

	player1.stop();
	player2.stop();
	player3.stop();

	var selectPlayer1 = listePlayer1[getNumber()];

	selectPlayer1.start();

}


function soundPlayer2() {

	player4.stop();
	player5.stop();
	player6.stop();

	var selectPlayer2 = listePlayer2[getNumber()];

	selectPlayer2.start();

}
