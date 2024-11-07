import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Menu({ inStore, onCategoryClick }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (inStore) {
      gsap.to(menuRef.current, {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: "power3.in",
      });
    }
  }, [inStore]);

  const categories = [
    {
      name: "Ready to Eat",
      coordinates: {
        x: 3.6905821535869943,
        y: 1.8791122001088125,
        z: -0.6327958507566027,
      },
      lookAt: {
        x: 3.7344828270461385,
        y: 7.444829894738706e-19,
        z: 4.186836707900574,
      },
    },
    {
      name: "Drinks",
      coordinates: {
        x: 3.6905821535869943,
        y: 1.8791122001088125,
        z: -0.6327958507566027,
      },
      lookAt: {
        x: -1.7344828270461385,
        y: 7.444829894738706e-19,
        z: 4.186836707900574,
      },
    },
    {
      name: "Snacks",
      coordinates: {
        x: 5.6905821535869943,
        y: 1.8791122001088125,
        z: -0.6327958507566027,
      },
      lookAt: {
        x: -30.7344828270461385,
        y: -10.444829894738706e-19,
        z: -80.186836707900574,
      },
    },
    {
      name: "Ice Cream",
      coordinates: {
        x: -5.6905821535869943,
        y: 1.4791122001088125,
        z: -0.6327958507566027,
      },
      lookAt: {
        x: 0.7344828270461385,
        y: 7.444829894738706e-19,
        z: -80.186836707900574,
      },
    },
    {
      name: "Nicotine Products",
      coordinates: {
        x: 4.6905821535869943,
        y: 1.8791122001088125,
        z: -0.6327958507566027,
      },
      lookAt: {
        x: -30.7344828270461385,
        y: 7.444829894738706e-19,
        z: -25.186836707900574,
      },
    },
  ];

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "30px",
        borderRadius: "10px",
        color: "white",
        zIndex: 10,
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>MENU</h2>
      {categories.map((category, index) => (
        <button
          key={index}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onClick={() => onCategoryClick(category.coordinates, category.lookAt)}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default Menu;
