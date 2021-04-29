import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Canvas, { Image as canvasImage } from "react-native-canvas";
import { baseToBase } from "./scripts/base64Processing";

function AppCreateImage({
  font,
  backgroundColor,
  textColor,
  src,
  text,
  setImageUri,
  buttonState,
  imageUri,
  setSrc,
}) {
  const [size, setSize] = useState(null);
  const readyImage = useRef(null);

  useEffect(() => {
    //setImageUri(null);
    if (!imageUri) {
      readyImage.current = null;
      setSize();
    }
  }, [buttonState]);

  const handleCanvas = (canvas) => {
    if (!readyImage.current) {
      if (canvas) {
        //Random size for initialization
        canvas.height = 150;
        canvas.width = 300;
        if (size) {
          canvas.height = size.height;
          canvas.width = size.width;
        }
        const context = canvas.getContext("2d");

        const overlayImage = new canvasImage(canvas);
        overlayImage.src = src;
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
            //Create Background
            context.fillStyle = "tomato";
            context.fillRect(0, 0, canvas.width, canvas.height);

            //Create Text
            context.font = "bold 15pt Menlo";
            context.textAlign = "center";
            context.textBaseline = "top";

            //const splitted = text.split("\n")[0];
            const textOnImage = text;
            const textX = size.width / 2;
            const textY = size.height - size.height / 15;
            context.fillStyle = "#fff";
            context.fillText(textOnImage, textX, textY);

            //Create Image on Canvas
            context.drawImage(
              overlayImage,
              0,
              0,
              overlayImage.width,
              overlayImage.height
            );

            canvas.toDataURL("image/jpeg").then((data) => {
              readyImage.current = baseToBase(data);
              //if (!imageUri) {
              setImageUri(readyImage.current);
              //console.log("Here");
              setSrc(null);
              // }
              //setSize();
            });
          }
        });
      }
    } //else setImageUri(readyImage.current);
  };
  return <Canvas style={{ width: 0, height: 0 }} ref={handleCanvas} />;
}

export default AppCreateImage;
