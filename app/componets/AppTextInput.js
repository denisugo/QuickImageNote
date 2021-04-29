import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import themes from "../config/themes";

function AppTextInput({ width = "95%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={themes.colors.placeholder}
        style={styles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.textInput,
  },
  text: {
    ...themes.text,
  },
});

export default AppTextInput;
