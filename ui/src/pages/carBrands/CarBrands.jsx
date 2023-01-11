import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CarBrandsTable } from './CarBrandsTable';

export const CarBrands = () => {
  const { t } = useTranslation();

  return (
    <Box className="container">
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
