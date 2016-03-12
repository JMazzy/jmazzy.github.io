var hexMath = {

  directions: [
    new Cubic(1, -1, 0), new Cubic(1, 0, -1), new Cubic(0, 1, -1),
    new Cubic(-1, 1, 0), new Cubic(-1, 0, 1), new Cubic(0, -1, 1)
  ],

  findNeighbors: function( cubic ) {
    var neighbors = [];

    for ( var n = 0; n < this.directions.length; n++ ) {
      neighbors[n] = cubic.add( this.directions[n] );
    }

    return neighbors;
  }
}

function Cubic(x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.add = function( otherCubic ) {
    this.x += otherCubic.x;
    this.y += otherCubic.y;
    this.z += otherCubic.z;
  };

  this.set = function(newX,newY,newZ) {
    this.x = newX;
    this.y = newY;
    this.z = newZ;
  }

  this.compare = function( otherCubic ) {
    return this.x === otherCubic.x && this.y === otherCubic.y && this.z === otherCubic.z
  };

  this.toAxial = function() {
      this.hexes[row].unshift(new Hex( "water", 0 ));

    return new Axial(q,r);
  };

  this.toOffset = function() {
    var row = z;
    var col = this.x + (this.z - (this.z&1)) / 2;
    return new Offset(row,col);
  };
}

function Pixel(x,y) {
  this.x = x;
  this.y = y;

  this.toOffset = function() {

  }
}

function Axial(q,r) {
  this.q = q;
  this.r = r;

  this.add = function( otherAxial ) {
    this.q += otherAxial.q;
    this.r += otherAxial.r;
  };

  this.set = function(newQ,newR) {
    this.q = newQ;
    this.r = newR;
  }

  this.compare = function( otherAxial ) {
    return this.q === otherAxial.q && this.r === otherAxial.r
  }

  this.toCubic = function() {
    var x = q
    var z = r
    var y = -x-z

    return new Cubic(x,y,z);
  }
}

function Offset(row,col) {
  this.row = row;
  this.col = col;

  this.add = function( otherOffset ) {
    this.row += otherOffset.row;
    this.col += otherOffset.col;
  };

  this.set = function(newRow,newCol) {
    this.row = newRow;
    this.col = newCol;
  }

  this.compare = function( otherOffset ) {
    return this.row === otherOffset.row && this.col === otherOffset.col
  }

  this.toPixel = function( size ) {
    var x = Math.round(size * Math.sqrt(3) * (this.col + 0.5 * (this.row&1)));
    var y = Math.round(size * (3/2) * this.row);
    return new Pixel(x, y);
  }

  this.toCubic = function() {
    var x = this.col - ( this.row - ( this.row&1)) / 2;
    var z = this.row;
    var y = -x-z;

    return new Cubic(x,y,z);
  }
}
