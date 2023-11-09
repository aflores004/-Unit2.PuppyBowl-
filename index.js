const allPlayersDiv = document.getElementById("allPlayers");
const playerDetailsDiv = document.getElementById("playerDetails");
const backButton = document.getElementById("backButton");
const addPlayerForm = document.getElementById("addPlayerForm");

// Event listener for the back button
backButton.addEventListener("click", () => {
  playerDetailsDiv.style.display = "none";
  allPlayersDiv.style.display = "block";
});

// Function to fetch and render players
async function fetchAndRenderPlayers() {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players"
    );
    const jsonResponse = await response.json();
    renderPlayers(jsonResponse.data.players);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Render the players
function renderPlayers(players) {
  allPlayersDiv.innerHTML = ""; // Clear the player list before re-rendering
  players.forEach((player) => {
    const playerCard = createPlayerCard(player);
    allPlayersDiv.appendChild(playerCard);
  });
}

// Function to create a player card
function createPlayerCard(player) {
  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const img = document.createElement("img");
  img.src = player.imageUrl;
  img.alt = player.name + " Image";
  img.className = "player-img";

  img.addEventListener("click", () => showPlayerDetails(player));

  playerCard.appendChild(img);
  return playerCard;
}

// Function to show player details
function showPlayerDetails(player) {
  allPlayersDiv.style.display = "none";
  playerDetailsDiv.style.display = "block";

  const playerName = document.getElementById("playerName");
  playerName.textContent = player.name;

  const playerBreed = document.getElementById("playerBreed");
  playerBreed.textContent = player.breed;

  const playerStatus = document.getElementById("playerStatus");
  playerStatus.textContent = player.status;

  const playerImg = document.getElementById("playerImg");
  playerImg.src = player.imageUrl;
}
// Function to add a player
async function addPlayerAndRender(player) {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add player");
    }

    const addedPlayer = await response.json();
    renderAddedPlayer(addedPlayer); // Update UI with the new player
    console.log("Player added:", addedPlayer);
    // Clear the form after adding the player
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to render the newly added player
function renderAddedPlayer(addedPlayer) {
  const playerCard = createPlayerCard(addedPlayer);
  allPlayersDiv.appendChild(playerCard);
}

addPlayerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const breed = document.getElementById("breed").value;
  const status = document.getElementById("status").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const player = { name, breed, status, imageUrl };
  addPlayerAndRender(player);
});

function createPlayerCard(player) {
  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const playerName = document.createElement("p");
  playerName.textContent = player.name;

  playerCard.appendChild(img);
  playerCard.appendChild(playerName);

  addClickEvent(playerCard, player); // Add click event to the player card

  return playerCard;
}

async function fetchAndRenderPlayers() {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players"
    );
    const jsonResponse = await response.json();
    renderPlayers(jsonResponse.data.players);
  } catch (error) {
    console.error("Error:", error);
  }
}

function addClickEvent(playerCard, player) {
  playerCard.addEventListener("click", () => {
    playerDetailsDiv.style.display = "block";
    allPlayersDiv.style.display = "none";

    const playerName = document.getElementById("playerName");
    playerName.textContent = "Name: " + player.name;

    const playerBreed = document.getElementById("playerBreed");
    playerBreed.textContent = "Breed: " + player.breed;

    const playerStatus = document.getElementById("playerStatus");
    playerStatus.textContent = "Status: " + player.status;

    const playerImg = document.getElementById("playerImg");
    playerImg.src = player.imageUrl;
  });
}

// Function to create player cards
function createPlayerCard(player) {
  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const img = document.createElement("img");
  img.src = player.imageUrl;
  img.alt = player.name + " Image";
  img.className = "player-img";

  const playerName = document.createElement("p");
  playerName.textContent = player.name;

  playerCard.appendChild(img);
  playerCard.appendChild(playerName);

  addClickEvent(playerCard, player); // Add click event to the player card

  return playerCard;
}

// Function to render the players
function renderPlayers(players) {
  allPlayersDiv.innerHTML = ""; // Clear the player list before re-rendering
  players.forEach((player) => {
    const playerCard = createPlayerCard(player);
    allPlayersDiv.appendChild(playerCard);
  });
}

// Function to add only new players to the existing list
function addNewPlayers(updatedPlayers) {
  const allPlayersDiv = document.getElementById("allPlayers");
  const currentPlayers = allPlayersDiv.querySelectorAll(".player-card");
  const existingPlayerNames = Array.from(currentPlayers).map(
    (player) => player.querySelector("p").textContent
  );

  updatedPlayers.forEach((player) => {
    if (!existingPlayerNames.includes(player.name)) {
      const playerCard = createPlayerCard(player);
      allPlayersDiv.appendChild(playerCard);
    }
  });
}

// Function to periodically update the player list and add new players
async function updatePlayers() {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players"
    );
    const jsonResponse = await response.json();
    const updatedPlayers = jsonResponse.data.players;

    addNewPlayers(updatedPlayers); // Add new players to the existing list
  } catch (error) {
    console.error("Error:", error);
  }
}

// Set interval to update the players periodically
setInterval(updatePlayers, 5000); // Update every 5 seconds

async function deletePlayerById() {
  const playerId = document.getElementById("deletePlayerId").value;

  if (!playerId) {
    console.error("Please enter a valid player ID.");
    return;
  }

  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players/${playerId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("Player with ID", playerId, "deleted successfully");
      // Perform additional actions after successful deletion if needed
    } else {
      console.error("Failed to delete player with ID", playerId);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initial render
updatePlayers();
