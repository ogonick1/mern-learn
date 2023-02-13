import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Navbar } from './components/feature/Navbar';
import { Login } from './pages/auth/LoginPage';
import { Registration } from './pages/auth/RegistrationPage';
import { CarBrandsPage } from './pages/carBrands/CarBrandsPage';
import { CarBrandEditPage } from './pages/carBrands/CarBrandEditPage';
import { CarModelPage } from './pages/carModels/CarModelPage/CarModelPage';
import { CarModelEditPage } from './pages/carModels/CarModelEditPage/CarModelEditPage';
import { ExtraFeaturePage } from './pages/extraFeatures/ExtraFeaturePage';
import { ExtraFeatureEditPage } from './pages/extraFeatures/ExtraFeatureEditPage';
import { CarPage } from './pages/car/carPage';
import { CarEditPage } from './pages/car/carEditPage';

export const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="false">
        <Routes>
          {isAuth && <Route path="car-brands" element={<CarBrandsPage />} />}
          {isAuth && <Route path="car-brands/create" element={<CarBrandEditPage />} />}
          {isAuth && <Route path="car-brands/edit/:id" element={<CarBrandEditPage />} />}
          {isAuth && <Route path="extra-feature" element={<ExtraFeaturePage />} />}
          {isAuth && <Route path="extra-feature/create" element={<ExtraFeatureEditPage />} />}
          {isAuth && <Route path="extra-feature/edit/:id" element={<ExtraFeatureEditPage />} />}
          {isAuth && <Route path="car-model" element={<CarModelPage />} />}
          {isAuth && <Route path="car-model/create" element={<CarModelEditPage />} />}
          {isAuth && <Route path="car-model/edit/:id" element={<CarModelEditPage />} />}
          {isAuth && <Route path="car" element={<CarPage />} />}
          {isAuth && <Route path="car/create" element={<CarEditPage />} />}
          {isAuth && <Route path="car/edit/:id" element={<CarEditPage />} />}
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
