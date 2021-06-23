import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-root-toast";
import Share from "react-native-share";

import themes from "../../config/themes";
import AppButton from "../AppButton";
import AppCreateImage from "../AppCreateImage";
import { addPrefix, removePrefix } from "../scripts/base64Processing";
import AppTextSettingsForm from "./AppTextSettingsForm";
import keyfields from "../../memory/keyfields";
import asyncForEach from "../scripts/asyncForEach";
import AppActivityIndicator from "../AppActivityIndicator";

function AppThreeButtonsForm({ setVisible, setImageUri, imageUri }) {
  const { values } = useFormikContext();

  const imageUriFromValues = useRef(null);
  const [src, setSrc] = useState(null);
  const [text, setText] = useState(null);
  const [buttonState, setButtonState] = useState(true); //Launches AppCreateImage that requires a rerender
  const [buttonShare, setButtonShare] = useState(false);

  const share = async () => {
    if (imageUri && buttonShare) {
      const filename = "Image.jpg"; // or some other way to generate filename
      const filepath = `${FileSystem.documentDirectory}/${filename}`;
      await FileSystem.writeAsStringAsync(filepath, removePrefix(imageUri), {
        encoding: "base64",
      });

      const options = {
        title: "Single image",
        // message: "",
        url: filepath, //imageUri,
        // urls: [filepath, filepath],
        type: "image/jpg",
      };

      try {
        await Share.open({ ...options, failOnCancel: false });
        Toast.show("sent successfully", {
          backgroundColor: themes.colors.success,
          textColor: themes.colors.errorText,
          opacity: 1,
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      } catch (error) {
        // alert(error.message);
        Toast.show("something went wrong, please try again", {
          backgroundColor: themes.colors.error,
          textColor: themes.colors.errorText,
          opacity: 1,
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
      await FileSystem.deleteAsync(filepath);
      // try {
      //   if (!(await Sharing.isAvailableAsync())) {
      //     alert(`Uh oh, sharing isn't available on your platform`);
      //     return;
      //   }
      //   await Sharing.shareAsync(filepath, { UTI: "image/jpg" });
      // } catch (error) {
      //   alert(error.message);
      // }
      setButtonShare(false);
      setImageUri(null);
    }
  };

  //Share processing here
  useEffect(() => {
    share();
  }, [imageUri]);

  //  This function will call on each burron press of three button form exept Share ALL button
  const handleButton = () => {
    Keyboard.dismiss();

    setButtonState(!buttonState);

    imageUriFromValues.current =
      values[keyfields.IMAGES][parseInt(values[keyfields.POSITION])];

    if (imageUriFromValues.current) {
      setText(values[keyfields.TEXTS][parseInt(values[keyfields.POSITION])]);

      ImageManipulator.manipulateAsync(
        imageUriFromValues.current,
        [{ resize: { width: 800 } }], //Temporary solution, will not work with huge resolution
        {
          base64: true,
        }
      ).then((image) => {
        setSrc(addPrefix(image.base64));
      });
    } else {
      Toast.show("No image selected", {
        backgroundColor: themes.colors.error,
        textColor: themes.colors.errorText,
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      setSrc(null);
    }

    // setText(values[keyfields.TEXTS][parseInt(values[keyfields.POSITION])]);
  };

  const handlePreview = () => {
    if (imageUri) setImageUri(null);
    setVisible(true);
    handleButton();
  };

  const handleShare = () => {
    //share imageuri
    setButtonShare(true);
    handleButton();
  };
  //-----------------------------------Share All---------------------------------------------

  const [position, setPosition] = useState(0);
  const [buttonShareAll, setButtonShareAll] = useState(false);
  const [imageUrisFromValues, setImageUrisFromValues] = useState([]);
  const [textsFromValues, setTextsFromValues] = useState([]);
  const [imageUris, setImageUris] = useState([]);

  useEffect(() => {
    if (imageUri && buttonShareAll) {
      setImageUris([...imageUris, imageUri]);
      setImageUri(null);
    }
  }, [imageUri]);

  useEffect(() => {
    if (
      JSON.stringify(imageUrisFromValues) !== JSON.stringify([]) &&
      JSON.stringify(textsFromValues) !== JSON.stringify([])
    ) {
      if (position < imageUrisFromValues.length) {
        setSrc(imageUrisFromValues[position]);
        setText(textsFromValues[position]);
        setButtonState(!buttonState);

        setPosition(position + 1);
      }
      if (imageUris.length === imageUrisFromValues.length) {
        setImageUrisFromValues([]);
        setTextsFromValues([]);

        shareAll();
      }
    }
  }, [imageUrisFromValues, textsFromValues, imageUris]);

  const shareAll = async () => {
    let filenames = [];
    let filepaths = [];

    if (buttonShareAll) {
      await asyncForEach(imageUris, async (element, index) => {
        const filename = "share" + index.toString() + ".jpg";
        const filepath = `${FileSystem.documentDirectory}/${filename}`;
        filenames = [...filenames, filename];
        filepaths = [...filepaths, filepath];

        await FileSystem.writeAsStringAsync(filepath, removePrefix(element), {
          encoding: "base64",
        });
      });

      const options = {
        title: "Collection",
        urls: filepaths,
        type: "image/jpg",
      };

      try {
        await Share.open({ ...options, failOnCancel: false });
        Toast.show("sent successfully", {
          backgroundColor: themes.colors.success,
          textColor: themes.colors.errorText,
          opacity: 1,
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      } catch (error) {
        // alert(error.message);
        Toast.show("something went wrong, please try again", {
          backgroundColor: themes.colors.error,
          textColor: themes.colors.errorText,
          opacity: 1,
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }

      await asyncForEach(filepaths, async (element) => {
        await FileSystem.deleteAsync(element);
      });
      // setIsImageReady(false);

      setImageUris([]);
      setButtonShareAll(false);
      setImageUri(null);
      setPosition(0);
    }
  };

  const handleShareAll = async () => {
    Keyboard.dismiss();

    let imageValues = [];
    let textValues = [];

    await asyncForEach(values[keyfields.IMAGES], async (element, index) => {
      if (index < values[keyfields.IMAGES].length - 1) {
        //no null or "" included

        const image = await ImageManipulator.manipulateAsync(
          element,
          [{ resize: { width: 800 } }], //Temporary solution, will not work with huge resolution
          {
            base64: true,
          }
        );
        imageValues = [...imageValues, addPrefix(image.base64)];
        textValues = [...textValues, values[keyfields.TEXTS][index]];
      }
    });
    if (JSON.stringify(imageValues) !== JSON.stringify([])) {
      setImageUrisFromValues(imageValues);
      setTextsFromValues(textValues);
      setButtonShareAll(true);
    } else {
      Toast.show("Select at least one image", {
        backgroundColor: themes.colors.error,
        textColor: themes.colors.errorText,
        opacity: 1,
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  };
  useEffect(() => {
    if (src) setSrc(null);
  }, [imageUri]);
  //---------------------------------------------------------------------------------------

  if (src)
    return (
      <>
        <AppCreateImage
          setImageUri={setImageUri}
          src={src}
          text={text}
          buttonState={buttonState}
          backgroundColor={
            values[keyfields.TEXT_SETTINGS][keyfields.BACKGROUND_COLOR]
          }
          textColor={values[keyfields.TEXT_SETTINGS][keyfields.TEXT_COLOR]}
          outline={values[keyfields.TEXT_SETTINGS][keyfields.OUTLINE]}
          bold={values[keyfields.TEXT_SETTINGS][keyfields.BOLD]}
          italic={values[keyfields.TEXT_SETTINGS][keyfields.ITALIC]}
          top={values[keyfields.TEXT_SETTINGS][keyfields.TOP]}
          imageUri={imageUri}
          // setSrc={setSrc}
        />

        <View
          style={{
            alignSelf: "center",
            height: 100,
            width: 100,
            justifyContent: "center",
          }}
        >
          <AppActivityIndicator visible={true} />
        </View>
      </>
    );
  return (
    <>
      {/* {src  && (
        <AppCreateImage
          setImageUri={setImageUri}
          src={src}
          text={text}
          buttonState={buttonState}
          backgroundColor={
            values[keyfields.TEXT_SETTINGS][keyfields.BACKGROUND_COLOR]
          }
          textColor={values[keyfields.TEXT_SETTINGS][keyfields.TEXT_COLOR]}
          outline={values[keyfields.TEXT_SETTINGS][keyfields.OUTLINE]}
          bold={values[keyfields.TEXT_SETTINGS][keyfields.BOLD]}
          italic={values[keyfields.TEXT_SETTINGS][keyfields.ITALIC]}
          top={values[keyfields.TEXT_SETTINGS][keyfields.TOP]}
          imageUri={imageUri}
          // setSrc={setSrc}
        />
      )} */}

      {/* <ScrollView
        //contentContainerStyle={{ overflow: "hidden" }}
        // style={{ overflow: "hidden" }}
        showsVerticalScrollIndicator={false}
      > */}
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
              onPress={async () => handleShareAll()}
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
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.threeButtons,
  },
});

export default AppThreeButtonsForm;
