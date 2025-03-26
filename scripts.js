/* Logica powered by Alexis */

let value = document.getElementById('score-box');
let tableLong = document.getElementById('h-long');
let tableShort = document.getElementById('h-short');
let totalLong = document.getElementById('total-long');
let totalShort = document.getElementById('total-short');
let teamLeftName = document.getElementById('team-left');
let teamRightName = document.getElementById('team-right');


let longScore = [];
let shortScore = [];

if (localStorage.getItem('longScore') != null && localStorage.getItem('shortScore') != null) {
    loadFromLocalStorage();
}

if (localStorage.getItem('left') != null && localStorage.getItem('right') != null) {
    loadTeamName();
}


function addScore(team) {
    if (value.value >= 99999999) {
        alert('No puedes poner un numero tan grande');
        return;
    }
    let historyValue = document.createElement('span');
    historyValue.textContent = (value.value >= 0) ? '+' + value.value : value.value;
    if (team == 'long' && value.value != '') {
        longScore.push(parseInt(value.value));
        totalLong.textContent = longScore.reduce((a, b) => a + b, 0);
        if (tableLong.hasChildNodes()) {
            tableLong.insertBefore(historyValue, tableLong.firstChild);
        } else {
            tableLong.appendChild(historyValue);
        }
    } else if (team == 'short' && value.value != '') {
        shortScore.push(parseInt(value.value));
        totalShort.textContent = shortScore.reduce((a, b) => a + b, 0);
        if (tableShort.hasChildNodes()) {
            tableShort.insertBefore(historyValue, tableShort.firstChild);
        } else {
            tableShort.appendChild(historyValue);
        }
    }
    saveInLocalStorage();
    value.value = '';
}

function saveInLocalStorage() {
    localStorage.setItem('longScore', JSON.stringify(longScore));
    localStorage.setItem('shortScore', JSON.stringify(shortScore));
}

function loadFromLocalStorage() {
    longScore = JSON.parse(localStorage.getItem('longScore'));
    shortScore = JSON.parse(localStorage.getItem('shortScore'));
    totalLong.textContent = longScore.reduce((a, b) => a + b, 0);
    totalShort.textContent = shortScore.reduce((a, b) => a + b, 0);
    longScore.forEach(score => {
        let historyValue = document.createElement('span');
        historyValue.textContent = (score >= 0) ? '+' + score : score;
        tableLong.appendChild(historyValue);
    });
    shortScore.forEach(score => {
        let historyValue = document.createElement('span');
        historyValue.textContent = (score >= 0) ? '+' + score : score;
        tableShort.appendChild(historyValue);
    });
}

function loadTeamName() {
    teamLeftName.value = window.localStorage.getItem('left');
    teamRightName.value = window.localStorage.getItem('right');
}

function resetScore() {
    longScore = [];
    shortScore = [];
    tableLong.innerHTML = '';
    tableShort.innerHTML = '';
    totalLong.textContent = '0';
    totalShort.textContent = '0';
    localStorage.clear();
}

function saveTeamName(side, teamName) {
    if (side == 'left') {
        window.localStorage.setItem('left', teamName);
    } else if (side == 'right') {
        window.localStorage.setItem('right', teamName);
    } else {
        console.log('Esto no deberia de ocurrir');
    }
}