import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";

function AppTextImputForm({ index }) {
  const {
    // setFieldTouched,
    // errors,
    // touched,
    setFieldValue,
    values,
  } = useFormikContext();

  const updatedValue = useRef();
  const field = "text";
  //console.log(updatedValue);
  //console.log(values["text"]);
  return (
    <AppTextInput
      //onBlur={() => setFieldTouched(name)}
      onChangeText={(text) => {
        updatedValue.current = values[field];
        updatedValue.current[index] = text;
        setFieldValue(field, updatedValue.current);
      }}
      value={values[field][index]}
      placeholder="Write your text here"
      multiline
      //width={width}
      //{...otherProps}
    />
  );
}

export default AppTextImputForm;
