let pieces = [];

class Piece {
  /**
   * @param {number} x Piece row position
   * @param {number} y Piece col position
   * @param {string} name Piece name
   * @param {HTMLImageElement} image Piece SVG Image Element
   * @param {string} color Piece color
   */
  constructor(x, y, name, image, color) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.x = x;
    this.y = y;
  }
}
// #region Add pieces
let whitePawnImage = new Image();
whitePawnImage.src = "./pieces/pawn-w.svg";
for (let i = 0; i < 8; i++) {
  pieces.push(new Piece(i, 6, "Pawn", whitePawnImage, "white"));
}
let blackPawnImage = new Image();
blackPawnImage.src = "./pieces/pawn-b.svg";
for (let i = 0; i < 8; i++) {
  pieces.push(new Piece(i, 1, "Pawn", blackPawnImage, "black"));
}
let whiteRookImage = new Image();
whiteRookImage.src = "./pieces/rook-w.svg";
pieces.push(new Piece(0, 7, "Rook", whiteRookImage, "white"));
pieces.push(new Piece(7, 7, "Rook", whiteRookImage, "white"));
let blackRookImage = new Image();

blackRookImage.src = "./pieces/rook-b.svg";
pieces.push(new Piece(0, 0, "Rook", blackRookImage, "black"));
pieces.push(new Piece(7, 0, "Rook", blackRookImage, "black"));

let whiteKnightImage = new Image();
whiteKnightImage.src = "./pieces/knight-w.svg";
pieces.push(new Piece(1, 7, "Knight", whiteKnightImage, "white"));
pieces.push(new Piece(6, 7, "Kngiht", whiteKnightImage, "white"));

let blackKnightImage = new Image();
blackKnightImage.src = "./pieces/knight-b.svg";
pieces.push(new Piece(1, 0, "Knight", blackKnightImage, "black"));
pieces.push(new Piece(6, 0, "Kngiht", blackKnightImage, "black"));

let whiteBishopImage = new Image();
whiteBishopImage.src = "./pieces/bishop-w.svg";
pieces.push(new Piece(2, 7, "Bishop", whiteBishopImage, "white"));
pieces.push(new Piece(5, 7, "Bishop", whiteBishopImage, "white"));

let blackBishopImage = new Image();
blackBishopImage.src = "./pieces/bishop-b.svg";
pieces.push(new Piece(2, 0, "Bishop", blackBishopImage, "black"));
pieces.push(new Piece(5, 0, "Bishop", blackBishopImage, "black"));

let whiteQueenImage = new Image();
whiteQueenImage.src = "./pieces/queen-w.svg";
pieces.push(new Piece(3, 7, "Queen", whiteQueenImage, "white"));

let blackQueenImage = new Image();
blackQueenImage.src = "./pieces/queen-b.svg";
pieces.push(new Piece(3, 0, "Queen", blackQueenImage, "black"));

let whiteKingImage = new Image();
whiteKingImage.src = "./pieces/king-w.svg";
pieces.push(new Piece(4, 7, "King", whiteKingImage, "white"));

let blackKingImage = new Image();
blackKingImage.src = "./pieces/king-b.svg";
pieces.push(new Piece(4, 0, "King", blackKingImage, "black"));

// #endregion
