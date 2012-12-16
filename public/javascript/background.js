define(function () {
  return (function () {
    'use strict';

    function Background(context) {
      this.context = context
    }

    Background.prototype.update = function () {

    };

    Background.prototype.render = function (gameTime) {

      for (var i = 0; i < 30; i++) {

        var thickness = ((Math.sin((gameTime / 1500) + (i))) + 1) * 25;


        this.context.strokeStyle = "#364147";
        this.context.lineWidth = thickness;
        this.context.beginPath();
        this.context.moveTo(5 + i * 50, 0);
        this.context.lineTo(5 + i * 50, 720);

        this.context.stroke();

        this.context.rotate(0);
      }
    };

    return Background;
  })();
});