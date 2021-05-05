import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../componets/AppText";

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>Home Screen</AppText>
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

export default HomeScreen;
