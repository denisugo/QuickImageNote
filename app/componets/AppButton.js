import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppText from "./AppText";
import themes from "../config/themes";

function AppButton({ title, onPress, style, textStyle }) {
  return (
    // <View style={[styles.button, { ...style }]}>
    <TouchableOpacity
      style={[styles.button, { ...style }]}
      onPress={() => onPress()}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppText style={{ ...textStyle }}>{title}</AppText>
      </View>
    </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  button: {
    ...themes.button,
  },
});

export default AppButton;
