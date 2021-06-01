import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import keyfields from "../../memory/keyfields";
import { nameAlreadyExists, reStore } from "../../memory/namesStorageHandler";

import AppTextSettings from "../AppTextSettings";

function AppTextSettingsForm(props) {
  const { values, setFieldValue } = useFormikContext();
  // const textSettingField = "textSettings";

  const [isChanged, setIsChanged] = useState(false);

  const updateStorage = async () => {
    // await nameAlreadyExists(values, setFieldValue);
    const setValue = () => {};
    await reStore(setFieldValue, values, setValue);
    setIsChanged(false);
  };
  useEffect(() => {
    if (isChanged) {
      updateStorage();
    }
  }, [isChanged]);

  const updateSettings = (field, value) => {
    const asArray = Object.entries(values[keyfields.TEXT_SETTINGS]);

    // Use `filter()` to filter the key/value array
    const filteredArray = asArray.filter(([key, value]) => key !== field);

    // Convert the key/value array back to an object:
    const filteredObject = Object.fromEntries(filteredArray);
    setFieldValue(keyfields.TEXT_SETTINGS, {
      ...filteredObject,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <AppTextSettings
        values={values[keyfields.TEXT_SETTINGS]}
        onPress={async (field, value) => {
          updateSettings(field, value);
          await nameAlreadyExists(values, setFieldValue);
          setIsChanged(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 40 },
});

export default AppTextSettingsForm;
