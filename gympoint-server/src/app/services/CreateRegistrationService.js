import { parseISO, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../lib/Queue';

class CreateRegistrationService {
  async run({ start_date, student_id, plan_id }) {
    // if (isBefore(parseISO(start_date), new Date())) {
    //   throw new Error('Não é permitido fazer matricula em data passada');
    // }

    const student = await Student.findByPk(student_id);
    if (!student) {
      throw new Error('Aluno não encontrado');
    }

    const checkStudent = await Registration.findOne({
      where: { student_id },
    });

    if (checkStudent) {
      throw new Error('Aluno já possui uma matrícula');
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      throw new Error('Plano não encontrado');
    }

    const endDate = addMonths(parseISO(start_date), plan.duration);
    const price = plan.price * plan.duration;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date: endDate,
      price,
    });

    await Queue.add(WelcomeMail.key, {
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      startDate: start_date,
      endDate,
      plan: plan.title,
      price,
    });

    return registration;
  }
}

export default new CreateRegistrationService();
