import Game from "./models/game.js";

let GAME_LIST = {};

export function createGame(socket, roomName) {
  roomName = roomName.trim();

  if (GAME_LIST[roomName]) {
    socket.emit("createResponse", {
      success: false,
      msg: "Room Already Exists",
    });
  } else {
    if (roomName === "") {
      socket.emit("createResponse", {
        success: false,
        msg: "Enter A Valid Room Name",
      });
    } else {
      GAME_LIST[roomName] = new Game(roomName, "pass");
      socket.emit("createResponse", { success: true, msg: "" });
    }
  }
}

// function createPlayer(socket, playerName) {
//   if (userName === "") {
//     socket.emit("createResponse", {
//       success: false,
//       msg: "Enter A Valid Nickname",
//     });
//   } else {
//     let room = GAME_LIST[roomName];

//     let player = new Player(userName, roomName, socket);
//     room.players[player.id] = player;
//     player.joinTeam();
//   }
// }

// // When a player joins a room, evenly distribute them to a team
// function joinTeam() {
//   let numInRoom = Object.keys(GAME_LIST[this.room].players).length;
//   if (numInRoom % 2 === 0) this.team = "blue";
//   else this.team = "red";
// }

// function gameUpdate(room) {
//   let gameState = {
//     room: room,
//     players: ROOM_LIST[room].players,
//     game: ROOM_LIST[room].game,
//     difficulty: ROOM_LIST[room].difficulty,
//     mode: ROOM_LIST[room].mode,
//   };
//   for (let player in ROOM_LIST[room].players) {
//     gameState.team = PLAYER_LIST[player].team;
//     SOCKET_LIST[player].emit("gameState", gameState);
//   }
// }
