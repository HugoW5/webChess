let cvs = document.getElementById("cvs");
let ctx = cvs.getContext("2d");
let boardSize = 800;
let selectedPiece = {};

renderBoard();
setTimeout(() => {
  renderPieces();
}, 100);

cvs.addEventListener("mousedown", (e) => {
  ctx.clearRect(0, 0, boardSize, boardSize);
  let pos = getSquare(e.offsetX, e.offsetY);
  renderBoard();
  ctx.fillStyle = "#eb4034";
  ctx.fillRect(
    pos.x * (boardSize / 8),
    pos.y * (boardSize / 8),
    boardSize / 8,
    boardSize / 8
  );
  renderPieces();

  let tmpPiece = pieces.find(({ x, y }) => {
    return x === pos.x && y === pos.y;
  });
  if (tmpPiece != undefined) {
    if (pos == tmpPiece.getValidMoves()) {
      
    } else {
      interactWithPiece(tmpPiece);
    }
  }
});

/**
 * @param {Piece} piece
 */
function interactWithPiece(piece) {
  console.log(piece);
  selectedPiece = piece;
  let moves = piece.getValidMoves();
  //show valid moves
  moves.forEach((move) => {
    let middleSquarePos = {
      x: move.x * (boardSize / 8) + boardSize / 8 / 2,
      y: move.y * (boardSize / 8) + boardSize / 8 / 2,
    };
    ctx.beginPath();
    ctx.fillStyle = "#4fc215";
    ctx.arc(
      middleSquarePos.x,
      middleSquarePos.y,
      boardSize / 8 / 4,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });
}

function renderBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let x = i * (boardSize / 8);
      let y = j * (boardSize / 8);

      if ((i + j) % 2 === 0) {
        ctx.fillStyle = "#FFFFFF";
      } else {
        ctx.fillStyle = "#6e6e6e";
      }
      ctx.fillRect(x, y, boardSize / 8, boardSize / 8);
    }
  }
}

/**
 * @param {number} x1
 * @param {number} y1
 * @returns {{x: number, y: number}} - The row and column.
 */
function getSquare(x1, y1) {
  let squareSize = boardSize / 8;
  let x = Math.floor(x1 / squareSize);
  let y = Math.floor(y1 / squareSize);
  return { x, y };
}

function renderPieces() {
  pieces.forEach((piece) => {
    ctx.drawImage(
      piece.image,
      piece.x * (boardSize / 8),
      piece.y * (boardSize / 8),
      boardSize / 8,
      boardSize / 8
    );
  });
}
