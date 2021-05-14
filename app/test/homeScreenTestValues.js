export const values = {
  "12.5.2021": {
    images: ["https://picsum.photos/800/800", "https://picsum.photos/800/801"],
    texts: ["KOLLER", "Britney"],
  },
  Hawai: {
    images: ["https://picsum.photos/800/600", "https://picsum.photos/800/801"],
    texts: ["Our long road", "Jessica"],
  },
  Bum: {
    images: ["https://picsum.photos/800/600", "https://picsum.photos/800/801"],
    texts: ["Our long road", "Jessica"],
  },
  Hanalooloo: {
    images: ["https://picsum.photos/800/600", "https://picsum.photos/800/801"],
    texts: ["Our long road", "Jessica"],
  },
};

export const keys = ["12.5.2021", "Hawai", "Bum", "Hanalooloo"];

export const createList = (keys, values) => {
  var data = [];
  keys.forEach((element) => {
    data = [...data, { key: element, ...values[element] }];
  });
  return data;
};
