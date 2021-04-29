import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

import themes from "../../config/themes";
import AppButton from "../AppButton";
import AppCreateImage from "../AppCreateImage";
import AppModal from "../AppModal";
import AppCreateImageTest from "../AppCreateImageTest";
import { addPrefix, removePrefix } from "../scripts/base64Processing";

function AppThreeButtonsForm({ setVisible, setImageUri, imageUri }) {
  const { values } = useFormikContext();

  const field = "image";
  const fieldSecondary = "text";
  const fieldThird = "position";

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

    imageUriFromValues.current = values[field][parseInt(values[fieldThird])];

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

    setText(values[fieldSecondary][parseInt(values[fieldThird])]);
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
    <View style={styles.container}>
      <AppCreateImage
        setImageUri={setImageUri}
        src={src}
        text={text}
        buttonState={buttonState}
        imageUri={imageUri}
        setSrc={setSrc}
      />

      <AppButton
        title="Preview"
        onPress={() => handlePreview()}
        style={{
          backgroundColor: themes.colors.button,
          marginHorizontal: 10,
        }}
      />
      <AppButton
        title="Send All"
        onPress={() => console.log()}
        style={{
          backgroundColor: themes.colors.buttonSecondary,
          marginHorizontal: 10,
        }}
      />
      <AppButton
        title="Send"
        onPress={() => handleShare()}
        style={{
          backgroundColor: themes.colors.buttonThird,
          marginHorizontal: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.threeButtons,
  },
});

export default AppThreeButtonsForm;