import React, { useEffect, useState } from "react";
import { Vibration, StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions } from "react-native";
import Home from "./src/views/Home";
import Header from "./src/components/Header";
import api from './src/services/api'

import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import Constants from 'expo-constants'

const widthPhone = Dimensions.get('window').width
const heightPhone = Dimensions.get('window').height

export default function App() {

  const [animeDay, setanimeDay] = useState([]);
  const [animeSeason, setanimeSeason] = useState([]);
  const [enableScroll, setenableScroll] = useState(false);


  // USING API
  useEffect(() => {
    async function handleData() {
      await api.get('/search/day').then(
        response => {
          setanimeDay(response.data)
        }
      )

      await api.get('/search/season').then(
        response => {
          setanimeSeason(response.data)
        }
      )
    }

    handleData()
  }, []);

  useEffect(() => {
    hanldePermissions()
    _handleNotification()

  }, [animeDay]);


  function handleNameAnimes() {
    let names = animeDay.map(anime => anime.title).toString();

    return names
  }

  async function hanldePermissions() {
    await Permissions.getAsync(Permissions.NOTIFICATIONS).then(permissions => {
      if (permissions.granted && Constants.isDevice === "granted") {
        console.log("PERMISSAO OK");
        return;
      }
    });
  }

  function _handleNotification() {
    if (animeDay.length != 0) {
      let notification = {
        title: "Passando Hoje ",
        body: handleNameAnimes()
      };

      const schedulingOption = {
        interval: (new Date()).getTime() + 1000,
        repeat: "hour"
      };

      Notifications.scheduleLocalNotificationAsync(
        notification,
        schedulingOption
      );

      Vibration.vibrate();
    }
  }




  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <ScrollView
        onStartShouldSetResponderCapture={() => {
          //NAO BUGAR SCROLL COM FLATLIST DENTRO!!!
          setenableScroll(false)
          if (this.refs.myList.scrollProperties.offset === 0 && enableScroll === false) {
            setenableScroll(true)
          }
        }}

      >
        <View>
          <Text style={styles.title}>Passando Hoje</Text>
          <FlatList
            data={animeDay}
            renderItem={({ item }) => {
              return animeDay.length > 0 ? (
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
        <View>
          <Text style={styles.title}>Season</Text>
          <FlatList
            data={animeSeason}
            renderItem={({ item }) => {
              return animeSeason.length > 0 ? (
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    marginTop: 20
  },
  imageThumbnail: {
    width: widthPhone / 2,
    height: 300,
    resizeMode: "cover",
  },
  title: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'

  }
});
