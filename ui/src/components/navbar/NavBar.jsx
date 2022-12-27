import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box, Select, MenuItem,
} from '@mui/material';
import './index.scss';

export const Navbar = () => {
  const { t, i18n } = useTranslation();

  const langs = {
    en: { nativeName: t('languages.en') },
    ua: { nativeName: t('languages.ua') },
  };

  return (
    <Box
      component="div"
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '30px',
      }}
    >
      <NavLink className="navbar__link" to="/">LOGO</NavLink>
      <NavLink className="navbar__link" to="/">{t('homePage.title')}</NavLink>
      <NavLink className="navbar__link" to="/login">{t('loginPage.title')}</NavLink>
      <NavLink className="navbar__link" to="/registration">{t('registration.title')}</NavLink>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {Object.keys(langs).map((lng) => (
          <MenuItem key={lng} value={lng}>{langs[lng].nativeName}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};
