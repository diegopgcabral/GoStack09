import Student from '../models/Student';
import File from '../models/File';

import { storeSchema, updateSchema } from '../validations/Student';

class StudentController {
  async store(req, res) {
    try {
      await storeSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
    }

    const checkStudent = await Student.findOne({
      where: { email: req.body.email },
    });

    if (checkStudent) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const { id, name, email, age, height, weight } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async update(req, res) {
    try {
      await updateSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
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
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
    }
    const students = await Student.findAll({
      attributes: ['name', 'email', 'age', 'weight', 'height'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });
    return res.json(students);
  }
}

export default new StudentController();
