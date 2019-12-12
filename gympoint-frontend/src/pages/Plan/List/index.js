import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Content, Pagination } from './styles';

import api from '~/services/api';
import { formatCurrencyBR } from '~/util/format';
import NoResult from '~/components/NoResult';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handlePagination = useCallback(async () => {
    const response = await api.get(`plans?page=${page + 1}`);
    if (response.data.length > 0) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
  }, [page]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans', {
        params: {
          page,
        },
      });
      setPlans(response.data);
    }
    loadPlans();
    handlePagination();
  }, [handlePagination, page]);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esse plano?')) {
      try {
        await api.delete(`plans/${id}`);

        const newList = plans.filter(item => item.id !== id);
        setPlans(newList);

        toast.success('Plano excluido com sucesso!');
      } catch (err) {
        toast.error(
          `Não foi possível excluir o plano! ${err.response.data.error}`
        );
      }
    }
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <aside>
          <Link to="/plans/form">
            <MdAdd color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
        </aside>
      </header>

      <Content>
        {plans.length === 0 ? (
          <NoResult />
        ) : (
          <>
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
                  <tr key={plan.id}>
                    <td>{plan.title}</td>
                    <td align="center">
                      {plan.duration > 1
                        ? `${plan.duration} meses`
                        : `${plan.duration} mês`}
                    </td>
                    <td align="center">{formatCurrencyBR(plan.price)}</td>
                    <td>
                      <Link to={`/plans/form/${plan.id}`}>editar</Link>
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
          </>
        )}
      </Content>

      {(hasNextPage || page > 1) && (
        <Pagination>
          {page > 1 && (
            <button type="button" onClick={handlePreviousPage}>
              Página Anterior
            </button>
          )}

          <strong>Página {page}</strong>

          {hasNextPage && (
            <button type="button" onClick={handleNextPage}>
              Próxima página
            </button>
          )}
        </Pagination>
      )}
    </Container>
  );
}
