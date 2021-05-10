import { Dimensions, Platform } from "react-native";
import colors from "./colors";

const shadow = {
  //shadowColor: colors.lightTheme.shadow,
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 10 },
  shadowRadius: 10,
  elevation: 10, //Android only
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
    fontSize: 20,
    color: colors.lightTheme.text,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    textTransform: "lowercase",
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%", //100,
    height: 60,
    borderRadius: 15,
    marginHorizontal: "1%", //10,
    //borderWidth: 2,
    //...shadow,
  },
  threeButtons: {
    flexDirection: "row",
    paddingVertical: 20,
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
    ...shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
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
  listItem: {
    flex: 1,
    borderRadius: 20,
    height: 70,
    // width: 350,
    width: Dimensions.get("screen").width - 50,
    marginTop: 10,
    backgroundColor: colors.lightTheme.buttonThird,
    flexDirection: "row",
    alignItems: "center",
  },
  listItemIsActive: {
    backgroundColor: colors.lightTheme.button,
  },
  textInput: {
    backgroundColor: colors.lightTheme.background,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    maxHeight: 120,
  },
  containerForThreeButtons: {
    alignSelf: "center",
    backgroundColor: colors.lightTheme.backgroundSecondary,
    borderRadius: 25,
    width: "95%",
    ...shadow,
    shadowOpacity: 0.3,
  },
};
