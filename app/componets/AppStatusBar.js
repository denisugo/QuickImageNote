import React from "react";
import { Platform, StatusBar } from "react-native";

import themes from "../config/themes";

function AppStatusBar(props) {
  return (
    <StatusBar
      translucent={true}
      backgroundColor="transparent"
      barStyle={themes.statusBar.style}
    />
  );
}

export default AppStatusBar;
