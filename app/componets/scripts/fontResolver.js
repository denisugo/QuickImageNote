export default fontResolver = (text, bold, italic) => {
  const english = /^[A-Za-z0-9]*$/;
  let font = null;

  if (english.test(text)) {
    font = "Menlo";
    if (bold) font = "Menlo-Bold";
    if (italic) font = "Menlo-Italic";
    if (bold && italic) font = "Menlo-BoldItalic";
  } else {
    font = "Arial";
    if (bold) font = "Arial-BoldMT";
    if (italic) font = "Arial-ItalicMT";
    if (bold && italic) font = "Arial-BoldItalicMT";
  }

  return font;
};
