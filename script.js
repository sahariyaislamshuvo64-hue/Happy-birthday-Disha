<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DISHA - 3D Birthday Experience</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: 'Orbitron', 'Segoe UI', sans-serif; }
        #canvas-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
        
        /* Glassmorphism UI HUD */
        #hud-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;
            pointer-events: none; display: flex; flex-direction: column; justify-content: space-between;
            align-items: center; padding: 30px;
        }
        .time-badge {
            background: rgba(0, 255, 204, 0.05);
            border: 1px solid rgba(0, 255, 204, 0.3);
            backdrop-filter: blur(12px);
            color: #00ffcc;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 1.1rem;
            letter-spacing: 2px;
            box-shadow: 0 0 20px rgba(0,255,204,0.2);
            text-transform: uppercase;
        }
        
        /* 3D Holographic Letter Modal */
        #hologram-letter {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0);
            width: 80%; max-width: 500px; background: rgba(10, 15, 30, 0.85);
            border: 1px solid #00f3ff; backdrop-filter: blur(20px);
            border-radius: 20px; padding: 30px; color: #fff; z-index: 20;
            box-shadow: 0 0 50px rgba(0, 243, 255, 0.4);
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: auto;
        }
        #hologram-letter.active { transform: translate(-50%, -50%) scale(1); }
        .typewriter-text { font-size: 1.1rem; line-height: 1.6; color: #e0f7fc; text-shadow: 0 0 8px rgba(0,243,255,0.5); }
        .close-btn {
            margin-top: 20px; background: linear-gradient(45deg, #ff007f, #7f00ff);
            border: none; color: #fff; padding: 10px 20px; border-radius: 8px;
            cursor: pointer; font-weight: bold; width: 100%;
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
</head>
<body>

    <div id="canvas-container"></div>

    <div id="hud-overlay">
        <div class="time-badge">SYSTEM TIME: 04:25 | 06-09-2026</div>
    </div>

    <div id="hologram-letter">
        <h3 style="color: #00f3ff; margin-bottom: 15px;">💌 Holographic Transmission</h3>
        <p class="typewriter-text" id="letter-content"></p>
        <button class="close-btn" onclick="closeLetter()">Continue Experience</button>
    </div>

    <script>
        // --- SCENE SETUP ---
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020208, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, 0, 300);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild(renderer.domElement);

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f3ff, 2, 500);
        pointLight.position.set(0, 50, 100);
        scene.add(pointLight);

        // --- 1. 3D UNIVERSE INTRO (Space & Glowing Stars) ---
        const starGeo = new THREE.BufferGeometry();
        const starCount = 10000;
        const posArray = new Float32Array(starCount * 3);

        for(let i=0; i<starCount*3; i++) {
            posArray[i] = (Math.random() - 0.5) * 2000;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const starMat = new THREE.PointsMaterial({ size: 1.2, color: 0xffffff, transparent: true, opacity: 0.8 });
        const starMesh = new THREE.Points(starGeo, starMat);
        scene.add(starMesh);

        // Glowing Planet
        const planetGeo = new THREE.SphereGeometry(40, 64, 64);
        const planetMat = new THREE.MeshStandardMaterial({
            color: 0x00d2ff,
            wireframe: true,
            emissive: 0x003366
        });
        const planet = new THREE.Mesh(planetGeo, planetMat);
        planet.position.set(0, 0, -400);
        scene.add(planet);

        // --- 4. FLOATING 3D CAKE & CANDLE ---
        const cakeGroup = new THREE.Group();
        const cakeTier1 = new THREE.Mesh(
            new THREE.CylinderGeometry(30, 30, 15, 32),
            new THREE.MeshStandardMaterial({ color: 0xff0055, roughness: 0.2, metalness: 0.5 })
        );
        const cakeTier2 = new THREE.Mesh(
            new THREE.CylinderGeometry(20, 20, 12, 32),
            new THREE.MeshStandardMaterial({ color: 0xff00aa, roughness: 0.2 })
        );
        cakeTier2.position.y = 135;
        cakeTier1.position.y = 120;
        cakeGroup.add(cakeTier1, cakeTier2);

        // Candle
        const candle = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 1.5, 10, 16),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        candle.position.y = 146;
        const flame = new THREE.Mesh(
            new THREE.SphereGeometry(2, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0xffaa00 })
        );
        flame.position.y = 152;
        cakeGroup.add(candle, flame);
        cakeGroup.position.set(0, -500, 0); // Hide initially
        scene.add(cakeGroup);

        // --- 5. ANTI-GRAVITY BALLOONS ---
        const balloons = [];
        const balloonGeo = new THREE.SphereGeometry(8, 32, 32);
        for(let i=0; i<15; i++) {
            const mat = new THREE.MeshStandardMaterial({
                color: Math.random() * 0xffffff,
                roughness: 0.1,
                metalness: 0.8
            });
            const balloon = new THREE.Mesh(balloonGeo, mat);
            balloon.position.set((Math.random()-0.5)*300, (Math.random()-0.5)*200, (Math.random()-0.5)*300);
            scene.add(balloon);
            balloons.push(balloon);
        }

        // --- MASTER SEQUENCER (AUTOMATIC TIMELINE) ---
        const tl = gsap.timeline();

        // Step 1 -> 2: Camera Move to Planet & Holographic Countdown
        tl.to(camera.position, { z: -250, duration: 5, ease: "power2.inOut" })
          .to(planet.rotation, { y: Math.PI * 2, duration: 5 }, "<")
          .call(() => runCountdown());

        function runCountdown() {
            // Trigger 3D Hologram Countdown simulation
            let count = 3;
            const interval = setInterval(() => {
                if(count > 0) {
                    // Particle Explosion Effect simulation
                    createExplosion(camera.position.x, camera.position.y, camera.position.z - 50);
                    count--;
                } else {
                    clearInterval(interval);
                    revealNameAndScene();
                }
            }, 1000);
        }

        function createExplosion(x, y, z) {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Step 3 & 6: Name Reveal & Magical Room Transition
        function revealNameAndScene() {
            // Move Camera back & bring floating cake
            gsap.to(camera.position, { z: 200, y: 50, duration: 3 });
            gsap.to(cakeGroup.position, { y: -100, duration: 3, ease: "back.out(1.2)" });
            
            // Trigger Typewriter Letter Modal after 5s
            setTimeout(() => {
                openLetter();
            }, 4000);
        }

        // Step 7: Hologram Letter Typewriter
        function openLetter() {
            const modal = document.getElementById('hologram-letter');
            modal.classList.add('active');
            const message = "Today is not just another day... It's your day. Wishing you an extraordinary year ahead filled with magic and success! ✨";
            let index = 0;
            const target = document.getElementById('letter-content');
            target.innerHTML = "";
            
            const timer = setInterval(() => {
                if(index < message.length) {
                    target.innerHTML += message.charAt(index);
                    index++;
                } else {
                    clearInterval(timer);
                }
            }, 40);
        }

        function closeLetter() {
            document.getElementById('hologram-letter').classList.remove('active');
            triggerFinalScene();
        }

        // Step 9 & 10: Final Fireworks & Celebration
        function triggerFinalScene() {
            gsap.to(cakeGroup.position, { y: -500, duration: 2 });
            
            // Continuous Fireworks
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });

                if (Date.now() < animationEnd) {
                    requestAnimationFrame(frame);
                }
            })();
        }

        // --- ANIMATION LOOP & INTERACTIONS ---
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // Starfield motion
            starMesh.rotation.y = time * 0.05;

            // Cake floating animation
            cakeGroup.rotation.y = time * 0.5;
            cakeGroup.position.y += Math.sin(time * 2) * 0.2;

            // Anti-gravity balloons floating
            balloons.forEach((b, i) => {
                b.position.y += Math.sin(time + i) * 0.1;
                b.position.x += Math.cos(time + i) * 0.1;
            });

            renderer.render(scene, camera);
        }

        animate();

        // Responsive Resize Handling
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>
