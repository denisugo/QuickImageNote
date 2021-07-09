import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import * as FileSystem from "expo-file-system";

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

const removeData = async (dataKeys, setStorageUsed, storageUsed) => {
  //dataKeys should be an array
  const keys = [...dataKeys];
  try {
    asyncForEach(keys, async (key) => {
      const data = await getData(key);
      if (data[keyfields.THUMB]) FileSystem.deleteAsync(data[keyfields.THUMB]);
    });
    await AsyncStorage.multiRemove(keys);
    setStorageUsed(!storageUsed);
  } catch (e) {
    // remove error
  }
};

const initStorage = async () => {
  const keys = await getAllKeys();
  let isTextSettingsHere = false;
  let isSettingsHere = false;

  keys.forEach((element) => {
    if (element === keyfields.GLOBAL_TEXT_SETTINGS) isTextSettingsHere = true;
    if (element === keyfields.SETTINGS) isSettingsHere = true;
  });

  if (!isSettingsHere) {
    await storeData(keyfields.SETTINGS, {
      [keyfields.PREMIUM]: false,
      // [keyfields.LIGHTS_OFF]: false,
    });
  }

  // removeData(["textSettingsGlobal"]);
  // console.log(await getAllKeys());
  if (!isTextSettingsHere) {
    await storeData(keyfields.GLOBAL_TEXT_SETTINGS, {
      [keyfields.BOLD]: true,
      [keyfields.ITALIC]: false,
      [keyfields.OUTLINE]: false,
      [keyfields.TOP]: false,
      [keyfields.TEXT_COLOR]: "#fff",
      [keyfields.BACKGROUND_COLOR]: "#F39C12",
    });
  }

  let textSettings = await getData(keyfields.GLOBAL_TEXT_SETTINGS);

  await storeData(keyfields.EMPTY, {
    [keyfields.NAME]: "empty",
    [keyfields.IMAGES]: null,
    [keyfields.THUMB]: null,
    [keyfields.TEXTS]: "",
    [keyfields.TEXT_SETTINGS]: textSettings,
  });
  // const data = await getData(keyfields.EMPTY);
  // console.log("data: ", data);
};

const createList = async () => {
  let keys = await getAllKeys();

  // console.log(keys);
  keys = keys.filter((key) => key !== keyfields.GLOBAL_TEXT_SETTINGS);
  keys = keys.filter((key) => key !== keyfields.SETTINGS);
  keys = keys.filter((key) => key !== keyfields.EMPTY);
  keys = keys.sort((a, b) => {
    return b - a;
  });
  keys = [keyfields.EMPTY, ...keys];

  let data = [];

  await asyncForEach(keys, async (element) => {
    const value = await getData(element);
    data = [...data, { key: element, value }];
  });
  //Array of items
  return data;
};

export { storeData, getData, getAllKeys, removeData, initStorage, createList };
