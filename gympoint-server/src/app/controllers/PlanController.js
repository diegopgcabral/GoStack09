import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 10,
      offset: (page - 1) * 10,
      order: ['duration'],
    });
    return res.json(plans);
  }

  async show(req, res) {
    const { idPlan } = req.params;
    const plan = await Plan.findByPk(idPlan);
    return res.json(plan);
  }

  async store(req, res) {
    const checkPlan = await Plan.findOne({ where: { title: req.body.title } });
    if (checkPlan) {
      return res.status(400).json({ error: 'Plano já cadastrado' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const { idPlan } = req.params;

    const plan = await Plan.findByPk(idPlan);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não cadastrado' });
    }

    await plan.update(req.body);
    return res.json(plan);
  }

  async delete(req, res) {
    const { idPlan } = req.params;

    const plan = await Plan.findByPk(idPlan);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não cadastrado' });
    }

    await plan.destroy();
    return res.send();
  }
}

export default new PlanController();
