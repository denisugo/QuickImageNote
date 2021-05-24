import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import * as Haptics from "expo-haptics";

import themes from "../config/themes";
import AppText from "./AppText";
import routes from "../navigation/routes";
import AppIcon from "./AppIcon";
import keyfields from "../memory/keyfields";
import { getAllKeys, removeData } from "../memory/useStorage";

function AppImageListItem({ item, navigation }) {
  // const keyfields.IMAGES = "images";
  // const keyields.KEY = "key";
  // const keyfields.TEXTS = "texts";
  // const keyfields.TEXT_SETTINGS = "textSettings";
  // const keyfields.THUMB = "thumb";

  const thumb = item[keyfields.VALUE]
    ? item[keyfields.VALUE][keyfields.THUMB]
    : null;

  return (
    <TouchableOpacity
      onLongPress={() => {
        if (item[keyfields.KEY] !== "empty") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          Alert.alert("Caution", "Are you sure you want to delete it?", [
            {
              text: "No",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async () => {
                await removeData([item[keyfields.KEY]]);
              },
            },
          ]);
        }
      }}
      onPress={() =>
        navigation.navigate(routes.IMAGE_NAVIGATOR, {
          screen: routes.IMAGES,
          params: {
            images: item[keyfields.VALUE][keyfields.IMAGES],
            name: item[keyfields.KEY],
            texts: item[keyfields.VALUE][keyfields.TEXTS],
            textSettings: item[keyfields.VALUE][keyfields.TEXT_SETTINGS],
            // images: item[imageField],
            // name: item[keyField],
            // texts: item[textsField],
            // textSettings: item[textSettingsField],
          },
        })
      }
    >
      <View style={styles.container}>
        {!thumb && <AppIcon name="folder-plus-outline" size={80} />}
        {thumb && <Image style={styles.image} source={{ uri: thumb }} />}
        <AppText numberOfLines={1} style={styles.text}>
          {item[keyfields.KEY]}
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
    fontSize: 15,
    maxWidth: 70,
    paddingTop: 3,
  },
});

export default AppImageListItem;
