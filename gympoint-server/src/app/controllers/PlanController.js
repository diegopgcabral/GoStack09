import Plan from '../models/Plan';

import { storeSchema, updateSchema } from '../validations/Plan';

class PlanController {
  async index(req, res) {
    if (!req.userId) {
      return res.status(400).json({ error: 'Usuário não autorizado' });
    }

    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async store(req, res) {
    try {
      await storeSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    if (!req.userId) {
      return res.status(400).json({ error: 'Usuário não autorizado' });
    }

    const checkPlan = await Plan.findOne({ where: { title: req.body.title } });
    if (checkPlan) {
      return res.status(400).json({ error: 'Plano já cadastrado' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
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

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não cadastrado' });
    }

    await plan.update(req.body);
    return res.json(plan);
  }

  async delete(req, res) {
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autorizado' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(400).json({ error: 'Plano não cadastrado' });
    }

    await plan.destroy();
    return res.send();
  }
}

export default new PlanController();
