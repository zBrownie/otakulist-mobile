import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import api from "../../services/api";
import AnimesShow from "../../components/AnimesShow";

export default function Home() {
  const [animeDay, setanimeDay] = useState([]);
  const [animeSeason, setanimeSeason] = useState([]);

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
    alertIfRemoteNotificationsDisabledAsync()
  }, []);



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
