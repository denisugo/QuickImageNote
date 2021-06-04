import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";

import ImageShareScreen from "./app/screens/ImageShareScreen";
import RootNavigator from "./app/navigation/RootNavigator";
import AppStatusBar from "./app/componets/AppStatusBar";
import { initStorage, removeData } from "./app/memory/useStorage";

import keyfields from "./app/memory/keyfields";

export default function App() {
  // useEffect(() => {
  //   console.log("AppScreen");
  //   //initStorage();
  // }, []);

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
