import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppText from "../AppText";

function AppNameImputForm() {
  const { setFieldValue, values } = useFormikContext();

  const updatedValue = useRef();
  const field = "name";

  return (
    <View style={styles.container}>
      <AppText>edit the name below</AppText>
      <AppTextInput
        //onBlur={(text) => console.log(text)}
        onChangeText={(text) => {
          setFieldValue(field, text);
        }}
        value={values[field]}
        //placeholder="write your text here"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    //top: "50%",
  },
});
export default AppNameImputForm;
