import connection from '../infrastructure/mysql-connection';
import moment from 'moment';

class AppointmentDAO {
  save(appointment) {
    const date_create = moment().format('YYYY-MM-DD HH:MM:SS');
    const date_appointment = moment(appointment.date_appointment, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const appointmentWithDate = { ...appointment, date_create, date_appointment };

    const sql = 'INSERT INTO appointment SET ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, appointmentWithDate, error => {
        if (error) {
          return reject(error.sqlMessage);
        }

        return resolve(appointmentWithDate);
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
