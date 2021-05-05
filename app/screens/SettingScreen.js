import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../componets/AppText";

function SettingScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>Setting screen </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingScreen;
