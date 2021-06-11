import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppText from "../AppText";
import keyfields from "../../memory/keyfields";
import { getAllKeys } from "../../memory/useStorage";
import { isNameAlreadyExists } from "../../memory/namesStorageHandler";

function AppNameImputForm() {
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  // const nameField = "name";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "position" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <View style={styles.innerContainer}>
        <AppText>edit the name below</AppText>
        <AppTextInput
          // onBlur={() => {
          //   if (values[keyfields.NAME] !== values[keyfields.ORIGINAL_NAME])
          //     isNameAlreadyExists(values, setFieldValue);
          // }}

          onChangeText={(text) => {
            // console.log(values[keyfields.NAME]);
            setFieldValue(keyfields.NAME, text);
          }}
          value={values[keyfields.NAME]}
          //placeholder="write your text here"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",

    //top: "50%",
  },
  innerContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },
});
export default AppNameImputForm;
