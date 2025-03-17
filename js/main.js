// Audio variables
var startBells = new Audio("assets/audio/bells-start.wav");
var endBells = new Audio("assets/audio/bells-end.wav");
var pauseBells = new Audio("assets/audio/bells-pause.wav");

// Get HTML elements
var startButton = document.getElementById("start-button");
var shortPause = document.getElementById("short-pause");
var longPause = document.getElementById("long-pause");
var session = document.querySelector(".minutes");

let myInterval;
let isPaused = false;
var totalSeconds = 0;

// Função para salvar o histórico
function saveSessionData(type, minutes, seconds) {
  let sessionData = {
      type: type,
      duration: `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`,
      date: new Date().toLocaleString()
  };

  // Recuperar histórico existente
  let history = JSON.parse(localStorage.getItem('pomodoroHistory')) || [];

  // Adicionar nova sessão ao histórico
  history.push(sessionData);

  // Atualizar localStorage
  localStorage.setItem('pomodoroHistory', JSON.stringify(history));
}
4
// Timer function
var appTimer = (remainingSeconds = null) => {
  startBells.play();
  startButton.innerText = "Pausar";
  
  var minutesInput = document.querySelector('.minutes');
  var secondsInput = document.querySelector('.seconds');
  var minutesAmount, secondsAmount;

  if (!isNaN(minutesInput.value) && minutesInput.value.trim() !== "") {
      minutesAmount = parseInt(minutesInput.value, 10);
  } else {
      minutesAmount = parseInt(minutesInput.placeholder, 10);
  }

  if (!isNaN(secondsInput.value) && secondsInput.value.trim() !== "") {
      secondsAmount = parseInt(secondsInput.value, 10);
  } else {
      secondsAmount = 0;
  }

  if (remainingSeconds !== null) {
      totalSeconds = remainingSeconds;
  } else {
      totalSeconds = minutesAmount * 60 + secondsAmount;
  }

  var updateSeconds = () => {
      var minutesLeft = Math.floor(totalSeconds / 60);
      var secondsLeft = totalSeconds % 60;

      minutesInput.value = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
      secondsInput.value = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

      if (totalSeconds === 0) {
          endBells.play();
          clearInterval(myInterval);
          startButton.innerText = "Iniciar";
          saveSessionData("Pomodoro", minutesAmount, secondsAmount);
      }
      totalSeconds--;
      document.title = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')} | PomoTimer`;
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
    saveSessionData("Pausa curta", 5, 0)
})

longPause.addEventListener("click", () => {
    clearInterval(myInterval);
    appTimer(15 * 60);
    saveSessionData("Pausa longa", 15, 0)
})

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByClassName("list-item");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
34
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.getElementById("todo-list");
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("todo-input").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Preencha o campo adequadamente.");
  } else {
    document.getElementById("todo-list").appendChild(li);
  }
  document.getElementById("todo-input").value = "";
  
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

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
            expand.src = "assets/svg/expand-down.svg"
        } else {
            content.style.display = "block";
            expand.src = "assets/svg/expand-up.svg"
        }
    });
}

