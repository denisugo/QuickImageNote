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

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppButton title="Clear All" style={{ borderColor: "tomato" }} />
        <AppButton title="Toggle theme" />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppButton title="buy premium" />
      </View>

      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "flex-end" }}
        >
          <AppText>Our Instagram</AppText>
        </View>

        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <AppText>support us</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
