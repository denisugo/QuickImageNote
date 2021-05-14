import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import AppIcon from "./AppIcon";

function AppIconButton({ name, size = 80, iconColor, onPress, style }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ ...style }}>
        <AppIcon name={name} size={size} iconColor={iconColor} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AppIconButton;
