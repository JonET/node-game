define(function () {
  return (function () {
    function SpriteRenderer(entity, context) {
      this.entity = entity;
      this.context = context;

      this.spriteSheet = new Image();
      this.spriteSheet.src = "images/ness.png";

      this.frame = 0;
      this.lastTime = 0;
      this.timeTillNextFrame = 0;
    }

    SpriteRenderer.prototype.animatedSprites = {
      "orientation": {
        "south": {
          "standing": {
            0: {
              x: 1,
              y: 1,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 1,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 18,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            }
          }
        },
        "south west": {
          "standing": {
            0: {
              x: 1,
              y: 26,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 1,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 18,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            }
          }
        },
        "south east": {
          "standing": {
            0: {
              x: 155,
              y: 26,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 155,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 137,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            }
          }
        },
        "north": {
          "standing": {
            0: {
              x: 35,
              y: 1,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 35,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 121,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            }
          }
        },
        "north west": {
          "standing": {
            0: {
              x: 35,
              y: 26,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 35,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 52,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            }
          }
        },
        "north east": {
          "standing": {
            0: {
              x: 120,
              y: 26,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 120,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 103,
              y: 26,
              width: 16,
              height: 24,
              time: 125
            }
          }
        },
        "west": {
          "standing": {
            0: {
              x: 52,
              y: 1,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 52,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 69,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            }

          }
        },
        "east": {
          "standing": {
            0: {
              x: 104,
              y: 1,
              width: 16,
              height: 24
            }
          },
          "walking": {
            0: {
              x: 104,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            },
            1: {
              x: 87,
              y: 1,
              width: 16,
              height: 24,
              time: 125
            }
          }
        }
      }
    };

    SpriteRenderer.prototype.drawSprite = function (sprite) {
      this.context.drawImage(
        this.spriteSheet,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height,
        this.entity.positionX,
        this.entity.positionY,
        sprite.width * 2,
        sprite.height * 2);
    };

    SpriteRenderer.prototype.render = function (gameTime) {
      this.context.webkitImageSmoothingEnabled = false;

      var spriteSequence = this.animatedSprites["orientation"][this.entity.orientation][this.entity.state];

      var animationKeys = Object.keys(spriteSequence);

      if (animationKeys.length === 1) {
        this.drawSprite(spriteSequence[0]);
        this.frame = 0;
        return;
      }

      if (gameTime - this.lastTime > this.timeTillNextFrame) {
        if (this.frame < (animationKeys.length - 1)) {
          this.frame += 1;
        }
        else {
          this.frame = 0;
        }

        this.timeTillNextFrame = spriteSequence[this.frame].time;
        this.lastTime = gameTime;
      }

      this.drawSprite(spriteSequence[this.frame]);
    };

    return SpriteRenderer;
  })();
});