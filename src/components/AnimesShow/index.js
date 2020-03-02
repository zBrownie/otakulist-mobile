import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

export default function AnimesShow({ data, title}) {
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return data.length > 0 ? (
            <Image
              style={styles.imageThumbnail}
              source={{
                uri: item.img_url
              }}
            />
          ) : (
            <Text style={styles.msgAnimes}>Sem animes!!!</Text>
          );
        }}
        //Setting the number of column
        numColumns={2}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    flexDirection: "column",
    margin: 1
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 200
  },
  msgAnimes: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#23231f"
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#23231f"
  }
});
