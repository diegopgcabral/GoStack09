import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { withNavigationFocus } from 'react-navigation';
import {
  Container,
  HelpButton,
  HelpList,
  ListItem,
  Info,
  HelpStatus,
  HelpIcon,
  Text,
  Time,
  Question,
} from './styles';

import Header from '~/components/Header';

import api from '~/services/api';

function HelpOrderList({ navigation, isFocused }) {
  const student = useSelector(state => state.auth.student);
  const [helpOrders, setHelpOrder] = useState([]);
  console.tron.log(navigation);

  async function loadHelpOrders() {
    const response = await api.get(`/students/${student.id}/help-orders`);
    const data = response.data.map(help => ({
      ...help,
      time: formatRelative(parseISO(help.createdAt), new Date(), {
        locale: pt,
        addSuffix: true,
      }),
    }));

    setHelpOrder(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused]); // eslint-disable-line

  return (
    <>
      <Header />
      <Container>
        <HelpButton onPress={() => navigation.navigate('HelpOrderQuestion')}>
          Novo pedido de auxílio
        </HelpButton>
        <HelpList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate('HelpOrderDetail', { item })}
            >
              <Info>
                <HelpStatus>
                  <HelpIcon
                    name="check-circle"
                    size={20}
                    answered={item.answer}
                  />
                  <Text answered={item.answer}>
                    {item.answer ? 'Respondido' : 'Sem resposta'}
                  </Text>
                </HelpStatus>
                <Time>{item.time}</Time>
              </Info>
              <Question numberOfLines={3}>{item.question}</Question>
            </ListItem>
          )}
        />
      </Container>
    </>
  );
}

HelpOrderList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrderList);
