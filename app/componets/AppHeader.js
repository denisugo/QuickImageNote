import { useFormikContext } from "formik";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import routes from "../navigation/routes";
import AppButton from "./AppButton";
import AppIconButton from "./AppIconButton";
import AppCustomModal from "./AppCustomModal";
import AppNameImputForm from "./forms/AppNameInputForm";
import themes from "../config/themes";
import { storeData } from "../memory/useStorage";
import keyfields from "../memory/keyfields";
import { isNameAlreadyExists, reStore } from "../memory/namesStorageHandler";
import saveDataForm from "../memory/saveDataForm";

function AppHeader() {
  const navigation = useNavigation();

  const { setFieldValue, values } = useFormikContext();

  const [visible, setVisible] = useState(false);

  const [isGoHome, setIsGoHome] = useState(false);
  // const [isForcedRename, setIsForcedRename] = useState(false);

  //giving one more rerender
  const goHome = async () => {
    if (isGoHome) {
      // if (values[keyfields.ORIGINAL_NAME] !== values[keyfields.NAME]) {
      //   // if (!isForcedRename)
      //   // else {
      //   await saveDataForm(values);

      //   //   setIsForcedRename(false);
      //   //   await saveDataForm(values);
      //   // }
      // } else {
      await reStore(values[keyfields.KEY], values);
      // }
      navigation.navigate(routes.HOME_NAVIGATOR);

      setIsGoHome(false);
    }
  };

  useEffect(() => {
    goHome();
  }, [isGoHome]);

  // const nameField = "name";

  return (
    <>
      <AppCustomModal
        visible={visible}
        setVisible={setVisible}
        onPress={() => {
          // if (values[keyfields.NAME] !== values[keyfields.ORIGINAL_NAME])
          //   isNameAlreadyExists(values, setFieldValue, setIsForcedRename);
        }}
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
            onPress={async () => {
              //Validates the name value
              await isNameAlreadyExists(
                values,
                setFieldValue
                // setIsForcedRename
              );

              setIsGoHome(true); //going to rerender

              // if (values[keyfields.ORIGINAL_NAME] !== values[keyfields.NAME]) {
              //   await isRenamed(values[keyfields.ORIGINAL_NAME], values);
              // } else {
              //   await saveDataForm(values);
              //   console.log("now here 2", values[keyfields.NAME]);
              // }

              // navigation.navigate(routes.HOME_NAVIGATOR);
              // await storeData(values[keyfields.NAME], {
              //   [keyfields.IMAGES]: values[keyfields.IMAGES],
              //   [keyfields.TEXTS]: values[keyfields.TEXTS],
              //   [keyfields.THUMB]: values[keyfields.IMAGES][0],
              //   [keyfields.TEXT_SETTINGS]: values[keyfields.TEXT_SETTINGS],
              // });
            }}
          />
          <AppButton
            style={{
              borderWidth: 0,
              flex: 0.6,
            }}
            title={values[keyfields.NAME]}
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
