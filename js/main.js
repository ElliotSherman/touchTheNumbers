'use strict'
//global vars
var gIsGameOver = false
var gDifficulty = [16, 25, 36]
var gSelectedDifficulty = gDifficulty[0]
var gNextNumToBeClicked = 1
var gElapsedTime = 0
// elements
var elBoard = document.querySelector('.board')
var elDifficultySelect = document.querySelector('.difficulty-select')
var elNextNumToBeClicked = document.querySelector('.next-num span')
var elElapsedTime = document.querySelector('.time span')

elNextNumToBeClicked.innerText = gNextNumToBeClicked

function init() {
    genreateArray(gSelectedDifficulty)
    elBoard.innerHTML = generateBoard(gSelectedDifficulty)
    gNextNumToBeClicked = 1
    elNextNumToBeClicked.innerText = gNextNumToBeClicked
    gIsGameOver = false
}

elDifficultySelect.innerHTML = generateDifficultyBtns(gDifficulty)

function reset() {
    init()
}

function handleCellClick(elCell) {

    var clickedCell = +elCell.getAttribute('data-cell')
    if (clickedCell === gNextNumToBeClicked) {
        gNextNumToBeClicked++
        elNextNumToBeClicked.innerText = gNextNumToBeClicked
        elCell.classList.add('board-cell-clicked')
    }
    if (gNextNumToBeClicked === gSelectedDifficulty + 1) {
        gIsGameOver = true
        intervalId = 0
        elNextNumToBeClicked.innerText = 'well done'
    }
}

function changeDifficulty(elLevelBtn) {
    var selectedLevel = elLevelBtn.getAttribute('data-level') // getr value of data-level
    for (var i = 0; i < gDifficulty.length; i++) { // loop through the buttons and set class and gSelectedDifficulty
        var selector = `[data-level="${[i]}"]`
        var elLevelBtn = document.querySelector(selector)
        if (+selectedLevel === i) {
            elLevelBtn.classList.add('difficulty-selected')
            gSelectedDifficulty = gDifficulty[i]
        } else {
            elLevelBtn.classList.remove('difficulty-selected')
        }
    }
    init()
}

function generateDifficultyBtns(gDifficultyLevels) {
    var strDiffBtns = ''
    for (var i = 0; i < gDifficultyLevels.length; i++) {
        if (i === 0) {
            strDiffBtns += `\t<td data-level="${[i]}" onclick="changeDifficulty(this)" class="difficulty-selected">${gDifficulty[i]}</td>\n`
        } else
            strDiffBtns += `\t<td data-level="${[i]}" onclick="changeDifficulty(this)">${gDifficulty[i]}</td>\n`
    }
    return strDiffBtns
}

function generateBoard(cells) {
    var nums = genreateArray(gSelectedDifficulty)
    var strTable = `<tbody>`
    for (var i = 0; i < cells ** 0.5; i++) {
        strTable += `<tr class="board-row">\n`
        for (var j = 0; j < cells ** 0.5; j++) {
            var num = nums.pop()
            strTable += `<td class="board-cell" data-cell=${num} onclick='handleCellClick(this)'>\n ${num} </td>\n`
            num++
        }
        strTable += `</tr>\n`
    }
    strTable += `</tbody>`
    return strTable
}

function genreateArray(gSelectedDifficulty){
    var shuffleNums = []
    var tempIdx;
    for(var i = 0 ; i< gSelectedDifficulty; i++){
        shuffleNums[i] = i+1
    }
    // console.log(shuffleNums);
    for (let i = shuffleNums.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        tempIdx = shuffleNums[i];
        shuffleNums[i] = shuffleNums[rand];
        shuffleNums[rand] = tempIdx;
    }
    return shuffleNums;
}

function shuffle(array){
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldElement = array[i];
        array[i] = array[rand];
        array[rand] = oldElement;
    }
    return array;
} 

