import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #f5f5f5;
`;

export const Question = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  width: 90%;
  height: 300px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  background-color: #fff;
  margin: 20px 0;
  padding: 15px;
  font-size: 16px;
  color: #999999;
`;

export const ButtonQuestion = styled(Button)`
  width: 90%;
`;
