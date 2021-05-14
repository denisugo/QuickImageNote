import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../componets/AppText";

function SettingsScreen({ navigation }) {
  useEffect(() => {
    navigation.addListener("blur", () => {
      // Screen was unfocused
      // Do something
      console.log("Leaving setting screen");
    });
  }, [navigation]);

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

export default SettingsScreen;
