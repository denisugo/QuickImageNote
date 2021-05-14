import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
// import * as ImageManipulator from "expo-image-manipulator";
// import { Image as ImageWithThumb } from "react-native-expo-image-cache";

import themes from "../config/themes";
import AppIcon from "./AppIcon";
import AppText from "./AppText";

function AppListItem({ item, index, drag, isActive }) {
  const field = "image";
  const fieldSecondary = "text";
  const fieldThird = "thumbnail";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={drag}
      style={isActive ? styles.containerIsActive : styles.container}
    >
      {/* <Image style={styles.image} source={{ uri: item[field] }} /> */}
      <Image style={styles.image} source={{ uri: item[fieldThird] }} />

      <AppText
        numberOfLines={1}
        style={{
          flex: 0.8,

          // width:
          //   styles.container.width -
          //   styles.image.width * 2 -
          //   styles.image.marginHorizontal * 2,
          // marginRight: styles.image.marginHorizontal,
        }}
      >
        {item[fieldSecondary]}
      </AppText>
      <View
        style={{
          flex: 0.2,
          alignItems: "center",
        }}
      >
        <AppIcon name="menu" iconColor={themes.colors.text} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...themes.listItem,
  },
  containerIsActive: {
    ...themes.listItem,
    ...themes.listItemIsActive,
  },
  image: {
    ...themes.imageOnListItem,
  },
});

export default AppListItem;
