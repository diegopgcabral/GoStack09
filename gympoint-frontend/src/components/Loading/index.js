import React from 'react';
import PropTypes from 'prop-types';

import { Container, StyleLoading, Info } from './styles';

export default function Loading({ message }) {
  return (
    <Container>
      <StyleLoading />
      <Info>{message}</Info>
    </Container>
  );
}

Loading.defaultProps = {
  message: 'Carregando...',
};

Loading.propTypes = {
  message: PropTypes.string,
};
