import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import themes from "../config/themes";
import AppText from "./AppText";
import routes from "../navigation/routes";

function AppImageListItem({ item, navigation }) {
  const field = "images";
  const fieldSecondary = "key";
  const fieldThird = "texts";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.IMAGE_NAVIGATOR, {
          screen: routes.IMAGES,
          params: {
            images: item[field],
            name: item[fieldSecondary],
            texts: item[fieldThird],
          },
        })
      }
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item[field][0] }} />
        <AppText numberOfLines={1} style={styles.text}>
          {item[fieldSecondary]}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: themes.colors.button,
    borderRadius: 20,
    height: 115,
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 20,
    width: 90,
  },
  image: {
    borderRadius: 20,
    height: 80,
    overflow: "hidden",
    paddingTop: 5,
    width: 80,
  },
  text: {
    maxWidth: 70,
  },
});

export default AppImageListItem;
