import customExpress from './config/custom-express';
import connection from './infrastructure/mysql-connection';
import routers from './controllers/routers';

const app = customExpress();

app.use('/api', routers);

connection.connect(error => {
  if (error) {
    console.log('Error when connecting with database.');
    console.log(error);
  } else {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }
});
