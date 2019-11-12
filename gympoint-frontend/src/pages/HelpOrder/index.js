import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function HelpOrder() {
  return (
    <Container>
      <header>
        <h1>Pedidos de auxílio</h1>
      </header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DIEGO</td>
              <td>
                <Link to="/plan/form/">responder</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
