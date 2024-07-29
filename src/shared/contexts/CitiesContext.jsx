import { createContext, useContext, useEffect, useReducer } from "react";

// Base URL for API requests
const BASE_URL = "http://localhost:8000";

// Create a React context for managing city data
const CitiesContext = createContext();

// Initial state for the city data
const initialState = {
  loading: false, // Indicates if data is being fetched
  cities: [], // Array of city objects
  currentCity: {}, // Currently selected city
  error: "", // Error message if any
};

// Reducer function to handle state updates
function ReducerFn(state, action) {
  switch (action.type) {
    case "loading":
      // Start loading indicator
      return { ...state, loading: true };

    case "cities/loaded":
      // Update state with fetched cities and clear loading and error
      return { ...state, cities: action.payload, loading: false, error: "" };

    case "cities/create":
      // Add new city to the list and set it as current city
      return {
        ...state,
        cities: [action.payload, ...state.cities],
        currentCity: action.payload,
        loading: false,
        error: "",
      };

    case "cities/delete":
      // Remove deleted city from the list and clear current city
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
        loading: false,
        error: "",
      };

    case "cities/current":
      // Set the current city
      return {
        ...state,
        currentCity: action.payload,
        loading: false,
        error: "",
      };

    case "rejected":
      // Handle error by setting error message and clearing loading
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

// Context provider component
const CitiesProvider = ({ children }) => {
  // Use the reducer to manage state
  const [state, dispatch] = useReducer(ReducerFn, initialState);
  const { loading, currentCity, cities, error } = state;

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) {
          throw new Error(
            `Can't fetch Data from server , Error ${response.status}`
          );
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    };

    fetchCities();
  }, []);

  // Function to get a specific city by ID
  const getCity = async cityId => {
    if (currentCity.id === +cityId) {
      // City already fetched, avoid unnecessary API call
      dispatch({ type: "cities/current", payload: currentCity });
      return;
    }
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${cityId}`);
      if (!response.ok) {
        throw new Error("You have an error ⛔ from getting current city");
      }
      const data = await response.json();
      dispatch({ type: "cities/current", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  };

  // Function to add a new city
  const addCityToDb = async newCity => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      if (!response.ok) {
        throw new Error("You have an error ⛔ from adding the new city.");
      }

      const addedCity = await response.json();
      dispatch({ type: "cities/create", payload: addedCity });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  };

  // Function to delete a city
  const deleteCityFromDb = async cityId => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("You have an error ⛔ from deleting the city.");
      }
      dispatch({
        type: "cities/delete",
        payload: cityId,
      });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  };

  // Provide city data and functions to child components
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        error,
        currentCity,
        getCity,
        addCityToDb,
        deleteCityFromDb,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// Custom hook to consume the context
const useCitiesContext = () => {
  if (useContext(CitiesContext) === undefined) {
    throw new Error("Consuming context value outside a provider.");
  }
  return useContext(CitiesContext);
};

export { CitiesProvider, useCitiesContext };
