import styled from 'styled-components/native';

export const Container = styled.View`
  height: 45px;
  background-color: #f2f2f2;
  border-radius: 4px;
  border: 1px solid #dddddd;

  flex-direction: row;
  align-items: center;
  padding: 0 5px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  font-size: 16px;
  color: #999999;
  margin-left: 10px;
`;
