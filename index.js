import customExpress from './config/custom-express';
import connection from './infrastructure/mysql-connection';
import e from 'express';

const app = customExpress();

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
