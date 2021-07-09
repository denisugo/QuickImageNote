import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FastImage from "react-native-fast-image";
import { launchImageLibrary } from "react-native-image-picker";

import AppIcon from "./AppIcon";
import themes from "../config/themes";
import AppActivityIndicator from "../componets/AppActivityIndicator";
import { addPrefix } from "./scripts/base64Processing";

function AppImageInput({ imageUri, onChangeImage, onLongPress }) {
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
      setLoading(true);
      selectImage();
    } else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        {
          text: "Yes",
          onPress: () => onChangeImage(null),
        },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      // const options = {
      //   // allowsEditing: false,
      //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   quality: 1,
      //   // exif: false,
      //   // base64: false,
      // };
      // const result = await ImagePicker.launchImageLibraryAsync(options);
      // if (!result.cancelled && result.height !== 0) onChangeImage(result.uri);
      // if (result.cancelled) setLoading(false);
      const options = {
        mediaType: "photo",
        quality: 1,
      };
      launchImageLibrary(options, (result) => {
        if (!result.didCancel && result.assets[0].height !== 0)
          onChangeImage(result.assets[0].uri);
        if (result.didCancel) setLoading(false);
      });
    } catch (error) {
      setLoading(false);
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
                name="image-outline"
                size={200}
                iconColor={themes.colors.placeholder}
                backgroundColor={themes.colors.background}
              />
            )}
          </>
        )}

        {imageUri && (
          <FastImage
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            style={styles.image}
            source={{ uri: imageUri, priority: FastImage.priority.high }}
          />
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
    width: "100%",
    height: 250, //300
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
