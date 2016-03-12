var view = {
  init: function() {
    this.hexSpacing = 40;
    this.registerEventListeners();
  },

  registerEventListeners: function() {
    $( ".reset" ).click( function( event ) {
      console.log("clicked!");
      $( ".grid" ).empty();
      controller.reset();
    });
  },

  buildGrid: function( grid ) {

    var rows = grid.length;
    for ( var row = 0; row < rows; row++) {

      var cols = grid[row].length;
      for ( var col = 0; col < cols; col++ ) {

        var hexType = grid[row][col].kind;
        var hexNumber = grid[row][col].number;

        this.createHex(row,col,hexType, hexNumber);

        this.positionHex(row,col);

        this.hideNumbers(row,col,hexType);
      }
    }
  },

  createHex: function(row, col, hexType, hexNumber) {
    var $hexagon = $( "<div class='hexagon " + hexType + " row" + row + " col" + col + "'><span><p class='number'>" + hexNumber + "</p></span></div>" );
    $(".grid").append( $hexagon );
  },

  positionHex: function(row,col) {
    var gridPosition = new Offset(row,col);
    var pagePlacement = gridPosition.toPixel( this.hexSpacing );
    $(".row" + row + ".col" + col).css( "top", pagePlacement.y );
    $(".row" + row + ".col" + col).css( "left", pagePlacement.x );
  },

  hideNumbers: function(row,col,hexType) {
    if ( hexType === "water" || hexType === "desert" ) {
      $(".row" + row + ".col" + col + " > span > .number").addClass("hidden");
    }
  }
}
