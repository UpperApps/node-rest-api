import appointmentDAO from '../model/appointment-dao';

module.exports = app => {
  app.get('/appointments', (req, res) => {
    appointmentDAO
      .findAll()
      .then(appointments => {
        res.send(appointments);
      })
      .catch(error => res.status(404).send('No appointments found'));
  });

  app.post('/appointments', (req, res) => {
    appointmentDAO
      .save(req.body)
      .then(() => res.status(204).end())
      .catch(error => res.status(404).send(`Incorrect payload: ${error}`));
  });
};
