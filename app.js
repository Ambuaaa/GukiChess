const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js"); 
const path = require("path");

const app = express();

const server = http.createServer(app); // linked the http server and express server
const io = socket(server); // gave all functionality of socket in io

const chess = new Chess();
let players = {};
let currentPlayer = "w";

app.set("view engine", "ejs"); // can use ejs
app.use(express.static(path.join(__dirname, "public"))); // can use static files

app.get("/", (req, res) => {
  res.render("index", { title: "Welcome to Chess Game" });
});

// socket
io.on("connection", function(uniquesocket) {
  console.log("connected");
  
  if (!players.white) {
    players.white = uniquesocket.id; // every socket has an unique id . Hence if you come first and saw that there are no players of white(!players.white) field = you take white and created the white field
    uniquesocket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = uniquesocket.id;
    uniquesocket.emit("playerRole", "b");
  } else {
    uniquesocket.emit("spectatorRole");
  }

  uniquesocket.on("disconnect", function() {
    if (uniquesocket.id === players.white) {
      delete players.white;
    } else if (uniquesocket.id === players.black) {
      delete players.black;
    }
  });

  uniquesocket.on("move", (move) => {
    try {
      // players moving in right direction 
      if (chess.turn() === "w" && uniquesocket.id !== players.white) return;
      if (chess.turn() === "b" && uniquesocket.id !== players.black) return;

      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid move:", move);
        uniquesocket.emit("invalidMove", move);
      }
    } catch (err) {
      console.log(err);
      uniquesocket.emit("invalidMove", move);
    }
  });
});

server.listen(3000, function() {
  console.log("listening on port 3000");
});