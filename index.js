const customExpress = require('./config/custom-express');

const app = customExpress();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
