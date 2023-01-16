import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box, Select, MenuItem, Button,
} from '@mui/material';

import './index.scss';
import { logOut } from '../../plugins/store/userSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const { t, i18n } = useTranslation();

  const langs = {
    en: { nativeName: t('languages.en') },
    ua: { nativeName: t('languages.ua') },
  };
  return (
    <Box
      component="div"
      className="navbar__box"
    >
      <NavLink className="navbar__link" to="/">LOGO</NavLink>
      {isAuth && <NavLink className="navbar__link" to="/">{t('homePage.title')}</NavLink>}
      {isAuth && <NavLink className="navbar__link" to="car-model">{t('carModel.title')}</NavLink>}
      {isAuth && <NavLink className="navbar__link" to="car-brands">{t('carBrands.title')}</NavLink>}
      {isAuth && <NavLink className="navbar__link" to="extra-feature">{t('extraFeature.title')}</NavLink>}
      {isAuth && <Button variant="contained" onClick={() => dispatch(logOut())}>{t('loginPage.logout')}</Button>}
      <Select
        className="navbar__select"
        id="simple-select"
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {Object.keys(langs).map((lng) => (
          <MenuItem className="navbar__select-item" key={lng} value={lng}>{langs[lng].nativeName}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};
