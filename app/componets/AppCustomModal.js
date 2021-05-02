import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  LogBox,
  Platform,
} from "react-native";

import themes from "../config/themes";
import AppActivityIndicator from "./AppActivityIndicator";

LogBox.ignoreLogs([
  "ReactNative.NativeModules.LottieAnimationView.resume",
  "ReactNative.NativeModules.LottieAnimationView.pause",
]);

function AppCustomModal({
  visible = false,
  imageUri,
  setVisible,
  setImageUri,
}) {
  return (
    visible && (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            setImageUri(null);
            setVisible(false);
          }}
        >
          <View style={styles.innerContainer}>
            <AppActivityIndicator visible={!imageUri} />
            {imageUri && (
              <View style={styles.imageContainer}>
                <Image
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                  //style={styles.image}
                  source={{ uri: imageUri }}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: themes.colors.backgroundThird,
  },
  // image: {
  //   ...themes.imageOnModale,
  // },
  imageContainer: {
    ...themes.imageOnModale,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppCustomModal;
