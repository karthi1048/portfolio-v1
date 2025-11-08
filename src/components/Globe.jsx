import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";

export const Globe = () => {
    const [ready, setReady] = useState(false);
    const [text, setText] = useState({ colorMap: null, specularMap: null});
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        console.log("[Globe] mount");
        return () => {
            mountedRef.current = false;
            console.log("[Globe] unmount");
        }
    }, []);

    // Delay to ensure GPU + DOM is ready before creating WebGL context
    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 400);
        return () => clearTimeout(timer);
    }, []);

    // load textures only when ready
    useEffect(() => {
        let cancelled = false;
        if(!ready) return;

        const load = async () => {
            try {
                const loader = new TextureLoader();
                const colorMap = await new Promise((res, rej) => {
                    loader.load("/textures/earthMap.jpg", res, undefined, rej);
                });
                const specMap = await new Promise((res, rej) => {
                    loader.load("/textures/earthSpec.jpg", res, undefined, rej);
                });
                if (!cancelled) setText({ colorMap, specularMap: specMap });
                console.log('[Globe] textures loaded', { colorMap: colorMap?.image?.width, specularMap: specMap?.image?.width, });
            } catch (error) {
                console.error("[Globe] texture load failed: ", error);
            }
        };
        load();

        return () => {
            cancelled = true;
        };
    }, [ready]);

    // show placeholders while not ready or when textures not loaded
    if (!ready || !text.colorMap) {
        return (
            <div className="w-[400px] h-[400px] bg-gray-800/40 flex items-center justify-center rounded-xl animate-pulse text-gray-400">
                Initializing 3D Globe...
            </div>
        );
    }

    return (
        <div className="w-full h-80 md:h-80">
            <Canvas
                dpr={[1,1]}
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{antialias: true, preserveDrawingBuffer: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: false}}
                // style={{
                //     width: "400px",
                //     height: "400px",
                //     borderRadius: "50%"
                // }}
                onCreated={( {gl} ) => {
                    try {
                        const canvas = gl.domElement;
                        console.log("[Globe] GL created", {context: gl, canvasCount: document.querySelectorAll('canvas').length});
                        
                        // prevent context loss crash
                        const onLost = (e) => {
                            e.preventDefault();
                            console.warn("WebGL Context lost (Globe) - Attempting Recovery");                        
                        }
                        canvas.addEventListener("webglcontextlost", onLost);
                        // Fixing blank canvas issue by forcing resize redraw(re-render) after amount
                        setTimeout(() => window.dispatchEvent(new Event("resize")), 80);

                        const cleanUp = () => canvas.removeEventListener("webglcontextlost", onLost);
                        // Store cleanup on gl, so we can it if needed
                        gl.__cleanupOnUnmount = cleanUp;
                    } catch (error) {
                        console.error("[Globe] onCreated error", error);
                    }
                }}
                onPointerMissed={() => {}}
                >
                {/* Background stars for depth */}
                {/* <Stars radius={100} depth={50} count={1000} factor={4} fade /> */}

                {/* Light sources */}
                <ambientLight intensity={1.3} />
                <directionalLight position={[5, 3, 5]} intensity={1.2} />

                {/* Animated globe */}
                <Earth colorMap={text.colorMap} specularMap={text.specularMap}/>
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

const Earth = ({ colorMap, specularMap }) => {
    // const [colorMap, specularMap] = useLoader(TextureLoader, [
    //     "/textures/earthMap.jpg", "/textures/earthSpec.jpg"
    // ]);

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