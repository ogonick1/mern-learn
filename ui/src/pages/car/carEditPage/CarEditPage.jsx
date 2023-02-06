import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Container, Grid, Stack, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomDatePicker } from '../../../components/fields/CustomDatePicker';
import { CustomSelect } from '../../../components/fields/CustomSelect';
import { CustomTextInput } from '../../../components/fields/CustomTextInput';
import { useBodyTypeOptions } from '../../../hooks/staticOptions/useBodyTypeOptions';
import { useDriveTypeOptions } from '../../../hooks/staticOptions/useDriveTypeOptions';
import { useFuelTypeOptions } from '../../../hooks/staticOptions/useFuelTypeOptions';
import { useGearBoxOptions } from '../../../hooks/staticOptions/useGearBoxOptions';
import { CarService } from '../../../services/car.service';
import { CarModelService } from '../../../services/carModel.service';
import { mapCarToFormValues, mapFormToInsertModel } from './carEditPage.logic';
import { getValidationSchema } from './validation.schema';

export const CarEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation('carModel', 'toast', 'carBrands', 'extraFeature', 'validationErrors');
  const [extraFeaturesOptions, setExtraFeaturesOptions] = useState([]);
  const [bodyTypeOption, setBodyTypeOption] = useState([]);
  const [yearStart, setYearStart] = useState(1970);
  const [yearEnd, setYearEnd] = useState(2023);
  const [yearRegistration, setYearRegistration] = useState(2023);
  const [powerUnits, setPowerUnits] = useState([]);
  // const [engineVolumeOption, setEngineVolumeOption] = useState([]);
  // const [fuelTypeOption, setFuelTypeOption] = useState([]);
  // const [gearBoxOption, setGearBoxOption] = useState([]);
  // const [driveTypeOption, setDriveTypeOption] = useState([]);
  // const bodyTypeOptions = useBodyTypeOptions();
  // const driveTypeOptions = useDriveTypeOptions();
  // const fuelTypeOptions = useFuelTypeOptions();
  // const gearBoxOptions = useGearBoxOptions();

  const navigate = useNavigate();
  const schema = getValidationSchema(t);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
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

  const createCar = async (form) => {
    const model = mapFormToInsertModel(form);
    try {
      if (id) {
        await CarService.patchCarById(id, model);
      } else {
        await CarService.create(model);
      }

      toast.success(id ? t('toast:toast.successfullyUpdated') : t('toast:toast.successfullyCreated'));

      navigate('/car-model');
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  const onSubmit = async (value) => {
    createCar(value);
  };
  const bodyTypeOptions = useBodyTypeOptions();
  const driveTypeOptions = useDriveTypeOptions();
  const fuelTypeOptions = useFuelTypeOptions();
  const gearBoxOptions = useGearBoxOptions();

  const getCarById = async (model) => {
    try {
      const result = await CarService.getCarById(model);
      reset(mapCarToFormValues({
        model: result,
        fuelTypeOptions,
        gearBoxOptions,
        driveTypeOptions,
        bodyTypeOptions,
      }));
    } catch (error) {
      toast.error(error?.resolvedErrorMessage);
    }
  };

  useEffect(() => {
    if (id) {
      getCarById(id);
    }
  }, []);

  const getCarModelOptions = (modelNameFilter = '') => {
    const requestModel = {};
    if (modelNameFilter) {
      requestModel.stringFilters = [
        {
          fieldName: 'name',
          values: [modelNameFilter],
          exactMatch: false,
        },
      ];
    }
    return CarModelService.search(requestModel)
      .then((result) => {
        return result.carModels;
      });
  };

  const modelWatcher = watch('carModel');
  const yearWatcher = watch('year');
  useEffect(() => {
    setYearRegistration(yearWatcher);
  }, [yearWatcher]);

  useEffect(() => {
    // handle extra features
    const selectedExtraFeatureOptions = getValues('extraFeaturesOptions');
    const selectedExtraFeatureIds = (selectedExtraFeatureOptions || [])
      .map((selectedExtraFeatureOption) => selectedExtraFeatureOption.id);
    const newSelectedExtraFeatureOptions = (modelWatcher?.extraFeaturesIds || [])
      .filter((extraFeature) => selectedExtraFeatureIds.includes(extraFeature.id));
    setValue('extraFeaturesOptions', newSelectedExtraFeatureOptions);
    setExtraFeaturesOptions(modelWatcher?.extraFeaturesIds || []);
  }, [modelWatcher]);

  useEffect(() => {
    const newSelectedBodyTypeOptions = (bodyTypeOptions || [])
      .filter((bodyType) => bodyType.value.includes(modelWatcher?.bodyTypes));
    setValue('bodyType', newSelectedBodyTypeOptions);
    setBodyTypeOption(newSelectedBodyTypeOptions || []);
  }, [modelWatcher]);
  useEffect(() => {
    setYearStart(modelWatcher?.yearStart || 1970);
    setYearEnd(modelWatcher?.yearEnd || new Date());
  }, [modelWatcher]);

  useEffect(() => {
    // handle powerUnits
    const selectedPowerUnitOptions = getValues('powerUnit');
    const selectedPowerUnits = (selectedPowerUnitOptions || [])
      .map((selectedPowerUnit) => selectedPowerUnit);
    const newSelectedPowerUnitOptions = (modelWatcher?.powerUnits || [])
      .filter((powerUnit) => selectedPowerUnits.includes(powerUnit));
    setValue('powerUnit', newSelectedPowerUnitOptions);
    setPowerUnits(modelWatcher?.powerUnits || []);
  }, [modelWatcher]);
  return (
    <div>
      <Container>
        <Box
          component="div"
          sx={{ margin: '15px' }}
        >
          <Typography
            variant="h4"
            component="h4"
          >
            {t('carModel:carModel.title')}
          </Typography>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={2}
            >
              <Grid item xs={12} md={6}>
                <CustomSelect
                  control={control}
                  name="carModel"
                  searchCallback={getCarModelOptions}
                  id="carModel"
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  label={t('carModel:carModel.title')}
                  getOptionLabel={(option) => option.name || ''}
                  ifNoValue={null}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  control={control}
                  name="powerUnit"
                  id="powerUnit"
                  label={t('car:car.powerUnit')}
                  options={powerUnits}
                  getOptionLabel={(option) => Object.entries(option) || ''}
                  isOptionEqualToValue={(option, val) => option.value === val.value}
                  ifNoValue={null}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  maxDate={new Date(yearEnd.toString())}
                  minDate={new Date(yearStart.toString())}
                  control={control}
                  name="year"
                  id="year"
                  label={t('carModel:carModel.year')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  ifNoValue={[]}
                  control={control}
                  name="bodyType"
                  options={bodyTypeOption}
                  id="bodyType"
                  label={t('car:car.bodyType')}
                  getOptionLabel={(option) => option.title || ''}
                  isOptionEqualToValue={(option, val) => val.value === option.value}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  ifNoValue={[]}
                  control={control}
                  name="extraFeaturesOptions"
                  multiple
                  options={extraFeaturesOptions}
                  id="extraFeaturesOptions"
                  label={t('extraFeature:extraFeature.title')}
                  getOptionLabel={(option) => option.title || ''}
                  isOptionEqualToValue={(option, val) => val.id === option.id}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  control={control}
                  name="color"
                  label={t('car:car.color')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  control={control}
                  name="plateNumber"
                  label={t('car:car.plateNumber')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  showYearPicker={false}
                  minDate={new Date(yearRegistration)}
                  control={control}
                  name="plateNumberRegistrationDate"
                  id="plateNumberRegistrationDate"
                  label={t('car:car.plateNumberRegistrationDate')}
                  dateFormat="dd/MM/yyyy"
                />
              </Grid>
            </Grid>

            <Stack
              marginTop={2}
              spacing={5}
              direction="row"
              alignItems="center"
            >
              <Button
                disabled={(isSubmitted || isDirty) && !isValid}
                type="submit"
                variant="contained"
              >
                {t('carBrands:carBrands.save')}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </div>
  );
};
