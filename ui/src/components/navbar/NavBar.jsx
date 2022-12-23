import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.scss';

export const Navbar = () => {
  const { t, i18n } = useTranslation();

  const langs = {
    en: { nativeName: t('languages.en') },
    ua: { nativeName: t('languages.ua') },
  };

  return (
    <div className="navbar">
      <NavLink className="navbar__link" to="/">LOGO</NavLink>
      <NavLink className="navbar__link" to="/">{t('homePage.title')}</NavLink>
      <NavLink className="navbar__link" to="/login">{t('loginPage.title')}</NavLink>
      <NavLink className="navbar__link" to="/registration">{t('registration.title')}</NavLink>
      <div className="btnlng">
        {Object.keys(langs).map((lng) => (
          <button
            key={lng}
            className={i18n.resolvedLanguage === lng ? 'btn active' : 'btn'}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
            type="submit"
          >
            {langs[lng].nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};
