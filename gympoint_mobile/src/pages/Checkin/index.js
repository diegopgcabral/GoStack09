import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { useSelector } from 'react-redux';

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
      const data = response.data.map(checkin => ({
        ...checkin,
        dateFormatted: formatRelative(parseISO(checkin.createdAt), new Date(), {
          locale: pt,
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
    await api
      .post(`students/${student.id}/checkins`)
      .then(loadCheckins())
      .catch(Alert.alert('Error', 'Não foi possível realizar o check-in'));
  }

  return (
    <>
      <Header />
      <Container>
        <CheckinButton onPress={() => handleSubmit()}>
          Novo check-in
        </CheckinButton>

        <CheckinList
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CheckinInfo>
              <Label>Check-in #{item}</Label>
              <Time>{item.dateFormatted}</Time>
            </CheckinInfo>
          )}
        />
      </Container>
    </>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
