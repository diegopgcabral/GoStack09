import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  align-items: center;
`;

export const HelpButton = styled(Button)`
  margin: 30px 0;
  width: 90%;
`;

export const HelpList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 90%;
`;

export const ListItem = styled.TouchableOpacity`
  padding: 15px;
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HelpStatus = styled.View`
  flex-direction: row;
`;

export const HelpIcon = styled(Icon)`
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Text = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
  text-align: left;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666666;
  text-align: right;
`;

export const Question = styled.Text`
  margin-top: 16px;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
`;
