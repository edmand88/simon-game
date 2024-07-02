let sequence = [];
var ind = 0;
var sequenceLength = 1;
var curr = 0;
let allCorrect = true;
const colors = new Map([
    [0, 'green'],
    [1, 'red'],
    [2, 'yellow'],
    [3, 'blue']
]);

const startGame = () => {
    document.getElementById('green').disabled = true;
    document.getElementById('red').disabled = true;
    document.getElementById('yellow').disabled = true;
    document.getElementById('blue').disabled = true;

    document.getElementById("game").style.display = "block";
    document.getElementById("quitButtonContainer").style.display = "block";
    document.getElementById("playButtonContainer").style.display = "none";

    setTimeout(() => {
        displayColor();
    }, 500);
}

const quitGame = () => {
    location.reload();
}

const playSound = (soundID) => { //play sound immediately after button is pressed
    let audio = document.getElementById(soundID);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

const getCurrLevel = () => {
    return sequenceLength;
}

const updateLevel = () => {
    var currLevelElement = document.getElementById("currLevel");
    
    if (currLevelElement) {
        currLevelElement.innerHTML = getCurrLevel();
    }
}

setInterval(updateLevel, 20); //update current level every 20 ms

const getHighestScore = () => {
    return localStorage.getItem('highestScore') || 0;
}

const updateHighestScore = () => {
    let highestScore = getHighestScore();
    if ((sequenceLength-1) > highestScore) {
        localStorage.setItem('highestScore', (sequenceLength-1));
    }
    document.getElementById("highScore").innerHTML = getHighestScore();
}

setInterval(updateHighestScore, 500); //update current level every 500 ms

const generateColor = () => {
    sequence[curr] = Math.floor(Math.random() * 4);
    curr++;
}

const resetColors = () => {
    document.getElementById("green").style.backgroundColor = "";
    document.getElementById("red").style.backgroundColor = "";
    document.getElementById("yellow").style.backgroundColor = "";
    document.getElementById("blue").style.backgroundColor = "";

    document.getElementById("green").style.border = "";
    document.getElementById("red").style.border = "";
    document.getElementById("yellow").style.border = "";
    document.getElementById("blue").style.border = "";
}

const displayColor = () => {
        generateColor();
        for (let i = 0; i < sequenceLength; i++) {
            ((i) => {
                setTimeout(() => {
                    resetColors();
                    setTimeout(() => {
                        if (sequence[i] === 0) {
                            document.getElementById("green").style.backgroundColor = "#00ff00";
                            document.getElementById("green").style.border = '5px outset black';
                            playSound("audioGreen");
                        } else if (sequence[i] === 1) {
                            document.getElementById("red").style.backgroundColor = "red";
                            document.getElementById("red").style.border = '5px outset black';
                            playSound("audioRed");
                        } else if (sequence[i] === 2) {
                            document.getElementById("yellow").style.backgroundColor = "yellow";
                            document.getElementById("yellow").style.border = '5px outset black';
                            playSound("audioYellow");
                        } else if (sequence[i] === 3) {
                            document.getElementById("blue").style.backgroundColor = "blue";
                            document.getElementById("blue").style.border = '5px outset black';
                            playSound("audioBlue");
                        }
                    }, 250);
                }, i * 750);
            })(i);
        }

    setTimeout(() => {
        resetColors();
        document.getElementById('green').disabled = false;
        document.getElementById('red').disabled = false;
        document.getElementById('yellow').disabled = false;
        document.getElementById('blue').disabled = false;
    }, sequence.length * 750);
}

const clickedSequence = (ID) => {
    if(ID === 0){
        playSound("audioGreen");
    }

    if(ID === 1){
        playSound("audioRed");
    }

    if(ID === 2){
        playSound("audioYellow");
    }

    if(ID === 3){
        playSound("audioBlue");
    }

    if (ind < sequenceLength) {
        if(ID != sequence[ind]){
            allCorrect = false;
            window.alert("Wrong!! The color should be " + colors.get(sequence[ind]) + ".");
            if(sequenceLength > 1){
                window.alert("You reached a score of " + (sequenceLength - 1) + ".");
            }
            location.reload();
        }
        ind++;
    }

    if (ind === sequenceLength && allCorrect) {
        document.getElementById('green').disabled = true;
        document.getElementById('red').disabled = true;
        document.getElementById('yellow').disabled = true;
        document.getElementById('blue').disabled = true;
        
        setTimeout(function() {
            ind = 0;
            sequenceLength++;
            displayColor();
        }, 1000);
    }    
}
