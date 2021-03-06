import { useFormikContext } from "formik";
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import routes from "../navigation/routes";
import AppButton from "./AppButton";
import AppIconButton from "./AppIconButton";
import AppCustomModal from "./AppCustomModal";
import AppNameImputForm from "./forms/AppNameInputForm";
import themes from "../config/themes";
import {
  getAllKeys,
  getData,
  removeData,
  storeData,
} from "../memory/useStorage";
import keyfields from "../memory/keyfields";
import { nameAlreadyExists, reStore } from "../memory/namesStorageHandler";
import saveDataForm from "../memory/saveDataForm";
import visibleImageLoadingContext from "./contexts/visibleImageLoadingContext";

function AppHeader({ setVisible }) {
  const navigation = useNavigation();

  const { setFieldValue, values } = useFormikContext();

  const loading = useContext(visibleImageLoadingContext);
  // console.log(values[keyfields.UNSAVED]);

  // const [visible, setVisible] = useState(false);

  // const [isGoHome, setIsGoHome] = useState(false);
  // // const [isForcedRename, setIsForcedRename] = useState(false);

  // //giving one more rerender
  // const goHome = async () => {
  //   if (isGoHome) {
  //     // if (values[keyfields.ORIGINAL_NAME] !== values[keyfields.NAME]) {
  //     //   // if (!isForcedRename)
  //     //   // else {
  //     //   await saveDataForm(values);

  //     //   //   setIsForcedRename(false);
  //     //   //   await saveDataForm(values);
  //     //   // }
  //     // } else {
  //     await reStore(values[keyfields.KEY], values);
  //     // }
  //     navigation.navigate(routes.HOME_NAVIGATOR);

  //     setIsGoHome(false);
  //   }
  // };

  // useEffect(() => {
  //   goHome();
  // }, [isGoHome]);

  // const nameField = "name";

  // if (visible)
  //   return (
  //     <AppCustomModal
  //       visible={visible}
  //       setVisible={setVisible}
  //       onPress={async () => {
  //         // if (values[keyfields.UNSAVED]) {
  //         await nameAlreadyExists(values, setFieldValue);
  //         //   setFieldValue(keyfields.UNSAVED, false);
  //         // }
  //         const setValue = () => {};
  //         await reStore(setFieldValue, values, setValue);
  //       }}
  //       backgroundColor={themes.colors.buttonThird}
  //     >
  //       <AppNameImputForm />
  //     </AppCustomModal>
  //   );

  return (
    <View style={styles.container}>
      <AppIconButton
        style={{
          flex: 0.2,
          ...styles.button,
        }}
        name="home-outline"
        onPress={async () => {
          //Validates the name value

          // await nameAlreadyExists(values, setFieldValue);

          // setIsGoHome(true); //going to rerender
          // await reStore(values[keyfields.KEY], values);
          let keys = [];

          // do {
          //   keys = await getAllKeys();
          //   console.log(keys.includes(values[keyfields.KEY]));
          // } while (
          //   !keys.includes(values[keyfields.KEY]) &&
          //   values[keyfields.KEY] === "empty"
          // );

          while (
            !keys.includes(values[keyfields.KEY]) &&
            values[keyfields.KEY] === "empty"
          ) {
            keys = await getAllKeys();
          }

          if (!loading)
            if (
              // (values[keyfields.KEY] !== "empty" &&
              //   JSON.stringify(values[keyfields.IMAGES]) !==
              //     JSON.stringify([null])) ||
              values[keyfields.KEY] === "empty" &&
              JSON.stringify(values[keyfields.IMAGES]) ===
                JSON.stringify([null])
            )
              navigation.navigate(routes.HOME_NAVIGATOR);
            else {
              const data = await getData(values[keyfields.KEY]);
              if (data)
                if (
                  (data[keyfields.THUMB] && values[keyfields.IMAGES][0]) ||
                  (!data[keyfields.THUMB] && !values[keyfields.IMAGES][0])
                )
                  navigation.navigate(routes.HOME_NAVIGATOR);
            }

          // else if (
          //   values[keyfields.KEY] !== "empty" &&
          //   JSON.stringify(values[keyfields.IMAGES]) === JSON.stringify([null])
          // ) {
          //   await removeData([values[keyfields.KEY]], () => {}, null, true);
          //   navigation.navigate(routes.HOME_NAVIGATOR);
          // }

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
  );
}

const styles = StyleSheet.create({
  container: {
    // top: 20,
    // position: "absolute",
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
