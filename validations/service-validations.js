import { check, sanitize, param } from 'express-validator';

export const idGETValidations = [
  param('id')
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
  sanitize('id').toInt()
];

export const nameValidations = check('name')
  .isLength({ min: 5 })
  .withMessage('Client name must be higher than 5 characteres');

export const priceValidations = check('price')
  .isDecimal({ decimal_digits: 2 })
  .withMessage('Client name must be a number with 2 decimals');
