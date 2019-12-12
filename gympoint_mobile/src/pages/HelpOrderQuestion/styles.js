import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #f5f5f5;
`;

export const Question = styled(Input)`
  background: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
  margin: 20px 0;
  width: 90%;
  height: auto;
`;

export const ButtonQuestion = styled(Button)`
  width: 90%;
`;
