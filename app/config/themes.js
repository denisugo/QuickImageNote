import { Dimensions, Platform, Appearance } from "react-native";
import colors from "./colors";

const stylesStatusBar = ["default", "dark-content", "light-content"];

const colorScheme = Appearance.getColorScheme();

export { colorScheme };

const shadow = {
  elevation: 10, //Android only
  shadowColor:
    colorScheme === "dark" ? colors.darkTheme.shadow : colors.lightTheme.shadow,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
};

export default {
  colors: colorScheme === "dark" ? colors.darkTheme : colors.lightTheme, //{

  // text:
  //   colorScheme === "dark" ? colors.darkTheme.text : colors.lightTheme.text,
  // placeholder:
  //   colorScheme === "dark"
  //     ? colors.darkTheme.textPlaceholder
  //     : colors.lightTheme.textPlaceholder,
  // background:
  //   colorScheme === "dark"
  //     ? colors.darkTheme.background
  //     : colors.lightTheme.background,
  // backgroundSecondary:colorScheme === "dark" ?colors.darkTheme.backgroundSecondary: colors.lightTheme.backgroundSecondary,
  // backgroundThird:colorScheme === "dark" ?colors.darkTheme.backgroundThird colors.lightTheme.backgroundThird,
  // button: colors.lightTheme.button,
  // buttonSecondary: colors.lightTheme.buttonSecondary,
  // buttonThird: colors.lightTheme.buttonThird,
  // //shadow: colors.lightTheme.shadow,
  //},
  backgroundImages: {
    home:
      colorScheme === "dark"
        ? require("../assets/background-dark-home.png")
        : require("../assets/background-light-home.png"),
    edit:
      colorScheme === "dark"
        ? require("../assets/background-dark-edit.png")
        : require("../assets/background-light-edit.png"),
  },
  shadow: {
    ...shadow,
  },
  text: {
    color:
      colorScheme === "dark" ? colors.darkTheme.text : colors.lightTheme.text,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 20,
    textTransform: "lowercase",
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 5,
    height: 60,
    justifyContent: "center",
    marginHorizontal: "1%", //10,
    // overflow: "hidden",
    //...shadow,
    //width: "30%", //100,
  },
  threeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  modal: {
    alignItems: "center",
    flex: 1,
    backgroundColor:
      colorScheme === "dark"
        ? colors.darkTheme.backgroundSecondary
        : colors.lightTheme.backgroundSecondary,
    justifyContent: "center",
  },
  customModal: {
    //backgroundColor: colors.lightTheme.backgroundThird,
    height: "100%",
    position: "absolute",
    width: "100%",
    zIndex: 10,
  },

  imageOnModale:
    Platform.OS === "ios"
      ? {
          alignItems: "center",
          height: "70%",
          justifyContent: "center",
          ...shadow,
          width: "90%",
        }
      : {
          alignItems: "center",
          height: "70%",
          // backgroundColor: colors.lightTheme.backgroundThird,
          // ...shadow,
          justifyContent: "center",
          width: "90%",
        },

  card: {
    alignItems: "center",
    backgroundColor:
      colorScheme === "dark"
        ? colors.darkTheme.backgroundSecondary
        : colors.lightTheme.backgroundSecondary,
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    ...shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  imageOnCard: {
    borderRadius: 20,
    height: "100%", //300,
    overflow: "hidden",
    width: "95%",
  },

  listItem: {
    alignItems: "center",
    backgroundColor:
      colorScheme === "dark"
        ? colors.darkTheme.placeholder
        : colors.lightTheme.placeholder,
    borderColor:
      colorScheme === "dark"
        ? colors.darkTheme.buttonThird
        : colors.lightTheme.buttonThird,
    borderRadius: 20,
    borderWidth: 5,
    flexDirection: "row",
    height: 70,
    marginTop: 10,
    // width: 350,
    width: Dimensions.get("screen").width - 50,
  },
  listItemIsActive: {
    // backgroundColor:
    //   colorScheme === "dark"
    //     ? colors.darkTheme.buttonThird
    //     : colors.lightTheme.buttonThird,
    marginTop: 5,
    height: 80,
  },
  imageOnListItem: {
    borderRadius: 5,
    height: 60,
    marginHorizontal: 10,
    overflow: "hidden",
    width: 60,
  },
  textInput: {
    backgroundColor:
      colorScheme === "dark"
        ? colors.darkTheme.background
        : colors.lightTheme.background,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 120,
    padding: 10,
  },
  containerForThreeButtons: {
    alignSelf: "center",
    backgroundColor:
      colorScheme === "dark"
        ? colors.darkTheme.backgroundSecondary
        : colors.lightTheme.backgroundSecondary,
    borderRadius: 25,
    flex: 0.9,
    ...shadow,
    shadowOpacity: 0.3,
    width: "95%",
  },
  settingButton: {
    alignSelf: "flex-end",
    paddingTop: 30,
  },
  statusBar: {
    style:
      // Platform.OS === "android"
      //   ? stylesStatusBar[0]
      // :
      colorScheme === "dark" ? stylesStatusBar[2] : stylesStatusBar[1],
  },
  clearAllButton: {
    borderColor:
      colorScheme === "dark"
        ? colors.darkTheme.delete
        : colors.lightTheme.delete,
    width: "90%",
  },
  clearAllButtonText: {
    color:
      colorScheme === "dark"
        ? colors.darkTheme.delete
        : colors.lightTheme.delete,
  },
  premiumButton: {
    borderColor:
      colorScheme === "dark"
        ? colors.darkTheme.premium
        : colors.lightTheme.premium,
    paddingHorizontal: 5,
    // width: "90%",
  },
};
