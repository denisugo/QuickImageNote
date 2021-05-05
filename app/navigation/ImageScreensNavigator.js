import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "../navigation/routes";
import ImageShareScreen from "../screens/ImageShareScreen";
import ImageRearrangeScreen from "../screens/ImageRearrangeScreen";
import { Easing } from "react-native";

const Stack = createStackNavigator();
const config = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const ImageScreensNavigator = () => (
  <Stack.Navigator
    mode="card"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: "horizontal",
      //gestureResponseDistance: 300,
      transitionSpec: {
        open: config,
        close: config,
      },
    }}
  >
    <Stack.Screen name={routes.IMAGES} component={ImageShareScreen} />
    <Stack.Screen name={routes.REARRANGE} component={ImageRearrangeScreen} />
  </Stack.Navigator>
);

export default ImageScreensNavigator;
