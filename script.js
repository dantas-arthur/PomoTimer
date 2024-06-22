// Audio variables
var startBells = new Audio("assets/audio/bells-start.wav");
var endBells = new Audio("assets/audio/bells-end.wav");
var pauseBells = new Audio("assets/audio/bells-pause.wav");

// Get HTML elements
var startButton = document.getElementById("start-button");
var session = document.querySelector(".minutes");

var myInterval;
var isPaused = false;
var totalSeconds = 0;

// Timer function
var appTimer = (remainingSeconds = null) => {
    startBells.play();
    startButton.innerText = "Pause";
    
    var sessionAmount = Number.parseInt(session.textContent);
    if (remainingSeconds !== null) {
        totalSeconds = remainingSeconds;
    } else {
        totalSeconds = sessionAmount * 60;
    }

    var updateSeconds = () => {
        var minutesLeft = Math.floor(totalSeconds / 60);
        var secondsLeft = totalSeconds % 60;

        var minutes = document.querySelector(".minutes");
        var seconds = document.querySelector(".seconds");

        if (secondsLeft < 10) {
            seconds.textContent = "0" + secondsLeft;
        } else {
            seconds.textContent = secondsLeft;
        }
        minutes.textContent = `${minutesLeft}`;

        if (totalSeconds === 0) {
            endBells.play();
            clearInterval(myInterval);
            startButton.removeEventListener("click")
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
            startButton.innerText = "Resume";
        } else {
            appTimer(totalSeconds);
            startButton.innerText = "Pause";
        }
    } else {
        appTimer();
    }
});

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
