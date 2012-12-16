define(["input"], function (input) {
  return (function () {
    function InputComponent(entity) {
      this.entity = entity;
    }

    InputComponent.prototype.update = function () {
      var yMove = 0;
      var xMove = 0;
      var normalX;
      var normalY;

      if (input.isDown(input.keys.Down)) {
        yMove += 1;
      }

      if (input.isDown(input.keys.Up)) {
        yMove -= 1;
      }

      if (input.isDown(input.keys.Right)) {
        xMove += 1;
      }

      if (input.isDown(input.keys.Left)) {
        xMove -= 1;
      }

      if (yMove > 0 && xMove === 0) {
        this.entity.orientation = "south";
      }
      else if (yMove > 0 && xMove < 0) {
        this.entity.orientation = "south west";
      }
      else if (yMove > 0 && xMove > 0) {
        this.entity.orientation = "south east";
      }
      else if (yMove < 0 && xMove === 0) {
        this.entity.orientation = "north";
      }
      else if (yMove < 0 && xMove < 0) {
        this.entity.orientation = "north west";
      }
      else if (yMove < 0 && xMove > 0) {
        this.entity.orientation = "north east";
      }
      else if (yMove === 0 && xMove < 0) {
        this.entity.orientation = "west";
      }
      else if (yMove === 0 && xMove > 0) {
        this.entity.orientation = "east";
      }

      if (xMove != 0 || yMove != 0) {
        normalX = xMove / Math.sqrt((xMove * xMove) + (yMove * yMove));
        normalY = yMove / Math.sqrt((xMove * xMove) + (yMove * yMove));

        this.entity.positionX = Math.round(this.entity.positionX + (normalX * this.entity.speed));
        this.entity.positionY = Math.round(this.entity.positionY + (normalY * this.entity.speed));

        this.entity.socket.emit('player-status', {
          positionX: this.entity.positionX,
          positionY: this.entity.positionY
        });
      }
    };

    return InputComponent;
  })();
});
