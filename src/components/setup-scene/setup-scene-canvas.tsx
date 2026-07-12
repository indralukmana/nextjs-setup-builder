"use client";

import { ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { PCFShadowMap, Vector3 } from "three";

import { GltfSlot } from "@/components/setup-scene/gltf-slot";
import { ProceduralAccessory } from "@/components/setup-scene/procedural-props";
import { getProductSync } from "@/lib/catalog-api";
import { SCENE_PRELOAD_MODELS, type SceneSlot } from "@/lib/scene-slots";

for (const src of SCENE_PRELOAD_MODELS) {
  useGLTF.preload(src);
}

/** Stable orbit target — a fresh array each render resets drei OrbitControls zoom. */
const ORBIT_TARGET = new Vector3(0, 0.6, 0);

type SetupSceneCanvasProps = {
  slots: SceneSlot[];
  className?: string;
};

function SlotObject({ slot }: { slot: SceneSlot }) {
  const product = getProductSync(slot.productId);
  const layer = product?.layer;

  if (slot.src) {
    return (
      <group position={slot.position} rotation={slot.rotation} scale={slot.scale}>
        <GltfSlot src={slot.src} fitHeight={slot.fitHeight} />
      </group>
    );
  }

  const variant = layer === "lamp" ? "lamp" : layer === "plant" ? "plant" : "default";
  return (
    <group position={slot.position} rotation={slot.rotation} scale={slot.scale}>
      <ProceduralAccessory variant={variant} />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <color attach="background" args={["#f3ebe0"]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        position={[4, 8, 3]}
        intensity={1.15}
        shadow-mapSize={[1024, 1024]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[4, 48]} />
        <meshStandardMaterial color="#e6d8c4" />
      </mesh>
    </>
  );
}

function SceneModels({ slots }: { slots: SceneSlot[] }) {
  return (
    <>
      <Environment preset="apartment" />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.45} scale={8} blur={2.5} far={4} />
      {slots.map((slot) => (
        <SlotObject key={slot.key} slot={slot} />
      ))}
    </>
  );
}

function SceneOrbitControls() {
  const target = useMemo(() => ORBIT_TARGET.clone(), []);

  return (
    <OrbitControls
      makeDefault
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2.05}
      minDistance={1.5}
      maxDistance={6}
      target={target}
    />
  );
}

export function SetupSceneCanvas({ slots, className }: SetupSceneCanvasProps) {
  return (
    <div className={className} aria-label="Interactive 3D scene of your monis setup">
      <Canvas
        // three r183+: PCFShadowMap is soft; PCFSoftShadowMap is deprecated
        shadows={{ type: PCFShadowMap, enabled: true }}
        camera={{ position: [2.4, 1.8, 2.8], fov: 42, near: 0.1, far: 40 }}
        className="h-full w-full touch-none rounded-xl"
      >
        <SceneLights />
        {/* Keep controls outside Suspense so GLTF loads don't remount/reset the camera. */}
        <SceneOrbitControls />
        <Suspense fallback={null}>
          <SceneModels slots={slots} />
        </Suspense>
      </Canvas>
    </div>
  );
}
