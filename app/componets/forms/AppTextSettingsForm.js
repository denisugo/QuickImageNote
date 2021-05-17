import { useFormikContext } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";

import AppTextSettings from "../AppTextSettings";

function AppTextSettingsForm(props) {
  const { values, setFieldValue } = useFormikContext();
  const textSettingField = "textSettings";

  const updateSettings = (field, value) => {
    const asArray = Object.entries(values[textSettingField]);

    // Use `filter()` to filter the key/value array
    const filteredArray = asArray.filter(([key, value]) => key !== field);

    // Convert the key/value array back to an object:
    const filteredObject = Object.fromEntries(filteredArray);
    setFieldValue(textSettingField, { ...filteredObject, [field]: value });
  };

  return (
    <View style={styles.container}>
      <AppTextSettings
        values={values[textSettingField]}
        onPress={(field, value) => {
          updateSettings(field, value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 40 },
});

export default AppTextSettingsForm;
