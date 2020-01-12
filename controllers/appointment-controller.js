import appointmentService from '../model/appointment-service';

// TODO Change this implementation to use express Router.
// TODO Include input sanitization using express validator.
module.exports = app => {
  app.get('/appointments', (req, res) => {
    appointmentService
      .findAll()
      .then(appointments => res.json(appointments))
      .catch(error => res.status(404).json(error));
  });

  app.get('/appointments/:id', (req, res) => {
    const id = req.params.id;

    appointmentService
      .findById(id)
      .then(appointments => res.json(appointments))
      .catch(error => res.status(404).json(error));
  });

  app.delete('/appointments/:id', (req, res) => {
    const id = req.params.id;

    appointmentService
      .delete(id)
      .then(res.status(204).end())
      .catch(error => res.status(404).json(error));
  });

  app.put('/appointments/:id', (req, res) => {
    const id = req.params.id;

    appointmentService
      .update(id, req.body)
      .then(result => res.status(201).json(result))
      .catch(error => res.status(404).json(error));
  });

  app.post('/appointments', (req, res) => {
    appointmentService
      .save(req.body)
      .then(result => res.status(201).json(result))
      .catch(error => res.status(404).json(error));
  });
};
