import { parseISO, isBefore, addMonths } from 'date-fns';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

import { storeSchema } from '../validations/Registration';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async store(req, res) {
    try {
      await storeSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
    }

    const { start_date, student_id, plan_id } = req.body;

    if (isBefore(parseISO(start_date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Não é permitido fazer matricula em data passada' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    const checkStudent = await Registration.findOne({ where: { student_id } });
    if (checkStudent) {
      return res.status(400).json({ error: 'Aluno já possui uma matrícula' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    const endDate = addMonths(parseISO(start_date), plan.duration);
    const TotalPrice = plan.price * plan.duration;

    const registration = await Registration.create({
      ...req.body,
      end_date: endDate,
      price: TotalPrice,
    });

    await Queue.add(WelcomeMail.key, {
      studentName: student.name,
      studentEmail: student.email,
      startDate: start_date,
      endDate,
      plan: plan.title,
      price: TotalPrice,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
