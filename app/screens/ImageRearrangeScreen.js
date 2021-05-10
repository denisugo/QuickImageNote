import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button, LogBox } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import * as ImageManipulator from "expo-image-manipulator";

import AppListItem from "../componets/AppListItem";
import AppText from "../componets/AppText";
import asyncForEach from "../componets/scripts/asyncForEach";
import themes from "../config/themes";
import routes from "../navigation/routes";
import AppActivityIndicator from "../componets/AppActivityIndicator";
import { getThumbs, restoreData } from "../componets/scripts/thumbGenerator";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state. Check:",
]);

function ImageRearrangeScreen({ route, navigation }) {
  const setFieldValue = (field, value) =>
    route.params.setFieldValue(field, value);
  const values = route.params.values;
  const field = "image";
  const fieldSecondary = "text";
  //now it is values ={image:[], text[]}
  //should be values = [{image, text}, {image, text}]
  // const parsedValues = useRef([]);
  // const reversedValues = useRef({ image: [], text: [] });

  //const [data, setData] = useState(parsedValues.current);

  const [data, setData] = useState();

  // const imageRefactoring = async () => {
  //   await asyncForEach(values[field], async (image, index) => {
  //     if (index !== values[field].length - 1) {
  //       const thumbnail = await ImageManipulator.manipulateAsync(
  //         image,
  //         [{ resize: { width: 100 } }],
  //         {
  //           compress: 1,
  //           format: ImageManipulator.SaveFormat.PNG,
  //         }
  //       );

  //       parsedValues.current = [
  //         ...parsedValues.current,
  //         {
  //           image: values[field][index],
  //           text: values[fieldSecondary][index],
  //           thumbnail: thumbnail.uri,
  //         },
  //       ];
  //     }
  //   });
  //   setData(parsedValues.current);
  // };
  useEffect(() => {
    //imageRefactoring();
    getThumbs(values, field, fieldSecondary, setData);
  }, []);

  useEffect(() => {
    //back parsing
    if (data) {
      restoreData(data, field, fieldSecondary, setFieldValue);
      // data.forEach((element, index) => {
      //   reversedValues.current = {
      //     image: [...reversedValues.current[field], element[field]],
      //     text: [
      //       ...reversedValues.current[fieldSecondary],
      //       element[fieldSecondary],
      //     ],
      //   };
      // });
      // setFieldValue(field, [...reversedValues.current[field], null]);
      // setFieldValue(fieldSecondary, [
      //   ...reversedValues.current[fieldSecondary],
      //   "",
      // ]);
      // parsedValues.current = [];
      // reversedValues.current = { image: [], text: [] };
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Button
        title="go back"
        onPress={() => navigation.navigate(routes.IMAGES)}
      /> */}
        <AppActivityIndicator visible={!data} />
        {data && (
          <DraggableFlatList
            data={data}
            renderItem={AppListItem}
            keyExtractor={(item, index) => index.toString()}
            onDragEnd={({ data }) => setData(data)}
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
