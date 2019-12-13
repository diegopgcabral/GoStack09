import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { signOut } from '~/store/modules/auth/actions';

import Header from '~/components/Header';
import { Container, Title, Info, Name, Email, LogoutButton } from './styles';

export default function Profile() {
  const student = useSelector(state => state.auth.student);
  const dispatch = useDispatch();

  function HandleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <Header />
      <Container>
        <Title>Meu Perfil</Title>
        <Info>
          <Name>{student.name}</Name>
          <Email>{student.email}</Email>
        </Info>

        <LogoutButton onPress={HandleSignOut}>Sair</LogoutButton>
      </Container>
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="account-box" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon,
};
