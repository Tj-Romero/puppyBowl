// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2311-fsa-et-web-ft-sf";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(`${API_URL}`);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Uh oh, trouble fetching players!", error);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${playerId}`);
    const result = await response.json();
    console.log(result);
    renderSinglePlayer(result)

  } catch (error) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, error);
  }

};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}`, {
      method: "POST", // to specipty the method as POST
      headers: {
        "Content-Type": "application/json", // setting content type to JSON
      },
      body: JSON.stringify(playerObj), // converting the player obj to a JSON string
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Oops, something went wrong with adding that player!", error);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */

const removePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/${playerId}`, {
      method: "DELETE", // to use DELETE method
    });
    init();
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      error
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  const main = document.querySelector("main");
  main.innerHTML = ""; // to clear current content

  if (playerList.length === 0) {
    main.innerHTML = "<p> NO players available.</p>";
    return;
  }

  playerList.players.forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";
    playerCard.innerHTML = `
    <h2>${player.name}</h2>
    <p>ID:${player.id}</p>
    <img url="${player.image}" alt="${player.name}"/>
    <button onclick='renderSinglePlayer(${player.id})'>See details</button>
    <button onclick="removePlayer(${player.id})">Remove from the roster</button>
    `;
    main.appendChild(playerCard);
  });
  
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => { 
  // TODO
  const main = document.querySelector("main");
  main.innerHTML = `
    <div className="player-card">
      <h2>${player.name}</h2>
      <p>ID: ${player.id}</p>
      <p>Breed: ${player.breed}</p>
      <img src="${player.image}" alt="${player.name}"/>
      <p>Team: ${player.teamName || "Unassigned"}</p>
      <button onClick="init()">Back to all players</button>
    </div>
  `;
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
    const main = document.querySelector("main");
    const form = document.createElement("form");
    form.id = "new-player-form";
    form.innerHTML = `
    <input type="text" name="name" placeholder="Name" required />
    <input type="text" name="breed" placeholder="Breed" />
    <input type="text" name="team" placeholder="Team" />
    <button type="submit">Add New Player</button>
    `;
    form.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      await addNewPlayer(Object.fromEntries(formData));
      const players = await fetchAllPlayers();
      renderAllPlayers(players); // render the updated player list
    };
    main.appendChild(form);
  } catch (error) {
    console.error("Uh oh, trouble rendering the new player form!", error);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
