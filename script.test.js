const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");
// Test for `fetchAllPlayers`
describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
    
  });

  test("returns an array", async () => {
    expect(Array.isArray(players.players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe("fetchSinglePlayer", () => {
  let player;
  const testPlayerId = 14868; // new player

  beforeAll(async () => {
    player = await 
    fetchSinglePlayer(testPlayerId);
    console.log(player);
  });

test("returns an object", async () => {
  expect(typeof player).toBe('object');
});

test("returns players with name and id", async () => {
      expect(player.player).toHaveProperty("name");
      expect(player.player).toHaveProperty("id");
    });
});
// TODO: Tests for `addNewPlayer`
describe("addNewPlayer", () => {
  let newPlayer;
  const playerData = { name: "New Player" , breed:"Husky" };

  beforeAll(async () => {
    newPlayer = await addNewPlayer(playerData);
  });

test("returns an object", async () => {
  expect(typeof newPlayer).toBe('object');
});

test("returns players by name and id", async () => {
      expect(newPlayer.newPlayer).toHaveProperty("name");
      expect(newPlayer.newPlayer).toHaveProperty("id");
    });
});
// (Optional) TODO: Tests for `removePlayer`
describe("removePlayer", () =>{
  let removalStatus;
  const testPlayerId = 15296;

  beforeAll(async () => {
    removalStatus = await removePlayer(testPlayerId);
  });

test("successfully removed a player", async () => {
    expect(removalStatus).toBe(null);
  });
});