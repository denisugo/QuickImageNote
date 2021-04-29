//Deletes unnecessary ""
export const baseToBase = (data) => {
  return data.substring(1, data.length - 1);
};
//Adds prefix to data
export const addPrefix = (data) => {
  const prefix = "data:image/jpeg;base64,";
  const body = data["base64"];
  return prefix + body;
};
//Removes prefix from data

export const removePrefix = (data) => {
  return data.substring(23, data.length);
};
