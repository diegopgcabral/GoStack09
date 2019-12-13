import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Question, ButtonQuestion } from './styles';

import Header from '~/components/Header';
import api from '~/services/api';

export default function NewQuestion({ navigation }) {
  const [question, setQuestion] = useState('');
  const student = useSelector(state => state.auth.student);
  const questionRef = useRef();

  useEffect(() => {
    questionRef.current.focus();
  }, []);

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
          ref={questionRef}
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

NewQuestion.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={30} color="#ee4e62" />
    </TouchableOpacity>
  ),
});

NewQuestion.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
