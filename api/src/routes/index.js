const { Router } = require('express');
const authRoutes = require('./auth.routes');
const carBrandRoutes = require('./сarBrand.routes');
const extraFeatureRoutes = require('./extraFeature.routes');
const carModel = require('./carModel.routes');
const car = require('./car.routes');
const { authMiddlewares } = require('../middlewares/auth.middlewares');

const router = Router();

router.use('/auth', authRoutes);
router.use('/car-brand', authMiddlewares, carBrandRoutes);
router.use('/extra-feature', authMiddlewares, extraFeatureRoutes);
router.use('/car-model', authMiddlewares, carModel);
router.use('/car', authMiddlewares, car);

module.exports = router;
