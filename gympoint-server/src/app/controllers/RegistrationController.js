import { parseISO, isBefore, addMonths } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

import { storeSchema, updateSchema } from '../validations/Registration';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async store(req, res) {
    try {
      await storeSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { start_date, student_id, plan_id } = req.body;
    const dateNow = new Date();

    if (isBefore(parseISO(start_date), parseISO(dateNow))) {
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

  async index(req, res) {
    const registration = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
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
    try {
      await updateSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { id } = req.params;

    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(400).json({ error: 'ID da matricula não encontrado' });
    }

    const { student_id, plan_id, start_date } = req.body;

    if (student_id && student_id !== registration.student_id) {
      const student = await Student.findByPk(student_id);
      if (!student) {
        return res.status(400).json({ error: 'Aluno não cadastrado' });
      }
    }

    if (plan_id && plan_id !== registration.plan_id) {
      const planExists = await Plan.findByPk(plan_id);
      if (!planExists) {
        return res.status(400).json({ error: 'Plano não encontrado' });
      }
    }

    const dateNow = new Date();
    if (start_date && start_date !== registration.start_date) {
      if (isBefore(parseISO(start_date), parseISO(dateNow))) {
        return res
          .status(400)
          .json({ error: 'Não é permitido usar datas passadas' });
      }
    }

    const plan = await Plan.findByPk(plan_id);
    const endDate = addMonths(parseISO(start_date), plan.duration);
    const TotalPrice = plan.price * plan.duration;

    const registrationUpdate = await registration.update({
      ...req.body,
      end_date: endDate,
      price: TotalPrice,
    });
    return res.json(registrationUpdate);
  }

  async delete(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(400).json({ error: 'ID da matricula não encontrada' });
    }

    await registration.destroy();
    return res.send();
  }
}

export default new RegistrationController();
