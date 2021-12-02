const { fieldHeight } = require('../game')

function Player(x, y, d) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.r = this.d / 2;

  this.checkCollision = (object) => {
    // Calculate the distance between the player and object
    let distance =
      Math.sqrt(Math.pow(this.x - object.x, 2) + Math.pow(this.y - object.y, 2)) -
      (this.r + object.r);

    // If distance is less or equal to 0, player has hit the object
    if (distance < 1) {
      let theta = Math.atan2(this.y - object.y, this.x - object.x);
      let roundedTheta = Math.round(theta);

      let sine = Math.sin(theta);
      let cosine = Math.cos(theta);

      object.vx = sine * mouseSpeed + cosine * mouseSpeed;
      object.vy = sine * mouseSpeed - cosine * mouseSpeed;

      if (roundedTheta === 0) {
        object.vy = 0;
      } else if (roundedTheta === -3) {
        object.vy = 0;
      } else if (roundedTheta === -2) {
        object.vx = 0;
      } else if (roundedTheta === 2) {
        object.vx = 0;
      }

      object.vx *= -object.bounce;
      object.vy *= -object.bounce;

      // console.log("theta", roundedTheta);
    }

    // console.log("player", this.x, this.y);
    // console.log("object", object.x, object.y);
  };

  this.checkBoundaryCollision = () => {
    if (this.x < 0 + this.r) {
      this.x = 0 + this.r;
    } else if (this.y < 0 + this.r) {
      this.y = 0 + this.r;
    } else if (this.y > fieldHeight - this.r) {
      this.y = fieldHeight - this.r;
    }

    if (this.x < 0 + this.r || this.y < 0 + this.r) {
      this.x = this.y = 0 + this.r;
    } else if (this.x < 0 + this.r || this.y > fieldHeight - this.r) {
      this.x = 0 + this.r;
      this.y = fieldHeight - this.r;
    }
  };

  // this.animate = () => {
  //   this.x = lerp(this.x, mouseX, 0.1);
  //   this.y = lerp(this.y, mouseY, 0.1);
  // };
}

module.exports = {
  Player
}