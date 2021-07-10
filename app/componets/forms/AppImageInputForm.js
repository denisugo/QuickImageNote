import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import RNFS from "react-native-fs";

import AppImageInput from "../AppImageInput";
import routes from "../../navigation/routes";
import keyfields from "../../memory/keyfields";
import { nameAlreadyExists, reStore } from "../../memory/namesStorageHandler";
import { getAllKeys } from "../../memory/useStorage";
import asyncForEach from "../scripts/asyncForEach";

function AppImageInputForm({ imageUri, index }) {
  const navigation = useNavigation();

  const { setFieldValue, values } = useFormikContext();

  const [isChanged, setIsChanged] = useState(false);

  const updateStorage = async () => {
    // await nameAlreadyExists(values, setFieldValue);
    const setValue = () => {};
    reStore(setFieldValue, values, setValue);
    // await reStore(setFieldValue, values, setValue);
    setIsChanged(false);
  };

  useEffect(() => {
    if (isChanged) {
      updateStorage();
    }
  }, [isChanged]);

  const updatedValue = useRef();
  // const imageField = "image";
  // const textField = "text";
  //console.log("values are ", values);

  const handleChange = async (uri) => {
    if (uri) {
      //Returns image from image gallery
      let filename = uri.split("/");
      filename = filename[filename.length - 1];
      filename = "/" + filename;

      const pathPrefix = Platform.OS === "android" ? "file://" : "";

      const path = pathPrefix + RNFS.DocumentDirectoryPath + filename;
      // const path = RNFS.DocumentDirectoryPath + filename;

      try {
        await RNFS.copyFile(uri, path);
        await RNFS.unlink(uri);
      } catch (error) {}

      updatedValue.current = values[keyfields.IMAGES];
      updatedValue.current[index] = path;
      // updatedValue.current[index] = uri;
      setFieldValue(keyfields.IMAGES, [...updatedValue.current, null]);
      setFieldValue(keyfields.TEXTS, [...values[keyfields.TEXTS], ""]);
    } else {
      //Remove image request
      const imageValue = values[keyfields.IMAGES][index];
      setFieldValue(
        keyfields.IMAGES,
        values[keyfields.IMAGES].filter((imageUri) => imageUri !== imageValue)
      );

      try {
        if (imageUri) RNFS.unlink(imageUri); //FileSystem.deleteAsync(imageUri);
      } catch (error) {}

      const textValue = values[keyfields.TEXTS][index];
      setFieldValue(
        keyfields.TEXTS,
        values[keyfields.TEXTS].filter((text) => text !== textValue)
      );
    }

    // if (values[keyfields.UNSAVED]) {
    await nameAlreadyExists(values, setFieldValue);
    //   setFieldValue(keyfields.UNSAVED, false);
    // }

    setIsChanged(true);
  };

  //   const handleRemove = (uri) => {
  //     setFieldValue(
  //       field,
  //       values[field].filter((imageUri) => imageUri !== uri)
  //     );
  //   };
  return (
    <AppImageInput
      imageUri={imageUri}
      onChangeImage={handleChange}
      onLongPress={() =>
        navigation.navigate(routes.REARRANGE, {
          values,
          setFieldValue,
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppImageInputForm;
