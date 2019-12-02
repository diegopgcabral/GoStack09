import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { idStudent } = payload;

    const response = yield call(api.post, `/sessions/student/${idStudent}`);

    const student = response.data;

    if (!student) {
      Alert.alert('Erro no login', 'Aluno não encontrado!');
      return;
    }

    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
