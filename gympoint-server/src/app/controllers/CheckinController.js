import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CkeckinController {
  async store(req, res) {
    const { idStudent } = req.params;

    const checkStudent = await Student.findByPk(idStudent);
    if (!checkStudent) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    const countCheckins = await Checkin.findAll({
      where: {
        student_id: idStudent,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (countCheckins.length >= 5) {
      return res
        .status(402)
        .json({ error: 'Número máximo de checkins em 7 dias já foi excedido' });
    }

    const checkin = await Checkin.create({ student_id: idStudent });

    return res.json(checkin);
  }

  async index(req, res) {
    const { idStudent } = req.params;
    const { page = 1 } = req.query;

    const checkStudent = await Student.findByPk(idStudent);
    if (!checkStudent) {
      return res.status(400).json({ error: 'Aluno não cadastrado' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: idStudent },
      order: [['created_at', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(checkins);
  }
}

export default new CkeckinController();
