import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button, LogBox } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import * as ImageManipulator from "expo-image-manipulator";
import * as Haptics from "expo-haptics";
import * as FileSystem from "expo-file-system";

import AppListItem from "../componets/AppListItem";
import AppText from "../componets/AppText";
import asyncForEach from "../componets/scripts/asyncForEach";
import themes from "../config/themes";
import routes from "../navigation/routes";
import AppActivityIndicator from "../componets/AppActivityIndicator";
import { getThumbs, restoreData } from "../componets/scripts/thumbGenerator";
import keyfields from "../memory/keyfields";
import { reStore } from "../memory/namesStorageHandler";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state. Check:",
]);

function ImageRearrangeScreen({ route, navigation }) {
  const setFieldValue = (field, value) =>
    route.params.setFieldValue(field, value);
  const values = route.params.values;
  //now it is values ={image:[], text[]}
  //should be values = [{image, text}, {image, text}]

  // const keyfields.IMAGES = "image";
  //const keyfields.TEXTS = "text";

  const [data, setData] = useState(null);

  var lastIndex = 0;

  useEffect(() => {
    //imageRefactoring();
    getThumbs(values, keyfields.IMAGES, keyfields.TEXTS, setData);
  }, []);

  const [isChanged, setIsChanged] = useState(false);
  // console.log(values[keyfields.KEY]);

  useEffect(() => {
    if (isChanged) {
      updateStorage();
    }
  }, [isChanged]);

  useEffect(() => {
    //back parsing
    if (data) {
      restoreData(data, keyfields.IMAGES, keyfields.TEXTS, setFieldValue);
      setIsChanged(true);
    }
  }, [data]);

  useEffect(() => {
    navigation.addListener("blur", () => {
      // Screen was unfocused
      // Do something
      if (data) {
        try {
          asyncForEach(data, async (element) => {
            FileSystem.deleteAsync(element.thumb);
          });
        } catch (error) {}
      }
    });
  }, [navigation, data]);

  const [key, setKey] = useState(null);

  const updateStorage = async () => {
    let extractedValues = values;
    extractedValues[keyfields.TEXTS] = [];
    extractedValues[keyfields.IMAGES] = [];

    extractedValues[keyfields.KEY] = key ? key : values[keyfields.KEY];

    data.forEach((element) => {
      extractedValues[keyfields.TEXTS] = [
        ...extractedValues[keyfields.TEXTS],
        element[keyfields.TEXTS],
      ];
      extractedValues[keyfields.IMAGES] = [
        ...extractedValues[keyfields.IMAGES],
        element[keyfields.IMAGES],
      ];
    });
    extractedValues[keyfields.TEXTS] = [
      ...extractedValues[keyfields.TEXTS],
      "",
    ];
    (extractedValues[keyfields.IMAGES] = [
      ...extractedValues[keyfields.IMAGES],
      null,
    ]),
      await reStore(setFieldValue, values, setKey);
    // await reStore(setFieldValue, extractedValues);
    setIsChanged(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <AppActivityIndicator visible={!data} />
        {data && (
          <DraggableFlatList
            data={data}
            renderItem={AppListItem}
            keyExtractor={(item, index) => index.toString()}
            onDragBegin={(index) => {
              if (index === 0)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onPlaceholderIndexChange={(index) => {
              if (lastIndex !== index && index !== -1) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                lastIndex = index;
              }
            }}
            onDragEnd={({ data }) => {
              setData(data);
              lastIndex = 0;
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.colors.backgroundSecondary,
    flex: 1,
  },
  innerContainer: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 50,
    justifyContent: "center",
  },
});

export default ImageRearrangeScreen;
