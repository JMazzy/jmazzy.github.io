function Hex(kind, number) {
  this.kind = kind;
  this.number = number;

  this.setPosition = function(row,col) {
    this.position = (new Offset(row,col)).toCubic();
    this.neighbors = hexMath.findNeighbors( this.position );
  }
}
