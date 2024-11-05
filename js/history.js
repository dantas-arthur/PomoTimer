window.onload = function() {
  // Select the table history
  const sessionList = document.querySelector('.responsive-table');
  let history = JSON.parse(localStorage.getItem('pomodoroHistory')) || [];

  history.forEach((session, index) => {
      // Create a new line item on the table
      let newSessionItem = document.createElement('li');
      newSessionItem.classList.add('table-row');

      // Verify if the session duration is higher than 1 minute
      let minSecDuration = "minuto";
      if (session.duration.startsWith("0:0")) {
        minSecDuration = "segundo";
      } else if (session.duration.startsWith("0")) {
        minSecDuration = "segundos";
      } else if (session.duration !== "1:00") {
        minSecDuration = "minutos";
      } else {
        minSecDuration = "minuto";
      }

      // Adding the session content
      newSessionItem.innerHTML = `
        <div class="col col-1"><img class="delete-item" src="../assets/svg/clear.svg"></div>
        <div class="col col-2">${session.type}</div>
        <div class="col col-3">${session.duration} ${minSecDuration}</div>
        <div class="col col-4">${session.date}</div>
      `;


      // Add click event to remove the session
      const closeBtn = newSessionItem.querySelector('.delete-item');
      const windowWidth = window.innerWidth;
      if (windowWidth <= 610) {
        closeBtn.style.width = "20px";
      } else {
        closeBtn.style.width = "32px";
      }
      closeBtn.style.cursor = "pointer";
      closeBtn.onclick = function() {
        // Remove the session item from the DOM
        sessionList.removeChild(newSessionItem);
        // Remove the session from localStorage
        removeSession(index);
      };

      // Add the new item to the table
      sessionList.appendChild(newSessionItem);
  });
};

// Function to remove a session from localStorage
function removeSession(index) {
  // Retrieve the history from localStorage
  let history = JSON.parse(localStorage.getItem('pomodoroHistory')) || [];

  // Check if the index is valid
  if (index >= 0 && index < history.length) {
    // Remove the session from the history
    history.splice(index, 1);

    // Store the updated history back to localStorage
    localStorage.setItem('pomodoroHistory', JSON.stringify(history));

    console.log(`Sessão na posição ${index} removida com sucesso.`);
  } else {
    console.log("Índice inválido.");
  }
}

// Filter function
const filterBtn = document.getElementById('filter');
const overlay = document.getElementById('popups');
const popup = document.getElementById('filter-popup');
const cancelBtn = document.getElementById('cancel');

// Function to open popup
filterBtn.addEventListener('click', function() {
  overlay.style.display = 'block';
  popup.style.display = 'block';
});

// Function to close popup
cancelBtn.addEventListener('click', function() {
  overlay.style.display = 'none';
  popup.style.display = 'none';
});
