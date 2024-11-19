import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { City } from "./@types/city";
import Loading from "./components/Loading";

function App() {
  const [data, setData] = useState<City | null>(null);
  const keyAPI = import.meta.env.VITE_API_KEY;

  const getData = async () => {
    try {
      const response =
        await axios.get<City>(`https://api.weatherapi.com/v1/current.json?key=${keyAPI}&q=Paris&aqi=no
`);

      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="container container--global">
      <h1 className="header">The Weather App</h1>

      <div className="container container--card">
        <form className="container form--card">
          <label>
            <input
              type="search"
              id="search-city"
              placeholder="Enter a new city"
            />
          </label>
          <button>Find</button>
        </form>
        {data ? (
          <>
            <h2>{data.location.name}</h2>
            <img src={data.current.condition.icon} alt="" />
            <p>{data.current.temp_c}°C</p>
            <p>Feels Like: {data.current.feelslike_c}°C</p>
            <p>{data.location.localtime}</p>
            <p>{data?.current.condition.text}</p>
            <p>{data?.current.cloud}%</p>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
}

export default App;
