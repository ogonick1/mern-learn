import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Navbar } from './components/navbar/NavBar';
import { Login } from './pages/login/Login';
import { Registration } from './pages/registration/Registration';
import { CarBrands } from './pages/carBrands/CarBrandsPage/CarBrandsPage';
import { CarBrandEditPage } from './pages/carBrands/CarBrandEditPage/CarBrandEditPage';
import { ExtraFeature } from './pages/ExtraFeature/ExtraFeature';
import { ExtraFeatureEditPage } from './pages/ExtraFeatureEditPage/ExtraFeatureEditPage';
import { CarModelEditPage } from './pages/CarModelEditPage/CarModelEditPage';
import { CarModel } from './pages/CarModel/CarModel';

export const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="false">
        <Routes>
          {isAuth && <Route path="car-brands" element={<CarBrands />} />}
          {isAuth && <Route path="car-brands/create" element={<CarBrandEditPage />} />}
          {isAuth && <Route path="car-brands/edit/:id" element={<CarBrandEditPage />} />}
          {isAuth && <Route path="extra-feature" element={<ExtraFeature />} />}
          {isAuth && <Route path="extra-feature/create" element={<ExtraFeatureEditPage />} />}
          {isAuth && <Route path="extra-feature/edit/:id" element={<ExtraFeatureEditPage />} />}
          {isAuth && <Route path="car-model" element={<CarModel />} />}
          {isAuth && <Route path="car-model/create" element={<CarModelEditPage />} />}
          {isAuth && <Route path="car-model/edit/:id" element={<CarModelEditPage />} />}
          {!isAuth && <Route path="login" element={<Login />} />}
          {!isAuth && <Route path="registration" element={<Registration />} />}
          <Route
            path="*"
            element={<Navigate replace to={isAuth ? 'car-brands' : 'login'} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>

  );
};
