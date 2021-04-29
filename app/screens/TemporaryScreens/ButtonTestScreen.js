import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import AppButton from "../../componets/AppButton";
import AppModal from "../../componets/AppModal";
import colors from "../../config/colors";

function ButtonTestScreen(props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Button title="Onpress" onPress={() => setVisible(true)} /> */}
      <View style={styles.buttons}>
        <AppButton
          title="Preview"
          onPress={() => setVisible(true)}
          style={{
            backgroundColor: colors.lightTheme.button,
            marginHorizontal: 10,
          }}
        />
        <AppButton
          title="Send All"
          onPress={() => console.log("pressed")}
          style={{
            backgroundColor: colors.lightTheme.buttonSecondary,
            marginHorizontal: 10,
          }}
        />
        <AppButton
          title="Send"
          onPress={() => console.log("pressed")}
          style={{
            backgroundColor: colors.lightTheme.buttonThird,
            marginHorizontal: 10,
          }}
        />
      </View>
      <AppModal visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default ButtonTestScreen;
