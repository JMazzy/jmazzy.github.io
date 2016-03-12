var controller = {
  init: function() {
    model.init();
    view.init();
    view.buildGrid( model.hexes );
  },

  reset: function() {
    this.init();
  }
}

$( document ).ready( function() {
  controller.init();
});
