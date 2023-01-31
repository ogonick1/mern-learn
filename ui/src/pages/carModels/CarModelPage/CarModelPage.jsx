import { useTranslation } from 'react-i18next';
import {
  Stack,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CarModelTable } from '../CarModelTable/CarModelTable';

export const CarModelPage = () => {
  const { t } = useTranslation(['carModel']);
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
            {t('carModel.title')}
          </Typography>
          <Button component={Link} to="/car-model/create">{t('carModel.create')}</Button>
        </Stack>
        <CarModelTable />
      </Container>

    </div>
  );
};
