import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

import CreateRegistrationService from '../services/CreateRegistrationService';
import UpdateRegistrationService from '../services/UpdateRegistrationService';

class RegistrationController {
  async store(req, res) {
    const { start_date, student_id, plan_id } = req.body;

    const registration = await CreateRegistrationService.run({
      start_date,
      student_id,
      plan_id,
    });

    return res.json(registration);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const registration = await Registration.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
      order: ['start_date'],
    });
    return res.json(registration);
  }

  async show(req, res) {
    const { idRegistration } = req.params;

    const registration = await Registration.findOne({
      where: { id: idRegistration },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });
    return res.json(registration);
  }

  async update(req, res) {
    const { id, student_id, plan_id, start_date } = req.body;

    const registrationUpdate = await UpdateRegistrationService.run({
      id,
      student_id,
      plan_id,
      start_date,
    });

    return res.json(registrationUpdate);
  }

  async delete(req, res) {
    const { idRegistration } = req.params;

    const registration = await Registration.findByPk(idRegistration);
    if (!registration) {
      return res.status(400).json({ error: 'ID da matricula não encontrada' });
    }

    await registration.destroy();
    return res.send();
  }
}

export default new RegistrationController();
