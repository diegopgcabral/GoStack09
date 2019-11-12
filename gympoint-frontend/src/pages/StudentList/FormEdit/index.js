import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

export default function EditStudent({ idStudent }) {
  const [student, setStudent] = useState();
  console.tron.log('ID: ' || idStudent);

  useEffect(() => {
    if (idStudent) {
      console.tron.log('Chegou2: ' || idStudent);
      (async function loadStudent() {
        try {
          const response = await api.get(`students/${idStudent}`);

          setStudent(response.data);
        } catch (err) {
          toast.error(
            `Não foi possível carregar o aluno selecionado. Erro: ${err.message}`
          );
        }
      })();
    }
  }, [idStudent]);

  async function handleSubmit({ name, email, age, height, weight }) {
    try {
      await api.put('students/', {
        name,
        email,
        age,
        height,
        weight,
      });

      toast.success('Dados do aluno atualizado com sucesso');
      history.push('/students');
    } catch (err) {
      toast.error(`Erro ao atualizar os dados do aluno. Erro: ${err.message}`);
    }
  }

  function handleReturn() {
    history.goBack();
  }

  return (
    <Container>
      <header>
        <h1>Edição de aluno</h1>
        <aside>
          <button className="return" type="button" onClick={handleReturn}>
            <MdKeyboardArrowLeft color="#FFF" size={24} />
            VOLTAR
          </button>
          <button type="submit" form="form-edit-student">
            <MdCheck color="#FFF" size={24} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form
          initialData={student}
          id="form-edit-student"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <div>
            <h3>NOME COMPLETO</h3>
            <Input name="name" type="text" autoComplete="off" />
          </div>
          <div>
            <h3>ENDEREÇO DE E-MAIL</h3>
            <Input name="email" type="email" autoComplete="off" />
          </div>
          <div className="last-row">
            <div>
              <h3>IDADE </h3>
              <Input name="age" type="text" autoComplete="off" />
            </div>
            <div>
              <h3>PESO (em kg)</h3>
              <Input name="weight" type="text" autoComplete="off" />
            </div>
            <div>
              <h3>ALTURA</h3>
              <Input name="height" type="text" autoComplete="off" />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

EditStudent.propTypes = {
  idStudent: PropTypes.string.isRequired,
};
