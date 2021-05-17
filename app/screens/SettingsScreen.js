import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";

import AppText from "../componets/AppText";
import AppButton from "../componets/AppButton";
import themes from "../config/themes";
import AppColorPicker from "../componets/AppColorPicker";
import colors from "../config/colors";
import AppTextSettings from "../componets/AppTextSettings";

const defaultValues = {
  bold: true,
  italic: false,
  outline: false,
  up: false,
  textColor: "#fff",
  backgroundColor: "#F39C12",
};
// const boldField = "bold";
// const italicField = "italic";
// const outlineField = "outline";
// const upField = "up";
// const textColorfield = "textColor";
// const backgroundColorField = "backgroundColor";

function SettingsScreen({ navigation }) {
  useEffect(() => {
    navigation.addListener("blur", () => {
      // Screen was unfocused
      // Do something
      console.log("Leaving setting screen");
    });
  }, [navigation]);
  const [values, setValues] = useState(defaultValues);

  const updateSettings = (field, value) => {
    const asArray = Object.entries(values);

    // Use `filter()` to filter the key/value array
    const filteredArray = asArray.filter(([key, value]) => key !== field);

    // Convert the key/value array back to an object:
    const filteredObject = Object.fromEntries(filteredArray);
    setValues({ ...filteredObject, [field]: value });
  };

  return (
    <ScrollView>
      <AppTextSettings
        values={values}
        onPress={(field, value) => {
          updateSettings(field, value);
        }}
      />
      {/* <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" />
      <AppColorPicker item="#F39C12" /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default SettingsScreen;
