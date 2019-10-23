import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { studentName, studentEmail, startDate, endDate, plan, price } = data;

    await Mail.sendMail({
      to: `${studentName} <${studentEmail}>`,
      subject: `Gympoint - Matrícula efetivada`,
      template: 'welcome',
      context: {
        student: studentName,
        title: plan,
        startDate: format(parseISO(startDate), "dd 'de' MMMM' de 'yyyy", {
          locale: pt,
        }),
        endDate: format(parseISO(endDate), "dd 'de' MMMM' de 'yyyy", {
          locale: pt,
        }),
        price: price.toFixed(2),
      },
    });
  }
}

export default new WelcomeMail();
