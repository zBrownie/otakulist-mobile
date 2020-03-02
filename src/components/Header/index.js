import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Otaku List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23231f",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    textAlign: "center",
    elevation:6
  },
  title:{
      fontSize:18,
      fontWeight:'bold',
      color:'#fff'
  }
});
