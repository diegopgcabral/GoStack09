import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Textarea, Form } from '@rocketseat/unform';

import { Container } from './styles';

import api from '~/services/api';

export default function ModalHelpOrder({ payload }) {
  const [answerHelpOrder, setAnswerHelpOrder] = useState();
  const [loading, setLoading] = useState(false);

  async function handleAnswerHelpOrder() {
    setLoading(true);
    if (!answerHelpOrder) {
      toast.error('Você deve preencher a resposta');
      setLoading(false);
    } else {
      try {
        await api.put('/help-orders/answer', {
          id: payload.id,
          answer: answerHelpOrder,
        });
        toast.success('Pedido de auxílio respondido com sucesso!');

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (_err) {
        toast.error(
          `Não foi possível responder o pedido de auxílio! ${_err.response.data.error}`
        );
      }
    }
  }

  function handleReturn() {
    window.location.reload();
  }

  return (
    <Container>
      <Form>
        <strong>PERGUNTA DO ALUNO</strong>
        <span>{payload.question}</span>
        <strong>SUA RESPOSTA</strong>
        <Textarea
          name="answer"
          placeholder="Digite a resposta aqui..."
          onChange={e => setAnswerHelpOrder(e.target.value)}
          value={answerHelpOrder}
        />
        <footer>
          <button className="return" type="button" onClick={handleReturn}>
            Voltar
          </button>
          <button type="button" onClick={() => handleAnswerHelpOrder()}>
            {loading ? 'Respondendo...' : 'Responder aluno'}
          </button>
        </footer>
      </Form>
    </Container>
  );
}

ModalHelpOrder.propTypes = {
  payload: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};
