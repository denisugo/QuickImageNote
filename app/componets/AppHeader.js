import { useFormikContext } from "formik";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import routes from "../navigation/routes";
import AppButton from "./AppButton";
import AppIconButton from "./AppIconButton";
import AppCustomModal from "./AppCustomModal";
import AppNameImputForm from "./forms/AppNameInputForm";
import themes from "../config/themes";

function AppHeader() {
  const navigation = useNavigation();

  const { setFieldValue, values } = useFormikContext();

  const [visible, setVisible] = useState(false);

  const nameField = "name";

  return (
    <>
      <AppCustomModal
        visible={visible}
        setVisible={setVisible}
        onPress={() => {}}
        backgroundColor={themes.colors.buttonThird}
        // opacity={0.95}
      >
        <AppNameImputForm />
      </AppCustomModal>

      {!visible && (
        <View style={styles.container}>
          <AppIconButton
            style={{
              flex: 0.2,
              ...styles.button,
            }}
            name="home-outline"
            onPress={() => navigation.navigate(routes.HOME_NAVIGATOR)}
          />
          <AppButton
            style={{
              borderWidth: 0,
              flex: 0.6,
            }}
            title={values[nameField]}
            onPress={() => setVisible(true)}
          />
          <AppIconButton
            style={{
              flex: 0.2,
              ...styles.button,
            }}
            name="view-headline"
            onPress={() =>
              navigation.navigate(routes.REARRANGE, {
                values,
                setFieldValue,
              })
            }
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "100%",
    //height: 100,
    //backgroundColor: "tomato",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppHeader;
