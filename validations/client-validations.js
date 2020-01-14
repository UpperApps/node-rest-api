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
  .isLength({ min: 3 })
  .withMessage('Client name must be higher than 3 characteres');

export const cpfVAlidations = [
  check('cpf')
    .isLength({ min: 11, max: 11 })
    .withMessage('CPF must have exactly 11 carachteres')
    .isInt()
    .withMessage('CPF must be a number'),
  sanitize('cpf').toInt()
];
