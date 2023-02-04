import { useTranslation } from 'react-i18next';
import {
  Stack,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CarTable } from '../carTable';

export const CarPage = () => {
  const { t } = useTranslation(['car']);
  return (
    <div>
      <Container maxWidth="false">
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
            {t('car.title')}
          </Typography>
          <Button component={Link} to="/car/create">{t('car.create')}</Button>
        </Stack>
        <CarTable />
      </Container>
    </div>
  );
};
