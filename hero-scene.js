/**
 * Homepage WebGL study for Luxe Miami Aesthetics.
 * Original glass, antique-gold, and pearl geometry. The portrait still
 * stays up for reduced motion, missing WebGL, and a failed load.
 */
const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerMq = window.matchMedia("(pointer: fine)");

function webglOk() {
  try {
    const probe = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (probe.getContext("webgl2") || probe.getContext("webgl")));
  } catch (err) {
    return false;
  }
}

function hashRand(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let api = null;
let booting = false;

function narrowNow() {
  return window.innerWidth < 980;
}

function saveDataNow() {
  return !!(navigator.connection && navigator.connection.saveData);
}

async function boot() {
  if (reduceMq.matches || !webglOk()) return;
  if (api) {
    api.resume();
    return;
  }
  if (booting) return;
  booting = true;

  const hero = document.querySelector(".hero");
  const canvas = document.getElementById("hero-canvas");
  const copy = hero ? hero.querySelector(".hero-content") : null;
  const still = hero ? hero.querySelector(".hero-still") : null;
  if (!hero || !canvas) {
    booting = false;
    return;
  }

  let THREE;
  let RoomEnvironment;
  try {
    THREE = await import("three");
    ({ RoomEnvironment } = await import("https://unpkg.com/three@0.160.0/examples/jsm/environments/RoomEnvironment.js"));
  } catch (err) {
    booting = false;
    return;
  }
  if (reduceMq.matches) {
    booting = false;
    return;
  }

  let renderer;
  try {
    const phone = narrowNow();
    const lite = phone || saveDataNow();
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lite,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0xf7f2ea, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f2ea);
    scene.fog = new THREE.Fog(0xf7f2ea, 9.5, 16);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new RoomEnvironment(renderer);
    scene.environment = pmrem.fromScene(envScene, 0.04).texture;
    envScene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((mat) => mat.dispose());
      }
    });
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.1, 7.2);

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xfff4ec,
      metalness: 0,
      roughness: 0.06,
      transmission: 1,
      thickness: 1.55,
      ior: 1.46,
      iridescence: 0.42,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [120, 420],
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      attenuationColor: new THREE.Color(0xe7b5a6),
      attenuationDistance: 0.72,
      envMapIntensity: 1.15,
    });
    const gold = new THREE.MeshPhysicalMaterial({
      color: 0xc6a56e,
      metalness: 1,
      roughness: 0.22,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.2,
    });
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xfff8f4,
      metalness: 0.05,
      roughness: 0.2,
      sheen: 1,
      sheenRoughness: 0.32,
      sheenColor: new THREE.Color(0xf0c4b4),
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 0.9,
    });

    const group = new THREE.Group();
    scene.add(group);

    const profile = [
      [0, -1.48],
      [0.42, -1.48],
      [0.7, -1.32],
      [0.8, -0.85],
      [0.78, -0.15],
      [0.66, 0.42],
      [0.4, 0.92],
      [0.24, 1.18],
      [0.22, 1.58],
      [0, 1.58],
    ].map((pair) => new THREE.Vector2(pair[0], pair[1]));
    const latheSeg = lite ? 40 : 72;
    const bottle = new THREE.Mesh(new THREE.LatheGeometry(profile, latheSeg), glass);
    group.add(bottle);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.33, 0.46, lite ? 24 : 48), gold);
    cap.position.y = 1.78;
    group.add(cap);
    const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.04, lite ? 24 : 40), gold);
    capTop.position.y = 2.02;
    group.add(capTop);
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.075, lite ? 16 : 24, lite ? 16 : 24), gold);
    finial.position.y = 2.12;
    group.add(finial);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.028, 12, lite ? 32 : 56), gold);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 1.5;
    group.add(collar);
    const plinth = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.022, 12, lite ? 40 : 72), gold);
    plinth.rotation.x = Math.PI / 2;
    plinth.position.y = -1.46;
    group.add(plinth);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.016, 12, lite ? 80 : 140), gold);
    ring.rotation.x = 1.18;
    ring.rotation.y = 0.2;
    group.add(ring);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.008, 10, lite ? 64 : 110), gold);
    ringB.rotation.x = 0.42;
    ringB.rotation.z = 0.55;
    group.add(ringB);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.05, lite ? 24 : 48),
      new THREE.MeshBasicMaterial({ color: 0xd7c0ae, transparent: true, opacity: 0.38, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.58;
    group.add(shadow);

    const rand = hashRand(20261104);
    const pearlTotal = 14;
    const sphereSeg = lite ? 16 : 28;
    const pearls = [];
    for (let i = 0; i < pearlTotal; i += 1) {
      const bead = i > 10;
      const radius = bead ? 0.045 + rand() * 0.03 : 0.08 + rand() * 0.16;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, sphereSeg, sphereSeg),
        bead ? gold : pearlMat
      );
      mesh.userData = {
        angle: rand() * Math.PI * 2,
        orbit: 1.55 + rand() * 1.25,
        y: (rand() - 0.5) * 2.6,
        speed: 0.12 + rand() * 0.32,
        lift: rand() * Math.PI * 2,
      };
      scene.add(mesh);
      pearls.push(mesh);
    }

    scene.add(new THREE.HemisphereLight(0xfff7f1, 0xecd3c4, 2.4));
    const key = new THREE.DirectionalLight(0xfffaf6, 3.2);
    key.position.set(3.4, 5.2, 4.2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xf6d2c6, 1.35);
    fill.position.set(-4.2, 1.6, 2.4);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 2.1);
    rim.position.set(-1.5, 3.2, -4.5);
    scene.add(rim);

    const clock = new THREE.Clock();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let smooth = 0;
    let running = false;
    let raf = 0;
    let inView = false;
    let shown = false;

    function applySize() {
      const width = Math.max(hero.clientWidth, 1);
      const height = Math.max(hero.clientHeight, 1);
      const cap = narrowNow() || saveDataNow() ? 1.25 : 1.75;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const show = narrowNow() ? 7 : pearls.length;
      pearls.forEach((mesh, index) => {
        mesh.visible = index < show;
      });
    }

    function heroProgress() {
      const rect = hero.getBoundingClientRect();
      const height = rect.height || 1;
      return THREE.MathUtils.clamp(-rect.top / height, 0, 1);
    }

    function pose(dt) {
      const t = clock.elapsedTime;
      const phone = narrowNow();
      smooth = THREE.MathUtils.damp(smooth, heroProgress(), 3.1, dt);
      pointer.x = THREE.MathUtils.damp(pointer.x, pointer.tx, 3.4, dt);
      pointer.y = THREE.MathUtils.damp(pointer.y, pointer.ty, 3.4, dt);

      const aspect = camera.aspect || 1;
      const restX = phone ? 0.02 : Math.min(1.72, 0.42 + aspect * 0.52);
      const restY = phone ? 2.22 : -0.32;
      const restZ = phone ? 9.8 : 7.85;
      group.scale.setScalar(phone ? 0.54 : 0.94);
      ring.visible = !phone;
      ringB.visible = !phone;

      group.position.x = THREE.MathUtils.lerp(restX, phone ? 0.2 : restX * 0.55, smooth) + (phone ? 0 : pointer.x * 0.22);
      group.position.y = restY + Math.sin(t * 0.7) * (phone ? 0.04 : 0.06) - smooth * (phone ? 0.2 : 0.4) + (phone ? 0 : -pointer.y * 0.12);
      group.rotation.y = t * 0.22 + smooth * Math.PI * 1.35 + (phone ? 0 : pointer.x * 0.4);
      group.rotation.x = (phone ? 0.04 : pointer.y * 0.16) + Math.sin(t * 0.45) * 0.035;
      group.rotation.z = 0.06 + Math.sin(t * 0.32) * 0.02;
      ring.rotation.z = t * 0.28 + smooth * 0.8;
      ringB.rotation.y = t * 0.16;

      camera.position.z = restZ - smooth * 0.35;
      camera.position.x = phone ? 0 : pointer.x * 0.1;
      camera.position.y = (phone ? 0.35 : 0.02) + (phone ? 0 : pointer.y * 0.05);
      camera.lookAt(phone ? 0.05 : 0.15, phone ? 0.72 : -0.12, 0);

      pearls.forEach((mesh) => {
        if (!mesh.visible) return;
        const u = mesh.userData;
        u.angle += u.speed * dt;
        const orbit = phone ? u.orbit * 0.42 : Math.min(u.orbit * 0.48, 1.15);
        const bob = phone ? 0.05 : 0.16;
        mesh.scale.setScalar(phone ? 0.62 : 1);
        const py = phone ? 2.05 + u.y * 0.28 : u.y;
        const px = Math.cos(u.angle) * orbit + group.position.x;
        mesh.position.set(
          px,
          py + Math.sin(t * 0.75 + u.lift) * bob + (phone ? 0 : group.position.y * 0.15),
          Math.sin(u.angle) * orbit * 0.62
        );
      });

      if (copy && !reduceMq.matches) {
        const fade = 1 - smooth * 0.8;
        copy.style.opacity = fade.toFixed(3);
        copy.style.transform = "translate3d(0," + (-smooth * (phone ? 12 : 28)).toFixed(1) + "px,0)";
      }
    }

    function frame() {
      if (!running) return;
      raf = window.requestAnimationFrame(frame);
      if (document.hidden) {
        pause();
        return;
      }
      const dt = Math.min(clock.getDelta(), 0.05);
      pose(dt);
      renderer.render(scene, camera);
      if (!shown) {
        shown = true;
        document.documentElement.classList.add("hero-webgl");
        if (still) still.setAttribute("aria-hidden", "true");
      }
    }

    function start() {
      if (running || reduceMq.matches) return;
      running = true;
      clock.getDelta();
      raf = window.requestAnimationFrame(frame);
    }

    function pause() {
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    }

    function resume() {
      if (reduceMq.matches) return;
      document.documentElement.classList.add("hero-webgl");
      if (still) still.setAttribute("aria-hidden", "true");
      if (inView && !document.hidden) start();
    }

    function onPointer(event) {
      if (!finePointerMq.matches || narrowNow()) return;
      pointer.tx = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointer.ty = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    }

    applySize();
    pose(0);
    renderer.render(scene, camera);
    document.documentElement.classList.add("hero-webgl");
    if (still) still.setAttribute("aria-hidden", "true");
    shown = true;

    const view = new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      if (inView && !document.hidden && !reduceMq.matches) start();
      else pause();
    }, { threshold: 0.02 });
    view.observe(hero);

    window.addEventListener("resize", applySize);
    if (window.ResizeObserver) new ResizeObserver(applySize).observe(hero);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pause();
      else if (inView && !reduceMq.matches) start();
    });
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      pause();
      document.documentElement.classList.remove("hero-webgl");
      if (still) still.removeAttribute("aria-hidden");
      if (copy) {
        copy.style.opacity = "";
        copy.style.transform = "";
      }
    });

    api = {
      resume,
      pause() {
        pause();
        document.documentElement.classList.remove("hero-webgl");
        if (still) still.removeAttribute("aria-hidden");
        if (copy) {
          copy.style.opacity = "";
          copy.style.transform = "";
        }
      },
    };
    booting = false;
  } catch (err) {
    booting = false;
    document.documentElement.classList.remove("hero-webgl");
    if (still) still.removeAttribute("aria-hidden");
    if (renderer) {
      renderer.dispose();
      try { renderer.forceContextLoss(); } catch (e) {}
    }
    api = null;
  }
}

if (!reduceMq.matches) boot();

reduceMq.addEventListener("change", () => {
  if (reduceMq.matches) {
    if (api) api.pause();
    else document.documentElement.classList.remove("hero-webgl");
  } else {
    boot();
  }
});
