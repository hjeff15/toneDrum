let beatLength;
let cellWidth;
let playButton;
let pat4,pat5,pat6;
let bpmCTRL;
let drums;
let rev, del;
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


//==============DRUM SLIDERS=====================
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach((wrap) => {
  const range = wrap.querySelector(".range");
  const slider = wrap.querySelector(".slider");
 

  range.addEventListener("input", () => {
    setSlider(range, slider);
  });

  // setting slider on DOM load
  setSlider(range, slider);
});

function setSlider(range, slider) {
	const val = range.value;
	console.log(val);
	const min = range.min || 0;
	const max =  range.max || 100;

	const offset = Number(((val - min) * 100) / (max - min));

	slider.textContent = val;

	// yes, 14px is a magic number
	slider.style.left = `calc(${offset}% - 14px)`;
}
//====================SETUP P5 CANVAS===================
function setup(){
    const canvas = createCanvas(555, 140);
	canvas.parent("sketch_holder");
	canvas.mousePressed(canvasPressed);

    playButton = document.getElementById("play_button");
	playButton.addEventListener("click", playPressed);
	
	let stopButton = document.getElementById("stop_button");
	stopButton.addEventListener("click", stopPressed);

    beatLength = 16;
    cellWidth = width/beatLength;
    cursorPos = 0;

    hh = loadSound("assets/hh_sample.mp3", () => {} );
    clap = loadSound("assets/clap_sample.mp3", () => {} );
	bass = loadSound("assets/bass_sample.mp3", () => {} );
	snare = loadSound("assets/snare.mp3", () => {} );
	crash = loadSound("assets/crash.mp3", () => {} );
	tom = loadSound("assets/tom.mp3", () => {} );
	

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
	rev = new p5.Reverb();

	let revSecSlider = createSlider(0, 10, 5, 0.2);
	revSecSlider.parent("reverb_controls");
	revSecSlider.input( () => {rev.set(revSecSlider.value(),30, false)})

	del = new p5.Delay();
	del.delayTime(0.4);
	del.feedback(0.2);
	del.setType('pingPong');
	
	
//==============SEQUENCER==============
    drums = new p5.Part();

    drums.addPhrase(hPhrase);
    drums.addPhrase(cPhrase);
	drums.addPhrase(bPhrase);
	drums.addPhrase(snarePhrase);
	drums.addPhrase(crashPhrase);
	drums.addPhrase(tomPhrase);
    drums.addPhrase("seq", sequence, sPat);

//=========== BPM COUNTER =====================
    bpmCTRL = createSlider(30, 300, 80, 1);
	bpmCTRL.parent("volume");
    bpmCTRL.input( () => {drums.setBPM(bpmCTRL.value())})

	drums.setBPM("80");

    drawMatrix();
}

// ===================HANDLE REVERB=============
function handleReverb(e){
	let event = e.target.parentElement.parentElement.parentElement.id;
	if(e.target.checked === true){
		if(event === "hh"){
			hh.connect(rev);
		}
		if(event === "clap"){
			clap.connect(rev);
		}
		if(event === "bass"){
			bass.connect(rev);
		}
		if(event === "snare"){
			snare.connect(rev);
		}
		if(event === "crash"){
			crash.connect(rev);
		}
		if(event === "tom"){
			tom.connect(rev);
		}		
	}else if(e.target.checked === false){
		if(event === "hh"){
			hh.disconnect();
			hh.connect();
			hhDelay.checked = false;
		}
		if(event === "clap"){
			clap.disconnect();
			clap.connect();
			clapDelay.checked = false;
		}
		if(event === "bass"){
			bass.disconnect();
			bass.connect();
			bassDelay.checked = false;
		}
		if(event === "snare"){
			snare.disconnect();
			snare.connect();
			snareDelay.checked = false;
		}
		if(event === "crash"){
			crash.disconnect();
			crash.connect();
			crashDelay.checked = false;
		}
		if(event === "tom"){
			tom.disconnect();
			tom.connect();
			tomDelay.checked = false;
		}
	}
}

//======================= HANDLE DELAY ============
function handleDelay(e){
	let event = e.target.parentElement.parentElement.parentElement.id;
	if(e.target.checked === true){
		if(event === "hh"){
			hh.connect(del);
		}
		if(event === "clap"){
			clap.connect(del);
		}
		if(event === "bass"){
			bass.connect(del);
		}
		if(event === "snare"){
			snare.connect(del);
		}
		if(event === "crash"){
			crash.connect(del);
		}
		if(event === "tom"){
			tom.connect(del);
		}		
	}else if(e.target.checked === false){
		if(event === "hh"){
			hh.disconnect();
			hh.connect();
			hhRev.checked = false;
		}
		if(event === "clap"){
			clap.disconnect();
			clap.connect();
			clapRev.checked = false;
		}
		if(event === "bass"){
			bass.disconnect();
			bass.connect();
			bassRev.checked = false;
		}
		if(event === "snare"){
			snare.disconnect();
			snare.connect();
			snareRev.checked = false;
		}
		if(event === "crash"){
			crash.disconnect();
			crash.connect();
			crashRev.checked = false;
		}
		if(event === "tom"){
			tom.disconnect();
			tom.connect();
			tomRev.checked = false;
		}
		
	}
}

// ===================== PLAY BUTTON ===============
function playPressed(){
	if(hh.isLoaded() && clap.isLoaded && bass.isLoaded()){
		getAudioContext().resume();
		if(!drums.isPlaying){
			drums.loop()
			console.log("drums are playing")
		} 
	}else{
		console.log("oops, drums are not loaded yet!")
	}
}
// =================== STOP BUTTON =================
function stopPressed(){
	if(drums.isPlaying){
		drums.stop();
		console.log("Loop has stopped");
	}
}

// =================== CANVASE SEQUENCER ==============
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
