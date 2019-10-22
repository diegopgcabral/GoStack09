import * as Yup from 'yup';

const title = Yup.string().max(255);
const duration = Yup.number()
  .positive()
  .integer();
const price = Yup.number().positive();

export const storeSchema = Yup.object().shape({
  title: title.required(),
  duration: duration.required(),
  price: price.required(),
});

export const updateSchema = Yup.object().shape({
  title,
  duration,
  price,
});
