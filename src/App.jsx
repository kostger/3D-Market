import React, { useState, useRef } from "react";
import ThreeDModel from "./ThreeModel";
import Menu from "./components/Menu";
import { gsap } from "gsap";

const App = () => {
  const [inStore, setInStore] = useState(false);
  const cameraRef = useRef(null);

  const handleCategoryClick = (coordinates, lookAt) => {
    gsap.to(cameraRef.current.position, {
      duration: 2,
      x: coordinates.x,
      y: coordinates.y,
      z: coordinates.z,
      onUpdate: () => {
        cameraRef.current.lookAt(lookAt.x, lookAt.y, lookAt.z); // Update lookAt dynamically
      },
    });
  };

  return (
    <div className="App">
      <ThreeDModel
        inStore={inStore}
        setInStore={setInStore}
        cameraRef={cameraRef}
        handleCategoryClick={handleCategoryClick}
      />
      <Menu inStore={inStore} onCategoryClick={handleCategoryClick} />
    </div>
  );
};

export default App;
