import React from "react";
import { View, StyleSheet } from "react-native";
import Canvas from "react-native-canvas";

import { baseToBase } from "./scripts/base64Processing";

function AppCreateBackground({ backgroundColor, setBackgroundUri }) {
  //  Creates only 10x10 base64 JPEG image with monocolor
  const handleCanvas = async (canvas) => {
    try {
      if (canvas) {
        canvas.height = 10;
        canvas.width = 10;

        const context = canvas.getContext("2d");

        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        canvas.toDataURL("image/jpeg").then((data) => {
          setBackgroundUri(baseToBase(data));
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <Canvas style={{ width: 0, height: 0 }} ref={handleCanvas} />;
}

export default AppCreateBackground;
