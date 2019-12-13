import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import Header from '~/components/Header';

import {
  Container,
  CheckinButton,
  CheckinList,
  CheckinInfo,
  Label,
  Time,
} from './styles';

export default function Checkin() {
  const [checkins, setCheckins] = useState([]);
  const student = useSelector(state => state.auth.student);

  async function loadCheckins() {
    try {
      const response = await api.get(`students/${student.id}/checkins`);

      const data = response.data.map((checkin, index, array) => ({
        ...checkin,
        seq: array.length - index,
        dateFormatted: formatRelative(parseISO(checkin.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      setCheckins(data);
    } catch (err) {
      Alert.alert('Error', 'Erro ao listar os check-ins');
    }
  }

  useEffect(() => {
    loadCheckins();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit() {
    try {
      const response = await api.post(`students/${student.id}/checkins`);

      const data = {
        ...response.data,
        seq: checkins.length + 1,
        dateFormatted: formatRelative(
          parseISO(response.data.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      };
      Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
      setCheckins([data, ...checkins]);
      loadCheckins();
    } catch (err) {
      if (err.message.indexOf('402') > 0) {
        Alert.alert(
          'Acesso bloqueado!',
          'São permitidos no máximo 5 acessos a cada 7 dias'
        );
      } else {
        Alert.alert('Falha ao realizar check-in', 'Tente novamente');
      }
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CheckinButton onPress={handleSubmit}>Novo check-in</CheckinButton>

        <CheckinList
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CheckinInfo>
              <Label>Check-in #{item.seq}</Label>
              <Time>{item.dateFormatted}</Time>
            </CheckinInfo>
          )}
        />
      </Container>
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="edit-location" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon,
};
