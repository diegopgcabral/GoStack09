import Student from '../models/Student';

import { storeSchema, updateSchema } from '../validations/Student';

class StudentController {
  async store(req, res) {
    try {
      await storeSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const checkStudent = await Student.findOne({
      where: { email: req.body.email },
    });

    if (checkStudent) {
      return res.status(400).json({ error: 'Aluno já cadastrado' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
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
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    try {
      await updateSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
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
}

export default new StudentController();
