var view = {

  init: function() {
    this.registerEventListeners();
    this.boardHeight;
    this.boardWidth;
  },


  buildGrid: function( boardHeight, boardWidth ) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    for ( var row = 0; row < boardHeight; row++ ) {
      $(".board").append( $("<div class='grid-row' id='row-" + row + "'></div>") );
      for ( var col = 0; col < boardWidth; col++ ) {
        $("#row-" + row).append( $("<div class='col square' id='col-" + col + "'></div>") )
      }
    }
    $squareSize = $(".square").height();
    $(".board").height( boardHeight * $squareSize );
    $(".board").width( boardWidth * $squareSize );
  },


  registerEventListeners: function() {
    $( document ).keydown( function( event ) {
      switch ( event.which ) {
      case 40:
        controller.changeDirection( "down" );
      break;
      case 38:
        controller.changeDirection( "up" );
      break;
      case 39:
        controller.changeDirection( "right" );
      break;
      case 37:
        controller.changeDirection( "left" );
      break;
      }
    });

    $( ".loss-message" ).click( function( event ) {
      console.log("clicked!");
      location.reload();
    });
  },

  render: function( snake, food ) {

    for ( var row = 0; row < this.boardHeight; row++ ) {
      for ( var col = 0; col < this.boardWidth; col++ ) {
        $("#row-" + row + " " + "#col-" + col).removeClass("snake");
        $("#row-" + row + " " + "#col-" + col).removeClass("food");
      }
    }

    for ( var seg = 0; seg < snake.segments.length; seg++) {
      var row = snake.segments[seg].location.y;
      var col = snake.segments[seg].location.x;
      $("#row-" + row + " " + "#col-" + col).addClass("snake");
    }

    var row = food.location.y;
    var col = food.location.x;
    $("#row-" + row + " " + "#col-" + col).addClass("food");
  },

  displayLossMessage: function( message, score ) {
    $(".loss-message").append("<h3>" + message + "</h3>");
    $(".loss-message").append("<h4>Your score was: " + score + "</h4>");
    $(".loss-message").removeClass("hidden");
  }

}
