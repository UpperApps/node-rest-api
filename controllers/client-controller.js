import clientDAO from '../model/client-dao';
import validateInputs from '../validations/validate-inputs';
import { nameValidations, idGETValidations, idValidations, cpfVAlidations } from '../validations/client-validations';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  clientDAO
    .findAll()
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.get('/:id', [...idGETValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  clientDAO
    .findById(id)
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.delete('/:id', [...idValidations], (req, res) => {
  validateInputs(req, res);
  const id = req.params.id;

  clientDAO
    .delete(id)
    .then(res.status(204).end())
    .catch(error => res.status(404).json(error));
});

router.put('/:id', [...idValidations, nameValidations, ...cpfVAlidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  clientDAO
    .update(id, req.body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

router.post('/', [nameValidations, ...cpfVAlidations], (req, res) => {
  validateInputs(req, res);

  clientDAO
    .save(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

export default router;
