'use strict'


var seconds = 0
var tens = 0
var elTens = document.getElementById('tens')
var elSeconds = document.getElementById('seconds')
var timer, startedTime

function startTimer() {
    clearInterval(timer)
    startedTime = Date.now()
    timer = setInterval(timerInit, 1)
}

function stopTimer() {
    clearInterval(timer)
    let timeElaps = elSeconds.innerText + '.'
    timeElaps += elTens.innerText
    return timeElaps
}

function resetTimer() {
    clearInterval(timer)
    startedTime = 0
    seconds = '00'
    tens = '000'
    elTens.innerHTML = tens
    elSeconds.innerHTML = seconds
}

function timerInit() {
    tens = Date.now() - startedTime

    if (tens <= 9) {
        elTens.innerHTML = '00' + tens
    } else if (tens > 9 && tens <= 99) {
        elTens.innerHTML = '0' + tens
    } else if (tens > 99 && tens <= 999) {
        elTens.innerHTML = tens
    } else {
        startedTime = Date.now()
        seconds++
        elSeconds.innerHTML = '0' + seconds
        elTens.innerHTML = '000'
    }

    if (seconds > 9) {
        elSeconds.innerHTML = seconds
    }
}
