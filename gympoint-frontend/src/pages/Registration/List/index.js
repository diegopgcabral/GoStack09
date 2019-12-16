import React, { useEffect, useState, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Content, Pagination } from './styles';

import api from '~/services/api';
import NoResult from '~/components/NoResult';
import Loading from '~/components/Loading';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handlePagination = useCallback(async () => {
    const response = await api.get(`registrations?page=${page + 1}`);

    if (response.data.length > 0) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
  }, [page]);

  useEffect(() => {
    async function loadRegistrations() {
      setLoading(true);
      const response = await api.get('registrations', {
        params: {
          page,
        },
      });

      const data = response.data.map(registration => {
        const startDate = parseISO(registration.start_date);
        const endDate = parseISO(registration.end_date);

        const formattedStartDate = format(startDate, "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        });
        const formattedEndDate = format(endDate, "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        });
        return {
          formattedStartDate,
          formattedEndDate,
          ...registration,
        };
      });

      setRegistrations(data);
      setLoading(false);
    }
    loadRegistrations();
    handlePagination();
  }, [handlePagination, page]);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir essa matrícula?')) {
      try {
        await api.delete(`registrations/${id}`);
        const newList = registrations.filter(item => item.id !== id);
        setRegistrations(newList);
        toast.success('Matrícula excluida com sucesso!');
      } catch (_err) {
        toast.error(
          `Não foi possível excluir a matrícula! ${_err.response.data.error}`
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
        <h1>Gerenciando Matrículas</h1>
        <aside>
          <Link to="/registrations/form">
            <MdAdd color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
        </aside>
      </header>

      {loading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <>
          <Content>
            {registrations.length === 0 ? (
              <NoResult />
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>ALUNO</th>
                      <th align="center">PLANO</th>
                      <th align="center">INÍCIO</th>
                      <th align="center">TÉRMINO</th>
                      <th align="center">ATIVA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(registration => (
                      <tr key={registration.id}>
                        <td>{registration.student.name}</td>
                        <td align="center">{registration.plan.title}</td>
                        <td align="center">
                          {registration.formattedStartDate}
                        </td>
                        <td align="center">{registration.formattedEndDate}</td>
                        <td align="center">
                          <MdCheckCircle
                            fontSize={20}
                            color={registration.active ? '#42cb59' : '#999'}
                          />
                        </td>
                        <td>
                          <Link to={`registrations/form/${registration.id}`}>
                            editar
                          </Link>
                          <button
                            className="btnDelete"
                            type="button"
                            onClick={() => handleDelete(registration.id)}
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
        </>
      )}

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
