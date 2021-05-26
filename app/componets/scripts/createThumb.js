import * as ImageManipulator from "expo-image-manipulator";

const createThumb = async (size, compress, image) => {
  const thumbnail = await ImageManipulator.manipulateAsync(
    image,
    [{ resize: { width: size } }],
    {
      compress: compress,
      format: ImageManipulator.SaveFormat.PNG,
    }
  );
  return thumbnail;
};
export default createThumb;
