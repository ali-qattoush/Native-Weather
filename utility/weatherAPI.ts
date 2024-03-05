import axios from "axios";

const apiKey = "fc3e79dbc626bf86628023733ded8419";

export const getCityInfo = (city) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          const cityObject = response.data[0];
          const latLon = [cityObject.lat, cityObject.lon];

          resolve(latLon);
        } else {
          reject(new Error("City not found"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getWeatherForecast = (lat, lon) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,sunrise,sunset&forecast_days=7`
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createDataObject = (data) => {
  try {
    const { daily } = data;
    const { temperature_2m_max, temperature_2m_min, weather_code } = daily;

    const getWeatherCondition = (code) => {
      switch (code) {
        case 1:
          return "Clear";
        case 2:
          return "Partly cloudy";
        case 3:
          return "Cloudy";
        case 10:
          return "Mist";
        case 80:
          return "Rainy";
        case 61:
          return "Showers";
        case 81:
          return "Light rain";
        case 82:
          return "Moderate rain";
        case 83:
          return "Heavy rain";
        case 84:
          return "Freezing rain";
        case 85:
          return "Light freezing rain";
        case 86:
          return "Moderate freezing rain";
        case 87:
          return "Heavy freezing rain";
        case 90:
          return "Snow";
        case 91:
          return "Light snow";
        case 92:
          return "Moderate snow";
        case 93:
          return "Heavy snow";
        case 95:
          return "Mix of rain and snow";
        case 0:
          return "Mixed"
        default:
          return "Unknown";
      }
    };

    const maxTemps = temperature_2m_max.map((temp, index) => ({
      maxTemp: temp,
      condition: getWeatherCondition(weather_code[index]),
    }));

    const minTemps = temperature_2m_min.map((temp, index) => ({
      minTemp: temp,
      condition: getWeatherCondition(weather_code[index]),
    }));

    return {
      maxTemps,
      minTemps,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
