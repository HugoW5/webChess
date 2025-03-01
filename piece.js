let pieces = [];
class Piece {
  constructor(x, y, name, image, color) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.x = x;
    this.y = y;
  }

  /**
   * Returns an array of valid moves for the current piece.
   * @returns {Array<{x: number, y: number}>}
   */
  getValidMoves() {
    let validMoves = [];

    if (this.name === "Pawn") {
      this.#getPawnMoves(validMoves);
    } else if (this.name === "Rook") {
      this.#getRookMoves(validMoves);
    } else if (this.name === "Knight") {
      this.#getKnightMoves(validMoves);
    } else if (this.name === "Bishop") {
      this.#getBishopMoves(validMoves);
    } else if (this.name === "Queen") {
      this.#getQueenMoves(validMoves);
    } else if (this.name === "King") {
      this.#getKingMoves(validMoves);
    }

    return validMoves;
  }

  /**
   * @param {Array} validMoves
   */
  #getPawnMoves(validMoves) {
    const direction = this.color === "white" ? -1 : 1;

    if (!this.isOccupied(this.x, this.y + direction)) {
      validMoves.push({ x: this.x, y: this.y + direction });

      if (
        (this.color === "white" && this.y === 6) ||
        (this.color === "black" && this.y === 1)
      ) {
        if (!this.isOccupied(this.x, this.y + direction * 2)) {
          validMoves.push({ x: this.x, y: this.y + direction * 2 });
        }
      }
    }

    if (this.isEnemyPiece(this.x - 1, this.y + direction)) {
      validMoves.push({ x: this.x - 1, y: this.y + direction });
    }
    if (this.isEnemyPiece(this.x + 1, this.y + direction)) {
      validMoves.push({ x: this.x + 1, y: this.y + direction });
    }
  }

  /**
   * @param {Array} validMoves
   */
  #getRookMoves(validMoves) {
    const directions = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ];

    for (let direction of directions) {
      let x = this.x;
      let y = this.y;

      while (true) {
        x += direction.x;
        y += direction.y;

        if (x < 0 || x > 7 || y < 0 || y > 7) break;

        if (this.isOccupied(x, y)) {
          if (this.isEnemyPiece(x, y)) {
            validMoves.push({ x, y });
          }
          break;
        } else {
          validMoves.push({ x, y });
        }
      }
    }
  }

  /**
   * @param {Array} validMoves
   */
  #getKnightMoves(validMoves) {
    const knightMoves = [
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 },
    ];

    for (let move of knightMoves) {
      let newX = this.x + move.x;
      let newY = this.y + move.y;

      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        if (!this.isOccupied(newX, newY) || this.isEnemyPiece(newX, newY)) {
          validMoves.push({ x: newX, y: newY });
        }
      }
    }
  }

  /**
   * @param {Array} validMoves
   */
  #getBishopMoves(validMoves) {
    // Diagonal moves
    const directions = [
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 }, // Up-right, Up-left, Down-right, Down-left
    ];

    for (let direction of directions) {
      let x = this.x;
      let y = this.y;

      while (true) {
        x += direction.x;
        y += direction.y;

        if (x < 0 || x > 7 || y < 0 || y > 7) break;

        if (this.isOccupied(x, y)) {
          if (this.isEnemyPiece(x, y)) {
            validMoves.push({ x, y });
          }
          break;
        } else {
          validMoves.push({ x, y });
        }
      }
    }
  }

  /**
   * @param {Array} validMoves
   */
  #getQueenMoves(validMoves) {
    this.#getRookMoves(validMoves);
    this.#getBishopMoves(validMoves);
  }

  /**
   * @param {Array} validMoves
   */
  #getKingMoves(validMoves) {
    const kingMoves = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }, // Horizontal and vertical
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 }, // diagonal
    ];

    for (let move of kingMoves) {
      let newX = this.x + move.x;
      let newY = this.y + move.y;

      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        if (!this.isOccupied(newX, newY) || this.isEnemyPiece(newX, newY)) {
          validMoves.push({ x: newX, y: newY });
        }
      }
    }
  }

  /**
   * @param {number} x The x-coordinate to check.
   * @param {number} y The y-coordinate to check.
   * @returns {boolean} True if the position is occupied.
   */
  isOccupied(x, y) {
    return pieces.some((piece) => piece.x === x && piece.y === y);
  }

  /**
   * @param {number} x The x-coordinate to check.
   * @param {number} y The y-coordinate to check.
   * @returns {boolean} true if the position is occupied by an enemy piece.
   */
  isEnemyPiece(x, y) {
    return pieces.some(
      (piece) => piece.x === x && piece.y === y && piece.color !== this.color
    );
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
pieces.push(new Piece(6, 7, "Knight", whiteKnightImage, "white"));

let blackKnightImage = new Image();
blackKnightImage.src = "./pieces/knight-b.svg";
pieces.push(new Piece(1, 0, "Knight", blackKnightImage, "black"));
pieces.push(new Piece(6, 0, "Knight", blackKnightImage, "black"));

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
