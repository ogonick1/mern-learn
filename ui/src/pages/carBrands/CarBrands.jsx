import { useTranslation } from 'react-i18next';
import {
  Box,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CarBrandsTable } from './CarBrandsTable';

export const CarBrands = () => {
  const { t } = useTranslation();

  return (
    <Box className="container">
      <Stack
        marginTop={2}
        spacing={5}
        direction="row"
        alignItems="center"
        display="flex"
        justifyContent="space-around"
      >
        <Typography
          variant="h4"
          component="h4"
        >
          {t('carBrands.title')}
        </Typography>
        <Button component={Link} to="/car-brands/create">{t('createCarBrand.titleCreate')}</Button>
      </Stack>
      <CarBrandsTable />
    </Box>
  );
};
