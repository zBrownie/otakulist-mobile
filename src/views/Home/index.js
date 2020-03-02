import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Vibration } from "react-native";
import api from "../../services/api";
import AnimesShow from "../../components/AnimesShow";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default function Home() {
  const [animeDay, setanimeDay] = useState([]);
  const [animeSeason, setanimeSeason] = useState([]);
  const [animesNotificatio, setanimesNotificatio] = useState("");

  //PEGANDO DATA DA API
  useEffect(() => {
    async function handleGetData() {
      await api.get("/search/day").then(response => {
        setanimeDay(response.data);
      });

      await api.get("/search/season").then(response => {
        setanimeSeason(response.data);
      });
    }
    handleGetData();
    handleNameAnimes();
  }, []);

  function handleNameAnimes() {
    let names = animeDay.map(anime => anime.title).toString();

    setanimesNotificatio(names);
    return names
  }
  //notificacao notificacao notificacao notificacao notificacao

  const [notification, setnotification] = useState({});
  const [expoPushToken, setexpoPushToken] = useState("");

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
        title: "Passando Hoje",
        body: handleNameAnimes()
      };

      const schedulingOption = {
        interval: new Date().getTime() + 1000,
        repeat: "day"
      };

      Notifications.scheduleLocalNotificationAsync(
        notification,
        schedulingOption
      );

      Vibration.vibrate();
    }
  }

  function handleCancelNotification() {
    Notifications.cancelAllScheduledNotificationsAsync();
  }

  useEffect(() => {
    hanldePermissions();
    _handleNotification();
    // Notifications.addListener(_handleNotification);
  }, [animeDay]);

  //notificacao notificacao notificacao notificacao notificacao

  return (
    <View style={styles.container}>
      <View style={styles.day}>
        <AnimesShow data={animeDay} title={"Passando Hoje"} />
      </View>
      <View style={styles.day}>
        <AnimesShow data={animeSeason} title={"Season"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainCocontainerntainer: {
    flex: 1
  },
  day: {
    marginVertical: 10
  }
});
