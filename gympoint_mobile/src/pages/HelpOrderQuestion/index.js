import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, Question, ButtonQuestion } from './styles';

import Header from '~/components/Header';
import api from '~/services/api';

export default function NewQuestion({ navigation }) {
  const [question, setQuestion] = useState('');
  const student = useSelector(state => state.auth.student);

  async function HandleQuestion() {
    await api.post(`/students/${student.id}/help-orders`, { question });

    Alert.alert('Pedido de auxílio enviado com sucesso!');
    setQuestion('');
    navigation.navigate('HelpOrderList');
  }
  return (
    <>
      <Header />
      <Container>
        <Question
          placeholder="Inclua seu pedido de auxílio"
          textAlignVertical="top"
          numberOfLines={10}
          multiline
          returnKeyType="send"
          value={question}
          onChangeText={setQuestion}
        />
        <ButtonQuestion onPress={HandleQuestion}>Enviar pedido</ButtonQuestion>
      </Container>
    </>
  );
}

NewQuestion.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
