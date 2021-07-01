import asyncForEach from "./asyncForEach";

const SAFE_AREA_PERCENTAGE = 30;

const separateText = async (
  text,
  width,
  context,
  bold = true,
  italic = false,
  // top = false,
  font = "Menlo",
  fontSize = 25
) => {
  const splitted = text.split("\n"); //array

  //var additionalLines = 0;
  var lineText = "";
  var checkedText = []; // Separated lines of text

  context.font = `${bold ? "bold" : ""} ${
    italic ? "italic" : ""
  } ${fontSize}pt ${font}`; //"bold 15pt Menlo";
  context.textAlign = "left";
  context.textBaseline = "top";

  const safeArea = width / SAFE_AREA_PERCENTAGE;
  await asyncForEach(splitted, async (line) => {
    const words = line.split(" "); //array
    const wordCount = words.length;

    await asyncForEach(words, async (word, index) => {
      const wordWidth = (await context.measureText(word)).width;

      if (width < wordWidth + safeArea) {
        //Long word at the begining of the line
        if (lineText === "") lineText = " ";
        //Long word after the text
        else lineText = lineText + " ";

        for (let i = 0; i < word.length; i++) {
          const textWidth = (await context.measureText(lineText + word[i]))
            .width;

          if (width < textWidth + safeArea) {
            checkedText = [...checkedText, lineText];
            lineText = word[i];
          } else {
            lineText = lineText + word[i];
          }
        }
      } else {
        const textWidth = (await context.measureText(lineText + " " + word))
          .width;
        if (width < textWidth + safeArea) {
          checkedText = [...checkedText, lineText]; // Add one line
          lineText = word;
        } else {
          lineText = lineText + " " + word;
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
  // console.log(checkedText);
  return checkedText;
};

export const placeText = async (
  context,
  text,
  size,
  fontSize,
  space,
  _splitted = null,
  textColor = "##D35400",
  outline = false,
  bold = true,
  italic = false,
  top = false,
  font = "Menlo"
  // font = "Avenir"
) => {
  var splitted = _splitted
    ? _splitted
    : await separateText(
        text,
        size.width,
        context,
        bold,
        italic,

        font,
        fontSize
      );

  // const splitted = await separateText(
  //   text,
  //   size.width,
  //   context,
  //   bold,
  //   italic,
  //   // top,
  //   font,
  //   fontSize
  // );

  const numberOfLines = splitted.length;
  var safeArea = size.width / SAFE_AREA_PERCENTAGE;

  if (numberOfLines === 1) {
    context.textAlign = "center";
    safeArea = size.width / 2;
  }

  splitted.forEach((line, index) => {
    const textX = safeArea;
    const textY = top
      ? (space / numberOfLines) * index
      : size.height - space + (space / numberOfLines) * index;

    if (outline) {
      context.strokeStyle = textColor;
      context.lineWidth = 2;
      context.strokeText(line, textX, textY);
    } else {
      context.fillStyle = textColor;
      context.fillText(line, textX, textY);
    }
  });
};

export const refactoredText = async (text, context, width, bold, italic) => {
  //var splitted = await separateText(text, width, context);
  //var numberOfLines = splitted.length;
  var fontSize = 25;

  //Font size
  if (fontSize > width / 20) fontSize = width / 20;

  const splitted = await separateText(
    text,
    width,
    context,
    bold,
    italic,
    "Menlo",
    fontSize
  );

  const numberOfLines = splitted.length;

  const space =
    JSON.stringify(splitted) !== JSON.stringify([" "])
      ? numberOfLines * fontSize * 1.5 + 5 //1.5-line space
      : 0;

  return [fontSize, space, splitted];
};
