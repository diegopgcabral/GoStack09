import { parseISO, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class UpdateRegistrationService {
  async run({ id, student_id, plan_id, start_date }) {
    const registration = await Registration.findByPk(id);
    if (!registration) {
      throw new Error('ID da matricula não encontrado');
    }

    if (student_id && student_id !== registration.student_id) {
      const student = await Student.findByPk(student_id);
      if (!student) {
        throw new Error('Aluno não cadastrado');
      }
    }

    if (plan_id && plan_id !== registration.plan_id) {
      const planExists = await Plan.findByPk(plan_id);
      if (!planExists) {
        throw new Error('Plano não encontrado');
      }
    }

    const plan = await Plan.findByPk(plan_id);
    const endDate = addMonths(parseISO(start_date), plan.duration);
    const price = plan.price * plan.duration;

    const registrationUpdate = await registration.update({
      student_id,
      plan_id,
      start_date,
      end_date: endDate,
      price,
    });

    return registrationUpdate;
  }
}

export default new UpdateRegistrationService();
