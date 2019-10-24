import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .max(255)
        .required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .min(1)
        .integer()
        .required(),
      weight: Yup.number()
        .positive()
        .min(1)
        .required(),
      height: Yup.number()
        .positive()
        .min(1)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Falha na validação dos campos', messages: err.inner });
  }
};
