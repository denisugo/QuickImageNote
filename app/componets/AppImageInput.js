import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";

import AppIcon from "./AppIcon";
import themes from "../config/themes";
import AppActivityIndicator from "../componets/AppActivityIndicator";

function AppImageInput({ imageUri, onChangeImage, onLongPress }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    requestPermission();
  }, []);
  const [loading, setLoading] = useState(false);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to eanable the permission of Photo library");
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
      setLoading(true);
    } else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5, //check it later
      });
      setLoading(false);
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error occured while retrieving image", error);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={() => onLongPress()}
    >
      <View style={styles.container}>
        {!loading && (
          <>
            {!imageUri && (
              <AppIcon
                name="camera"
                size={200}
                iconColor={themes.colors.placeholder}
                backgroundColor={themes.colors.background}
              />
            )}
            {imageUri && (
              <Image style={styles.image} source={{ uri: imageUri }} />
            )}
          </>
        )}
        <AppActivityIndicator visible={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    //...themes.imageOnCard,
    alignItems: "center",
    borderRadius: 20,
    width: "95%",
    height: 300,
    margin: 10,
    justifyContent: "center",
  },
  image: {
    ...themes.imageOnCard,
    // width: "95%",
    // height: 300,
    // overflow: "hidden",
    // borderRadius: 20,
  },
});

export default AppImageInput;
