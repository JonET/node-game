define(function () {
  'use strict';
  return (function () {
    var ServerInput = function(entity, socket) {
      var self = this;
      self.entity = entity;
      self.socket = socket;

      self.socket.on('move player', function(msg) {
        if(msg.playerId !== entity.playerId) {
          return;
        }

        self.positionX = msg.positionX;
        self.positionY = msg.positionY;
      });
    };

    ServerInput.prototype.lastPositionX = 0;
    ServerInput.prototype.lastPositionY = 0;

    ServerInput.prototype.update = function () {
      var xMove = this.positionX - this.lastPositionX;
      var yMove = this.positionY - this.lastPositionY;

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

      this.entity.positionX = this.positionX;
      this.entity.positionY = this.positionY;

      this.lastPositionX = this.positionX;
      this.lastPositionY = this.positionY;
    };

    return ServerInput;
  })();
});