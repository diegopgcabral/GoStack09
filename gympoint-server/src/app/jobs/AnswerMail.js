import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: `Gympoint - Dúvida respondida`,
      template: 'answer',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: format(
          parseISO(helpOrder.answer_at),
          "dd 'de' MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();
