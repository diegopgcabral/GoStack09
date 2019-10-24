import { parseISO, isBefore, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class UpdateRegistrationService {
  async run({ idRegistration, student_id, plan_id, start_date }) {
    const registration = await Registration.findByPk(idRegistration);
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

    const dateNow = new Date();
    if (start_date && start_date !== registration.start_date) {
      if (isBefore(parseISO(start_date), parseISO(dateNow))) {
        throw new Error('Não é permitido usar datas passadas');
      }
    }

    const plan = await Plan.findByPk(plan_id);
    const endDate = addMonths(parseISO(start_date), plan.duration);
    const TotalPrice = plan.price * plan.duration;

    const registrationUpdate = await registration.update({
      student_id,
      plan_id,
      start_date,
      end_date: endDate,
      price: TotalPrice,
    });

    return registrationUpdate;
  }
}

export default new UpdateRegistrationService();
