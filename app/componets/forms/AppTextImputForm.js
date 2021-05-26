import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import keyfields from "../../memory/keyfields";
import { nameAlreadyExists, reStore } from "../../memory/namesStorageHandler";

function AppTextImputForm({ index }) {
  const {
    // setFieldTouched,
    // errors,
    // touched,
    setFieldValue,
    values,
  } = useFormikContext();

  const [isChanged, setIsChanged] = useState(false);

  const updateStorage = async () => {
    await nameAlreadyExists(values, setFieldValue);
    const setValue = () => {};
    await reStore(setFieldValue, values, setValue);
    setIsChanged(false);
  };

  useEffect(() => {
    if (isChanged) {
      updateStorage();
    }
  }, [isChanged]);

  const updatedValue = useRef();
  // const textField = "text";
  //console.log(updatedValue);
  //console.log(values["text"]);

  return (
    <AppTextInput
      //onBlur={() => setFieldTouched(name)}
      onChangeText={async (text) => {
        updatedValue.current = values[keyfields.TEXTS];
        updatedValue.current[index] = text;
        setFieldValue(keyfields.TEXTS, updatedValue.current);

        // if (values[keyfields.UNSAVED]) {
        await nameAlreadyExists(values, setFieldValue);
        //   setFieldValue(keyfields.UNSAVED, false);
        // }
        setIsChanged(true);
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
