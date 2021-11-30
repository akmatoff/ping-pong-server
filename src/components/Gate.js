function Gate(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  
    this.checkCollision = (object) => {
      // collision of the first gate
      if (
        object.x > this.x - this.w &&
        object.y > this.y &&
        object.y < this.y + this.h
      ) {
        
      }
  
      // console.log(object.x);
      // console.log("gate", this.x - this.w);
    };
  }
  
  module.exports = {
    Gate
  }