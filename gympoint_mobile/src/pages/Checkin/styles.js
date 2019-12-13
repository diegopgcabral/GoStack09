import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  align-items: center;
`;

export const CheckinButton = styled(Button)`
  margin: 30px 0;
  width: 90%;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 90%;
`;

export const CheckinInfo = styled.View`
  background-color: #fff;
  padding: 15px 20px;
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

export const Label = styled.Text`
  color: #444444;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`;

export const Time = styled.Text`
  color: #666666;
  font-size: 14px;
  text-align: right;
`;
