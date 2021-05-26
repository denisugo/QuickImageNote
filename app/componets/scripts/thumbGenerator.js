import * as ImageManipulator from "expo-image-manipulator";
import keyfields from "../../memory/keyfields";

import asyncForEach from "./asyncForEach";
import createThumb from "./createThumb";

export const getThumbs = async (values, field, fieldSecondary, setData) => {
  var parsedValues = [];

  await asyncForEach(values[field], async (image, index) => {
    if (index !== values[field].length - 1) {
      const thumbnail = await createThumb(100, 1, image);
      // const thumbnail = await ImageManipulator.manipulateAsync(
      //   image,
      //   [{ resize: { width: 100 } }],
      //   {
      //     compress: 1,
      //     format: ImageManipulator.SaveFormat.PNG,
      //   }
      // );

      parsedValues = [
        ...parsedValues,
        {
          [keyfields.IMAGES]: values[field][index],
          [keyfields.TEXTS]: values[fieldSecondary][index],
          [keyfields.THUMB]: thumbnail.uri,
        },
      ];
    }
  });
  setData(parsedValues);
};

export const restoreData = (data, field, fieldSecondary, setFieldValue) => {
  var reversedValues = { [keyfields.IMAGES]: [], [keyfields.TEXTS]: [] };

  data.forEach((element, index) => {
    reversedValues = {
      [keyfields.IMAGES]: [...reversedValues[field], element[field]],
      [keyfields.TEXTS]: [
        ...reversedValues[fieldSecondary],
        element[fieldSecondary],
      ],
    };
  });

  setFieldValue(field, [...reversedValues[field], null]);
  setFieldValue(fieldSecondary, [...reversedValues[fieldSecondary], ""]);
};
