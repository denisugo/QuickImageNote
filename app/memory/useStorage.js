import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import asyncForEach from "../componets/scripts/asyncForEach";
import keyfields from "./keyfields";
import storageContext from "./storageContext";

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
  //const [storageUsed, setStorageUsed()] = useContext(storageContext);
  //dataKeys should be an array
  const keys = [...dataKeys];
  try {
    await AsyncStorage.multiRemove(keys);
    setStorageUsed(!storageUsed);
  } catch (e) {
    // remove error
  }
};

const initStorage = async () => {
  // setStorageUsed(!storageUsed);
  await storeData(keyfields.EMPTY, {
    [keyfields.NAME]: "empty",
    [keyfields.IMAGES]: null,
    [keyfields.THUMB]: null,
    [keyfields.TEXTS]: "",
    [keyfields.TEXT_SETTINGS]: null,
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

  console.log(keys);
  keys = keys.filter((key) => key !== keyfields.GLOBAL_TEXT_SETTINGS); //.reverse();
  keys = keys.filter((key) => key !== keyfields.EMPTY); //.reverse();
  keys = keys.sort((a, b) => {
    return b - a;
  });
  keys = [keyfields.EMPTY, ...keys];

  let data = [];

  await asyncForEach(keys, async (element) => {
    const value = await getData(element);
    data = [...data, { key: element, value }];
  });

  return data;
};

export { storeData, getData, getAllKeys, removeData, initStorage, createList };
