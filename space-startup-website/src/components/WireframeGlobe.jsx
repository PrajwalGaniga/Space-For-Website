// src/components/WireframeGlobe.jsx

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Wireframe } from '@react-three/drei';

function WireframeGlobe() {
  return (
    // Canvas acts as the container for the 3D scene
    <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
      {/* Lights for illumination */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#4AB1F1" /> 
      
      {/* The 3D object: a simple Icosahedron (a geometric sphere) */}
      <mesh>
        <icosahedronGeometry args={[1.5, 3]} /> {/* size 1.5, detail 3 */}
        
        {/* Wireframe material for the tech look. We use our accent colors. */}
        <Wireframe stroke={"#2AF598"} thickness={0.05} />
        
      </mesh>
      
      {/* Controls to let the user rotate the model (optional, but interactive) */}
      <OrbitControls 
        enableZoom={false} 
        autoRotate={true} 
        autoRotateSpeed={1.5}
        enableDamping={true}
      />
    </Canvas>
  );
}

export default WireframeGlobe;