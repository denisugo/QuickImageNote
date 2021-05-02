import { Platform } from "react-native";
import colors from "./colors";

const shadow = {
  shadowColor: colors.lightTheme.shadow,
  shadowOpacity: 0.8,
  shadowOffset: { width: 0, height: 10 },
  shadowRadius: 10,
  elevation: 20, //Android only
};

export default {
  colors: {
    placeholder: colors.lightTheme.textPlaceholder,
    background: colors.lightTheme.background,
    backgroundSecondary: colors.lightTheme.backgroundSecondary,
    backgroundThird: colors.lightTheme.backgroundThird,
    button: colors.lightTheme.button,
    buttonSecondary: colors.lightTheme.buttonSecondary,
    buttonThird: colors.lightTheme.buttonThird,
    //shadow: colors.lightTheme.shadow,
  },
  shadow: {
    ...shadow,
  },
  text: {
    fontSize: 20,
    color: colors.lightTheme.text,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 60,
    borderRadius: 15,
    //borderWidth: 2,
    ...shadow,
  },
  threeButtons: {
    flexDirection: "row",
    paddingTop: 30,
    width: "100%",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: colors.lightTheme.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imageOnModale:
    Platform.OS === "ios"
      ? {
          height: "70%",
          width: "90%",
          ...shadow,
          justifyContent: "center",
          alignItems: "center",
        }
      : {
          width: "90%",
          height: "70%",
          // backgroundColor: colors.lightTheme.backgroundThird,
          // ...shadow,
          justifyContent: "center",
          alignItems: "center",
        },

  card: {
    alignItems: "center",
    backgroundColor: colors.lightTheme.backgroundSecondary,
    margin: 15,
    borderRadius: 20,
    //borderWidth: 2,
    ...shadow,
  },
  imageOnCard: {
    // alignItems: "center",
    // //backgroundColor: colors.lightTheme.backgroundThird,
    // justifyContent: "center",
    // overflow: "hidden",
    width: "95%",
    height: 300,
    overflow: "hidden",
    borderRadius: 20,
  },
  textInput: {
    backgroundColor: colors.lightTheme.background,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    maxHeight: 120,
  },
};
