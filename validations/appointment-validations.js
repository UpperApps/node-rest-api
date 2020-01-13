import { check, sanitize, sanitizeBody, param } from 'express-validator';

export const idGETValidations = [
  param('id')
    .isNumeric()
    .withMessage('Id must be an integer number'),
  sanitize('id').toInt()
];

export const idValidations = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt()
    .withMessage('Id must be an integer number'),
  sanitize('id').toInt()
];

export const clientValidations = check('client')
  .isLength({ min: 4 })
  .withMessage('Client name must be higher than 4 characteres');

export const dateAppointmentValidations = [
  check('date_appointment')
    .isISO8601('YYYY-MM-DD HH:mm:ss')
    .withMessage('Date must have the following format: YYYY-MM-DD HH:mm:ss'),
  sanitizeBody('date_appointment').toDate()
];
