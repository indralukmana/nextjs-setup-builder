"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Vector3 } from "three";

type GltfSlotProps = {
  src: string;
  /** Target height in meters after normalization. */
  fitHeight?: number;
};

/**
 * Loads a GLB, normalizes height, and sits it on the local ground plane (y = 0).
 */
export function GltfSlot({ src, fitHeight = 1 }: GltfSlotProps) {
  const { scene } = useGLTF(src);

  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const size = new Vector3();
    box.getSize(size);
    const height = Math.max(size.y, 0.001);
    const scale = fitHeight / height;
    clone.scale.setScalar(scale);

    box.setFromObject(clone);
    const center = new Vector3();
    box.getCenter(center);
    clone.position.x -= center.x;
    clone.position.z -= center.z;
    clone.position.y -= box.min.y;
    return clone;
  }, [fitHeight, scene]);

  return <primitive object={object} />;
}
