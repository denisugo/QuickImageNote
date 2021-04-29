import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Canvas, { Image as canvasImage } from "react-native-canvas";

function TestCanvas(props) {
  const [image, setImage] = useState(null);
  const [imageOnCanvasSize, setSize] = useState([]);

  const handleCanvas = async (canvas) => {
    if (canvas !== null) {
      const context = canvas.getContext("2d");

      if (JSON.stringify(imageOnCanvasSize) !== JSON.stringify([])) {
        canvas.width = imageOnCanvasSize[0];
        canvas.height = imageOnCanvasSize[1] + imageOnCanvasSize[1] / 10;

        context.fillStyle = "purple";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = "bold 15pt Menlo";
        context.textAlign = "left";
        context.textBaseline = "top";

        const text = "Hi, Dimon, What How?";
        const textX = imageOnCanvasSize[0] / 2;
        const textY = imageOnCanvasSize[1] + imageOnCanvasSize[1] / 40;

        context.fillStyle = "#fff";
        context.fillText(text, textX, textY);
      }

      const overlayImage = new canvasImage(canvas);
      overlayImage.src = "https://picsum.photos/600/600";
      overlayImage.crossOrigin = "";

      overlayImage.addEventListener("load", async () => {
        console.log("image is loaded");

        if (JSON.stringify(imageOnCanvasSize) === JSON.stringify([]))
          setSize([overlayImage.width, overlayImage.height]);

        context.drawImage(
          overlayImage,
          0,
          0,
          imageOnCanvasSize[0],
          imageOnCanvasSize[1]
        );
        const data = await canvas.toDataURL("image/jpeg");
        const imageData = data.substring(1, data.length - 1);
        if (!image) setImage({ uri: imageData });
      });
    }
  };
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={image} />
      <Canvas style={{ width: 0, height: 0 }} ref={handleCanvas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: "100%",
  },
});

export default TestCanvas;
