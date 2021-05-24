import React from "react";
import { StatusBar } from "react-native";

import themes from "../config/themes";

function AppStatusBar(props) {
  return <StatusBar barStyle={themes.statusBar.style} />;
}

export default AppStatusBar;
