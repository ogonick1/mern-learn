import { useTranslation } from 'react-i18next';
import {
  Box,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CarModelTable } from './CarModelTable';

export const CarModel = () => {
  const { t } = useTranslation();
  return (
    <div>
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
            {t('CarModel.title')}
          </Typography>
          <Button component={Link} to="/car-model/create">{t('CarModel.create')}</Button>
        </Stack>
        <CarModelTable />
      </Box>

    </div>
  );
};
