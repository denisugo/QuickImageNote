import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
} from "react-native";
import AppButton from "../componets/AppButton";

import AppCustomModal from "../componets/AppCustomModal";
import AppHeader from "../componets/AppHeader";
import AppIconButton from "../componets/AppIconButton";
import AppPreview from "../componets/AppPreview";
import AppCarouselForm from "../componets/forms/AppCarouselForm";
import AppForm from "../componets/forms/AppForm";
import AppNameImputForm from "../componets/forms/AppNameInputForm";
import AppThreeButtonsForm from "../componets/forms/AppThreeButtonsForm";
import themes from "../config/themes";
import routes from "../navigation/routes";

function ImageShareScreen({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const images = route.params ? route.params.images : null;
  const texts = route.params ? route.params.texts : null;
  const name = route.params ? route.params.name : null;
  const textSettings = route.params ? route.params.textSettings : null;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/background-light-edit.png")}
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
      >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
          style={styles.container}
        >
          <View style={styles.innerContainer}>
            <AppForm
              initialValues={{
                name: name && name !== "empty" ? name : "Untitled",
                image: images ? [...images, null] : [null],
                text: texts ? [...texts, ""] : [""],
                textSettings: textSettings,
                position: 0,
              }}
            >
              <AppHeader />

              <AppCarouselForm />

              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {/* <View
                  style={{
                    flex: 0.5,
                  }}
                > */}
                <View style={styles.bottomContainer}>
                  <AppThreeButtonsForm
                    setVisible={setVisible} //for preview
                    setImageUri={setImageUri} //for preview
                    imageUri={imageUri} //for preview
                  />
                </View>
                {/* </View> */}
              </TouchableWithoutFeedback>
            </AppForm>
          </View>
        </KeyboardAvoidingView>

        <AppCustomModal
          visible={visible}
          setVisible={setVisible}
          onPress={() => setImageUri(null)}
          //opacity={0.95}
          //imageUri={imageUri}
        >
          <AppPreview imageUri={imageUri} />
        </AppCustomModal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    //justifyContent: "center",
    flex: 1,
  },
  bottomContainer: {
    ...themes.containerForThreeButtons,
  },
  innerContainer: {
    //paddingTop: "10%",
  },
});

export default ImageShareScreen;
