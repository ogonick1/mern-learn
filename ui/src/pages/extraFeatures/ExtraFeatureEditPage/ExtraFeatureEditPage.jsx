import {
  Typography, Box, Stack, Button, Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExtraFeatureService } from '../../../services/extraFeature.service';
import { getValidationSchema } from './validation.schema';
import { CustomTextInput } from '../../../components/fields/CustomTextInput/CustomTextInput';

export const ExtraFeatureEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation(['extraFeature', 'validationErrors', 'toast']);
  const navigate = useNavigate();
  const schema = getValidationSchema(t);

  const {
    handleSubmit,
    control,
    reset,
    formState: {
      isDirty,
      isValid,
      isSubmitted,
    },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const createExtraFeature = async (form) => {
    try {
      if (id) {
        await ExtraFeatureService.patchById(id, form);
      } else {
        await ExtraFeatureService.create(form);
      }
      navigate('/extra-feature');
      toast.success(id ? t('toast:toast.successfullyUpdated') : t('toast:toast.successfullyCreated'));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const getExtraFeatureById = async (Id) => {
    try {
      const result = await ExtraFeatureService.getById(Id);
      reset({
        title: result.title,
        description: result.description,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onSubmit = async (value) => {
    createExtraFeature(value);
  };
  useEffect(() => {
    if (id) {
      getExtraFeatureById(id);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        component="div"
        sx={{ margin: '15px' }}
      >
        <Typography variant="h4" component="h4">{id ? t('extraFeature:extraFeature.titleEdit') : t('extraFeature:extraFeature.titleCreate')}</Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <CustomTextInput
            control={control}
            name="title"
            label={t('extraFeature:extraFeature.title')}
          />
          <CustomTextInput
            control={control}
            name="description"
            label={t('extraFeature:extraFeature.description')}
          />
          <Stack
            marginTop={2}
            spacing={5}
            direction="row"
            alignItems="center"
          >
            <Button disabled={(isSubmitted || isDirty) && !isValid} type="submit" variant="contained">
              {t('extraFeature:extraFeature.save')}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
