import keyfields from "./keyfields";
import { storeData } from "./useStorage";

export default saveDataForm = async (values) => {
  await storeData(values[keyfields.NAME], {
    [keyfields.IMAGES]: values[keyfields.IMAGES],
    [keyfields.TEXTS]: values[keyfields.TEXTS],
    [keyfields.THUMB]: values[keyfields.IMAGES][0],
    [keyfields.TEXT_SETTINGS]: values[keyfields.TEXT_SETTINGS],
  });
};
