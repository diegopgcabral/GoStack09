module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question: 'Com que ritmo é preciso treinar para ter resultados?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          question: 'Com que ritmo é preciso treinar para ter resultados?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          question: 'Com que ritmo é preciso treinar para ter resultados?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 4,
          question: 'Com que ritmo é preciso treinar para ter resultados?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 1,
          question: 'Qual o erro mais comum a não cometer na academia?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          question: 'Qual o erro mais comum a não cometer na academia?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          question: 'Que exercício devo fazer para perder a barriga?',
          answer: null,
          answer_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
