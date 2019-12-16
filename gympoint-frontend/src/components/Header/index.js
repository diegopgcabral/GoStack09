import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

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
              <NavLink exact activeClassName="active" to="/students">
                ALUNOS
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/plans">
                PLANOS
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/registrations">
                MATRÍCULAS
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/help-orders">
                PEDIDOS DE AUXÍLIO
              </NavLink>
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
