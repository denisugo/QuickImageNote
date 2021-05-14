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
import AppCarouselForm from "../componets/forms/AppCarouselForm";
import AppForm from "../componets/forms/AppForm";
import AppThreeButtonsForm from "../componets/forms/AppThreeButtonsForm";
import themes from "../config/themes";
import routes from "../navigation/routes";

function ImageShareScreen({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const images = route.params ? route.params.images : null;
  const texts = route.params ? route.params.texts : null;
  const name = route.params ? route.params.name : null;

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
                name: name ? name : "Untitled",
                image: images ? [...images, null] : [null],
                text: texts ? [...texts, ""] : [""],
                position: 0,
              }}
            >
              <AppHeader />
              <AppCarouselForm />
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View style={styles.bottomContainer}>
                    <AppThreeButtonsForm
                      setVisible={setVisible}
                      setImageUri={setImageUri}
                      imageUri={imageUri}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </AppForm>
          </View>
        </KeyboardAvoidingView>

        <AppCustomModal
          visible={visible}
          setVisible={setVisible}
          imageUri={imageUri}
          setImageUri={setImageUri}
        />
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
