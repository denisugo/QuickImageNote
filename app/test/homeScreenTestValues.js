export const values = {
  "12.5.2021": {
    images: ["https://picsum.photos/800/800", "https://picsum.photos/800/600"],
    thumb: "https://picsum.photos/100/100",
    texts: ["KOLLER", "Britney"],
    textSettings: {
      bold: true,
      italic: false,
      outline: false,
      up: false,
      textColor: "#fff",
      backgroundColor: "#F39C12",
    },
  },
  Hawai: {
    images: ["https://picsum.photos/800/600", "https://picsum.photos/800/601"],
    thumb: "https://picsum.photos/100/100",
    texts: ["Our long road", "Jessica"],
    textSettings: {
      bold: true,
      italic: false,
      outline: false,
      up: false,
      textColor: "#fff",
      backgroundColor: "#F39C12",
    },
  },
  Bum: {
    images: ["https://picsum.photos/800/600", "https://picsum.photos/800/801"],
    thumb: "https://picsum.photos/100/100",
    texts: ["Our long road", "Jessica"],
    textSettings: {
      bold: true,
      italic: false,
      outline: false,
      up: false,
      textColor: "#fff",
      backgroundColor: "#F39C12",
    },
  },
  Hanalooloo: {
    images: ["https://picsum.photos/800/600", "https://picsum.photos/800/801"],
    thumb: "https://picsum.photos/100/100",
    texts: ["Our long road", "Jessica"],
    textSettings: {
      bold: true,
      italic: false,
      outline: false,
      up: false,
      textColor: "#fff",
      backgroundColor: "#F39C12",
    },
  },
  empty: {
    images: null,
    thumb: null,
    texts: "",
    textSettings: null,
  },
  textSettingsGlobal: {
    bold: false,
    italic: true,
    outline: false,
    up: false,
    textColor: "#fff",
    backgroundColor: "#F39C12",
  },
};

export const keys = [
  "12.5.2021",
  "Hawai",
  "Bum",
  "Hanalooloo",
  "empty",
  "textSettingsGlobal",
];

export const createList = (keys, values) => {
  var data = [];
  keys.forEach((element) => {
    data = [...data, { key: element, ...values[element] }];
  });
  return data;
};
