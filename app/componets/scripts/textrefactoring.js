import asyncForEach from "./asyncForEach";

const separateText = async (
  text,
  width,
  context,
  font = "Menlo",
  fontSize = 18
) => {
  const splitted = text.split("\n"); //array

  var additionalLines = 0;
  var lineText = "";
  var checkedText = []; // Separated lines of text

  context.font = `bold ${fontSize}pt ${font}`; //"bold 15pt Menlo";
  context.textAlign = "left";
  context.textBaseline = "top";

  await asyncForEach(splitted, async (line) => {
    const words = line.split(" "); //array
    const wordCount = words.length;

    await asyncForEach(words, async (word, index) => {
      const textWidth =
        (await context.measureText(lineText + " " + word)).width + 10;
      if (width < textWidth) {
        checkedText = [...checkedText, lineText]; // Add one line
        lineText = word;
      } else {
        lineText = lineText + " " + word;
        if (index === wordCount - 1) {
          checkedText = [...checkedText, lineText];
          lineText = "";
        }
      }
    });
  });

  return checkedText;
};

export const placeText = async (
  context,
  text,
  size,
  fontSize,
  space,
  textColor = "#fff",
  font = "Menlo"
) => {
  const splitted = await separateText(
    text,
    size.width,
    context,
    font,
    fontSize
  );
  var numberOfLines = splitted.length;

  splitted.forEach((line, index) => {
    const textX = 3;
    const textY = size.height - space + (space / numberOfLines) * index;
    context.fillStyle = textColor;
    context.fillText(line, textX, textY);
  });
};

export const refactoredText = async (text, context, width) => {
  var splitted = await separateText(text, width, context);
  var numberOfLines = splitted.length;
  var fontSize = 18;

  splitted.forEach((line) => {
    if (fontSize > width / 30) fontSize = width / 30;
  });

  splitted = await separateText(text, width, context, "Menlo", fontSize);
  var numberOfLines = splitted.length;

  const space =
    JSON.stringify(splitted) !== JSON.stringify([""])
      ? numberOfLines * fontSize * 2 //2-line space
      : 0;

  return [fontSize, space];
};
