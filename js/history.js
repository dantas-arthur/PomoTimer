// Função para carregar e exibir os dados salvos no localStorage
function loadSessionData() {
    // Recupera os dados das sessões do localStorage
    let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
  
    // Seleciona o corpo da tabela onde os dados serão inseridos
    var sessionTableBody = document.getElementById("session-table-body");
  
    // Limpa o conteúdo atual da tabela para evitar duplicações
    sessionTableBody.innerHTML = "";
  
    // Itera sobre as sessões e cria uma linha para cada uma
    sessions.forEach(session => {
      let row = document.createElement("tr");
  
      // Cria células para cada dado da sessão
      let dateCell = document.createElement("td");
      dateCell.textContent = session.date;
      row.appendChild(dateCell);
  
      let typeCell = document.createElement("td");
      typeCell.textContent = session.type;
      row.appendChild(typeCell);
  
      let durationCell = document.createElement("td");
      durationCell.textContent = session.duration;
      row.appendChild(durationCell);
  
      let breakTimeCell = document.createElement("td");
      breakTimeCell.textContent = session.breakTime;
      row.appendChild(breakTimeCell);
  
      // Adiciona a linha à tabela
      sessionTableBody.appendChild(row);
    });
  }
  
  // Função para alternar a visibilidade da área de histórico
  function toggleHistoryDisplay() {
    var historyContainer = document.getElementById("session-history");
    if (historyContainer.style.display === "none") {
      loadSessionData(); // Carrega os dados ao abrir o histórico
      historyContainer.style.display = "block";
    } else {
      historyContainer.style.display = "none";
    }
  }
  
  // Event listener para o botão de mostrar histórico
  var showHistoryButton = document.getElementById("show-history");
  showHistoryButton.addEventListener("click", toggleHistoryDisplay);