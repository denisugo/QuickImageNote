import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import rnTextSize from "react-native-text-size";
import RNPhotoManipulator, {
  PhotoManipulator,
} from "react-native-photo-manipulator";
import { Image, View } from "react-native";

import ImageShareScreen from "./app/screens/ImageShareScreen";
import RootNavigator from "./app/navigation/RootNavigator";
import AppStatusBar from "./app/componets/AppStatusBar";
import { initStorage, removeData } from "./app/memory/useStorage";

import keyfields from "./app/memory/keyfields";

export default function App() {
  // const text = "Hi, there...";

  // const fontSpecs = {
  //   fontFamily: "Menlo",
  //   fontSize: 29,
  //   fontStyle: "italic",
  //   fontWeight: "bold",
  // };

  // const getSize = async () => {
  //   const size = await rnTextSize.measure({
  //     text, // text to measure, can include symbols
  //     ...fontSpecs, // RN font specification
  //   });
  //   console.log("size.width", size.width);
  // };
  // getSize();

  // const image = "https://picsum.photos/2000/2000";

  // const [imageUri, setImageUri] = useState(null);

  // const textOptions = [
  //   {
  //     position: { x: 500, y: 300 },
  //     text: text,
  //     textSize: 150,
  //     color: "#0b04a0",
  //     fontName: "Menlo",
  //     thickness: 15,
  //   },
  //   {
  //     position: { x: 500, y: 500 },
  //     text: "Hi Mark",
  //     textSize: 150,
  //     color: "#0b04a0",
  //     fontName: "Menlo",
  //     thickness: 10,
  //   },
  // ];
  // if (!imageUri)
  //   PhotoManipulator.printText(image, textOptions).then((uri) => {
  //     setImageUri(uri);
  //     console.log("URI:", uri);
  //   });

  return (
    <>
      {/* <AppStatusBar />
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image style={{ width: 400, height: 400 }} source={{ uri: imageUri }} />
      </View> */}

      <RootSiblingParent>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </RootSiblingParent>
    </>
  );
}
