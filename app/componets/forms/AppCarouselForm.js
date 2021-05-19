import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { useFormikContext } from "formik";
import Carousel from "react-native-snap-carousel";

import AppCard from "../../componets/AppCard";

function AppCarouselForm(props) {
  const width = Dimensions.get("screen").width;

  const {
    //setFieldTouched,
    setFieldValue,
    // errors,
    // touched,
    values,
  } = useFormikContext();

  // should be: data = [{image:"", text:""},{image:"", text:""},{image:"", text:""}]
  const data = useRef([]);
  const imageField = "image";
  const textField = "text";
  const positionField = "position";

  //Converting into sliced objects
  data.current = [];
  values[imageField].forEach((imageUri, index) => {
    data.current[index] = {
      image: imageUri,
      text: values[textField][index],
    };
  });
  //console.log("Data is ", data.current);

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        //ref={(ref) => (this.carousel = ref)}
        data={data.current}
        sliderWidth={width}
        itemWidth={width}
        containerCustomStyle={{ paddingBottom: 20 }}
        //slideStyle={{ flex: 1 }}
        renderItem={({ item, index }) => (
          <AppCard imageUri={item.image} value={item.text} index={index} />
        )}
        onSnapToItem={(index) => setFieldValue(positionField, index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppCarouselForm;
