import React from 'react';

import { MdSearch } from 'react-icons/md';
import { Container, Message } from './styles';

export default function NoResult() {
  return (
    <Container>
      <MdSearch size={30} color="black" />
      <Message>Nenhum registro encontrado</Message>
    </Container>
  );
}
