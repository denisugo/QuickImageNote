import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  LogBox,
  Text,
} from "react-native";

import themes from "../config/themes";
import AppActivityIndicator from "./AppActivityIndicator";
import AppPreview from "./AppPreview";
import AppText from "./AppText";

LogBox.ignoreLogs([
  "ReactNative.NativeModules.LottieAnimationView.resume",
  "ReactNative.NativeModules.LottieAnimationView.pause",
]);

function AppCustomModal({
  visible = false,
  setVisible,
  onPress,
  //imageUri,
  // text,
  children,
  backgroundColor = themes.colors.backgroundThird,
  opacity = 1,
}) {
  return (
    visible && (
      <View style={styles.container}>
        <View
          style={[
            styles.background,
            { backgroundColor: backgroundColor, opacity: opacity },
          ]}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            onPress();
            setVisible(false);
          }}
        >
          <View style={{ flex: 1 }}>{children}</View>

          {/* <View style={{ flex: 1 }}>
            <AppPreview imageUri={imageUri} />
          </View> */}
        </TouchableWithoutFeedback>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.customModal,
  },
  background: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
});

export default AppCustomModal;
