define(["jquery"], function ($) {
  var self = this;

  self.keyStates = {};

  self.keys = {
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40
  };

  var screen = $(document);

  screen.keydown(function (event) {
    self.keyStates[event.which] = true;
  });

  screen.keyup(function (event) {
    self.keyStates[event.which] = false;
  });

  self.isDown = function (keyCode) {
    return self.keyStates[keyCode];
  };

  return self;
});
