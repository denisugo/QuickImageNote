import * as ImageManipulator from "expo-image-manipulator";

export default async (imageUri) => {
  const base64image = await ImageManipulator.manipulateAsync(imageUri, [], {
    compress: 1,
    format: ImageManipulator.SaveFormat.JPEG,
    base64: true,
  });

  return base64image.base64;
};
