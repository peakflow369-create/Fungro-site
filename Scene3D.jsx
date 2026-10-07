'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { initPointer, pointer, tickPointer } from '@/lib/pointer';

const { damp, clamp } = THREE.MathUtils;

/* ------------------------------------------------------------------ *
 * 1. Particle field: one draw call, square "pixel" points that get
 *    pushed away by the cursor in proportion to mouse velocity.
 * ------------------------------------------------------------------ */
const vert = /* glsl */ `
  uniform float uTime, uVel, uPx, uScroll;
  uniform vec2 uMouse, uArea;
  attribute float aSeed;
  varying float vF;
  varying float vSeed;
  void main() {
    // work in screen-plane space, then project to each point's depth so the field always fills the view
    vec2 q = position.xy * uArea;
    q.y = mod(q.y + uArea.y * 0.5 + uScroll * (0.4 + aSeed * 0.9) * 2.0, uArea.y) - uArea.y * 0.5;
    q += vec2(sin(uTime * 0.2 + aSeed * 40.0), cos(uTime * 0.17 + aSeed * 31.0)) * 0.12;

    vec2 d = q - uMouse;
    float f = smoothstep(2.4, 0.0, length(d)) * (0.25 + uVel * 1.4);
    q += normalize(d + 1e-4) * f * 0.9;

    float depth = (8.0 - position.z) / 8.0;
    vec4 mv = modelViewMatrix * vec4(q * depth, position.z + f * 1.2, 1.0);
    gl_PointSize = (1.6 + aSeed * 2.4) * uPx * (8.0 / -mv.z) * (1.0 + f * 1.6);
    vF = f;
    vSeed = aSeed;
    gl_Position = projectionMatrix * mv;
  }
`;
const frag = /* glsl */ `
  varying float vF;
  varying float vSeed;
  void main() {
    float spark = step(0.93, vSeed);
    vec3 c = mix(vec3(0.30, 0.40, 0.35), vec3(0.0, 1.0, 0.53), clamp(vF * 1.2 + spark * 0.8, 0.0, 1.0));
    float a = 0.18 + vF * 0.7 + spark * 0.35;
    gl_FragColor = vec4(c, clamp(a, 0.0, 1.0));
  }
`;

function ParticleField({ count }) {
  const mat = useRef();
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.random() - 0.5;
      positions[i * 3 + 1] = Math.random() - 0.5;
      positions[i * 3 + 2] = -Math.random() * 7;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uVel: { value: 0 },
      uPx: { value: 1 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uArea: { value: new THREE.Vector2(10, 6) },
    }),
    []
  );

  useFrame((state, dt) => {
    tickPointer(dt);
    const u = mat.current.uniforms;
    u.uTime.value += dt;
    u.uVel.value = pointer.speed;
    u.uPx.value = state.gl.getPixelRatio();
    u.uScroll.value = window.scrollY / window.innerHeight;
    u.uMouse.value.set((pointer.x * state.viewport.width) / 2, (pointer.y * state.viewport.height) / 2);
    u.uArea.value.set(state.viewport.width * 1.35, state.viewport.height * 1.35);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vert} fragmentShader={frag} transparent depthWrite={false} />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * 2. Hero device: low-poly phone showing a payout screen.
 *    Tilts toward the cursor, spins with scroll, shrinks away after the hero.
 * ------------------------------------------------------------------ */
function drawScreen() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 1024;
  const g = c.getContext('2d');
  const font = (w, s) => `${w} ${s}px system-ui, -apple-system, sans-serif`;
  g.fillStyle = '#0B120E';
  g.fillRect(0, 0, 512, 1024);
  g.fillStyle = '#00FF87';
  g.font = font(700, 38);
  g.fillText('funngro', 36, 84);
  g.fillStyle = '#7C9186';
  g.font = font(500, 26);
  g.fillText('Payout sent to UPI', 36, 190);
  g.fillStyle = '#FFFFFF';
  g.font = font(700, 120);
  g.fillText('₹850', 36, 310);
  g.fillStyle = '#00FF87';
  g.fillRect(36, 340, 14, 14);
  g.font = font(600, 24);
  g.fillText('Credited', 62, 354);
  [['Reel edit', 'Brand campaign'], ['App test', '12 min'], ['Brand survey', '4 min'], ['Share a post', '2 min']].forEach(([a, b], i) => {
    const y = 430 + i * 128;
    g.strokeStyle = '#1C2B23';
    g.lineWidth = 2;
    g.strokeRect(36, y, 440, 104);
    g.fillStyle = '#FFFFFF';
    g.font = font(600, 30);
    g.fillText(a, 62, y + 46);
    g.fillStyle = '#7C9186';
    g.font = font(500, 24);
    g.fillText(b, 62, y + 82);
    if (i === 0) {
      g.fillStyle = '#00FF87';
      g.fillRect(36, y, 8, 104);
    }
  });
  return c;
}

function Coins({ count }) {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const coins = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        a: (i / count) * Math.PI * 2,
        r: 2.2 + (i % 3) * 0.35,
        y: (Math.random() - 0.5) * 3.2,
        s: 0.7 + Math.random() * 0.6,
        sp: 0.14 + Math.random() * 0.18,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    coins.forEach((d, i) => {
      const a = d.a + t * d.sp;
      dummy.position.set(Math.cos(a) * d.r, d.y + Math.sin(t * 0.8 + i) * 0.12, Math.sin(a) * d.r * 0.6);
      dummy.rotation.set(t * 0.6 + i, t * 0.9, 0);
      dummy.scale.setScalar(d.s);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  // one instanced mesh = one draw call for every coin
  return (
    <instancedMesh ref={ref} args={[null, null, count]} frustumCulled={false}>
      <cylinderGeometry args={[0.2, 0.2, 0.05, 8]} />
      <meshStandardMaterial color="#00E676" emissive="#003d22" metalness={0.8} roughness={0.3} flatShading />
    </instancedMesh>
  );
}

function Device({ show, coins }) {
  const outer = useRef();
  const tilt = useRef();
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(drawScreen());
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, dt) => {
    const { width: vw, height: vh } = state.viewport;
    const mobile = state.size.width < 768;
    const sy = Math.min(window.scrollY / window.innerHeight, 3);
    const fade = clamp(1 - (sy - 0.8) / 0.7, 0, 1);
    const g = outer.current;

    const tx = mobile ? 0 : vw * 0.23;
    const ty = (mobile ? vh * 0.22 : vh * 0.03) + sy * vh * 0.5; // rises slower than the page = parallax
    const base = ((mobile ? vh * 0.34 : vh * 0.62) / 3.6) * (show ? fade : 0);

    g.position.x = damp(g.position.x, tx, 4, dt);
    g.position.y = damp(g.position.y, ty + Math.sin(state.clock.elapsedTime * 0.9) * 0.06, 6, dt);
    g.scale.setScalar(damp(g.scale.x, base, 5, dt));
    g.visible = g.scale.x > 0.01;
    g.rotation.y = damp(g.rotation.y, sy * Math.PI * 1.2, 3, dt); // scroll spin

    const t = tilt.current;
    t.rotation.y = damp(t.rotation.y, pointer.x * 0.5, 5, dt); // cursor parallax
    t.rotation.x = damp(t.rotation.x, -pointer.y * 0.35, 5, dt);
    t.rotation.z = damp(t.rotation.z, -pointer.x * 0.05, 5, dt);
  });

  return (
    <group ref={outer} scale={0.0001}>
      <group ref={tilt}>
        <RoundedBox args={[1.9, 3.6, 0.22]} radius={0.16} smoothness={2}>
          <meshStandardMaterial color="#0f1a14" metalness={0.65} roughness={0.35} flatShading />
        </RoundedBox>
        <mesh position={[0, 0, 0.112]}>
          <planeGeometry args={[1.72, 3.42]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.112]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.8, 3.5]} />
          <meshStandardMaterial color="#00FF87" metalness={0.35} roughness={0.45} flatShading />
        </mesh>
        <mesh position={[-0.5, 1.3, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.1, 6]} />
          <meshStandardMaterial color="#0f1a14" metalness={0.7} roughness={0.3} flatShading />
        </mesh>
        <mesh position={[0.96, 0.6, 0]}>
          <boxGeometry args={[0.04, 0.5, 0.08]} />
          <meshStandardMaterial color="#1C2B23" metalness={0.8} roughness={0.3} />
        </mesh>
        <Coins count={coins} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * 3. Low-power fallback (no WebGL, reduced motion, context loss).
 * ------------------------------------------------------------------ */
function StaticFallback({ showDevice }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--c-line))_1px,transparent_1px),linear-gradient(90deg,rgb(var(--c-line))_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      {showDevice && (
        <div className="absolute right-[12%] top-1/2 hidden aspect-[1.9/3.6] h-[56vh] -translate-y-1/2 rounded-[18px] border border-line bg-surface md:block">
          <div className="m-4 h-2 w-1/3 bg-mint" />
          <div className="mx-4 mt-6 font-display text-5xl text-white">₹850</div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function Scene3D({ showDevice = true }) {
  const [mode, setMode] = useState('pending'); // pending | full | lite | none
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    initPointer();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webgl = false;
    try {
      const c = document.createElement('canvas');
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {}
    const weak = (navigator.hardwareConcurrency || 4) <= 4 || (navigator.deviceMemory || 4) <= 2 || window.innerWidth < 768;
    setMode(!webgl || reduce ? 'none' : weak ? 'lite' : 'full');
  }, []);

  if (mode === 'pending') return null;
  if (mode === 'none') return <StaticFallback showDevice={showDevice} />;
  const lite = mode === 'lite';

  return (
    <Canvas
      dpr={[1, lite ? 1 : dpr]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) =>
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          setMode('none');
        })
      }
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
      <hemisphereLight args={['#bfffe0', '#06100a', 0.6]} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, -1.5, 3]} intensity={25} color="#00FF87" />
      <ParticleField count={lite ? 700 : 2200} />
      <Device show={showDevice} coins={lite ? 6 : 14} />
    </Canvas>
  );
}
