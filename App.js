import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import ImageShareScreen from "./app/screens/ImageShareScreen";
import ImageScreensNavigator from "./app/navigation/ImageScreensNavigator";
// import { LogBox } from "react-native";

// LogBox.ignoreLogs([
//   "ReactNative.NativeModules.LottieAnimationView.resume",
//   "ReactNative.NativeModules.LottieAnimationView.pause",
//   "Non-serializable values were found in the navigation state. Check:",
// ]);
export default function App() {
  return (
    <NavigationContainer>
      <ImageScreensNavigator />
    </NavigationContainer>
  );
}
