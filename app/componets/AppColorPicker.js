import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

function AppColorPicker({ item, onPress, color }) {
  const borderWidth = item === color ? 10 : 0;
  const borderColor = color === "#fff" ? "#000" : "#fff";

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: item,
            borderWidth: borderWidth,
            borderColor: borderColor,
          },
        ]}
      ></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: 60, height: 50 },
});

export default AppColorPicker;
