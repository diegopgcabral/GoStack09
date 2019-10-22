import * as Yup from 'yup';

const start_date = Yup.date();
const student_id = Yup.number().positive();
const plan_id = Yup.number().positive();

export const storeSchema = Yup.object().shape({
  start_date: start_date.required(),
  student_id: student_id.required(),
  plan_id: plan_id.required(),
});

export const updateSchema = Yup.object().shape({
  start_date,
  student_id,
  plan_id,
});
