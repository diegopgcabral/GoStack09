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
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      limit: 20,
      offset: (page - 1) * 20,
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
}

export default new StudentController();
