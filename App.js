import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import ImageShareScreen from "./app/screens/ImageShareScreen";
import RootNavigator from "./app/navigation/RootNavigator";
import AppStatusBar from "./app/componets/AppStatusBar";
import { initStorage, removeData } from "./app/memory/useStorage";

import keyfields from "./app/memory/keyfields";

export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <>
      <AppStatusBar />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}
