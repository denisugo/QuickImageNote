import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import AlertAsync from "react-native-alert-async";
import * as FileSystem from "expo-file-system";

import AppText from "../componets/AppText";
import AppIcon from "../componets/AppIcon";
import AppButton from "../componets/AppButton";
import themes, { colorScheme } from "../config/themes";
import AppColorPicker from "../componets/AppColorPicker";
import colors from "../config/colors";
import AppTextSettings from "../componets/AppTextSettings";
import { createList, getAllKeys, removeData } from "../memory/useStorage";
import keyfields from "../memory/keyfields";

// const defaultValues = {
//   bold: true,
//   italic: false,
//   outline: false,
//   up: false,
//   textColor: "#fff",
//   backgroundColor: "#F39C12",
// };
// const boldField = "bold";
// const italicField = "italic";
// const outlineField = "outline";
// const upField = "up";
// const textColorfield = "textColor";
// const backgroundColorField = "backgroundColor";

function SettingsScreen({ navigation, route }) {
  const storageUsed = route.params.storageUsed;
  const setStorageUsed = (value) => route.params.setStorageUsed(value);

  const supportLink = "https://ko-fi.com";
  const followUsLink = "https://www.instagram.com/night_sky_soft/";

  // useEffect(() => {
  //   navigation.addListener("blur", () => {
  //     // Screen was unfocused
  //     // Do something
  //     console.log("Leaving setting screen");
  //   });
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <AppButton
          title="Clear All"
          style={{ ...themes.clearAllButton }}
          textStyle={{ ...themes.clearAllButtonText }}
          onPress={async () => {
            await AlertAsync(
              "Clear all",
              "Are you sure you want to delete all collections?",
              [
                {
                  text: "Yes",
                  // onPress: () => {
                  //   console.log("delete");
                  // },
                  onPress: async () => {
                    // const data = await createList();
                    let keys = await getAllKeys();

                    // console.log(keys);
                    keys = keys.filter(
                      (key) => key !== keyfields.GLOBAL_TEXT_SETTINGS
                    );
                    keys = keys.filter((key) => key !== keyfields.SETTINGS);
                    keys = keys.filter((key) => key !== keyfields.EMPTY);

                    await removeData(keys, setStorageUsed, storageUsed, true);
                    // await removeData(keys);
                    // setStorageUsed(true); //calls a rerender on homescreen
                  },
                },
                { text: "No", style: "cancel" },
              ]
            );
          }}
        />
        {/* {colorScheme === "dark" && (
          <View style={{ paddingTop: 15 }}>
            <AppButton title="light off" />
          </View>
        )} */}
      </View>

      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {/* <AppIcon
            name="star-four-points-outline"
            size={100}
            iconColor={themes.colors.premium}
          />
          <AppButton title="buy premium" style={{ ...themes.premiumButton }} />
          <AppIcon
            name="star-four-points-outline"
            size={100}
            iconColor={themes.colors.premium}
          /> */}
        </View>
      </View>

      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            onPress={async () => {
              await Linking.openURL(followUsLink);
            }}
          >
            <AppText>our instagram</AppText>
          </TouchableOpacity>
        </View>

        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={async () => {
              await Linking.openURL(supportLink);
            }}
          >
            <AppText>support us</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.backgroundSecondary,
  },
});

export default SettingsScreen;
