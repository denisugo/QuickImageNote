import React from "react";
import { View, StyleSheet } from "react-native";

import themes from "../config/themes";
import AppImageInput from "./AppImageInput";
import AppTextInput from "./AppTextInput";
import AppText from "./AppText";
import AppTextImputForm from "./forms/AppTextImputForm";
import AppImageInputForm from "./forms/AppImageInputForm";

function AppCard({ imageUri, value, index, of }) {
  return (
    <View style={styles.container}>
      <AppImageInputForm imageUri={imageUri} index={index} />
      {/* <AppImageInput imageUri={imageUri} /> */}
      {/* <View style={{ backgroundColor: themes.colors.placeholder }}>
        <AppText>{index + 1}</AppText>
      </View> */}
      <AppTextImputForm index={index} />
      {/* <AppTextInput placeholder="Text Here" value={value} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...themes.card },
  //textInput: { marginTop: 40 },
});

export default AppCard;
