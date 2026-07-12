"use client";

import type { ThreeElements } from "@react-three/fiber";

type ProceduralDeskProps = ThreeElements["group"];

/** Simple stand-in desk until a real desk GLB is available. */
export function ProceduralDesk(props: ProceduralDeskProps) {
  return (
    <group {...props}>
      {/* Top */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.05, 0.7]} />
        <meshStandardMaterial color="#c4a574" roughness={0.55} metalness={0.05} />
      </mesh>
      {/* Legs */}
      {(
        [
          [-0.6, 0.37, -0.28],
          [0.6, 0.37, -0.28],
          [-0.6, 0.37, 0.28],
          [0.6, 0.37, 0.28],
        ] as const
      ).map((pos) => (
        <mesh key={pos.join(",")} position={pos} castShadow>
          <boxGeometry args={[0.06, 0.74, 0.06]} />
          <meshStandardMaterial color="#5c4a36" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

type ProceduralAccessoryProps = ThreeElements["group"] & {
  variant?: "lamp" | "plant" | "default";
};

export function ProceduralAccessory({ variant = "default", ...props }: ProceduralAccessoryProps) {
  if (variant === "lamp") {
    return (
      <group {...props}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 12]} />
          <meshStandardMaterial color="#e8e0d4" />
        </mesh>
        <mesh position={[0, 0.34, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#f5e6a8" emissive="#f5e6a8" emissiveIntensity={0.35} />
        </mesh>
      </group>
    );
  }

  if (variant === "plant") {
    return (
      <group {...props}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.12, 12]} />
          <meshStandardMaterial color="#8b5a3c" />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#3f7a4c" />
        </mesh>
      </group>
    );
  }

  return (
    <group {...props}>
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.12]} />
        <meshStandardMaterial color="#9aa3ad" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}
