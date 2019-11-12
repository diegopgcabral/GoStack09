import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import api from '~/services/api';
import { formatPrice } from '~/utils/format';

export default function Plan() {
  const [plans, SetPlans] = useState([]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get('plans');
      SetPlans(response.data);
    }
    loadPlan();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esse plano?')) {
      try {
        await api.delete(`plans/${id}`);
        SetPlans('');
        toast.success('Plano excluido com sucesso!');
      } catch (err) {
        toast.error(
          `Não foi possível excluir o plano selecionado - Erro: ${err.message}`
        );
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <aside>
          <Link to="/plans/add">
            <MdAdd color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
        </aside>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th align="left">TÍTULO</th>
              <th align="center">DURAÇÃO</th>
              <th align="center">VALOR p/ MÊS</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr>
                <td>{plan.title}</td>
                <td align="center">
                  {plan.duration > 1
                    ? `${plan.duration} meses`
                    : `${plan.duration} mês`}
                </td>
                <td align="center">{formatPrice(plan.price)}</td>
                <td>
                  <Link to={`/plan/edit/${plan.id}`}>editar</Link>
                  <button
                    className="btnDelete"
                    type="button"
                    onClick={() => handleDelete(plan.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
