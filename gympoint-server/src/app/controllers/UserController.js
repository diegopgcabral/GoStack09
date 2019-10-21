import User from '../models/User';

import { storeSchema, updateSchema } from '../validations/User';

class UserController {
  async store(req, res) {
    try {
      await storeSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validações dos campos' });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    try {
      await updateSchema.validate(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já cadastrado' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
