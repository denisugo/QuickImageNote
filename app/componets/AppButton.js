import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppText from "./AppText";
import themes from "../config/themes";

function AppButton({ title, onPress, style }) {
  return (
    <View style={[styles.button, { ...style }]}>
      <TouchableOpacity onPress={() => onPress()}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <AppText>{title}</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    ...themes.button,
  },
});

export default AppButton;
