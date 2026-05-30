declare name 		"META BIRD SOUND";
declare author 		"Allen WENG";
declare version     "2.0";
declare license     "BSD";
declare soundfiles "https://raw.githubusercontent.com/RuolunWeng/DataBase/main/MetaBird";
//declare copyright   "(c) GRAME 2015";


//import("instrument.lib");

hc = library("hypercurve.lib");

import("stdfaust.lib");

//Choose_Mode = vgroup("sfTaiji", nentry("v:Select 1 to 4 (0-Off)/Select Part",0,0,4,1) );

//Choose_Mode = vgroup("sfTaiji", nentry("Trig! [touchUI: Taiji trigCounter 25 0 50 50 0 255 255 200]",0,0,4,1) );

//gate_0 = gate_1:==(0)
//gate_0 = checkbox("Cloud [touchUI: SHCxZEN checkbox 0 0 50 50 255 255 0 200]");
//gate_1 = checkbox("Forest[touchUI: SHCxZEN checkbox 50 0 50 50 255 0 255 200]");
//gate_0 = checkbox("Cloud [touchUI: ZEN pad 0 0 100 60 0 245 255 200]");
gate_1 = checkbox("OnOff[SHCUI: MetaBirdSound checkbox 25 0 50 50 0 238 118 255]");
gate_2 = 0;//checkbox("Storm [touchUI: MeditationScene checkbox 0 50 50 50 0 255 255 200]");
gate_3 = 0;//checkbox("Calme [touchUI: MeditationScene checkbox 50 50 50 50 0 0 255 200]");

//gate_0 = Choose_Mode:==(1);
//gate_1 = Choose_Mode:==(2);
//gate_2 = Choose_Mode:==(3);
//gate_3 = Choose_Mode:==(4);

//////////////////////////////PART 0///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// Simple example
crv1 = hc.hypercurve(2048, 0, (hc.segment(0.3, 1, hc.diocles_curve(1)), (hc.segment(1/3, 1, hc.linear_curve), hc.segment(0.3, 0, hc.diocles_curve(0.6)))));

// Spline example
crv2 = hc.hypercurve(2048, 0,
     (hc.segment(1/2, 1, hc.cubic_bezier_curve(hc.control_point(0.45, 0.02), hc.control_point(0.55, 0.98))),
      hc.segment(1/2, 0, hc.cubic_curve)
      ));

// crv3 = hc.hypercurve(2048, 0,
//     (hc.segment(1/2, 1, hc.quadratic_bezier_curve(hc.control_point(0.45, 0.02)))));

crv3 = hc.hypercurve(2048, 0,
    (hc.segment(7/8, 1, hc.catmull_rom_spline_curve(hc.control_point(-1, -4), hc.control_point(2, 8))),
     hc.segment(1/8, 0, hc.gaussian_curve(1.2, 0.5)))
    );



//crv = hc.hypercurve(2048, 0,
//     (hc.segment(3/4, 1, hc.cubic_spline_curve( (
//                hc.control_point(0.25, 0.1),
//                hc.control_point(0.45, 0.15),
//                hc.control_point(0.55, 0.8),
//                hc.control_point(0.90, 0.1))
//                )),
//      hc.segment(1/4, 0, hc.catenary_curve(0.1))
//              ));
// Sometimes, cubic spline needs to be rescaled
// hc.scale(crv, 0, 1)

//crv = hc.hypercurve(4096, 0, (hc.segment(1, 1, hc.linear_curve)));

//crv = hc.hypercurve(4096, 0, ( hc.segment(1, 1, hc.lagrange_polynomial_curve( ( hc.control_point(0.2, 0.8), hc.control_point(0.4, 0.1))))));

amp = hslider("amp [touchUIxxx: hypercurve hslider 0 0 100 30 255 255 255 255]", 0.4, 0, 1, 0.01) : si.smoo;
fq_amp = hslider("freq_mult", 0.1, 0, 0.7, 0.001);
phas_mult = hslider("speed [touchUIxxx: hypercurve hslider 0 30 100 30 100 0 0 255]", 0.1, 0.01, 1, 0.01);

crv_type = nentry("crv_type [touchUIxxx: hypercurve trigCounter 50 60 50 40 0 255 0 200]", 3, 1, 3, 1): si.smoo;

crv = (crv1, crv2, crv3) : par(i, 3, *(i==int(crv_type-1))) :> _;

// snt(freq, ph_freq, PHASE, amp_mult, index , sigL, sigR) = os.sawtooth(freq) : ve.korg35LPF(fq_amp * env + 0.2, 2) : *(amp) : *(env) : *(amp_mult) : sp.panner(pan) : +(sigL), +(sigR)
// with {
//       env = hc.runi(crv, os.hsp_phasor(1,ph_freq * phas_mult, 0, PHASE));
//       pan = 1-env, 0+env : select2(index % 2 == 0);
// };

N_OSC = 16;

// rnd(n) = no.noise + 0.01 : ba.sAndH(os.impulse) : abs;
// process = 0, 0 : seq(n, N_OSC, snt( 100 + (500 * rnd(n) * n), (n+1) / N_OSC, (n+1) / N_OSC, 1 / N_OSC, n ));


//////////////////////////////PART 0///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

chromapenta_0 = waveform {293.66, 329.62, 391.99, 440.00, 493.88, 587.32, 659.25, 880.00, 987.76, 1174.65};
chromapenta = (chromapenta_0):((!,_));


trig(n) =( c>c')<:counter,_
      with{
           c = pulse(sample); 
           sample = hslider("Cloud_Y",450,100,5000,1)*(ma.SR*0.001):smooth(0.99);
           counter= +~_:%(n);  
          };

multiswitch(n,s) = _<:par(i,n, *(i==int(s)));
random_ID = no.noise:+(1):*(0.5);
SH(tr,x)= select2(tr,_,x) ~ _;
random_trig(trig)=SH(trig,random_ID);
random_multi(n) = par(i,n,random_trig);
range = hslider("Cloud_X",8,0,10,0.1):smooth(0.99);
range_decay(n,a,b) = par(i,n, _*(a)/(b):smooth(0.99):((pow(4.78)*6)+0.0001):tau2pole);
index_freq(n) = par(i,n, (_:*(range):int:rdtable(chromapenta_0) ) );
random_multi_select(n)=trig(n):multiswitch(n)<:(random_multi(n)),(random_multi(n)):index_freq(n),range_decay(n,99,100);

inlet (n) = bus(n),bus(n),( _ <: par(i, n, _)) : interleave(n,3);
filter(n) = par(i,n,nlf2:>_,!);
reson(n) = inlet(n):filter(n);
resonator(n) = reson(n);

//snt(freq, ph_freq, PHASE, amp_mult, index , sigL, sigR) = os.sawtooth(freq) : ve.korg35LPF(fq_amp * env + 0.2, 2) : *(amp) : *(env) : *(amp_mult) : sp.panner(pan) : +(sigL), +(sigR)
snt( ph_freq, PHASE, amp_mult, index , sigL, sigR) = ve.korg35LPF(fq_amp * env + 0.2, 2) : *(amp) : *(env) : *(amp_mult) : sp.panner(pan) : +(sigL), +(sigR)
with {
      env = hc.runi(crv, os.hsp_phasor(1,ph_freq * phas_mult, 0, PHASE));
      pan = 1-env, 0+env : select2(index % 2 == 0);
};

//----------------------- INSTRREVERB ----------------------------
// GUI for zita_rev1_stereo from effect.lib
//
// USAGE:
//  _,_ : instrRerveb

instrReverb_m = _ <: 
*(reverbGain),*(reverbGain),*(1 - reverbGain),*(1 - reverbGain) : 
zita_rev1_stereo(rdel,f1,f2,t60dc,t60m,fsmax),_,_ <: _,!,_,!,!,_,!,_ : +,+
       with{
       reverbGain = 0.6;//hslider("v:sfTaiji parametre/reverbGain [hidden:1] [color: 0 255 0 ]",0.75,0.4,1,0.01) :lowpass(1,1):smooth(0.999);
       roomSize = 0.6;//hslider("v:sfTaiji parametre/roomSize [hidden:1] ",1.25,0.1,2,0.01);
       rdel = 20;
       f1 = 200;
       f2 = 6000;
       t60dc = roomSize*3;
       t60m = roomSize*2;
       fsmax = 44100;
       };


Part0_Reson = (random_multi_select(N_OSC),(pink_noise):resonator(N_OSC)) : par(n, N_OSC, (  snt( (n+1) / N_OSC, (n+1) / N_OSC, 1 / N_OSC, n, 0 ,0 ) ) ) :>_,_: instrReverb;


// fc= hslider("v:Reson/high_cut [hidden:0]",1200,200,5000,1);
// fc2= hslider("v:Reson/low_cut [hidden:0]",200,200,5000,1);				
  
  
//gain= hslider("v:Reson/vol",0.6,0,1,0.001):smooth(0.99);
//Part0_Reson  = random_multi_select(15),(pink_noise*0.3):resonator(15):max(-0.99):min(0.99):bandpass6e(fc2,fc):instrReverb_m:>_*0.8*(ramp(gate_0));

  
  
///////RAMP///////////


//duration_up = hslider("v:sfTaiji parametre/time-up[hidden:1]",2,1,5,1);
//duration_down = hslider("v:sfTaiji parametre/time-down[hidden:1]",2,1,5,1);
duration_up = 2;
duration_down =4;

step_up  = (1/(ma.SR*duration_up));
step_down =(1/(ma.SR*duration_down));

ramp(s) = (0):+~ ( min(1):max(0) <:select2(s,-(step_down),+(step_up)));




/////////////////////////////////////PART 1///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////



// DEF des variables partagees /////////////////////////////////
ratio_env = 0.0205; //hslider ("v:sfTaiji parametre/ratio_env [hidden:1]",0.0205,0.,0.5,0.0001); // ratio de l'enveloppe au niveau haut par rapport au tempo. 
fade = (0.5);
speed = 2.9989; //hslider ("v:sfTaiji parametre/speed [hidden:1]",2.9989,0.001,20,0.0001); 
speed_2 = 2.466; //hslider ("v:sfTaiji parametre/speed_2 [hidden:1]",2.466,0.001,20,0.0001); 
speed_3 = 3.04; //hslider ("v:sfTaiji parametre/speed_3 [hidden:1]",3.04,0.001,20,0.0001);

proba = 0.05; //hslider ("v:sfTaiji parametre/proba [hidden:1]",0.05,0.,0.5,0.001);
proba_2 = 0.08; //hslider ("v:sfTaiji parametre/proba_2 [hidden:1]",0.08,0.,0.5,0.001);
proba_3 = 0.11; //hslider ("v:sfTaiji parametre/proba_3 [hidden:1]",0.11,0.,0.5,0.001);

offset = 0.001;

// PHASOR_BIN //////////////////////////////
phasor_bin =  (+(float(speed)/float(ma.SR)) : fmod(_,1.0)) ~ *(1);
phasor_bin_2 =  (+(float(speed_2)/float(ma.SR)) : fmod(_,1.0)) ~ *(1);
phasor_bin_3 =  (+(float(speed_3)/float(ma.SR)) : fmod(_,1.0)) ~ *(1);
						

// PULSAR //////////////////////////////
pulsar = _<:(((_)<(ratio_env)):@(100))*((proba)>( ((_):-(offset)),(noise:abs):latch)); //this version introduce a delay of 5 samples to resynchronize prob to output without artefact
pulsar_2 = _<:(((_)<(ratio_env)):@(100))*((proba_2)>( ((_):-(offset)),(noise:abs):latch));
pulsar_3 = _<:(((_)<(ratio_env)):@(100))*((proba_3)>( ((_):-(offset)),(noise:abs):latch));


// ENVELOPPE PULSAR ////////////////////
duree_env = 1/(speed: / (ratio_env*(0.25)*fade));
duree_env_2 = 1/(speed_2: / (ratio_env*(0.25)*fade));
duree_env_3 = 1/(speed_3: / (ratio_env*(0.25)*fade));




// FM SYNTHESIS example from Laurent Potier  ///////////////////////////
oscillateur(vol, freq, modul) = vol * osci(freq + modul);

FM_v1 = oscillateur(vol, freq, modul1)
		with {
			    
				modul1 = oscillateur(volmod, freqmod, modul1mod);
				vol = 0.3; //hslider ( "v:sfTaiji parametre/vol [color:255 255 0] [hidden:1]",0.3,0,1,0.0001):smooth(0.998);
				freq= 2484; //hslider ( "v:sfTaiji parametre/freq[color:255 0 0] [osc:/gyrosc/grav/0 -1 1] [hidden:1]",2484,900,6000,1):smooth(0.998);
				volmod = 0.0492:*(freqmod):smooth(0.998); //hslider ( "v:sfTaiji parametre/index [color:255 255 0] [hidden:1]",0.0492,0,1,0.0001):*(freqmod):smooth(0.998);
                
			 	freqmod = 0.9*(freq);//hslider ("v:sfTaiji parametre/freqmod[color:0 255 0] [osc:/gyrosc/grav/2 -1 1] [hidden:1]", 0.9,0.1,1,0.1):*(freq);
				modul1mod = (0);
			};


FM_v2 = oscillateur(vol_2, freq_2, modul1_2)
		with {
			    
				modul1_2 = oscillateur(volmod_2, freqmod_2, modul1mod_2);
				vol_2 = hslider ( "v:sfTaiji parametre/vol_2 [color:255 255 0] [accx:1 0 0.3 0] [hidden:1]",0.25,0,0.5,0.0001):smooth(0.998);
				freq_2= hslider ( "v:sfTaiji parametre/freq_2[color:255 0 0] [compass:2 0 0 1] [osc:/gyrosc/grav/0 -1 1] [hidden:1]",1890,900,3000,1):smooth(0.998);
				volmod_2 = 0.0492:*(freqmod_2);//hslider ( "v:sfTaiji parametre/index_2 [color:255 255 0] [hidden:1]",0.0492,0,1,0.0001):*(freqmod_2):smooth(0.998);
                freqmod_2 = 0.9:*(freq_2);//hslider ("v:sfTaiji parametre/freqmod_2[color:0 255 0] [osc:/gyrosc/grav/2 -1 1] [hidden:1]", 0.9,0.1,1,0.1):*(freq_2);
				modul1mod_2 = (0);
			};
			
FM_v3 = oscillateur(vol_3, freq_3, modul1_3)
		with {
			    
				modul1_3 = oscillateur(volmod_3, freqmod_3, modul1mod_3);
				vol_3 = hslider ( "v:sfTaiji parametre/vol_3 [color:255 255 0] [accx:1 0 0.2 0] [hidden:1]",0.25,0,0.5,0.0001):smooth(0.998);
				freq_3= hslider ( "v:sfTaiji parametre/freq_3[color:255 0 0] [compass:1 0 0 1] [osc:/gyrosc/grav/0 -1 1] [hidden:1]",5000,3000,6000,1):+(1000):smooth(0.998);
				volmod_3 = 0.0492:*(freqmod_3);//hslider ( "v:sfTaiji parametre/index_3 [color:255 255 0] [hidden:1]",0.0492,0,1,0.0001):*(freqmod_3):smooth(0.998);
                
			 	freqmod_3 = 0.9:*(freq_3);//hslider ("v:sfTaiji parametre/freqmod_3[color:0 255 0] [osc:/gyrosc/grav/2 -1 1] [hidden:1]", 0.9,0.1,1,0.1):*(freq_3);
				modul1mod_3 = (0);
			};
			



//process = phasor_bin : pulsar : amp_follower_ud(duree_env,duree_env) ;
Drop_v1 =  FM_v1 * (phasor_bin : pulsar : amp_follower_ud(duree_env,duree_env)) ;
Drop_v2 =  FM_v2 * (phasor_bin_2 : pulsar_2 : amp_follower_ud(duree_env_2,duree_env_2));
Drop_v3 =  FM_v3 * (phasor_bin_3 : pulsar_3 : amp_follower_ud(duree_env_3,duree_env_3));

Drop = ( Drop_v1,Drop_v2,Drop_v3 ):>_ :/(8):(instrReverb_m);




/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Accelerometer Part ///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Usage: 	_:*(Maccel):_ // this function is useful for smooth control from accelerometers
// 			_:	

accel_x = hslider("acc_x [acc:0 1 0 0 1][color: 0 255 0 ][hidden:1]",0,-100,100,1);
accel_y = hslider("acc_y [acc:1 1 0 0 1][color: 0 255 0 ][hidden:1]",0,-100,100,1);
accel_z = hslider("acc_z [acc:2 1 0 0 1][color: 0 255 0 ][hidden:1]",0,-100,100,1);

lowpassfilter = lowpass(N,fc)
			with {
				//fc=hslider("high_cut [hidden:1]",0.5,0.001,10,0.1);
				fc=0.5;
				N= 1;	// order of filter
			};
			
lowpassmotion = lowpass(N,fc)
			with {
				//fc= hslider("high_cut [hidden:1]",10,0.01,10,0.01);
				fc=10;
				N= 1;	// order of filter
			};

			
//fb=hslider("low_cut [hidden:1]",15,0.1,15,0.01);
fb=12;			
dc(x)=x:fi.dcblockerat(fb);


//offset = hslider ("thr_accel [hidden:1]",9.99,0,9.99,0.01);
offset_acc =6;

quad(x)=dc(x)*dc(x);
Accel = quad(accel_x),quad(accel_y),quad(accel_z):> sqrt:-(offset_acc):/((10)-(offset_acc)):max(0.):min(1.);


// Maccel mean Motion with accelerometer
//Maccel = Accel:lowpassfilter:min(1.);
Maccel = Accel:an.amp_follower_ud (env_up,env_down)
			with {
				//env_up = hslider ( "v:sfTaiji parametre/fade_in [color: 255 255 0 ][hidden:1]", 130,0,1000,1)*0.001: lowpass(1,1);
				//env_up = 0.03;
				//env_down = hslider ( "v:sfTaiji parametre/fade_out[color: 255 255 0 ][hidden:1]", 280,0,1000,1)*0.001: lowpass(1,1);
				//env_down = 0.28;
				env_up = 0.175;  //hslider ( "v:sfTaiji parametre/fade_in [accx:1 0 670 0][color: 255 255 0 ][hidden:1]", 500,0,1300,1)*0.001: lowpass(1,0.5);
				
				env_down = 0.001;  //hslider ( "v:sfTaiji parametre/fade_out[color: 255 255 0 ][accy:1 0 0 0][hidden:1]", 0,0,500,1)*0.001: lowpass(1,1);
			};

Maccel2 = Accel:an.amp_follower_ud (0.5,0.1);


// Taccel mean Trigger from accelerometer alike a shock detection to start ( send 1 )and from end of motion from Maccel ( send 0 )

// il faut ici mettre à 1 lorsque qu'il y a un shock via accelero
// le son est jouer en loop et s'arrête à partir d'un  niveau Maccel < à un certain niveau. 
// le volume associé au son via Maccel devra être à 0 à partir de ce seuil egalement

// Trig_up and trig_donw detect a transition up and down from each thresholds

trig_up(c) = s 
		with {
 			//threshold_up = hslider ("v:sfTaiji parametre/thr_up [hidden:1]",0.499,0,1,0.001);
 			threshold_up = 0.499;
			s = ((c'<= threshold_up)&(c > threshold_up)); 
			};
 
trig_down(c) = (-1) * s 
		with {
 			//threshold_down = hslider ("v:sfTaiji parametre/thr_down [hidden:1]",0.0001,0.,8,0.01);
 			threshold_down = 0.0001;
			s = ((c'>= threshold_down)&(c < threshold_down)); 
			};

Taccel = ((Accel:trig_up),(Maccel:trig_down):+):(+:max(0):min(1))~_;

simple_playback(soundfiles) =(soundfiles),((int)((0):+~(+(speed): fmod(_,size)<:select2(<(0.),_,(size-1))))):rdtable
with {
				size=(soundfiles):_,!; // from waveform primitive definied in .dsp of audiofile
				speed = Maccel:*(2):max(0.5):min(2);
				//speed = (1);
				//speed = vslider("speed [accy:-1 0 0 0][color: 255 255 0 ] [hidden:1]",1,-2,2,0.01):lowpass(1,3);
				
				//size=100;				
};
			
simple_playback2(soundfiles) =(soundfiles),((int)((0):+~(+(speed): fmod(_,size)<:select2(<(0.),_,(size-1))))):rdtable
			with {
				size=(soundfiles):_,!; // from waveform primitive definied in .dsp of audiofile
				//speed = Maccel:*(2):max(0.5):min(2);
				speed = (1);
				//speed = vslider("speed [accy:-1 0 0 0][color: 255 255 0 ] [hidden:1]",1,-2,2,0.01):lowpass(1,3);
				
				//size=100;				
			};

s1 = soundfile("[url:{'metabird.flac'}]",2);
sample1 = so.sound(s1, 0);

//motionVol = hslider("motionVol [motion: totalgyro] [hidden:1]",0,0,2,0.01)*2: an.amp_follower_ud (0.075,0.001);
motionVol = Accel*1.5: an.amp_follower_ud (0.1,0.05);
//Bird= ( simple_playback2(birdy2_0),simple_playback2(birdy_0) ):> _:/(10): dcblockerat(50):*(motionVol)<:_,_;
Bird= ( sample1.loop_speed_level(1, 1) ):> _:/(1): fi.dcblockerat(50):*(motionVol)<:_,_;

//Part1_Forest = Drop,Bird:>_,_;
Part1_Forest = Bird:>_,_;


////////////////////////////////////////////PART 2///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

			
//////////////////////////////
// MOOG_VCF //////////////////
//////////////////////////////
// from effect.lib of Julius Smith
// this adapted for this project, read moog_vcf_demo for more information

moog_vcf_wind = vcfarch :*(5)
	with {
   		//freq = hslider("h:Moogfilter/Frequency [1]  [unit:PK] [style:knob]",25, 1, 88, 0.01) : pianokey2hz : smooth(0.999);
		freq = (Maccel2*100)+1: pianokey2hz : smooth(0.999);
		//res = hslider("h:Moogfilter/Resonance [2] ", 0.9, 0, 1, 0.01));
		res = Maccel2;
		vcfbq =  _ <: select2(1, moog_vcf_2b(res,freq), moog_vcf_2bn(res,freq)); // fix select 2biquad
   		vcfarch =  _ <: select2(1, moog_vcf(res^4,freq), vcfbq); // fix select normalized
	};




//windy= pink_noise :*(Maccel):moog_vcf_wind :instrReverb_m:>_: max(-0.99):min(0.99);
windy= pink_noise :*(Maccel2):moog_vcf_wind :>_: max(-0.99):min(0.99);
	
rainy= simple_playback(wind1_0),simple_playback(rainstick_0):>_ :instrReverb_m:>_: dcblockerat(50):*(Maccel2);	


Part2_Wind = windy,rainy:>_,_;



/////////////////////////////////////////PART 3/////////////////////
/////////////////////////////////////////////////////////////////////////


			

//==================== GUI SPECIFICATION ================

random_trig_freq=SH(trig_freq,(random_ID*3:int));

trig_freq = (gate_3)>((gate_3)');


freq=random_trig_freq:select3(_,50,100,150);

//freq = nentry("h:sfTaiji 3-Bowl [3]/Freq [2][unit:Hz] [tooltip:Tone frequency]",200,20,20000,1);
//gain = nentry("v:sfTaiji parametre/gain [1][tooltip:Gain (value between 0 and 1)] [hidden:1]",0.8,0,1,0.01); 
gain =0.7;

//gate = button("h:sfTaiji 3-Bowl [3]/Push! [3][tooltip:noteOn = 1, noteOff = 0]");
gate = ramp(gate_3);

//select = vslider("h:Physical_and_Nonlinearity/v:Physical_Parameters/Excitation_Selector[2][tooltip:0=Bow; 1=Strike]",0,0.,1.,0.001):smooth(0.98) ;

vmeter(x)       = attach(x, envelop(x) : vbargraph("h:TibetanBowl/Vol [2][unit:dB]", -70, 6));
envelop			= abs : max(db2linear(-70)) : linear2db : min(10)  : max ~ -(80.0/ma.SR);
null(x)         = attach(0,x);

//vmeter2 = hbargraph("speed", 0, 1);
//select = Maccel:vmeter;
//select = Accel : lowpass(1,vslider("lowpass",0.5,0,1,0.01)) :max(0):min(1) :vmeter; 
select =  osci(Accel*(toto):*(gate)):+(1) :*(0.5)
		with{
			toto = 3;//hslider("v:sfTaiji parametre/Speed [4] [hidden:0]",10,0,10,0.1) ;
			//toto = 4.5 ;
			
			};

integrationConstant = hslider("v:sfTaiji parametre/Integration_Constant[2][accx:0 0 0 0][color: 0 255 0 ][hidden:1]",0,0,1,0.01):lowpass(1,1);



baseGain = hslider("v:sfTaiji parametre/Base_Gain[2][hidden:1]",1,0,1,0.01);

bowPressure = hslider("v:sfTaiji parametre/Bow_Pressure[2][accy:2 0 0.25 0][color: 0 255 0 ][hidden:1]",0.2,0,0.5,0.01):lowpass(1,1);



//bowPosition = hslider("v:sfTaiji parametre/Bow_Position[2][hidden:1]",0,0,1,0.01);
bowPosition = 0;

//typeModulation = nentry("v:sfTaiji parametre/Modulation_Type [3][hidden:1]",0,0,4,1);
typeModulation = 0;

//nonLinearity = hslider("v:sfTaiji parametre/Nonlinearity [3][color: 0 255 0 ][hidden:1]",0,0,1,0.01):lowpass(1,0.5);
nonLinearity = 0;


//frequencyMod = hslider("v:sfTaiji parametre/Modulation_Frequency [3][unit:Hz][hidden:1]",220,20,1000,0.1);
frequencyMod = 220;
//nonLinAttack = hslider("v:sfTaiji parametre/Nonlinearity_Attack[3][unit:s][hidden:1]",0.1,0,2,0.01);
nonLinAttack = 0.1;


//==================== MODAL PARAMETERS ================

preset = 0;

nMode(0) = 12;

modes(0,0) = 0.996108344;
basegains(0,0) = 0.999925960128219;
excitation(0,0) = 11.900357 / 10;
    
modes(0,1) = 1.0038916562;
basegains(0,1) = 0.999925960128219;
excitation(0,1) = 11.900357 / 10;

modes(0,2) = 2.979178;
basegains(0,2) = 0.999982774366897;
excitation(0,2) = 10.914886 / 10;

modes(0,3) = 2.99329767;
basegains(0,3) = 0.999982774366897;
excitation(0,3) = 10.914886 / 10;
    
modes(0,4) = 5.704452;
basegains(0,4) = 1.0;
excitation(0,4) = 42.995041 / 10;
    
modes(0,5) = 5.704452;
basegains(0,5) = 1.0;
excitation(0,5) = 42.995041 / 10;
    
modes(0,6) = 8.9982;
basegains(0,6) = 1.0;
excitation(0,6) = 40.063034 / 10;
    
modes(0,7) = 9.01549726;
basegains(0,7) = 1.0;
excitation(0,7) = 40.063034 / 10;
    
modes(0,8) = 12.83303;
basegains(0,8) = 0.999965497558225;
excitation(0,8) = 7.063034 / 10;
   
modes(0,9) = 12.807382;
basegains(0,9) = 0.999965497558225;
excitation(0,9) = 7.063034 / 10;
    
modes(0,10) = 17.2808219;
basegains(0,10) = 0.9999999999999999999965497558225;
excitation(0,10) = 57.063034 / 10;
    
modes(0,11) = 21.97602739726;
basegains(0,11) = 0.999999999999999965497558225;
excitation(0,11) = 57.063034 / 10;

//==================== SIGNAL PROCESSING ================

//----------------------- Nonlinear filter ----------------------------
//nonlinearities are created by the nonlinear passive allpass ladder filter declared in filter.lib

//nonlinear filter order
nlfOrder = 6; 

//nonLinearModultor is declared in instrument.lib, it adapts allpassnn from filter.lib 
//for using it with waveguide instruments
NLFM =  nonLinearModulator((nonLinearity : smooth(0.999)),1,freq,
typeModulation,(frequencyMod : smooth(0.999)),nlfOrder);

//----------------------- Synthesis parameters computing and functions declaration ----------------------------

//the number of modes depends on the preset being used
nModes = nMode(preset);

//bow table parameters
tableOffset = 0;
tableSlope = 10 - (9*bowPressure);

delayLengthBase = ma.SR/freq;

//delay lengths in number of samples
delayLength(x) = delayLengthBase/modes(preset,x);

//delay lines
delayLine(x) = delay(4096,delayLength(x));

//Filter bank: bandpass filters (declared in instrument.lib)
radius = 1 - PI*32/ma.SR;
bandPassFilter(x) = bandPass(freq*modes(preset,x),radius);

//Delay lines feedback for bow table lookup control
baseGainApp = 0.8999999999999999 + (0.1*baseGain);
velocityInputApp = integrationConstant;
velocityInput = velocityInputApp + _*baseGainApp,par(i,(nModes-1),(_*baseGainApp)) :> +;

//Bow velocity is controled by an ADma.SR envelope
maxVelocity = 0.03 + 0.1*gain;
bowVelocity = maxVelocity*adsr(0.02,0.005,90,0.01,gate);

//stereoizer is declared in instrument.lib and implement a stereo spacialisation in function of 
//the frequency period in number of samples 
stereo = stereoizer(delayLengthBase);

//----------------------- Algorithm implementation ----------------------------

//Bow table lookup (bow is decalred in instrument.lib)
bowing = bowVelocity - velocityInput <: *(bow(tableOffset,tableSlope)) : /(nModes);

//One resonance
resonance(x) = + : + (excitation(preset,x)*select) : delayLine(x) : *(basegains(preset,x)) : *((freq*modes(preset,x)) < (ma.SR/2)) : bandPassFilter(x);



Part3_Bowl =
		//Bowed Excitation
		(bowing*((select-1)*-1) <:
		//nModes resonances with nModes feedbacks for bow table look-up 
		par(i,nModes,(resonance(i)~_)))~par(i,nModes,_) :> + : 
		//Signal Scaling and stereo
		NLFM:*(10):highpass(3,500):* (Maccel2);
		 




//Mute_all = ramp(checkbox("v:sfTaiji/Mute [color: 255 0 0 ]"):==(0) );
//process = Part3_Bowl;

//process = ( Part0_Reson*(ramp(gate_0)), Part1_Forest*(ramp(gate_1)), Part2_Wind*(ramp(gate_2)), Part3_Bowl*(ramp(gate_3)) ):>_*(Mute_all);



//---------------------------------------------------------------------------------
// tomute an input (source:n->n) with a 10000 samples crossfades. 
// Example: _: tomute(checkbox("ramp mute"):_
tomute (b) = enable(xb)
				
	with {
		//samples = 10000;
		//samples = hslider("v:sfTaiji parametre/ramptomute [hidden:1]",4000,0,5000,1)*(ma.SR*0.001);
		samples = 1000*(ma.SR*0.001);
		xb = ramp(samples, b);
		ramp(n) = \(y,x).(if (y+1.0/n < x, y+1.0/n, if(y-1.0/n > x, y-1.0/n, x))) ~ _;
		if (c,t,e) = select2(c,e,t);
	};
	
 	
/*	
process = bypass( gate_0:==(0), Part0_Reson)
          ,bypass( gate_1:==(0), Part1_Forest)
          ,bypass( gate_2:==(0), Part2_Wind)
          ,bypass( gate_3:==(0), Part3_Bowl) :>_ *Mute_all;
*/

// process = ( (Part0_Reson:tomute(gate_0)), (Part1_Forest:tomute(gate_1)), (Part2_Wind:tomute(gate_2)), (Part3_Bowl:tomute(gate_3)) ):>_;
//process = (Part0_Reson:tomute(gate_0),tomute(gate_0)),(Part1_Forest:tomute(gate_1),tomute(gate_1)) :>_,_;
process = (Part1_Forest:tomute(gate_1),tomute(gate_1)) :>_,_;