import React, { useState } from "react";
import { View, StyleSheet, Image, Button } from "react-native";
import AppCreateImage from "../../componets/AppCreateImage";
import AppCreateImageTest from "../../componets/AppCreateImageTest";

function ImplementationTestScreen(props) {
  const [imageUri, setImageUri] = useState(null);
  //const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AppCreateImageTest
        onImageReady={(image) => setImageUri(image)}
        src={"https://picsum.photos/600/600"}
      />

      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: imageUri }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 400,
  },
});

export default ImplementationTestScreen;
