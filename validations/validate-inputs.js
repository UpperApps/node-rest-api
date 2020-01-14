import { validationResult } from 'express-validator';

const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    throw new Error('teste');
  }
};

export default validate;
