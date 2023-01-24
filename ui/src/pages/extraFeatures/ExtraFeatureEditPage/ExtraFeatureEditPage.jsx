import {
  TextField, Typography, Box, Stack, Button, Container,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ExtraFeatureService } from '../../../services/extraFeature.service';

export const ExtraFeatureEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      title: yup.string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.minMaxLength', { min: 3, max: 20 }))
        .max(20, t('validationErrors.minMaxLength', { min: 3, max: 20 })),
      description: yup.string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.minMaxLength', { min: 3, max: 200 }))
        .max(200, t('validationErrors.minMaxLength', { min: 3, max: 200 })),
    });

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
        <Typography variant="h4" component="h4">{id ? t('extraFeature.titleEdit') : t('extraFeature.titleCreate')}</Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

          <Controller
            control={control}
            name="title"
            render={({
              field: {
                onChange, onBlur, value,
              },
              fieldState: { error },
            }) => {
              const isFieldValid = error ? false : undefined;
              const errorText = isFieldValid === false ? error?.message : '';
              return (
                <TextField
                  InputLabelProps={{ shrink: value }}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ''}
                  id="title"
                  label={t('extraFeature.title')}
                  variant="outlined"
                  margin="normal"
                  helperText={errorText}
                  error={!!errorText}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="description"
            render={({
              field: {
                onChange, onBlur, value,
              },
              fieldState: { error },
            }) => {
              const isFieldValid = error ? false : undefined;
              const errorText = isFieldValid === false ? error?.message : '';
              return (
                <TextField
                  InputLabelProps={{ shrink: value }}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ''}
                  id="description"
                  label={t('extraFeature.description')}
                  variant="outlined"
                  margin="normal"
                  helperText={errorText}
                  error={!!errorText}
                />
              );
            }}
          />
          <Stack
            marginTop={2}
            spacing={5}
            direction="row"
            alignItems="center"
          >
            <Button disabled={(isSubmitted || isDirty) && !isValid} type="submit" variant="contained">
              {t('extraFeature.save')}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
