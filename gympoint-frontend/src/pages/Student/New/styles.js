import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #444444;
      display: flex;
      align-items: center;
    }

    aside {
      display: flex;

      > .return {
        background-color: #cccccc;

        &:hover {
          background: ${darken(0.05, '#cccccc')};
        }
      }

      button {
        width: 112px;
        height: 36px;
        padding: 5px;
        border-radius: 4px;
        background-color: #ee4d64;
        color: #fff;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;
        border: none;
        margin-left: 16px;

        &:hover {
          background: ${darken(0.05, '#ee4d64')};
        }

        svg {
          margin-right: 8px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 24px;
  border-radius: 4px;
  background-color: #ffffff;

  form {
    padding: 30px;

    > .last-row {
      display: flex;
      flex-direction: row;

      div {
        margin-left: 20px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;

    h3 {
      font-size: 14px;
      font-weight: bold;
      color: #444444;
      margin-bottom: 8px;
    }

    input {
      height: 45px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      background-color: #ffffff;
      color: #999999;
      padding-left: 10px;
    }

    span {
      font-size: 14px;
      color: #ee4d64;
      margin-top: 5px;
    }
  }
`;
