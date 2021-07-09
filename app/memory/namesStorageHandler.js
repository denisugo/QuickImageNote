import { useFormikContext } from "formik";
import { Alert } from "react-native";
import AlertAsync from "react-native-alert-async";

import asyncForEach from "../componets/scripts/asyncForEach";
import keyfields from "./keyfields";
import saveDataForm from "./saveDataForm";
import { getAllKeys, getData, removeData } from "./useStorage";

export const nameAlreadyExists = async (
  values,
  setFieldValue
  // setIsForcedRename
) => {
  let keys = await getAllKeys();

  keys = keys.filter((key) => key !== keyfields.GLOBAL_TEXT_SETTINGS); //.reverse();
  keys = keys.filter((key) => key !== keyfields.EMPTY); //.reverse();

  let names = [];

  await asyncForEach(keys, async (element) => {
    names = [...names, (await getData(element))[keyfields.NAME]];
  });
  // console.log("names ", names);
  if (
    names.includes(values[keyfields.NAME]) &&
    // keys.includes(values[keyfields.NAME]) &&
    // (values[keyfields.NAME] !== values[keyfields.ORIGINAL_NAME] ||
    // values[keyfields.ORIGINAL_NAME] === "empty" //)
    // values[keyfields.ORIGINAL_NAME] === "untitled")
    values[keyfields.KEY] === "empty" //)
  ) {
    let name;
    let addNumber = 0;
    do {
      addNumber = addNumber + 1;
      name = values[keyfields.NAME];
      name = name + addNumber.toString();
    } while (names.includes(name));

    addNumber = 0;

    setFieldValue(keyfields.NAME, name);

    // setIsForcedRename(true);
  }
  // await AlertAsync(
  //   "Caution",
  //   "Collection with the same name already exists, do you want to overwrite it?",
  //   [
  //     {
  //       text: "No",
  //       onPress: () => {
  //         let name = values[keyfields.NAME];

  //         do {
  //           name = name + "-copy";
  //         } while (keys.includes(name));

  //         setFieldValue(keyfields.NAME, name);

  //         setIsForcedRename(true);
  //         //setFieldValue(keyfields.NAME, values[keyfields.NAME] + "-copy");
  //       },
  //       style: "cancel",
  //     },
  //     { text: "Yes", onPress: () => {} },
  //   ]
  // );
};

export const reStore = async (setFieldValue, values, setValue) => {
  await removeData([values[keyfields.KEY]]);
  //await saveDataForm(values, setFieldValue);
  setValue(await saveDataForm(values, setFieldValue));
  // await saveDataForm(values);
  // await removeData([oldKey]);
  // console.log("restored");
};
