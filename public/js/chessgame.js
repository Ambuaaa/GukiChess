const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");
let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";
  board.forEach((row, rowindex) => {
    row.forEach((square, squareindex) => {
      const squareElement = document.createElement("div");
      squareElement.classList.add(
        "square",
        (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
      );
      squareElement.dataset.row = rowindex;
      squareElement.dataset.col = squareindex;
      if (square) {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add(
          "piece",
          square.color === "w" ? "white" : "black" ,  square.color === "w" && square.type=== "p" && "pawn-piece" 
        );
  
        pieceElement.innerText = getPieceUnicode(square); 
        console.log("unicode " , " " ,pieceElement.innerText);
        
        pieceElement.draggable = playerRole === square.color;
        pieceElement.addEventListener("dragstart", (e) => {
          if (pieceElement.draggable) {
            draggedPiece = pieceElement;
            sourceSquare = { row: rowindex, col: squareindex };
            e.dataTransfer.setData("text/plain", "");
          }
        });
        pieceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });
        squareElement.appendChild(pieceElement);
      } // end if (square)
      // dragover listener
      squareElement.addEventListener("dragover", function(e) {
        e.preventDefault();
      });
      // drop listener
      squareElement.addEventListener("drop", function(e) {
        e.preventDefault();
        if (draggedPiece) {
          const targetSource = {
            row: parseInt(squareElement.dataset.row),
            col: parseInt(squareElement.dataset.col),
          };
          handleMove(sourceSquare, targetSource);
        }
      });
      boardElement.appendChild(squareElement);
    }); // end row.forEach
  }); // end board.forEach
  // Only flip board for black player
  if (playerRole === "b") {
    boardElement.classList.add("flipped");
  } else {
    boardElement.classList.remove("flipped");
  }
}; // end renderBoard

const handleMove = (source, target) => {
  const move = {
    from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: 'q', // Back to queen promotion for normal chess
  };
  socket.emit("move", move); 
};

const getPieceUnicode = (piece) => {
  const unicodePieces = {
    // Black pieces (solid/filled symbols)
    p: "♟", // black pawn -> solid
    r: "♜", // black rook -> solid  
    n: "♞", // black knight -> solid
    b: "♝", // black bishop -> solid
    q: "♛", // black queen -> solid
    k: "♚", // black king -> solid
    
    // White pieces (outlined/hollow symbols)  
    P: "♙", // white pawn -> hollow
    R: "♖", // white rook -> hollow
    N: "♘", // white knight -> hollow
    B: "♗", // white bishop -> hollow
    Q: "♕", // white queen -> hollow
    K: "♔", // white king -> hollow
  };
  return unicodePieces[piece.type] || "";
};

// alert
const checkGameEnd = () => {
  if (chess.in_checkmate && chess.in_checkmate()) {
    const winner = chess.turn() === 'w' ? 'Black' : 'White';
    alert(`${winner} wins by checkmate!`);
  } else if (chess.in_draw && chess.in_draw()) {
    if (chess.in_stalemate && chess.in_stalemate()) {
      alert('Game ended in a draw by stalemate!');
    } else if (chess.insufficient_material && chess.insufficient_material()) {
      alert('Game ended in a draw by insufficient material!');
    } else if (chess.in_threefold_repetition && chess.in_threefold_repetition()) {
      alert('Game ended in a draw by threefold repetition!');
    } else {
      alert('Game ended in a draw!');
    }
  }
};

// Set playerRole to white for testing
playerRole = "w";

socket.on("playerRole", function(role) {
  playerRole = role;
  renderBoard();
});

socket.on("spectatorRole", function() {
  playerRole = null;
  renderBoard();
});

socket.on("boardState", function(fen) {
  chess.load(fen);
  renderBoard();
  checkGameEnd() ;
});

socket.on("move", function(move) {
  chess.move(move);
  renderBoard();
  checkGameEnd() ;

});



renderBoard();