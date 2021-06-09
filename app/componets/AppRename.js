import { useFormikContext } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";
import themes from "../config/themes";

import { nameAlreadyExists, reStore } from "../memory/namesStorageHandler";
import AppCustomModal from "./AppCustomModal";
import AppNameImputForm from "./forms/AppNameInputForm";

function AppRename({ visible, setVisible }) {
  const { setFieldValue, values } = useFormikContext();
  return (
    <AppCustomModal
      visible={visible}
      setVisible={setVisible}
      onPress={async () => {
        // if (values[keyfields.UNSAVED]) {
        await nameAlreadyExists(values, setFieldValue);
        //   setFieldValue(keyfields.UNSAVED, false);
        // }
        const setValue = () => {};
        await reStore(setFieldValue, values, setValue);
      }}
      backgroundColor={themes.colors.buttonThird}
    >
      <AppNameImputForm />
    </AppCustomModal>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppRename;
