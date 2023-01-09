import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CarBrandsTable } from '../../components/carBrandsTable/CarBrandsTable';

export const CarBrands = () => {
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
        {t('carBrands.title')}
      </Typography>
      <CarBrandsTable />
    </Box>
  );
};
