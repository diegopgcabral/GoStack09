import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import { Container, Content, Pagination } from './styles';

import api from '~/services/api';
import NoResult from '~/components/NoResult';
import Loading from '~/components/Loading';

export default function Student() {
  const [searchStudent, setSearchStudent] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handlePagination = useCallback(async () => {
    const response = await api.get(`students?page=${page + 1}`);
    if (response.data.length > 0) {
      setHasNextPage(true);
    } else {
      setHasNextPage(false);
    }
  }, [page]);

  useEffect(() => {
    async function searchStudents() {
      setLoading(true);
      const response = await api.get('students', {
        params: {
          name: searchStudent,
          page,
        },
      });

      setStudents(response.data);
      setLoading(false);
    }

    searchStudents();
    handlePagination();
  }, [handlePagination, page, searchStudent]);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esse aluno?')) {
      try {
        await api.delete(`students/${id}`);
        const newList = students.filter(item => item.id !== id);
        setStudents(newList);
        toast.success('Aluno excluido com sucesso!');
      } catch (_err) {
        toast.error(
          `Não foi possível excluir o aluno! ${_err.response.data.error}`
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
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="/students/form">
            <MdAdd color="#FFF" fontSize={18} />
            CADASTRAR
          </Link>
          <div>
            <MdSearch color="#999" fontSize={18} />
            <Input
              name="searchName"
              type="text"
              autoComplete="off"
              placeholder="Buscar aluno"
              onChange={e => setSearchStudent(e.target.value)}
            />
          </div>
        </aside>
      </header>

      {loading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <>
          <Content>
            {students.length === 0 ? (
              <NoResult />
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th align="left">NOME</th>
                      <th align="left">E-MAIL</th>
                      <th align="center">IDADE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td align="center">{student.age}</td>
                        <td>
                          <Link to={`/students/form/${student.id}`}>
                            editar
                          </Link>
                          <button
                            className="btnDelete"
                            type="button"
                            onClick={() => handleDelete(student.id)}
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
