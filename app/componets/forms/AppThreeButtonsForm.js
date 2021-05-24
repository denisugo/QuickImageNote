import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

import themes from "../../config/themes";
import AppButton from "../AppButton";
import AppCreateImage from "../AppCreateImage";
import AppModal from "../AppModal";
import AppCreateImageTest from "../AppCreateImageTest";
import { addPrefix, removePrefix } from "../scripts/base64Processing";
import AppTextSettingsForm from "./AppTextSettingsForm";
import keyfields from "../../memory/keyfields";

function AppThreeButtonsForm({ setVisible, setImageUri, imageUri }) {
  const { values } = useFormikContext();

  // const keyfields.IMAGES = "image";
  // const keyfields.TEXTS = "text";
  // const keyfields.POSITION = "position";
  // const keyfield.TEXT_SETTINGS = "textSettings";

  const backgroundColorField = "backgroundColor";

  const imageUriFromValues = useRef(null);
  const [src, setSrc] = useState(null);
  const [text, setText] = useState(null);
  const [buttonState, setButtonState] = useState(true);
  const [buttonShare, setButtonShare] = useState(false);

  const share = async () => {
    if (imageUri && buttonShare) {
      try {
        const filename = "share.jpg"; // or some other way to generate filename
        const filepath = `${FileSystem.documentDirectory}/${filename}`;
        await FileSystem.writeAsStringAsync(filepath, removePrefix(imageUri), {
          encoding: "base64",
        });
        if (!(await Sharing.isAvailableAsync())) {
          alert(`Uh oh, sharing isn't available on your platform`);
          return;
        }
        await Sharing.shareAsync(filepath, { UTI: "image/jpg" });
      } catch (error) {
        alert(error.message);
      }
      setButtonShare(false);
      setImageUri(null);
    }
  };

  //Share processing here
  useEffect(() => {
    share();
  }, [imageUri, buttonShare]);

  const handleButton = () => {
    Keyboard.dismiss();

    setButtonState(!buttonState);

    imageUriFromValues.current =
      values[keyfields.IMAGES][parseInt(values[keyfields.POSITION])];

    if (imageUriFromValues.current) {
      ImageManipulator.manipulateAsync(
        imageUriFromValues.current,
        [{ resize: { width: 800 } }], //Temporary solution, will not work with huge resolution
        {
          base64: true,
        }
      ).then((image) => {
        setSrc(addPrefix(image));
      });
    } else setSrc(null);

    setText(values[keyfields.TEXTS][parseInt(values[keyfields.POSITION])]);
  };

  const handlePreview = () => {
    handleButton();
    setVisible(true);
  };

  const handleShare = () => {
    //share imageuri
    handleButton();
    setButtonShare(true);
  };

  return (
    <>
      <AppCreateImage
        setImageUri={setImageUri}
        src={src}
        text={text}
        buttonState={buttonState}
        backgroundColor={values[keyfields.TEXT_SETTINGS][backgroundColorField]}
        imageUri={imageUri}
        setSrc={setSrc}
      />

      <ScrollView
      //contentContainerStyle={{ overflow: "hidden" }}
      // style={{ overflow: "hidden" }}
      >
        <TouchableWithoutFeedback>
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <AppButton
                title="Preview"
                onPress={() => handlePreview()}
                style={{
                  flex: 0.33,
                  borderColor: themes.colors.button,
                  //marginLeft: 0,
                  //marginHorizontal: 10,
                }}
              />
              <AppButton
                title="Send All"
                onPress={() => console.log()}
                style={{
                  flex: 0.33,
                  borderColor: themes.colors.buttonSecondary,
                  //marginHorizontal: 10,
                }}
              />
              <AppButton
                title="Send"
                onPress={() => handleShare()}
                style={{
                  flex: 0.33,
                  borderColor: themes.colors.buttonThird,
                  //marginHorizontal: 10,
                  //marginRight: 0,
                }}
              />
            </View>
            {/* <View
              style={{
                alignSelf: "center",
                backgroundColor: themes.colors.placeholder,
                height: 3,
                width: "95%",
              }}
            /> */}
            <AppTextSettingsForm />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.threeButtons,
  },
});

export default AppThreeButtonsForm;
