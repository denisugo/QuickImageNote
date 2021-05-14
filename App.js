import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import ImageShareScreen from "./app/screens/ImageShareScreen";
import RootNavigator from "./app/navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
