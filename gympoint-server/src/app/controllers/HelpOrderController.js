import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class HelpOrderController {
  async store(req, res) {
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

    const student = await Student.findByPk(idStudent);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não cadastrado' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: idStudent },
      order: [['created_at', 'DESC'], ['answer_at', 'ASC']],
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const { idHelpOrder } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(idHelpOrder, {
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
