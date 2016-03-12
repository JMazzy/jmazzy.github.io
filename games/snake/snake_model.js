var model = {

  init: function(){
    this.boardWidth = 50;
    this.boardHeight = 25;
    this.score = 0;
    this.snake = new Snake( this.randomLocation(),
                            this.randomDirection() );
    this.food = new Food( this.randomLocation() );
    this.playing = true;
  },

  randomLocation: function(){
    return {
      x: Math.floor( Math.random() * this.boardWidth ),
      y: Math.floor( Math.random() * this.boardHeight )
    }
  },

  randomDirection: function() {
    var directions = ["up", "down", "left", "right"];
    return directions[ Math.floor( Math.random() * 4 ) ];
  },

  update: function() {
    if ( this.playing ) {
      var snakeAte = this.snake.eat( this.food.location );

      if ( snakeAte ) {
        this.food.remove = this.food.location;
        this.food = new Food( this.randomLocation() );
        this.score++;
      }

      this.snake.move();

      this.checkLoss();
    }
  },

  changeDirection: function( newDirection ) {
    this.snake.direction = newDirection;
  },

  checkLoss: function() {
    for ( var seg = 1; seg < this.snake.segments.length; seg++) {
      if ( this.bitingSelf(seg) ) {
        view.displayLossMessage( "You lost because you bit yourself!", this.score);
        this.playing = false;
      }
    }

    if ( this.bitingWall() ) {
      view.displayLossMessage( "You lost because you ran into the wall!", this.score);
      this.playing = false;
    }
  },

  bitingSelf: function(seg) {
    return (
      this.snake.segments[0].location.x ===
      this.snake.segments[seg].location.x &&
      this.snake.segments[0].location.y ===
      this.snake.segments[seg].location.y
    )
  },

  bitingWall: function() {
    return (
      ( this.snake.segments[0].location.x < 0 ||
        this.snake.segments[0].location.x >= this.boardWidth ) ||
      ( this.snake.segments[0].location.y < 0 ||
        this.snake.segments[0].location.y >= this.boardHeight )
    )
  }

}

function Food(startingLocation){
  this.location = startingLocation;
}

function Snake(startingLocation, startingDirection){
  this.segments = [ new Segment( startingLocation ) ];
  this.direction = startingDirection;
  this.growth = 0;

  this.eat = function( foodLocation ) {
    var location = this.segments[0].location;

    if (  location.x === foodLocation.x &&
          location.y === foodLocation.y ) {
      this.growth++;
      return true;
    }
    return false;
  }

  this.move = function() {
    var location = {};
    location.x = this.segments[0].location.x;
    location.y = this.segments[0].location.y;
    var direction = this.direction;

    if ( this.growth > 0 ) {
      this.growth--;
    } else {
      this.segments.pop();
    }

    this.segments.unshift( new Segment( this.findNextLocation( location, direction ) ) );
  }

  this.findNextLocation = function(currentLocation, direction) {
    switch( direction ) {
    case "up":
      currentLocation.y -= 1; break;
    case "down":
      currentLocation.y += 1; break;
    case "left":
      currentLocation.x -= 1; break;
    case "right":
      currentLocation.x += 1; break;
    }

    return currentLocation;
  }
}

function Segment( location ) {
  this.location = {};
  this.location.x = location.x;
  this.location.y = location.y;
}
