import serviceDAO from '../model/service-dao';
import validateInputs from '../validations/validate-inputs';
import { nameValidations, idGETValidations, idValidations } from '../validations/service-validations';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  serviceDAO
    .findAll()
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.get('/:id', [...idGETValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  serviceDAO
    .findById(id)
    .then(appointments => res.json(appointments))
    .catch(error => res.status(404).json(error));
});

router.delete('/:id', [...idValidations], (req, res) => {
  validateInputs(req, res);
  const id = req.params.id;

  serviceDAO
    .delete(id)
    .then(res.status(204).end())
    .catch(error => res.status(404).json(error));
});

router.put('/:id', [...idValidations, nameValidations], (req, res) => {
  validateInputs(req, res);

  const id = req.params.id;

  serviceDAO
    .update(id, req.body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

router.post('/', [nameValidations], (req, res) => {
  validateInputs(req, res);

  serviceDAO
    .save(req.body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(404).json(error));
});

export default router;
