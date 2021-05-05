import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import themes from "../config/themes";
import AppIcon from "./AppIcon";
import AppText from "./AppText";

function AppListItem({ item, index, drag, isActive }) {
  const field = "image";
  const fieldSecondary = "text";
  return (
    <TouchableOpacity
      onLongPress={drag}
      style={isActive ? styles.containerIsActive : styles.container}
    >
      <Image style={styles.image} source={{ uri: item[field] }} />
      <AppText numberOfLines={1} style={{ width: styles.container.width / 2 }}>
        {item[fieldSecondary]}
      </AppText>
      <AppIcon name="drag-horizontal-variant" iconColor={themes.colors.text} />
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
    width: 65,
    height: 65,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: "hidden",
    //justifyContent: "flex-start",
  },
});

export default AppListItem;
