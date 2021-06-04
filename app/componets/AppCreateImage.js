import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Canvas, { Image as canvasImage } from "react-native-canvas";
import { baseToBase } from "./scripts/base64Processing";
import { placeText, refactoredText } from "./scripts/textRefactoring";

function AppCreateImage({
  font,
  backgroundColor = "#52BE80",
  bold = true,
  italic = false,
  outline = false,
  top = false,
  textColor = "#ECF0F1",
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

  const handleCanvas = async (canvas) => {
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
        overlayImage.addEventListener("load", async () => {
          const [fontSize, space] = await refactoredText(
            text,
            context,
            overlayImage.width,
            bold,
            italic
          );

          const canvasSize = {
            width: canvas.width,
            height: canvas.height,
          };

          if (JSON.stringify(canvasSize) !== JSON.stringify(size)) {
            setSize({
              width: overlayImage.width,
              height: overlayImage.height + space, //overlayImage.height / 10,
            });
          } else {
            //Create Background
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            //Create Text
            await placeText(
              context,
              text,
              size,
              fontSize,
              space,
              textColor,
              outline,
              bold,
              italic,
              top
            );

            //Create Image on Canvas
            let y = 0;
            if (top) y = space;

            context.drawImage(
              overlayImage,
              0,
              y, // 0
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
