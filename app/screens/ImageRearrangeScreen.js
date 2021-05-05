import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button, LogBox } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import AppListItem from "../componets/AppListItem";

import AppText from "../componets/AppText";
import themes from "../config/themes";
import routes from "../navigation/routes";

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
  const parsedValues = useRef([]);
  const reversedValues = useRef({ image: [], text: [] });

  values[field].forEach((element, index) => {
    if (index !== values[field].length - 1)
      parsedValues.current = [
        ...parsedValues.current,
        { image: values[field][index], text: values[fieldSecondary][index] },
      ];
  });

  const [data, setData] = useState(parsedValues.current);

  useEffect(() => {
    data.forEach((element, index) => {
      reversedValues.current = {
        image: [...reversedValues.current[field], element[field]],
        text: [
          ...reversedValues.current[fieldSecondary],
          element[fieldSecondary],
        ],
      };
    });

    setFieldValue(field, [...reversedValues.current[field], null]);
    setFieldValue(fieldSecondary, [
      ...reversedValues.current[fieldSecondary],
      "",
    ]);
    parsedValues.current = [];
    reversedValues.current = { image: [], text: [] };
  }, [data]);

  return (
    <View style={styles.container}>
      {/* <Button
        title="go back"
        onPress={() => navigation.navigate(routes.IMAGES)}
      />
      <Button
        title="clear "
        onPress={() => route.params.setFieldValue("text", [""])}
      /> */}
      <DraggableFlatList
        data={data}
        renderItem={AppListItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => setData(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.colors.backgroundSecondary,
  },
});

export default ImageRearrangeScreen;
