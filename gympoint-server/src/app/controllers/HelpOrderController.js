import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

import { storeSchema, updateSchema } from '../validations/HelpOrder';

class HelpOrderController {
  async store(req, res) {
    try {
      await storeSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { idStudent } = req.params;
    const student = await Student.findByPk(idStudent);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não cadastrado' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id: idStudent,
      question,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { idStudent } = req.params;
    const { page = 1 } = req.query;

    const student = await Student.finddByPk(idStudent);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não cadastrado' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: idStudent },
      order: ['created_at'],
      attributes: ['id', 'question', 'answer', 'answer_at'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    try {
      await updateSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(id, {
      attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'ID HelpOrder não encontrado' });
    }

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(AnswerMail.key, { helpOrder });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
