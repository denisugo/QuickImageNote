import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Keyboard, KeyboardAvoidingView } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppText from "../AppText";

function AppNameImputForm() {
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const nameField = "name";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <View style={styles.innerContainer}>
        <AppText>edit the name below</AppText>
        <AppTextInput
          //onBlur={(text) => console.log(text)}
          onChangeText={(text) => {
            setFieldValue(nameField, text);
          }}
          value={values[nameField]}
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
