//DOM del canvas
var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');
var raf;
//SET width/height
canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
WIDTH = canvas.width;
HEIGHT = canvas.height;

var move = true;

//declaro el objeto
var ball = {
  x: 500,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 100,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

//Escribir
function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  //Animation Set
  ball.x += ball.vx;
  ball.y += ball.vy;

  //Límites
  if (ball.y + ball.vy > canvas.height ||
      ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width ||
      ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  //Activar animación
  raf = window.requestAnimationFrame(draw);
}

//Click en canvas
canvas.addEventListener('click', function(e) {
  window.cancelAnimationFrame(raf);
  //Combrobar click dentro del círculo
  var dx = ball.x - e.pageX;
  var dy = ball.y - e.pageY;
  var radius=100;
  var IsInBall = (dx*dx+dy*dy)<(radius*radius);

  if (IsInBall){
    if (move){
      //canelo animación si se clica el circulo
      window.cancelAnimationFrame(raf);
      move = false;
    } else {
      //reinicio el movimiento si estaba parado
        raf = window.requestAnimationFrame(draw);
        move = true;

    }
  } else {
      //Si se clica fuera creo una nueva
    ball.x = event.pageX;
    ball.y = event.pageY;
    draw();
  }
});

function resizeCanvas() {
  canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  WIDTH = canvas.width;
  HEIGHT = canvas.height;
}