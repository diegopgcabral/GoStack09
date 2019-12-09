import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
`;

export const HelpOrder = styled.View`
  margin: 20px;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  background-color: #ffffff;
`;

export const HeaderOrder = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
`;
export const Time = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Description = styled.Text`
  text-align: justify;
  margin: 20px 0;
  font-size: 14px;
  color: #666666;
`;
