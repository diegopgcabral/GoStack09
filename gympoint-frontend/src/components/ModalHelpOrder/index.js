import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Textarea, Form } from '@rocketseat/unform';

import { Container } from './styles';

import api from '~/services/api';

export default function ModalHelpOrder({ payload }) {
  const [answerHelpOrder, setAnswerHelpOrder] = useState();

  async function handleAnswerHelpOrder() {
    if (!answerHelpOrder) {
      toast.error('Você deve preencher a resposta');
    } else {
      try {
        await api.put(`/help-orders/${payload.id}/answer`, {
          answer: answerHelpOrder,
        });
        toast.success('Pedido de auxílio respondido com sucesso!');

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast.error(
          `Não foi possível responder o pedido de auxílio. Erro: ${err.message}`
        );
      }
    }
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
        <button type="button" onClick={() => handleAnswerHelpOrder()}>
          Responder aluno
        </button>
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
