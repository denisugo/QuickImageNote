import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Canvas, { Image as canvasImage } from "react-native-canvas";

function AppCreateImageTest({ src, onImageReady, text }) {
  const [size, setSize] = useState(null);
  const isReady = useRef(false);
  const readyImage = useRef(null);
  const originalText = useRef(null);
  const originalSrc = useRef(null);

  const handleCanvas = (canvas) => {
    if (originalSrc.current !== src) {
      isReady.current = false;
      readyImage.current = null;
    }
    if (canvas) {
      if (size) {
        canvas.height = size.height;
        canvas.width = size.width;
      }
      const context = canvas.getContext("2d");

      const overlayImage = new canvasImage(canvas);
      overlayImage.src = src;
      originalSrc.current = overlayImage.src;
      overlayImage.crossOrigin = "";
      overlayImage.addEventListener("load", () => {
        const canvasSize = {
          width: canvas.width,
          height: canvas.height,
        };
        if (JSON.stringify(canvasSize) !== JSON.stringify(size)) {
          setSize({
            width: overlayImage.width,
            height: overlayImage.height + overlayImage.height / 10,
          });
        } else {
          if (!isReady.current) {
            //Create Background
            context.fillStyle = "purple";
            context.fillRect(0, 0, canvas.width, canvas.height);

            //Create Text
            context.font = "bold 15pt Menlo";
            context.textAlign = "center";
            context.textBaseline = "top";

            const text = "Hi, Dimon, What How?";
            const textX = size.width / 2;
            const textY = size.height - size.height / 20;
            context.fillStyle = "#fff";
            context.fillText(text, textX, textY);

            //Create Image on Canvas
            context.drawImage(
              overlayImage,
              0,
              0,
              overlayImage.width,
              overlayImage.height
            );
            isReady.current = true;
          }
          canvas.toDataURL("image/jpeg").then((data) => {
            if (!readyImage.current) {
              readyImage.current = data.substring(1, data.length - 1);
              onImageReady(readyImage.current);
            }
          });
        }
      });
    }
  };

  return <Canvas style={{ width: 0, height: 0 }} ref={handleCanvas} />;
}

export default AppCreateImageTest;
