import * as Yup from 'yup';

const name = Yup.string().max(255);
const email = Yup.string().email();
const age = Yup.number()
  .positive()
  .min(1)
  .integer();
const weight = Yup.number().positive();
const height = Yup.number().positive();

export const storeSchema = Yup.object().shape({
  name: name.required(),
  email: email.required(),
  age: age.required(),
  weight: weight.required(),
  height: height.required(),
});

export const updateSchema = Yup.object().shape({
  name,
  email,
  age,
  weight,
  height,
});
