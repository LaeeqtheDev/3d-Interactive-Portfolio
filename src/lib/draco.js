import { useGLTF } from "@react-three/drei";

/**
 * Serve the Draco decoder from this origin instead of drei's default
 * (gstatic.com). The models are Draco-compressed, so without the decoder
 * nothing renders: self-hosting removes a third-party request from the
 * critical path and keeps the scene working on networks that block it.
 *
 * Must run before any `useGLTF.preload()` call, so this module is the first
 * import in main.jsx.
 */
useGLTF.setDecoderPath("/draco/");
