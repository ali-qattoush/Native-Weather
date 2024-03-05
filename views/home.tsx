import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  getCityInfo,
  getWeatherForecast,
  createDataObject,
} from "../utility/weatherAPI";
import {
  faSun,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const today = new Date().getDay(); 

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getWeatherByCity = (city) => {
    getCityInfo(city).then(([lat, lon]) => {
      getWeatherForecast(lat, lon)
        .then((data) => {
          setWeatherData((prevWeatherData) => ({
            ...prevWeatherData,
            [city]: createDataObject(data),
          }));
        })
        .catch((err) => {
          console.log(err + " error fetching weather");
        });
    });
  };

  useEffect(() => {
    getWeatherByCity("Dubai");
    getWeatherByCity("London");
    getWeatherByCity("Ramallah");
  }, []);

  const renderWeatherCard = (city) => {
    const weather = weatherData[city];
    if (!weather) return null;

    const weatherIcon = getWeatherIcon(weather.maxTemps[0].condition);

    return (
      <TouchableOpacity
        key={city}
        style={styles.card}
        onPress={() => {
          setSelectedCity((prevCity) => (prevCity === city ? null : city));
        }}
      >
        <ScrollView>
          <View style={styles.cardContent}>
            <View style={styles.weatherIcon}>{weatherIcon}</View>
            <View style={styles.weatherInfo}>
              <Text style={styles.city}>{city}</Text>
              <Text style={[styles.temp, { color: "blue" }]}>
                Max Temp: {weather.maxTemps[0].maxTemp}°C
              </Text>
              <Text style={[styles.temp, { color: "black", marginBottom: 10 }]}>
                Min Temp: {weather.minTemps[0].minTemp}°C
              </Text>
              {selectedCity === city &&
                weather.maxTemps.map((day, index) => (
                  <View key={index} style={styles.forecastItem}>
                    <Text>{getWeatherIcon(day.condition)}</Text>
                    <Text style={[styles.temp, { color: "blue" }]}>
                      {day.maxTemp}°C
                    </Text>
                    <Text style={[styles.temp, { color: "black" }]}>
                      {weather.minTemps[index].minTemp}°C
                    </Text>
                    <Text style={{ color: "black" }}>
                      {daysOfWeek[(today + index) % 7]}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
    );
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <FontAwesomeIcon icon={faSun} size={24} color="black" />;
      case "Rainy":
        return <FontAwesomeIcon icon={faCloudRain} size={24} color="black" />;
      case "Cloudy":
        return <FontAwesomeIcon icon={faCloud} size={24} color="black" />;
      case "Showers":
        return (
          <FontAwesomeIcon
            icon={faCloudShowersHeavy}
            size={24}
            color="black"
          />
        );
      default:
        return <FontAwesomeIcon icon={faCloud} size={24} color="black" />;
    }
  };

  return (
    <View style={styles.container}>
      {Object.keys(weatherData).map((city) => renderWeatherCard(city))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  weatherIcon: {
    marginRight: 10,
  },
  weatherInfo: {
    flex: 1,
  },
  city: {
    fontSize: 18,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 16,
  },
  forecastItem: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Home;
