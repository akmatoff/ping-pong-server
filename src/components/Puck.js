const { fieldWidth, fieldHeight } = require('../game')

function Puck(x, y, d) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.r = this.d / 2;
  this.bounce = 0.4;
  this.friction = 0.99;
  this.vx = 0;
  this.vy = 0;

  this.checkBoundaryCollision = () => {
    if (this.x > fieldWidth - this.r) {
      this.vx *= -this.bounce;
      this.x = fieldWidth - this.r;
      // console.log('vx', this.vx)
    } else if (this.x < 0 + this.r) {
      this.vx *= -this.bounce;
      this.x = 0 + this.r;
      // console.log('vx', this.vx)
    }

    if (this.y > fieldHeight - this.r) {
      this.vy *= -this.bounce;
      this.y = fieldHeight - this.r;
      // console.log('vy', this.vy)
    } else if (this.y < 0 + this.r) {
      this.vy *= -this.bounce;
      this.y = 0 + this.r;
      // console.log('vy', this.vy)
    }
  };

  this.draw = () => {
    
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    this.x += this.vx;
    this.y += this.vy;

  };
}

module.exports = {
  Puck
}
