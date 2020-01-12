import appointmentDAO from './appointment-dao';
import moment from 'moment';

class AppointmentService {
  save(appointment) {
    const date_create = moment().format('YYYY-MM-DD HH:mm:ss');
    const appointmentWithDate = { ...appointment, date_create };

    return new Promise((resolve, reject) => {
      const errors = this.validate(appointment);

      if (errors.length > 0) {
        return reject(errors.map(error => error.message));
      }

      appointmentDAO
        .save(appointmentWithDate)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  update(id, appointment) {
    const date_create = moment().format('YYYY-MM-DD HH:mm:ss');
    const appointmentWithDate = { ...appointment, date_create };

    return new Promise((resolve, reject) => {
      const errors = this.validate(appointment);

      if (errors.length > 0) {
        return reject(errors.map(error => error.message));
      }

      appointmentDAO
        .update(id, appointmentWithDate)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      appointmentDAO
        .delete(id)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
        appointmentDAO
          .findAll()
          .then(result => resolve(result))
          .catch(error => reject(error));
      });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
        appointmentDAO
          .findById(id)
          .then(result => resolve(result))
          .catch(error => reject(error));
      });
  }

  // TODO Include express-validator to perform fields validation.
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

    return validations.filter(input => !input.isValid);
  }
}

export default new AppointmentService();