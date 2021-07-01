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

  // setSrc,
}) {
  try {
    // console.log(src ? "src" : "null");
    // const [size, setSize] = useState(null);
    // const readyImage = useRef(null);

    // useEffect(() => {
    //   if (!imageUri) {
    //     // readyImage.current = null;
    //     // setSize();
    //   }
    // }, [buttonState]);

    // const handleCanvas = async (canvas) => {
    //   if (!readyImage.current) {
    //     if (canvas) {
    //       //Random size for initialization
    //       canvas.height = 150;
    //       canvas.width = 300;
    //       if (size) {
    //         canvas.height = size.height;
    //         canvas.width = size.width;
    //       }
    //       const context = canvas.getContext("2d");
    //       let overlayImage = new canvasImage(canvas);
    //       overlayImage.src = src;
    //       overlayImage.crossOrigin = "";

    //       overlayImage.addEventListener("load", async () => {
    //         const [fontSize, space] = await refactoredText(
    //           text,
    //           context,
    //           overlayImage.width,
    //           bold,
    //           italic
    //         );

    //         const canvasSize = {
    //           width: canvas.width,
    //           height: canvas.height,
    //         };

    //         if (JSON.stringify(canvasSize) !== JSON.stringify(size)) {
    //           setSize({
    //             width: overlayImage.width,
    //             height: overlayImage.height + space, //overlayImage.height / 10,
    //           });
    //         } else {
    //           //Create Background
    //           context.fillStyle = backgroundColor;
    //           context.fillRect(0, 0, canvas.width, canvas.height);

    //           //Create Text
    //           await placeText(
    //             context,
    //             text,
    //             size,
    //             fontSize,
    //             space,
    //             textColor,
    //             outline,
    //             bold,
    //             italic,
    //             top
    //           );

    //           //Create Image on Canvas
    //           let y = 0;
    //           if (top) y = space;

    //           context.drawImage(
    //             overlayImage,
    //             0,
    //             y, // 0
    //             overlayImage.width,
    //             overlayImage.height
    //           );

    //           canvas.toDataURL("image/jpeg").then((data) => {
    //             readyImage.current = baseToBase(data);

    //             setImageUri(readyImage.current);

    //           });
    //         }
    //       });
    //     }
    //   }
    // };

    //  FLAGS
    const [imageSizeFlag, setImageSizeFlag] = useState(null);
    const [textSpaceFlag, setTextSpaceFlag] = useState(null);
    const [fontSizeFlag, setFontSizeFlag] = useState(null);
    const [splittedFlag, setSplittedFlag] = useState(null);

    //  Canvas Handlers
    if (!imageSizeFlag) {
      Image.getSize(src, (width, height) =>
        setImageSizeFlag({ width: width, height: height })
      );
    }

    const handleTextCanvas = async (canvas) => {
      if (canvas) {
        if (imageSizeFlag && !fontSizeFlag) {
          const context = canvas.getContext("2d");
          const [fontSize, space, splitted] = await refactoredText(
            text,
            context,
            imageSizeFlag.width,
            bold,
            italic
          );
          setTextSpaceFlag(space);
          setFontSizeFlag(fontSize);
          setSplittedFlag(splitted);
        }
      }
    };

    const handleCanvas = async (canvas) => {
      if (imageSizeFlag && fontSizeFlag) {
        if (canvas) {
          let size = {
            width: imageSizeFlag.width,
            height: imageSizeFlag.height + textSpaceFlag,
          };
          canvas.height = size.height;
          canvas.width = size.width;

          const context = canvas.getContext("2d");
          let overlayImage = new canvasImage(canvas);
          overlayImage.src = src;
          overlayImage.crossOrigin = "";

          overlayImage.addEventListener("load", async () => {
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            //Create Text
            await placeText(
              context,
              text,
              size,
              fontSizeFlag,
              textSpaceFlag,
              splittedFlag,
              textColor,
              outline,
              bold,
              italic,
              top
            );

            //Create Image on Canvas
            let y = 0;
            if (top) y = textSpaceFlag;

            context.drawImage(
              overlayImage,
              0,
              y,
              overlayImage.width,
              overlayImage.height
            );

            canvas.toDataURL("image/jpeg").then((data) => {
              // setFontSizeFlag(null);
              // setImageSizeFlag(null);
              // setSplittedFlag(null);
              // setTextSpaceFlag(null);
              setImageUri(baseToBase(data));
            });
          });
        }
      }
    };

    return (
      <>
        {/* Main canvas */}
        <Canvas style={{ width: 0, height: 0 }} ref={handleCanvas} />

        {/*Canvas for text calculations*/}
        <Canvas style={{ width: 0, height: 0 }} ref={handleTextCanvas} />
      </>
    );
  } catch (error) {}
}

export default AppCreateImage;
