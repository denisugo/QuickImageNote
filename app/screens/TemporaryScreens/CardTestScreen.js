import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import AppCustomModal from "../../componets/AppCustomModal";
import AppCarouselForm from "../../componets/forms/AppCarouselForm";
import AppForm from "../../componets/forms/AppForm";
import AppThreeButtonsForm from "../../componets/forms/AppThreeButtonsForm";
import themes from "../../config/themes";

function CardTestScreen(props) {
  const [visible, setVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  return (
    <>
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
              <View style={styles.bottomContainer}>
                <AppThreeButtonsForm
                  setVisible={setVisible}
                  setImageUri={setImageUri}
                  imageUri={imageUri}
                />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 10,
    backgroundColor: themes.colors.background,
  },
});

export default CardTestScreen;
