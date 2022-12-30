const { Router } = require('express');
const authRoutes = require('./auth.routes');
const carBrandRoutes = require('./сarBrand.routes');
const extraFeatureRoutes = require('./extraFeature.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/car-brand', carBrandRoutes);
router.use('/extra-feature', extraFeatureRoutes);

module.exports = router;
