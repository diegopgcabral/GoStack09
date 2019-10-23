import * as Yup from 'yup';

const question = Yup.string().max(255);
const answer = Yup.string().max(255);

export const storeSchema = Yup.object().shape({
  question: question.required(),
});

export const updateSchema = Yup.object().shape({
  answer,
});
