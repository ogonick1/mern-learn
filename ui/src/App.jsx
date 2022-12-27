import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Navbar } from './components/navbar/NavBar';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { SignUp } from './pages/signUp/SignUp';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="registration/*" element={<SignUp />} />
          <Route path="login/" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>

  );
};
