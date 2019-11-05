import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      attributes: ['id', 'question'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrders[0]) {
      return res
        .status(400)
        .json({ error: 'Não existem pedidos de auxilio sem resposta' });
    }

    return res.json(helpOrders);
  }
}

export default new AnswerController();
