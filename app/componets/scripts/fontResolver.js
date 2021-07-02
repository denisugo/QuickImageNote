import { Platform } from "react-native";

export default fontResolver = (text, bold = false, italic = false) => {
  const english = /[A-z\u00C0-\u00ff]+/g; ///^[A-Za-z0-9]*$/;

  let font = null;

  if (english.test(text)) {
    font = Platform.OS === "android" ? "arial" : "Menlo";
    if (bold) font = Platform.OS === "android" ? "arialbd" : "Menlo-Bold";
    if (italic) font = Platform.OS === "android" ? "arialit" : "Menlo-Italic";
    if (bold && italic)
      font = Platform.OS === "android" ? "arialbdit" : "Menlo-BoldItalic";
  } else {
    font = Platform.OS === "android" ? "arial" : "Arial";
    if (bold) font = Platform.OS === "android" ? "arialbd" : "Arial-BoldMT";
    if (italic) font = Platform.OS === "android" ? "arialit" : "Arial-ItalicMT";
    if (bold && italic)
      font = Platform.OS === "android" ? "arialbdit" : "Arial-BoldItalicMT";
  }

  return font;
};
