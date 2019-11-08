import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo_header.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="GymPoint" />
          </Link>

          <ul>
            <li>
              <Link to="/students">ALUNOS</Link>
            </li>
            <li>
              <Link to="/plans">PLANOS</Link>
            </li>
            <li>
              <Link to="/registrations">MATRÍCULAS</Link>
            </li>
            <li>
              <Link to="/help-orders">PEDIDOS DE AUXÍLIO</Link>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="submit" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
