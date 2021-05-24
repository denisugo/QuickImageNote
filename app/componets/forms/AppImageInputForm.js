import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppImageInput from "../AppImageInput";
import routes from "../../navigation/routes";
import keyfields from "../../memory/keyfields";

function AppImageInputForm({ imageUri, index }) {
  const navigation = useNavigation();

  const { setFieldValue, values } = useFormikContext();

  const updatedValue = useRef();
  // const imageField = "image";
  // const textField = "text";
  //console.log("values are ", values);

  const handleChange = (uri) => {
    if (uri) {
      //Returns image from image gallery
      updatedValue.current = values[keyfields.IMAGES];
      updatedValue.current[index] = uri;
      setFieldValue(keyfields.IMAGES, [...updatedValue.current, null]);
      setFieldValue(keyfields.TEXTS, [...values[keyfields.TEXTS], ""]);
    } else {
      //Remove image request
      const imageValue = values[keyfields.IMAGES][index];
      setFieldValue(
        keyfields.IMAGES,
        values[keyfields.IMAGES].filter((imageUri) => imageUri !== imageValue)
      );

      const textValue = values[keyfields.TEXTS][index];
      setFieldValue(
        keyfields.TEXTS,
        values[keyfields.TEXTS].filter((text) => text !== textValue)
      );
    }
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
