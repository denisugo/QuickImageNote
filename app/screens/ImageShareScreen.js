import React, { useEffect, useState, createContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  ScrollView,
  Platform,
  LogBox,
} from "react-native";
import * as FileSystem from "expo-file-system";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
  // requestPermissionsAsync,
  // getPermissionsAsync,
  isAvailableAsync,
} from "expo-ads-admob";

import AppButton from "../componets/AppButton";
import AppCustomModal from "../componets/AppCustomModal";
import AppHeader from "../componets/AppHeader";
import AppIconButton from "../componets/AppIconButton";
import AppPreview from "../componets/AppPreview";
import AppRename from "../componets/AppRename";
import AppCarouselForm from "../componets/forms/AppCarouselForm";
import AppForm from "../componets/forms/AppForm";
import AppNameImputForm from "../componets/forms/AppNameInputForm";
import AppThreeButtonsForm from "../componets/forms/AppThreeButtonsForm";
import themes from "../config/themes";
import keyfields from "../memory/keyfields";
import { storeData } from "../memory/useStorage";
import routes from "../navigation/routes";
import visibleImageLoadingContext from "../componets/contexts/visibleImageLoadingContext";

// import { createList, values } from "../test/homeScreenTestValues";

LogBox.ignoreLogs(["Sending", "Error evaluating injectedJavaScript"]);

function ImageShareScreen({ navigation, route }) {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleRename, setVisibleRename] = useState(false);
  const [visibleAd, setVisibleAd] = useState(false);
  const [visibleImageLoading, setVisibleImageLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [refImageUri, setRefImageUri] = useState(null);

  const images = route.params ? route.params.images : null;
  const texts = route.params ? route.params.texts : null;
  const name = route.params ? route.params.name : null;
  const textSettings = route.params ? route.params.textSettings : null;
  const key = route.params ? route.params.key : null;

  const adShow = async () => {
    const availability = await isAvailableAsync();

    if (availability) {
      // Set global test device ID
      await setTestDeviceIDAsync("EMULATOR");
      // Display a rewarded ad
      await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917"); // Test ID, Replace with your-admob-unit-id
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
      AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
        //  Earned a reward
      });
      setVisibleAd(false);
    }
  };

  useEffect(() => {
    //if (visibleAd) adShow(); only for free version
  }, [visibleAd]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={themes.backgroundImages.edit}
        // source={require("../assets/background-light-edit.png")}
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
      >
        {/* <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={0}
            style={styles.container}
          > */}
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.innerContainer}>
              <AppForm
                initialValues={{
                  [keyfields.NAME]:
                    name && name !== "empty" ? name : "untitled",
                  [keyfields.IMAGES]: images ? [...images] : [null],
                  // [keyfields.IMAGES]: images ? [...images, null] : [null],
                  [keyfields.TEXTS]: texts ? [...texts] : [""],
                  // [keyfields.TEXTS]: texts ? [...texts, ""] : [""],
                  [keyfields.TEXT_SETTINGS]: textSettings,

                  // : createList([keyfields.GLOBAL_TEXT_SETTINGS], values)[0], //return array with object
                  [keyfields.POSITION]: 0,
                  [keyfields.ORIGINAL_NAME]: name,
                  [keyfields.KEY]: key,
                  // [keyfields.UNSAVED]: true,
                }}
              >
                {visibleRename && (
                  <AppRename
                    visible={visibleRename}
                    setVisible={setVisibleRename}
                  />
                )}
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View>
                      <visibleImageLoadingContext.Provider
                        value={visibleImageLoading}
                      >
                        <AppHeader setVisible={setVisibleRename} />
                      </visibleImageLoadingContext.Provider>

                      <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "position" : null}
                        keyboardVerticalOffset={0}
                      >
                        <visibleImageLoadingContext.Provider
                          value={[visibleImageLoading, setVisibleImageLoading]}
                        >
                          <AppCarouselForm />
                        </visibleImageLoadingContext.Provider>
                      </KeyboardAvoidingView>

                      {/* <View style={{ flex: 1 }}> */}
                      <View style={styles.bottomContainer}>
                        <AppThreeButtonsForm
                          setVisible={setVisiblePreview} //for preview
                          setImageUri={setImageUri} //for preview
                          setVisibleAd={setVisibleAd}
                          imageUri={imageUri} //for preview
                          setRefImageUri={setRefImageUri}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
                {/* </View> */}
              </AppForm>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* </KeyboardAvoidingView> */}
        {/* </View> */}

        <AppCustomModal
          visible={visiblePreview}
          setVisible={setVisiblePreview}
          onPress={() => {
            try {
              if (imageUri !== refImageUri)
                if (imageUri) FileSystem.deleteAsync(imageUri);
            } catch (error) {}
            setVisibleAd(true);
            setImageUri(null);
          }}
          //opacity={0.95}
          //imageUri={imageUri}
        >
          <AppPreview imageUri={imageUri} />
        </AppCustomModal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    //justifyContent: "center",
    // backgroundColor: "tomato",
    flex: 1,
    // top: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  bottomContainer: {
    ...themes.containerForThreeButtons,
  },
  innerContainer: {
    //paddingTop: "10%",
    flex: 1,
    // top: 100,
    // paddingTop: 100,
    // justifyContent: "flex-end",
  },
});

export default ImageShareScreen;
