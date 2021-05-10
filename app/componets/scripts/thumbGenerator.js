import * as ImageManipulator from "expo-image-manipulator";

import asyncForEach from "./asyncForEach";

export const getThumbs = async (values, field, fieldSecondary, setData) => {
  var parsedValues = [];

  await asyncForEach(values[field], async (image, index) => {
    if (index !== values[field].length - 1) {
      const thumbnail = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 100 } }],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.PNG,
        }
      );

      parsedValues = [
        ...parsedValues,
        {
          image: values[field][index],
          text: values[fieldSecondary][index],
          thumbnail: thumbnail.uri,
        },
      ];
    }
  });
  setData(parsedValues);
};

export const restoreData = (data, field, fieldSecondary, setFieldValue) => {
  var reversedValues = { image: [], text: [] };

  data.forEach((element, index) => {
    reversedValues = {
      image: [...reversedValues[field], element[field]],
      text: [...reversedValues[fieldSecondary], element[fieldSecondary]],
    };
  });

  setFieldValue(field, [...reversedValues[field], null]);
  setFieldValue(fieldSecondary, [...reversedValues[fieldSecondary], ""]);
};
