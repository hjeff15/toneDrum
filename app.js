let beatLength;
let cellWidth;
let playButton;
let pat4,pat5,pat6;
let bpmCTRL;
let drums;
let rev, del, fuzz, bpFilter;
let hh,clap,bass,snare,crash,tom;

//============== REVERB BUTTONS==================
let hhRev = document.getElementById("hh_reverb");
hhRev.addEventListener("click", handleReverb);
let clapRev = document.getElementById("clap_reverb");
clapRev.addEventListener("click", handleReverb);
let bassRev = document.getElementById("bass_reverb");
bassRev.addEventListener("click", handleReverb);
let snareRev = document.getElementById("snare_reverb");
snareRev.addEventListener("click", handleReverb);
let crashRev = document.getElementById("crash_reverb");
crashRev.addEventListener("click", handleReverb);
let tomRev = document.getElementById("tom_reverb");
tomRev.addEventListener("click", handleReverb);

//===============DELAY BUTTONS===================
let hhDelay = document.getElementById("hh_delay");
hhDelay.addEventListener("click", handleDelay);
let clapDelay = document.getElementById("clap_delay");
clapDelay.addEventListener("click", handleDelay);
let bassDelay = document.getElementById("bass_delay");
bassDelay.addEventListener("click", handleDelay);
let snareDelay = document.getElementById("snare_delay");
snareDelay.addEventListener("click", handleDelay);
let crashDelay = document.getElementById("crash_delay");
crashDelay.addEventListener("click", handleDelay);
let tomDelay = document.getElementById("tom_delay");
tomDelay.addEventListener("click", handleDelay);

//===============FUZZ BUTTONS==================
let hhFuzz = document.getElementById("hh_fuzz");
hhFuzz.addEventListener("click", handleFuzz);
let clapFuzz = document.getElementById("clap_fuzz");
clapFuzz.addEventListener("click", handleFuzz);
let bassFuzz = document.getElementById("bass_fuzz");
bassFuzz.addEventListener("click", handleFuzz);
let snareFuzz = document.getElementById("snare_fuzz");
snareFuzz.addEventListener("click", handleFuzz);
let crashFuzz = document.getElementById("crash_fuzz");
crashFuzz.addEventListener("click", handleFuzz);
let tomFuzz = document.getElementById("tom_fuzz");
tomFuzz.addEventListener("click", handleFuzz);

//==============EQ BUTTON========================
let eqButton = document.getElementById('eq');
eqButton.addEventListener("click", handleEq);

//====================SETUP P5 CANVAS===================
function setup(){
	const canvas = createCanvas(555, 140);
	canvas.parent("sketch_holder");
	canvas.mousePressed(canvasPressed);

	// const secondCanvas = createCanvas(105,105);

    playButton = document.getElementById("play_button");
	playButton.addEventListener("click", playPressed);
	
	let stopButton = document.getElementById("stop_button");
	stopButton.addEventListener("click", stopPressed);

    beatLength = 16;
    cellWidth = width/beatLength;
    cursorPos = 0;

    hh = loadSound("assets/hh_sample.mp3");
    clap = loadSound("assets/clap_sample.mp3", () => {} );
	bass = loadSound("assets/bass_sample.mp3", () => {} );
	snare = loadSound("assets/snare.mp3", () => {} );
	crash = loadSound("assets/crash.mp3", () => {} );
	tom = loadSound("assets/tom.mp3", () => {} );
	
//==========PITCH SLIDERS===================
	let hhPitch = createSlider(0, 2, 1, 0.05);
	hhPitch.parent("hh_speed");
	hhPitch.addClass("effect_slider");
	hhPitch.id("hh_pitch");
	hhPitch.input( () => {hh.rate(hhPitch.value())});

	let clapPitch = createSlider(0, 3, 1, 0.05);
	clapPitch.parent("clap_speed");
	clapPitch.addClass("effect_slider");
	clapPitch.id("clap_pitch");
	clapPitch.input( () => {clap.rate(clapPitch.value())});

	let bassPitch = createSlider(0, 2, 1, 0.05);
	bassPitch.parent("bass_speed");
	bassPitch.addClass("effect_slider");
	bassPitch.id("bass_pitch");
	bassPitch.input( () => {bass.rate(bassPitch.value())});

	let snarePitch = createSlider(0, 2, 1, 0.05);
	snarePitch.parent("snare_speed");
	snarePitch.addClass("effect_slider");
	snarePitch.id("snare_pitch");
	snarePitch.input( () => {snare.rate(snarePitch.value())});

	let crashPitch = createSlider(0, 2, 1, 0.05);
	crashPitch.parent("crash_speed");
	crashPitch.addClass("effect_slider");
	crashPitch.id("crash_pitch");
	crashPitch.input( () => {crash.rate(crashPitch.value())});

	let tomPitch = createSlider(0, 2, 1, 0.05);
	tomPitch.parent("tom_speed");
	tomPitch.addClass("effect_slider");
	tomPitch.id("tom_pitch");
	tomPitch.input( () => {tom.rate(tomPitch.value())});

//============VOLUME SLIDERS=======================

	let hhVol = createSlider(0, 1, 0.8, 0.01);
	hhVol.parent("hh_vol");
	hhVol.addClass("effect_slider");
	hhVol.id("hh_vol");
	hhVol.input( () => {hh.amp(hhVol.value())});

	let clapVol = createSlider(0, 1, 0.8, 0.01);
	clapVol.parent("clap_vol");
	clapVol.addClass("effect_slider");
	clapVol.id("clap_vol");
	clapVol.input( () => {clap.amp(clapVol.value())});

	let bassVol = createSlider(0, 1, 0.8, 0.01);
	bassVol.parent("bass_vol");
	bassVol.addClass("effect_slider");
	bassVol.id("bass_vol");
	bassVol.input( () => {bass.amp(bassVol.value())});

	let snareVol = createSlider(0, 1, 0.8, 0.01);
	snareVol.parent("snare_vol");
	snareVol.addClass("effect_slider");
	snareVol.id("snare_vol");
	snareVol.input( () => {snare.amp(snareVol.value())});

	let crashVol = createSlider(0, 1, 0.8, 0.01);
	crashVol.parent("crash_vol");
	crashVol.addClass("effect_slider");
	crashVol.id("crash_vol");
	crashVol.input( () => {crash.amp(crashVol.value())});

	let tomVol = createSlider(0, 1, 0.8, 0.01);
	tomVol.parent("tom_vol");
	tomVol.addClass("effect_slider");
	tomVol.id("tom_vol");
	tomVol.input( () => {
		tom.amp(tomVol.value());
	});

//==================SEQUENCE DATA===============

    hPat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    cPat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0];
	bPat = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0];
	pat4 = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
	pat5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
	pat6 = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    sPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    hPhrase = new p5.Phrase("hh", (time) => {
        hh.play(time)
    }, hPat);
    cPhrase = new p5.Phrase("clap", (time) => {
        clap.play(time)
    }, cPat);
    bPhrase = new p5.Phrase("bass", (time) => {
        bass.play(time)
	}, bPat);
	snarePhrase = new p5.Phrase("snare", (time) => {
		snare.play(time)
	}, pat4);
	crashPhrase = new p5.Phrase("crash", (time) => {
		crash.play(time)
	}, pat5);
	tomPhrase = new p5.Phrase("tom", (time) => {
		tom.play(time)
	}, pat6);

//=============EFFECTS===============
// REVERB 
	rev = new p5.Reverb();
	rev.set(5,30,false);

	let revSecSlider = createSlider(0, 10, 5, 0.02);
	let revDiv = document.getElementById("reverb_controls");
	revSecSlider.parent(revDiv);
	revSecSlider.addClass("effect_slider");
	revSecSlider.id("reverb_amount");
	revSecSlider.input( () => {rev.set(revSecSlider.value(),30, false)});

// DELAY
	del = new p5.Delay();
	del.delayTime(0.1);
	del.feedback(0.4);//this is the varialble to change on the slider
	del.setType('pingPong');

	let delTimeSlider = createSlider(0.2,0.7,0.4,0.05);
	delTimeSlider.parent("delay_controls");
	delTimeSlider.addClass("effect_slider");
	delTimeSlider.id("delay_amount");
	delTimeSlider.input( () => {
		del.feedback(delTimeSlider.value());
		console.log("delTime", delTimeSlider.value());
	});
		

// DISTORTION
	fuzz = new p5.Distortion();
	let fuzzAmnt = createSlider(0, 1, 0.8, 0.01);
	fuzzAmnt.parent("fuzz_controls");
	fuzzAmnt.addClass("effect_slider");
	fuzzAmnt.id("fuzz_amount");
	fuzzAmnt.input( () => {
		fuzz.output.gain.value = fuzzAmnt.value();
	});

// FILTER
	bpFilter = new p5.LowPass();
	bpFilter.freq(1050);
    bpFilter.res(25);
	let eqFreqSlider = createSlider(10, 2050, 1050, 10);
	eqFreqSlider.parent("eq_freq");
	eqFreqSlider.addClass("effect_slider");
	eqFreqSlider.id("freq_amount");
	eqFreqSlider.input( () => {
		bpFilter.freq(eqFreqSlider.value());
	})

	let eqResSlider = createSlider(1, 10, 5, 0.5);
	eqResSlider.parent("eq_res");
	eqResSlider.addClass("effect_slider");
	eqResSlider.id("res_amount");
	eqResSlider.input( () => {
		bpFilter.res(eqResSlider.value());
		console.log(bpFilter.res);
	})
	
//==============SEQUENCER==============
    drums = new p5.Part();

    drums.addPhrase(hPhrase);
    drums.addPhrase(cPhrase);
	drums.addPhrase(bPhrase);
	drums.addPhrase(snarePhrase);
	drums.addPhrase(crashPhrase);
	drums.addPhrase(tomPhrase);
    drums.addPhrase("seq", sequence, sPat);

//=========== SET MASTER BPM =====================
    bpmCTRL = createSlider(30, 180, 80, 1);
	bpmCTRL.parent("bpm");
	bpmCTRL.addClass("effect_slider");
	bpmCTRL.id("master_bpm");
    bpmCTRL.input( () => {drums.setBPM(bpmCTRL.value())})

	drums.setBPM("80");

// ============SET MASTER VOLUME============
	let volumeSlider = createSlider(0, 1, 0.7, 0.05);
	volumeSlider.parent("volume");
	volumeSlider.addClass("effect_slider");
	volumeSlider.id("master_volume");
	// input calls function to control para. map()function does not work outside of draw
	volumeSlider.input ( () => {masterVolume(volumeSlider.value())})

    drawMatrix();
}

// ===================HANDLE REVERB=============

function handleReverb(e){
	let event = handleRevDelayId(e);
	let eventInstrument = event.inst;
	let otherEffect = event.instDel;
	if(e.target.checked){
		eventInstrument.connect(rev);
	}else if(!e.target.checked){
		eventInstrument.disconnect();
		eventInstrument.connect();
		otherEffect.checked = false
	}	
};

//======================= HANDLE DELAY ============

function handleDelay(e){
	let event = handleRevDelayId(e);
	let eventInstrument = event.inst;
	let otherEffect = event.instReverb;
	if(e.target.checked){
		eventInstrument.connect(del);
	}else if(!e.target.checked){
		eventInstrument.disconnect();
		eventInstrument.connect();
		otherEffect.checked = false
	}	
};

// =====================HANDLE FUZZ================
function handleFuzz(e){
	let event = handleFuzzEventId(e);
	if(e.target.checked){
		event.connect(fuzz);
	}else if(!e.target.checked){
		event.disconnect();
		event.connect();
	}
};

//==================HANDLE EQ=================
function handleEq(e){
	if(e.target.checked){
		bpFilter.connect();
		hh.connect(bpFilter);
		clap.connect(bpFilter);
		bass.connect(bpFilter);
		snare.connect(bpFilter);
		crash.connect(bpFilter);
		tom.connect(bpFilter);
	}else{
		console.log("Not checked");
		bpFilter.disconnect();
	}
}

// ID HANDLERS
function handleRevDelayId(e){
	let event = e.target.parentElement.parentElement.parentElement.id;
	// let event = e;
	if(event==="hh"){
		let hhObj = {
			"inst": hh,
			"instReverb": hhRev,
			"instDel": hhDelay
		}
		return hhObj;
	}else if(event==="clap"){
		let clapObj = {
			"inst": clap,
			"instReverb": clapRev,
			"instDel": clapDelay
		}
		return clapObj;
	}else if(event==="bass"){
		let bassObj = {
			"inst": bass,
			"instReverb": bassRev,
			"instDel": bassDelay
		}
		return bassObj;
	}else if(event==="snare"){
		let snareObj = {
			"inst": snare,
			"instReverb": snareRev,
			"instDel": snareDelay
		}
		return snareObj;
	}else if(event==="crash"){
		let crashObj = {
			"inst": crash,
			"instReverb": crashRev,
			"instDel": crashDelay
		}
		return crashObj;
	}else{
		let tomObj = {
			"inst": tom,
			"instReverb": tomRev,
			"instDel": tomDelay
		}
		return tomObj;
	}
}
// handle Fuzz has fewer parents to get to the id than Rev+Delay handler
function handleFuzzEventId(e){
	let event = e.target.parentElement.parentElement.id;
	if(event==="hh"){
		return hh;
	}else if(event==="clap"){
		return clap;
	}else if(event==="bass"){
		return bass;
	}else if(event==="snare"){
		return snare;
	}else if(event==="crash"){
		return crash;
	}else{
		return tom;
	}
}

// ===================== PLAY BUTTON ===============
function playPressed(){
	if(hh.isLoaded() && clap.isLoaded && bass.isLoaded()){
		getAudioContext().resume();
		if(!drums.isPlaying){
			drums.loop();
			playButton.style.background = "rgba(191, 5, 5, 0.4)";
			console.log("drums are playing");
		} 
	}else{
		console.log("oops, drums are not loaded yet!")
	}
}
// =================== STOP BUTTON =================
function stopPressed(){
	if(drums.isPlaying){
		drums.stop();
		playButton.style.background = "#c0cfd8";
		console.log("Loop has stopped");
	}
}

// =================== CANVAS SEQUENCER ==============
function canvasPressed(){
		let rowClicked = floor(6*mouseY/height);
		let indexClicked = floor(16*mouseX/width);
		if(rowClicked === 0){
			hPat[indexClicked] = toggleState(hPat[indexClicked]);
		} if(rowClicked === 1){
			cPat[indexClicked] = toggleState(cPat[indexClicked]);
		} if(rowClicked === 2){
			bPat[indexClicked] = toggleState(bPat[indexClicked]);
		} if(rowClicked === 3){
			pat4[indexClicked] = toggleState(pat4[indexClicked]);
		} if(rowClicked === 4){
			pat5[indexClicked] = toggleState(pat5[indexClicked]);
		} else if(rowClicked === 5){
			pat6[indexClicked] = toggleState(pat6[indexClicked]);
		}
	drawMatrix();
}

function drawMatrix(){
    background(0);
    stroke("white");
    strokeWeight(2);
    for(let i = 0; i < beatLength+1; i++){
        line( i*cellWidth, 0, i*cellWidth, height);
    }
    for(let i = 0; i < 7; i++){
        line(0, i*height/6, width, i*height/6);
    }
    noStroke();
    for (let i = 0 ; i < beatLength; i++){
        if(hPat[i] === 1){
            ellipse(i*cellWidth + 0.5*cellWidth, height/12, 10);
        }
        if(cPat[i] === 1){
            ellipse(i*cellWidth + 0.5*cellWidth, height/4, 10);
        }
        if(bPat[i] === 1){
            ellipse(i*cellWidth + 0.5*cellWidth, height/2.5, 10);
		}
		if(pat4[i] === 1){
			ellipse(i*cellWidth + 0.5*cellWidth, height/1.75, 10);
		}
		if(pat5[i] === 1){
			ellipse(i*cellWidth + 0.5*cellWidth, (height/2)*1.5, 10);
		}
		if(pat6[i] === 1){
			ellipse(i*cellWidth + 0.5*cellWidth, height/1.1, 10);
		}
    }
}

function toggleState(stateInput){
  	return stateInput? 0 : 1;
}
function sequence(time, beatIndex){
	// console.log(beatIndex);
	setTimeout(() => {
		drawMatrix();
		push();
		stroke('red');
		fill(255, 0, 0, 20);
		rect((beatIndex-1)*cellWidth, 0, cellWidth, height);
		pop();
	}, time*1000)

} 
