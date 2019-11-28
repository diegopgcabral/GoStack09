import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [idStudent, setIdStudent] = useState('');
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(idStudent));
  }
  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          icon="account-circle"
          placeholder="Informe seu ID de cadastro"
          keyboardType="number-pad"
          returnKeyType="send"
          value={idStudent}
          onChangeText={setIdStudent}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
