import { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { CanvasLoader } from "./CanvasLoader";

const SetUpCanvas = ({ isMobile }:{ isMobile: boolean }) => {
  const setUp = useGLTF("/3DModels/setup/scene.gltf", true);

  if (!setUp) {
    return <div>Loading...</div>;
  }

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={100}
        castShadow
        shadow-mapSize={1024}
      />
      <spotLight
        position={[30,20,30]}
        angle={0.12}
        penumbra={1}
        intensity={1000}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[-3,-3,-3]} intensity={10}  />
      <pointLight position={[1,1,1]} intensity={10}  />
      <pointLight position={[0,0,0]} intensity={1}  />
      <pointLight position={[2,2,2]} intensity={10}  />
      <pointLight position={[2,2,10]} intensity={100}  />
      <pointLight position={[3,3,3]} intensity={10}  />

      <primitive
        object={setUp.scene}
        scale={isMobile ? 1 : 1.35}
        position={isMobile ? [0, -4.5, 0] : [0, -3.3, 0]}
        rotation={[-0.01, -0.2, -0.1]}
      />

    </mesh>
  );
};

export const SetUp = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
     shadows
      dpr={[1, 2]}
       camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="relative !w-[80%] sm:!w-[620px] xl:!w-[820px] !h-[360px] sm:!h-[400px] xl:!h-[440px] top-[40%] sm:top-[42%] left-[9%] md:lef-[10%] lg:left-[23%]"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
          <SetUpCanvas isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
