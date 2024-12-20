import { useState } from "react";
import "./App.css";
import axios from "axios";
import { CurrentWeather } from "./@types/currentWeather";
import Loading from "./components/Loading";
import { City, SearchCity } from "./@types/city";

function App() {
  const [dataWeather, setDataWeather] = useState<CurrentWeather[]>([]);
  const [city, setCity] = useState<string>("");
  const [cityLongLat, setCityLongLat] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchCity[]>([]);
  const keyAPI = import.meta.env.VITE_API_KEY;

  const searchByCity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCity(e.target.value);
    console.log(city);

    if (e.target.value === "") {
      setSearchData([]);
      return;
    }

    try {
      if (e.target.value.length >= 1) {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${keyAPI}&q=${city}`
        );

        console.log(response.data);

        if (response.data.length != 0) {
          const filteredCities = response.data.map((city: City) => ({
            id: city.id,
            displayName: `${city.name}, ${city.region} - ${city.country}`,
            city: city.name,
            lat: city.lat,
            lon: city.lon,
          })) as SearchCity[];
          console.log(filteredCities);
          setSearchData(filteredCities);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (city: string, lat: number, lon: number) => {
    setCity(city);
    setCityLongLat(`${lat},${lon}`);
    setSearchData([]);
  };

  const getData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response =
        await axios.get<CurrentWeather>(`https://api.weatherapi.com/v1/current.json?key=${keyAPI}&q=${cityLongLat}&aqi=no
`);

      console.log(response.data);

      const newData = [...dataWeather, response.data];

      setDataWeather(newData);
      setCity("");
      setSearchData([]);
      setCityLongLat("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container container--global">
      <h1 className="header">The Weather App</h1>

      <div className="container container--card">
        <form className="container form--card" onSubmit={getData}>
          <label className="label--card">
            <input
              className="input--card"
              type="search"
              id="search-city"
              placeholder="Enter a new city"
              value={city}
              onChange={searchByCity}
              autoComplete="off"
              inputMode="search"
            />
          </label>
          <button className="btn--card">Find</button>
        </form>
        {searchData.length > 0 && (
          <ul className="container--autocomplet">
            {searchData.map((data) => (
              <li
                className="link--autocomplet"
                key={data.id}
                onClick={() =>
                  handleClick(data.displayName, data.lat, data.lon)
                }
              >
                {data.displayName}
              </li>
            ))}
          </ul>
        )}
        {dataWeather.length != 0 ? (
          dataWeather.map((city) => (
            <>
              <h2>
                {city.location.name}, {city.location.country}
              </h2>
              <img src={city.current.condition.icon} alt="" />
              <p>Temp: {city.current.temp_c}°C</p>
              <p>Feels Like: {city.current.feelslike_c}°C</p>
              <p>{city.location.localtime}</p>
              <p>{city?.current.condition.text}</p>
              <p>{city?.current.cloud}% cloud</p>
            </>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
}

export default App;
