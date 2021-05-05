import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import AppCustomModal from "../componets/AppCustomModal";
import AppCarouselForm from "../componets/forms/AppCarouselForm";
import AppForm from "../componets/forms/AppForm";
import AppThreeButtonsForm from "../componets/forms/AppThreeButtonsForm";
import themes from "../config/themes";
import routes from "../navigation/routes";

function ImageShareScreen(props) {
  const [visible, setVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  return (
    <View style={{ backgroundColor: themes.colors.backgroundThird, flex: 1 }}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        style={styles.container}
      >
        <View style={{ paddingTop: 50 }}>
          <AppForm
            initialValues={{
              image: [null],
              text: [""],
              position: 0,
            }}
          >
            <AppCarouselForm />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ flex: 1 }}>
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
});

export default ImageShareScreen;
