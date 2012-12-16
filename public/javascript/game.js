define(["player", "background", "jquery"], function (Player, Background, $) {
  window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  return {
    render: function (gameTime) {
      this.stats.begin();
      var context = this.context;

      context.fillStyle = "#BA8F57";
      context.fillRect(0, 0, this.screen.width, this.screen.height);

      this.background.render(gameTime);
      this.player.render(gameTime);


      this.stats.end();
    },

    run: function () {
      var self = this;

      self.screen = document.getElementById("screen");
      self.context = self.screen.getContext("2d");

      self.directionLabel = $('#directionLabel');

      var stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.right = '0px';
      stats.domElement.style.top = '0px';
      document.body.appendChild(stats.domElement);

      self.stats = stats;

      self.ticks = 0;
      var initialTime = 0;
      var gameTime = 0;

      var socket = io.connect('http://localhost');
      socket.emit('connect');

      self.player = new Player(self.context, socket);
      self.background = new Background(self.context);


      var doTick = function (currentTime) {

        if (initialTime === 0) {
          initialTime = currentTime;
        }
        gameTime = currentTime - initialTime;
        self.ticks += 1;
        requestAnimFrame(doTick, screen);
        self.player.update();
        self.render(gameTime);
        self.directionLabel.text(self.player.orientation);
      };

      requestAnimFrame(doTick, screen);
    }
  };
});