define(["components/input", "components/spriteRenderer"], function (InputComponent, RenderComponent) {
  return (function () {
    'use strict';

    function Player(context, socket) {
      this.socket = socket;
      this.speed = 3;
      this.positionX = 0;
      this.positionY = 0;

      this.orientation = "south";
      this.state = "standing";

      this.inputComponent = new InputComponent(this);
      this.renderComponent = new RenderComponent(this, context);
    }

    Player.prototype.update = function () {
      var oldPositionX = this.positionX;
      var oldPositionY = this.positionY;

      this.inputComponent.update();

      if (oldPositionX === this.positionX && oldPositionY === this.positionY) {
        this.state = "standing";
      }
      else {
        this.state = "walking";
      }
    };

    Player.prototype.render = function (gameTime) {
      this.renderComponent.render(gameTime);
    };

    return Player;
  })();
});