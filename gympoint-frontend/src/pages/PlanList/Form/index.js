import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Content } from './styles';

import history from '~/services/history';
import api from '~/services/api';

import { formatCurrencyBR, numberMask, moneyMask } from '~/util/format';

const schema = Yup.object().shape({
  title: Yup.string().required('Título do plano é obrigatório'),
  duration: Yup.number()
    .typeError('Duração do plano deve ser numérico')
    .min(1, 'Duração do plano deve ser maior ou igual a 1 mês')
    .required('Duração é obrigatório'),
  price: Yup.number()
    .typeError('Preço deve ser numérico')
    .min(1, 'Preço deve ser maior ou igual a 1')
    .required('Preço é obrigatório'),
});

export default function FormPlan() {
  const { idPlan } = useParams();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();

  const totalPrice = useMemo(
    () => (!price ? formatCurrencyBR(0) : formatCurrencyBR(duration * price)),
    [duration, price]
  );

  useEffect(() => {
    async function loadPLan() {
      const response = await api.get(`plans/${idPlan}`);

      setTitle(response.data.title);
      setDuration(response.data.duration);
      setPrice(response.data.price);
    }

    if (idPlan) {
      setEdit(true);
      loadPLan();
    }
  }, [idPlan]);

  async function handleEdit({ title, duration, price }) {
    try {
      await api.put(`plans/${idPlan}`, {
        title,
        duration,
        price,
      });
      toast.success('Dados do plano atualizado com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error(
        `Não foi possível atualizar os dados do plano! - Erro: ${err.message}`
      );
    }
  }

  async function handleNew({ title, duration, price }) {
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });
      toast.success('Plano cadastrado com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error(`Não foi possível cadastrar o aluno! - Erro: ${err.message}`);
    }
  }

  function handleReturn() {
    history.goBack();
  }
  return (
    <Container>
      <header>
        <h1>{edit ? 'Edição de plano' : 'Cadastro de plano'}</h1>
        <aside>
          <button className="return" type="button" onClick={handleReturn}>
            <MdKeyboardArrowLeft color="#FFF" size={24} />
            VOLTAR
          </button>
          <button type="submit" form="form-plan">
            <MdCheck color="#FFF" size={24} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form
          id="form-plan"
          schema={schema}
          onSubmit={edit ? handleEdit : handleNew}
        >
          <div>
            <h3>TÍTULO DO PLANO</h3>
            <Input
              name="title"
              type="text"
              autoComplete="off"
              placeholder="Digite o título do plano"
              value={title || null}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="last-row">
            <div>
              <h3>DURAÇÃO (em meses) </h3>
              <Input
                name="duration"
                type="text"
                autoComplete="off"
                placeholder="Digite os meses"
                value={duration || null}
                onChange={e => setDuration(numberMask(e.target.value))}
              />
            </div>
            <div>
              <h3>PREÇO MENSAL</h3>
              <Input
                name="price"
                autoComplete="off"
                placeholder="Digite o preço"
                value={price || null}
                onChange={e => setPrice(moneyMask(e.target.value))}
              />
            </div>
            <div>
              <h3>PREÇO TOTAL</h3>
              <Input
                readOnly
                disabled
                name="totalPrice"
                type="text"
                value={totalPrice}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
