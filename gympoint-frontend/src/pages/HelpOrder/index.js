import React, { useState, useEffect } from 'react';

import { Container, Content, Pagination } from './styles';

import api from '~/services/api';
import ModalHelpOrder from '~/components/ModalHelpOrder';
import NoResult from '~/components/NoResult';

export default function HelpOrder() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [openModal, setOpenModal] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      console.tron.log(`loadHelpOrders: ${page}`);
      const response = await api.get('help-orders', {
        params: {
          page,
        },
      });

      if (response.data.length > 0) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, [page]);

  function handleOpenModal(payload) {
    setOpenModal({ open: !openModal.open, payload });
  }

  function handlePagination(event) {
    setPage(event === 'previous' ? page - 1 : page + 1);
    console.tron.log(`handlePagination: ${page}`);
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
    </>
  );
}
