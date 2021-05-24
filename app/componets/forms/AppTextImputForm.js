import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import keyfields from "../../memory/keyfields";

function AppTextImputForm({ index }) {
  const {
    // setFieldTouched,
    // errors,
    // touched,
    setFieldValue,
    values,
  } = useFormikContext();

  const updatedValue = useRef();
  // const textField = "text";
  //console.log(updatedValue);
  //console.log(values["text"]);

  return (
    <AppTextInput
      //onBlur={() => setFieldTouched(name)}
      onChangeText={(text) => {
        updatedValue.current = values[keyfields.TEXTS];
        updatedValue.current[index] = text;
        setFieldValue(keyfields.TEXTS, updatedValue.current);
      }}
      value={values[keyfields.TEXTS][index]}
      placeholder="write your text here"
      multiline
      //width={width}
      //{...otherProps}
    />
  );
}

export default AppTextImputForm;
