import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";

const Earth = () => {
    const [colorMap, specularMap] = useLoader(TextureLoader, [
        "/textures/earthMap.jpg", "/textures/earthSpec.jpg"
    ]);

    return (
        <group>
            {/* Earth Mesh */}
            <mesh rotation={[0,0,0]}>
                <sphereGeometry args={[1.5, 64, 64]}/>
                <meshPhongMaterial 
                    map={colorMap}
                    specularMap={specularMap}
                    shininess={20}/>
            </mesh>

            {/* Slight glow effect using atmosphere */}
            <mesh scale={1.1}>
                <sphereGeometry args={[1.42, 64, 64]}/>
                <meshBasicMaterial 
                    color="#3b82f6"
                    transparent
                    opacity={0.3}
                    side={THREE.BackSide}/>
            </mesh>
        </group>
    );
}

export const Globe = () => {

    return (
        <div className="w-full h-80 md:h-80">
            <Canvas camera={{ position: [0, 0, 3] }}>
                {/* Background stars for depth */}
                {/* <Stars radius={100} depth={50} count={1000} factor={4} fade /> */}

                {/* Light sources */}
                <ambientLight intensity={1.3} />
                <directionalLight position={[5, 3, 5]} intensity={1.2} />

                {/* Animated globe */}
                <Earth/>
                {/* <Sphere args={[1, 64, 64]} scale={1.5}>
                    <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.3} speed={2} roughness={0.3}/>
                    <meshStandardMaterial map={earthTexture}/>
                </Sphere> */}

                {/* Allow user interaction (drag/zoom) */}
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
            </Canvas>
        </div>
    )
};