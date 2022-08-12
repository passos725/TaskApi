import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  // Store the info

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8).max(15),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const userExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExist) {
      return res.status(400).json({ error: 'Email ja cadastrado!' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  // Update the info

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8).max(15),
      password: Yup.string()
        .min(8)
        .max(15)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha na validação' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });
      if (userExist) {
        return res.status(400).json({ error: 'Email ja cadastrado!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(404).json({ error: 'Senha incorreta' });
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
