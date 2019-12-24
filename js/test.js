
const user = {
  points: 10,
  score: function() {
    console.log(this)
    this.points++;
  }
}

let temp = () => user.score();
temp();
temp();

console.log(user.points)
user.score();
console.log(user.points)
