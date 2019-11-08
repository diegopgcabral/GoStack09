import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import api from '~/services/api';

export default function Student() {
  const [searchStudent, setSearchStudent] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function searchStudents() {
      // const response = await api.get(`students?page=${page}&name=Diego`);
      const response = await api.get(
        searchStudent ? `students?name=${searchStudent}` : 'students'
      );

      setStudents(response.data);
    }

    searchStudents();
  }, [searchStudent]);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esse aluno?')) {
      try {
        await api.delete(`students/${id}`);
        toast.success('Aluno excluido com sucesso!');
      } catch (err) {
        toast.error('Não foi possível excluir o aluno!');
      }
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="/student/add">
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
      <Content>
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
              <tr>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td align="center">{student.age}</td>
                <td>
                  <button className="btnEdit" type="button">
                    editar
                  </button>
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
      </Content>
    </Container>
  );
}
