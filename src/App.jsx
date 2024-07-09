import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import CityInfo from "./components/CityInfo";
function App() {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    CitiesDataFitcher();
  }, []);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} loading={loading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} loading={loading} />}
            />
            <Route path="cities/:cityId" element={<CityInfo />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} loading={loading} />}
            />
            <Route path="form" element={<p>Form</p>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
