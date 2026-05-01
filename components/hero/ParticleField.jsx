"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Configuration for the particle field's visual behavior.
 * Centralizing these values makes it easy for beginners to tweak the look.
 */
const FIELD_CONFIG = {
  SPREAD: 15,          // How far particles are spread in 3D space
  ROTATION_Y: 0.02,    // Speed of horizontal rotation
  ROTATION_X: 0.01,    // Speed of vertical rotation
  LERP_SPEED: 0.05,    // Smoothing factor for mouse movement (0 to 1)
  PARALLAX_FACTOR: 0.8, // Strength of mouse parallax effect
  PARTICLE_SIZE: 0.02,
  COLOR: "#4fc3f7",    // Arc Blue theme color
  OPACITY: 0.4,
};

/**
 * Generates a random set of 3D positions for the particles.
 * @param {number} count Number of particles to create.
 * @returns {Float32Array} Flat array of [x, y, z, x, y, z, ...]
 */
const generateParticleData = (count) => {
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // (Math.random() - 0.5) * spread gives a value between -spread/2 and +spread/2
    positions[i3]     = (Math.random() - 0.5) * FIELD_CONFIG.SPREAD;
    positions[i3 + 1] = (Math.random() - 0.5) * FIELD_CONFIG.SPREAD;
    positions[i3 + 2] = (Math.random() - 0.5) * FIELD_CONFIG.SPREAD;
  }
  
  return positions;
};

/**
 * ParticleField Component
 * Renders a high-density "starfield" or cloud of particles that reacts to mouse movement.
 */
const ParticleField = ({ count = 2500 }) => {
  const pointsRef = useRef();

  // Generate particle positions once. This is computationally expensive,
  // so we memoize it to prevent recalculation on every render.
  const particles = useMemo(() => generateParticleData(count), [count]);

  // The animation loop (runs every frame)
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const { x, y } = state.mouse;

    // 1. Constant drift/rotation for a "living" atmosphere
    pointsRef.current.rotation.y = time * FIELD_CONFIG.ROTATION_Y;
    pointsRef.current.rotation.x = time * FIELD_CONFIG.ROTATION_X;

    // 2. Parallax effect: Shift the field slightly based on mouse position
    // We use Linear Interpolation (lerp) for smooth, lag-free movement.
    const targetX = x * FIELD_CONFIG.PARALLAX_FACTOR;
    const targetY = y * FIELD_CONFIG.PARALLAX_FACTOR;

    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x, 
      targetX, 
      FIELD_CONFIG.LERP_SPEED
    );
    
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y, 
      targetY, 
      FIELD_CONFIG.LERP_SPEED
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      
      <pointsMaterial
        size={FIELD_CONFIG.PARTICLE_SIZE}
        color={FIELD_CONFIG.COLOR}
        transparent
        opacity={FIELD_CONFIG.OPACITY}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
