import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  LogBox,
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
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{ uri: imageUri }}
              />
            </View>
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
  image: {
    ...themes.imageOnModale,
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    ...themes.shadow,
    // shadowColor: themes.colors.shadow,
    // shadowOpacity: 1,
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 10,
    // elevation: 20, //Android only
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppCustomModal;
