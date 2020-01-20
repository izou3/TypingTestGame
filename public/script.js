'use strict';

const textToCopy = document.querySelector(".requiredText p");
const counter = document.querySelector(".counter");
const submitButton = document.querySelector(".operations .start"); ;

const clock = document.querySelector(".timer a");
const textarea = document.querySelector(".textbox textarea");
var mistakeCounter = document.querySelector(".timer p");
var timerRunning = false;
var interval;
var timer = ["00", "00", "00", "00"];
var numMistake = 0;

if (submitButton) {
    submitButton.addEventListener("click", function() {

        if(submitButton.innerHTML == "Start") {
            let buttonDisable = document.createAttribute("disabled");
            buttonDisable.value = "";
            submitButton.setAttributeNode(buttonDisable); 
        }
    
        counter.classList.remove("hidden");
    
        const count = (seconds) => {
            return new Promise((resolve) => {
                setTimeout(() => resolve(counter.innerHTML=seconds), 1000);
            })
        }
    
        if(submitButton.innerHTML=="Start") {
            const countdown = (async() => {
                for(let i = 3; i > -1; i--) {
                    await count(i);
                }
    
                counter.innerHTML = "Go!";
                textarea.removeAttribute("disabled");
                start();
            })();
        } else {
            reset();
        }
    
    }, false);
}


function start() {
    if (!timerRunning) {
        timerRunning = true;
        submitButton.innerHTML = "Reset";
        counter.classList.add("hidden");
        counter.innerHTML = "3";
        submitButton.removeAttribute("disabled");
        interval = setInterval(runTimer, 10);
    }
}


function runTimer(){
    let currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`;
    clock.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

    mistakeCounter.innerHTML = numMistake;
  }

function leadingZero(time) {
    if (time <= 9) {
      time = "0" + time;
    }
    return time;
}

function reset() {
    let textDisable = document.createAttribute("disabled");
    textDisable.value = "";
    textarea.setAttributeNode(textDisable);

    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    numMistake = 0;
    mistakeCounter.innerHTML = 0; ;

    textarea.value = "";
    clock.innerHTML = "00:00:00";
    submitButton.innerHTML = "Start";
    textarea.style.borderColor = "black";
    counter.classList.add("hidden");
}

textarea.addEventListener("keyup", function() {
    let textEntered = textarea.value;
    let currentTextMatch = textToCopy.innerHTML.substring(0, textEntered.length);

    if(textEntered == textToCopy.innerHTML) {
        clearInterval(interval);
        timerRunning = true;
    } else {
        if(textEntered == currentTextMatch) {
            textarea.style.borderColor = "#00b300";
        } else {
            textarea.style.borderColor = "#F05837";
            numMistake ++;
        }
    }

}, false);
