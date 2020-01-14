import { check, sanitize, param } from 'express-validator';

export const idGETValidations = [
  param('id')
    .isInt()
    .withMessage('Id must be an integer number'),
  param('client_id')
    .isInt()
    .withMessage('Id must be an integer number'),
  sanitize('id').toInt()
];

export const idValidations = [
  param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt()
    .withMessage('Id must be an integer number'),
  param('client_id')
    .notEmpty()
    .withMessage('Id is required')
    .isInt()
    .withMessage('Id must be an integer number'),
  sanitize('id').toInt()
];

export const nameValidations = check('name')
  .isLength({ min: 4 })
  .withMessage('Client name must be higher than 4 characteres');
