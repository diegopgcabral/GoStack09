import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      student_id: Yup.number().positive(),
      plan_id: Yup.number().positive(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Falha na validação dos campos', messages: err.inner });
  }
};
