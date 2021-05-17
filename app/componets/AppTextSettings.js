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

function AppTextSettings({ onPress, onPressRestore, onPressUpdate, values }) {
  const boldField = "bold";
  const italicField = "italic";
  const outlineField = "outline";
  const upField = "up";
  const textColorfield = "textColor";
  const backgroundColorField = "backgroundColor";

  return (
    //   {/* // <ScrollView contentContainerStyle={styles.container}> */}
    // <TouchableWithoutFeedback>
    <View style={styles.container}>
      <View style={styles.fourButton}>
        <AppButton
          title="B"
          onPress={() => onPress(boldField, !values[boldField])}
          style={{
            backgroundColor: values[boldField] ? themes.colors.button : null,
            borderColor: themes.colors.button,
            flex: 0.25,
          }}
          textStyle={{
            textTransform: "uppercase",
          }}
        />
        <AppButton
          title="i"
          onPress={() => onPress(italicField, !values[italicField])}
          style={{
            backgroundColor: values[italicField]
              ? themes.colors.buttonSecondary
              : null,
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
          onPress={() => onPress(outlineField, !values[outlineField])}
          style={{
            backgroundColor: values[outlineField]
              ? themes.colors.buttonThird
              : null,
            borderColor: themes.colors.buttonThird,
            flex: 0.25,
          }}
          textStyle={{
            textTransform: "uppercase",
            fontWeight: "normal",
          }}
        />
        <AppButton
          title="u"
          onPress={() => onPress(upField, !values[upField])}
          style={{
            backgroundColor: values[upField] ? themes.colors.text : null,
            borderColor: themes.colors.text,
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
              onPress={(itemColor) => onPress(textColorfield, itemColor)}
              color={values[textColorfield]}
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
              onPress={(itemColor) => onPress(backgroundColorField, itemColor)}
              color={values[backgroundColorField]}
            />
          )}
          data={colors.palete}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.twoButtons}>
        <AppButton
          title="restore global"
          onPress={() => {}}
          style={styles.button}
        />
        <AppButton
          title="update global"
          onPress={() => {}}
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
  twoButtons: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    marginBottom: 20,
    borderColor: themes.colors.placeholder,
  },
});

export default AppTextSettings;
