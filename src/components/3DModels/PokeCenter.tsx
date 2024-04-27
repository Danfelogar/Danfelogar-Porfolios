import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { CanvasLoader } from "./CanvasLoader"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

const PokeBuild = ({isDesktop}:{isDesktop: boolean}) => {
    const pokeBuild = useGLTF("/3DModels/pokeCenter/scene.gltf");
  
    return (
      <primitive  rotation={[-100, -0.2, -0.27]} object={pokeBuild.scene} scale={isDesktop ? 1.9 : 2} position-y={0} rotation-y={0} />
    );
  };

export const PokeCenter = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 1440px)");

        // Set the initial value of the `isDesktop` state variable
        setIsDesktop(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
        setIsDesktop(event.matches);
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
          shadows
          frameloop='demand'
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <PokeBuild isDesktop={isDesktop} />
    
            <Preload all />
          </Suspense>
        </Canvas>
  )
}
