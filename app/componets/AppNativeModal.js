import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Image,
  TouchableWithoutFeedback,
  LogBox,
} from "react-native";
import themes from "../config/themes";
import AppActivityIndicator from "./AppActivityIndicator";

LogBox.ignoreLogs([
  "ReactNative.NativeModules.LottieAnimationView.resume",
  "ReactNative.NativeModules.LottieAnimationView.pause",
]);
function AppNativeModal({
  visible = false,
  imageUri,
  setVisible,
  setImageUri,
}) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        setImageUri(null);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.container}>
          <AppActivityIndicator visible={!imageUri} />
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: imageUri }}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.modal,
  },
  image: {
    ...themes.imageOnModale,
    marginVertical: 15,
  },
});

export default AppNativeModal;
