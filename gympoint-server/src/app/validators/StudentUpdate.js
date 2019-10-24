import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().max(255),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .min(1)
        .integer(),
      weight: Yup.number()
        .positive()
        .min(1),
      height: Yup.number()
        .positive()
        .min(1),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Falha na validação dos campos', messages: err.inner });
  }
};
