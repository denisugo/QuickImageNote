import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

import AppText from "../componets/AppText";
import AppButton from "../componets/AppButton";
import themes from "../config/themes";
import AppColorPicker from "../componets/AppColorPicker";
import colors from "../config/colors";
import keyfields from "../memory/keyfields";
import { getAllKeys, getData, storeData } from "../memory/useStorage";

function AppTextSettings({ onPress, onPressRestore, onPressUpdate, values }) {
  // const boldField = "bold";
  // const italicField = "italic";
  // const outlineField = "outline";
  // const topField = "top";
  // const textColorfield = "textColor";
  // const backgroundColorField = "backgroundColor";

  return (
    //   {/* // <ScrollView contentContainerStyle={styles.container}> */}
    // <TouchableWithoutFeedback>
    <View style={styles.container}>
      <View style={styles.fourButton}>
        <AppButton
          title="B"
          onPress={() => onPress(keyfields.BOLD, !values[keyfields.BOLD])}
          // onPress={() => onPress(boldField, !values[boldField])}
          style={{
            backgroundColor: values[keyfields.BOLD]
              ? themes.colors.button
              : null,
            // backgroundColor: values[boldField] ? themes.colors.button : null,
            borderColor: themes.colors.button,
            flex: 0.25,
          }}
          textStyle={{
            textTransform: "uppercase",
          }}
        />
        <AppButton
          title="i"
          onPress={() => onPress(keyfields.ITALIC, !values[keyfields.ITALIC])}
          // onPress={() => onPress(italicField, !values[italicField])}
          style={{
            backgroundColor: values[keyfields.ITALIC]
              ? themes.colors.buttonSecondary
              : null,
            // backgroundColor: values[italicField]
            //   ? themes.colors.buttonSecondary
            //   : null,
            borderColor: themes.colors.buttonSecondary,
            flex: 0.25,
          }}
          textStyle={{
            fontWeight: "normal",
            textTransform: "uppercase",
            fontStyle: "italic",
          }}
        />
        <AppButton
          title="o"
          onPress={() => onPress(keyfields.OUTLINE, !values[keyfields.OUTLINE])}
          // onPress={() => onPress(outlineField, !values[outlineField])}
          style={{
            backgroundColor: values[keyfields.OUTLINE]
              ? themes.colors.buttonThird
              : null,
            // backgroundColor: values[outlineField]
            //   ? themes.colors.buttonThird
            //   : null,
            borderColor: themes.colors.buttonThird,
            flex: 0.25,
          }}
          textStyle={{
            textTransform: "uppercase",
            fontWeight: "normal",
          }}
        />
        <AppButton
          title="t"
          onPress={() => onPress(keyfields.TOP, !values[keyfields.TOP])}
          // onPress={() => onPress(topField, !values[topField])}
          style={{
            backgroundColor: values[keyfields.TOP]
              ? themes.colors.placeholder
              : null,
            // backgroundColor: values[topField] ? themes.colors.text : null,
            borderColor: themes.colors.placeholder,
            flex: 0.25,
          }}
          textStyle={{
            textTransform: "uppercase",
            fontWeight: "normal",
          }}
        />
      </View>
      <AppText>Text color</AppText>
      <View style={styles.flatlist}>
        <FlatList
          horizontal={true}
          renderItem={({ item }) => (
            <AppColorPicker
              item={item}
              onPress={(itemColor) => onPress(keyfields.TEXT_COLOR, itemColor)}
              color={values[keyfields.TEXT_COLOR]}
              // onPress={(itemColor) => onPress(textColorfield, itemColor)}
              // color={values[textColorfield]}
            />
          )}
          data={colors.palete}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <AppText>background color</AppText>
      <View style={styles.flatlist}>
        <FlatList
          horizontal={true}
          renderItem={({ item }) => (
            <AppColorPicker
              item={item}
              onPress={(itemColor) =>
                onPress(keyfields.BACKGROUND_COLOR, itemColor)
              }
              color={values[keyfields.BACKGROUND_COLOR]}
              // onPress={(itemColor) => onPress(backgroundColorField, itemColor)}
              // color={values[backgroundColorField]}
            />
          )}
          data={colors.palete}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.updateButton}>
        {/* <AppButton
          title="restore global"
          onPress={() => {}}
          style={styles.button}
        /> */}
        <AppButton
          title="update global"
          onPress={async () => {
            await storeData(keyfields.GLOBAL_TEXT_SETTINGS, values);
          }}
          style={styles.button}
        />
      </View>
    </View>
    // {/* </TouchableWithoutFeedback> */}
    //  {/* </ScrollView> */}
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
  },
  flatlist: {
    height: 70,
    //marginBottom: 20,
  },
  fourButton: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  updateButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    borderColor: themes.colors.placeholder,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
});

export default AppTextSettings;
