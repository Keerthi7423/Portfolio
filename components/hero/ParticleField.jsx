"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleField Component
 * Creates a high-density 3D particle cloud for the Hero background.
 * Optimized with useMemo for position data and useFrame for drift motion.
 */
const ParticleField = ({ count = 2500 }) => {
  const points = useRef();

  // Generate random particle positions once
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a wide 3D space
      temp[i3] = (Math.random() - 0.5) * 15;
      temp[i3 + 1] = (Math.random() - 0.5) * 15;
      temp[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Gentle drift and rotation
    if (points.current) {
      points.current.rotation.y = time * 0.02;
      points.current.rotation.x = time * 0.01;
      
      // Dynamic mouse-parallax camera influence
      const { x, y } = state.mouse;
      points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, x * 0.8, 0.05);
      points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, y * 0.8, 0.05);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4fc3f7" // Arc Blue
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
