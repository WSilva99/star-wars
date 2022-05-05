const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Star {
    constructor(x, y, r, v, a = 0, c = 'white') {
        this.x = x;
        this.y = y;
        this.r = r;
        this.v = v;
        this.a = a;
        this.c = c;
    }

    draw() {
        context.save();
        context.globalAlpha = this.a;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.fillStyle = this.c;
        context.fill();
        context.restore();
    }

    update() {
        this.draw();
        this.x += this.v.x;
        this.y += this.v.y;
        this.r += Math.random() * (0.005 - 0.001) + 0.001;
        this.a += Math.random() * (0.05 - 0.01) + 0.01;
    }
}

function calculateVelocity(x0, x1, y0, y1, increment = 1) {
    const angle = Math.atan2(y1 - y0, x1 - x0);
    return {
        x: Math.cos(angle) * increment,
        y: Math.sin(angle) * increment
    }
}

function travel() {
    setInterval(() => {
        const radius = Math.random() * (3 - 1) + 1;
        let x, y;
        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const velocity = calculateVelocity(canvas.width/2, x, canvas.height/2, y, Math.random() * (10 - 3) + 3);
        stars.push(new Star(canvas.width/2, canvas.height/2, radius, velocity));
    }, 15);
}

function animate() {
    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach((star, starIndex) => {
        if(
            star.x + star.r < -100 ||
            star.x - star.r > canvas.width ||
            star.y + star.r < -100 ||
            star.y - star.r > canvas.height
        ) {
            stars.splice(starIndex, 1);
        }
        star.update();
    });
}

let stars = [];

travel();
setInterval(animate, 20);
