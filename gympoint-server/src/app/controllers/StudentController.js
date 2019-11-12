import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const checkStudent = await Student.findOne({
      where: { email: req.body.email },
    });

    if (checkStudent) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const { idStudent } = req.params;

    const student = await Student.findByPk(idStudent);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não cadastrado' });
    }

    const { name, email, age, height, weight } = await student.update(req.body);
    return res.json({
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const students = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      limit: 10,
      offset: (page - 1) * 10,
      order: ['name'],
    });

    return res.json(students);
  }

  async delete(req, res) {
    const { idStudent } = req.params;

    const student = await Student.findByPk(idStudent);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não cadastrado' });
    }

    await student.destroy();
    return res.send();
  }

  async show(req, res) {
    const students = await Student.findByPk(req.params.idStudent);

    if (!students) {
      return res.status(400).json({ error: 'Aluno não cadastrado' });
    }

    return res.json(students);
  }
}

export default new StudentController();
