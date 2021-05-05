import React from "react";
import { StyleSheet, Text } from "react-native";
import themes from "../config/themes";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, { ...style }]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...themes.text,
  },
});

export default AppText;
