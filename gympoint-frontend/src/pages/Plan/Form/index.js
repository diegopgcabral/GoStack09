import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Content } from './styles';

import history from '~/services/history';
import api from '~/services/api';

import { formatCurrencyBR, moneyMask, numberMask } from '~/util/format';

const schema = Yup.object().shape({
  title: Yup.string().required('Título do plano é obrigatório'),
  duration: Yup.string().required('Duração do plano é obrigatório'),
  price: Yup.string().required('Preço do plano é obrigatório'),
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
      await api.put('plans', {
        id: idPlan,
        title,
        duration,
        price,
      });

      toast.success('Plano atualizado com sucesso!');
      history.goBack();
    } catch (_err) {
      toast.error(
        `Não foi possível atualizar o plano! ${_err.response.data.error}`
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
    } catch (_err) {
      toast.error(
        `Não foi possível cadastrar o plano! ${_err.response.data.error}`
      );
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
              value={title || ''}
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
                value={duration || ''}
                onChange={e => setDuration(numberMask(e.target.value))}
              />
            </div>
            <div>
              <h3>PREÇO MENSAL</h3>
              <Input
                name="price"
                type="text"
                autoComplete="off"
                value={price || ''}
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
