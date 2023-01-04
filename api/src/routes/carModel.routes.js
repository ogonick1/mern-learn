const { Router } = require('express');
const { check } = require('express-validator');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validatorErrorHandler.middleware');
const { objectIdParamValidationMiddleware } = require('../middlewares/objectIdParamValidation.middleware');
const { getCarModel, createCarModel } = require('../controllers/carModel.controller');
// const FuelType = require('../enums/FuelType.enum');
// const GearBox = require('../enums/GearBox.enum');
// const DriveType = require('../enums/DriveType.enum');

const router = Router();

router.get(
  '/:id',
  objectIdParamValidationMiddleware(),
  getCarModel,
);

router.post(
  '',
  [
    check('name', 'incorrect title, min 3 symbols max 20').isLength({ min: 3, max: 20 }),
    check('brandId', 'incorrect brand id').isMongoId(),
    check('yearStart', 'incorrect yearStart').isInt({ min: 1950 }),
    check('yearEnd', 'incorrect yearEnd').optional().custom((value, { req }) => (value > req.body.yearStart)),

    // check('powerUnits', 'invalid powerUnits').custom((value) => (value === ({
    //  engineVolume: Number,
    //  fuelType: FuelType,
    //  gearBox: GearBox,
    //  driveType: DriveType,
    // }))),

    check(
      'extraFeaturesIds',
      'incorect extraFeaturesIds',
    ).optional().isArray().isMongoId(),
    check(
      'bodyTypes',
      'incorrect bodyTypes',
    )
      .isArray({ min: 1 })
      .isIn([
        'SEDAN',
        'STATION_WAGON',
        'HATCHBACK',
        'COUPE',
      ]),
  ],
  validatorErrorHandlerMiddleware,
  createCarModel,
);

module.exports = router;
