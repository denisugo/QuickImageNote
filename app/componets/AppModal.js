import React from "react";
import { StyleSheet, Image, View, LogBox } from "react-native";
import { ModalPortal, BottomModal, ModalContent } from "react-native-modals";
import colors from "../config/colors";
import themes from "../config/themes";
import AppActivityIndicator from "./AppActivityIndicator";
import AppText from "./AppText";

LogBox.ignoreLogs([
  "ReactNative.NativeModules.LottieAnimationView.resume",
  "ReactNative.NativeModules.LottieAnimationView.pause",
]);
function AppModal({ visible, setVisible, imageUri, setImageUri }) {
  return (
    <>
      <ModalPortal />

      <BottomModal
        visible={visible}
        height={0.5}
        width={1}
        onTouchOutside={() => {
          setVisible(false);
          //setImageUri(null);
        }}
        onSwipeOut={() => {
          setVisible(false);
          //setImageUri(null);
        }}
        overlayBackgroundColor={themes.colors.backgroundThird}
      >
        <ModalContent style={styles.modal}>
          <AppActivityIndicator visible={!imageUri} />
          <View style={styles.line} />
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: imageUri }}
          />
        </ModalContent>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    ...themes.imageOnModale,
    marginVertical: 15,
  },
  modal: {
    ...themes.modal,
  },
  line: {
    height: 5,
    width: 50,
    backgroundColor: "#99A3A4",
    borderRadius: 2.5,
    marginBottom: 10,
  },
});

export default AppModal;
