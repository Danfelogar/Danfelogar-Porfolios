import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CanvasLoader } from './CanvasLoader'
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'

const Ball3D = ({imgUrl}:{ imgUrl: string }) => {
    const [decal] = useTexture([imgUrl]);

    return (
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 0, 0.05]} />
        <mesh castShadow receiveShadow scale={2.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color='#FFF'
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
            // flatShading
          />
        </mesh>
      </Float>
    );
  };

export const Ball = ({icon}:{icon:string}) => {

  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball3D imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}
