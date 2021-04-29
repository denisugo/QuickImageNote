import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import AppImageInput from "../AppImageInput";

function AppImageInputForm({ imageUri, index }) {
  const { setFieldValue, values } = useFormikContext();

  const updatedValue = useRef();
  const field = "image";
  const fieldSecondary = "text";
  //console.log("values are ", values);
  const handleChange = (uri) => {
    if (uri) {
      //Returns image from image gallery
      updatedValue.current = values[field];
      updatedValue.current[index] = uri;
      setFieldValue(field, [...updatedValue.current, null]);
      setFieldValue(fieldSecondary, [...values[fieldSecondary], ""]);
    } else {
      //Remove image request
      const imageValue = values[field][index];
      setFieldValue(
        field,
        values[field].filter((imageUri) => imageUri !== imageValue)
      );

      const textValue = values[fieldSecondary][index];
      setFieldValue(
        fieldSecondary,
        values[fieldSecondary].filter((text) => text !== textValue)
      );
    }
  };
  //   const handleRemove = (uri) => {
  //     setFieldValue(
  //       field,
  //       values[field].filter((imageUri) => imageUri !== uri)
  //     );
  //   };
  return <AppImageInput imageUri={imageUri} onChangeImage={handleChange} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default AppImageInputForm;
