import connection from '../infrastructure/mysql-connection';
import moment from 'moment';

class AppointmentDAO {
  save(appointment) {
    const date_create = moment().format('YYYY-MM-DD HH:mm:ss');
    const appointmentWithDate = { ...appointment, date_create };

    const errors = this.validate(appointment);

    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO appointment SET ?';

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

  update(id, appointment) {
    const date_create = moment().format('YYYY-MM-DD HH:mm:ss');
    const appointmentWithDate = { ...appointment, date_create };

    const errors = this.validate(appointment);

    return new Promise((resolve, reject) => {
      const sql = 'UPDATE appointment SET ? where id = ?';

      if (errors.length > 0) {
        return reject(errors.map(error => error.message));
      }

      connection.query(sql, [appointmentWithDate, id], error => {
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
          return reject(`Error when getting appointments from database: ${error.sqlMessage}`);
        }
        return resolve(result);
      });
    });
  }

  findById(id) {
    const sql = 'SELECT * FROM appointment where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error when getting appointment with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve(result[0]);
      });
    });
  }

  delete(id) {
    const sql = 'DELETE FROM appointment where id = ?';

    return new Promise((resolve, reject) => {
      connection.query(sql, id, (error, result) => {
        if (error) {
          return reject(`Error deleting appointment with id: ${id} - Error: ${error.sqlMessage}`);
        }
        return resolve();
      });
    });
  }

  // TODO Consider moving validation to a service layer
  validate(fields) {
    const { date_create, date_appointment, client } = fields;

    const isDateValid = moment(date_appointment).isSameOrAfter(date_create);
    const isClientValid = client.length >= 5;

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

    return validations.filter(field => !field.isValid);
  }
}

export default new AppointmentDAO();
