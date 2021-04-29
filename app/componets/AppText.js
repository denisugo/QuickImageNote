import React from "react";
import { StyleSheet, Text } from "react-native";
import themes from "../config/themes";

function AppText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    ...themes.text,
  },
});

export default AppText;
