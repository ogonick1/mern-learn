import { useTranslation } from 'react-i18next';
import {
  Box,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ExtraFeatureTable } from '../ExtraFeatureTable';

export const ExtraFeaturePage = () => {
  const { t } = useTranslation(['extraFeature']);
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
          {t('extraFeature:extraFeature.title')}
        </Typography>
        <Button component={Link} to="/extra-feature/create">{t('extraFeature:extraFeature.create')}</Button>
      </Stack>
      <ExtraFeatureTable />
    </Box>

  );
};
