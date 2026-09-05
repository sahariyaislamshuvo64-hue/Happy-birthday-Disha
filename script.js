
function explodeFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            dx: (Math.random() - 0.5) * 12,
            dy: (Math.random() - 0.5) * 12,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            radius: Math.random() * 3 + 1,
            alpha: 1 // কণার উজ্জ্বলতা
        });
    }

    let animationId;
    function animate() {
        // স্ক্রিন কালো না করে ক্যানভাস পরিষ্কার করা
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();

            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.015; // ধীরে ধীরে বাজি মিলিয়ে যাবে
        });

        // কণাগুলোর আলো কমে গেলে এনিমেশন বন্ধ হবে এবং ক্যানভাস ক্লিয়ার হয়ে যাবে
        if (particles[0].alpha > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // সম্পূর্ণ পরিষ্কার
        }
    }

    animate();
}
