import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Content } from './styles';

import history from '~/services/history';
import api from '~/services/api';
import { decimalMask } from '~/util/format';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('E-mail é obrigatório'),
  age: Yup.number('Somente Números')
    .positive('Idade Inválida')
    .required('Idade é obrigatória'),
  weight: Yup.number('Somente Números')
    .positive('Peso Inválido')
    .required('Peso é obrigatório'),
  height: Yup.number('Somente Números')
    .typeError('Altura deve ser numérico')
    .positive('Altura Inválida')
    .required('Altura é obrigatória'),
});

export default function FormStudent() {
  const { idStudent } = useParams();
  const [student, setStudent] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students/${idStudent}`);
      setStudent(response.data);
    }

    if (idStudent) {
      setEdit(true);
      loadStudent();
    }
  }, [idStudent]);

  async function handleEdit({ name, email, age, height, weight }) {
    try {
      await api.put(`students/${idStudent}`, {
        name,
        email,
        age,
        height,
        weight,
      });
      toast.success('Dados do aluno atualizado com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error(
        `Não foi possível atualizar os dados do aluno! - Erro: ${err.message}`
      );
    }
  }

  async function handleNew({ name, email, age, height, weight }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        height,
        weight,
      });
      toast.success('Aluno cadastrado com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error(`Não foi possível cadastrar o aluno! - Erro: ${err.message}`);
    }
  }

  function handleReturn() {
    history.goBack();
  }

  return (
    <Container>
      <header>
        <h1>{edit ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>
        <aside>
          <button className="return" type="button" onClick={handleReturn}>
            <MdKeyboardArrowLeft color="#FFF" size={24} />
            VOLTAR
          </button>
          <button type="submit" form="form-student">
            <MdCheck color="#FFF" size={24} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form
          id="form-student"
          schema={schema}
          onSubmit={edit ? handleEdit : handleNew}
        >
          <div>
            <h3>NOME COMPLETO</h3>
            <Input
              name="name"
              type="text"
              autoComplete="off"
              placeholder="Digite seu nome completo"
              value={student ? student.name : null}
              onChange={e => setStudent({ ...student, name: e.target.value })}
            />
          </div>
          <div>
            <h3>ENDEREÇO DE E-MAIL</h3>
            <Input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Digite seu endereço de e-mail"
              value={student ? student.email : null}
              onChange={e => setStudent({ ...student, email: e.target.value })}
            />
          </div>
          <div className="last-row">
            <div>
              <h3>IDADE </h3>
              <Input
                name="age"
                type="number"
                autoComplete="off"
                placeholder="Digite sua idade"
                value={student ? student.age : null}
                onChange={e => setStudent({ ...student, age: e.target.value })}
              />
            </div>
            <div>
              <h3>PESO (em kg)</h3>
              <Input
                name="weight"
                type="text"
                autoComplete="off"
                placeholder="Digite seu peso"
                value={student ? student.weight : null}
                onChange={e =>
                  setStudent({
                    ...student,
                    weight: decimalMask(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <h3>ALTURA</h3>
              <Input
                name="height"
                type="text"
                autoComplete="off"
                placeholder="Digite sua altura"
                value={student ? student.height : null}
                onChange={e =>
                  setStudent({
                    ...student,
                    height: decimalMask(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
