import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";

import { useFormikContext } from "formik";
import Carousel from "react-native-snap-carousel";

import AppCard from "../../componets/AppCard";

function AppCarouselForm(props) {
  const {
    //setFieldTouched,
    setFieldValue,
    // errors,
    // touched,
    values,
  } = useFormikContext();

  // should be: data = [{image:"", text:""},{image:"", text:""},{image:"", text:""}]
  const data = useRef([]);
  const field = "image";
  const fieldSecondary = "text";
  const fieldThird = "position";

  //Converting into sliced objects
  data.current = [];
  values[field].forEach((imageUri, index) => {
    data.current[index] = {
      image: imageUri,
      text: values[fieldSecondary][index],
    };
  });
  //console.log("Data is ", data.current);

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        //ref={(ref) => (this.carousel = ref)}
        data={data.current}
        sliderWidth={400}
        itemWidth={400}
        //containerCustomStyle={{ flex: 0 }}
        //slideStyle={{ flex: 1 }}
        renderItem={({ item, index }) => (
          <AppCard imageUri={item.image} value={item.text} index={index} />
        )}
        onSnapToItem={(index) => setFieldValue(fieldThird, index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppCarouselForm;
