import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { gsap } from "gsap";

const ThreeDModel = ({
  inStore,
  setInStore,
  cameraRef,
  handleCategoryClick,
}) => {
  const mountRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
  const [cameraTarget, setCameraTarget] = useState({ x: 0, y: 0, z: 0 });
  const [originalCameraPosition, setOriginalCameraPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingManager = new THREE.LoadingManager(() => setLoading(false));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const initialCameraPosition = {
      x: 12.05870250770879,
      y: 2.026097567090316,
      z: 4.763303471544827,
    };
    camera.position.set(
      initialCameraPosition.x,
      initialCameraPosition.y,
      initialCameraPosition.z
    );
    camera.lookAt(0, 0, 0);
    setOriginalCameraPosition(initialCameraPosition);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountRef.current.appendChild(renderer.domElement);

    new RGBELoader(loadingManager).load("./skybox_night.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;

      const gltfLoader = new GLTFLoader(loadingManager);
      gltfLoader.load("/src/models/vr_store.glb", (gltf) => {
        const model = gltf.scene;
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.envMap = texture;
            node.material.needsUpdate = true;
          }
        });
        scene.add(model);
      });
    });

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(70, 22, 55);
    directionalLight.lookAt(0, 0, 0);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 30);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(-30, 22, -58);
    pointLight.lookAt(0, 0, 0);
    scene.add(pointLight);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const logInterval = setInterval(() => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction); // Get the current look direction
      const target = {
        x: camera.position.x + direction.x,
        y: camera.position.y + direction.y,
        z: camera.position.z + direction.z,
      };

      setCameraPosition({
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      });
      setCameraTarget(target);
    }, 2000);

    return () => {
      clearInterval(logInterval);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const handleEnterClick = () => {
    gsap.to(cameraRef.current.position, {
      duration: 2,
      x: 5.785656246133204,
      y: 1.6542527407548338,
      z: 0.442444724029889,
      onUpdate: () => {
        cameraRef.current.lookAt(-1.861797799790496, 0, -3.374954932135797);
      },
      onComplete: () => {
        setInStore(true);
      },
    });
  };

  const handleLeaveClick = () => {
    if (originalCameraPosition) {
      gsap.to(cameraRef.current.position, {
        duration: 2,
        x: originalCameraPosition.x,
        y: originalCameraPosition.y,
        z: originalCameraPosition.z,
        onUpdate: () => {
          cameraRef.current.lookAt(0.33133086611231416, 0, -2.2816553275690095);
        },
        onComplete: () => {
          setInStore(false);
        },
      });
    }
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            color: "#fff",
            fontSize: "24px",
          }}
        >
          Loading...
        </div>
      )}
      <div
        ref={mountRef}
        style={{
          display: loading ? "none" : "block",
        }}
      />
      <div>
        Camera position: x={cameraPosition.x}, y={cameraPosition.y}, z=
        {cameraPosition.z}
      </div>
      <div>
        Camera target: x={cameraTarget.x}, y={cameraTarget.y}, z=
        {cameraTarget.z}
      </div>
      <button
        onClick={handleEnterClick}
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100px",
          height: "50px",
          top: "10px",
          left: "10px",
        }}
      >
        Enter Store
      </button>
      <button
        onClick={handleLeaveClick}
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100px",
          height: "50px",
          top: "70px",
          left: "10px",
          backgroundColor: "red",
        }}
      >
        Leave Store
      </button>
    </div>
  );
};

export default ThreeDModel;
