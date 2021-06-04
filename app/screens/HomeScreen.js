import React, { createContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  ImageBackground,
  FlatList,
} from "react-native";
import AppLoading from "expo-app-loading";

import AppIconButton from "../componets/AppIconButton";
import AppText from "../componets/AppText";
import routes from "../navigation/routes";
import themes from "../config/themes";
// import { createList, keys, values } from "../test/homeScreenTestValues";
import AppImageListItem from "../componets/AppImageListItem";
import keyfields from "../memory/keyfields";
import {
  getAllKeys,
  getData,
  createList,
  initStorage,
  storeData,
} from "../memory/useStorage";
import storageContext from "../memory/storageContext";

function HomeScreen({ navigation }) {
  // const data = createList(
  //   keys.filter((key) => key !== keyfields.GLOBAL_TEXT_SETTINGS).reverse(),
  //   values
  // );
  const [data, setData] = useState(null);
  const [storageUsed, setStorageUsed] = useState(false);

  // console.log("storageUsed ");
  // let keys; //= getAllKeys();
  // useEffect(() => {
  //   keys = getAllKeys();
  //   console.log("keys set");
  // }, []);

  useEffect(() => {
    // console.log(data);
    if (storageUsed) {
      readStorage();
      setStorageUsed(false);
    }
    // console.log("new list was set");
  }, [storageUsed]);

  const readStorage = async () => {
    setData(await createList());
  };
  const initHomeScreen = async () => {
    await initStorage();
    await readStorage();
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      initHomeScreen();
      // initStorage();
      // readStorage();
      // setStorageUsed(!storageUsed);
      // console.log("focused", storageUsed);
    });
  }, [navigation]);

  // console.log(data);

  if (!data) return <AppLoading />;

  return (
    <View style={styles.container}>
      <ImageBackground
        //source={require("../assets/background-light-home.png")}
        source={themes.backgroundImages.home}
        style={styles.imageBackground}
      >
        <View style={styles.settingButton}>
          <AppIconButton
            name="cog-outline"
            onPress={() =>
              navigation.navigate(routes.SETTINGS, {
                setStorageUsed: setStorageUsed,
                storageUsed: storageUsed,
              })
            }
          />
        </View>
        <View style={styles.innerContainer}>
          {/* <storageContext.Provider value={[storageUsed, setStorageUsed]}> */}
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <AppImageListItem
                item={item}
                navigation={navigation}
                setStorageUsed={setStorageUsed}
                storageUsed={storageUsed}
              />
            )}
            // renderItem={({ item }) => AppImageListItem({ item, navigation })}
            //renderItem={(item) => AppImageListItem(item, navigation)}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={{ paddingHorizontal: 20, paddingTop: 7 }}
          />
          {/* <Button
            title="Go to images"
            onPress={() => navigation.navigate(routes.IMAGE_NAVIGATOR)}
          /> */}
          {/* </storageContext.Provider> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingButton: {
    ...themes.settingButton,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default HomeScreen;
