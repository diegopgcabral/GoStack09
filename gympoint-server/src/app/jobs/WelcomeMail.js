import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { studentName, studentEmail, startDate, endDate, plan, price } = data;

    console.log(data);
    console.log('Fila executou...');

    await Mail.sendMail({
      to: studentEmail,
      Subject: 'Matrícula efetivada',
      template: 'welcome',
      context: {
        student: studentName,
        title: plan,
        startDate: format(parseISO(startDate), "'Dia' dd 'de' MMM' de 'yyyy", {
          locale: pt,
        }),
        endDate: format(parseISO(endDate), "'Dia' dd 'de' MMM' de 'yyyy", {
          locale: pt,
        }),
        price: price.toFixed(2),
      },
    });
  }
}

export default new WelcomeMail();
