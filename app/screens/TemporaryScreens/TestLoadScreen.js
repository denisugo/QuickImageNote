import React from "react";
import { View, StyleSheet } from "react-native";
import ActivityIndicator from "../../componets/ActivityIndicator";

function TestLoadScreen(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default TestLoadScreen;
