import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const CitiesDataFitcher = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        // if (!response.ok) throw new Error();
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.log("You have an error ⛔ from getting current cities");
      } finally {
        setLoading(false);
      }
    };

    CitiesDataFitcher();
  }, []);

  const getCity = async cityId => {
    try {
      setLoading(true);
      const resp = await fetch(`${BASE_URL}/cities/${cityId}`);
      const data = await resp.json();
      setCurrentCity(data);
    } catch {
      console.log("You have an error ⛔ from getting current city");
    } finally {
      setLoading(false);
    }
  };
  return (
    <CitiesContext.Provider value={{ cities, loading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useConsumeCitiesContext = () => {
  if (useContext(CitiesContext) === undefined)
    throw new Error("Consuming context value outside a provider.");
  return useContext(CitiesContext);
};

export { CitiesProvider, useConsumeCitiesContext };
