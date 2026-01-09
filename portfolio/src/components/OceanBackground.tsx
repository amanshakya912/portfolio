// OceanBackground.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  fallbackVideoSrc?: string;
  className?: string;
};

/**
 * Helper: detect prefers-reduced-motion
 */
const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

/**
 * OceanBackground TSX component
 * - mounts a three.js canvas into a div ref
 * - respects reduced-motion and WebGL availability
 */
const OceanBackground: React.FC<Props> = ({ fallbackVideoSrc, className }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  // requestAnimationFrame id (number) stored in ref so we can cancel it on cleanup
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If user prefers reduced motion or WebGL is unavailable, do nothing and let the parent show fallback
    // note: THREE.WEBGL.isWebGLAvailable is not strongly typed in some @types/three versions, so we cast to any
    const webglAvailable =
      (THREE as any).WEBGL && (THREE as any).WEBGL.isWebGLAvailable ? (THREE as any).WEBGL.isWebGLAvailable() : true;

    if (!webglAvailable || prefersReducedMotion()) {
      return;
    }

    // PERFORMANCE HEURISTICS
    const maxDPR = 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDPR);
    const hwConcurrency = navigator.hardwareConcurrency || 4;
    const lowEnd = hwConcurrency <= 2;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0); // transparent background

    // attach canvas
    const container = mountRef.current!;
    container.innerHTML = ""; // ensure empty
    container.appendChild(renderer.domElement);

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 6, 12);

    // LIGHTS
    const dirLight = new THREE.DirectionalLight(0xfff7e6, 0.9);
    dirLight.position.set(5, 10, 0);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x7fb6d6, 0.45));

    // Uniforms (loose typing)
    type Uniforms = Record<string, { value: any }>;
    const uniforms: Uniforms = {
      uTime: { value: 0.0 },
      uBigWaveElevation: { value: 0.45 },
      uBigWaveFrequency: { value: new THREE.Vector2(0.8, 0.5) },
      uBigWaveSpeed: { value: 0.2 },
      uColorDepth: { value: new THREE.Color("#003b5a") },
      uColorSurface: { value: new THREE.Color("#0fb0d9") },
      uColorLight: { value: new THREE.Color("#8fe9ff") },
      uAmplitude: { value: 0.1 },
      uMouseImpact: { value: 0.0 }
    };

    // Vertex shader (string)
    const vertexShader = `
      uniform float uTime;
      uniform float uBigWaveElevation;
      uniform vec2 uBigWaveFrequency;
      uniform float uBigWaveSpeed;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vPosition = position;
        vec3 pos = position;

        float wave1 = sin( (pos.x * uBigWaveFrequency.x + uTime * uBigWaveSpeed) ) * uBigWaveElevation;
        float wave2 = cos( (pos.z * uBigWaveFrequency.y - uTime * uBigWaveSpeed * 0.8) ) * (uBigWaveElevation * 0.45);

        float jitter = sin((pos.x + pos.z) * 0.4 + uTime * 0.6) * 0.03;
        pos.y += wave1 + wave2 + jitter;

        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment shader
    const fragmentShader = `
      precision highp float;
      uniform vec3 uColorDepth;
      uniform vec3 uColorSurface;
      uniform vec3 uColorLight;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        float height = vPosition.y;
        float t = smoothstep(-1.2, 1.2, height);
        vec3 base = mix(uColorDepth, uColorSurface, t);
        float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0,1.0,0.0)), 2.0);
        vec3 color = base + (uColorLight * fresnel * 0.35);

        float fog = exp(-0.02 * (height + 2.0) * (height + 2.0));
        color = mix(color, vec3(0.02,0.05,0.08), 1.0 - fog);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Geometry resolution tuned to device
    const segs = lowEnd ? 64 : 180;
    const oceanGeo = new THREE.PlaneGeometry(40, 40, segs, segs);

    // ShaderMaterial accepts a "uniforms" typed as any in some three versions, so cast
    const oceanMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniforms as any,
      side: THREE.DoubleSide
    });

    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = 0;
    scene.add(ocean);

    // Particles
    const particleCount = lowEnd ? 300 : 800;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = Math.random() * 6 - 1.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      color: 0xcff8ff
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse parallax
    const mouse = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Click ripple: bump a uniform briefly
    const onPointerDown = () => {
      uniforms.uMouseImpact.value = 1.0;
    };
    window.addEventListener("pointerdown", onPointerDown);

    // Resize handler
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Pause when tab hidden to save battery
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;

      // decay mouse impact
      uniforms.uMouseImpact.value = Math.max(0, uniforms.uMouseImpact.value - 0.02);

      // camera parallax
      const targetX = mouse.x * 1.2;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.8 - camera.position.y + 6) * 0.02;
      camera.lookAt(0, 0.6, 0);

      // particle float
      const posAttr = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const baseIndex = i * 3 + 1;
        posAttr[baseIndex] += Math.sin(t * 0.5 + i) * 0.0008;
        if (posAttr[baseIndex] < -3) posAttr[baseIndex] = 6.0;
      }
      (pGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // CLEANUP
    return () => {
      // stop RAF
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      // remove listeners
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      // remove canvas
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // dispose resources
      oceanGeo.dispose();
      oceanMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.forceContextLoss?.();
      renderer.dispose();
    };
  }, [mountRef, className, fallbackVideoSrc]);

  return <div ref={mountRef} className={className ?? "absolute inset-0 w-full h-full"} aria-hidden="true" />;
};

export default OceanBackground;
