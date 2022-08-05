const container = document.getElementById("canvas");
let ctx = container.getContext("2d");
let particles = [];
const colors = [
    "#93DEFF",
    "#FFB562",
    "#FEE440",
    "#DD4A48",
    "#94B49F"
];
container.width = window.innerWidth;
container.height = window.innerHeight;
let nbParticles = container.width / 50;
let animation = null;

// Debouce function for resize event
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var resize = debounce(function() {
    cancelAnimationFrame(animation);
    container.width = window.innerWidth;
    container.height = window.innerHeight;
    nbParticles = container.width / 50;
    particles = [];
    createParticle();
    draw();
}, 300);

window.addEventListener('resize', resize);

// Particle class
class Particle {
    constructor(i) {
        this.lineHeight = 30;
        this.x = Math.random() * container.width;
        this.y = Math.random() * container.height;
        this.vy = Math.random() + 0.1;
        this.radius = Math.random() * 2 + 3;
        this.color = colors[i%5];
    }
    update() {
        this.y += this.vy;
        if (this.y - this.radius - this.lineHeight > container.height) {
            this.y = 0
            this.x = Math.random() * container.width;
            this.vy = Math.random() + 0.1;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.lineHeight);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius * 2;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.lineHeight, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Create the particles
function createParticle () {
    for (let i = 0; i < nbParticles; i++) {
        particles.push(new Particle(i));
    }
}
createParticle();

// Update and draw the particles
function draw() {
    ctx.clearRect(0, 0, container.width, container.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    animation = requestAnimationFrame(draw);
}
draw();

