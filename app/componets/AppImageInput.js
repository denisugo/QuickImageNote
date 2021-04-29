import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppIcon from "./AppIcon";
import themes from "../config/themes";
import colors from "../config/colors";

function AppImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to eanable the permission of Photo library");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error occured while retrieving image", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <AppIcon
            name="camera"
            size={200}
            iconColor={themes.colors.background}
            backgroundColor={colors.lightTheme.backgroundThird}
          />
        )}
        {imageUri && (
          <Image
            //resizeMode="center"
            style={styles.image}
            source={{ uri: imageUri }}
          />
        )}
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
    width: "95%",
    height: 300,
    overflow: "hidden",
    borderRadius: 20,
  },
});

export default AppImageInput;
