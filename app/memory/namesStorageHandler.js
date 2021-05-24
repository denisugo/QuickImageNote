import { Alert } from "react-native";
import AlertAsync from "react-native-alert-async";
import keyfields from "./keyfields";
import saveDataForm from "./saveDataForm";
import { getAllKeys, removeData } from "./useStorage";

export const isNameAlreadyExists = async (
  values,
  setFieldValue,
  setIsForcedRename
) => {
  const keys = await getAllKeys();

  if (
    keys.includes(values[keyfields.NAME]) &&
    (values[keyfields.NAME] !== values[keyfields.ORIGINAL_NAME] ||
      values[keyfields.ORIGINAL_NAME] === "empty")
  )
    await AlertAsync(
      "Caution",
      "Collection with the same name already exists, do you want to overwrite it?",
      [
        {
          text: "No",
          onPress: () => {
            let name = values[keyfields.NAME];

            do {
              name = name + "-copy";
            } while (keys.includes(name));

            setFieldValue(keyfields.NAME, name);

            setIsForcedRename(true);
            //setFieldValue(keyfields.NAME, values[keyfields.NAME] + "-copy");
          },
          style: "cancel",
        },
        { text: "Yes", onPress: () => {} },
      ]
    );
};

export const isRenamed = async (oldKey, values) => {
  await saveDataForm(values);
  await removeData([oldKey]);
};
