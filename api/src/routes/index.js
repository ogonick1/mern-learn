const { Router } = require('express');
const authRoutes = require('./auth.routes');
const carBrandRoutes = require('./сarBrand.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/car-brand', carBrandRoutes);

module.exports = router;
