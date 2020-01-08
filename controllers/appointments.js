module.exports = app => {
  app.get('/appointments', (req, res) => {
    res.send('You are in the appointments endpoint using GET');
  });

  app.post('/appointments', (req, res) => {
    console.log(req.body);
    res.send('You are in the appointments endpoint using POST');
  });
};
