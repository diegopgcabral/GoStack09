import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Content } from './styles';

import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email()
    .required('E-mail é obrigatório'),
  age: Yup.number()
    .typeError('Idade deve ser numérico')
    .min(1, 'Idade deve ser maior ou igual a 1 ano')
    .max(120, 'Idade dever ser menor ou igual a 120 anos')
    .required('Idade é obrigatória'),
  weight: Yup.number()
    .typeError('Peso deve ser numérico')
    .positive('Peso não pode ser negativo')
    .min(1, 'Peso não pode ser menor do que 1')
    .required('Peso é obrigatório'),
  height: Yup.number()
    .typeError('Altura deve ser numérico')
    .positive('Altura não pode ser negativa')
    .min(1, 'Altura não pode ser menor do que 1')
    .required('Altura é obrigatória'),
});

export default function FormStudent() {
  const { idStudent } = useParams();
  const [student, setStudent] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (idStudent) {
      setEdit(true);
      async function loadStudent() {
        const response = await api.get(`students/${idStudent}`);
        setStudent(response.data);
      }

      loadStudent();
    }
  }, [idStudent]);

  async function handleSubmit({ name, email, age, height, weight }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        height,
        weight,
      });
      toast.success('Aluno cadastrado com sucesso!');
      history.push('/students');
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
        <Form id="form-student" schema={schema} onSubmit={handleSubmit}>
          <div>
            <h3>NOME COMPLETO</h3>
            <Input
              name="name"
              type="text"
              autoComplete="off"
              placeholder="Digite seu nome completo"
            />
          </div>
          <div>
            <h3>ENDEREÇO DE E-MAIL</h3>
            <Input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Digite seu endereço de e-mail"
            />
          </div>
          <div className="last-row">
            <div>
              <h3>IDADE </h3>
              <Input
                name="age"
                type="text"
                autoComplete="off"
                placeholder="Digite sua idade"
              />
            </div>
            <div>
              <h3>PESO (em kg)</h3>
              <Input
                name="weight"
                type="text"
                autoComplete="off"
                placeholder="Digite seu peso"
              />
            </div>
            <div>
              <h3>ALTURA</h3>
              <Input
                name="height"
                type="text"
                autoComplete="off"
                placeholder="Digite sua altura"
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
