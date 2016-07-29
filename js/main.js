var Animation = (function() {

  var c, ctx;

  var WIDTH = 390;
  var HEIGHT = 948;

  var WORDS = ["do", "next", "then", "else", "nil", "true", "alias", "elsif", "not", "undef", "and", "end", "or", "unless", "begin", "ensure", "redo", "until", "break", "false", "rescue", "when", "case", "for", "retry", "while", "class", "if", "return", "while", "define", "self", "defined?", "module", "super"];

  // UTILITIES
  // generate a random word from the list
  var randomWord = function() {
    return WORDS[ Math.floor(WORDS.length * Math.random()) ];
  }

  // generate a random digit between 0-z
  var randomDigit = function() {
    return Math.round(Math.random() * 36).toString(36);
  };

  // Represents a text and its position on the screen
  var Word = function() {

    this.word = randomWord();
    this.x = Math.random() * WIDTH;
    this.y = Math.random() * HEIGHT;
    this.v = Math.random() * 2 + 1;

    this.update = function() {
      if ( this.y < 0 ) {
        this.x = Math.random() * WIDTH;
        this.word = randomWord();
        this.y = HEIGHT;
        this.v = Math.random() * 2 + 1;
      } else {
        this.y -= this.v;
      }
    };
  };

  // An array of random pieces of text to display
  var words = [];
  for ( var i = 0; i < 128; i++ ) {
    words.push( new Word() );
  };

  // UPDATE LOGIC
  // Update everything
  var update = function() {
    for ( var i = 0; i < words.length; i++ ) {
      words[i].update();
    }
  };

  // DRAW LOGIC
  // Draw everything
  var draw = function() {
    clear();
    drawCPBar();
    drawWords();
  };

  // Clear the canvas with the background
  var clear = function() {
    ctx.fillStyle = "rgba(69, 83, 114, 0.50)";
    ctx.fillRect( 0, 0, WIDTH, HEIGHT );
  };

  // Draw the CP-meter at the top
  var drawCPBar = function() {
    ctx.strokeStyle = "rgba(200,200,200,0.50)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(WIDTH/2,WIDTH/2+18,WIDTH/2-20,Math.PI,2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = "rgba(240,240,240,0.9)";
    ctx.beginPath();
    ctx.arc(WIDTH/2,WIDTH/2+18,WIDTH/2-20,Math.PI,1.75 * Math.PI);
    ctx.stroke();
  };

  // Draw the text scrolling in the background
  var drawWords = function() {
    ctx.fillStyle = "rgb(224, 233, 233)"

    for ( var i = 0; i < words.length; i++ ) {
      ctx.fillText( words[i].word, words[i].x, words[i].y )
    }
  };

  // Functions to run once
  var setup = function() {
    c = document.getElementById("pokeanimation");
    ctx = c.getContext("2d");

    ctx.font = "16px Monospace";
  };

  // Functions to run each frame
  var loop = function() {
    update();
    draw();
  }

  // Run the animation
  var run = function() {
    setup();
    setInterval(function() {
      loop();
    }, 40)
  }

  return {
    run: run,
  };
})();

$(document).ready( function() {
  Animation.run();
})
