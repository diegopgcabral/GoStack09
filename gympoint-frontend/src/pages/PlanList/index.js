import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Content, Pagination } from './styles';

import api from '~/services/api';
import { formatCurrencyBR } from '~/util/format';

export default function Plan() {
  const [plans, SetPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans', {
        params: {
          page,
        },
      });

      if (response.data.length > 0) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }

      SetPlans(response.data);
    }

    loadPlans();
  }, [page]);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esse plano?')) {
      try {
        await api.delete(`plans/${id}`);
        // loadPlans();
        toast.success('Plano excluido com sucesso!');
      } catch (err) {
        toast.error(
          `Não foi possível excluir o plano selecionado - Erro: ${err.message}`
        );
      }
    }
  }

  function handlePagination(event) {
    setPage(event === 'previous' ? page - 1 : page + 1);
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <aside>
          <Link to="/plan/form">
            <MdAdd color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
        </aside>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
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
                <td align="center">{formatCurrencyBR(plan.price)}</td>
                <td>
                  <Link to={`/plan/form/${plan.id}`}>editar</Link>
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

      <Pagination>
        <button
          type="button"
          onClick={() => handlePagination('previous')}
          disabled={page < 2}
        >
          Anterior
        </button>

        <strong>Página {page}</strong>

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => handlePagination('next')}
        >
          Próximo
        </button>
      </Pagination>
    </Container>
  );
}
