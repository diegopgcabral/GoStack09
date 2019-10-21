import * as Yup from 'yup';

const name = Yup.string().max(255);
const email = Yup.string().email();
const password = Yup.string()
  .min(6)
  .max(25);
const oldPassword = password;
const confirmPassword = password.when('password', (pass, field) =>
  pass ? field.required().oneOf([Yup.ref('password')]) : field
);

export const storeSchema = Yup.object().shape({
  name: name.required(),
  email: email.required(),
  password: password.required,
});

export const updateSchema = Yup.object().shape({
  name,
  email,
  oldPassword,
  password: password.when('oldPassword', (oldPass, field) =>
    oldPass ? field.required() : field
  ),
  confirmPassword,
});
