import connection from '../infrastructure/mysql-connection';

class AppointmentDAO {
  save(appointment) {
    const sql = 'INSERT INTO appointment SET ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, appointment, error => {
        if (error) {
          return reject(error.sqlMessage);
        }

        return resolve();
      });
    });
  }

  findAll() {
    const sql = 'SELECT * FROM appointment';

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject('Error when getting appointments from database: ' + error.sqlMessage);
        }
        return resolve(result);
      });
    });
  }
}

export default new AppointmentDAO();
