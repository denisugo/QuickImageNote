import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import themes from "../config/themes";
import AppText from "./AppText";
import routes from "../navigation/routes";
import AppIcon from "./AppIcon";

function AppImageListItem({ item, navigation }) {
  const imageField = "images";
  const keyField = "key";
  const textsField = "texts";
  const textSettingsField = "textSettings";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.IMAGE_NAVIGATOR, {
          screen: routes.IMAGES,
          params: {
            images: item[imageField],
            name: item[keyField],
            texts: item[textsField],
            textSettings: item[textSettingsField],
          },
        })
      }
    >
      <View style={styles.container}>
        {!item[imageField] && <AppIcon name="folder-plus-outline" size={80} />}
        {item[imageField] && (
          <Image style={styles.image} source={{ uri: item[imageField][0] }} />
        )}
        <AppText numberOfLines={1} style={styles.text}>
          {item[keyField]}
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
    ...themes.shadow,
  },
  image: {
    borderRadius: 20,
    height: 80,
    overflow: "hidden",
    //paddingTop: 5,
    width: 80,
  },
  text: {
    maxWidth: 70,
  },
});

export default AppImageListItem;
