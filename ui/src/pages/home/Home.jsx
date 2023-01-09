import { useTranslation } from 'react-i18next';
import { Box, Skeleton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Home = () => {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth]);
  return (
    <Box>
      <Typography
        variant="h4"
        component="h4"
      >
        {t('homePage.welcome')}
      </Typography>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
};
