import React, { useState, useEffect, useCallback } from 'react';

import { Container, Content, Pagination } from './styles';

import api from '~/services/api';
import ModalHelpOrder from '~/components/ModalHelpOrder';
import NoResult from '~/components/NoResult';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [openModal, setOpenModal] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handlePagination = useCallback(async () => {
    const response = await api.get(`help-orders?page=${page + 1}`);
    if (response.data.length > 0) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
  }, [page]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders', {
        params: {
          page,
        },
      });

      setHelpOrders(response.data);
    }

    loadHelpOrders();
    handlePagination();
  }, [handlePagination, page]);

  function handleOpenModal(payload) {
    setOpenModal({ open: !openModal.open, payload });
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  return (
    <>
      {openModal.open && <ModalHelpOrder payload={openModal.payload} />}
      <Container>
        <header>
          <h1>Pedidos de auxílio</h1>
        </header>
        <Content>
          {helpOrders.length === 0 ? (
            <NoResult />
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>ALUNO</th>
                  </tr>
                </thead>
                <tbody>
                  {helpOrders.map(helpOrder => (
                    <tr>
                      <td>{helpOrder.student.name}</td>
                      <td>
                        <button
                          className="btnAnswer"
                          type="button"
                          onClick={() => handleOpenModal(helpOrder)}
                        >
                          responder
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
    </>
  );
}
