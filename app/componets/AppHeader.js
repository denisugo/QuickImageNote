import { useFormikContext } from "formik";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import routes from "../navigation/routes";
import AppButton from "./AppButton";
import AppIconButton from "./AppIconButton";

function AppHeader(props) {
  const navigation = useNavigation();
  const { setFieldValue, values } = useFormikContext();

  const field = "name";

  return (
    <View style={styles.container}>
      <AppIconButton
        style={{
          flex: 0.2,
          ...styles.button,
          //paddingRight: (Dimensions.get("window").width - 300) / 2,
        }}
        name="home-outline"
        onPress={() => navigation.navigate(routes.HOME_NAVIGATOR)}
      />
      <AppButton
        style={{
          borderWidth: 0,
          flex: 0.6,
        }}
        title={values[field]}
        onPress={() => console.log()}
      />
      <AppIconButton
        style={{
          flex: 0.2,
          ...styles.button,

          //paddingLeft: (Dimensions.get("window").width - 300) / 2,
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
    paddingTop: 20,
    width: "100%",
    height: 100,
    //backgroundColor: "tomato",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppHeader;
