import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncForEach from "../componets/scripts/asyncForEach";
import keyfields from "./keyfields";

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }
  return keys;
};

const removeData = async (dataKeys) => {
  //dataKeysshould be an array
  const keys = [...dataKeys];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
  }
};

const initStorage = async () => {
  await storeData(keyfields.EMPTY, {
    images: null,
    thumb: null,
    texts: "",
    textSettings: null,
  });

  const keys = await getAllKeys();
  let isHere = false;

  keys.forEach((element) => {
    if (element === keyfields.GLOBAL_TEXT_SETTINGS) isHere = true;
  });

  if (!isHere) {
    await storeData(keyfields.GLOBAL_TEXT_SETTINGS, {
      bold: false,
      italic: true,
      outline: false,
      up: false,
      textColor: "#fff",
      backgroundColor: "#F39C12",
    });
  }

  // const data = await getData(keyfields.EMPTY);
  // console.log("data: ", data);
};

const createList = async () => {
  let keys = await getAllKeys();
  keys = keys.filter((key) => key !== keyfields.GLOBAL_TEXT_SETTINGS).reverse();

  let data = [];

  await asyncForEach(keys, async (element) => {
    const value = await getData(element);
    data = [...data, { key: element, value }];
  });

  return data;
};

export { storeData, getData, getAllKeys, removeData, initStorage, createList };
