import appointmentDAO from '../model/appointment-dao';

module.exports = app => {
  app.get('/appointments', (req, res) => {
    appointmentDAO
      .findAll()
      .then(appointments => {
        res.json(appointments);
      })
      .catch(error => res.status(404).json(error));
  });

  app.post('/appointments', (req, res) => {
    appointmentDAO
      .save(req.body)
      .then(result => res.status(201).json(result))
      .catch(error => res.status(404).json(`Incorrect payload: ${error}`));
  });
};
