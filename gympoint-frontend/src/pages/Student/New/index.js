import React from 'react';
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
    .min(1)
    .required('Idade é obrigatória'),
  weight: Yup.number()
    .min(1)
    .required('Peso é obrigatório'),
  height: Yup.number()
    .min(1)
    .required('Altura é obrigatória'),
});

export default function NewStudent() {
  async function handleAdd({ name, email, age, height, weight }) {
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
      toast.error('Não foi possível cadastrar o aluno!');
    }
  }

  function handleReturn() {
    history.goBack();
  }
  return (
    <Container>
      <header>
        <h1>Cadastro de aluno</h1>
        <aside>
          <button className="return" type="button" onClick={handleReturn}>
            <MdKeyboardArrowLeft color="#FFF" size={18} />
            VOLTAR
          </button>
          <button type="submit">
            <MdCheck color="#FFF" size={18} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form schema={schema} onSubmit={handleAdd}>
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
              <h3>IDADE</h3>
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
