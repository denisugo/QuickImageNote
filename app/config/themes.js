import { Dimensions, Platform } from "react-native";
import colors from "./colors";

const shadow = {
  elevation: 10, //Android only
  //shadowColor: colors.lightTheme.shadow,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
};

export default {
  colors: {
    text: colors.lightTheme.text,
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
    color: colors.lightTheme.text,
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
    //...shadow,
    //width: "30%", //100,
  },
  threeButtons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  modal: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.lightTheme.backgroundSecondary,
    justifyContent: "center",
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
    backgroundColor: colors.lightTheme.backgroundSecondary,
    borderRadius: 20,
    margin: 15,
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
    borderColor: colors.lightTheme.buttonThird,
    borderRadius: 20,
    borderWidth: 5,
    flexDirection: "row",
    height: 70,
    marginTop: 10,
    // width: 350,
    width: Dimensions.get("screen").width - 50,
  },
  listItemIsActive: {
    backgroundColor: colors.lightTheme.button,
  },
  imageOnListItem: {
    borderRadius: 5,
    height: 60,
    marginHorizontal: 10,
    overflow: "hidden",
    width: 60,
  },
  textInput: {
    backgroundColor: colors.lightTheme.background,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 120,
    padding: 10,
  },
  containerForThreeButtons: {
    alignSelf: "center",
    backgroundColor: colors.lightTheme.backgroundSecondary,
    borderRadius: 25,
    ...shadow,
    shadowOpacity: 0.3,
    width: "95%",
  },
  settingButton: {
    alignSelf: "flex-end",
    paddingTop: 30,
  },
};
