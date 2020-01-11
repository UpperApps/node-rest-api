import appointmentDAO from '../model/appointment-dao';

module.exports = app => {
  app.get('/appointments', (req, res) => {
    appointmentDAO
      .findAll()
      .then(appointments => res.json(appointments))
      .catch(error => res.status(404).json(error));
  });

  app.get('/appointments/:id', (req, res) => {
    const id = req.params.id;

    appointmentDAO
      .findById(id)
      .then(appointments => res.json(appointments))
      .catch(error => res.status(404).json(error));
  });

  app.delete('/appointments/:id', (req, res) => {
    const id = req.params.id;

    appointmentDAO
      .delete(id)
      .then(res.status(204).end())
      .catch(error => res.status(404).json(error));
  });

  app.put('/appointments/:id', (req, res) => {
    const id = req.params.id;

    appointmentDAO
      .update(id, req.body)
      .then(result => res.status(201).json(result))
      .catch(error => res.status(404).json(error));
  });

  app.post('/appointments', (req, res) => {
    appointmentDAO
      .save(req.body)
      .then(result => res.status(201).json(result))
      .catch(error => res.status(404).json(error));
  });
};
