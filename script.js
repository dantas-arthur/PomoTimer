// Audio variables
var startBells = new Audio("assets/audio/bells-start.wav");
var endBells = new Audio("assets/audio/bells-end.wav");
var pauseBells = new Audio("assets/audio/bells-pause.wav");

// Get HTML elements
var startButton = document.getElementById("start-button");
var shortPause = document.getElementById("short-pause");
var longPause = document.getElementById("long-pause");
var session = document.querySelector(".minutes");

var myInterval;
var isPaused = false;
var totalSeconds = 0;

// Timer function
var appTimer = (remainingSeconds = null) => {
    startBells.play();
    startButton.innerText = "Pausar";
    
    // Seleciona os inputs de minutos e segundos
    var minutesInput = document.querySelector('.minutes');
    var secondsInput = document.querySelector('.seconds');
    var sessionAmount;

    if (!isNaN(minutesInput.value) && minutesInput.value.trim() !== "") {
        sessionAmount = parseInt(minutesInput.value, 10);
    } else {
        sessionAmount = parseInt(minutesInput.placeholder, 10);
    }

    if (remainingSeconds !== null) {
        totalSeconds = remainingSeconds;
    } else {
        totalSeconds = sessionAmount * 60;
    }

    var updateSeconds = () => {
        var minutesLeft = Math.floor(totalSeconds / 60);
        var secondsLeft = totalSeconds % 60;

        // Atualiza os inputs de minutos e segundos
        minutesInput.value = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
        secondsInput.value = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

        if (totalSeconds === 0) {
            endBells.play();
            clearInterval(myInterval);
            startButton.removeEventListener("click");
        }
        totalSeconds--;
    };

    updateSeconds();
    myInterval = setInterval(updateSeconds, 1000);
};

// Event listener for startButton
startButton.addEventListener("click", () => {
    if (totalSeconds > 0) {
        isPaused = !isPaused;
        if (isPaused) {
            pauseBells.play();
            clearInterval(myInterval);
            startButton.innerText = "Resumir";
            startButton.style.width = "35%";
        } else {
            appTimer(totalSeconds);
            startButton.innerText = "Pausar";
            startButton.style.width = "30%";
        }
    } else {
        appTimer();
    }
});

// Short and long pause functions
shortPause.addEventListener("click", () => {
    clearInterval(myInterval);
    appTimer(5 * 60);
})

longPause.addEventListener("click", () => {
    clearInterval(myInterval);
    appTimer(15 * 60);
})

// Expansive content function

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        var expand = this.querySelector(".expand");
        if(content.style.display === "block") {
            content.style.display = "none";
            expand.src = "assets/SVG/expand-down.svg"
        } else {
            content.style.display = "block";
            expand.src = "assets/SVG/expand-up.svg"
        }
    });
}
