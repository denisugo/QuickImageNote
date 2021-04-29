import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
const { createCanvas } = require("canvas");
import Canvas from "react-native-canvas";

function TestImageScreen(props) {
  //   useEffect(() => {
  //     requestPermission();
  //   }, []);

  //   const requestPermission = async () => {
  //     const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (!granted) alert("You need to eanable the permission of Photo library");
  //   };

  //   const handlePress = () => {
  //     selectImage();
  //   };
  //   const selectImage = async () => {
  //     try {
  //       const result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         //quality: 0.5,
  //       });

  //       //if (!result.cancelled) onChangeImage(result.uri);
  //     } catch (error) {
  //       console.log("Error occured while retrieving image", error);
  //     }
  //   };

  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const handleImageRect = async () => {
    const canvas = new Canvas();
    canvas.height = 10;
    canvas.width = 10;
    const context = canvas.getContext("2d");
    context.fillStyle = "purple";
    context.fillRect(0, 0, 100, 300);
    const data = await canvas.toDataURL("image/jpg");
    //setEditedImage(data);
  };

  //   const handleCanvas = (canvas) => {
  //     //canvas.height = 300;
  //     const context = canvas.getContext("2d");
  //     context.fillStyle = "purple";
  //     context.fillRect(0, 0, 100, 300);
  //     //const buffer = canvas.toBuffer("image/png");
  //     const buffer = canvas.toDataURL();
  //     // setEditedImage(buffer);
  //     console.log(buffer);
  //     console.log("buffer");
  //   };

  useEffect(() => {
    console.log(editedImage);
    // Image.getSize("https://picsum.photos/600/300", (w, h) => {
    //   const height = h + h / 10;
    //   const width = w;
    //   console.log(height, width);

    //   context.fillStyle = "#000";
    //   context.fillRect(0, 0, width, height);

    //   context.font = "bold 12pt Menlo";
    //   context.textAlign = "center";
    //   context.textBaseline = "top";

    //   const text = "Hi, Dimon, What How?";

    //   const textX = myImage.width / 2;
    //   const textY = myImage.height + myImage.height / 40;

    //   context.fillStyle = "#fff";
    //   context.fillText(text, textX, textY);
    //});
  }, [editedImage]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="contain" source={image} />

      {/* {false && <Canvas ref={handleCanvas} />} */}
      <TouchableOpacity
        // onPress={() => setImage({ uri: "https://picsum.photos/600/300" })}
        onPress={handleImageRect}
      >
        <View style={styles.button}>
          <Text>Press here</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "tomato",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 600,
    height: 300,
  },
});

export default TestImageScreen;
