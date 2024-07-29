import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import CityInfo from "./components/CityInfo";
import Form from "./components/Form";
import RouteProtection from "./shared/components/RouteProtection";
// import PrivateRoute from "./shared/components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route
          path="app"
          element={
            <RouteProtection>
              <AppLayout />
            </RouteProtection>
          }
        >
          <Route index element={<Navigate replace to={"cities"} />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:cityId" element={<CityInfo />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
