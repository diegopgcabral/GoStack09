import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  align-items: center;
`;

export const CheckinButton = styled(Button)`
  margin: 20px;
`;

export const CheckinList = styled.FlatList`
  width: 90%;
`;

export const CheckinInfo = styled.View`
  background-color: #fff;
  padding: 15px 20px;
  margin-bottom: 10px;

  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

export const Label = styled.Text`
  color: #444444;
  font-size: 14px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666666;
`;
