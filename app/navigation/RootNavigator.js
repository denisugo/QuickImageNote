import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Easing } from "react-native";

import routes from "./routes";
import HomeScreen from "../screens/HomeScreen";
import ImageShareScreen from "../screens/ImageShareScreen";
import ImageRearrangeScreen from "../screens/ImageRearrangeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const ImageStack = createStackNavigator();

const config = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      mode="card"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    >
      <HomeStack.Screen name={routes.HOME} component={HomeScreen} />
      <HomeStack.Screen name={routes.SETTINGS} component={SettingsScreen} />
    </HomeStack.Navigator>
  );
};

const ImageNavigator = () => {
  return (
    <ImageStack.Navigator
      mode="card"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    >
      <ImageStack.Screen name={routes.IMAGES} component={ImageShareScreen} />
      <ImageStack.Screen
        name={routes.REARRANGE}
        component={ImageRearrangeScreen}
      />
    </ImageStack.Navigator>
  );
};

const RootNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: config,
        close: config,
      },
    }}
  >
    <Stack.Screen name={routes.HOME_NAVIGATOR} component={HomeNavigator} />
    <Stack.Screen name={routes.IMAGE_NAVIGATOR} component={ImageNavigator} />
  </Stack.Navigator>
);

export default RootNavigator;
