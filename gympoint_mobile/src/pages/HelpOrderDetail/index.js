import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';

import {
  Container,
  HelpOrder,
  HeaderOrder,
  Title,
  Time,
  Description,
} from './styles';

import Header from '~/components/Header';

export default function OrderDetail({ navigation }) {
  const order = navigation.getParam('item');

  const dateFormattedCreatedAt = formatRelative(
    parseISO(order.createdAt),
    new Date(),
    { locale: pt }
  );

  const dateFormattedUpdatedAt = formatRelative(
    parseISO(order.updatedAt),
    new Date(),
    { locale: pt }
  );

  return (
    <>
      <Header />
      <Container>
        <HelpOrder>
          <HeaderOrder>
            <Title>PERGUNTA</Title>
            <Time>{dateFormattedCreatedAt}</Time>
          </HeaderOrder>
          <Description>{order.question}</Description>

          <HeaderOrder>
            <Title>RESPOSTA</Title>
            <Time>{order.answer ? dateFormattedUpdatedAt : ''}</Time>
          </HeaderOrder>
          <Description>
            {order.answer
              ? order.answer
              : 'Seu pedido de auxílio ainda não foi respondido!'}
          </Description>
        </HelpOrder>
      </Container>
    </>
  );
}

OrderDetail.navigationOptions = ({ navigation }) => ({
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

OrderDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
