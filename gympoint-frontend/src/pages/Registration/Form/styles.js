import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 830px;
  margin: 0 auto;
  margin-top: 30px;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #444444;
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
        border-radius: 4px;
        background-color: #ee4d64;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        margin-left: 5px;
        transition: background 0.3s;

        &:hover {
          background: ${darken(0.05, '#ee4d64')};
        }

        svg {
          margin-right: 3px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 30px;
  border-radius: 4px;
  background-color: #ffffff;

  form {
    padding: 20px;
    border: solid 1px #dddddd;
    color: #999999;

    input[type='date']::-webkit-outer-spin-button,
    input[type='date']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    h3 {
      font-size: 14px;
      font-weight: bold;
      color: #444444;
      margin-bottom: 5px;
    }

    > .last-row {
      display: flex;
      flex-direction: row;

      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 20px 10px;

        &:first-child {
          margin: 20px 0;
        }

        &:last-child {
          margin: 20px 0;
        }

        select {
          height: 40px;
          border-radius: 4px;
          border: solid 1px #dddddd;
          background-color: #ffffff;
          padding-left: 10px;
          font-size: 16px;
          color: #666666;
          font-family: Roboto;
        }

        input {
          height: 40px;
          border-radius: 4px;
          border: solid 1px #dddddd;
          background-color: #ffffff;
          color: #666666;
          padding-left: 10px;

          &:read-only {
            background: #ddd;

            &:hover {
              cursor: not-allowed;
            }
          }
        }

        span {
          font-size: 14px;
          color: #ee4d64;
          margin-top: 5px;
        }
      }
    }
  }
`;
