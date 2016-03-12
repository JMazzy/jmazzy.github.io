var model = {

  init: function() {
    this.numRows = gameData.hexRows;
    this.numColumns = gameData.hexColumns;
    this.hexes = [];
    this.fillHexArray();
    this.addSurroundingWater();
    this.calculatePositions();
  },

  fillHexArray: function() {
    var shuffledHexes = this.hexShuffler();
    var shuffledNumbers = this.numberShuffler();

    for ( var row = 0; row < this.numRows - 2; row++) {
      this.hexes[row] = [];
      for ( var col = 0; col < this.numColumns - 2; col++ ) {
        var newHexType = shuffledHexes.pop();
        var newHexNumber = 0;

        if ( newHexType !== "water" && newHexType !== "desert" ) {
          newHexNumber = shuffledNumbers.pop();
        }

        this.hexes[row][col] = new Hex( newHexType, newHexNumber );
      }
    }
  },

  addSurroundingWater: function() {
    var firstRow = [];
    var lastRow = [];
    for ( var i = 0; i < this.numColumns; i++ ) {
      firstRow.push(new Hex( "water", 0 ));
      lastRow.push(new Hex( "water", 0 ));
    }
    this.hexes.unshift(firstRow);
    this.hexes.push(lastRow);

    for ( var i = 1; i < this.numRows-1; i++ ) {
      this.hexes[i].unshift(new Hex( "water", 0 ));
      this.hexes[i].push(new Hex( "water", 0 ));
    }
  },

  calculatePositions: function() {
    for ( var row = 0; row < this.hexes.length; row++) {
      for ( var col = 0; col < this.hexes[row].length; col++ ) {
        this.hexes[row][col].setPosition(row,col);
      }
    }
  },

  hexShuffler: function() {
    var shuffledHexes = [];
    for ( var kind = 0; kind < gameData.types.length; kind++ ) {
      var kindString = gameData.types[kind];
      for ( var count = 0; count < gameData.hexCounts[kindString]; count++ ) {
        shuffledHexes.splice(
                            Math.floor(Math.random() * shuffledHexes.length),
                            0,
                            kindString
                          );
      }
    }
    return shuffledHexes;
  },

  numberShuffler: function() {
    var shuffledNumbers = []
    for ( var num = 0; num < gameData.numberCounts.length; num++ ) {
      for ( var count = 0; count < gameData.numberCounts[num]; count++ ) {
        shuffledNumbers.splice(
          Math.floor(Math.random() * shuffledNumbers.length),
          0,
          num
        );
      }
    }

    return shuffledNumbers;
  },

  checkNeighbors: function() {

  },

  swapHexes: function() {

  },
}
