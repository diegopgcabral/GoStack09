import Student from '../models/Student';
import File from '../models/File';

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
    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
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
