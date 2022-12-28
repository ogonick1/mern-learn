import { useTranslation } from 'react-i18next';
import { Box, Skeleton, Typography } from '@mui/material';

export const Home = () => {
  const { t } = useTranslation();
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
