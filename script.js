<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A Special Day for DISHA | 3D Experience</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
        }
        body, html {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #000000;
            font-family: 'Segoe UI', Roboto, sans-serif;
        }
        #webgl-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        #ui-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
        }
        .hud-clock {
            color: #00ffff;
            font-size: 1.5rem;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
            background: rgba(0, 0, 0, 0.4);
            padding: 10px 20px;
            border-radius: 12px;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(0, 255, 255, 0.3);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 20px;
            color: #ffffff;
            pointer-events: auto;
        }
        .interactive-btn {
            background: linear-gradient(135deg, #ff007f, #7f00ff);
            border: none;
            color: white;
            padding: 12px 28px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(255, 0, 127, 0.5);
            transition: all 0.3s ease;
            pointer-events: auto;
        }
        .interactive-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(255, 0, 127, 0.8);
        }
    </style>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>
<body>

    <div id="webgl-container"></div>

    <div id="ui-overlay">
        <div class="hud-clock" id="live-timer">Target: 04:25 | 06-09-2026</div>
        <div id="interactive-prompt"></div>
    </div>

    <script>
        // --- 1. SCENE SETUP & RENDERER ---
        const container = document.getElementById('webgl-container');
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000005, 0.0015);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, 0, 100);

        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // --- 2. LIGHTING SYSTEM ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const mainPointLight = new THREE.PointLight(0x00ffff, 2, 300);
        mainPointLight.position.set(0, 10, 20);
        scene.add(mainPointLight);

        // --- 3. UNIVERSE / SPACE BACKGROUND (PARTICLES) ---
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 8000;
        const starPositions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i++) {
            starPositions[i] = (Math.random() - 0.5) * 1500;
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.8,
            transparent: true,
            opacity: 0.8
        });
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        // --- 4. FLOATING 3D CAKE PLACEHOLDER ---
        const cakeGroup = new THREE.Group();
        
        // Base Layer
        const cakeBaseGeo = new THREE.CylinderGeometry(12, 12, 6, 32);
        const cakeMat = new THREE.MeshStandardMaterial({ 
            color: 0xff3366, 
            roughness: 0.3,
            metalness: 0.1
        });
        const cakeBase = new THREE.Mesh(cakeBaseGeo, cakeMat);
        cakeGroup.add(cakeBase);

        // Candle Flame
        const flameGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.set(0, 5, 0);
        cakeGroup.add(flame);

        cakeGroup.position.set(0, -200, 0); // Initially hidden below
        scene.add(cakeGroup);

        // --- 5. TIMELINE & ANIMATION ENGINE ---
        const targetDate = new Date('2026-09-06T04:25:00').getTime();

        function checkCountdownTrigger() {
            const now = new Date().getTime();
            const difference = targetDate - now;

            // Automation Trigger for 04:25, 06-09-2026
            if (difference <= 0) {
                triggerHolographicSequence();
            }
        }

        function triggerHolographicSequence() {
            // Camera zoom animation using GSAP
            gsap.to(camera.position, {
                z: 20,
                duration: 4,
                ease: "power3.inOut",
                onComplete: () => {
                    start3DNameReveal();
                }
            });
        }

        function start3DNameReveal() {
            // Bring Cake into view
            gsap.to(cakeGroup.position, {
                y: 0,
                duration: 3,
                ease: "back.out(1.7)"
            });
        }

        // --- 6. RENDER LOOP ---
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Rotate starfield slowly
            starField.rotation.y = elapsedTime * 0.02;

            // Float cake
            cakeGroup.position.y += Math.sin(elapsedTime * 2) * 0.05;
            cakeGroup.rotation.y += 0.005;

            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        // --- 7. RESPONSIVE RESIZE ---
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Touch / Click Interaction Raycaster setup
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        window.addEventListener('click', (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(cakeGroup.children);
            if (intersects.length > 0) {
                gsap.to(intersects[0].object.scale, {
                    x: 1.2, y: 1.2, z: 1.2,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    </script>
</body>
</html>
