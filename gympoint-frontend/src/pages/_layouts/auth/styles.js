import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100vh;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: 448px;
  text-align: center;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  img {
    margin-top: 50px;
    width: 150px;
    height: 100px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
      text-align: left;
      margin: 0 0 8px 30px;
    }

    input {
      background: #ffffff;
      border: 1px solid #dddddd;
      color: #999999;
      box-sizing: border-box;
      border-radius: 4px;
      height: 45px;
      width: 300px;
      font-size: 16px;
      padding: 0 10px;
      margin: 0 30px 20px 30px;
    }

    span {
      color: #ee4d64;
      border-radius: 4px;
      margin-top: -12px;
      font-size: 12px;
      font-weight: bold;
    }

    button {
      width: 300px;
      margin: 0 auto;
      height: 45px;
      border-radius: 4px;
      display: block;
      background: #ee4d64;
      font-weight: bold;
      color: #ffffff;
      border: 0;
      font-size: 16px;
      margin-top: 10px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;
