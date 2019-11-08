import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdArrowBack, MdControlPoint } from 'react-icons/md';

import { Container, Content } from './styles';

export default function NewStudent() {
  return (
    <Container>
      <header>
        <h1>Cadastro de aluno</h1>
        <aside>
          <button className="return" type="button">
            <MdArrowBack color="#FFF" size={18} />
            VOLTAR
          </button>
          <button type="submit">
            <MdControlPoint color="#FFF" size={18} />
            SALVAR
          </button>
        </aside>
      </header>
      <Content>
        <Form>
          <div>
            <h3>NOME COMPLETO</h3>
            <Input name="name" type="text" autoComplete="off" />
          </div>
          <div>
            <h3>ENDEREÇO DE E-MAIL</h3>
            <Input name="email" type="email" autoComplete="off" />
          </div>
          <div>
            <div>
              <h3>IDADE</h3>
              <Input name="age" type="number" autoComplete="off" />
            </div>
            <div>
              <h3>PESO(em kg)</h3>
              <Input name="weight" type="text" autoComplete="off" />
            </div>
            <div>
              <h3>Altura</h3>
              <Input name="height" type="text" autoComplete="off" />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
