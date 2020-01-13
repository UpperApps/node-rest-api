import express from 'express';
import appointments from './appointment-controller';

const router = express.Router();

router.use('/appointments', appointments);

export default router;
