import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 35px;
  font-size: 22px;
  font-weight: bold;
  color: #ee4e62;
`;

export const Info = styled.View`
  margin-top: 35px;
  align-items: center;
`;

export const Name = styled.Text`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 18px;
  color: #666666;
`;
export const Email = styled.Text`
  font-size: 14px;
  color: #555555;
`;

export const LogoutButton = styled(Button)`
  margin-top: 40px;
  background: #ee4e62;
  width: 70%;
`;
