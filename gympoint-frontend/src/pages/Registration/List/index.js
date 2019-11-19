import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import api from '~/services/api';
// import NoResult from '~/components/NoResult';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);
  // const [students, setStudents] = useState([]);
  // const [page, setPage] = useState(1);
  // const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registrations');

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
    }
    loadRegistrations();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir essa matrícula?')) {
      try {
        await api.delete(`registrations/${id}`);
        const newList = registrations.filter(item => item.id !== id);
        setRegistrations(newList);
        toast.success('Matrícula excluida com sucesso!');
      } catch (err) {
        toast.error(
          `Não foi possível excluir a matrícula! - Erro: ${err.message}`
        );
      }
    }
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
      <Content>
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
            {registrations.map(register => (
              <tr>
                <td>{register.student.name}</td>
                <td align="center">{register.plan.title}</td>
                <td align="center">{register.formattedStartDate}</td>
                <td align="center">{register.formattedEndDate}</td>
                <td align="center">
                  <MdCheckCircle
                    fontSize={20}
                    color={register.active ? '#42cb59' : '#999'}
                  />
                </td>
                <td>
                  <Link to={`registration/form/${register.id}`}>editar</Link>
                  <button
                    className="btnDelete"
                    type="button"
                    onClick={() => handleDelete(register.id)}
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
