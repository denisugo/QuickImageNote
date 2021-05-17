import React from "react";
import { View, StyleSheet, Image } from "react-native";
import themes from "../config/themes";

import AppActivityIndicator from "./AppActivityIndicator";

function AppPreview({ imageUri }) {
  return (
    <View style={styles.container}>
      <AppActivityIndicator visible={!imageUri} />
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
            source={{ uri: imageUri }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    ...themes.imageOnModale,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppPreview;
