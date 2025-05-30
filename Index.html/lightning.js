// Lightning Ball Animation for DBZ style
const canvas = document.getElementById('lightning-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class LightningBall {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.85 + 40;
    this.radius = 38 + Math.random() * 32;
    this.color = ['#ffe457', '#3fff9b', '#25e1ff'][Math.floor(Math.random()*3)];
    this.alpha = 0.25 + Math.random() * 0.45;
    this.vx = (Math.random() - 0.5) * 1.8;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.life = 0;
    this.maxLife = 180 + Math.random() * 100;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha * (1 - this.life / this.maxLife);
    let grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    grad.addColorStop(0, this.color);
    grad.addColorStop(0.55, '#fff9');
    grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.restore();

    // Lightning arcs
    if (Math.random() < 0.32) {
      drawLightning(this.x, this.y, this.radius);
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy + Math.sin(Date.now()/220 + this.x/99) * 0.3;
    this.life++;
    if (this.life > this.maxLife ||
        this.x < -80 || this.x > canvas.width + 80 ||
        this.y < -80 || this.y > canvas.height + 80) {
      Object.assign(this, new LightningBall());
      this.life = 0;
    }
  }
}

function drawLightning(x, y, r) {
  ctx.save();
  ctx.strokeStyle = ['#ffe457','#25e1ff','#3fff9b'][Math.floor(Math.random()*3)];
  ctx.globalAlpha = 0.31 + Math.random()*0.15;
  ctx.lineWidth = 2.2 + Math.random() * 2.5;
  ctx.beginPath();
  let points = 7 + Math.floor(Math.random()*2);
  let angle = Math.random() * Math.PI * 2;
  let len = r * 1.1 + Math.random()*21;
  let px = x, py = y;
  for (let i = 0; i < points; i++) {
    angle += (Math.random()-0.5)*1.4;
    let nx = px + Math.cos(angle) * (len / points) + (Math.random()-0.5)*9;
    let ny = py + Math.sin(angle) * (len / points) + (Math.random()-0.5)*9;
    ctx.lineTo(nx, ny);
    px = nx; py = ny;
  }
  ctx.stroke();
  ctx.restore();
}

const balls = Array.from({length: 9}, () => new LightningBall());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => {
    ball.draw();
    ball.update();
  });
  requestAnimationFrame(animate);
}
animate();