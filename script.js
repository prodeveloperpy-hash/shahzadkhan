/*==================== TOGGLE ICON NAVBAR ====================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
})
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = ()=>{
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if(top >= offset && top < offset + height){
navLinks.forEach(links =>{
    links.classList.remove("active");
    document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
})
        };
    })
    /*==================== STICKY NAVBAR ====================*/
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);

/*==================== REMOVE TOGGLE ICON AND NAVBAR WHEN CLICK NAVBAR LINK (SCROLL) ====================*/

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
}
/*==================== SCROLL REVEAL ====================*/
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content, .heading', { origin: "top" });
ScrollReveal().reveal('.home-img, .about-img, .services-container, .portfolio-box, .contact form', { origin: "bottom" });
/*==================== TYPEWRITER EFFECT ====================*/
class TypeWriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let typeSpeed = 120;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('.typewrite');
    if (!el) return;
    const words = JSON.parse(el.getAttribute('data-words'));
    const wait = el.getAttribute('data-wait') || 2000;
    new TypeWriter(el, words, wait);
});
/*==================== BACKGROUND PARTICLES: SNOW, STARS, BUTTERFLIES ====================*/
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const particles = [];
    const maxSnow = Math.floor((w * h) / 70000); // scale with screen
    const maxStars = Math.floor((w * h) / 140000);
    const maxBut = 4;

    function rand(min, max) { return Math.random() * (max - min) + min; }

    // create initial particles
    for (let i = 0; i < maxSnow; i++) {
        particles.push({
            type: 'snow',
            x: rand(0, w),
            y: rand(-h, h),
            r: rand(0.8, 3.2),
            vx: rand(-0.4, 0.4),
            vy: rand(0.3, 1.2),
            opacity: rand(0.35, 0.98)
        });
    }
    for (let i = 0; i < maxStars; i++) {
        particles.push({
            type: 'star',
            x: rand(0, w),
            y: rand(0, h * 0.6),
            r: rand(0.6, 2.6),
            baseAlpha: rand(0.2, 0.95),
            tw: rand(0.005, 0.02),
            t: rand(0, Math.PI * 2)
        });
    }
    for (let i = 0; i < maxBut; i++) {
        particles.push({
            type: 'butter',
            x: rand(0, w),
            y: rand(0, h),
            r: rand(6, 12),
            ang: rand(0, Math.PI * 2),
            speed: rand(0.2, 0.7),
            amp: rand(20, 60),
            phase: rand(0, Math.PI * 2)
        });
    }

    function resetSnow(p) {
        p.x = rand(0, w);
        p.y = rand(-30, -10);
        p.vx = rand(-0.4, 0.4);
        p.vy = rand(0.3, 1.2);
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        for (let p of particles) {
            if (p.type === 'snow') {
                p.x += p.vx;
                p.y += p.vy;
                // a little horizontal sway
                p.x += Math.sin((p.y + p.x) * 0.01) * 0.3;
                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                if (p.y > h + 10 || p.x < -50 || p.x > w + 50) resetSnow(p);
            } else if (p.type === 'star') {
                p.t += p.tw;
                const alpha = p.baseAlpha + Math.sin(p.t) * 0.4;
                ctx.beginPath();
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
                g.addColorStop(0, `rgba(255,255,255,${Math.min(1, alpha)})`);
                g.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = g;
                ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'butter') {
                p.ang += p.speed * 0.005;
                p.x += Math.cos(p.ang) * p.speed;
                p.y += Math.sin(p.ang * 0.6) * 0.6;
                // gentle sine drift
                p.x += Math.sin((Date.now() / 500) + p.phase) * 0.4;
                // draw a simple "butterfly" as two wing ellipses
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(Math.sin(Date.now() / 900 + p.phase) * 0.4);
                ctx.globalAlpha = 0.95;
                // left wing
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255,200,70,0.95)';
                ctx.ellipse(-p.r * 0.5, 0, p.r * 0.9, p.r * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();
                // right wing
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255,150,50,0.85)';
                ctx.ellipse(p.r * 0.5, 0, p.r * 0.9, p.r * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();
                // body
                ctx.beginPath();
                ctx.fillStyle = 'rgba(40,24,10,0.9)';
                ctx.fillRect(-1, -p.r * 0.6, 2, p.r * 1.2);
                ctx.restore();

                // wrap around screen edges
                if (p.x < -50) p.x = w + 50;
                if (p.x > w + 50) p.x = -50;
                if (p.y < -50) p.y = h + 50;
                if (p.y > h + 50) p.y = -50;
            }
        }

        requestAnimationFrame(draw);
    }

    draw();

    // optional random tiny DOM stars for sparkle in top layer (not on canvas)
    const starCount = Math.max(6, Math.floor(w / 160));
    for (let i = 0; i < starCount; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 40 + '%';
        s.style.animationDuration = rand(2.5, 5) + 's';
        s.style.width = rand(2, 6) + 'px';
        s.style.height = s.style.width;
        document.body.appendChild(s);
    }
}

window.addEventListener('load', initParticles);
