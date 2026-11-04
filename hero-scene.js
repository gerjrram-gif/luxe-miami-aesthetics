/**
 * Homepage WebGL study: Miel de Mar (LX-B03), the honey lip oil.
 * Faceted glass wand vial, polished gold cap, doe-foot applicator.
 * The portrait still stays up for reduced motion, missing WebGL, and a failed load.
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

function narrowNow() {
  return window.innerWidth < 980;
}

function saveDataNow() {
  return !!(navigator.connection && navigator.connection.saveData);
}

function pixelRatioCap() {
  const dpr = window.devicePixelRatio || 1;
  if (saveDataNow()) return Math.min(Math.max(dpr, 1.75), 2);
  if (narrowNow()) return 2;
  return Math.min(Math.max(dpr, 2), 2.5);
}

let api = null;
let booting = false;

function engraveTexture(THREE, lines, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#3f220c";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  lines.forEach((line) => {
    ctx.font = line.font;
    ctx.letterSpacing = line.tracking || "0px";
    ctx.fillText(line.text, width / 2, line.y);
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

function decalMaterial(THREE, texture) {
  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
}

function studioScene(THREE) {
  const env = new THREE.Scene();
  const room = new THREE.Mesh(
    new THREE.BoxGeometry(16, 12, 16),
    new THREE.MeshBasicMaterial({ color: 0xf3eee6, side: THREE.BackSide })
  );
  env.add(room);
  function panel(color, x, y, z, sx, sy, sz) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color })
    );
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    env.add(mesh);
  }
  panel(0xfff3df, -2.4, 3.6, 2.2, 4.4, 1.4, 0.12);
  panel(0xffe8c4, 3.1, 1.6, 2.6, 2.1, 2.6, 0.12);
  panel(0xfffaf2, 0.4, 2.4, -4.2, 1.2, 3.4, 0.12);
  panel(0xffd59a, -4.2, 0.2, 0.4, 0.45, 2.2, 0.12);
  panel(0xfff6ea, 0.2, 5.2, 0.4, 5, 0.28, 2.4);
  return env;
}

function contactShadow(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const grd = ctx.createRadialGradient(256, 256, 16, 256, 256, 248);
  grd.addColorStop(0, "rgba(92, 64, 42, 0.34)");
  grd.addColorStop(0.45, "rgba(92, 64, 42, 0.14)");
  grd.addColorStop(1, "rgba(92, 64, 42, 0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 512, 512);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 1.8),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.62;
  return mesh;
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
  let RoundedBoxGeometry;
  try {
    THREE = await import("three");
    ({ RoundedBoxGeometry } = await import("https://unpkg.com/three@0.160.0/examples/jsm/geometries/RoundedBoxGeometry.js"));
    if (document.fonts && document.fonts.load) {
      await Promise.race([
        Promise.all([
          document.fonts.load("400 80px Allura"),
          document.fonts.load("500 40px 'Cormorant SC'"),
        ]),
        new Promise((resolve) => { window.setTimeout(resolve, 1800); }),
      ]);
    }
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
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0xf7f2ea, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f2ea);

    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = studioScene(THREE);
    scene.environment = pmrem.fromScene(envScene, 0.02).texture;
    envScene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 40);
    camera.position.set(0, 0.15, 7.4);

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.02,
      transmission: 1,
      thickness: 0.04,
      ior: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1,
    });
    const gold = new THREE.MeshPhysicalMaterial({
      color: 0xf0a31c,
      metalness: 1,
      roughness: 0.16,
      clearcoat: 0.35,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.05,
    });
    const honey = new THREE.MeshPhysicalMaterial({
      color: 0xff6a00,
      emissive: 0xff5500,
      emissiveIntensity: 0.28,
      metalness: 0,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 0.35,
      toneMapped: false,
    });
    const honeyTip = new THREE.MeshPhysicalMaterial({
      color: 0xff7408,
      emissive: 0xff5a00,
      emissiveIntensity: 0.22,
      toneMapped: false,
      metalness: 0,
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      sheen: 1,
      sheenColor: new THREE.Color(0xffd58a),
    });
    const ivory = new THREE.MeshPhysicalMaterial({
      color: 0xfffaf4,
      metalness: 0,
      roughness: 0.32,
      clearcoat: 0.25,
      clearcoatRoughness: 0.3,
    });
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffaf6,
      metalness: 0.02,
      roughness: 0.16,
      sheen: 1,
      sheenRoughness: 0.28,
      sheenColor: new THREE.Color(0xf3c7b4),
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1,
    });

    const group = new THREE.Group();
    scene.add(group);
    const product = new THREE.Group();
    product.position.x = -0.42;
    group.add(product);

    const glassW = 0.86;
    const glassH = 2.24;
    const vial = new THREE.Mesh(new RoundedBoxGeometry(glassW, glassH, glassW, 12, 0.034), glass);
    vial.renderOrder = 1;
    product.add(vial);
    const oil = new THREE.Mesh(
      new RoundedBoxGeometry(glassW - 0.16, glassH - 0.2, glassW - 0.08, 10, 0.02),
      honey
    );
    oil.position.set(0, -0.04, 0.07);
    oil.renderOrder = 4;
    product.add(oil);

    const capH = 0.8;
    const capW = 0.98;
    const cap = new THREE.Mesh(new RoundedBoxGeometry(capW, capH, capW, 10, 0.028), gold);
    cap.position.y = glassH / 2 + capH / 2 - 0.03;
    product.add(cap);

    const neck = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.045, 0.9, 4, 0.015), gold);
    neck.position.y = glassH / 2 - 0.01;
    product.add(neck);

    const frontMark = engraveTexture(THREE, [
      { text: "luxe", font: "400 250px Allura, cursive", y: 430 },
      { text: "MIAMI", font: "500 78px 'Cormorant SC', serif", tracking: "18px", y: 620 },
    ], 1024, 1024);
    const front = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.62), decalMaterial(THREE, frontMark));
    front.position.set(0, cap.position.y - 0.02, capW / 2 + 0.03);
    front.renderOrder = 3;
    product.add(front);

    const topMark = engraveTexture(THREE, [
      { text: "LUXE", font: "500 150px 'Cormorant SC', serif", tracking: "28px", y: 512 },
    ], 1024, 512);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.28), decalMaterial(THREE, topMark));
    top.rotation.x = -Math.PI / 2;
    top.position.set(0, cap.position.y + capH / 2 + 0.004, 0.02);
    product.add(top);

    const wand = new THREE.Group();
    wand.position.set(1.28, -0.72, 0.08);
    product.add(wand);
    const openCap = new THREE.Mesh(new RoundedBoxGeometry(0.78, 0.7, 0.78, 6, 0.04), gold);
    wand.add(openCap);
    const opening = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.06, 40), ivory);
    opening.position.y = 0.33;
    wand.add(opening);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.038, 1.72, 32), ivory);
    stem.position.y = 1.18;
    wand.add(stem);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.15, 48, 32), honeyTip);
    tip.scale.set(1.05, 1.7, 0.42);
    tip.position.y = 2.16;
    wand.add(tip);
    const drip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 24, 18), honeyTip);
    drip.scale.set(0.7, 1.6, 0.7);
    drip.position.set(0.1, 1.98, 0.04);
    wand.add(drip);

    const shadow = contactShadow(THREE);
    shadow.position.x = 0.35;
    product.add(shadow);

    const ringMat = gold.clone();
    ringMat.roughness = 0.16;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.011, 20, 220), ringMat);
    ring.rotation.x = 1.22;
    ring.rotation.y = 0.18;
    group.add(ring);

    const rand = hashRand(20261104);
    const pearls = [];
    for (let i = 0; i < 8; i += 1) {
      const radius = 0.055 + rand() * 0.09;
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 32), pearlMat);
      mesh.userData = {
        angle: rand() * Math.PI * 2,
        orbit: 1.15 + rand() * 0.55,
        y: (rand() - 0.45) * 1.8,
        speed: 0.1 + rand() * 0.22,
        lift: rand() * Math.PI * 2,
      };
      scene.add(mesh);
      pearls.push(mesh);
    }

    scene.add(new THREE.HemisphereLight(0xfff8f2, 0xf0e0d2, 1.6));
    const key = new THREE.DirectionalLight(0xfffaf4, 2.6);
    key.position.set(-3.2, 5.4, 4.2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffe6cc, 1.5);
    fill.position.set(4.2, 1.8, 3.2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 3.1);
    rim.position.set(0.6, 3.4, -4.6);
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
      renderer.setPixelRatio(pixelRatioCap());
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const show = narrowNow() ? 4 : pearls.length;
      pearls.forEach((mesh, index) => {
        mesh.visible = index < show;
      });
      ring.visible = !narrowNow();
      wand.visible = true;
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
      const restX = phone ? 0.05 : Math.min(1.35, 0.22 + aspect * 0.42);
      const restY = phone ? 2.2 : -0.08;
      const restZ = phone ? 9.4 : 7.55;
      group.scale.setScalar(phone ? 0.5 : 1);
      group.position.x = THREE.MathUtils.lerp(restX, phone ? 0.08 : restX * 0.72, smooth) + (phone ? 0 : pointer.x * 0.16);
      group.position.y = restY + Math.sin(t * 0.65) * (phone ? 0.035 : 0.05) - smooth * (phone ? 0.15 : 0.28) + (phone ? 0 : -pointer.y * 0.08);
      product.rotation.y = -0.22 + Math.sin(t * 0.38) * 0.07 + smooth * 0.28 + (phone ? 0 : pointer.x * 0.14);
      product.rotation.x = (phone ? 0.02 : pointer.y * 0.05);
      product.rotation.z = 0.015;
      ring.rotation.z = t * 0.22 + smooth * 0.6;
      wand.rotation.z = phone ? 0 : Math.sin(t * 0.3) * 0.02;

      camera.position.z = restZ - smooth * 0.25;
      camera.position.x = phone ? 0 : pointer.x * 0.08;
      camera.position.y = (phone ? 0.42 : 0.12) + (phone ? 0 : pointer.y * 0.04);
      camera.lookAt(phone ? 0 : 0.12, phone ? 0.85 : 0.05, 0);

      pearls.forEach((mesh) => {
        if (!mesh.visible) return;
        const u = mesh.userData;
        u.angle += u.speed * dt;
        const orbit = phone ? u.orbit * 0.55 : u.orbit;
        const py = (phone ? 1.15 : 0.15) + u.y * (phone ? 0.45 : 1);
        let px = Math.cos(u.angle) * orbit + group.position.x * 0.65;
        if (!phone) px = Math.max(px, 0.15);
        mesh.position.set(
          px,
          py + Math.sin(t * 0.7 + u.lift) * 0.08,
          Math.sin(u.angle) * orbit * 0.55
        );
      });

      if (copy && !reduceMq.matches) {
        const fade = 1 - smooth * 0.8;
        copy.style.opacity = fade.toFixed(3);
        copy.style.transform = "translate3d(0," + (-smooth * (phone ? 12 : 22)).toFixed(1) + "px,0)";
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
