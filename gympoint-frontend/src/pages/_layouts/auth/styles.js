import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: 480px;
  text-align: center;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  img {
    margin-top: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    text {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      text-align: left;
      margin: 0 0 8px 30px;
    }

    input {
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      height: 45px;
      width: 300px;
      font-size: 16px;
      margin: 0 30px 20px 30px;
    }

    span {
      color: #ee4d64;
      align-self: flex-end;
      margin-top: -0.5rem;
      margin-bottom: 0.75rem;
      padding: 0.1rem 0.25rem;
      border-radius: 0 0 0.25rem 0.25rem;
      font-size: 0.75rem;
      font-weight: bold;
    }

    button {
      margin: 0 0 0.75rem;
      height: 45px;
      width: 300px;
      background: #ee4d64;
      font-weight: bold;
      color: #ffffff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
