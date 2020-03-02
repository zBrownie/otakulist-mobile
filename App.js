import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Home from "./src/views/Home";
import Header from "./src/components/Header";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header />
        <Home />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:22
  },
  safe: {
    flex: 1
  }
});
