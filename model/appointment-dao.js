import connection from '../infrastructure/mysql-connection';
import moment from 'moment';

class AppointmentDAO {
  save(appointment) {
    const date_create = moment().format('YYYY-MM-DD HH:MM:SS');
    const date_appointment = moment(appointment.date_appointment, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const appointmentWithDate = { ...appointment, date_create, date_appointment };

    // TODO Consider moving validation to a service layer

    /** Init validations */

    const isDateValid = moment(date_appointment).isSameOrAfter(date_create);
    const isClientValid = appointment.client.length >= 5;

    const validations = [
      {
        name: 'date',
        isValid: isDateValid,
        message: 'Date must be higher or equal than the current date'
      },
      {
        name: 'client',
        isValid: isClientValid,
        message: 'Name must have at least 5 characters'
      }
    ];

    const errors = validations.filter(field => !field.isValid);

    //** Finish validations */

    const sql = 'INSERT INTO appointment SET ?';

    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        return reject(errors.map(error => error.message));
      }

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
