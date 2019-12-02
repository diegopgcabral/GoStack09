import React from 'react';

import { Container, Image } from './styles';
import logo from '~/assets/logo-header.png';

export default function LogoHeader() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
