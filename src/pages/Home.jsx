import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import HomeInfo from "../components/HomeInfo";
import Loader from "../components/Loader";
import usePageMeta from "../hooks/usePageMeta";
import StageProgress from "../components/StageProgress";
import { Bird } from "../models/Bird";
import { Island } from "../models/Island";
import { Plane } from "../models/Plane";
import Sky from "../models/Sky";

/** Tracks viewport width without re-reading layout on every render. */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
};

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const isMobile = useIsMobile();

  usePageMeta({
    title: "Syed Laeeq Ahmed | Full-Stack Engineer (React, Next.js)",
    description:
      "Full-stack engineer with 5+ years building multi-tenant SaaS in React, Next.js, TypeScript and Node.js. Open to remote or relocation. See the work.",
    path: "/",
  });

  const { islandScale, islandPosition, biplaneScale, biplanePosition } = useMemo(
    () => ({
      islandScale: isMobile ? [0.9, 0.9, 0.9] : [1, 1, 1],
      islandPosition: [0, -6.5, -43],
      biplaneScale: isMobile ? [1.5, 1.5, 1.5] : [3, 3, 3],
      biplanePosition: isMobile ? [0, -1.5, 0] : [0, -4, -4],
    }),
    [isMobile]
  );

  return (
    <section className="w-full h-[100svh] relative overflow-hidden">
      <div className="absolute top-24 sm:top-28 left-0 right-0 z-10 flex items-center justify-center pointer-events-none px-2">
        <div className="pointer-events-auto w-full flex justify-center">
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>
      </div>

      <StageProgress currentStage={currentStage} />

      <Canvas
        className={`w-full h-[100svh] bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
        /**
         * Capping device pixel ratio is the single biggest WebGL win on
         * phones: a 3x-DPR screen would otherwise render ~9x the pixels.
         * `performance.min` lets R3F drop resolution during a drag and
         * restore it once you let go.
         */
        dpr={[1, isMobile ? 1.5 : 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
