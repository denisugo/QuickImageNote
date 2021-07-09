import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Platform,
  PixelRatio,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-root-toast";
import Share from "react-native-share";
import rnTextSize from "react-native-text-size";
import { PhotoManipulator } from "react-native-photo-manipulator";
import ImageResizer from "react-native-image-resizer";
import Exif from "react-native-exif";

import themes from "../../config/themes";
import AppButton from "../AppButton";
import AppCreateImage from "../AppCreateImage";
import { addPrefix, removePrefix } from "../scripts/base64Processing";
import AppTextSettingsForm from "./AppTextSettingsForm";
import keyfields from "../../memory/keyfields";
import asyncForEach from "../scripts/asyncForEach";
import AppActivityIndicator from "../AppActivityIndicator";
import AppCreateBackground from "../AppCreateBackground";
import { set } from "react-native-reanimated";
import fontResolver from "../scripts/fontResolver";

function AppThreeButtonsForm({
  setVisible,
  setVisibleAd,
  setImageUri,
  imageUri,
}) {
  const { values } = useFormikContext();

  const [backgroundUri, setBackgroundUri] = useState(null);
  const [loading, setLoading] = useState(null);
  const [size, setSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [position, setPosition] = useState(0);
  const [imageUris, setImageUris] = useState([]);

  //  Flags
  const [preview, setPreview] = useState(null);
  const [share, setShare] = useState(null);
  const [shareAll, setShareAll] = useState(null);

  //  Important constants
  const [marginVertical, setMarginVertical] = useState(0);
  const [marginHorizontal, setMarginHorizontal] = useState(0);
  // const [safeArea, setSafeArea] = useState(0);
  const SYMBOLS_PER_LINE = 40;

  const getSize = (image) => {
    if (Platform.OS === "ios")
      Image.getSize(image, (width, height) => {
        setMarginHorizontal(width * 0.05);
        setMarginVertical(height * 0.025);
        // setSafeArea(height * 0.03);
        setSize({ width: width, height: height });
      });
    else
      Exif.getExif(image).then((msg) => {
        const width = parseInt(msg.ImageWidth);
        const height = parseInt(msg.ImageHeight);
        setMarginHorizontal(width * 0.05);
        setMarginVertical(height * 0.025);
        setSize({ width: width, height: height });
      });
  };

  const getLines = async (text, width, font, fontStyle, fontWeight) => {
    const userLines = text.split("\n");
    // const words = userLines.split(" ");
    let lines = [];

    userLines.forEach((userLine) => {
      const words = userLine.split(" ");
      let line = "";
      let lineLength = 0;

      words.forEach((word) => {
        lineLength = lineLength + word.length + 1;

        // if (/\r|\n/.exec(word)) {
        //   lines = [...lines, line];
        //   lineLength = 0;
        //   line = "";
        // } else
        if (word.length >= SYMBOLS_PER_LINE) {
          const characters = word.split("");
          characters.forEach((character, index) => {
            line = line + character;
            lineLength = line.length;
            if (index !== 0 && index % SYMBOLS_PER_LINE === 0) {
              lines = [...lines, line];
              line = "";
              lineLength = 0;
            }
          });
        } else {
          if (lineLength > SYMBOLS_PER_LINE) {
            lines = [...lines, line];
            line = word;
            lineLength = word.length + 1;
          } else line = line === "" ? word : line + " " + word;
        }
      });
      if (line !== "") lines = [...lines, line];
    });

    // console.warn(lines);

    // Get max length of line
    // let lengths = [];
    // lines.forEach((element) => {
    //   lengths = [...lengths, element.length];
    // });

    // const maxLength = Math.max(...lengths);

    // const lineNumber = lengths.indexOf(maxLength);

    // const bigLine = lines[lineNumber];

    // Get font/text size
    let fontSize = 30;

    let fontSpecs = {
      fontFamily: font,
      fontSize: fontSize,
      fontStyle: fontStyle,
      fontWeight: fontWeight,
    };

    // let textSize = await rnTextSize.measure({
    //   text: bigLine, // text to measure, can include symbols
    //   ...fontSpecs, // RN font specification
    // });

    // fontSize = fontSize * ((width - 2 * marginHorizontal) / textSize.width);
    let lineWidths = [];
    let lineHeights = [];
    await asyncForEach(lines, async (line) => {
      const lineProperties = await rnTextSize.measure({
        text: line, // text to measure, can include symbols
        ...fontSpecs, // RN font specification
        includeFontPadding: false,
        usePreciseWidth: false,
      });
      lineWidths = [...lineWidths, lineProperties.width];
      lineHeights = [...lineHeights, lineProperties.height];
    });

    const maxWidth = Math.max(...lineWidths);
    let maxHeight = Math.max(...lineHeights);

    const transformFactor = (width - 2 * marginHorizontal) / maxWidth;

    // fontSize = fontSize * transformFactor;
    fontSize = fontSize * transformFactor;

    maxHeight = maxHeight * transformFactor;

    let heightOfLines = 0;
    lineHeights.forEach((lineHeight) => {
      heightOfLines = heightOfLines + lineHeight * transformFactor;
    });

    // fontSpecs.fontSize = fontSize;

    // const textWithPadding =
    //   Platform.OS === "android"
    //     ? await rnTextSize.measure({
    //         text: lines[lineHeights.indexOf(maxHeight / transformFactor)], // text to measure, can include symbols
    //         ...fontSpecs, // RN font specification
    //         includeFontPadding: true,
    //         usePreciseWidth: false,
    //       })
    //     : { height: maxHeight };

    // const differenceHeights = textWithPadding.height - maxHeight; // Zero for IOS

    // const safeArea = differenceHeights + heightOfLines * 0.1;
    const safeArea =
      Platform.OS === "android"
        ? lineHeights[0] * transformFactor * 0.33 + heightOfLines * 0.1
        : heightOfLines * 0.1;

    // Get height of additional space
    const height =
      heightOfLines +
      // differenceHeights + //+
      // lines.length * maxHeight +
      // 2 * safeArea +
      heightOfLines * 0.1 * 2 +
      (lines.length - 1) * marginVertical;

    // console.log(
    //   "fontSize",
    //   fontSize,
    //   "transformFactor",
    //   transformFactor,
    //   // "differenceHeights",
    //   // differenceHeights,
    //   "font",
    //   font
    // );

    return {
      height: height,
      lines: lines,
      fontSize: fontSize,
      safeArea: safeArea,
    };
  };

  const combine = async (image, _backgroundUri, text, _size) => {
    // Function combining text + background + image, returns uri as local file

    if (text === "") return image;

    const textColor = values[keyfields.TEXT_SETTINGS][keyfields.TEXT_COLOR];
    const outline = values[keyfields.TEXT_SETTINGS][keyfields.OUTLINE];
    const bold = values[keyfields.TEXT_SETTINGS][keyfields.BOLD];
    const italic = values[keyfields.TEXT_SETTINGS][keyfields.ITALIC];
    const top = values[keyfields.TEXT_SETTINGS][keyfields.TOP];

    const width = _size.width;
    const height = _size.height;

    const textProperties =
      Platform.OS === "android"
        ? await getLines(
            text,
            _size.width,
            fontResolver(text, bold, italic),
            italic ? "normal" : "normal",
            bold ? "normal" : "normal"
          )
        : await getLines(
            text,
            _size.width,
            fontResolver(text),
            italic ? "italic" : "normal",
            bold ? "bold" : "normal"
          );

    const safeArea = textProperties.safeArea;
    const lines = textProperties.lines;

    const spaceHeight = textProperties.height;

    const textSize = textProperties.fontSize;

    const imagePosition = top ? { x: 0, y: spaceHeight } : { x: 0, y: 0 };

    const textPosition = top
      ? {
          x: marginHorizontal,
          y: safeArea,
        }
      : {
          x: marginHorizontal,
          y: height + safeArea,
        };

    //  Resizing of background
    const background = await ImageResizer.createResizedImage(
      _backgroundUri,
      width,
      height + spaceHeight,
      "JPEG",
      10,
      0,
      null,
      false,
      {
        mode: "stretch",
        onlyScaleDown: false,
      }
    );

    // const imageWithBackground = await PhotoManipulator.overlayImage(
    //   background.uri,
    //   image,
    //   imagePosition
    // );

    let textOptions = [];
    lines.forEach((line, index) => {
      textOptions = [
        ...textOptions,
        {
          position: {
            x: textPosition.x,
            y:
              textPosition.y +
              index * (marginVertical + textProperties.fontSize),
          },
          text: line,
          textSize: textSize,
          color: textColor,
          fontName: fontResolver(text, bold, italic),
          thickness: outline ? 4 : 0,
        },
      ];
    });

    // lines.forEach((line, index) => {
    //   textOptions = [
    //     ...textOptions,
    //     {
    //       operation: "text",
    //       options: {
    //         position: {
    //           x: textPosition.x,
    //           y:
    //             textPosition.y +
    //             index * (marginVertical + textProperties.fontSize),
    //         },
    //         text: line,
    //         textSize: textSize,
    //         color: textColor,
    //         fontName: fontResolver(text, bold, italic),
    //         thickness: outline ? 4 : 0,
    //       },
    //     },
    //   ];
    // });

    // const cropRegion = {
    //   x: 0,
    //   y: 0,
    //   width: background.width,
    //   height: background.height,
    // };
    // const targetSize = { width: background.width, height: background.height };
    // const quality = 100;
    // const operations = [
    //   { operation: "overlay", overlay: image, position: imagePosition },
    //   ...textOptions,
    // ];

    // console.log(imagePosition);
    const imageWithBackground = await PhotoManipulator.overlayImage(
      background.uri,
      image,
      imagePosition
    );
    // const uri = await PhotoManipulator.batch(
    //   background.uri,
    //   operations,
    //   cropRegion,
    //   targetSize,
    //   quality
    // );

    const uri = await PhotoManipulator.printText(
      imageWithBackground,
      textOptions
    );

    try {
      FileSystem.deleteAsync(background.uri);
    } catch (error) {}

    return uri;
  };

  const prepareSingleImage = async () => {
    //  Function calls combine() method to combine image + text + background
    const image =
      values[keyfields.IMAGES][parseInt(values[keyfields.POSITION])];
    const text = values[keyfields.TEXTS][parseInt(values[keyfields.POSITION])];
    const combinedImageUri = await combine(image, backgroundUri, text, size);

    setImageUri(combinedImageUri);
  };

  const prepareMultipleImages = async () => {
    //  Function calls combine() method to combine images + text + background
    const images = values[keyfields.IMAGES];
    const texts = values[keyfields.TEXTS];

    let uris = [];

    await asyncForEach(images, async (image, index) => {
      if (image) {
        const combinedImageUri = await combine(
          image,
          backgroundUri,
          texts[index],
          sizes[index]
        );

        uris[index] = combinedImageUri;
      }
    });
    setImageUris(uris);
  };

  const shareSingleImage = async (imageUri) => {
    //  Function handles share menu for single image
    const options = {
      title: "Single image",
      url: imageUri,
      type: "image/jpg",
    };

    try {
      const shareResponse = await Share.open({
        ...options,
        failOnCancel: false,
      });
      if (shareResponse.success)
        Toast.show("sent successfully", {
          backgroundColor: themes.colors.success,
          textColor: themes.colors.errorText,
          opacity: 1,
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });

      setVisibleAd(true);
    } catch (error) {
      Toast.show("something went wrong, please try again", {
        backgroundColor: themes.colors.error,
        textColor: themes.colors.errorText,
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  const shareMultipleImage = async (imageUris) => {
    //  Function handles share menu for multiple images

    const options = {
      title: "Multiple images",
      urls: imageUris,
      type: "image/jpg",
    };

    try {
      const shareResponse = await Share.open({
        ...options,
        failOnCancel: false,
      });
      if (shareResponse.success)
        Toast.show("sent successfully", {
          backgroundColor: themes.colors.success,
          textColor: themes.colors.errorText,
          opacity: 1,
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      setVisibleAd(true);
    } catch (error) {
      Toast.show("something went wrong, please try again", {
        backgroundColor: themes.colors.error,
        textColor: themes.colors.errorText,
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  const handlePreview = async () => {
    // Handles preview button
    Keyboard.dismiss();
    const image =
      values[keyfields.IMAGES][parseInt(values[keyfields.POSITION])];
    if (image !== null) {
      getSize(image);

      setLoading(true);
      setVisible(true);
      setPreview(true);
    } else {
      Toast.show("No image selected", {
        backgroundColor: themes.colors.error,
        textColor: themes.colors.errorText,
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  const handleShare = async () => {
    // Handles share button
    Keyboard.dismiss();
    const image =
      values[keyfields.IMAGES][parseInt(values[keyfields.POSITION])];
    if (image !== null) {
      getSize(image);

      setLoading(true);
      setShare(true);
    } else {
      Toast.show("No image selected", {
        backgroundColor: themes.colors.error,
        textColor: themes.colors.errorText,
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };
  const handleShareAll = async () => {
    // Handles shareAll button
    Keyboard.dismiss();

    const images = values[keyfields.IMAGES];

    if (JSON.stringify(images) !== JSON.stringify([null])) {
      // getSize(image);

      setLoading(true);
      setShareAll(true);
    } else {
      Toast.show("Select at least one image", {
        backgroundColor: themes.colors.error,
        textColor: themes.colors.errorText,
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };

  useEffect(() => {
    // useEffect that is used for preview handling
    if (backgroundUri && preview && size) {
      prepareSingleImage();

      setLoading(null);
      setSize(null);
      setBackgroundUri(null);
      setPreview(null);
    }
  }, [backgroundUri, size]);

  useEffect(() => {
    // useEffect that is used for share handling
    if (backgroundUri && share && size) {
      prepareSingleImage();
    }
  }, [backgroundUri, size]);

  useEffect(() => {
    // useEffect that is used for share handling, starts share menu
    if (imageUri && share) {
      shareSingleImage(imageUri);
      setLoading(null);
      setImageUri(null);
      try {
        FileSystem.deleteAsync(imageUri);
      } catch (error) {}
      setShare(null);
      setSize(null);
      setBackgroundUri(null);
    }
  }, [imageUri]);

  useEffect(() => {
    // useEffect that is used for shareAll handling, sets sizes of all images

    if (shareAll) {
      const images = values[keyfields.IMAGES];
      if (size !== null) {
        setSizes([...sizes, size]);
        setSize(null);
      }
      if (position < images.length - 1) {
        getSize(images[position]);
        setPosition(position + 1);
      }
    }
  }, [size, shareAll]);

  useEffect(() => {
    // useEffect that is used for shareAll handling, calls preparation of all images with combine()
    const images = values[keyfields.IMAGES];

    if (shareAll && sizes.length === images.length - 1 && backgroundUri) {
      prepareMultipleImages();
    }
  }, [sizes, shareAll, backgroundUri]);

  useEffect(() => {
    // useEffect that is used for shareAll handling, calls shareAll menu
    const images = values[keyfields.IMAGES];

    if (
      shareAll &&
      imageUris.length === images.length - 1 &&
      JSON.stringify(imageUris) !== JSON.stringify([])
    ) {
      shareMultipleImage(imageUris);

      setLoading(null);
      setImageUris([]);
      try {
        imageUris.forEach((element) => {
          FileSystem.deleteAsync(element);
        });
      } catch (error) {}
      setSizes([]);
      setShareAll(null);
      setPosition(0);
      setBackgroundUri(null);
    }
  }, [imageUris, shareAll]);

  if (loading)
    return (
      <View
        style={{
          alignSelf: "center",
          height: 100,
          width: 100,
          justifyContent: "center",
        }}
      >
        <AppCreateBackground
          backgroundColor={
            values[keyfields.TEXT_SETTINGS][keyfields.BACKGROUND_COLOR]
          }
          setBackgroundUri={setBackgroundUri}
        />

        <AppActivityIndicator visible={true} />
      </View>
    );

  return (
    <>
      <TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <AppButton
              title="Preview"
              onPress={() => handlePreview()}
              style={{
                flex: 0.33,
                borderColor: themes.colors.button,
                //marginLeft: 0,
                //marginHorizontal: 10,
              }}
            />
            <AppButton
              title="Send All"
              onPress={async () => handleShareAll()}
              style={{
                flex: 0.33,
                borderColor: themes.colors.buttonSecondary,
                //marginHorizontal: 10,
              }}
            />
            <AppButton
              title="Send"
              onPress={() => handleShare()}
              style={{
                flex: 0.33,
                borderColor: themes.colors.buttonThird,
                //marginHorizontal: 10,
                //marginRight: 0,
              }}
            />
          </View>

          <AppTextSettingsForm />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.threeButtons,
  },
});

export default AppThreeButtonsForm;
