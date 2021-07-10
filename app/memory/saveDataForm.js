import createThumb from "../componets/scripts/createThumb";
import keyfields from "./keyfields";
import { storeData } from "./useStorage";

export default async (values, setFieldValue) => {
  const key = Date.now().toString();
  setFieldValue(keyfields.KEY, key);
  try {
    const thumb = values[keyfields.IMAGES][0]
      ? await createThumb(100, 1, values[keyfields.IMAGES][0])
      : { uri: null };
    await storeData(key, {
      [keyfields.NAME]: values[keyfields.NAME],
      [keyfields.IMAGES]: values[keyfields.IMAGES],
      [keyfields.TEXTS]: values[keyfields.TEXTS],
      [keyfields.THUMB]: thumb.uri,
      [keyfields.TEXT_SETTINGS]: values[keyfields.TEXT_SETTINGS],
    });
  } catch (error) {}
  return key;
  // await storeData(values[keyfields.NAME], {
  //   [keyfields.IMAGES]: values[keyfields.IMAGES],
  //   [keyfields.TEXTS]: values[keyfields.TEXTS],
  //   [keyfields.THUMB]: values[keyfields.IMAGES][0],
  //   [keyfields.TEXT_SETTINGS]: values[keyfields.TEXT_SETTINGS],
  // });
};
