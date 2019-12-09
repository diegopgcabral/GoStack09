import Student from '../models/Student';

class SessionStudentController {
  async store(req, res) {
    const { idStudent } = req.params;

    const student = await Student.findByPk(idStudent);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    return res.json(student);
  }
}

export default new SessionStudentController();
