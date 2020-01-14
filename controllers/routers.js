import express from 'express';
import appointments from './appointment-controller';
import clients from './client-controller';
import pets from './pet-controller';
import services from './service-controller';

const router = express.Router();

router.use('/appointments', appointments);
router.use('/clients', clients);
router.use('/client', pets);
router.use('/services', services);

export default router;
