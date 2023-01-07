
## enums
const FuelType = {
  PETROL: 'PETROL',
  DIESEL: 'DIESEL',
  GAS: 'GAS',
  HYBRID: 'HYBRID',
  ELECTRO: 'ELECTRO',
  GAS_PETROL: 'GAS_PETROL',
}

const GearBox = {
  MECHANICAL: 'MECHANICAL',
  AUTOMATIC: 'AUTOMATIC',
}

const DriveType = {
  FRONT:
  BACK
  FULL
}

const BodyType = {
  SEDAN: 'SEDAN',
  STATION_WAGON: 'STATION_WAGON',
  HATCHBACK: 'HATCHBACK',
  COUPE: 'COUPE',
}


# carBrand
{
  id: 'some_id',
  name: 'Ford',
  country: 'USA'
}

# carModel
{
  id: 'some_id',
  name: 'Sierra 2',
  brand: 'CAR_BRAND_ID',
  yearStart: 1987,
  yearEnd: 1993, (or null if still in production)
  powerUnits: [
    {
      engineVolume: 1800,
      fuelType: FuelType.PETROL
      gearBox: GearBox.AUTOMATIC,
      driveType: DriveType.BACK,
    },
    {
      engineVolume: 3200,
      fuelType: FuelType.PETROL
      gearBox: GearBox.MECHANICAL,
      driveType: DriveType.FULL,
    }
  ],
  extraFeatures: [
    'ID_OF_SOME_EXTRA_FEATURE_1',
    'ID_OF_SOME_EXTRA_FEATURE_2',
    'ID_OF_SOME_EXTRA_FEATURE_3',
  ],
  bodyTypes: [
    BodyType.SEDAN,
    BodyType.STATION_WAGON,
  ],
}

# extraFeature
{
  id: 'some_id',
  title: 'Клімат контроль',
  description: 'ТЕКСТ ЯКИЙСЬ',
}

# car
{
  id: 'some_id',
  model: 'CAR_MODEL_ID',
  powerUnit: {
    engineVolume: 1800,
    fuelType: FuelType.PETROL
    gearBox: GearBox.AUTOMATIC,
    driveType: DriveType.BACK,
  },
  year: 1991,
  bodyTypes: BodyType.SEDAN,
  extraFeatures: [
    'ID_OF_SOME_EXTRA_FEATURE_1',
  ],
  color: 'red',
  plateNumber: 'AX7777XA',
}


