import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";

import RootNavigator from "./app/navigation/RootNavigator";
import AppStatusBar from "./app/componets/AppStatusBar";

export default function App() {
  return (
    <>
      <AppStatusBar />

      <RootSiblingParent>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </RootSiblingParent>
    </>
  );
}
