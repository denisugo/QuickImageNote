import asyncForEach from "./asyncForEach";

const separateText = async (
  text,
  width,
  context,
  font = "Menlo",
  fontSize = 18
) => {
  const splitted = text.split("\n"); //array

  //var additionalLines = 0;
  var lineText = "";
  var checkedText = []; // Separated lines of text

  context.font = `bold ${fontSize}pt ${font}`; //"bold 15pt Menlo";
  context.textAlign = "left";
  context.textBaseline = "top";

  const saveArea = width / 30;
  await asyncForEach(splitted, async (line) => {
    const words = line.split(" "); //array
    const wordCount = words.length;

    await asyncForEach(words, async (word, index) => {
      const wordWidth = (await context.measureText(word)).width;
      if (width < wordWidth + saveArea) {
        for (let i = 0; i < word.length; i++) {
          const textWidth = (await context.measureText(lineText)).width;
          if (lineText === "") lineText = " ";
          if (width < textWidth + saveArea) {
            checkedText = [...checkedText, lineText];
            lineText = word[i];
          } else {
            lineText = lineText + word[i];
          }
        }

        // if (index === wordCount - 1) {
        //   checkedText = [...checkedText, lineText];
        //   lineText = "";
        // }
      } else {
        const textWidth = (await context.measureText(lineText + " " + word))
          .width;
        if (width < textWidth + saveArea) {
          checkedText = [...checkedText, lineText]; // Add one line
          lineText = word;
          //   if (index === wordCount - 1) {
          //     checkedText = [...checkedText, lineText];
          //     lineText = "";
          //   }
        } else {
          lineText = lineText + " " + word;
          //   if (index === wordCount - 1) {
          //     checkedText = [...checkedText, lineText];
          //     lineText = "";
          //   }
        }
      }
      if (index === wordCount - 1) {
        checkedText = [...checkedText, lineText];
        lineText = "";
      }
    });
    // checkedText = [...checkedText, lineText];
    // lineText = "";
  });
  //console.log(checkedText);
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
  //var splitted = await separateText(text, width, context);
  //var numberOfLines = splitted.length;
  var fontSize = 18;

  //splitted.forEach((line) => {
  if (fontSize > width / 30) fontSize = width / 30;
  // });

  const splitted = await separateText(text, width, context, "Menlo", fontSize);
  const numberOfLines = splitted.length;

  const space =
    JSON.stringify(splitted) !== JSON.stringify(["  "])
      ? numberOfLines * fontSize * 2 //2-line space
      : 0;

  return [fontSize, space];
};
